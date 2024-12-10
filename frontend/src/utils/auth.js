import axios from "axios";

// Base URL for the API
const API_URL = "http://localhost:5000/api/auth";

// Sign Up Function
export const signUp = async (userData) => {
  try {
    return await axios.post(`${API_URL}/signup`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

// Sign In Function
export const signIn = async (credentials) => {
  try {
    return await axios.post(`${API_URL}/login`, credentials, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Include credentials (cookies)
    });
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

// Sign Out Function
export const signOut = async () => {
  try {
    return await axios.post(
      `${API_URL}/logout`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Include credentials (cookies)
      }
    );
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};
