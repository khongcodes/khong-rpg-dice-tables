import { createSelector, Selector } from "@reduxjs/toolkit";

// import { TableGroupsState } from "./types";
import { RootState } from "../index"

export const tableGroupsSelector = (state: RootState) => state.tableGroups.byId;

export const getTableGroupById = (state: RootState, id: string) => tableGroupsSelector(state)[id];