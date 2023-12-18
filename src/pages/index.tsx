import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Dashboard from './dashboard';

const IndexPage: React.FC = () => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if token exists or user is authenticated
        const token = localStorage.getItem('token');
        const isAuthenticated = !!token;

        // Set authentication status
        setAuthenticated(isAuthenticated);

        // Redirect to dashboard if authenticated
        if (isAuthenticated) {
          router.push('/dashboard');
        }else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Authentication error:', error);
        // Handle authentication error as needed
      }
    };

    checkAuth();
  }, [router]);

  return (<></>);
};

export default IndexPage;
