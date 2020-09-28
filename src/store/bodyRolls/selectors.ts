///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                        IMPORTS

import { RootState } from "../index";


///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                      SELECTORS

export const bodyRollsSelector = (state: RootState) => state.bodyRolls.byId;

export const selectBodyRollById = (state: RootState, id: string) => bodyRollsSelector(state)[id];