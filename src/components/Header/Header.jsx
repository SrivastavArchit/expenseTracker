import React, { useEffect } from 'react'
import "./style.css"
import {auth} from "../../firebase"
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import userimg from "../assets/user.png"
const Header = () => {
const [user,loading] =useAuthState(auth);
const navigate = useNavigate();
useEffect(() => {
 if(user){
  navigate("/dashboard")
 }
}, [user,loading])

  
const logout_func = () => {
  signOut(auth)
    .then(() => {
      navigate('/'); 
    })
    .catch((error) => {
      console.error('Error logging out: ', error);
    });
};

  return (
    <div className="navbar">
      <div>
      <p className="logo">BudgetBuddy.</p>

      </div>
  
    {user ? (
      <p className="navbar-link" onClick={logout_func}>
        <span style={{ marginRight: "1rem" }}>
          <img 
            src={user.photoURL ? user.photoURL : userimg}
            width={user.photoURL ? "32" : "24"}
            style={{ borderRadius: "50%" }}
          />
        </span>
       <span className='logout'>Logout</span>  
      </p>
    ) : (
      <></>
    )}
  </div>
  )
}

export default Header
