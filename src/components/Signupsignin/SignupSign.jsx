import React, { useState,useEffect } from 'react';
import Input from '../input/Input';
import './style.css';
import Button from '../button/Button';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { auth, db, provider } from "../../firebase";
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";

const SignupSign = () => {
  const [login, setLogin] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
        createDoc(user);
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
          photoURL: user.photoURL ? user.photoURL : ""
        });
        toast.success('User document created');
      }

      navigate('/dashboard');
    } catch (error) {
      toast.error('Error creating document: ' + error.message);
    }
  };

  const signinwithgoogle = () => {
    setLoading(true);
    const auth = getAuth();

    try {
      const isMobile = window.innerWidth <= 768;

      if (isMobile) {
        signInWithRedirect(auth, provider);
      } else {
        signInWithPopup(auth, provider)
          .then((result) => {
            const user = result.user;
            createDoc(user);
            navigate("/dashboard");
            toast.success("Successfully logged in");
            setLoading(false);
          })
          .catch((error) => {
            handleError(error);
            setLoading(false);
          });
      }
    } catch (error) {
      handleError(error);
      setLoading(false);
    }
  };

  const handleError = (error) => {
    console.error("Google sign-in error", error);
    toast.error("Failed to login: " + error.message);
  };

  useEffect(() => {
    const auth = getAuth();
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          const user = result.user;
          createDoc(user);
          navigate("/dashboard");
          toast.success("Successfully logged in");
        }
      })
      .catch((error) => {
        handleError(error);
      });
  }, []);

  return (
    <>
      {login ? (
        <div className="signup-wrap">
          <h2>Login on BudgetBuddy</h2>
          <form className="form" onSubmit={handleSubmit}>
            <Input
              className="inputbox"
              type="email"
              label="Email"
              state={email}
              setState={setEmail}
              placeholder="example@gmail.com"
            />
            <Input
              className="inputbox"
              type="password"
              label="Password"
              state={password}
              setState={setPassword}
              placeholder="123456"
            />
            <Button text={loading ? 'Loading...' : 'Login with email and password'} />
            <p className="or">or</p>
            <Button onclick={signinwithgoogle} disabled={loading} blue={true} text={loading ? 'Loading...' : 'Login with Google'} />
            <p className="or" onClick={() => setLogin(false)}>
              Don't have an account? Click here to signup
            </p>
          </form>
        </div>
      ) : (
        <div className="signup-wrap">
          <h2>Signup on BudgetBuddy </h2>
          <form className="form" onSubmit={handleSubmit}>
            <Input
              className="inputbox"
              label="Full Name"
              state={name}
              setState={setName}
              placeholder="example"
            />
            <Input
              className="inputbox"
              type="email"
              label="Email"
              state={email}
              setState={setEmail}
              placeholder="example@gmail.com"
            />
            <Input
              className="inputbox"
              type="password"
              label="Password"
              state={password}
              setState={setPassword}
              placeholder="123456"
            />
            <Input
              className="inputbox"
              type="password"
              label="Confirm Password"
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder="123456"
            />
            <Button text={loading ? 'Loading...' : 'Signup with email and password'} />
            <p className="or">or</p>
            <Button onclick={signinwithgoogle} disabled={loading} blue={true} text={loading ? 'Loading...' : 'Signup with Google'} />
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

