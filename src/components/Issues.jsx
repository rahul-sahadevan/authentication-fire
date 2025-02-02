import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../App.css';
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";

const Issues = () => {
    const [issueList, setIssueList] = useState([]);
    const [editModal, setEditModal] = useState('close-modal');
    const [editValue, setEditValue] = useState({});
    
    console.log(issueList);

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
            await deleteDoc(delDoc);
        } catch (error) {
            console.log(error);
        }
    };

    // Open Edit Modal and Set Data
    const editIssue = (id, editIssueData) => {
        setEditModal('open-modal');
        setEditValue(editIssueData);
    };

    //  Handle input change for all fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditValue((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchIssue();
    }, []);

    return (
        <div>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Org Name</th>
                        <th>Box Number</th>
                        <th>Issue</th>
                        <th>Root Cause</th>
                        <th>Solution</th>
                        <th>Engineer</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {issueList.map((issue, index) => (
                        <tr key={issue.id}>
                            <td>{index + 1}</td>
                            <td>{issue.org}</td>
                            <td>{issue.boxnumber}</td>
                            <td>{issue.issue}</td>
                            <td>{issue.rootCause}</td>
                            <td>{issue.solution}</td>
                            <td>{issue.engineer}</td>
                            <td>{issue.status}</td>
                            <td className="edit-col">
                                <button className="del-edit-btn">
                                    <FontAwesomeIcon onClick={() => deleteIssue(issue.id)} icon={faTrash} />
                                    <FontAwesomeIcon
                                        onClick={() =>
                                            editIssue(issue.id, {
                                                org: issue.org,
                                                boxnumber: issue.boxnumber,
                                                issue: issue.issue,
                                                rootCause: issue.rootCause,
                                                solution: issue.solution,
                                                engineer: issue.engineer,
                                                status: issue.status
                                            })
                                        }
                                        icon={faPencil}
                                    />
                                </button>
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
                    <textarea name="rootCause" type="text" value={editValue.rootCause || ""} onChange={handleChange} />
                    <textarea name="solution" type="text" value={editValue.solution || ""} onChange={handleChange} />
                    <input name="engineer" type="text" value={editValue.engineer || ""} onChange={handleChange} />
                    <select name="status" value={editValue.status || ""} onChange={handleChange}>
                        <option value="solved">Solved</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>
            )}
        </div>
    );
};

export default Issues;
