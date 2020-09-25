import { RootState } from "../index";

export const bodyRollsSelector = (state: RootState) => state.bodyRolls.byId;

export const selectBodyRollById = (state: RootState, id: string) => bodyRollsSelector(state)[id];

// get bodyRolls by subtableId