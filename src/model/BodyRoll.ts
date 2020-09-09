import { CombinedBodyRollType } from "./DataIn";
import { bookNames, tableNames, AllTableNames, BodyRollNames} from "./DataOut";

import rpgData from "../data/loader";

export class BodyRoll {
  bookName: typeof bookNames[number];
  tableName: typeof tableNames[number];
  referenceName: BodyRollNames;
  format: string;
  name: string;

  constructor(
    bookName: typeof bookNames[number],
    tableName: typeof tableNames[number],
    referenceName: string,
    format: string,
    name: string
    // formatData: {name: string, format: string}
  ) {
    this.bookName = bookName;
    this.tableName = tableName;
    this.referenceName = referenceName as BodyRollNames;
    this.format = format;
    this.name = name;
    
    // console.log(AllTableNames)
    // console.log(tableName)
    const bodyRollData = rpgData[bookName][tableName as AllTableNames]["main"][referenceName] as CombinedBodyRollType;

    console.log(`bodyRollName: ${name}\npresentationFormat: ${format}\nbodyRollType: ${bodyRollData.type} `);
    let diceResults;
    
    switch (bodyRollData.type) {
      case "one-roll string table":
        diceResults = this.rollDice(bodyRollData.interface);
        if (typeof diceResults !== "string") {
          console.log(bodyRollData.values[diceResults[0]])
        } else {
          console.log("error")
        }
        break;

      case "one-roll detail table":
        diceResults = this.rollDice(bodyRollData.interface);
        if (typeof diceResults !== "string") {
          console.log(bodyRollData.values[diceResults[0]])
        } else {
          console.log("error")
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
        return
    }

    console.log(bodyRollData);
  }

  rollDice(input:string): number[] | "error" {
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
      return "error"
    }
    // if (exclamationModifier) {
    //   inputString = input.slice(1);

    //   // startNum = parseInt(inputString.split("d")[0])
    //   exclusiveEndNum = parseInt(inputString.split("d")[1])
    // } else {
    //   inputString = input;
    //   exclusiveEndNum = parseInt(inputString.split("d")[1])
    // }
  }


}