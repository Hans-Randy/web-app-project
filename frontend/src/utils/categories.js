import axios from "axios";

// Base URL for the API
const API_URL = "http://localhost:5000/api/categories";

axios.defaults.withCredentials = true;
axios.defaults.headers.common["Content-Type"] = "application/json";

// Get Distinct Categories
export const getDistinctCategories = async () => {
  try {
    return await axios.get(API_URL);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
