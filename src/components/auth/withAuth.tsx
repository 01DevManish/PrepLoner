'use client';

import { useAuth, Role } from '@/hooks/useAuth';
import { ComponentType } from 'react';

// Use a generic <P> to capture the props of the WrappedComponent
export const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>, 
  requiredRole: Role
) => {
  const AuthComponent = (props: P) => {
    const { role, loading } = useAuth();

    if (loading) {
      return <div>Loading...</div>;
    }

    if (role !== requiredRole) {
      return <div>You are not authorized to view this page.</div>;
    }

    // The props are now correctly typed and passed down
    return <WrappedComponent {...props} />;
  };

  // Add a display name for better debugging in React DevTools
  AuthComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthComponent;
};