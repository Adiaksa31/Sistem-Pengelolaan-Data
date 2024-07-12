'use client'
import { useEffect, useState } from 'react';

const useToken = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');

      if (!token) {
        window.location.href = '/';
      } else {
        try {
          const tokenData = JSON.parse(atob(token.split('.')[1]));
          const exp = tokenData.exp;
          const now = new Date().getTime() / 1000;

          if (exp < now) {
            localStorage.removeItem('token');
            window.location.href = '/';
          } else {
            setToken(token);
          }
        } catch (error) {
          console.error('Invalid token:', error);
          localStorage.removeItem('token');
          window.location.href = '/';
        }
      }
    }
  }, []);

  return token;
};

export default useToken;
