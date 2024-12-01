import '../layout/css/layout.css' 
import '../layout/css/modal.css'
import React, { useState } from 'react';

let createUser = async (user) => {
    try {
        let response = await fetch('http://localhost:5000/api/auth/signup', { 
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
            mode:'cors',
            credentials: 'include',
            body: JSON.stringify(user)
        })
        
        if (response.ok) {
            window.alert("Sucessfully created user")
        } else {
            window.alert("Something went wrong")
        }

    } catch(err) {
        
        console.log(err)
    }   
}

function SignupModal( { isVisible, setVisibility } ) {

    const [password, setPassword] = useState("")

    const [email, setEmail] = useState("")

    const [firstname, setFirstname] = useState("")

    const [lastname, setLastname] = useState("")

    const [address, setAddress] = useState("")

    const handleFirstname = (e) => {
        e.preventDefault()
        setFirstname(e.target.value)
    }

    const handleLastname = (e) => {
        e.preventDefault()
        setLastname(e.target.value)
    }

    const handleAddress = (e) => {
        e.preventDefault()
        setAddress(e.target.value)
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
    const handleSignup = async (e) => {
        e.preventDefault()

        let user = {
            email: email,
            firstName: firstname,
            lastName: lastname,
            address: address,
            password: password
        }

        await createUser(user)
        
        handleClose()
        
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
                        <input type="text" className="auth-form_input" placeholder='Email' required onChange={handleEmail}/>
                        <label>Password</label>
                        <input type="text" className="auth-form_input" placeholder='Password' required onChange={handlePassword}/>
                        <label>First Name</label>
                        <input type="text" className="auth-form_input" placeholder='First Name' required onChange={handleFirstname}/>
                        <label>Last Name</label>
                        <input type="text" className="auth-form_input" placeholder='Last Name' required onChange={handleLastname}/>
                        <label>Address</label>
                        <input type="text" className="auth-form_input" placeholder='Address' required onChange={handleAddress}/>
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