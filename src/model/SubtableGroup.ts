import { v4 as uuidv4 } from "uuid";

import { CombinedBodyRollType } from "./DataIn";
import {
  AllBookNames, AllTableNames, AllBodyRollNames,
  SubtableDisplaySpecType,
} from "./DataOut";

import { BodyRoll } from "./BodyRoll"

export class SubtableGroup {
  static collection: Array<SubtableGroup>;
  id: string;
  bookName: AllBookNames;
  tableName: AllTableNames;
  subtableKey: AllBodyRollNames;
  displaySpec: SubtableDisplaySpecType;
  subtableData: CombinedBodyRollType;
  bodyRollCollection: BodyRoll[];

  constructor(
    bookName: AllBookNames,
    tableName: AllTableNames,
    subtableKey: AllBodyRollNames,
    displaySpec: SubtableDisplaySpecType,
    subtableData: CombinedBodyRollType,
  ) {
    this.id = uuidv4();
    this.bookName = bookName;
    this.tableName = tableName;
    this.subtableKey = subtableKey;
    this.displaySpec = displaySpec;
    this.subtableData = subtableData;
    this.bodyRollCollection = [];
    
    SubtableGroup.collection.push(this);
    this.addBodyRoll();

    console.log(this)
    // console.log(SubtableGroup.collection)
  }

  deleteSubtable() {

  }

  addBodyRoll() {
    this.bodyRollCollection.push(new BodyRoll(this.id));
  }

  deleteBodyRoll(id: string) {
    this.bodyRollCollection = this.bodyRollCollection.filter(rollObj => rollObj.id !== id);
  }

  rerollSubtable() {
    
  }
}

SubtableGroup.collection = [];