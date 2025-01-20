import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const TeacherContext = createContext();

const TeacherContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://book-my-tutor-back-end.vercel.app';

  const [tToken, setTToken] = useState(
    localStorage.getItem("tToken") ? localStorage.getItem("tToken") : ""
  );
  const [schedules, setSchedules] = useState([]);
  const [dashData, setDashdata] = useState({}); // Initialize as an empty object
  const [profileData, setProfileData] = useState(false);

  const getSchedules = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/teacher/schedules", {
        headers: { tToken },
      });      

      if (data.success) {
        // Ensure data.schedules is an array before calling .reverse()
        const schedulesData = Array.isArray(data.schedules)
          ? data.schedules.reverse()
          : [];
        setSchedules(schedulesData);
        console.log(schedulesData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.message || "An error occurred while fetching schedules"
      );
    }
  };

  const completeSchedule = async (scheduleId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/teacher/complete-schedule",
        { scheduleId },
        { headers: { tToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getSchedules();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.message || "An error occurred while completing the schedule"
      );
    }
  };

  const cancelSchedule = async (scheduleId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/teacher/cancel-schedule",
        { scheduleId },
        { headers: { tToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getSchedules();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.message || "An error occurred while canceling the schedule"
      );
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/teacher/dashboard", {
        headers: { tToken },
      });

      if (data.success) {
        setDashdata(data.dashData);
        console.log("DashData:", data.dashData); // Log to check the shape of the data
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.message || "An error occurred while fetching dashboard data"
      );
    }
  };

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/teacher/profile", {
        headers: { tToken },
      });
      if (data.success) {
        setProfileData(data.profileData);
        console.log(data.profileData);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.message || "An error occurred while fetching dashboard data"
      );
    }
  };

  const value = {
    tToken,
    setTToken,
    backendUrl,
    schedules,
    setSchedules,
    getSchedules,
    completeSchedule,
    cancelSchedule,
    dashData,
    setDashdata,
    getDashData,
    profileData,
    setProfileData,
    getProfileData,
  };

  return (
    <TeacherContext.Provider value={value}>
      {props.children}
    </TeacherContext.Provider>
  );
};

export default TeacherContextProvider;
