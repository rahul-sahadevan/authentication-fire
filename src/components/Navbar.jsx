import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'

const Navigation = ()=>{


    return (
        <div className="nav-div">
            <Navbar className="nav" bg="dark" data-bs-theme="dark">
                <Nav className="me-auto">
                    <Nav.Link href="/">Login</Nav.Link>
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/issues">Issues</Nav.Link>
                </Nav>
            </Navbar>

        </div>
    )
}

export default Navigation