import store from "../index";

import { 
  SubtableGroup, SubtableGroupsState , SubtableGroupActionTypes,
  CLEARANDREPOPULATETABLE_SUBTABLEGROUP
} from "./types";

import { selectSubtableIdsByTableGroupId } from "../tableGroups/selectors"
import { subtableGroupsSelector } from "./selectors";

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

      // if (state.allIds.length === 0) {
      //   return {
      //     byId: {},
      //     // allIds: [action.payload.subtables]
      //   }
      // } else {

      // }
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

    default:
      return state;
  }
}