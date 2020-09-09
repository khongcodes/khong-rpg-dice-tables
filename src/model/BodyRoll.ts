import { v4 as uuidv4 } from "uuid";
import { CombinedRollValuesType } from "./DataIn";

import { SubtableGroup } from "./SubtableGroup";

export class BodyRoll {
  id: string;
  subtableId: string;
  value: CombinedRollValuesType | string;

  constructor( subtableId: string ) {
    this.id = uuidv4();
    this.subtableId = subtableId;
    this.value = this.rollValues(subtableId);
    console.log(this)
  }

  rollDice(input:string): number[] | string {
    const exclamationModifier = input[0] === "!";
    const inputString = !exclamationModifier ? input : input.slice(1);
    const numOfDice = parseInt(inputString.split("d")[0]) ;
    const exclusiveEndNum = parseInt(inputString.split("d")[1]);
    const resultArray = [];
    
    if (exclusiveEndNum !== NaN && numOfDice !== NaN) {
      
      for (let time = 1; time <= numOfDice; time++) {
        let thisResult = Math.floor(Math.random() * exclusiveEndNum);
        if (!exclamationModifier) {
          thisResult += 1;
        }
        resultArray.push(thisResult);
      }
      return resultArray;

    } else {
      return "ERROR BodyRoll.rollDice(): invalid interface input"
    }
  }

  rollValues(subtableId: string): CombinedRollValuesType | string {
    const mySubtable = SubtableGroup.collection.find(subtable => subtable.id === subtableId);
    if (!mySubtable) {
      return "ERROR BodyRoll.getValues(): my Subtable couldn't be found";
    } else {
      const subtableData = mySubtable.subtableData;
      const diceResults = this.rollDice(subtableData.interface);

      let returnValue: CombinedRollValuesType | string = "";

      switch (subtableData.type) {
        case "one-roll string table":
          if (typeof diceResults !== "string") {
            returnValue = subtableData.values[diceResults[0]];
            // console.log(`returnValue: ${returnValue}`);
          } else {
            returnValue = "ERROR BodyRoll.rollValues(): one-roll string table returned string";
            // console.log(returnValue);
          }
          break;

        case "one-roll detail table":
          if (typeof diceResults !== "string") {
            returnValue = subtableData.values[diceResults[0]];
            // console.log(`returnValue: ${returnValue}`);
          } else {
            returnValue = "ERROR BodyRoll.rollValues(): one-roll detail table returned string";
            // console.log(returnValue);
          }
          break;
  
        case "one-roll simple range-table":
          break;
        case "two-roll range-table":
          break;
        case "coordinate-roll detail norange-range-table":
          break;
        case "combined string":
          break;
        case "lookup":
          break;
        default:
          break;
      }

      return returnValue;

    }
  }


}