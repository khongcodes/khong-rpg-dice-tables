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

export const CLEARANDREPOPULATETABLE_SUBTABLEGROUP = "CLEARANDREPOPULATETABLE_SUBTABLEGROUP";
export const ADDBODYROLLIDS_SUBTABLEGROUP = "ADDBODYROLLIDS_SUBTABLEGROUP";
export const DELETEFROMTABLE_SUBTABLEGROUP = "DELETEFROMTABLE_SUBTABLEGROUP";


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

interface AddBodyRollIdsSubtableGroupAction {
  type: typeof ADDBODYROLLIDS_SUBTABLEGROUP,
  payload: {
    subtableGroupId: string,
    bodyRollIds: string[]; 
  }
}

interface DeleteFromTableSubtableGroupAction {
  type: typeof DELETEFROMTABLE_SUBTABLEGROUP;
  payload: {
    tableGroupId: string;
  }
}

export type SubtableGroupActionTypes = 
| ClearAndRepopulateTableSubtableGroupAction
| AddBodyRollIdsSubtableGroupAction
| DeleteFromTableSubtableGroupAction;