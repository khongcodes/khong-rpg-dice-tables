///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                        IMPORTS

import { RootState } from "../index";


///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                      SELECTORS

export const tableGroupsSelector = (state: RootState) => state.tableGroups;

export const selectTableGroupIds = (state: RootState) => tableGroupsSelector(state).allIds;

export const selectTableGroupById = (state: RootState, id: string) => tableGroupsSelector(state).byId[id];

export const selectSubtableIdsByTableGroupId = (state: RootState, id: string) => selectTableGroupById(state, id).subtableCollection;

