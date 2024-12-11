import "../layout/css/layout.css";
import "../layout/css/modal.css";
import React, { useState } from "react";
import { updateProduct } from "../utils/products";

const UpdateProductModal = ({ isVisible, setVisibility, productData }) => {
  const [name, setName] = useState(productData.name);
  const [description, setDescription] = useState(productData.description);
  const [price, setPrice] = useState(productData.price);
  const [category, setCategory] = useState(productData.category);
  const [quantity, setQuantity] = useState(productData.quantity);
  const [imageFile, setImageFile] = useState(null); // State to hold the selected image file

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); // Set the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to send data including image
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("quantity", quantity);
    if (imageFile) {
      formData.append("file", imageFile); // Append the image file if it exists
    }

    try {
      const result = await updateProduct(productData._id, formData); // Pass FormData to updateProduct
      console.log("Product Update Successful:", result.data);
      handleClose();
      window.location.reload(); // Optional: reload page or handle state update
    } catch (error) {
      console.error("Product Update Failed:", error);
    }
  };

  const handleClose = () => {
    setVisibility(false);
  };

  return (
    <div className={`${isVisible ? "modal" : "hidden"}`}>
      <div className="modal_overlay"></div>
      <div className="modal_body">
        <div className="modal_content">
          <div className="auth-form_heading">
            <h3 className="auth-form_signUp">Update Product</h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="auth-form body">
              <label>Name</label>
              <input
                type="text"
                className="auth-form_input"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label>Description</label>
              <input
                type="text"
                className="auth-form_input"
                placeholder="Description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <label>Category</label>
              <input
                type="text"
                className="auth-form_input"
                placeholder="Category"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <label>Price</label>
              <input
                type="number"
                className="auth-form_input"
                placeholder="Price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <label>Quantity</label>
              <input
                type="number"
                className="auth-form_input"
                placeholder="Quantity"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <label>Image</label>
              <input
                type="file" // File input for image upload
                accept="image/*" // Accept only image files
                onChange={handleImageChange}
              />
            </div>

            <div className="auth-form_control">
              <div className="auth-form_btn">
                <button
                  type="button"
                  className="btn btn_back"
                  onClick={handleClose}
                >
                  Back
                </button>
                <button type="submit" className="btn btn--primary">
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductModal;
