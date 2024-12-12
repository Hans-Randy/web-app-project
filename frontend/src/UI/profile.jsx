import "../layout/css/layout.css";
import "../layout/css/modal.css";
import React, { useState, useEffect } from "react";
import { deleteUser, editUser } from '../utils/user'


const Profile = ({isVisible, setVisibility, user, onSignOut, loggedIn}) => {
    let editForm = React.createRef();
    let [editfname, setEditFname] = useState(null);
    let [editlname, setEditLname] = useState(null);
    let [editAddress, setEditAddress] = useState(null);
    let [editEmail, setEditEmail] = useState(null);
    let [editPassword, setEditPassword] = useState(null);
    let [userData, setUserData] = useState(user);

    useEffect(() => {
        setUserData(user)
    

        
    }, [user]);


    const handleClose = () => {
        setVisibility(false);
    };

    const handleDelete = async () => {
        try {
            await onSignOut();
            await deleteUser(user._id);

            handleClose()
        } catch (err) {
            console.error(err);
        }
    }

    const handleEdit = async () => {
        try {
            let node = editForm.current;
            node.style.display = "unset"
        

        } catch (err) {
            console.error(err);
        }
    }

    const handleEditFname = (e) => {
        setEditFname(e.target.value)
    }

    const handleEditLname = (e) => {
        setEditLname(e.target.value)
    }

    const handleEditAddress = (e) => {
        setEditAddress(e.target.value)
    }

    const handleEditEmail = (e) => {
        setEditEmail(e.target.value)
    }
    
    const handleEditPassword = (e) => {
        setEditPassword(e.target.value)
    }

    const submitEditForm = async (e) => {
        e.preventDefault();
        try {
            let formData = new FormData();
        if (editfname != null) {
            console.log("fname: " + editfname)
            formData.append("firstName", editfname);
        }

        if (editlname != null) {
            console.log("lname: " + editlname)
            formData.append("lastName", editlname);
        }

        if (editAddress != null) {
            formData.append("address", editAddress);
        }

        if (editEmail != null) {
            formData.append("email", editEmail);
        }

        if (editPassword != null) {
            formData.append("password", editPassword);
        }

        let update = await editUser(user._id, formData)
        
        console.log(update.data)

        setUserData(update.data)
    
        let node = editForm.current;
        node.style.display= "none";


        } catch (err) {
            console.error(err)
        }
        
    }

    const style = {
        displayFlex: {
            display: "flex",
        },
        displayNone: {
            display: "none"
        }
    }

    return (
        <>

            <div className={`${isVisible ? "modal" : "hidden"}`}>
            <div className="modal_overlay"></div>
            <div className="modal_body">
              <div className="modal_content">
                <div className="auth-form_heading">
                  <h3 className="auth-form_signIn">Welcome {userData.firstName} {userData.lastName}</h3>
                </div>
                <div style={style.displayFlex}>
                    <div  className="test">
                        <p>First Name: {userData.firstName}</p>
                        <p>Last Name: {userData.lastName}</p>
                        <p>Address: {userData.address}</p>
                        <p>Email: {userData.email}</p>
                    
                    </div>
                    <div ref={editForm} style={style.displayNone}>
                        <p>First Name:</p>    
                        <input onChange={handleEditFname}></input>
                        <p>Last Name:</p>
                        <input onChange={handleEditLname}></input>
                        <p>Address:</p>
                        <input onChange={handleEditAddress}></input>
                        <p>Email</p>
                        <input onChange={handleEditEmail}></input>
                        <p>Password</p>
                        <input onChange={handleEditPassword}></input>
                        <div>
                            <button onClick={submitEditForm}>Submit</button>
                        </div>
                    </div>
                </div>
                {/* <div className="auth-form body">
                  <label>email</label>
                  <input
                    type="text"
                    className="auth-form_input"
                    
                  />
                  <label>Password</label>
                  <input
                    type="text"
                    className="auth-form_input"
                    
                  />
                </div> */}
      
                <div className="auth-form_control">
                  <div className="auth-form_btn">
                    <button className="btn btn_back" onClick={handleClose}>
                      Back
                    </button>
                    <button onClick={handleDelete}>Delete Account</button>
                    <button onClick={handleEdit}>Edit Info</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
        
        </>
      );
}

export default Profile;