import axios from 'axios';
import { getData } from './storage';

/* Endereços para cada emulador/simulador:
** Genymotion:              http://10.0.3.2:3333/
** Emulador Android Studio: http://10.0.2.2:3333/
** Simulador IOS:           http://localhost:3333/
*/
const api = axios.create({
    baseURL: "https://am-mpsp.appspot.com/api/v1"
});


api.interceptors.request.use(async config => {
    const data = JSON.parse(await getData());
    if (data.token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  
export default api;