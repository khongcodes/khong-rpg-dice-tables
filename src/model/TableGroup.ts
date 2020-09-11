import { v4 as uuidv4 } from "uuid";

import { CombinedInputDataType } from "./DataIn";

import { 
  tableSelectValues, tableIdentObjs,
  AllBookNames, AllTableIdentObjs, AllTableNames, AllBodyRollNames,
  allTablesByBook, tableNamesByBooks,
  TableSpecType
} from "./DataOut";

import rpgData from "../data/loader";

import { SubtableGroup } from "./SubtableGroup";

export class TableGroup {
  id: string;
  tableIdentObj: AllTableIdentObjs;
  subtableCollection: SubtableGroup[];
  tableData: {} | CombinedInputDataType;

  constructor() {
    this.id = uuidv4();
    this.tableIdentObj = tableIdentObjs[0];
    this.subtableCollection = [];
    this.tableData = {};
  }

  setTableName(selectedString: string) {
    // CLEAR SUBTABLE COLLECTION
    this.subtableCollection = [];

    // return first table where selectValue matches input selectedString
    const selectedTable = tableIdentObjs.find((tableN: AllTableIdentObjs) => tableN.selectValue === selectedString);
    
    // if no match found or is "initial", set to "initial"
    if (!selectedTable || selectedTable.selectValue === "initial") {
      this.tableIdentObj = tableIdentObjs[0];

    } else {
      this.tableIdentObj = selectedTable;
      const bookName = selectedTable.selectValue.split("-")[0] as AllBookNames;
      const tableName = selectedTable.selectValue.split("-")[1] as AllTableNames;
      const tableSpecs: TableSpecType = allTablesByBook[bookName][tableName];
      /*
        for lancer/iterativeWorld:
        {
          referenceType: "simple",
          tableName: {
            ...
          }
          body: {
            main: {
              ...
            }
          }
        }
      */
      this.tableData = rpgData[bookName][tableName];
      const subtableNames = tableNamesByBooks[bookName][tableName] as Array<AllBodyRollNames>;
      for (let i = 0; i < subtableNames.length; i++) {
        const subtableName = subtableNames[i];
        const displaySpec = tableSpecs.body.main[subtableName];
        const subtableData = this.tableData["main"][subtableName];

        this.subtableCollection.push(
          new SubtableGroup(bookName, tableName, subtableName, displaySpec, subtableData)
        )
      }
    }

    console.log(this)
  }

  rerollTable() {
    console.log("made ya look")
  }
}


export type TableRollsStateType = TableGroup[] | [];