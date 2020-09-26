import { AllBodyRollNames, SubtableDisplaySpecType } from "../../model/DataOut"

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
export const DELETEBYTABLEGROUP_SUBTABLEGROUP = "DELETEBYTABLEGROUP_SUBTABLEGROUP";


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

interface DeleteByTableGroupSubtableGroupAction {
  type: typeof DELETEBYTABLEGROUP_SUBTABLEGROUP;
  payload: {
    tableGroupId: string;
  }
}

interface AddBodyRollIdsSubtableGroupAction {
  type: typeof ADDBODYROLLIDS_SUBTABLEGROUP,
  payload: {
    subtableGroupId: string,
    bodyRollIds: string[]; 
  }
}


export type SubtableGroupActionTypes = 
| ClearAndRepopulateTableSubtableGroupAction
| DeleteByTableGroupSubtableGroupAction
| AddBodyRollIdsSubtableGroupAction;