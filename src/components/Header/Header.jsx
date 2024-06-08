import React, { useEffect } from 'react'
import "./style.css"
import {auth} from "../../firebase"
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
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
      navigate('/'); // Redirect to login page after logout
    })
    .catch((error) => {
      console.error('Error logging out: ', error);
    });
};

  return (
    <div>
    <div className='navbar'>
       <p className='logo'>ExpenseTrack</p>

       <p className=' logo link' onClick={logout_func}>Logout</p>
    </div>
    </div>
  )
}

export default Header
