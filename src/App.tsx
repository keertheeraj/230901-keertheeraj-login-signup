import React from 'react';
import Sign from './login';
import Register from './Signup';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './profile';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Sign />} />
           <Route path="/registration" element={<Register />} /> 
           <Route path = "/profile" element = {<Profile />}/>
        </Routes>
        </BrowserRouter>
     
    </>
  );
}

export default App;
