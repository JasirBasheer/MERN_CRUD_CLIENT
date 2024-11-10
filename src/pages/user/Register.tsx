import { useEffect } from 'react';
import SignupForm from '../../components/user/RegisterForm'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Register:React.FC = () => {
  const token = Cookies.get('accessToken');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token, navigate])

  return !token && <SignupForm />
}

export default Register