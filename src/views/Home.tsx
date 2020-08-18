// NOTES
///////////////////////////////////////////////////////////////////
// Store state in session from App component


// IMPORTS
///////////////////////////////////////////////////////////////////
// 1. React

import React from 'react';

import { AddRollButton } from "../components/Buttons";


// SETUP
///////////////////////////////////////////////////////////////////

type HomeProps = {
  testState: number;
  updateState: VoidFunction;
}

// COMPONENTS & LOGIC
///////////////////////////////////////////////////////////////////

const Roll = () => {
  return (
    <div>
      I'm a roll
    </div>
  )
}

const Home: React.FC<HomeProps> = ({ testState, updateState }) => {
  
  const increment = (event: React.MouseEvent) => {
    updateState();
  }

  return (
    <div>
      <div>
        {testState}
      </div>

      <div>
        <button onClick={increment}>add</button>
        {/* <AddRollButton /> */}
      </div>
    </div>
  )
}

export default Home;