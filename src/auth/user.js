import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    console.log(response, "called user.js");
    return response.data;
  } catch (error) {
    if(error.response.status===400){
        alert(error.response.data.message);
    }else{ 
    console.error("Signup failed:", error.response?.data || error.message);
    throw error;
    }
  }
};


// Login function
export const login = async (userData) => {
//   const response = await axios.post(`${API_URL}/login`, userData, { withCredentials: true });
    const response=await axios.post(`${API_URL}/login`,userData,{
        withCredentials: true,
    });
  return response.data;
};

//Check Session
export const checkSession = async () => {
     
    const res = await axios.get(`${API_URL}/checkSession`, {
      withCredentials: true,
    });
  
    return res.data.authenticated;
  };

// // Logout function
export const logout = async () => {
  const response = await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
  return response.data;
};
