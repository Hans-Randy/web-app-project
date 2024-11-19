import "../layout/css/heading.css";
import "../layout/css/modal.css";
import "../layout/css/layout.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import SignupModal from "./signupModal";
import SigninModal from "./signinModal";

function Navbar() {
  
  const [signupVis, setSignupvis] = useState(false);
  const [signinVis, setSigninvis] = useState(false);
  
  const signupModal = (e) => {
    e.preventDefault()
    setSignupvis(true)
  }

  const signinModal = (e) => {
    e.preventDefault()
    setSigninvis(true)
  }

  return (
    <header className="header">
      <SignupModal isVisible={signupVis} setVisibility={setSignupvis} ></SignupModal>
      <SigninModal isVisible={signinVis} setVisibility={setSigninvis} ></SigninModal>
      <nav className="nav">
        <ul className="nav-ul">
          <li className="nav-li">
            <img className="nav-img" src="./img/logo1.png"></img>
          </li>
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
            <a onClick={signupModal} className="nav-sign">
              Sign Up
            </a>
          </li>
          <li className="nav-li">
            <a onClick={signinModal} className="nav-sign">
              Sign In
            </a>
          </li>
          <li className="nav-li">
            <FontAwesomeIcon icon={faCartShopping} />
            Cart
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
