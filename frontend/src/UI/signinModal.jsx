import "../layout/css/layout.css";
import "../layout/css/modal.css";
import React, { useState } from "react";

let fetchUsers = async (user) => {
  try {
    let response = await fetch("http://localhost:5000/api/auth/login/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify(user),
    });

    if (response.ok) {
      window.alert("Logged in!");
      window.location.reload();
    } else {
      window.alert("Something went wrong");
    }
  } catch (err) {
    console.log(err);
  }
};

function SigninModal({ isVisible, setVisibility }) {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleClose = () => {
    setVisibility(false);
  };

  // will need backend to make this function. find a user and use the bcrypt compare to see if the password matches
  const handleSignin = async (e) => {
    e.preventDefault();

    let user = {
      email: email,
      password: password,
    };

    await fetchUsers(user);

    handleClose();
  };

  return (
    <div className={`${isVisible ? "modal" : "hidden"}`}>
      <div className="modal_overlay"></div>
      <div className="modal_body">
        <div className="modal_content">
          <div className="auth-form_heading">
            <h3 className="auth-form_signUp">Sign Up</h3>
            <h3 className="auth-form_signIn">Sign In</h3>
          </div>

          <div className="auth-form body">
            <label>Email</label>
            <input
              type="text"
              className="auth-form_input"
              placeholder="Email"
              required
              onChange={handleEmail}
            />
            <label>Password</label>
            <input
              type="text"
              className="auth-form_input"
              placeholder="Password"
              required
              onChange={handlePassword}
            />
          </div>

          <div className="auth-form_control">
            <div className="auth-form_btn">
              <button className="btn btn_back" onClick={handleClose}>
                Back
              </button>
              <button className="btn btn--primary" onClick={handleSignin}>
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SigninModal;
