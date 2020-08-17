// NOTES
///////////////////////////////////////////////////////////////////

// IMPORTS
///////////////////////////////////////////////////////////////////
// 1. React
// 2. components

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./viewsCommon/Layout";
import Home from "./views/Home";
import About from "./views/About";



// COMPONENTS & LOGIC
///////////////////////////////////////////////////////////////////

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <div>
          i'm in
        </div>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
