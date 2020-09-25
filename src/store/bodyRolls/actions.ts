import {
  BodyRollActionTypes, ErrorBodyRollInput,
  ADD_BODYROLL, ERROR_BODYROLL
} from "./types";

import { CombinedRollValuesType } from "../../model/DataIn";

export function addBodyRoll(
  tableGroupId: string,
  subtableGroupId: string,
  bodyRollData: {
    id: string,
    value: CombinedRollValuesType
  }
): BodyRollActionTypes {
  return {
    type: ADD_BODYROLL,
    payload: { 
      id: bodyRollData.id,
      value: bodyRollData.value,
      subtableGroupId, 
      tableGroupId
    }
  }
}

export function errorWithBodyRoll(
  errorInput: ErrorBodyRollInput,
  message: string
): BodyRollActionTypes {
  const { tableGroupId, subtableGroupId } = errorInput;
  return {
    type: ERROR_BODYROLL,
    payload: { message, tableGroupId, subtableGroupId },
    error: true
  }
}