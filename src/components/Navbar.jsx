import { useContext } from "react"
import { assets } from "../assets/assets"
import { AdminContext } from "../context/AdminContext"
import { useNavigate } from "react-router-dom"
import { TeacherContext } from "../context/TeacherContext"

const Navbar = () => {

  const {aToken,setAToken} = useContext(AdminContext)
  const {tToken, setTToken} = useContext(TeacherContext)

  const navigate = useNavigate()

  const logout = () => {
    navigate('')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
    tToken && setTToken('')
    tToken && localStorage.removeItem('tToken')
  }
  
  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-2 text-xs">
        <img className="w-36 sm:w-40 cursor-pointer" src={assets.admin_logo} alt="" />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-600">{aToken ? 'Admin' : 'Teacher'}</p>
      </div>
      <button onClick={logout} className="bg-primary text-white text-sm px-10 py-2 rounded-full">Logout</button>
    </div>
  )
}

export default Navbar
