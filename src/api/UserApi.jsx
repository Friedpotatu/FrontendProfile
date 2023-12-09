/* eslint-disable prettier/prettier */
import axios from 'axios';

const baseURL = 'http://192.168.1.85:8000/api';

const userApi = axios.create({ baseURL });

export default userApi;