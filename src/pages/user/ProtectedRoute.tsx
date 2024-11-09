import Cookies from 'js-cookie';
import { ReactNode, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from '../../utils/axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/features/userSlice';
import { ScaleLoader } from 'react-spinners';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const token = useSelector((state: any) => state.user.token);
  console.log("Token from store:", token);
  const dispatch = useDispatch()

  useEffect(() => {
    if (!token) {    
      setIsVerified(false);
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await axios.post('/verify-token', {},
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setIsVerified(response.status === 200);
        if (response.status === 200) {
          console.log(response.data);
          
          dispatch(setUser({ firstName: response?.data.firstName, lastName: response?.data.lastName, email: response?.data.email, id: response?.data.id ,image:response?.data.image}))

        }
      } catch (error: any) {
                
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
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
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
