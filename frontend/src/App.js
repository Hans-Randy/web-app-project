import { useState, useEffect } from "react";
import Navbar from "./UI/heading";
import Content from "./UI/content";
import Category from "./UI/category";
import { signOut, signIn, signUp } from "./utils/auth";
import { getAllProducts } from "./utils/products";
import getCookie from "./utils/cookie";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const handleSignOut = async () => {
    // Perform sign-out logic here (e.g., clear tokens)
    try {
      await signOut();
      setLoggedIn(false); // Update state to trigger re-render
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignIn = async (credentials) => {
    try {
      await signIn(credentials); // Call your sign-in logic
      setLoggedIn(true); // Update state on successful sign-in
    } catch (error) {
      console.error("Sign In Failed:", error);
    }
  };

  const handleSignUp = async (userData) => {
    try {
      await signUp(userData); // Call your sign-up logic
      setLoggedIn(true); // Update state on successful sign-up
    } catch (error) {
      console.error("Sign Up Failed:", error);
    }
  };

  console.log(`loggedIn: ${loggedIn} before all useEffect`);

  useEffect(() => {
    const checkLoginStatus = () => {
      let cookie = getCookie("jwt");
      if (cookie && !loggedIn) {
        setLoggedIn(true);
      }
      if (!cookie && loggedIn) {
        setLoggedIn(false);
      }
    };

    // Check login status initially
    checkLoginStatus();
  }, []);

  // Fetch products on initial render
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProducts();
      setProducts(response.data);
      setLoading(false);
    };
    if (loggedIn) fetchProducts();
  }, [loggedIn]);

  const handleAddProduct = async (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const handleUpdateProduct = async (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
  };

  const handleDeleteProduct = async (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== productId)
    );
  };

  return (
    <div className="App">
      <Navbar
        loggedIn={loggedIn}
        onSignOut={handleSignOut}
        onSignIn={handleSignIn}
        onSignUp={handleSignUp}
        onAddProduct={handleAddProduct}
      />
      <div className="container">
        <div className="grid grid_full-width">
          <div className="grid_row">
            <div className="grid_collumn-2">
              {loggedIn && (
                <Category products={products} isLoading={isLoading} />
              )}
            </div>
            <div className="grid_collumn-10">
              {loggedIn ? (
                <Content
                  products={products}
                  onDelete={handleDeleteProduct}
                  onUpdate={handleUpdateProduct}
                  isLoading={isLoading}
                />
              ) : (
                <p>Must Be Logged in to view Content!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
