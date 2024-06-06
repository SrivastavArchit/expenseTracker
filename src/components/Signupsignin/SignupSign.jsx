import React, { useState } from 'react'
import Input from '../input/Input'
import "./style.css"
import Button from '../button/Button';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase"
import { toast } from 'react-toastify';
const SignupSign = () => {
  const [login,setlogin] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [loading,setloading] = useState(false)
  const handleSubmit = (event) => {
    event.preventDefault();
  }

  function signupwithemail() {
    setloading(true)
    if (name != "" && email != "" && password != "" && confirmpassword != "") {
      
       if(password==confirmpassword){
        
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user)
            // ...
            toast.success("succesfully signed-in")
            setloading(false)
            setconfirmpassword("")
            setemail("")
            setname("")
            setpassword("")
            createdoc(user)
            
          })
          .catch((error) => {
            setloading(false)
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage)
            // ..
          });
       }
       else{
        setloading(false)
        toast.error("password does not matched")
       }


      }
      else {
        setloading(false)
        toast.error("please fill all the fields")
      }

    }
    function createdoc(){

    }

    return (
      <>
      {login ?( <>
        <div className='signup-wrap'>
       
       <h2>Login on Financely</h2>

       <form className='form' onSubmit={handleSubmit}>
         <Input className="inputbox" type={"email"} label={"Email"} state={email} setState={setemail} placeholder={"archit@gmail.com"} />
         <Input className="inputbox" type={"password"} label={"Password"} state={password} setState={setpassword} placeholder={"12345"} />


         <Button onclick={signupwithemail} text= { loading?"loading..." :"Login with email and password"} />
         <p className='or'>or</p>
         <Button disabled={loading} blue={true} text={loading?"loading..." :"Login with Google"} />
         <p className='or' onClick={() => setlogin(!login)}>or don't have an account?,click here</p>
       </form>
     </div></> ):( <div className='signup-wrap'>
       
       <h2>Signup on Financely</h2>

       <form className='form' onSubmit={handleSubmit}>
         <Input className="inputbox" label={"Full Name"} state={name} setState={setname} placeholder={"Archit"} />
         <Input className="inputbox" type={"email"} label={"Email"} state={email} setState={setemail} placeholder={"archit@gmail.com"} />
         <Input className="inputbox" type={"password"} label={"Password"} state={password} setState={setpassword} placeholder={"12345"} />
         <Input className="inputbox" type={"password"} label={"Confirm Password"} state={confirmpassword} setState={setconfirmpassword} placeholder={"12345"} />


         <Button text= { loading?"loading..." :"Signup with email and password"} />
         <p className='or'>or</p>
         <Button disabled={loading} blue={true} text={loading?"loading..." :"signup with Google"} />
         <p className='or'>or don't have an account already?, click here</p>
       </form>
     </div>
  
    
      
    )

  }
  </>
  )
}

  export default SignupSign;
