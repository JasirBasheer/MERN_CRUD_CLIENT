import { Link, useNavigate } from "react-router-dom"
import Cookies from 'js-cookie';
import { message } from "antd";

const NavBar:React.FC = () => {
  const navigate = useNavigate()
  const handleLogout =()=>{
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    message.success('Logouted Successfully')
    navigate('/login')
  }
  return (
    <div className='grid grid-cols-12 sm:h-[4.5rem] shadow-sm top-0 fixed bg-[rgb(43,39,56)]'>
    <div className="sm:col-span-9 ml-[3rem] sm:flex hidden   items-center">
      <h1 className="font-bold text-[1.4rem] text-white"><Link to={'/'}>MERN-CRUD</Link></h1>
    </div>
    <div className="sm:col-span-2 flex sm:gap-x-16 gap-x-20 items-center p-[1rem]">
      <p className="hover:underline cursor-pointer transition duration-200 text-white"><Link to={'/'}>Home</Link></p>
      <p className="hover:underline cursor-pointer transition duration-200 text-white"><Link to={'/profile'}>Profile</Link></p>
      <p onClick={handleLogout} className="py-2 rounded-md shadow-md cursor-pointer font-mono px-6 hover:bg-[#ffffff98] transition duration-200 flex items-center justify-center bg-white">Logout</p>
    </div>
      </div>
  )
}

export default NavBar