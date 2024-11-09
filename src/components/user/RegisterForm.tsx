import { useRef, useState } from 'react'
import axios from '../../utils/axios';
import { Link, useNavigate } from 'react-router-dom';
import { Carousel } from 'flowbite-react';
import slide1 from '../../assets/slide1.jpg'
import slide2 from '../../assets/slide2.jpg'
import slide3 from '../../assets/slide3.jpg'
import google from '../../assets/google.png'
import gitHub from '../../assets/github.png'

import { message } from "antd";
import { validateEmail, validateFirstName, validateLastName, validatePassword } from '../../validation/registerValidation';
import { SpinnerCircular } from 'spinners-react';

const RegisterForm = () => {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading,setIsLoading]=useState(false)


  const firstNameRef : any = useRef(null)
  const lastNameRef : any = useRef(null)
  const emailRef : any = useRef(null)
  const passwordRef : any = useRef(null)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if(!validateFirstName(firstName)){
      firstNameRef.current?.focus() 
      return message.error('Please enter a valid First Name') 
    } 
    if(!validateLastName(lastName)){
      lastNameRef.current?.focus() 
      return message.error('Please enter a valid Last Name')
    }
      
    if(!validateEmail(email)){
      emailRef.current?.focus() 
      return message.error('Please enter a valid email address')
    } 
      
    if(!validatePassword(password)){
      passwordRef.current?.focus() 
      return message.error('Please enter a valid Password')
    } 

    setIsLoading(true)


    axios.post('/register', { firstName,lastName, email, password })
      .then(() => {
        message.success('User Successfully created')
        message.success('Please login to continue')
    setIsLoading(false)
        navigate('/login')
      }).catch(error => {
    setIsLoading(false)
        
        if (error?.response && error?.response.status === 400) {
          return message.error('User Already exists')
             
          }

      })

  }
  return (
    <div className="flex justify-center items-center h-screen bg-[rgb(103,98,121)]">
      <div className="sm:w-[65rem] flex sm:h-[39rem] w-full h-full rounded-lg shadow-lg bg-[#2B2738]">

        <div className="sm:flex hidden w-[32rem] p-5 h-full  rounded-l-lg overflow-hidden">
          <Carousel slide={false} leftControl=" " rightControl=" " className=' h-full w-fullcustom-carousel'>

            <div className="relative h-full w-full">
              <img
                src={slide2}
                alt="carousel-1"
                className="absolute inset-0 w-full h-full object-cover"
              />

              <p className='absolute bottom-16 text-center font-bold text-[1rem] left-[12rem] text-white'>
                Be Creative

              </p>
            </div>
            <div className="relative h-full w-full">
              <img
                src={slide3}
                alt="carousel-2"
                className="absolute inset-0 w-full h-full object-cover"
              />

              <p className='absolute bottom-16 text-center font-bold text-[1rem] left-[12rem] text-white'>
                Be Mindful
              </p>
            </div>
            <div className="relative h-full w-full">
              <img
                src={slide1}
                alt="carousel-3"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <p className='absolute bottom-16 text-center font-bold text-[1rem] left-[12rem] text-white'>
                Be Greatefull
              </p>
            </div>


          </Carousel>
        </div>


        <div className="flex-1 sm:p-9   sm:pt-16 p-9 pt-[6rem]  ">
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
            <h2 className="text-3xl font-bold text-white mb-3 ">Create an account</h2>
            <p className='text-white '>Already have an account ? <Link to={'/login'} className='text-blue-400 underline'>Log in</Link></p>
            <div className="space-y-4 py-5">
              <div className='sm:flex'>

                <input
                ref={firstNameRef}
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  type="text"
                  placeholder='First Name'
                  className="sm:w-[12.5rem] w-full mr-4 px-4 sm:mb-0 mb-4 py-2 rounded-sm bg-gray-700 text-white border  border-gray-600 focus:outline-none focus:border-[rgb(110,84,181)]"
                />
                 
                <input
                ref={lastNameRef}
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  placeholder='Last Name'
                  type="text"
                  className="sm:w-[15rem] w-full px-4 py-2 rounded-sm bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-[rgb(110,84,181)]"
                />
                </div> 

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
                <input type="checkbox"   className="border-none w-3 h-3 cursor-pointer mr-2 outline-none " name="" id="" />

                <p className='text-white text-[0.8rem] '>I agree to the <span className='underline cursor-pointer text-[rgb(110,84,181)]'>Terms & Conditions</span></p>
              </div>
       

            <button
              type="submit"
              className="w-full h-[3rem]  bg-[rgb(110,84,181)] flex items-center justify-center text-white rounded-sm py-2 px-4 hover:bg-[rgb(94,69,161)] transition duration-200 mt-6"
            >
              
              {isLoading?
                            <SpinnerCircular size={20} thickness={200} speed={100} color="rgba(255, 255, 255, 1)" secondaryColor="rgba(0, 0, 0, 0.44)" />

              :<>Create an account</>}


            </button>
            </div>
          </form>
          <div className="mt-2">
          <hr className="border-t-2 border-[#60587a]" />

          <p className='sm:flex hidden absolute top-[33.3rem] text-white text-[0.7rem] w-[8rem]  items-center justify-center  right-[28.5rem] bg-[#2B2738]'>or register with</p>
          </div>

          <div className="sm:flex p-2 cursor-pointer hidden w-full mt-6 h-[4rem]  ">
            <div className="w-[13rem] mr-5 border-[1px] text-[#ffffff92] flex items-center justify-center rounded-md border-[#ffffff92]">
              <img src={google} className='w-6 mr-2' alt="" />
              <p>Google</p>
            </div>
            <div className="w-[13rem] cursor-pointer mr-5 border-[1px] text-[#ffffff92] flex items-center justify-center rounded-md border-[#ffffff92]">
              <img src={gitHub} className='w-6  mr-2' alt="" />
              <p>Github</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default RegisterForm


