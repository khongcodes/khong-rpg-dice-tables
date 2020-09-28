///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                        IMPORTS
// 1. Store
// 2. Data-reading utilities

import {
  TableGroupActionTypes,
  ADD_TABLEGROUP,
  SETTABLE_TABLEGROUP,
  DELETE_TABLEGROUP
} from "./types";

import { AllTableSelectValues } from "../../model/DataOut";


///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                ACTION CREATORS

export function addTableGroup(): TableGroupActionTypes {
  return {
    type: ADD_TABLEGROUP,
    payload: null
  }
}

export function setTableGroup(
  id: string,
  selectValue: AllTableSelectValues,
  subtableIds: string[]
): TableGroupActionTypes {
  return {
    type: SETTABLE_TABLEGROUP,
    payload: { id, selectValue, subtableIds }
  }
}

export function deleteTableGroup(id: string): TableGroupActionTypes {
  return {
    type: DELETE_TABLEGROUP,
    payload: { id }
  }
}


// THUNK ACTION EXAMPLE

// export function fullySetTableGroup(selectValue: AllTableNames): ThunkAction<void, RootState, unknown, Action<string>> {
//   return (dispatch) => {
//     dispatch( setTableGroup(selectValue, id) );

//   }
// }