import axios from "axios";

// Base URL for the API
const API_PRODUCT_URL = "http://localhost:5000/api/products";

axios.defaults.withCredentials = true;
axios.defaults.headers.common["Content-Type"] = "application/json";

// Create Product
export const createProduct = async (formData) => {
  try {
    return await axios.post(API_PRODUCT_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true, // Include credentials (cookies)
    });
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

// Get All Products
export const getAllProducts = async () => {
  try {
    return await axios.get(API_PRODUCT_URL);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Get Product By ID
export const getProductById = async (productId) => {
  try {
    return await axios.get(`${API_PRODUCT_URL}/${productId}`);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};

// Update Product
export const updateProduct = async (productId, productData) => {
  try {
    return await axios.put(`${API_PRODUCT_URL}/${productId}`, productData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true, // Include credentials (cookies)
    });
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Delete Product By ID
export const deleteProductById = async (productId) => {
  try {
    return await axios.delete(`${API_PRODUCT_URL}/${productId}`);
  } catch (error) {
    console.error("Error deleting product by ID:", error);
    throw error;
  }
};

// Delete Multiple Products
export const deleteMultipleProducts = async (ids) => {
  try {
    return await axios.delete(API_PRODUCT_URL, {
      data: { ids },
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Include credentials (cookies)
    });
  } catch (error) {
    console.error("Error deleting multiple products:", error);
    throw error;
  }
};
