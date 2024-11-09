import { HiUserAdd } from "react-icons/hi"
import avatar from '../../assets/avatar.jpeg'
import { MdBlock, MdDelete, MdOutlineModeEditOutline } from "react-icons/md"
import { IoIosSearch } from "react-icons/io"
import { useEffect, useState } from "react"
import axios from '../../utils/axios';
import EditUser from "./EditUser"
import CreateUser from "./CreateUser"
import { IoLogOut } from "react-icons/io5"
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom"
import { message } from "antd"

const TableComponent = () => {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [isUpdating, setIsUpdating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isCreateUserClicked, setIsCreateUserClicked] = useState(false)
  const [user, setUser] = useState({})
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    axios.get('/admin/get-users').then((response) => {
      setUsers(response.data.users)
      setFilteredUsers(response.data.users)
    })
      .catch(error => {
        console.log(error.message);

      })
  }, [isUpdating, isEditing])


  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setFilteredUsers(users)
    } else {
      const filtered = users.filter((user: any) =>
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredUsers(filtered)
    }
  }

  const handleDeleteUser = (id: any) => {
    setIsUpdating((prev) => !prev);
    axios.delete(`/admin/delete-user/${id}`).then(() => {
      setIsUpdating((prev) => !prev);
      message.success('User Successfully Deleted')

    })
    setIsUpdating((prev) => (!prev))

  }
  const handleLogout =()=>{
    Cookies.remove('AdminAccessToken')
    Cookies.remove('AdminRefreshToken')
    message.success('Successfully Logouted')
    navigate('/admin/login')
  }

  const handleBlockUser = (id: any, is_blocked: any) => {

    setIsUpdating((prev) => !prev);

    axios.patch(`/admin/block-user`, { id, is_blocked }).then(() => {
      setIsUpdating((prev) => !prev);
      message.success('Successfully changed Authencitation status')
    })
    
    setIsUpdating((prev) => (!prev))


  }


  return (
    <div className='w-full flex items-center justify-center pt-15 min-h-screen h-auto bg-[rgb(97,92,116)]'>
      <div className="sm:w-[70rem]  rounded-lg sm:h-auto shadow-xl h-auto w-full mt-11 mb-20 bg-slate-50">
        <div className="w-full gap-x-10 flex items-center justify-between  px-11 h-[4rem] pt-5">
          <h1 className="text-[1rem] font-bold ">USERS</h1>
<div className="flex gap-x-3">
  
          <button onClick={()=>setIsCreateUserClicked((prev)=>!prev)} className="p-3 outline-none h-[2.5rem] rounded-lg text-white text-[0.8rem] shadow-lg cursor-pointer font-bold bg-[rgb(33,33,33)] flex items-center justify-center"> <HiUserAdd className="w-[1.2rem] h-[3rem]" /> </button>
<button onClick={handleLogout} className="p-3 outline-none h-[2.5rem] rounded-lg text-white text-[0.8rem] shadow-lg cursor-pointer font-bold bg-[rgb(33,33,33)] flex items-center justify-center"> <IoLogOut className="w-[1.2rem] h-[3rem]" /> </button>
</div>
        </div>
        <div className="px-11">


          <div className="cursor-pointer bg-black flex my-4 items-center rounded-lg p-[1px] w-full h-[2.6rem] peer-focus:border-2 peer-focus:border-blue-500">
            <input
            onChange={(e)=>{
              setSearchQuery(e.target.value)
            }}
              type="text"
              className="rounded-lg outline-none border-0 w-[70rem] peer"
              placeholder="Search"
            />
            <IoIosSearch onClick={handleSearch} className="text-white cursor-pointer mx-4 text-[1.4rem]" />
          </div>



          <div className="w-full grid grid-cols-9 h-auto ">
            {
              filteredUsers?.length > 0 ? (
                filteredUsers.map((user: any) => {
                  return (
                    <div className="sm:col-span-3 col-span-12 mb-8 mr-4 rounded-md shadow-lg h-[21rem] bg-[#fff]" key={user.id}>
                      <div className="flex items-center justify-end pr-6 pt-5">
                        <MdOutlineModeEditOutline onClick={() => {
                          setUser(user)
                          setIsEditing(true)
                        }} className="hover:hover:bg-[#1e15151f] w-[2rem] cursor-pointer rounded-full h-[1.8rem] p-1" />
                      </div>
                      <div className="w-full h-[10rem] flex items-center justify-center">
                        <img
                          src={(user.image && user.image.trim() !== "" ? user.image : avatar)}
                          className="rounded-[12rem] shadow-lg w-[8rem] h-[8rem] mt-4"
                          alt="User Avatar"
                        />
                      </div>
                      <div className="text-center mt-2">
                        <p>{user.firstName}</p>
                        <p>{user.email}</p>
                      </div>
                      <div className="w-full flex items-center justify-between px-6 mt-3">
                        {user.is_blocked ?
                          (
                            <MdBlock onClick={() => handleBlockUser(user._id, user.is_blocked)} className="hover:bg-[#1e15151f] w-[2rem] text-red-600 cursor-pointer rounded-full h-[1.8rem] p-1" />

                          )
                          :
                          (
                            <MdBlock onClick={() => handleBlockUser(user._id, user.is_blocked)} className="hover:bg-[#1e15151f] w-[2rem]  cursor-pointer rounded-full h-[1.8rem] p-1" />

                          )}

                        <MdDelete onClick={() => {
                          handleDeleteUser(user._id)
                        }} className="hover:bg-[#1e15151f] w-[2rem] cursor-pointer rounded-full h-[1.8rem] p-1" />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="sm:w-[61rem] mb-12 h-[11rem] flex items-center justify-center ">
                  No Users Found..
                </div>

              )
            }


          </div>
        </div>

      </div>
      {isEditing && <EditUser user={user} setIsEditing={setIsEditing} />}
      {isCreateUserClicked && <CreateUser setIsUpdating={setIsUpdating} setIsCreateUserClicked={setIsCreateUserClicked} />}
    </div>
  )
}

export default TableComponent