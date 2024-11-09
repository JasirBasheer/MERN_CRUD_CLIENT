import { useSelector } from "react-redux"


const Dashboard = () => {
  const user = useSelector((state: any) => state?.user)


    return (
<div className="gird grid-cols-12 sm:h-screen h-screen shadow-xl flex items-center justify-center bg-[rgb(97,92,116)]">
<div className="text-center text-white">

        <h1 className="text-[1.4rem] font-bold">Hello, {user.firstName.toUpperCase()} !</h1>
        <p>{user.email}</p>
      </div>
    </div>
  )
}

export default Dashboard