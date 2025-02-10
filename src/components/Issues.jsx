import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { getDocs, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../App.css';
import { faTrash, faPencil, faArrowAltCircleLeft, faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import Navigation from "./Navbar";
import { unparse} from "papaparse";
import 'react-toastify/dist/ReactToastify.css';
import { toast ,ToastContainer} from "react-toastify";


const Issues = () => {
    const [issueList, setIssueList] = useState([]);
    const [editModal, setEditModal] = useState('close-modal');
    const [editValue, setEditValue] = useState({});
    const[searchList,setSearchList] = useState(issueList || [])
    const[search,setSearch] = useState('')
    const[page,setPage] = useState(1)

    
    console.log(issueList);
    console.log(editValue);
    console.log(searchList)

    useEffect(()=>{
        setSearchList(issueList)
    },[issueList])

    useEffect(()=>{

       if(localStorage.getItem('issue') === 'true'){
        toast.success('Issue is Added')
        setTimeout(()=>{
            localStorage.removeItem('issue')
        },1000)
       }
    },[])
    

    // Fetch issues from Firebase
    const fetchIssue = async () => {
        try {
            const querySnap = await getDocs(collection(db, 'issues'));
            const newData = querySnap.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));
            setIssueList(newData);
        } catch (error) {
            console.log(error);
        }
    };

    // Delete issue from Firebase
    const deleteIssue = async (id) => {
        try {
            const delDoc = doc(db, 'issues', id);
            toast.success('deleted succesfully')
            await deleteDoc(delDoc);
            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    };

    // Open Edit Modal and Set Data
    const editIssue = (id, editIssueData) => {
        setEditModal('open-modal');
        setEditValue(editIssueData);
        console.log(editIssueData)
    };

    //  Handle input change for all fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditValue((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const updateEdit = async (id)=>{

        try{

            if(editValue.org !== '' && editValue.boxnumber !== '' && editValue.issue !== '' && editValue.rootCuase !== '' && editValue.solution !== '' && editValue.engineer !== '' && editValue.status !== '' && editValue.date !== ''){

                const docRef = doc(db,'issues',id)
                toast.success('updated succesfully')
                await updateDoc(docRef,editValue)
                setEditModal('close-modal')
                window.location.reload()
            }
            else{

                // alert('please fill all fields')
                toast.error('please fill all')
            }


        }
        catch(error){
            console.log(error)
        }

    }

    const handleClose = ()=>{

        setEditModal('close-modal')
    }

    // Fetch data on component mount
    useEffect(() => {
        fetchIssue();
    }, []);


   

    const exportToCSV = () => {
        const formattedData = issueList.map(issue => ({
            org: issue.org || "", 
            boxnumber: issue.boxnumber || "", 
            date: issue.date ? String(issue.date) : "N/A",  // Ensure date is a string
            issue: issue.issue || "",
            rootcause: issue.rootcause ? String(issue.rootcause) : "N/A", // Ensure rootcause is a string
            solution: issue.solution || "",
            engineer: issue.engineer || "",
            status: issue.status || ""
        }));
    
        const csv = unparse(formattedData, {
            delimiter: ",", 
            skipEmptyLines: true
        });
    
        const data = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
        const csvURL = window.URL.createObjectURL(data);
        const tempLink = document.createElement("a");
        tempLink.href = csvURL;
        tempLink.setAttribute("download", "IssueList.csv");
        document.body.append(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
    };


    const handleSearch = (e)=>{
        const searchValue = e.target.value.toLowerCase()
        setSearch(searchValue)
        const newSearchList = issueList.filter((issue) => 
            issue.org.toLowerCase().includes(searchValue) || 
            issue.boxnumber.toLowerCase().includes(searchValue) ||
            issue.engineer.toLowerCase().includes(searchValue)
        );    

        setSearchList(newSearchList)
        
        console.log(searchList)
    }

    const handlePagePlus = ()=>{
        setPage(page + 1)
    }
    const handlePageMinus = ()=>{
        setPage(page - 1)
    }

    

    return (
        <div className="issue-container">
            <Navigation/>
            <br />
            <div className="search-container">
                <input onChange={handleSearch} type="text" placeholder="search"  />
                <button className="export-btn" onClick={exportToCSV}>Eport to CSV</button>
            </div>
            <br />
            <Table responsive="sm" className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Org Name</th>
                        <th>Box Number</th>
                        <th>Date</th>
                        <th>Issue</th>
                        <th>Root Cause</th>
                        <th>Solution</th>
                        <th>Engineer</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    { searchList.slice(page*10-10,page*10).map((issue, index) => (
                        <tr key={issue.id}>
                            <td>{index + 1}</td>
                            <td>{issue.org}</td>
                            <td>{issue.boxnumber}</td>
                            <td>{issue.date}</td>
                            <td>{issue.issue}</td>
                            <td>{issue.rootcause}</td>
                            <td>{issue.solution}</td>
                            <td>{issue.engineer}</td>
                            <td>{issue.status}</td>
                            <td  >
                                 <FontAwesomeIcon className="delete-btn" onClick={() => deleteIssue(issue.id)} icon={faTrash} />
                            </td>
                            <td className="edit-col">
                                <FontAwesomeIcon
                                        className="edit-btn"
                                        onClick={() =>
                                            editIssue(issue.id, {
                                                org: issue.org,
                                                boxnumber: issue.boxnumber,
                                                issue: issue.issue,
                                                rootCause: issue.rootcause,
                                                solution: issue.solution,
                                                engineer: issue.engineer,
                                                status: issue.status,
                                                id:issue.id
                                            })
                                        }
                                        icon={faPencil}
                                    />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
           

            {editModal === 'open-modal' && (
                <div className={editModal}>
                    <input name="org" type="text" value={editValue.org || ""} onChange={handleChange} />
                    <input name="boxnumber" type="text" value={editValue.boxnumber || ""} onChange={handleChange} />
                    <textarea name="issue" type="text" value={editValue.issue || ""} onChange={handleChange} />
                    <textarea name="rootcause" type="text" value={editValue.rootCause || ""} onChange={handleChange} />
                    <textarea name="solution" type="text" value={editValue.solution || ""} onChange={handleChange} />
                    <input name="engineer" type="text" value={editValue.engineer || ""} onChange={handleChange} />
                    <select name="status" value={editValue.status || ""} onChange={handleChange}>
                        <option value="solved">Solved</option>
                        <option value="pending">Pending</option>
                    </select>
                    
                        <button onClick={() => updateEdit(editValue.id)}>update</button>
                        <button onClick={handleClose}>close</button>
                    
                </div>
            )}

           

            {
                searchList.length >0 && (
                    <div className="pagination">
                        <span onClick={handlePageMinus} className= {page === 1 ? 'dissable-arrow' : ''}>
                            <FontAwesomeIcon icon={faArrowAltCircleLeft}/>
                        </span>
                        <span className="selected-page">
                            {
                                page
                            }
                        </span>
                        <span onClick={handlePagePlus}className={page < (searchList.length / 10) ? '' : 'dissable-arrow'}>
                            <FontAwesomeIcon icon={faArrowAltCircleRight}/>
                        </span>
                    </div>
                )
            }
            <ToastContainer/>
        </div>
    );
};

export default Issues;
