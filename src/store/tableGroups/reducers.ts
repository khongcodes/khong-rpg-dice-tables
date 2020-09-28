///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                          NOTES
// 
// reducers are pure functions that take previous state, an action, and return next state
// this reducer will declare the type of actions it will receieve
// as well as what it should return - the appropriate slice of state
// 
// if there are bugs here, state may be mutating:
// if solution can't be found, look into Immer library or
// redux/CreateSlice


///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                        IMPORTS
// 1. Packages
// 2. Store
// 3. Data & data-reading utilities

import { v4 as uuidv4 } from "uuid";

import {
  TableGroupsState, TableGroupActionTypes,
  ADD_TABLEGROUP, SETTABLE_TABLEGROUP, DELETE_TABLEGROUP
} from "./types";

import { AllBookNames, AllTableNames } from "../../model/DataOut";
import rpgData from "../../data/loader";


///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                          SETUP

const initialState = {
  byId: {},
  allIds: []
} as TableGroupsState;


///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                        REDUCER

export function tableGroupsReducer(
  state = initialState,
  action: TableGroupActionTypes
): TableGroupsState {

  switch (action.type) {

    case ADD_TABLEGROUP:
      const newId = uuidv4();
      return {
        byId: Object.assign({}, state.byId, {
          [newId]: {
            id: newId,
            bookKey: "",
            tableKey: "",
            subtableCollection: [],
            tableData: {}
          }
        }),
        allIds: [...state.allIds, newId]
      };

      case DELETE_TABLEGROUP:
        const { [action.payload.id]: removedTableGroup, ...newStateExcludingId } = state.byId;
        return {
          byId: newStateExcludingId,
          allIds: state.allIds.filter(obj => obj !== action.payload.id)
        };

      case SETTABLE_TABLEGROUP:
        const selectValue = action.payload.selectValue as string;
        const bookKey = selectValue.split("-")[0] as AllBookNames;
        const tableKey = selectValue.split("-")[1] as AllTableNames;

        return {
          ...state,
          byId: Object.assign({}, state.byId, {
            [action.payload.id]: {
              ...state.byId[action.payload.id],
              bookKey: bookKey,
              tableKey: tableKey,
              subtableCollection: action.payload.subtableIds,
              tableData: rpgData[bookKey][tableKey]
            }
          })
        };

    default:
      return state;
  }
}