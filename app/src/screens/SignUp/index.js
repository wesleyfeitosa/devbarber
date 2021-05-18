/* eslint-disable no-alert */
import React, {useState, useCallback, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';

import {SignInput} from '../../components/SignInput';
import {api} from '../../services/api';
import {UserContext} from '../../contexts/UserContext';

import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import PersonIcon from '../../assets/person.svg';

import {
  Container,
  InputArea,
  CustomButton,
  CustomButtonText,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold,
} from './styles';
import AsyncStorage from '@react-native-community/async-storage';

function SignUp() {
  const {dispatch: userDispatch} = useContext(UserContext);
  const [nameField, setNameField] = useState('');
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  const {reset} = useNavigation();

  const handleMessageButtonClick = useCallback(() => {
    reset({
      routes: [{name: 'SignIn'}],
    });
  }, [reset]);

  const handleSignInClick = useCallback(async () => {
    try {
      if (nameField && emailField && passwordField) {
        let response = await api.signUp({
          name: nameField,
          email: emailField,
          password: passwordField,
        });

        if (response.token) {
          await AsyncStorage.setItem('@DevBarber:token');

          userDispatch({
            type: 'setAvatar',
            payload: response.data.avatar,
          });

          reset({
            routes: [{name: 'MainTab'}],
          });
        } else {
          alert('Erro: ' + response.error);
        }
      } else {
        alert('Preencha os campos obrigatórios');
      }
    } catch (err) {
      console.log(err);
    }
  }, [nameField, emailField, passwordField, userDispatch, reset]);

  return (
    <Container>
      <BarberLogo width="100%" height="160" />

      <InputArea>
        <SignInput
          iconSvg={PersonIcon}
          placeholder="Digite seu nome"
          value={nameField}
          onChangeText={setNameField}
        />
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
          <CustomButtonText>CADASTRAR</CustomButtonText>
        </CustomButton>

        <SignMessageButton onPress={handleMessageButtonClick}>
          <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
          <SignMessageButtonTextBold>Faça login</SignMessageButtonTextBold>
        </SignMessageButton>
      </InputArea>
    </Container>
  );
}

export {SignUp};
