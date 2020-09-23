// import { tables, tableSelectValues, bodyRollFormats } from "../../model/DataIO";
// import { TableGroup } from "../../model/TableGroup";

// import { DeepReadonly } from "utility-types"

import { CombinedInputDataType, CombinedRollValuesType } from "../../model/DataIn";
import { 
  AllBookNames, AllTableIdentObjs, AllBodyRollNames, AllTableNames,
  SubtableDisplaySpecType, AllTableSelectValues
} from "../../model/DataOut";

import { SubtableGroup } from "../subtableGroups/types";

///////////////////////////////////////////////////////////////////////////
////////////////                                                      STORE

export interface TableGroup {
  id: string;
  bookKey: AllBookNames;
  tableKey: AllTableNames;
  subtableCollection: string[];
  tableData: {} | CombinedInputDataType;
}

// declaring readonly protects immutability of initial state
// (only shallow - DeepReadonly seems to create trouble with union string-literal types)
export interface TableGroupsState {
  readonly byId: {
    [key: string]: TableGroup;
  };
  readonly allIds: string[];
}

// ///////////////////////////////////////////////////////////////////////////
// ////////////////                                                    ACTIONS

export const ADD_TABLEGROUP = "ADD_TABLEGROUP";
export const SETTABLE_TABLEGROUP = "SETTABLE_TABLEGROUP";
export const DELETE_TABLEGROUP = "DELETE_TABLEGROUP";
// export const ROLL_TABLEGROUP = "ROLL_TABLEGROUP";

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

// interface RollTableGroupAction {
//   type: typeof ROLL_TABLEGROUP
//   payload: string
// }

export type TableGroupActionTypes = 
| AddTableGroupAction
| SettableTableGroupAction
| DeleteTableGroupAction;
// | RollTableGroupAction;