import { createStore, combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { tableRollsReducer } from "./tableRolls/reducers";

const rootReducer = combineReducers({
  tableRolls: tableRollsReducer
});
export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({ reducer: rootReducer });
export type AppDispatch = typeof store.dispatch;

export default store