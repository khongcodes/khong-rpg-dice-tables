import { CombinedRollValuesType } from "../../model/DataIn"

export interface BodyRoll {
  id: string;
  tableGroupId: string;
  subtableGroupId: string;
  value: CombinedRollValuesType;
}

export interface BodyRollsState {
  readonly byId: {
    [key: string]: BodyRoll;
  };
  readonly allIds: string[];
}

export type ErrorBodyRollInput = {
  tableGroupId: string;
  subtableGroupId: string;
}

///////////////////////////////////////////////////////////////////////////
////////////////                                                    ACTIONS

export const ADD_BODYROLL = "ADD_BODYROLL";
// export const DELETEBYTABLEGROUP_BODYROLL = "DELETEBYTABLEGROUP_BODYROLL";
// export const DELETEBYSUBTABLEGROUP_BODYROLL = "DELETEBYTABLEGROUP_BODYROLL";
export const ERROR_BODYROLL = "ERROR_BODYROLL";

interface AddBodyRollAction {
  type: typeof ADD_BODYROLL;
  payload: {
    id: string;
    subtableGroupId: string;
    tableGroupId: string;
    value: CombinedRollValuesType;
  }
}


interface ErrorBodyRollAction {
  type: typeof ERROR_BODYROLL;
  payload: {
    message: string;
    tableGroupId: string;
    subtableGroupId: string;
  }
  error: true;
}

export type BodyRollActionTypes = 
| AddBodyRollAction
| ErrorBodyRollAction;
