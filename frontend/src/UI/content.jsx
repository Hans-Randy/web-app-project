import "../layout/css/layout.css";
import "../layout/css/content.css";
import "../layout/css/responsive.css";
import { useEffect, useState } from "react";

function Content() {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true); // Set loading to true initially

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false); // Ensure loading is set to false after fetching
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
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
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Content;
