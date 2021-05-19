/* eslint-disable no-alert */
import React, {useState, useCallback, useEffect} from 'react';
import {Platform, RefreshControl} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {request, PERMISSIONS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

import {api} from '../../services/api';
import {BarberItem} from '../../components/BarberItem';

import SearchIcon from '../../assets/search.svg';
import MyLocationIcon from '../../assets/my_location.svg';

import {
  Container,
  Scroller,
  HeaderArea,
  HeaderTitle,
  SearchButton,
  LocationArea,
  LocationInput,
  LocationFinder,
  LoadingIcon,
  ListArea,
} from './styles';

function Home() {
  const {navigate} = useNavigation();

  const [locationText, setLocationText] = useState('');
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getBarbers = useCallback(async () => {
    try {
      setLoading(true);
      setList([]);

      let latitude = null;
      let longitude = null;

      if (coords) {
        latitude = coords.latitude;
        longitude = coords.longitude;
      }

      const response = await api.getBarbers(latitude, longitude, locationText);

      if (response.loc) {
        setLocationText(response.loc);
      }
      setList(response.data);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert('Erro: ' + err);
    }
  }, [coords, locationText]);

  const handleLocationFinder = useCallback(async () => {
    setCoords(null);

    let result = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );
    console.log('Result: ', result);

    if (result === 'granted') {
      // limpa dados anteriores dos barbeiros proximos
      setLoading(true);
      setLocationText('');
      setList([]);

      Geolocation.getCurrentPosition(
        async info => {
          setCoords(info.coords);

          await getBarbers();
        },
        error => {
          console.log(error);
        },
        {enableHighAccuracy: true, timeout: 5000, maximumAge: 1000},
      );
    }
  }, [getBarbers]);

  const onRefreshing = useCallback(async () => {
    setRefreshing(true);

    await getBarbers();

    setRefreshing(false);
  }, [getBarbers]);

  const handleLocationSearch = useCallback(() => {
    setCoords({});
    getBarbers();
  }, [getBarbers]);

  useEffect(() => {
    getBarbers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Scroller
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefreshing} />
        }>
        <HeaderArea>
          <HeaderTitle numberOfLInes={2}>
            Encontre o seu barbeiro favorito
          </HeaderTitle>
          <SearchButton onPress={() => navigate('Search')}>
            <SearchIcon widht={26} height={26} fill="#ffffff" />
          </SearchButton>
        </HeaderArea>

        <LocationArea>
          <LocationInput
            placeholder="Onde você está?"
            placeholderTextColor="#ffffff"
            value={locationText}
            onChangeText={setLocationText}
            onEndEditing={handleLocationSearch}
          />
          <LocationFinder onPress={handleLocationFinder}>
            <MyLocationIcon width="24" height="24" fill="#ffffff" />
          </LocationFinder>
        </LocationArea>

        {loading && <LoadingIcon size="large" color="#ffffff" />}

        <ListArea>
          {list.map((item, index) => (
            <BarberItem key={index} data={item} />
          ))}
        </ListArea>
      </Scroller>
    </Container>
  );
}

export {Home};
