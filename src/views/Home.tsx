// NOTES
///////////////////////////////////////////////////////////////////
// Store state in session from App component


// IMPORTS
///////////////////////////////////////////////////////////////////
// 1. React

import React from 'react';

import { AddRollButton } from "../components/Buttons";


// COMPONENTS & LOGIC
///////////////////////////////////////////////////////////////////

const Roll = () => {
  return (
    <div>
      I'm a roll
    </div>
  )
}

const Home: React.FC = () => {
  
  return (
    <div>
      <div>
        {}
      </div>

      <div>
        <AddRollButton />
      </div>
    </div>
  )
}

export default Home;