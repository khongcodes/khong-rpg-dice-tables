import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../store";


import { AllBodyRollNames, SubtableDisplaySpecType } from "../../model/DataOut"
import { BodyRoll } from "../bodyRolls/types";
import { ADD_TABLEGROUP } from "../tableGroups/types";

// import {TestThunkActionType} from "./actions"

///////////////////////////////////////////////////////////////////////////
////////////////                                                      STORE

export interface SubtableGroup {
  id: string;
  tableGroupId: string;
  subtableKey: AllBodyRollNames;
  displaySpec: SubtableDisplaySpecType;
  bodyRollCollection: string[];
}

export interface SubtableGroupsState {
  byId: {
    [key: string]: SubtableGroup;
  };
  allIds: string[];
}


///////////////////////////////////////////////////////////////////////////
////////////////                                                    ACTIONS

export const CLEARANDREPOPULATETABLE_SUBTABLEGROUP = "CLEARANDREPOPULATETABLE_SUBTABLEGROUP"
export const DELETEFROMTABLE_SUBTABLEGROUP = "DELETEFROMTABLE_SUBTABLEGROUP"

// interface AddAllToTableSubtableGroupAction {
//   type: typeof ADDALLTOTABLE_SUBTABLEGROUP;
//   payload: {
//     id: string,
//     tableGroupId: string,
//     subtableKey: AllBodyRollNames,
//     displaySpec: SubtableDisplaySpecType
//   }[];
// }

export type ClearAndRepopulateSubtablesDispatchInput = {
  id: string,
  subtableKey: AllBodyRollNames,
  displaySpec: SubtableDisplaySpecType
}

interface ClearAndRepopulateTableSubtableGroupAction {
  type: typeof CLEARANDREPOPULATETABLE_SUBTABLEGROUP;
  payload: {
    tableGroupId: string;
    subtables: {
      [key: string]: ClearAndRepopulateSubtablesDispatchInput 
    }
  }
}

// type AddAllToTableThunkSubtableGroupAction = ThunkAction<void, RootState, unknown, Action<string>>;
// interface AddAllToTableSubtableGroupAction {
//   type: typeof ADDALLTOTABLE_SUBTABLEGROUP;
//   payload: {
//     // id: string;
//     // tableGroupId: string;
//     // subtableKey: string;
//   }
// }

interface DeleteFromTableSubtableGroupAction {
  type: typeof DELETEFROMTABLE_SUBTABLEGROUP;
  payload: {
    tableGroupId: string;
  }
}

export type SubtableGroupActionTypes = 
| ClearAndRepopulateTableSubtableGroupAction
| DeleteFromTableSubtableGroupAction;