// // reducers are pure functions that take previous state, an action, and return next state
// // this reducer will declare the type of actions it will receieve
// // as well as what it should return - the appropriate slice of state
import React from 'react'

// import {
//   TableRollsState,
//   TableRollActionTypes,
//   ADD_TABLEROLL,
//   DELETE_TABLEROLL
// } from "./types";

// const initialState: TableRollsState = {
//   tableRolls: []
// };

// export function tableRollsReducer(
//   state = initialState,
//   action: TableRollActionTypes
// ): TableRollsState {
//   switch (action.type) {
//     case ADD_TABLEROLL:
//       return {
//         tableRolls: [...state.tableRolls, action.payload]
//       };

//     case DELETE_TABLEROLL:
//       return {
//         tableRolls: state.tableRolls.filter(
//           tableRollObj => tableRollObj.id !== action.payload
//         )
//       };

//     default:
//       return state;
//   }
// }