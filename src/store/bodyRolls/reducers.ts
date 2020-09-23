import store from "../index";

import {
  BodyRoll, BodyRollsState, BodyRollActionTypes, 
  ADD_BODYROLL
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

        }),
        allIds: [...state.allIds]
      }
    
    default:
      return state;
  }
}