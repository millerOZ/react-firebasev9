import Home from './components/Home'
import Login from './components/Login'
import './App.css';
import React, {useState} from 'react';

import appFirebase from './credential'
import {getAuth,onAuthStateChanged } from 'firebase/auth'

const auth = getAuth()

function App() {
  const [user, setUser] = useState(null)
  onAuthStateChanged(auth, (firebaseUser)=> {
    if(firebaseUser){
      setUser(firebaseUser)
    }else {
      setUser(null)
    }
  })
  return (
    <div className="">
      { user ? <Home email = {user.email}/> : <Login/>}
    </div>
  );
}

export default App;
