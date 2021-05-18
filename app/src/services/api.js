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
};

export {api};
