import {
  BodyRollActionTypes,
  ADD_BODYROLL
} from "./types";

export function addBodyRoll(id: string, subtableGroupId: string): BodyRollActionTypes {
  return {
    type: ADD_BODYROLL,
    payload: { id, subtableGroupId }
  }
}