"use client"
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '../Loading';

interface ProtectedRouteProps {
  children: ReactNode;
}

const SaveToken: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [token,setToken] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setToken(true);
      // router.push('/admin/login');
    }else{
      setToken(true);
    }
  }, [router]);

  return <>{token?children:<Loading/>}</>;
};

export default SaveToken;
