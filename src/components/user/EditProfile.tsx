import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import avatar from '../../assets/avatar.jpeg'
import axios from '../../utils/axios';
import { message } from "antd";
import { setUser } from "../../redux/features/userSlice";
import { RootState, UserPayload } from "../../types/userTypes";

const EditProfile:React.FC = () => {
  const user = useSelector((state: RootState) => state?.user)

  const [firstName, setFirstName] = useState<string>(user.firstName || '')
  const [lastName, setLastName] = useState<string>(user.lastName || '')
  const [email, setEmail] = useState<string>(user.email || '')
  const [image, setImage] = useState<string>(user.image || '')
  const dispatch = useDispatch()

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.patch('/edit-profile', {id: user.id,firstName,lastName,email,image,}).then(response => {
      if (response.status === 200) {
        const userData: UserPayload = { id: user.id,firstName,lastName,email,image};
        dispatch(setUser(userData));
        message.success("Profile updated successfully");
      }
    }).catch((error: any) => {
      if (error.response?.status === 400) {
        return message.error(`${error.response.data.error}`);
      } else {
        console.error(error.message);
      }
    })
  };

  return (
    <div className=' w-full h-screen sm:pt-20 flex items-center justify-center bg-[rgb(97,92,116)]'>
      <div className="bg-[rgb(43,39,56)] sm:w-[25rem] flex items-center sm:h-[32rem] w-full h-full rounded-md p-5 shadow-2xl relative">
        <div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col items-center py-[2rem] w-full">
          <div className="flex items-center justify-center mb-4">
            <label htmlFor="image-upload" className="cursor-pointer">
              <img
                src={image.trim() == "" ? avatar : image}
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
            className="mb-4 w-full p-2 rounded-sm bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-[rgb(110,84,181)]"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className="mb-4 w-full p-2 rounded-sm bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-[rgb(110,84,181)]"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="mb-4 w-full p-2 rounded-sm bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-[rgb(110,84,181)]"
          />
          <button
            type='submit'
            className="w-full h-[3rem]   text-white rounded-sm py-2 px-4 bg-[rgb(110,84,181)]  hover:bg-[rgb(94,69,161)] transition duration-200 mt-6"
          >Update User</button>
        </form>
      </div>
    </div>
  )
}

export default EditProfile