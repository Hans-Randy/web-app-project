import Navbar from "./UI/heading";
import Content from "./UI/content";
import Category from "./UI/category";
import { useState, useEffect } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      setLoggedIn(isLoggedIn());
    };

    // Check login status initially
    checkLoginStatus();

    // Set an interval to check login status every 5 minutes
    const intervalId = setInterval(checkLoginStatus, 5 * 60 * 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const isLoggedIn = () => {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith("jwt" + "=")) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <div className="grid grid_full-width">
          <div className="grid_row">
            <div className="grid_collumn-2">
              <Category />
            </div>
            <div className="grid_collumn-10">
              {loggedIn ? (
                <Content />
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
