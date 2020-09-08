import { TableRoll } from "../model/TableRoll";
import { Dispatch } from "redux";
import { Action } from "history";

const tableRollsActionTypeNames = [
  "ADD_ROLL",
  "REMOVE_ROLL",
  "REROLL_TABLE",
  "ADD_ELEMENT",
  "REROLL_ELEMENT",
  "REMOVE_ELEMENT"
] as const;

export type TableRollsActionType = {
  type: typeof tableRollsActionTypeNames[number];
  payload: TableRoll;
}

// export const addTableRoll: Action = () => (
//   (dispatch: Dispatch) => {
//     const newRoll = new TableRoll();
//     dispatch({type: "ADD_ROLL", payload: newRoll})
//   }
// )