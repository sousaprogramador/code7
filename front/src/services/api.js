import axios from 'axios';

import store from '../store';

const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Accept: 'application/json',
  },
});

export const userApi = axios.create({
  baseURL:
    // /*'http://localhost:8080/citizen/',*/ 'https://api3.medcovid.amla.com.br/citizen/,
    'https://api1.covid.saude.araguaina.to.gov.br/citizen',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
});

export const addressApi = axios.create({
  baseURL: 'https://viacep.com.br',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
});

api.interceptors.request.use(async (config) => {
  const { token } = store.getState().auth;
  const headers = { ...config.headers };

  if (token) headers.Authorization = `Bearer ${token}`;
  return { ...config, headers };
});

export default api;
