import axios from 'axios'

export const api = axios.create({
  timeout: 1000,
  headers: {'Ocp-Apim-Subscription-Key': '0a5e2e1aa9aa4c74a625e400e0e25334'}
});

export default api;
