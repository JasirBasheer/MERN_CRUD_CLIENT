import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/user/LoginForm';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const Login:React.FC = () => {
  const token = Cookies.get('accessToken');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return !token && <LoginForm />;
};

export default Login;
