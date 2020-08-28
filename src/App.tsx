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

import { Roll, RollsStateType } from "./model/Roll";

import Layout from "./components/Layout";
import Home from "./views/Home";
import About from "./views/About";


// SETUP
///////////////////////////////////////////////////////////////////

// COMPONENTS & LOGIC
///////////////////////////////////////////////////////////////////

const App = () => {
  const [rollsState, setRollsState] = useState<RollsStateType>([]);
  
  const addRoll = (rollsArray: RollsStateType) => {
    setRollsState([ ...rollsArray, new Roll() ]);
  }

  const removeRollById = (
    rollsArray: RollsStateType,
    id: string
  ) => {
    setRollsState([ ...rollsArray.filter((roll: Roll) => (roll.id != id)) ]);
  }

  console.log(rollsState);

  return (
    <BrowserRouter>
      <Layout >
        <div>
          i'm in
        </div>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home rolls={rollsState} addRoll={addRoll} removeRollById={removeRollById} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
