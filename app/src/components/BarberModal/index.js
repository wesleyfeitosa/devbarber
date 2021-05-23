/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

import ExpandIcon from '../../assets/expand.svg';
import NavPrevIcon from '../../assets/nav_prev.svg';
import NavNextIcon from '../../assets/nav_next.svg';
import {api} from '../../services/api';

import {
  Modal,
  ModalArea,
  ModalBody,
  CloseButton,
  ModalItem,
  UserInfo,
  UserAvatar,
  UserName,
  ServiceInfo,
  ServiceName,
  ServicePrice,
  FinishButton,
  FinishButtonText,
  DateInfo,
  DatePrevArea,
  DateTitleArea,
  DateTitle,
  DateNextArea,
  DateList,
  DateItem,
  DateItemWeekDay,
  DateItemNumber,
  TimeList,
  TimeItem,
  TimeItemText,
} from './styles';

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

function BarberModal({show, setShow, user, service}) {
  const {navigate} = useNavigation();
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedHour, setSelectedHour] = useState(null);
  const [listDays, setListDays] = useState([]);
  const [listHours, setListHours] = useState([]);

  useEffect(() => {
    let today = new Date();
    setSelectedYear(today.getFullYear());
    setSelectedMonth(today.getMonth());
    setSelectedDay(today.getDate());
  }, []);

  function handleCloseButton() {
    setShow(false);
  }

  useEffect(() => {
    if (user.available) {
      const daysInMonth = new Date(
        selectedYear,
        selectedMonth + 1,
        0,
      ).getDate();
      const newListDays = [];

      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(selectedYear, selectedMonth, i);
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;
        const selDate = `${year}-${month}-${day}`;

        let availability = user.available.filter(e => e.date === selDate);

        newListDays.push({
          status: availability.length > 0,
          weekDay: days[date.getDay()],
          number: i,
        });
      }

      setListDays(newListDays);
      setSelectedDay(0);
      setListHours([]);
      setSelectedHour(0);
    }
  }, [selectedMonth, selectedYear, user.available]);

  useEffect(() => {
    if (user.available && selectedDay > 0) {
      const date = new Date(selectedYear, selectedMonth, selectedDay);

      const year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();

      month = month < 10 ? '0' + month : month;
      day = day < 10 ? '0' + day : day;
      const selDate = `${year}-${month}-${day}`;

      let availability = user.available.filter(e => e.date === selDate);

      if (availability.length > 0) {
        setListHours(availability[0].hours);
      }
    }

    setSelectedHour(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDay, user.available]);

  const handleFinishClick = useCallback(async () => {
    if (
      user.id &&
      service &&
      selectedYear > 0 &&
      selectedMonth > 0 &&
      selectedDay > 0 &&
      selectedHour
    ) {
      try {
        const response = await api.setAppointment(
          user.id,
          service,
          selectedDay,
          selectedHour,
          selectedMonth,
          selectedYear,
        );

        setShow(false);
        navigate('Appointments');
      } catch (err) {
        alert(err);
      }
    } else {
      alert('Preencha todos os dados!');
    }
  }, [
    selectedDay,
    selectedHour,
    selectedMonth,
    selectedYear,
    service,
    user.id,
    setShow,
    navigate,
  ]);

  const handleLeftDateClick = () => {
    const mountDate = new Date(selectedYear, selectedMonth, 1);

    mountDate.setMonth(mountDate.getMonth() - 1);

    setSelectedYear(mountDate.getFullYear());
    setSelectedMonth(mountDate.getMonth());
    setSelectedDay(0);
  };

  const handleRightDateClick = () => {
    const mountDate = new Date(selectedYear, selectedMonth, 1);

    mountDate.setMonth(mountDate.getMonth() + 1);

    setSelectedYear(mountDate.getFullYear());
    setSelectedMonth(mountDate.getMonth());
    setSelectedDay(0);
  };

  return (
    <Modal transparent visible={show} animationType="slide">
      <ModalArea>
        <ModalBody>
          <CloseButton onPress={handleCloseButton}>
            <ExpandIcon width="40" height="40" fill="#000000" />
          </CloseButton>

          <ModalItem>
            <UserInfo>
              <UserAvatar source={{uri: user.avatar}} />
              <UserName>{user.name}</UserName>
            </UserInfo>
          </ModalItem>

          {service && (
            <ModalItem>
              <ServiceInfo>
                <ServiceName>{service.name}</ServiceName>
                <ServicePrice>R$ {service.price.toFixed(2)}</ServicePrice>
              </ServiceInfo>
            </ModalItem>
          )}

          <ModalItem>
            <DateInfo>
              <DatePrevArea onPress={handleLeftDateClick}>
                <NavPrevIcon width="35" height="35" fill="#000000" />
              </DatePrevArea>

              <DateTitleArea>
                <DateTitle>
                  {months[selectedMonth] + ' ' + selectedYear}
                </DateTitle>
              </DateTitleArea>

              <DateNextArea onPress={handleRightDateClick}>
                <NavNextIcon width="35" height="35" fill="#000000" />
              </DateNextArea>
            </DateInfo>

            <DateList horizontal showsHorizontalScrollIndicator={false}>
              {listDays.map((item, index) => (
                <DateItem
                  key={index}
                  onPress={() =>
                    item.status ? setSelectedDay(item.number) : null
                  }
                  style={{
                    opacity: item.status ? 1 : 0.5,
                    backgroundColor:
                      item.number === selectedDay ? '#4eadbe' : '#ffffff',
                  }}>
                  <DateItemWeekDay
                    style={{
                      color:
                        item.number === selectedDay ? '#ffffff' : '#000000',
                    }}>
                    {item.weekDay}
                  </DateItemWeekDay>
                  <DateItemNumber
                    style={{
                      color:
                        item.number === selectedDay ? '#ffffff' : '#000000',
                    }}>
                    {item.number}
                  </DateItemNumber>
                </DateItem>
              ))}
            </DateList>
          </ModalItem>

          {selectedDay > 0 && listHours.length > 0 && (
            <ModalItem>
              <TimeList horizontal showsHorizontalScrollIndicator={false}>
                {listHours.map((item, index) => (
                  <TimeItem
                    key={index}
                    onPress={() => setSelectedHour(item)}
                    style={{
                      backgroundColor:
                        item === setSelectedHour ? '#4eadbe' : '#ffffff',
                    }}>
                    <TimeItemText
                      style={{
                        color: item === selectedHour ? '#ffffff' : '#000000',
                      }}>
                      {item}
                    </TimeItemText>
                  </TimeItem>
                ))}
              </TimeList>
            </ModalItem>
          )}

          <FinishButton onPress={handleFinishClick}>
            <FinishButtonText>Finalizar Agendamento</FinishButtonText>
          </FinishButton>
        </ModalBody>
      </ModalArea>
    </Modal>
  );
}

export {BarberModal};
