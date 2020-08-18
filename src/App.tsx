// NOTES
///////////////////////////////////////////////////////////////////
// Check if session can be created with redux
// pass state (number of rolls) to Home

// IMPORTS
///////////////////////////////////////////////////////////////////
// 1. React
// 2. components

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./views/Home";
import About from "./views/About";


// COMPONENTS & LOGIC
///////////////////////////////////////////////////////////////////

const App = () => {
  const [testState, setTestState] = useState(1);
  const incrementTestState: VoidFunction = () => setTestState(testState + 1);

  const [rolls, setRolls] = useState();

  return (
    <BrowserRouter>
      <Layout >
        <div>
          i'm in
        </div>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home testState={testState} updateState={incrementTestState} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
