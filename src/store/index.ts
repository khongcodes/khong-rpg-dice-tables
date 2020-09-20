import thunk from "redux-thunk";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import { tableGroupsReducer } from "./tableGroups/reducers";
import { subtableGroupsReducer } from "./subtableGroups/reducers"
import { bodyRollsReducer } from "./bodyRolls/reducers";
import { TableGroupActionTypes } from "./tableGroups/types";
import { SubtableGroupActionTypes } from "./subtableGroups/types";
import { BodyRollActionTypes } from "./bodyRolls/types";

const rootReducer = combineReducers({
  tableGroups: tableGroupsReducer,
  subtableGroups: subtableGroupsReducer,
  bodyRolls: bodyRollsReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({ reducer: rootReducer, middleware: [thunk] });
export type AppDispatch = typeof store.dispatch;

export default store

export type RootAction =
| TableGroupActionTypes
| SubtableGroupActionTypes
| BodyRollActionTypes;

// store with NORMALIZED data structure example
/*
{
  tableGroups: {
    byId: {
      "uuidOutput1": {
        id: "uuidOutput1",
        tableIdentObj: tableIdentObj
        subtables: [] (list of subtableIds)
        tableData: {}
      },
      "uuidOutput2": {
        id: "uuidOutput2",
        tableIdentObj: tableIdentObj,
        subtables: [] (list of subtableIds)
        tableData: {}
      }
    },
    allIds: ["uuidOutput1", "uuidOutput2"]
  },
  subtableGroups: {
    byId: {
      "uuidOutput3": {
        id: "uuidOutput3",
        table: "uuidOutput1",
        subtableKey: "" (name of this subtable for lookup)
        displayspec: {} (display spec)
        bodyRolls: [] (list of bodyroll ids)
      },
      ...
    },
    allIds: []
  },
  bodyRolls: {
    byId: {
      "uuidOutput4": {
        id: "uuidOutput4",
        subtable: "uuidOutput3",
        value: {} (combinedrollvaluestype)
      }
    },
    allIds: []
  }
}
*/