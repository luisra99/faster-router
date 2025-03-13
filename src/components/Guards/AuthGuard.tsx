import { Navigate } from 'react-router-dom';
import { getCookie } from './helper';

const AuthGuard = ({ children }: any) => {
  const session = (): boolean => {
    return !!getCookie('JWT') || !!localStorage.getItem('JWT');
  };
  return session() ? children : <Navigate to="/sign-in" />;
};
export default AuthGuard;
