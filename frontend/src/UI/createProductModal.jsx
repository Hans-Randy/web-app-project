import "../layout/css/layout.css";
import "../layout/css/modal.css";
import React, { useState } from "react";
import { createProduct } from "../utils/products";

const CreateProductModal = ({ isVisible, setVisibility, onAddProduct }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [imageFile, setImageFile] = useState(""); // State to hold the selected image file

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
    formData.append("file", imageFile); // Append the image file if it exists

    try {
      const result = await createProduct(formData); // Pass FormData to updateProduct
      const _id = result.data.savedProduct._id;
      const name = result.data.savedProduct.name;
      const description = result.data.savedProduct.description;
      const price = result.data.savedProduct.price;
      const quantity = result.data.savedProduct.quantity;
      const image = result.data.image;

      await onAddProduct({ _id, name, description, price, quantity, image });
      console.log("Create Product Successful:", result.data);
      handleClose();
    } catch (error) {
      console.error("Create Product Failed:", error);
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
            <h3 className="auth-form_signUp">Create Product</h3>
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
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProductModal;
