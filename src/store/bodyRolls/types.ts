import { CombinedRollValuesType } from "../../model/DataIn"

export interface BodyRoll {
  id: string;
  subtableId: string;
  value: CombinedRollValuesType;
}

export interface BodyRollsState {
  readonly byId: {
    [key: string]: BodyRoll;
  };
  readonly allIds: string[];
}


///////////////////////////////////////////////////////////////////////////
////////////////                                                    ACTIONS

export const ADD_BODYROLL = "ADD_BODYROLL"

interface AddBodyRollAction {
  type: typeof ADD_BODYROLL;
  payload: {
    subtableId: string;
  }
}

export type BodyRollActionTypes = 
| AddBodyRollAction;