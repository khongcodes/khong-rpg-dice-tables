///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                          NOTES

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                        IMPORTS
// 1. React
// 2. Layout elements
// 3. Views

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./views/Home";
import About from "./views/About";


///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                          SETUP

const SHOWIDS = false;

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                             COMPONENTS & LOGIC



const App = () => {

  return (
    <BrowserRouter>
      <Layout >
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home showIds={SHOWIDS}/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
