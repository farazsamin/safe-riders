import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import  { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import {UserContext} from '../../App' 
import { useHistory, useLocation } from 'react-router';
import './Login.css'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';


//firebase initialize
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

function Login() {
  //context
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)

  //google and fb provider
  var provider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();

  //history and location hooks
  let history = useHistory();
  let location = useLocation();
  const  { from } = location.state || { from: { pathname: "/" } };

  //email and pass login
  const [newUser, setNewUser] = useState(false)
  const [password, setPassword] = useState(0);
  const [confirmPassword, setconfirmPassword] = useState(1)
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    error : '',
    ok : '',
    success : false
  })

  //email and password valiadation
  const handleBlur = (e) => {
    let isFormValid,isPassword,isConfirmPassword;
    if (e.target.name === 'email') {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value)
    }
    if (e.target.name === 'password') {
      isFormValid = e.target.value.length > 6; 
      isPassword = e.target.value;
      setPassword(isPassword);
    }
    if(e.target.name=== 'confirm_password'){
      isConfirmPassword = e.target.value;
      setconfirmPassword(isConfirmPassword);
    }
    console.log(password,confirmPassword)
    if(newUser && password !== confirmPassword){
      user['error'] = "Password Doesn't Match"
      user['ok'] = ''
    }
    if(newUser && password === confirmPassword){
      user['ok'] = "Password Matched"
      user['error'] = ''
    }
   
    if (isFormValid ) {
      const newUser = { ...user };
      newUser[e.target.name] = e.target.value;
      setUser(newUser);
    }
  }

  //signup method
  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then((userCredential) => {
        // Signed in 
        const newUser = {...user};
        newUser.error = '';
        newUser.success = true;
        setUser(newUser)
        // ...
      })
      .catch((error) => {
        const newUser = {...user};
        newUser.error = error.message;
        newUser.success = false;
        setUser(newUser)
        // ..
      });
    }
    e.preventDefault();
  }

  //sign in method
  if(!newUser && user.email && user.password){
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    const newUser = {...user};
    newUser.error = '';
    newUser.success = true;
    const {name,email} = newUser;
    const signedInUser = {name : email, email};
    setLoggedInUser(signedInUser);
    setUser(newUser)
    history.replace(from)
    // ...
  })
  .catch((error) => {

    const newUser = {...user};
    newUser.error = error.message;
    newUser.success = false;
    setUser(newUser)
  });
  }

  //google sign in
  const handleSignIn = () => {
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        const {displayName,email} = result.user;
        const signedInUser = {name : displayName, email};
        setLoggedInUser(signedInUser);
        setUser(user);
        history.replace(from)

      }).catch((error) => {

        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });

  }
 
  
  return (
    <div className="text-center">
     
     

      <form onSubmit={handleSubmit}>
        <input type="checkbox" name="newUser" onChange={()=>setNewUser(!newUser)} id=""/>
        <label htmlFor="newUser"> Sign UP</label> <br/>
        { newUser && <input type="text" name="name" id=""placeholder="name" /> } <br/>
        <input type="text" name="email" id="" onBlur={handleBlur} placeholder="email: " required />
        <br />
        <input type="password" name="password" onBlur={handleBlur} id="" placeholder="password" required /> <br/>
        { newUser && <input type="password" name="confirm_password" onBlur={handleBlur} id="" placeholder="confirm password" required />}
        <br />
        <input type="submit" className="btn btn-success" value="Submit" />
      </form>
       <p>{user.error}</p>
       <p>{user.ok}</p>
       {
         user.success && <p> user {newUser? 'Signup' : 'loggin'} Successfully</p>
       }

       <button className="btn btn-secondary pl-4 pr-4" onClick={handleSignIn}><FontAwesomeIcon className="mr-3" icon={faGoogle}></FontAwesomeIcon>Google Sign in</button> <br />
  
       
    </div>
  );
}

export default Login;
