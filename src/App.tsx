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

import { TableRoll, TableRollsStateType } from "./model/TableRoll";

import Layout from "./components/Layout";
import Home from "./views/Home";
import About from "./views/About";


// SETUP
///////////////////////////////////////////////////////////////////

// COMPONENTS & LOGIC
///////////////////////////////////////////////////////////////////

const App = () => {
  // const [tableRollsState, setTableRollsState] = useState<TableRollsStateType>([]);
  
  // // const addRoll = (tableRollsArray: TableRollsStateType) => {
  // //   setTableRollsState([ ...tableRollsArray, new TableRoll() ]);
  // // }

  // // const removeRollById = (
  // //   tableRollsArray: TableRollsStateType,
  // //   id: string
  // // ) => {
  // //   setTableRollsState([ ...tableRollsArray.filter((roll: TableRoll) => (roll.id != id)) ]);
  // // }

  // console.log(tableRollsState);

  return (
    <BrowserRouter>
      <Layout >
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
