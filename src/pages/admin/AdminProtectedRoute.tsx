import Cookies from 'js-cookie';
import { ReactNode, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from '../../utils/axios';
import { ScaleLoader } from 'react-spinners';

interface AdminProtectedRouteProps {
  children: ReactNode;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const token = Cookies.get('AdminAccessToken') || null

  useEffect(() => {
    if (!token) {    
      setIsVerified(false);
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await axios.post('/admin/verify-token', {},
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setIsVerified(response.status === 200);
        if (response.status === 200) {
          console.log(response.data);
        }
      } catch (error: any) {
                
        Cookies.remove('AdminAccessToken');
        Cookies.remove('AdminRefreshToken');
        setIsVerified(false);
      }
    };
    verifyToken();
  }, [token]);

  if (isVerified === null) {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
      <ScaleLoader />

    </div>
    )
  }

  if (!isVerified) {
    return <Navigate to="/admin/login" />;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
