import store from "../index";

import { 
  SubtableGroup, SubtableGroupsState , SubtableGroupActionTypes,
  CLEARANDREPOPULATETABLE_SUBTABLEGROUP, 
  ADDBODYROLLIDS_SUBTABLEGROUP
} from "./types";


const initialState = {
  byId: {},
  allIds: []
} as SubtableGroupsState;

export function subtableGroupsReducer(
  state = initialState,
  action: SubtableGroupActionTypes
): SubtableGroupsState {
  
  switch (action.type) {
    // ONLY CASE WHERE SUBTABLEGROUP WOULD BE ADDED IS IN SETTING TABLEGROUP
    case CLEARANDREPOPULATETABLE_SUBTABLEGROUP:
      const oldSubtables = Object.keys(state.byId).filter((id: string) => state.byId[id].tableGroupId === action.payload.tableGroupId);
      const newStateById = {...state.byId};
      for (let i = 0; i < oldSubtables.length; i++) {
        delete newStateById[oldSubtables[i]];
      }
      const excludeOldSubtableIds = state.allIds.filter(id => !oldSubtables.includes(id));
      
      return {
        byId: Object.assign(newStateById, action.payload.subtables),
        allIds: excludeOldSubtableIds.concat(Object.keys(action.payload.subtables))
      }

    case ADDBODYROLLIDS_SUBTABLEGROUP:
      return {
        byId: {
          ...state.byId,
          [action.payload.subtableGroupId]: {
            ...state.byId[action.payload.subtableGroupId],
            bodyRollCollection: [
              ...action.payload.bodyRollIds,
              ...state.byId[action.payload.subtableGroupId].bodyRollCollection
            ]
          }
        },
        allIds: [...state.allIds]
      }

    default:
      return state;
  }
}