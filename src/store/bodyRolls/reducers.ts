import store from "../index";

import {
  BodyRoll, BodyRollsState, BodyRollActionTypes, 
  ADD_BODYROLL,
  SET_BODYROLL,
  DELETE_BODYROLL,
  DELETEBYTABLEGROUP_BODYROLL,
  ERROR_BODYROLL
} from "./types"

import { utilityDeleteFromStateByTableGroupId } from "../subtableGroups/reducers"


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
      return {
        byId: Object.assign({}, state.byId, {
          [action.payload.id]: {
            id: action.payload.id,
            tableGroupId: action.payload.tableGroupId,
            subtableGroupId: action.payload.subtableGroupId,
            value: action.payload.value
          }
        }),
        allIds: [...state.allIds, action.payload.id]
      };

    case SET_BODYROLL:
      return {
        byId: Object.assign({}, state.byId, {
          [action.payload.id]: {
            ...state.byId[action.payload.id],
            value: action.payload.value
          }
        }),
        allIds: [...state.allIds]
      }

    case DELETE_BODYROLL: 
      const {[action.payload.id]: throwAwayValue, ...newStateWithoutRollById} = state.byId;
      return {
        byId: newStateWithoutRollById,
        allIds: state.allIds.filter(id => id !== action.payload.id)
      };

    case DELETEBYTABLEGROUP_BODYROLL:
      const newStateWithoutRollByTableGroupId = {...state.byId};
      const bodyRollIdsByTableGroupId = state.allIds.filter(id => state.byId[id].tableGroupId === action.payload.tableGroupId);
      for (let i = 0; i < bodyRollIdsByTableGroupId.length; i++){
        delete newStateWithoutRollByTableGroupId[bodyRollIdsByTableGroupId[i]];
      }

      return {
        byId: newStateWithoutRollByTableGroupId,
        allIds: state.allIds.filter(id => !bodyRollIdsByTableGroupId.includes(id))
      };
    
    case ERROR_BODYROLL:
      console.log("action.payload:");
      console.log(action.payload);
      return state;

    default:
      return state;
  }
}