import axios from 'axios';
import env from './config/test.env';

export const baseURL = env.API_HOST;

export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

export const params = {
  client_id: env.CLIENT_ID,
  client_secret: env.CLIENT_SECRET,
};
