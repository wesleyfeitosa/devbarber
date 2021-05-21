import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const Scroller = styled.ScrollView`
  flex: 1;
`;

export const FakeSwipper = styled.View`
  height: 240px;
  background-color: #63c2d1;
`;

export const PageBody = styled.View`
  background-color: #fff;
  border-top-left-radius: 50px;
  margin-top: -50px;
`;

export const UserInfoArea = styled.View`
  flex-direction: row;
  margin-top: -30px;
`;

export const UserAvatar = styled.Image`
  width: 110px;
  height: 110px;
  border-radius: 20px;
  margin-left: 30px;
  margin-right: 30px;
  border-width: 4px;
  border-color: #fff;
`;

export const UserInfo = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const UserInfoName = styled.Text`
  color: #000;
  font-size: 18px;
  font-family: 'Montserrat-SemiBold';
  margin-bottom: 10px;
`;

export const UserFavButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  background-color: #fff;
  border: 2px solid #999999;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  margin-left: 20px;
  margin-top: 10px;
`;

export const ServiceArea = styled.View`
  margin-top: 20px;
`;

export const ServicesTitle = styled.Text`
  font-family: 'Montserrat-SemiBold';
  font-size: 18px;
  color: #268596;
  margin-left: 30px;
  margin-bottom: 20px;
`;

export const ServiceItem = styled.View`
  flex-direction: row;
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 20px;
`;

export const ServiceInfo = styled.View`
  flex: 1;
`;

export const ServiceName = styled.Text`
  font-family: 'Montserrat-SemiBold';
  font-size: 16px;
  color: #268596;
`;

export const ServicePrice = styled.Text`
  font-family: 'Montserrat-Regular';
  font-size: 14px;
  color: #268596;
`;

export const ServiceChooseButton = styled.TouchableOpacity`
  background-color: #4eadbe;
  border-radius: 10px;
  padding: 10px 15px;
`;

export const ServiceChooseButtonText = styled.Text`
  font-family: 'Montserrat-SemiBold';
  font-size: 14px;
  color: #ffffff;
`;

export const TestimonialArea = styled.View`
  margin-top: 30px;
  margin-bottom: 30px;
`;

export const TestimonialItem = styled.View`
  background-color: #268596;
  padding: 15px;
  border-radius: 10px;
  height: 110px;
  justify-content: center;
  margin-left: 40px;
  margin-right: 40px;
`;

export const TestimonialInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const TestimonialName = styled.Text`
  font-family: 'Montserrat-SemiBold';
  font-size: 14px;
  color: #ffffff;
`;

export const TestimonialBody = styled.Text`
  font-family: 'Montserrat-Regular';
  font-size: 13px;
  color: #ffffff;
`;

export const SwipeDot = styled.View`
  width: 10px;
  height: 10px;
  background-color: ${props => (props.active ? '#000' : '#fff')};
  border-radius: 5px;
  margin: 3px;
`;

export const SwipeItem = styled.View`
  flex: 1;
  background-color: #63c2d1;
`;

export const SwipeImage = styled.Image`
  width: 100%;
  height: 240px;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9;
`;

export const LoadingIcon = styled.ActivityIndicator`
  margin-top: 60px;
`;
