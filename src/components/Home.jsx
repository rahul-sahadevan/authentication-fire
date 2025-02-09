import React, { useEffect, useState } from "react";
import '../App.css'
import { addIssue } from "../redux/actions/issueActions";
import { useSelector,useDispatch } from "react-redux";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import Navigation from "./Navbar";
import { data, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { toast ,ToastContainer} from "react-toastify";


const Home = ()=>{

    const [org,setOrg] = useState('')
    const [boxnumber,setBoxNumber] = useState('')
    const [issue,setIssue] = useState('')
    const [rootcause,setRootCause] = useState('')
    const [solution,setSolution] = useState('')
    const [engineer,setEngineer] = useState('')
    const [status,setStatus] = useState('solved')
    const[date,setDate] = useState('')

    console.log(status)

    const issues =  useSelector(state =>state)
    console.log(issues);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        if(localStorage.getItem('success') === 'true'){
           toast.success('Login Succesfull!')
            setTimeout(()=>{
                localStorage.removeItem('success')
            },1000)
        }
    },[])


    const addIusues = async ()=>{

        try{
            if(org !== '' && boxnumber !== '' && issue !== '' && rootcause !== '' && solution !== '' && engineer !== '' && status !== '' && date !== ''){
                const issuDoc = await addDoc(collection(db,"issues"),{
                     org,
                     boxnumber,
                     issue,
                     rootcause,
                     solution,
                     engineer,
                     status,
                     date
     
                 })
     
                 dispatch(addIssue({
                     org,
                     boxnumber,
                     rootcause,
                     solution,
                     engineer,
                     status,
                     date
                 }))
                 localStorage.setItem('issue','true')

                 navigate('/issues')

            }
            else{
                // alert('Please fill the all')
                toast.error('Please Fill All')
            }




        }
        catch(error){

            console.log(error)

        }

    }
    console.log(typeof date)

    const handleDate = (e)=>{
        const newDate = e.target.value; 
        const formattedDate = new Date(newDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });

        setDate(formattedDate);
    }
    
    
    return (
        <div className="home-div">
            <Navigation/>
            <h1>Issue Adder</h1>

            <div className="issue-div">

                <input onChange={(e) => setOrg(e.target.value)} type="text" placeholder="Org Name" />
                <input onChange={(e) => setBoxNumber(e.target.value)} type="text" placeholder="Box number or Mobile number" />
                <textarea onChange={(e) => setIssue(e.target.value)} type="text" placeholder="issue" />
                <textarea onChange={(e) => setRootCause(e.target.value)} type="text" placeholder="root cause" />
                <textarea onChange={(e) => setSolution(e.target.value)} type="text" placeholder="solution" />
                <input onChange={(e) => setEngineer(e.target.value)} type="text" placeholder="enginner name" />
                <input type="date" onChange={handleDate} placeholder="Date" />
                <select onChange={(e) => setStatus(e.target.value)} name="status">
                    <option value="solved">Solved</option>
                    <option value="pending">Pending</option>
                </select>
                <button onClick={addIusues}>Submit</button>
                <ToastContainer/>

            </div>
        </div>
    )
}

export default Home