import React, { useState } from "react";
import '../App.css'
import { app } from "../../firebase";
import { createUserWithEmailAndPassword, getAuth , GoogleAuthProvider, onAuthStateChanged, signInWithPopup,signInWithEmailAndPassword} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import 'react-toastify/dist/ReactToastify.css';
import { toast ,ToastContainer} from "react-toastify";


const Authentication  = ()=>{

    const auth = getAuth(app)
    const googleProvider = new GoogleAuthProvider()
    const navigate = useNavigate()

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const[type,setType] = useState('password')

    const googleSignin = ()=>{
        signInWithPopup(auth, googleProvider)
        console.log('success');
        
    }
    const emailSingin = ()=>{
        createUserWithEmailAndPassword(auth,email,password)
        .then((data)=>{
            alert('siginin successfull')
            navigate('/home')
            console.log(data)
        })
        .error((data)=>{
            alert('signin unsuccesfull')
        })
    }

    const LoginUser = (email,password)=>{

        onAuthStateChanged(auth, (user)=>{
            if(user){
                if(user.email === email){
                    console.log(user.email ,user.password)
                    alert('user is already exist')
                    navigate('/home')
                }
                else{
                    alert('user not exist, please create acccount')
                    console.log(user.email ,user.password,user)
                }
            }
            else{
                alert('user not exist . please login')
            }
        })


    }

    const loginUser = async ()=>{
        try{

            
            await signInWithEmailAndPassword(auth,email,password)
            localStorage.setItem('success','true')
            navigate('/home')
            // alert('Login Succesfully')
        }
        catch(error){
            console.log(error);
            toast.error('Login Unsuccesfull !')
            
        }
    }

    const handleType = ()=>{
        if(type === 'password'){
            setType('text')
        }
        else{
            setType('password')
        }
    }

    return (
        <div className="container">
           
            <input onChange={(e)=> setEmail(e.target.value)} type="text" placeholder="Email"  />
            <div className="password-container">
                <input onChange={(e)=> setPassword(e.target.value)} type={type} placeholder="Password"/>
                <FontAwesomeIcon className="eye-icon" onClick={handleType} icon={faEye}/>
            </div>
            {/* <button onClick={emailSingin}>Email Signin</button> */}
            <button onClick={googleSignin}>Google Signin</button>
            {/* <button onClick={()=>LoginUser(email,password)}>Login</button> */}
            <button onClick={loginUser}>Login</button>
            <ToastContainer/>
        </div>
    )
}


export default Authentication