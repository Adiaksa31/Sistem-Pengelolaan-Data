// components/TokenComponent.tsx
'use client';

import React, { useEffect, useState } from 'react';

const TokenComponent: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (!storedToken) {
      window.location.href = '/';
    } else {
      const tokenData = JSON.parse(atob(storedToken.split('.')[1]));
      const exp = tokenData.exp;
      const now = new Date().getTime() / 1000;
      if (exp < now) {
        localStorage.removeItem('token');
        window.location.href = '/';
      } else {
        setToken(storedToken); // Set the token if it is valid
      }
    }
  }, []);

  return null;
};

export const getToken = () => localStorage.getItem('token');

export default TokenComponent;
