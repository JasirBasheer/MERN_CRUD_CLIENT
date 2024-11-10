import { useEffect } from "react";
import AdminSigninForm from "../../components/admin/AdminSigninForm"
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

const Signin: React.FC = () => {
  const token = Cookies.get('AdminAccessToken');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/admin/');
    }
  }, [token, navigate]);

  return !token && <AdminSigninForm />;
}

export default Signin