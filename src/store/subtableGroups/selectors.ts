import { RootState } from "../index";
import { selectTableGroupById } from "../tableGroups/selectors";

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
  return selectTableGroupById(state, subtable.tableGroupId).tableData["main"][subtable.subtableKey];
}