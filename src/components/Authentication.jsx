import React, { useState } from "react";
import '../App.css'
import { app } from "../../firebase";
import { createUserWithEmailAndPassword, getAuth , GoogleAuthProvider, onAuthStateChanged, signInWithPopup} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Authentication  = ()=>{

    const auth = getAuth(app)
    const googleProvider = new GoogleAuthProvider()
    const navigate = useNavigate()

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const googleSignin = ()=>{
        signInWithPopup(auth, googleProvider)
        console.log('success');
        
    }
    const emailSingin = ()=>{
        createUserWithEmailAndPassword(auth,email,password)
        .then((data)=>{
            alert('siginin successfull')
        })
        .error((data)=>{
            alert('signin unsuccesfull')
        })
    }

    const LoginUser = (email)=>{

        onAuthStateChanged(auth, (user)=>{
            if(user){
                if(user.email === email){
                    alert('user is already exist')
                    navigate('/home')
                }
                else{
                    alert('user not exist, please create acccount')
                }
            }
            else{
                alert('user not exist . please login')
            }
        })


    }

    return (
        <div className="container">
            <input onChange={(e)=> setEmail(e.target.value)} type="text" placeholder="Email"  />
            <input onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="Password" />
            <button onClick={emailSingin}>Email Signin</button>
            <button onClick={googleSignin}>Google Signin</button>
            <button onClick={()=>LoginUser(email)}>Login</button>
        </div>
    )
}


export default Authentication