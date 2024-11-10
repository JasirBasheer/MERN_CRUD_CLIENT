import React, { useRef, useState } from 'react';
import axios from '../../utils/axios';
import Cookies from 'js-cookie';
import {  useNavigate } from 'react-router-dom';
import { message } from "antd";
import { validateEmail, validatePassword } from '../../utils/validations';
import { SpinnerCircular } from 'spinners-react';


const AdminSigninForm: React.FC = () => {

  const [email, setEmail] = useState<string>('admin@gmail.com');
  const [password, setPassword] = useState<string>('admin@123');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      emailRef.current?.focus()
      return message.error('Please enter a valid email address')
    }

    if (!validatePassword(password)) {
      passwordRef.current?.focus()
      return message.error('Please enter a valid Password')
    }

    try {
      setIsLoading(true)
      const response = await axios.post<{ AdminAccessToken: string }>('/admin/login', { email, password });
      Cookies.set('AdminAccessToken', response.data.AdminAccessToken, { path: '/', sameSite: 'None', secure: true });
      setIsLoading(false)
      message.success('Successfully authenticated')
      navigate('/admin/')
    } catch (error: any) {
      if (error?.response && error.response?.status === 400) {
        setIsLoading(false)
        return message.error(`${error?.response?.data?.error}`);
      }
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-[rgb(103,98,121)]">
      <div className="sm:w-[33rem] flex sm:h-[27rem] w-full h-full rounded-lg shadow-lg bg-[#2B2738]">
        <div className="flex-1 sm:p-9  sm:pt-16 p-9 pt-[6rem]  ">
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
            <h2 className="text-3xl font-bold text-white mb-3 ">Welcome Back .</h2>
            <div className="space-y-4 py-5">
              <div>
                <input
                  ref={emailRef}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder='Email'
                  className="w-full px-4 py-2 rounded-sm bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-[rgb(110,84,181)]"
                />
              </div>
              <div>
                <input
                  ref={passwordRef}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder='Password'
                  className="w-full px-4 py-2 rounded-sm bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-[rgb(110,84,181)]"
                />
              </div>
              <div className="flex py-2 items-center">
                <p className='text-white text-[0.8rem] '><span className='underline cursor-pointer text-[rgb(190,167,255)]'>Change Password  ?</span></p>
              </div>
              <button
                type="submit"
                className="w-full h-[3rem] flex items-center justify-center bg-[rgb(110,84,181)] text-white rounded-sm py-2 px-4 hover:bg-[rgb(94,69,161)] transition duration-200 mt-6"
              >
                {isLoading ?
                  <SpinnerCircular size={20} thickness={200} speed={100} color="rgba(255, 255, 255, 1)" secondaryColor="rgba(0, 0, 0, 0.44)" />
                  : <>Login</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
};

export default AdminSigninForm;