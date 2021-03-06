///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                        IMPORTS

import { AllBodyRollNames, SubtableDisplaySpecType } from "../../model/TableKeyStructuresAndFormats"

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                               MODEL AND STATE TYPE DEFINITIONS

export interface SubtableGroup {
  id: string;
  tableGroupId: string;
  subtableKey: AllBodyRollNames;
  displaySpec: SubtableDisplaySpecType;
  bodyRollCollection: string[];
  initalized: boolean;
}

export interface SubtableGroupsState {
  byId: {
    [key: string]: SubtableGroup;
  };
  allIds: string[];
}


///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                        ACTIONS

export const CLEARANDREPOPULATETABLE_SUBTABLEGROUP = "CLEARANDREPOPULATETABLE_SUBTABLEGROUP";
export const ADDBODYROLLIDS_SUBTABLEGROUP = "ADDBODYROLLIDS_SUBTABLEGROUP";
export const MARKINITIALIZED_SUBTABLEGROUP = "MARKINITIALIZED_SUBTABLEGROUP";
export const DELETEBYTABLEGROUP_SUBTABLEGROUP = "DELETEBYTABLEGROUP_SUBTABLEGROUP";
export const DELETEBODYROLLID_SUBTABLEGROUP = "DELETEBODYROLLID_SUBTABLEGROUP";
export const DELETEBODYROLLCOLLECTION_SUBTABLEGROUP = "DELETEBODYROLLCOLLECTION_SUBTABLEGROUP";


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
};

interface MarkInitializedSubtableGroupAction {
  type: typeof MARKINITIALIZED_SUBTABLEGROUP,
  payload: {
    subtableGroupId: string
  }
};

interface DeleteBodyRollIdSubtableGroupAction {
  type: typeof DELETEBODYROLLID_SUBTABLEGROUP,
  payload: {
    subtableGroupId: string,
    bodyRollId: string
  }
}

interface DeleteBodyRollCollectionSubtableGroupAction {
  type: typeof DELETEBODYROLLCOLLECTION_SUBTABLEGROUP,
  payload: {
    subtableGroupId: string
  }
}


export type SubtableGroupActionTypes = 
| ClearAndRepopulateTableSubtableGroupAction
| DeleteByTableGroupSubtableGroupAction
| AddBodyRollIdsSubtableGroupAction
| MarkInitializedSubtableGroupAction
| DeleteBodyRollIdSubtableGroupAction
| DeleteBodyRollCollectionSubtableGroupAction;