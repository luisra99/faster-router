import { Navigate } from 'react-router-dom';
import { getCookie } from './helper';

const AnonymousGuard = ({ children }: any) => {
  const session = (): boolean => {
    return !!getCookie('JWT') || !!localStorage.getItem('JWT');
  };
  return !session() ? children : <Navigate to="/" />;
};
export default AnonymousGuard;
