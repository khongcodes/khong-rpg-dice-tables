import { tableNames, tableSelectValues, bodyRollFormats } from "../../model/DataIO";


///////////////////////////////////////////////////////////////////////////
////////////////                                                      STORE

export type BodyRollSimple = {
  format: "simple";
  mutable: true;
  values: Array<string>;
}

export type BodyRollDetail = {
  format: "detail";
  mutable: false;
  values: Array<{
    name: string;
    detail: string;
  }>;
}

export type BodyRollDetailMutable = {
  format: "detail";
  mutable: true;
  values: Array<{
    name: string;
    detail: string;
  }>;
}

export type BodyRollTypes = 
| BodyRollSimple
| BodyRollDetail
| BodyRollDetailMutable;


export interface BodyRoll {
  name: string;
  format: typeof bodyRollFormats[number];
  values: BodyRollTypes[];
}

export interface TableRoll {
  id: string;
  tableName: typeof tableNames[number];
  body: {

  }
}

export interface TableRollsState {
  tableRolls: TableRoll[];
}


///////////////////////////////////////////////////////////////////////////
////////////////                                                    ACTIONS

export const ADD_ROLL = "ADD_ROLL";
export const DELETE_ROLL = "DELETE_ROLL";

interface AddRollAction {
  type: typeof ADD_ROLL
  payload: typeof tableSelectValues[number]
};

interface DeleteRollAction {
  type: typeof DELETE_ROLL
  payload: string
}

export type TableRollActionTypes = AddRollAction | DeleteRollAction;