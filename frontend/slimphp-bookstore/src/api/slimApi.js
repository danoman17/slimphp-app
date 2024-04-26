import axios from 'axios';



const slimAPI = axios.create({
  baseURL: 'http://slimphp.local:8888'
});

// Todo: configurar interceptores

slimAPI.interceptors.request.use( config => {

  config.headers = {
    ...config.headers,
    'X-API-User': localStorage.getItem('token'),
    'X-API-Key': localStorage.getItem('token'),
  }
  
  return config;

} );


export default slimAPI;