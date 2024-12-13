import axios from "axios";

const API_URL = process.env.REACT_APP_API_USER_URL;

axios.defaults.withCredentials = true;
axios.defaults.headers.common["Content-Type"] = "application/json";

export const deleteUser = async (userId) => {
    try {
      return await axios.delete(`${API_URL}/${userId}`, {
        // return await axios.delete('http://localhost:5000/api/users/'+ userId, {
            withCredentials: true
      });
    } catch (error) {
      console.error("Error deleting user by ID:", error);
      throw error;
    }
  };

  export const editUser = async (userId, formData) => {
    try {
      // return await axios.put(`http://localhost:5000/api/users/` + userId, formData, {
      return await axios.put(`${API_URL}/${userId}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Include credentials (cookies)
      });
    } catch (error) {
      console.error("Error updating User:", error);
      throw error;
    }
  };

export const getAllUsers = async () => {
  try {
    return await axios.get('http://localhost:5000/api/users', {
      withCredentials: true,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};