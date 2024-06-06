import React, { useState } from 'react'
import Input from '../input/Input'
import "./style.css"
import Button from '../button/Button';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import { auth } from "../../firebase"

const SignupSign = () => {
  const [login, setLogin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (login) {
      // Handle login
      loginWithEmail();
    } else {
      // Handle signup
      signupWithEmail();
    }
  }

  function signupWithEmail() {
    setLoading(true);
    if (name !== "" && email !== "" && password !== "" && confirmPassword !== "") {
      if (password === confirmPassword) {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            toast.success("Successfully signed-up");
            setLoading(false);
            setConfirmPassword("");
            setEmail("");
            setName("");
            setPassword("");
            createdoc(user);
          })
          .catch((error) => {
            setLoading(false);
            const errorMessage = error.message;
            toast.error(errorMessage);
          });
      } else {
        setLoading(false);
        toast.error("Passwords do not match");
      }
    } else {
      setLoading(false);
      toast.error("Please fill all the fields");
    }
  }

  function createdoc(user) {
    // Create user document in database
    console.log('User document created:', user);
  }

  function loginWithEmail() {
    setLoading(true);
    if (email !== "" && password !== "") {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          toast.success("Successfully logged in");
          setLoading(false);
          setEmail("");
          setPassword("");
        })
        .catch((error) => {
          setLoading(false);
          const errorMessage = error.message;
          toast.error(errorMessage);
        });
    } else {
      setLoading(false);
      toast.error("Please fill all the fields");
    }
  }

  return (
    <>
      {login ? (
        <div className='signup-wrap'>
          <h2>Login on Financely</h2>
          <form className='form' onSubmit={handleSubmit}>
            <Input className="inputbox" type={"email"} label={"Email"} state={email} setState={setEmail} placeholder={"archit@gmail.com"} />
            <Input className="inputbox" type={"password"} label={"Password"} state={password} setState={setPassword} placeholder={"12345"} />
            <Button onClick={handleSubmit} text={loading ? "Loading..." : "Login with email and password"} />
            <p className='or'>or</p>
            <Button disabled={loading} blue={true} text={loading ? "Loading..." : "Login with Google"} />
            <p className='or' onClick={() => setLogin(false)}>Don't have an account? Click here to signup</p>
          </form>
        </div>
      ) : (
        <div className='signup-wrap'>
          <h2>Signup on Financely</h2>
          <form className='form' onSubmit={handleSubmit}>
            <Input className="inputbox" label={"Full Name"} state={name} setState={setName} placeholder={"Archit"} />
            <Input className="inputbox" type={"email"} label={"Email"} state={email} setState={setEmail} placeholder={"archit@gmail.com"} />
            <Input className="inputbox" type={"password"} label={"Password"} state={password} setState={setPassword} placeholder={"12345"} />
            <Input className="inputbox" type={"password"} label={"Confirm Password"} state={confirmPassword} setState={setConfirmPassword} placeholder={"12345"} />
            <Button onClick={handleSubmit} text={loading ? "Loading..." : "Signup with email and password"} />
            <p className='or'>or</p>
            <Button disabled={loading} blue={true} text={loading ? "Loading..." : "Signup with Google"} />
            <p className='or' onClick={() => setLogin(true)}>Already have an account? Click here to login</p>
          </form>
        </div>
      )}
    </>
  )
}

export default SignupSign;
