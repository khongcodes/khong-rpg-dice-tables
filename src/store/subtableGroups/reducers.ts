///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                        IMPORTS
// 1. Store

import { 
  SubtableGroupsState , SubtableGroupActionTypes,
  CLEARANDREPOPULATETABLE_SUBTABLEGROUP,
  DELETEBYTABLEGROUP_SUBTABLEGROUP,
  ADDBODYROLLIDS_SUBTABLEGROUP,
  MARKINITIALIZED_SUBTABLEGROUP,
  DELETEBODYROLLID_SUBTABLEGROUP,
  DELETEBODYROLLCOLLECTION_SUBTABLEGROUP
} from "./types";


///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                          SETUP

const initialState = {
  byId: {},
  allIds: []
} as SubtableGroupsState;

const utilityDeleteFromStateByTableGroupId = (
  state = initialState,
  tableGroupId: string
): SubtableGroupsState => {
  const oldSubtables = Object.keys(state.byId).filter((id: string) => state.byId[id].tableGroupId === tableGroupId);
  const newStateById = {...state.byId};
  for (let i = 0; i < oldSubtables.length; i++) {
    delete newStateById[oldSubtables[i]];
  }
  const newStateAllIds = state.allIds.filter(id => !oldSubtables.includes(id));
  return {
    byId: newStateById,
    allIds: newStateAllIds
  }
}


///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                        REDUCER

export function subtableGroupsReducer(
  state = initialState,
  action: SubtableGroupActionTypes
): SubtableGroupsState {
  
  switch (action.type) {
    
    // ONLY CASE WHERE SUBTABLEGROUP WOULD BE ADDED IS IN SETTING TABLEGROUP
    case CLEARANDREPOPULATETABLE_SUBTABLEGROUP:
      const transitionState = utilityDeleteFromStateByTableGroupId(state, action.payload.tableGroupId);
      return {
        byId: Object.assign(transitionState.byId, action.payload.subtables),
        allIds: transitionState.allIds.concat(Object.keys(action.payload.subtables))
      }

    case DELETEBYTABLEGROUP_SUBTABLEGROUP:
      return utilityDeleteFromStateByTableGroupId(state, action.payload.tableGroupId);

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
      };

    case MARKINITIALIZED_SUBTABLEGROUP:
      return {
        byId: {
          ...state.byId,
          [action.payload.subtableGroupId]: {
            ...state.byId[action.payload.subtableGroupId],
            initalized: true
          }
        },
        allIds: [...state.allIds]
      }
    
    case DELETEBODYROLLID_SUBTABLEGROUP:
      return {
        byId: {
          ...state.byId,
          [action.payload.subtableGroupId]: {
            ...state.byId[action.payload.subtableGroupId],
            bodyRollCollection: state.byId[action.payload.subtableGroupId].bodyRollCollection.filter(id => id !== action.payload.bodyRollId)
          }
        },
        allIds: [...state.allIds]
      };

    case DELETEBODYROLLCOLLECTION_SUBTABLEGROUP:
      return {
        byId: {
          ...state.byId,
          [action.payload.subtableGroupId]: {
            ...state.byId[action.payload.subtableGroupId],
            bodyRollCollection: []
          }
        },
        allIds: [...state.allIds]
      };

    default:
      return state;
  }
}