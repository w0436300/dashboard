//     1. Check user login status
//     2. Check access permissions
//     3. Redirect or display content

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

export const ProtectedRoute = ({ children, requireSubscription = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  //Navigate to sigin page if user not login 
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};