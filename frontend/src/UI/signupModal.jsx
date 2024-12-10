import "../layout/css/layout.css";
import "../layout/css/modal.css";
import React, { useRef } from "react";
import { signUp } from "../utils/auth";

const SignupModal = ({ isVisible, setVisibility }) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const addressRef = useRef(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const userData = {
      username: emailRef.current.value,
      password: passwordRef.current.value,
      email: emailRef.current.value,
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      address: addressRef.current.value,
    };

    try {
      const result = await signUp(userData);
      console.log("Sign Up Successful:", result);
    } catch (error) {
      console.error("Sign Up Failed:", error);
    }
    handleClose();
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
            <h3 className="auth-form_signUp">Sign Up</h3>
          </div>

          <div className="auth-form body">
            <label>Email</label>
            <input
              type="text"
              className="auth-form_input"
              placeholder="Email"
              required
              ref={emailRef}
            />
            <label>Password</label>
            <input
              type="text"
              className="auth-form_input"
              placeholder="Password"
              required
              ref={passwordRef}
            />
            <label>First Name</label>
            <input
              type="text"
              className="auth-form_input"
              placeholder="First Name"
              required
              ref={firstNameRef}
            />
            <label>Last Name</label>
            <input
              type="text"
              className="auth-form_input"
              placeholder="Last Name"
              required
              ref={lastNameRef}
            />
            <label>Address</label>
            <input
              type="text"
              className="auth-form_input"
              placeholder="Address"
              required
              ref={addressRef}
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
              <button className="btn btn--primary" onClick={handleSignUp}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignupModal;
