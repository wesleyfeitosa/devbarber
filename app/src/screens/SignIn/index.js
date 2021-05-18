/* eslint-disable no-alert */
import React, {useState, useCallback, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import {SignInput} from '../../components/SignInput';
import {api} from '../../services/api';
import {UserContext} from '../../contexts/UserContext';

import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

import {
  Container,
  InputArea,
  CustomButton,
  CustomButtonText,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold,
} from './styles';

function SignIn() {
  const {dispatch: userDispatch} = useContext(UserContext);
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  const {reset} = useNavigation();

  const handleMessageButtonClick = useCallback(() => {
    reset({
      routes: [{name: 'SignUp'}],
    });
  }, [reset]);

  const handleSignInClick = useCallback(async () => {
    try {
      if (emailField && passwordField) {
        let response = await api.signIn({
          email: emailField,
          password: passwordField,
        });

        if (response.token) {
          await AsyncStorage.setItem('@DevBarber:token', response.token);

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
          alert('E-mail e/ou senha errados!');
        }
      } else {
        alert('Preencha os campos obrigatórios');
      }
    } catch (err) {
      console.log(err);
    }
  }, [emailField, passwordField, userDispatch, reset]);

  return (
    <Container>
      <BarberLogo width="100%" height="160" />

      <InputArea>
        <SignInput
          iconSvg={EmailIcon}
          placeholder="Digite seu e-mail"
          value={emailField}
          onChangeText={setEmailField}
        />
        <SignInput
          iconSvg={LockIcon}
          placeholder="Digite sua senha"
          value={passwordField}
          onChangeText={setPasswordField}
          secureTextEntry
        />

        <CustomButton onPress={handleSignInClick}>
          <CustomButtonText>LOGIN</CustomButtonText>
        </CustomButton>

        <SignMessageButton onPress={handleMessageButtonClick}>
          <SignMessageButtonText>
            Ainda não possui uma conta?
          </SignMessageButtonText>
          <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
        </SignMessageButton>
      </InputArea>
    </Container>
  );
}

export {SignIn};
