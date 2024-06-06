import React from 'react'
import Header from "../../components/Header/Header"
import SignupSign from '../../components/Signupsignin/SignupSign'
import "./style.css"
const Signup = () => {
  return (
    <div>
      <Header/>
      <div className='wrapper'>
        <SignupSign/> 
      </div>
    </div>
  )
}

export default Signup
