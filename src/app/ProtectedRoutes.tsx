import { useAtomValue } from 'jotai';
import { Navigate } from 'react-router';
import { isAuthAtom } from './state/AppAtoms';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuth = useAtomValue(isAuthAtom)
  if (!isAuth) {
    return <Navigate to='/login' />
  }
  return children
};

export default ProtectedRoute;