import React from "react";
import Authentication from "./components/Authentication";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navbar";
import Home from "./components/Home";
import Issues from "./components/Issues";


const App = ()=>{

  return(
    <div>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Authentication/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/issues" element={<Issues/>}></Route>
      </Routes>
    </div>
  )
}


export default App