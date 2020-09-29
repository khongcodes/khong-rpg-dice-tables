///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                        IMPORTS

import { CombinedInputDataType } from "../../model/DiceRollTypes";
import { AllBookNames, AllTableNames, AllTableSelectValues } from "../../model/TableKeyStructuresAndFormats";

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                               MODEL AND STATE TYPE DEFINITIONS

export interface TableGroup {
  id: string;
  bookKey: AllBookNames;
  tableKey: AllTableNames;
  subtableCollection: string[];
  tableData: CombinedInputDataType[AllTableNames];
}

// declaring readonly protects immutability of initial state
// (only shallow - DeepReadonly seems to create trouble with union string-literal types)
export interface TableGroupsState {
  readonly byId: {
    [key: string]: TableGroup;
  };
  readonly allIds: string[];
}

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                        ACTIONS

export const ADD_TABLEGROUP = "ADD_TABLEGROUP";
export const SETTABLE_TABLEGROUP = "SETTABLE_TABLEGROUP";
export const DELETE_TABLEGROUP = "DELETE_TABLEGROUP";

interface AddTableGroupAction {
  type: typeof ADD_TABLEGROUP
  payload: null
};

interface SettableTableGroupAction {
  type: typeof SETTABLE_TABLEGROUP
  payload: {
    id: string,
    selectValue: AllTableSelectValues,
    subtableIds: string[]
  }
}

interface DeleteTableGroupAction {
  type: typeof DELETE_TABLEGROUP
  payload: {
    id: string;
  }
}

export type TableGroupActionTypes = 
| AddTableGroupAction
| SettableTableGroupAction
| DeleteTableGroupAction;