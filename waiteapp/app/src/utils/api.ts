import axios from 'axios';
import { env } from './environment-variables';

export const api = axios.create({
  baseURL: env.apiUrl
});
