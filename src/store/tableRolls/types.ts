// import { tables, tableSelectValues, bodyRollFormats } from "../../model/DataIO";
import { TableGroup } from "../../model/TableGroup";

import { AllTableNames } from "../../model/DataOut";

// ///////////////////////////////////////////////////////////////////////////
// ////////////////                                                      STORE

export interface TableGroupsState {
  tables: TableGroup[];
}

// export type BodyRollNameType = {
//   prop: string;
//   stringName: string;
// }

// export type BodyRollSimple = {
//   name: BodyRollNameType;
//   format: "simple";
//   mutable: true;
//   values: Array<string>;
// }

// export type BodyRollDetail = {
//   name: BodyRollNameType;
//   format: "detail";
//   mutable: false;
//   values: Array<{
//     name: string;
//     detail: string;
//   }>;
// }

// export type BodyRollDetailMutable = {
//   name: BodyRollNameType;
//   format: "detail";
//   mutable: true;
//   values: Array<{
//     name: string;
//     detail: string;
//   }>;
// }

// export type BodyRollTypes = 
// | BodyRollSimple
// | BodyRollDetail
// | BodyRollDetailMutable;

// // export interface BodyRoll {
// //   name: BodyRollNameType;
// //   format: typeof bodyRollFormats[number];
// //   values: BodyRollTypes[];
// // }

// export interface TableRoll {
//   id: string;
//   tableName: typeof tableNames[number];
//   body: BodyRollTypes[];
// }

// export type TableSelectValueTypes = typeof tableSelectValues[number];

// export interface TableRollsState {
//   tableRolls: TableRoll[];
// }


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