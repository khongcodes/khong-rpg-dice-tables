import store from "../index";

import { 
  SubtableGroup, SubtableGroupsState , SubtableGroupActionTypes,
  ADDALLTOTABLE_SUBTABLEGROUP
} from "./types";

import { selectSubtableIdsByTableGroupId } from "../tableGroups/selectors"

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
    case ADDALLTOTABLE_SUBTABLEGROUP:
      return {
        byId: Object.assign({}, state.byId, action.payload),
        allIds: [...state.allIds, ...Object.keys(action.payload)]
      }

    default:
      return state;
  }
}