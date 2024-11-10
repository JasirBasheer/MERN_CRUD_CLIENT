import React, { useRef, useState } from 'react';
import { IoCloseCircle } from 'react-icons/io5';
import avatar from '../../assets/avatar.jpeg'
import axios from '../../utils/axios';
import { message } from 'antd';
import { validateEmail, validateFirstName, validateLastName, validatePassword } from '../../utils/validations';
import { CreateUserProps } from '../../types/adminTypes';



const CreateUser: React.FC<CreateUserProps> = ({ setIsUpdating, setIsCreateUserClicked }) => {

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [image, setImage] = useState<string | null>('');
  const [password, setPassword] = useState<string>('');

  const firstNameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const HandleChangeImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && file.type.startsWith('image')) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.onerror = (err) => console.error('Error reading file', err);
    } else {
      console.error('Please select an image file');
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<any> => {
    e.preventDefault()

    if (!validateFirstName(firstName)) {
      firstNameRef.current?.focus()
      return message.error('Please enter a valid First Name')
    }
    if (!validateLastName(lastName)) {
      lastNameRef.current?.focus()
      return message.error('Please enter a valid Last Name')
    }

    if (!validateEmail(email)) {
      emailRef.current?.focus()
      return message.error('Please enter a valid email address')
    }

    if (!validatePassword(password)) {
      passwordRef.current?.focus()
      return message.error('Please enter a valid Password')
    }

    axios.post('/admin/create-user', { firstName, lastName, email, password, image })
      .then(response => {
        if (response.status == 200) {
          setIsUpdating((prev) => !prev)
          setIsCreateUserClicked((prev) => !prev)
          message.success('User Successfully Created')
        }
      }).catch(error => {
        if (error.status == 400) {
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
