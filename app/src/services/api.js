import AsyncStorage from '@react-native-community/async-storage';

const BASE_API = 'https://api.b7web.com.br/devbarber/api';

const api = {
  checkToken: async function (token) {
    const response = await fetch(`${BASE_API}/auth/refresh`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({token}),
    });

    const json = await response.json();
    return json;
  },

  signIn: async function ({email, password}) {
    const response = await fetch(`${BASE_API}/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    });

    const json = await response.json();
    return json;
  },

  signUp: async function ({name, email, password}) {
    const response = await fetch(`${BASE_API}/user`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({name, email, password}),
    });

    const json = await response.json();
    return json;
  },

  logout: async function () {
    const token = await AsyncStorage.getItem('@DevBarber:token');

    const response = await fetch(`${BASE_API}/auth/logout`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({token}),
    });

    const json = await response.json();
    return json;
  },

  getBarbers: async function (latitude = null, longitude = null, address = '') {
    const token = await AsyncStorage.getItem('@DevBarber:token');

    console.log('======================================');
    console.log('latitude', latitude);
    console.log('longitude', longitude);
    console.log('address', address);
    console.log('--------------------------------------');

    const response = await fetch(
      `${BASE_API}/barbers?token=${token}&lat=${latitude}&lng=${longitude}&address=${address}`,
    );

    const json = await response.json();
    return json;
  },

  getBarber: async function (id) {
    const token = await AsyncStorage.getItem('@DevBarber:token');

    const response = await fetch(`${BASE_API}/barber/${id}?token=${token}`);

    const json = await response.json();
    console.log('BARBEIRO: ', json);
    return json;
  },
};

export {api};
