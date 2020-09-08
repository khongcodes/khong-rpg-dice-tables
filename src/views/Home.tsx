// NOTES
///////////////////////////////////////////////////////////////////
// Store state in session from App component


// IMPORTS
///////////////////////////////////////////////////////////////////
// 1. React

import React from 'react';

import { TableRoll, RollsStateType } from "../model/TableRoll";

import TableRollComponent from "../components/TableRollComponent";
// import { AddRollButton } from "../components/Buttons";


// SETUP
///////////////////////////////////////////////////////////////////

type HomeProps = {
  rolls: RollsStateType;
  addRoll: (rollArray: RollsStateType) => void;
  removeRollById: (rollArray: RollsStateType, id: string) => void;
}

// COMPONENTS & LOGIC
///////////////////////////////////////////////////////////////////

const Home: React.FC<HomeProps> = ({ rolls, addRoll, removeRollById }) => {

  const removeThisRoll = (id: string) => removeRollById(rolls, id);

  return (
    <div>
      <div>
        {
          rolls.length === 0 ? <></> : 
            (rolls as TableRoll[]).map(roll => 
              <TableRollComponent 
                key={roll.id}
                data={roll}
                removeThisRoll={removeThisRoll}
              />
            ) 
        }
      </div>

      <div>
        <button onClick={() => addRoll(rolls)}>Add Roll</button>
      </div>
    </div>
  )
}

// This expression is not callable.
//   Each member of the union type '(<U>(callbackfn: (value: Roll, index: number, array: Roll[]) => U, thisArg?: any) => U[]) | (<U>(callbackfn: (value: never, index: number, array: never[]) => U, thisArg?: any) => U[])' has signatures, but none of those signatures are compatible with each other.

export default Home;