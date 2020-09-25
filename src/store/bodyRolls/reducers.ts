import store from "../index";

import {
  BodyRoll, BodyRollsState, BodyRollActionTypes, 
  ADD_BODYROLL, ERROR_BODYROLL
} from "./types"


const initialState = {
  byId: {},
  allIds: []
} as BodyRollsState;

export function bodyRollsReducer(
  state = initialState,
  action: BodyRollActionTypes
): BodyRollsState {

  switch (action.type) {
    case ADD_BODYROLL:
      console.log("I'm in the reducer")
      return {
        byId: Object.assign({}, state.byId, {
          id: action.payload.id,
          tableGroupId: action.payload.tableGroupId,
          subtableGroupId: action.payload.subtableGroupId,
          value: action.payload.value
        }),
        allIds: [...state.allIds, action.payload.id]
      };

    // case DELETE_BODYROLL
    
    case ERROR_BODYROLL:
      console.log("action.payload:");
      console.log(action.payload);
      return state;

    default:
      return state;
  }
}