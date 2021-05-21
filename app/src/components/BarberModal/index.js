import React from 'react';
import {useNavigation} from '@react-navigation/native';

import ExpandIcon from '../../assets/expand.svg';

import {Modal, ModalArea, ModalBody, CloseButton} from './styles';

function BarberModal({show, setShow, user, service}) {
  const {navigate} = useNavigation();

  function handleCloseButton() {
    setShow(false);
  }

  return (
    <Modal transparent visible={show} animationType="slide">
      <ModalArea>
        <ModalBody>
          <CloseButton onPress={handleCloseButton}>
            <ExpandIcon width="40" height="40" fill="#000000" />
          </CloseButton>
        </ModalBody>
      </ModalArea>
    </Modal>
  );
}

export {BarberModal};
