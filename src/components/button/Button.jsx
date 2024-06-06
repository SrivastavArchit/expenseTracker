import React from 'react'
import "./style.css"
const Button = ({blue,onclick,text ,disabled}) => {
  return (
    <div className={blue? "btn blue" : "btn"}>
      <button
      disabled={disabled}
      onClick={onclick}>
        {text}
      </button>
    </div>
  )
}

export default Button
