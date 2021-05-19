import React from 'react';

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
  return (
    <Area>
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
