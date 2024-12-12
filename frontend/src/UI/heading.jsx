import "../layout/css/heading.css";
import "../layout/css/modal.css";
import "../layout/css/layout.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";
import SignupModal from "./signupModal";
import SigninModal from "./signinModal";
import CreateProductModal from "./createProductModal";
import Profile from "./profile";
import Allusers from "./allUsers";

function Navbar({ loggedIn, onSignOut, onSignIn, onSignUp, onAddProduct, user }) {
  const [signupVis, setSignupVis] = useState(false);
  const [signinVis, setSigninVis] = useState(false);
  const [profileVis, setProfileVis] = useState(false);
  const [userListVis, setUserListVis] = useState(false);
  const [productCreateModalVisibility, setProductCreateModalVisibility] =
    useState(false);
    
  return (
    <header className="header">
      <SignupModal
        isVisible={signupVis}
        setVisibility={setSignupVis}
        onSignUp={onSignUp}
      />
      <SigninModal
        isVisible={signinVis}
        setVisibility={setSigninVis}
        onSignIn={onSignIn}
      />
      <Profile
        isVisible={profileVis}
        setVisibility={setProfileVis}
        user={user}
        onSignOut={onSignOut}
        
      />
      <Allusers
        isVisible={userListVis}
        setVisibility={setUserListVis}
        loggedIn={loggedIn}
      />
      {productCreateModalVisibility && (
        <CreateProductModal
          isVisible={productCreateModalVisibility}
          setVisibility={setProductCreateModalVisibility}
          onAddProduct={onAddProduct}
        />
      )}
      <nav className="nav">
        <ul className="nav-ul">
          <li className="nav-li">
            <img className="nav-img" src="./img/logo1.png" alt="Logo" />
          </li>
          {loggedIn ? (
            <>
              <li className="nav-li">
                <a
                  onClick={() => setProductCreateModalVisibility(true)}
                  className="nav-sign"
                >
                  Add new product
                </a>
              </li>
              <div className="searchBar">
                <input
                  type="text"
                  className="searchBar-input"
                  placeholder="Search"
                />
                <button className="searchlogo-btn">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="searchlogo-btn-icon"
                  />
                </button>
              </div>
              <li className="nav-li">
                <a onClick= {() => setUserListVis(true)} className="nav-sign">
                  View Users
                </a>
              </li>
              <li className="nav-li">
                <a onClick= {() => setProfileVis(true)} className="nav-sign">
                  View Profile
                </a>
              </li>
              <li className="nav-li">
                <a onClick={onSignOut} className="nav-sign">
                  Sign Out
                </a>
              </li>
            </>
          ) : (
            <>
              <li className="nav-li">Deliver to Canada</li>
              <div className="searchBar">
                <input
                  type="text"
                  className="searchBar-input"
                  placeholder="Search"
                />
                <button className="searchlogo-btn">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="searchlogo-btn-icon"
                  />
                </button>
              </div>
              <li className="nav-li">
                <a onClick={() => setSignupVis(true)} className="nav-sign">
                  Sign Up
                </a>
              </li>
              <li className="nav-li">
                <a onClick={() => setSigninVis(true)} className="nav-sign">
                  Sign In
                </a>
              </li>
            </>
          )}
          <li className="nav-li">
            <FontAwesomeIcon icon={faCartShopping} /> Cart
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
