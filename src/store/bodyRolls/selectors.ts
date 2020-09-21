import { RootState } from "../index";

export const bodyRollsSelector = (state: RootState) => state.tableGroups.byId;

export const getBodyRollById = (state: RootState, id: string) => bodyRollsSelector(state)[id];

// get bodyRolls by subtableId