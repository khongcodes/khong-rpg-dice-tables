///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                        IMPORTS

import { RootState } from "../index";


///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                      SELECTORS

export const tableGroupsSelector = (state: RootState) => state.tableGroups;

export const selectTableGroupIds = (state: RootState) => tableGroupsSelector(state).allIds;

export const selectTableGroupById = (state: RootState, id: string) => tableGroupsSelector(state).byId[id];

// const selectTableGroupIdsAndSelectValues = (state: RootState) => {
//   const allIds = selectTableGroupIds(state);
//   return allIds.map(id => {
//     const { bookKey, tableKey } = selectTableGroupById(state, id);
//     const reconstructedSelectValue = bookKey + "-" + tableKey;
//     return { id: id, selectValue: reconstructedSelectValue }
//   })
// }

export const selectSubtableIdsByTableGroupId = (state: RootState, id: string) => selectTableGroupById(state, id).subtableCollection;

