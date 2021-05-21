import React, {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';

import {Stars} from '../../components/Stars';

import {
  Area,
  Avatar,
  InfoArea,
  UserName,
  SeeProfileButton,
  SeeProfileButtonText,
} from './styles';

function BarberItem({data}) {
  const {navigate} = useNavigation();

  const handleClick = useCallback(() => {
    navigate('Barber', {
      id: data.id,
      avatar: data.avatar,
      name: data.name,
      stars: data.stars,
    });
  }, [navigate, data]);

  return (
    <Area onPress={handleClick}>
      <Avatar source={{uri: data.avatar}} />

      <InfoArea>
        <UserName>{data.name}</UserName>

        <Stars stars={data.stars} showNumber={true} />

        <SeeProfileButton>
          <SeeProfileButtonText>Ver perfil</SeeProfileButtonText>
        </SeeProfileButton>
      </InfoArea>
    </Area>
  );
}

export {BarberItem};
