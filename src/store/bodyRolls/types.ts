import { CombinedRollValuesType } from "../../model/DataIn"

export interface BodyRoll {
  id: string;
  subtableId: string;
  value: CombinedRollValuesType;
}

export interface BodyRollsState {
  byId: {
    [key: string]: BodyRoll;
  };
  allIds: string[];
}