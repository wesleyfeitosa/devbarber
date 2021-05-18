import React, {useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';

import BarberLogo from '../../assets/barber.svg';
import {UserContext} from '../../contexts/UserContext';
import {api} from '../../services/api';

import {Container, LoadingIcon} from './styles';

function Preload() {
  const {dispatch: userDispatch} = useContext(UserContext);
  const {navigate} = useNavigation();

  const {reset} = useNavigation();

  useEffect(() => {
    async function checkToken() {
      try {
        const token = await AsyncStorage.getItem('@DevBarber:token');

        if (token) {
          let response = await api.checkToken(token);

          if (response.token) {
            await AsyncStorage.setItem('@DevBarber:token', response.token);
            console.log(userDispatch);

            userDispatch({
              type: 'setAvatar',
              payload: {
                avatar: response.data.avatar,
              },
            });

            reset({
              routes: [{name: 'MainTab'}],
            });
          } else {
            navigate('SignIn');
          }
        } else {
          navigate('SignIn');
        }
      } catch (err) {
        console.log(err);
      }
    }

    checkToken();
  }, [navigate, userDispatch, reset]);

  return (
    <Container>
      <BarberLogo width="100%" height="160" />
      <LoadingIcon size="large" color="#ffffff" />
    </Container>
  );
}

export {Preload};
