import React, { useState } from 'react';
import Input from '../input/Input';
import './style.css';
import Button from '../button/Button';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {auth,db,provider}  from "../../firebase"
import { getFirestore, doc, setDoc, getDoc} from 'firebase/firestore'; // import Firestore functions
import { set } from 'firebase/database';
import {signInWithPopup, GoogleAuthProvider } from "firebase/auth";


const SignupSign = () => {
  const [login, setLogin] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // use navigate hook

  const handleSubmit = (event) => {
    event.preventDefault();
    if (login) {
      loginWithEmail();
    } else {
      signupWithEmail();
    }
  };

  const signupWithEmail = async () => {
    setLoading(true);
    if (name !== '' && email !== '' && password !== '' && confirmPassword !== '') {
      if (password === confirmPassword) {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          console.log(user);
          toast.success('Successfully signed-up');
          setConfirmPassword('');
          setEmail('');
          setName('');
          setPassword('');
          await createDoc(user);
          navigate('/dashboard');
        } catch (error) {
          setLoading(false);
          toast.error(error.message);
        }
      } else {
        setLoading(false);
        toast.error('Passwords do not match');
      }
    } else {
      setLoading(false);
      toast.error('Please fill all the fields');
    }
  };

  const loginWithEmail = async () => {
    if (email !== '' && password !== '') {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        createDoc(user)
        toast.success('Logged in');
        navigate('/dashboard');
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error('Please fill all the fields');
    }
  };
  const createDoc = async (user) => {
    try {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        toast.info('User document already exists');
      } else {
        await setDoc(docRef, {
          name,
          email,
          uid: user.uid,
        });
        toast.success('User document created');
      }

      navigate('/dashboard');
    } catch (error) {
      toast.error('Error creating document: ' + error.message);
    }
  };


  function signinwithgoogle(){
    const auth = getAuth();

    setLoading(true)
    try{
      signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        createDoc(user)
        navigate("/dashboard")
        toast.success("successfully logged in")

        // IdP data available using getAdditionalUserInfo(result)
        // ...
        setLoading(false)
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        toast.error("failed to login")
        // ...
        setLoading(false)
      });
    }
    catch(e){
    toast.error(e.message)
    setLoading(false)
    }
   
  }

  return (
    <>
      {login ? (
        <div className="signup-wrap">
          <h2>Login on Financely</h2>
          <form className="form" onSubmit={handleSubmit}>
            <Input
              className="inputbox"
              type="email"
              label="Email"
              state={email}
              setState={setEmail}
              placeholder="archit@gmail.com"
            />
            <Input
              className="inputbox"
              type="password"
              label="Password"
              state={password}
              setState={setPassword}
              placeholder="12345"
            />
            <Button text={loading ? 'Loading...' : 'Login with email and password'} />
            <p className="or">or</p>
            <Button onclick={ signinwithgoogle} disabled={loading} blue={true} text={loading ? 'Loading...' : 'Login with Google'} />
            <p className="or" onClick={() => setLogin(false)}>
              Don't have an account? Click here to signup
            </p>
          </form>
        </div>
      ) : (
        <div className="signup-wrap">
          <h2>Signup on Financely</h2>
          <form className="form" onSubmit={handleSubmit}>
            <Input
              className="inputbox"
              label="Full Name"
              state={name}
              setState={setName}
              placeholder="Archit"
            />
            <Input
              className="inputbox"
              type="email"
              label="Email"
              state={email}
              setState={setEmail}
              placeholder="archit@gmail.com"
            />
            <Input
              className="inputbox"
              type="password"
              label="Password"
              state={password}
              setState={setPassword}
              placeholder="12345"
            />
            <Input
              className="inputbox"
              type="password"
              label="Confirm Password"
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder="12345"
            />
            <Button text={loading ? 'Loading...' : 'Signup with email and password'} />
            <p className="or">or</p>
            <Button onclick={ signinwithgoogle}  disabled={loading} blue={true} text={loading ? 'Loading...' : 'Signup with Google'} />
            <p className="or" onClick={() => setLogin(true)}>
              Already have an account? Click here to login
            </p>
          </form>
        </div>
      )}
    </>
  );
};


export default SignupSign;