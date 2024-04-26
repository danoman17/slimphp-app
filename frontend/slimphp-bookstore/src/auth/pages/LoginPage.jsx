import { useEffect } from 'react';
import { useAuthStore, useForm } from '../../hooks/index';
import Swal from 'sweetalert2';
import './LoginPage.css';


// Definition of initial Form fields 
const loginFormFields = {
  loginUser: '',
  loginPassword: '',
}

export const LoginPage = () => {

  const { startLogin, errorMessage } = useAuthStore();
  const { loginUser, loginPassword, onInputChange } = useForm(loginFormFields);

  const loginSubmit = (event) => {

    event.preventDefault();
    startLogin({ usuario: loginUser, clave: loginPassword });


  }


  useEffect(() => {

    if (errorMessage !== undefined) {
      Swal.fire('Error en la autenticación', errorMessage, 'error');
    }

  }, [errorMessage]);

  return (
    <div className="container login-container d-flex justify-content-center">
      <div className="col-md-7 login-form-1">
        <h3>Login</h3>
        <form onSubmit={loginSubmit} className='mx-auto'>
          <div className="form-group mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Usuario"
              name='loginUser'
              value={loginUser}
              onChange={onInputChange}
            />
          </div>
          <div className="form-group mb-2">
            <input
              type="password"
              className="form-control"
              placeholder="Contraseña"
              name='loginPassword'
              value={loginPassword}
              onChange={onInputChange}
            />
          </div>
          <div className="d-grid gap-2">
            <input
              type="submit"
              className="btnSubmit"
              value="Enter"
            />
          </div>
        </form>
      </div>
    </div>
  )
}