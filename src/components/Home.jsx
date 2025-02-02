import React, { useState } from "react";
import '../App.css'
import { addIssue } from "../redux/actions/issueActions";
import { useSelector,useDispatch } from "react-redux";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";



const Home = ()=>{

    const [org,setOrg] = useState('')
    const [boxnumber,setBoxNumber] = useState('')
    const [issue,setIssue] = useState('')
    const [rootCuase,setRootCause] = useState('')
    const [solution,setSolution] = useState('')
    const [engineer,setEngineer] = useState('')
    const [status,setStatus] = useState('solved')

    console.log(status)

    const issues =  useSelector(state =>state)
    console.log(issues);
    const dispatch = useDispatch()


    const addIusues = async ()=>{

        try{

           const issuDoc = await addDoc(collection(db,"issues"),{
                org,
                boxnumber,
                issue,
                rootCuase,
                solution,
                engineer,
                status

            })

            dispatch(addIssue({
                org,
                boxnumber,
                rootCuase,
                solution,
                engineer,
                status
            }))



        }
        catch(error){

            console.log(error)

        }

    }
    
    
    return (
        <div className="home-div">
            <h1>Issue Adder</h1>

            <div className="issue-div">

                <input onChange={(e) => setOrg(e.target.value)} type="text" placeholder="Org Name" />
                <input onChange={(e) => setBoxNumber(e.target.value)} type="text" placeholder="Box number or Mobile number" />
                <textarea onChange={(e) => setIssue(e.target.value)} type="text" placeholder="issue" />
                <textarea onChange={(e) => setRootCause(e.target.value)} type="text" placeholder="root cause" />
                <textarea onChange={(e) => setSolution(e.target.value)} type="text" placeholder="solution" />
                <input onChange={(e) => setEngineer(e.target.value)} type="text" placeholder="enginner name" />
                <select onChange={(e) => setStatus(e.target.value)} name="status">
                    <option value="solved">Solved</option>
                    <option value="pending">Pending</option>
                </select>
                <button onClick={addIusues}>Submit</button>

            </div>
        </div>
    )
}

export default Home