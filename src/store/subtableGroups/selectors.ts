///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                        IMPORTS

import { RootState } from "../index";

import { selectBodyRollById } from "../bodyRolls/selectors";
import { selectTableGroupById } from "../tableGroups/selectors";


///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                      SELECTORS

export const subtableGroupsSelector = (state: RootState) => state.subtableGroups.byId;

export const selectSubtableGroupById = (state: RootState, id: string) => subtableGroupsSelector(state)[id];

export const selectSubtableGroupIdsByTableGroupId = (state: RootState, id: string): string[] => {
  return selectTableGroupById(state, id).subtableCollection;
}

export const selectSubtableGroupDataInTableGroupData = (
  state: RootState,
  subtableId: string
) => {
  const subtable = selectSubtableGroupById(state, subtableId);
  return subtable !== undefined ? selectTableGroupById(state, subtable.tableGroupId).tableData["main"][subtable.subtableKey] : undefined;
}

export const selectFormatByBodyRollId = (state: RootState, bodyRollId: string) => {
  const subtable = selectBodyRollById(state, bodyRollId);
  if (subtable) {
    return selectSubtableGroupById(state, subtable.subtableGroupId).displaySpec.format;
  } else {
    return;
  }
}