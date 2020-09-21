import { createSelector, Selector } from "@reduxjs/toolkit";

// import { TableGroupsState } from "./types";
import { RootState } from "../index"

export const tableGroupsSelector = (state: RootState) => state.tableGroups;

export const selectTableGroupIds = (state: RootState) => tableGroupsSelector(state).allIds;

export const selectTableGroupById = (state: RootState, id: string) => tableGroupsSelector(state).byId[id];

// export const allTableGroupsSequential = (state: RootState) => tableGroupsSelector(state).allIds.map(id => selectTableGroupById(state, id));