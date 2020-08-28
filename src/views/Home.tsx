// NOTES
///////////////////////////////////////////////////////////////////
// Store state in session from App component


// IMPORTS
///////////////////////////////////////////////////////////////////
// 1. React

import React from 'react';
import { Dispatch } from "redux";
import { connect, MapDispatchToProps } from "react-redux";

import { addTableRoll } from "../actions/tableRollsActions";
import { TableRoll, TableRollsStateType } from "../model/TableRoll";

import RollComponent from "../components/TableRollComponent";
// import { AddRollButton } from "../components/Buttons";


// SETUP
///////////////////////////////////////////////////////////////////

type HomeProps = {
  // rolls:
  rolls: TableRollsStateType;
  // addRoll: (rollArray: TableRollsStateType) => void;
  // removeRollById: (rollArray: TableRollsStateType, id: string) => void;
}

// COMPONENTS & LOGIC
///////////////////////////////////////////////////////////////////

const mapStateToProps = (state: HomeProps) => ({
  rolls: state.rolls
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addRoll: () => dispatch(addTableRoll())
})

const Home: React.FC<HomeProps> = ({ /** tableRolls, addRoll, removeRollById **/ }) => {
  // const removeThisRoll = (id: string) => removeRollById(tableRolls, id);

  return (
    <div>
      <div>
        {/* {
          tableRolls.length === 0 ? <></> : 
            (tableRolls as TableRoll[]).map(roll => 
              <RollComponent 
                key={roll.id}
                data={roll}
                removeThisRoll={removeThisRoll}
              />
            ) 
        } */}
      </div>

      <div>
        {/* <button onClick={() => addRoll(tableRolls)}>Add Roll</button> */}
        <button ></button>
      </div>
    </div>
  )
}

// This expression is not callable.
//   Each member of the union type '(<U>(callbackfn: (value: Roll, index: number, array: Roll[]) => U, thisArg?: any) => U[]) | (<U>(callbackfn: (value: never, index: number, array: never[]) => U, thisArg?: any) => U[])' has signatures, but none of those signatures are compatible with each other.

export default connect(mapStateToProps, mapDispatchToProps)(Home);