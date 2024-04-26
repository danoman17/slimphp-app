import { Navigate, Route, Routes } from 'react-router-dom';
import { VentasPage } from '../ventas'
import { AlmacenPage } from '../almacen';
import { LoginPage } from '../auth';
import { useAuthStore } from '../hooks';
import { useEffect } from 'react';


export const AppRouter = () => {

  // const authStatus = 'not-authenticated'; // 'authenticated // not-authenticated

  const { user, status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status == 'checking') {
    return (
      <h3>Cargando...</h3>
    )
  }

  return (
    <Routes>
      {
        (status === 'not-authenticated')
          ?
          (
            <>
              <Route path="/auth/*" element={<LoginPage />} />
              <Route path="/*" element={<Navigate to="/auth/login" />} />
            </>
          )
          :
          (
            (user['type'] == 'Ventas')
              ?
              (
                <>
                  <Route path="/" element={<VentasPage />} />
                  <Route path="/*" element={<Navigate to="/" />} />
                </>
              ) :
              (
                <>
                  <Route path="/" element={<AlmacenPage />} />
                  <Route path="/*" element={<Navigate to="/" />} />
                </>
              )



          )
      }
    </Routes>
  )
}
