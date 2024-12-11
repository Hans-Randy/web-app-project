import "../layout/css/layout.css";
import "../layout/css/content.css";
import "../layout/css/responsive.css";
import { useEffect, useState } from "react";
import { getAllProducts, deleteProductById } from "../utils/products";
import UpdateProductModal from "./updateProductModal";

function Content() {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true); // Set loading to true initially
  const [productUpdateModalVisibility, setProductUpdateModalVisibilty] =
    useState(false);
  const [productData, setProductData] = useState({});

  useEffect(() => {
    const handleGetAllProducts = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false); // Ensure loading is set to false after fetching
      }
    };
    handleGetAllProducts();
  }, []);

  const handleEdit = (product) => {
    setProductUpdateModalVisibilty(true);
    setProductData(product);
  };

  const handleDelete = async (productId) => {
    try {
      await deleteProductById(productId);
      setLoading(true);
      const response = await getAllProducts();
      setProducts(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // Ensure loading is set to false after fetching
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
      {productUpdateModalVisibility ? (
        <UpdateProductModal
          isVisible={productUpdateModalVisibility}
          setVisibility={setProductUpdateModalVisibilty}
          productData={productData}
        ></UpdateProductModal>
      ) : (
        ""
      )}
      <div className="home-product">
        {products.map((prod) => (
          <div className="grid_collumn-2-4" key={prod._id}>
            <div className="home-product-item">
              <div
                style={{
                  backgroundImage: `url(data:${prod.image.contentType};base64,${prod.image.data})`, // Correctly format the background image
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
}

export default Content;
