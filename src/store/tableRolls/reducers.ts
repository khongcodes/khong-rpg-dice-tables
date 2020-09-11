// reducers are pure functions that take previous state, an action, and return next state
// this reducer will declare the type of actions it will receieve
// as well as what it should return - the appropriate slice of state

// if there are bugs here, state may be mutating:
// if solution can't be found, look into Immer library or
// redux/CreateSlice

// ALL LOGIC NEEDS TO BE PERFORMED SEPARATE FROM TABLEGROUPS/ROLLS AS INSTANCE METHODS
// perhaps functional library invocation

import {
  TableGroupsState, TableGroupActionTypes,
  ADD_TABLEGROUP, SETTABLE_TABLEGROUP, DELETE_TABLEGROUP, ROLL_TABLEGROUP
} from "./types";

import { TableGroup } from "../../model/TableGroup";

const initialState = {
  tables: []
} as TableGroupsState;


function findIndexOfTable(tableArray: TableGroup[], id: string): number {
  return tableArray.findIndex(tableGroup => tableGroup.id === id)
}

function deepCopy(array: any[]) {
  return JSON.parse(JSON.stringify(array));
}

export function tableRollsReducer(
  state = initialState,
  action: TableGroupActionTypes
): TableGroupsState {
  let indexOfTable, newState;

  switch (action.type) {
    case ADD_TABLEGROUP:
      return {
        tables: [...state.tables, new TableGroup()]
      };

    case SETTABLE_TABLEGROUP:
      indexOfTable = findIndexOfTable(state.tables, action.payload.id);

      if (indexOfTable === -1) {
        return state;
      } else {        
        newState = {
          tables: deepCopy(state.tables)
        };
        newState.tables[indexOfTable].setTableName(action.payload.selectValue);

        return newState;
      }

    case DELETE_TABLEGROUP:
      return {
        tables: state.tables.filter(
          tableGroup => tableGroup.id !== action.payload
        )
      };

    case ROLL_TABLEGROUP:
      indexOfTable = findIndexOfTable(state.tables, action.payload);

      if (indexOfTable === -1) {
        return state;
      } else {
        newState = {
          tables: deepCopy(state.tables)
        };
        newState.tables[indexOfTable].rerollTable();
        return newState;
      }

    default:
      return state;
  }
}