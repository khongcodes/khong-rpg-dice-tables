import { createStore, combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { tableGroupsReducer } from "./tableGroups/reducers";

const rootReducer = combineReducers({
  tableGroups: tableGroupsReducer
});
export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({ reducer: rootReducer });
export type AppDispatch = typeof store.dispatch;

export default store

// store with Normalized data structure example
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