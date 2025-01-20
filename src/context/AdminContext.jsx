import { createContext, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

 export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'')
  const [teachers,setTeachers] = useState([])
  const [schedules, setSchedules] = useState([])
  const [dashData, setDashData] = useState(false)

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://book-my-tutor-back-end.vercel.app'


  const getAllTeachers = async () => {
    try {
      
      const {data} = await axios.post(backendUrl + '/api/admin/all-teachers' , {},{headers:{aToken}} )
      if (data.success) {
        setTeachers(data.teachers)
        console.log(data.teachers)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

  }

  const changeAvailability = async (teacId) => {

    try {
      
      const {data} = await axios.post(backendUrl + '/api/admin/change-availability', {teacId},{headers:{aToken}})
      if (data.success) {
        toast.success(data.message)
        getAllTeachers()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const getAllSchedules = async () => {


    try {
      
      const {data} = await axios.get(backendUrl + '/api/admin/schedules', {headers:{aToken}})

      if (data.success) {
        setSchedules(data.schedules)
        console.log(data.schedules);
        
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const cancelSchedule = async (scheduleId) => {

    try {
      
      const {data} = await axios.post(backendUrl + '/api/admin/cancel-schedule',{scheduleId}, {headers:{aToken}})
      if (data.success) {
        toast.success(data.message)
        getAllSchedules()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

  }

  const getDashData = async () => {

    try {

      const {data} = await axios.get(backendUrl + '/api/admin/dashboard', {headers:{aToken}})
      if (data.success) {
        setDashData(data.dashData)
        console.log(data.dashData);
        
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

  }

  const value = {
    aToken,setAToken,
    backendUrl,teachers,
    getAllTeachers,changeAvailability,
    schedules,setSchedules,
    getAllSchedules,
    cancelSchedule,
    dashData,getDashData
  }

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  )
}

export default  AdminContextProvider;
