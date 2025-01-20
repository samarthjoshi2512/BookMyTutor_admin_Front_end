import { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar'
import { AdminContext } from './context/AdminContext'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Admin/Dashboard'
import AllSchedules from './pages/Admin/AllSchedules'
import AddTeacher from './pages/Admin/AddTeacher'
import TeachersList from './pages/Admin/TeachersList'
import { TeacherContext } from './context/TeacherContext'
import TeacherDashboard from './pages/Teacher/TeacherDashboard'
import TeacherSchedules from './pages/Teacher/TeacherSchedules'
import TeacherProfile from './pages/Teacher/TeacherProfile'

const App = () => {

  const {aToken} = useContext(AdminContext)
  const {tToken} = useContext(TeacherContext)

  return aToken || tToken? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer/>
      <Navbar/>
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          {/* Admin Route */}
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard />}/>
          <Route path='/all-schedules' element={<AllSchedules />}/>
          <Route path='/add-teacher' element={<AddTeacher />}/>
          <Route path='/teacher-list' element={<TeachersList />}/>

          {/* Teacher Route */}
          <Route path='/teacher-dashboard' element={<TeacherDashboard />}/>
          <Route path='/teacher-schedules' element={<TeacherSchedules />}/>
          <Route path='/teacher-profile' element={<TeacherProfile />}/>
        </Routes>
      </div>
    </div>
  ) : (
    <>
         <Login />
         <ToastContainer/></>
  )
}

export default App
