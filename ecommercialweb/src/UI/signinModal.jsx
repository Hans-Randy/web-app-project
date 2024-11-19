import '../layout/css/layout.css' 
import '../layout/css/modal.css'
import React, { useState, useEffect } from 'react';

function SigninModal( { isVisible, setVisibility } ) {

    const [username, setUsername] = useState("")

    const [password, setPassword] = useState("")

    const handleUsername = (e) => {
        e.preventDefault()
        setUsername(e.target.value)
    }

    const handlePassword = (e) => {
        e.preventDefault()
        setPassword(e.target.value)
    }

    const handleClose = () => {
        setVisibility(false)
    }


    // will need backend to make this function. find a user and use the bcrypt compare to see if the password matches
    const handleSignin = (e) => {
        e.preventDefault()

        let user = {
            username: username,
            password: password
        }

        console.log(user)
    }

    return (
        <div className={`${isVisible ? 'modal' : 'hidden'}`}>
            <div className="modal_overlay"></div>
            <div className="modal_body">
                <div className="modal_content">

                    <div className="auth-form_heading">
                        <h3 className='auth-form_signUp'>Sign Up</h3>
                        <h3 className='auth-form_signIn'>Sign In</h3>
                    </div>

                    <div className="auth-form body">
                        <label>Username</label>
                        <input type="text" className="auth-form_input" placeholder='Username' required onChange={handleUsername}/>
                        <label>Password</label>
                        <input type="text" className="auth-form_input" placeholder='Password' required onChange={handlePassword}/>
                    </div>

                    <div className="auth-form_control">
                        <div className="auth-form_btn">
                            <button className="btn btn_back" onClick={handleClose}>Back</button> 
                            <button className="btn btn--primary" onClick={handleSignin}>Sign In</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SigninModal