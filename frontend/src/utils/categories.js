import axios from "axios";

// Base URL for the API
const API_URL = process.env.REACT_APP_API_CATEGORY_URL;

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
