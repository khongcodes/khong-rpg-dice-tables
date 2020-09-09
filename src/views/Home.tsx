// NOTES
///////////////////////////////////////////////////////////////////
// Store state in session from App component


// IMPORTS
///////////////////////////////////////////////////////////////////
// 1. React

import React from 'react';

import { TableGroup, TableRollsStateType } from "../model/TableGroup";

import TableRollComponent from "../components/TableRollComponent";
// import { AddRollButton } from "../components/Buttons";


// SETUP
///////////////////////////////////////////////////////////////////

type HomeProps = {
  rolls: TableRollsStateType;
  addRoll: (rollArray: TableRollsStateType) => void;
  removeRollById: (rollArray: TableRollsStateType, id: string) => void;
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
            (rolls as TableGroup[]).map(roll => 
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