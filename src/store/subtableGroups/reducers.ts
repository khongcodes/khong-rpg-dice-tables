import store from "../index";

import { 
  SubtableGroup, SubtableGroupsState , SubtableGroupActionTypes,
  ADD_SUBTABLEGROUP
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
    case ADD_SUBTABLEGROUP:
      
      return {
        byId: Object.assign({}, state.byId, {

        }),
        allIds: [...state.allIds]
      }

    default:
      return state;
  }
}