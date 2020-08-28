import { v4 as uuidv4 } from "uuid";

export class TableRoll {
  id: string;
  table: string | undefined;
  

  constructor() {
    this.id = uuidv4();
    this.table = "none";
  }

  setType(selectedString: string) {
    this.table = selectedString;
  }

};

export type TableRollsStateType = Array<TableRoll> | [] | undefined