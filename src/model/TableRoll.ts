import { v4 as uuidv4 } from "uuid";

// import { tableSelectValues, tableNames, allTablesByBook } from "./DataOut";
// // import { TableSelectValueTypes } from "../store/tableRolls/types";

// export class TableRoll {
//   id: string;
//   table: typeof tableNames[number] | undefined;
  

//   constructor() {
//     this.id = uuidv4();
//     this.table = tableNames[0];
//   }

//   setType(selectedString: typeof tableSelectValues[number]) {
//     const selectedTable = tableNames.find(tableN => tableN.selectValue === selectedString);
    
//     if (!selectedTable || selectedTable.selectValue === "initial") {
      
//     } else {
//       this.table = selectedTable;
//       const [bookName, tableName] = selectedTable.selectValue.split("-");
//       const bodySpecs = allTablesByBook[bookName][tableName]
//     }
//     // generate body
//   }

// };

// export type RollsStateType = TableRoll[] | [];