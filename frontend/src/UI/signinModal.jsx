import "../layout/css/layout.css";
import "../layout/css/modal.css";
import React, { useRef } from "react";
import { signIn } from "../utils/auth";

const SigninModal = ({ isVisible, setVisibility }) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleClose = () => {
    setVisibility(false);
  };

  const handleSignIn = async (e) => {
    console.log("handleSignIn");
    e.preventDefault();
    const credentials = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const result = await signIn(credentials);
      console.log("Sign In Successful:", result);
    } catch (error) {
      console.error("Sign In Failed:", error);
    }
    handleClose();
    window.location.reload();
  };

  return (
    <div className={`${isVisible ? "modal" : "hidden"}`}>
      <div className="modal_overlay"></div>
      <div className="modal_body">
        <div className="modal_content">
          <div className="auth-form_heading">
            <h3 className="auth-form_signIn">Sign In</h3>
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
          </div>

          <div className="auth-form_control">
            <div className="auth-form_btn">
              <button className="btn btn_back" onClick={handleClose}>
                Back
              </button>
              <button className="btn btn--primary" onClick={handleSignIn}>
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SigninModal;
