import axios from 'axios';

const request = axios.create({
  baseURL: '/',
  timeout: 5000,
});

export const getList = () =>
  request({
    url: '/list.json',
    method: 'get',
  });
