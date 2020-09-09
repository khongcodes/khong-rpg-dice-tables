import { TableRoll} from "../model/TableRoll";
// import { TableRollsStateType } from "../model/TableRoll";
// import { TableRollsActionType } from "../actions/tableRollsActions";
// import { Reducer } from "react";

// export type RollsState = Readonly<{
//   rollTables: TableRoll[];
// }>

// const initialState: RollsState = {
//   rollTables: []
// };

// const tableRollsReducer: Reducer<TableRollsStateType, TableRollsActionType> = (state=initialState.rollTables, action) => {
//   switch (action.type) {
//     case "ADD_ROLL":
//       return [...state, action.payload];
    
//       case "REMOVE_ROLL":
//         return [...state.filter(tableRoll => tableRoll.id !== action.payload.id)];
//   }
// }

// export default tableRollsReducer;