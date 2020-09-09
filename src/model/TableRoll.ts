import { v4 as uuidv4 } from "uuid";

import { 
  tableSelectValues, 
  bookNames, tableNames, 
  AllTableNames, BodyRollNames,
  allTablesByBook,
  TableSpecType
} from "./DataOut";

import { BodyRoll } from "./BodyRoll"
// import { TableSelectValueTypes } from "../store/tableRolls/types";

export class TableRoll {
  id: string;
  tableName: typeof tableNames[number];
  body: [] | BodyRoll[];

  constructor() {
    this.id = uuidv4();
    this.tableName = tableNames[0];
    this.body = [];
  }

  setType(selectedString: string) {
    const selectedTable = tableNames.find((tableN: typeof tableNames[number]) => tableN.selectValue === selectedString);
    
    if (!selectedTable || selectedTable.selectValue === "initial") {
      this.tableName = tableNames[0];

    } else {
      this.tableName = selectedTable;
      const bookName = selectedTable.selectValue.split("-")[0] as typeof bookNames[number];
      const tableName = selectedTable.selectValue.split("-")[1] as AllTableNames;
      const tableSpecs: TableSpecType = allTablesByBook[bookName][tableName];
      
      console.log(allTablesByBook[bookName][tableName])
      console.log(Object.entries(tableSpecs.body.main).map(
        (arrayObj) => {
          const refName = arrayObj[0];
          const formatAndName = arrayObj[1] as {format: string, name: string};

          return new BodyRoll( bookName, tableName, refName, formatAndName.format, formatAndName.name)
        }
      ));
    }
    // generate body
  }
}


export type TableRollsStateType = TableRoll[] | [];