/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
import React, {useState, useEffect, useCallback} from 'react';
import Swipper from 'react-native-swiper';
import {useNavigation, useRoute} from '@react-navigation/native';
import reactotron from 'reactotron-react-native';

import {api} from '../../services/api';
import {Stars} from '../../components/Stars';
import {BarberModal} from '../../components/BarberModal';
import FavoriteIcon from '../../assets/favorite.svg';
import BackButtonIcon from '../../assets/back.svg';
import NavPrevIcon from '../../assets/nav_prev.svg';
import NavNextIcon from '../../assets/nav_next.svg';
import FavoriteFullIcon from '../../assets/favorite_full.svg';

import {
  Container,
  Scroller,
  FakeSwipper,
  PageBody,
  UserInfoArea,
  ServiceArea,
  TestimonialArea,
  SwipeDot,
  SwipeItem,
  SwipeImage,
  UserAvatar,
  UserInfo,
  UserInfoName,
  UserFavButton,
  BackButton,
  LoadingIcon,
  ServicesTitle,
  ServiceItem,
  ServiceInfo,
  ServiceName,
  ServicePrice,
  ServiceChooseButton,
  ServiceChooseButtonText,
  TestimonialItem,
  TestimonialInfo,
  TestimonialName,
  TestimonialBody,
} from './styles';

function Barber() {
  const {navigate, goBack} = useNavigation();
  const {params} = useRoute();

  const [userInfo, setUserInfo] = useState({
    id: params.id,
    avatar: params.avatar,
    name: params.name,
    stars: params.stars,
  });
  const [loading, setLoading] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function getBarberInfo() {
      try {
        setLoading(true);
        const response = await api.getBarber(userInfo.id);

        setUserInfo(response.data);
        setFavorited(response.data.favorited);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        alert('Erro: ' + err);
      }
    }

    getBarberInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleBackButton() {
    goBack();
  }

  const handleFavClick = useCallback(() => {
    setFavorited(state => !state);
  }, []);

  const handleServiceChoose = useCallback(service => {
    setSelectedService(service);
    setShowModal(true);
  }, []);

  return (
    <Container>
      <Scroller>
        {userInfo.photos && userInfo.photos.length > 0 ? (
          <Swipper
            style={{height: 240}}
            dot={<SwipeDot />}
            activeDot={<SwipeDot active />}
            apginationStyle={{top: 15, right: 15, bottom: null, left: null}}
            autoplay={true}>
            {userInfo.photos.map((item, index) => (
              <SwipeItem key={index}>
                <SwipeImage source={{uri: item.url}} resizeMode="cover" />
              </SwipeItem>
            ))}
          </Swipper>
        ) : (
          <FakeSwipper />
        )}

        <PageBody>
          <UserInfoArea>
            <UserAvatar source={{uri: userInfo.avatar}} />

            <UserInfo>
              <UserInfoName>{userInfo.name}</UserInfoName>

              <Stars stars={userInfo.stars} showNumber />
            </UserInfo>

            <UserFavButton onPress={handleFavClick}>
              {favorited ? (
                <FavoriteFullIcon width="24" height="24" fill="#FF0000" />
              ) : (
                <FavoriteIcon width="24" height="24" fill="#FF0000" />
              )}
            </UserFavButton>
          </UserInfoArea>

          {loading && <LoadingIcon size="large" color="#000000" />}

          {userInfo.services && (
            <ServiceArea>
              <ServicesTitle>Lista de serviços</ServicesTitle>

              {userInfo.services.map((service, index) => (
                <ServiceItem key={index}>
                  <ServiceInfo>
                    <ServiceName>{service.name}</ServiceName>
                    <ServicePrice>R$ {service.price.toFixed(2)}</ServicePrice>
                  </ServiceInfo>

                  <ServiceChooseButton
                    onPress={() => handleServiceChoose(service)}>
                    <ServiceChooseButtonText>Agendar</ServiceChooseButtonText>
                  </ServiceChooseButton>
                </ServiceItem>
              ))}
            </ServiceArea>
          )}

          {userInfo.testimonials && userInfo.testimonials.length > 0 && (
            <TestimonialArea>
              <Swipper
                style={{height: 110}}
                showsPagination={false}
                showsButtons
                prevButton={
                  <NavPrevIcon width="35" height="35" fill="#000000" />
                }
                nextButton={
                  <NavNextIcon width="35" height="35" fill="#000000" />
                }>
                {userInfo.testimonials.map((testimonial, index) => (
                  <TestimonialItem key={index}>
                    <TestimonialInfo>
                      <TestimonialName>{testimonial.name}</TestimonialName>
                      <Stars stars={testimonial.rate} showNumber={false} />
                    </TestimonialInfo>

                    <TestimonialBody>{testimonial.body}</TestimonialBody>
                  </TestimonialItem>
                ))}
              </Swipper>
            </TestimonialArea>
          )}
        </PageBody>
      </Scroller>

      <BackButton onPress={handleBackButton}>
        <BackButtonIcon width="44" height="44" fill="#ffffff" />
      </BackButton>

      <BarberModal
        show={showModal}
        setShow={setShowModal}
        user={userInfo}
        service={selectedService}
      />
    </Container>
  );
}

export {Barber};
