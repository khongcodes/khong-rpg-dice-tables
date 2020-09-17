import { AllBodyRollNames, SubtableDisplaySpecType } from "../../model/DataOut"
import { BodyRoll } from "../bodyRolls/types";
import { ADD_TABLEGROUP } from "../tableGroups/types";


///////////////////////////////////////////////////////////////////////////
////////////////                                                      STORE

export interface SubtableGroup {
  id: string;
  tableId: string;
  subtableKey: AllBodyRollNames;
  displaySpec: SubtableDisplaySpecType;
  bodyRollCollection: BodyRoll[];
}

export interface SubtableGroupsState {
  byId: {
    [key: string]: SubtableGroup;
  };
  allIds: string[];
}


///////////////////////////////////////////////////////////////////////////
////////////////                                                    ACTIONS

export const ADD_SUBTABLEGROUP = "ADD_SUBTABLEGROUP"

interface AddSubtableGroupAction {
  type: typeof ADD_SUBTABLEGROUP;
  payload: {
    id: string;
    tableId: string;
  }
}

export type SubtableGroupActionTypes = 
| AddSubtableGroupAction;