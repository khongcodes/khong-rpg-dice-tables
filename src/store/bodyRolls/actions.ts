///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                        IMPORTS
// 1. Store
// 2. Data-reading utilities

import {
  BodyRollActionTypes, ErrorBodyRollInput,
  ADD_BODYROLL,
  SET_BODYROLL,
  DELETE_BODYROLL,
  DELETEBYTABLEGROUP_BODYROLL,
  DELETEBYSUBTABLEGROUP_BODYROLL,
  ERROR_BODYROLL
} from "./types";

import { CombinedRollValuesType } from "../../model/DiceRollTypes";


///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                ACTION CREATORS

export function addBodyRoll(
  tableGroupId: string,
  subtableGroupId: string,
  bodyRollData: {
    id: string,
    value: CombinedRollValuesType
  }
): BodyRollActionTypes {
  const { id, value } = bodyRollData;
  return {
    type: ADD_BODYROLL,
    payload: { id, value, subtableGroupId, tableGroupId }
  }
}

export function setBodyRoll( id: string, value: CombinedRollValuesType ): BodyRollActionTypes {
  return {
    type: SET_BODYROLL,
    payload: { id, value }
  }
}

export function deleteBodyRoll(id: string): BodyRollActionTypes {
  return {
    type: DELETE_BODYROLL,
    payload: { id }
  }
}

export function deleteByTableGroupBodyRoll(tableGroupId: string): BodyRollActionTypes {
  return {
    type: DELETEBYTABLEGROUP_BODYROLL,
    payload: { tableGroupId }
  }
}

export function deleteBySubtableGroupBodyRoll(subtableGroupId: string) : BodyRollActionTypes {
  return {
    type: DELETEBYSUBTABLEGROUP_BODYROLL,
    payload: { subtableGroupId }
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