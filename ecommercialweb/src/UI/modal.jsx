import '../layout/css/layout.css' 
import '../layout/css/modal.css'
import React, { useState } from 'react';

function Modal( {isVisible} ) {
    const [hi, setVisible] = useState(false)
    const handleClose = () => {
        setVisible(true)
    }

    return (
        <div className={`${!isVisible ? 'modal' : 'hidden'}`}>
            <div className="modal_overlay"></div>
            <div className="modal_body">
                <div className="modal_content">

                    <div className="auth-form_heading">
                        <h3 className='auth-form_signUp'>Sign Up</h3>
                        <h3 className='auth-form_signIn'>Sign In</h3>
                    </div>

                    <div className="auth-form body">
                        <input type="gmail" className="auth-form_input" placeholder='Gmail' required/>
                        <input type="text" className="auth-form_input" placeholder='Username' required/>
                        <input type="text" className="auth-form_input" placeholder='Password' required/>
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
                            <button className="btn btn--primary">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Modal