import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Home} from '../Home';
import {Search} from '../Search';
import {Appointments} from '../Appointments';
import {Favorites} from '../Favorites';
import {Profile} from '../Profile';
import {CustomTabBar} from '../../components/CustomTabBar';

const {Navigator, Screen} = createBottomTabNavigator();

function MainTab() {
  return (
    <Navigator tabBar={props => <CustomTabBar {...props} />}>
      <Screen name="Home" component={Home} />
      <Screen name="Search" component={Search} />
      <Screen name="Appointments" component={Appointments} />
      <Screen name="Favorites" component={Favorites} />
      <Screen name="Profile" component={Profile} />
    </Navigator>
  );
}

export {MainTab};
