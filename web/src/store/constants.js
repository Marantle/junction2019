import axios from 'axios'

export const api = axios.create({
  baseURL: "https://kesko.azure-api.net/v1/",
  timeout: 10000,
});

export default ({ api });
