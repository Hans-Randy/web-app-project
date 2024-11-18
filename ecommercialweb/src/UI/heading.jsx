import "../layout/css/heading.css";
import "../layout/css/modal.css";
import "../layout/css/layout.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Navbar() {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    console.log("Opening Sign-Up Modal");
    console.log(modalVisible)
    setModalVisible(true);
  };

  const handleClose = () => {
    console.log("Closing Sign-Up Modal");
    console.log("Modal toggled: Current state:", modalVisible)
    setModalVisible(false)
  } 
  
  return (
    <header className="header">
      <div className={`${modalVisible ? "modal" : "hidden"}`}>
        <div className="modal_overlay"></div>
        <div className="modal_body">
          <div className="modal_content">
            <div className="auth-form_heading">
              <h3 className="auth-form_signUp">Sign Up</h3>
              <h3 className="auth-form_signIn">Sign In</h3>
            </div>

            <div className="auth-form body">
              <input
                type="gmail"
                className="auth-form_input"
                placeholder="Gmail"
                required
              />
              <input
                type="text"
                className="auth-form_input"
                placeholder="Username"
                required
              />
              <input
                type="text"
                className="auth-form_input"
                placeholder="Password"
                required
              />
            </div>

            <div className="auth-form_aside">
              <p className="auth-form_policies">
                By continuing, you agree to
                <a className="auth-form_policies-link">
                  {" "}
                  Our Conditions of Use
                </a>{" "}
                and
                <a className="auth-form_policies-link"> Privacy Notice.</a>
              </p>
            </div>

            <div className="auth-form_control">
              <div className="auth-form_btn">
                <button className="btn btn_back" onClick={handleClose}>
                  Back
                </button>
                <button className="btn btn--primary">Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className={`${modal2Visible ? "modal" : "hidden"}`}>
        <div className="modal_overlay"></div>
        <div className="modal_body">
          <div className="modal_content">
            <div className="auth-form_heading">
              <h3 className="auth-form_signIn">Sign In</h3>
              <h3 className="auth-form_signUp">Sign Up</h3>
            </div>

            <div className="auth-form body">
              <input
                type="gmail"
                className="auth-form_input"
                placeholder="Gmail"
                required
              />
              <input
                type="text"
                className="auth-form_input"
                placeholder="Username"
                required
              />
              <input
                type="text"
                className="auth-form_input"
                placeholder="Password"
                required
              />
            </div>

            <div className="auth-form_control">
              <div className="auth-form_btn">
                <button className="btn btn_back" onClick={handleClose2}>
                  Back
                </button>
                <button className="btn btn--primary">Sign In</button>
              </div>
            </div>
          </div>
        </div>
      </div> */}
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
            <a onClick={toggleModal} className="nav-sign">
              Sign Up
            </a>
          </li>
          <li className="nav-li">
            <a className="nav-sign">
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
