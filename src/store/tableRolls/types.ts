import { tables, tableSelectValues, bodyRollFormats } from "../../model/DataIO";


// ///////////////////////////////////////////////////////////////////////////
// ////////////////                                                      STORE

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

// export const ADD_TABLEROLL = "ADD_TABLEROLL";
// export const DELETE_TABLEROLL = "DELETE_TABLEROLL";

// interface AddTableRollAction {
//   type: typeof ADD_TABLEROLL
//   payload: TableSelectValueTypes
// };

// interface DeleteTableRollAction {
//   type: typeof DELETE_TABLEROLL
//   payload: string
// }

// export type TableRollActionTypes = 
// | AddTableRollAction 
// | DeleteTableRollAction;