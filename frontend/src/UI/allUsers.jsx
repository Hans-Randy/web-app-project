import "../layout/css/layout.css";
import "../layout/css/modal.css";
import React, { useState, useEffect } from "react";
import { getAllUsers } from '../utils/user'


const Allusers = ({isVisible, setVisibility, loggedIn}) => {
    let editForm = React.createRef();
    
    let [data, setData] = useState([])
    let [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchUsers = async () => {
          const response = await getAllUsers();
          setData(response.data);
          setLoading(false);
          console.log(data)
        };
        if (loggedIn) fetchUsers();
      }, [loggedIn]);

    const handleClose = () => {
        setVisibility(false);
    };

    const styles = {
        overflow: {
            overflow: "scroll"
        }
    }

    return (
        <>

            <div className={`${isVisible ? "modal" : "hidden"}`}>
            <div className="modal_overlay"></div>
            <div className="modal_body">
              <div className="modal_content">
                <div className="auth-form_heading">
                  <h3 className="auth-form_signIn">Welcome </h3>
                </div>
                <div style={styles.overflow}>
                {data.map((user) => {
                    return <p>{user.firstName} {user.lastName}</p>
                })}
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
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        
        
        </>
      );
}

export default Allusers;