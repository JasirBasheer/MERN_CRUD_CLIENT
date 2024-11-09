import React, { useState } from 'react';
import { IoCloseCircle } from 'react-icons/io5';
import avatar from '../../assets/avatar.jpeg'
import axios from '../../utils/axios';
import {message} from 'antd'

const EditUser: React.FC<any> = ({ user, setIsEditing }) => {


  const [firstName, setFirstName] = useState(user.firstName || '');
  const [lastName, setLastName] = useState(user.lastName || '');
  const [email, setEmail] = useState(user.email || '');
  const [image, setImage] = useState(user.image || ''); 


  const HandleChangeImage = (e:any) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image')) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.onerror = (err) => console.error('Error reading file', err);
    } else {
        console.error('Please select an image file');
    }
};

  const handleSubmit = (e:React.FormEvent)=>{
      e.preventDefault()

      
      axios.patch('/admin/edit-user',{id:user._id,firstName,lastName,email,image})
      .then(response=>{
        if(response.status == 200){
          setIsEditing((prev: any) => !prev)
          message.success('User successfully edited')
        }
      }).catch(error =>{
        if(error.status == 400){
          message.error('User already exists')
        }
        console.log(error.message);
        
      })

  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
      <div className="bg-white sm:w-[25rem] flex items-center sm:h-[32rem] w-full h-full rounded-md p-5 shadow-2xl relative">
        <div>
          <IoCloseCircle
            onClick={() => setIsEditing((prev: any) => !prev)}
            className="absolute cursor-pointer right-5 top-6 text-[1.5rem]"
          />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col items-center py-[2rem] w-full">

          <div className="flex items-center justify-center mb-4">
            <label htmlFor="image-upload" className="cursor-pointer">
              <img
                src={image.trim()==""?avatar:image} 
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
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className="mb-4 w-full p-2 rounded-md border-2 border-gray-300"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className="mb-4 w-full p-2 rounded-md border-2 border-gray-300"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
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

export default EditUser;
