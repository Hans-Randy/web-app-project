import '../layout/css/layout.css' 
import '../layout/css/modal.css'
import React, { useState } from 'react';

function SignupModal( { isVisible, setVisibility } ) {

    const [username, setUsername] = useState("")

    const [email, setEmail] = useState("")

    const [password, setPassword] = useState("")

    const handleUsername = (e) => {
        e.preventDefault()
        setUsername(e.target.value)
    }

    const handleEmail = (e) => {
        e.preventDefault()
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        e.preventDefault()
        setPassword(e.target.value)
    }

    //needs backend to function, create new user from input info and save to database, probably jwt to keep session status?
    const handleSignup = (e) => {
        e.preventDefault()

        let user = {
            email: email,
            username: username,
            password: password
        }

        console.log(user)
    }

    const handleClose = () => {
        setVisibility(false)
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
                        <label>Email</label>
                        <input type="email" className="auth-form_input" placeholder='Email' required onChange={handleEmail}/>
                        <label>Username</label>
                        <input type="text" className="auth-form_input" placeholder='Username' required onChange={handleUsername}/>
                        <label>Password</label>
                        <input type="text" className="auth-form_input" placeholder='Password' required onChange={handlePassword}/>
                    </div>
                    
                    <div className='auth-form_aside'>
                        <p className='auth-form_policies'>
                            By continuing, you agree to 
                            <a className='auth-form_policies-link'> Our Conditions of Use</a> and 
                            <a className='auth-form_policies-link'> Privacy Notice.</a>
                        </p>
                    </div>

                    <div className="auth-form_control">
                        <div className="auth-form_btn">
                            <button className="btn btn_back" onClick={handleClose}>Back</button> 
                            <button className="btn btn--primary" onClick={handleSignup}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SignupModal