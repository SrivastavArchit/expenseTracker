import React from 'react'
import "./style.css"
const Header = () => {

    const logout_func = () =>{
        alert("hello");
    }
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
