import "../layout/css/layout.css";
import "../layout/css/content.css";
import "../layout/css/responsive.css";
import { useState } from "react";
import UpdateProductModal from "./updateProductModal";
import CreateProductModal from "./createProductModal";
import { deleteProductById } from "../utils/products";

const Content = ({ products, onDelete, onUpdate, isLoading }) => {
  const [productUpdateModalVisibility, setProductUpdateModalVisibility] =
    useState(false);
  const [productData, setProductData] = useState({});

  const handleEdit = async (product) => {
    setProductUpdateModalVisibility(true);
    setProductData(product);
  };

  const handleDelete = async (productId) => {
    try {
      await deleteProductById(productId);
      await onDelete(productId);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      {productUpdateModalVisibility && (
        <UpdateProductModal
          isVisible={productUpdateModalVisibility}
          setVisibility={setProductUpdateModalVisibility}
          productData={productData}
          onUpdate={onUpdate}
        />
      )}
      <CreateProductModal />
      <div className="home-product">
        {products.map((prod) => (
          <div className="grid_collumn-2-4" key={prod._id}>
            <div className="home-product-item">
              <div
                style={{
                  backgroundImage: `url(data:${
                    prod.image?.contentType ?? ""
                  };base64,${prod.image?.data ?? ""})`, // Correctly format the background image
                  backgroundSize: "cover", // Optional: cover the entire div
                  backgroundPosition: "center", // Optional: center the image
                  height: "200px", // Set a height for the image container
                }}
                className="home-product-item_img"
              />
              <h4 className="home-product-item_name">{prod.name}</h4>
              <div className="home-product-item_price">{prod.price}</div>
              <button onClick={() => handleEdit(prod)}>Edit</button>
              <button onClick={() => handleDelete(prod._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Content;
