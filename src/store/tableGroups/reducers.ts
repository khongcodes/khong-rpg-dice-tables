// reducers are pure functions that take previous state, an action, and return next state
// this reducer will declare the type of actions it will receieve
// as well as what it should return - the appropriate slice of state

// if there are bugs here, state may be mutating:
// if solution can't be found, look into Immer library or
// redux/CreateSlice

// ALL LOGIC NEEDS TO BE PERFORMED SEPARATE FROM TABLEGROUPS/ROLLS AS INSTANCE METHODS
// perhaps functional library invocation

import { v4 as uuidv4 } from "uuid";

import {
  TableGroup, TableGroupsState, TableGroupActionTypes,
  ADD_TABLEGROUP, SETTABLE_TABLEGROUP, DELETE_TABLEGROUP, ROLL_TABLEGROUP
} from "./types";

import { AllBookNames, AllTableNames } from "../../model/DataOut";
import rpgData from "../../data/loader";

import store from "../index";


const initialState = {
  byId: {},
  allIds: []
} as TableGroupsState;


export function tableGroupsReducer(
  state = initialState,
  action: TableGroupActionTypes
): TableGroupsState {
  
  let newId: string;

  switch (action.type) {

    case ADD_TABLEGROUP:
      newId = uuidv4();
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
        // const thisTable = state.byId[action.payload.id];
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
              subtableCollection: Object.keys(rpgData[bookKey][tableKey]["main"]).map(a => uuidv4()),
              tableData: rpgData[bookKey][tableKey]
            }
          })
        };

    // case SETTABLE_TABLEGROUP:
    //   indexOfTable = findIndexOfTable(state.tableGroups, action.payload.id);

    //   if (indexOfTable === -1) {
    //     return state;
    //   } else {        
    //     newState = {
    //       tableGroups: deepCopy(state.tableGroups)
    //     };
    //     newState.tableGroups[indexOfTable].setTableName(action.payload.selectValue);

    //     return newState;
    //   }

    // case DELETE_TABLEGROUP:
    //   return {
    //     // tables: state.tables.filter(
    //     //   tableGroup => tableGroup.id !== action.payload
    //     // )
    //   };

    // case ROLL_TABLEGROUP:
    //   indexOfTable = findIndexOfTable(state.tables, action.payload);

    //   if (indexOfTable === -1) {
    //     return state;
    //   } else {
    //     newState = {
    //       tables: deepCopy(state.tables)
    //     };
    //     newState.tables[indexOfTable].rerollTable();
    //     return newState;
    //   }

    default:
      return state;
  }
}