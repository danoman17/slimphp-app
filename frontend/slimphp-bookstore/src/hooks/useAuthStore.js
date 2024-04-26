import { useDispatch, useSelector } from 'react-redux';
import { slimAPI } from '../api';
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store';

export const useAuthStore = () => {

  const { status, user, errorMessage } = useSelector(state => state.auth);
  const dispatch = useDispatch();


  const startLogin = async ({ usuario, clave }) => {

    dispatch(onChecking());

    // console.log({ usuario, clave });

    try {

      const { data } = await slimAPI.post('/autenticacion', { usuario, clave });
      
      localStorage.setItem('user', data.data[0]);
      localStorage.setItem('userType', data.data[1]);
      dispatch(onLogin({ user: data.data[0], type: data.data[1] }));

    } catch (error) {

      dispatch(onLogout('Credenciales Incorrectas'));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 5);
    }
  }

  const startLogout = () => {

    localStorage.clear();
    dispatch(onLogout());

  }

  const checkAuthToken = async () => {

    const user = localStorage.getItem('user');
    if (!user) return dispatch(onLogout());

    try {

      const { data } = await calendarApi.get('auth/renew');
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));

    } catch (error) {

      localStorage.clear();
      dispatch(onLogout());

    }
  }

  return {
    //* Propiedades
    status,
    errorMessage,
    user,
    //* Metodos 
    startLogin,
    startLogout,
    checkAuthToken,
  }
}

