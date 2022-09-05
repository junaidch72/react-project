import React from "react";
import { Signin } from "./components/Signin";
import { Signup } from "./components/Signup";
import  {Home}  from "./components/Home";
import { Routes, Route } from "react-router-dom";
import {Protected} from "./components/Protected";



function App() {
  return (
    <>
     <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home/*" element={<Protected Componenet={Home}/>} >
      </Route>
    </Routes>

      
    </>
  );
}

export default App;
