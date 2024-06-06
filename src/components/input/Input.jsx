import React from 'react'
import "./style.css"
const Input = ({label,state,setState,placeholder,type}) => {
  return (
    <div className='input-wrapper'>
      <h2 className='input-label'>{label}</h2>
      <input 
      className='custom-input' 
       value={state}
       onChange={ (e)=> setState(e.target.value)}
       placeholder={placeholder}
       type={type}
      />

    </div>
  )
}

export default Input
