import "../layout/css/heading.css";
import "../layout/css/modal.css";
import "../layout/css/layout.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import SignupModal from "./signupModal";
import SigninModal from "./signinModal";
import CreateProductModal from "./createProductModal";

function Navbar({ loggedIn, onSignOut, onSignIn, onSignUp, onAddProduct }) {
  const [signupVis, setSignupVis] = useState(false);
  const [signinVis, setSigninVis] = useState(false);
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
