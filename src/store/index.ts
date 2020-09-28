///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                          NOTES
// see src/store/exampleStore.ts for example of store structure

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                        IMPORTS
// 1. Packages
// 2. Reducers
// 3. Types

import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
// import thunk, {ThunkAction} from "redux-thunk";

import { tableGroupsReducer } from "./tableGroups/reducers";
import { subtableGroupsReducer } from "./subtableGroups/reducers"
import { bodyRollsReducer } from "./bodyRolls/reducers";

import { TableGroupActionTypes } from "./tableGroups/types";
import { SubtableGroupActionTypes } from "./subtableGroups/types";
import { BodyRollActionTypes } from "./bodyRolls/types";


///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                          SETUP

const rootReducer = combineReducers({
  tableGroups: tableGroupsReducer,
  subtableGroups: subtableGroupsReducer,
  bodyRolls: bodyRollsReducer
});

export type RootState = ReturnType<typeof rootReducer>;

// WITH THUNK
// const store = configureStore({ reducer: rootReducer, middleware: [thunk] });
const store = configureStore({ reducer: rootReducer });

export type AppDispatch = typeof store.dispatch;
export default store

export type RootAction =
| TableGroupActionTypes
| SubtableGroupActionTypes
| BodyRollActionTypes;