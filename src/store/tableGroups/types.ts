// import { tables, tableSelectValues, bodyRollFormats } from "../../model/DataIO";
// import { TableGroup } from "../../model/TableGroup";

import { CombinedInputDataType, CombinedRollValuesType } from "../../model/DataIn";
import { 
  AllBookNames, AllTableIdentObjs, AllBodyRollNames, AllTableNames,
  SubtableDisplaySpecType 
} from "../../model/DataOut";

import { SubtableGroup } from "../subtableGroups/types";

///////////////////////////////////////////////////////////////////////////
////////////////                                                      STORE

export interface TableGroup {
  id: string;
  bookKey: AllBookNames;
  tableKey: AllTableNames;
  subtableCollection: SubtableGroup[];
  tableData: {} | CombinedInputDataType;
}

export interface TableGroupsState {
  byId: {
    [key: string]: TableGroup;
  };
  allIds: string[];
}


// ///////////////////////////////////////////////////////////////////////////
// ////////////////                                                    ACTIONS

export const ADD_TABLEGROUP = "ADD_TABLEGROUP";
export const SETTABLE_TABLEGROUP = "SETTABLE_TABLEGROUP";
export const DELETE_TABLEGROUP = "DELETE_TABLEGROUP";
export const ROLL_TABLEGROUP = "ROLL_TABLEGROUP";

interface AddTableGroupAction {
  type: typeof ADD_TABLEGROUP
  payload: null
};

interface SettableTableGroupAction {
  type: typeof SETTABLE_TABLEGROUP
  payload: {
    id: string,
    selectValue: AllTableNames
  }
}

interface DeleteTableGroupAction {
  type: typeof DELETE_TABLEGROUP
  payload: string
}

interface RollTableGroupAction {
  type: typeof ROLL_TABLEGROUP
  payload: string
}

export type TableGroupActionTypes = 
| AddTableGroupAction
| SettableTableGroupAction
| DeleteTableGroupAction
| RollTableGroupAction;