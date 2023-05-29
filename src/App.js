import React from "react";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import AddEvent from './pages/AddTask';

function App() {
  return( 
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/AddEvent" element={<AddEvent />} />
    </Routes>
  )
}

export default App;