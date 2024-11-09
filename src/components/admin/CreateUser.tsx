import React, { useRef, useState } from 'react';
import { IoCloseCircle } from 'react-icons/io5';
import avatar from '../../assets/avatar.jpeg'
import axios from '../../utils/axios';
import { message } from 'antd';
import { validateEmail, validateFirstName, validateLastName, validatePassword } from '../../validation/registerValidation';

const CreateUser: React.FC<any> = ({ setIsUpdating,setIsCreateUserClicked }) => {


  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState<string  | null>('');
  const [password, setPassword] = useState(''); 

  const firstNameRef : any = useRef(null)
  const lastNameRef : any = useRef(null)
  const emailRef : any = useRef(null)
  const passwordRef : any = useRef(null)


  const HandleChangeImage = (e:any) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image')) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImage(reader?.result as string);
        };
        reader.onerror = (err) => console.error('Error reading file', err);
    } else {
        console.error('Please select an image file');
    }
};

  const handleSubmit = (e:React.FormEvent)=>{
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

      axios.post('/admin/create-user',{firstName,lastName,email,password,image})
      .then(response=>{
        if(response.status == 200){
            setIsUpdating((prev: any) => !prev)
            setIsCreateUserClicked((prev: any) => !prev)
            message.success('User Successfully Created')

        }
      }).catch(error =>{
        if(error.status == 400){
          message.error('User already exists')
        }
        
      })

  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
      <div className="bg-white sm:w-[25rem] flex items-center sm:h-[35rem] w-full h-full rounded-md p-5 shadow-2xl relative">
        <div>
          <IoCloseCircle
            onClick={() => setIsCreateUserClicked((prev: any) => !prev)}
            className="absolute cursor-pointer right-5 top-6 text-[1.5rem]"
          />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">

          <div className="flex items-center justify-center mb-4">
            <label htmlFor="image-upload" className="cursor-pointer">
              <img
                src={image || avatar}           
                alt="User Avatar"
                className="w-[11rem] h-[11rem] rounded-full object-cover border-2 border-gray-300"
              />
            </label>
            <input
              type="file"
              id="image-upload"
              className="hidden"
              onChange={HandleChangeImage} 
            />
          </div>

          <input
            ref={firstNameRef}
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className="mb-4 w-full p-2 rounded-md border-2 border-gray-300"
          />
          <input
          ref={lastNameRef}
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className="mb-4 w-full p-2 rounded-md border-2 border-gray-300"
          />
          <input
          ref={emailRef}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="mb-4 w-full p-2 rounded-md border-2 border-gray-300"
          />
            <input
            ref={passwordRef}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="mb-4 w-full p-2 rounded-md border-2 border-gray-300"
          />
          <button
          type='submit'
                        className="w-full h-[3rem]  bg-[rgb(110,84,181)] text-white rounded-sm py-2 px-4 hover:bg-[rgb(94,69,161)] transition duration-200 mt-6"
          >Update User</button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
