import React, {useCallback} from 'react';
import {Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {api} from '../../services/api';

import {Container} from './styles';

function Profile() {
  const {reset} = useNavigation();

  const handleLogout = useCallback(async () => {
    await api.logout();

    reset({
      routes: [{name: 'SignIn'}],
    });
  }, [reset]);

  return (
    <Container>
      <Text>Profile</Text>

      <Button title="Sair" onPress={handleLogout} />
    </Container>
  );
}

export {Profile};
