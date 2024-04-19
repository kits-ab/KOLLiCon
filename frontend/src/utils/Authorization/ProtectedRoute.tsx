// ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '@/utils/Authorization/Auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}
// ProtectedRoute component
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { email, loading } = useUser();

  if (loading) return <div>Loading...</div>;
  return email ? <>{children}</> : <Navigate to='/login' replace />;
};

export default ProtectedRoute;
