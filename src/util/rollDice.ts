import { CombinedBodyRollType, CombinedRollValuesType } from "../model/DataIn";

// export const ERROR_INVALIDSUBTABLEINTERFACE = "ERROR util/rollDice.ts:rollDice(): invalid subtableData.interface";
// export const ERROR_INVALIDSUBTABLETYPE = "ERROR util/rollDice.ts:rollValues(): invalid subtableData.type";

// export const subtableErrors = [
//   ERROR_INVALIDSUBTABLEINTERFACE,
//   ERROR_INVALIDSUBTABLETYPE
// ];

// export type SubtableError = 
// | typeof ERROR_INVALIDSUBTABLEINTERFACE
// | typeof ERROR_INVALIDSUBTABLETYPE;


const rollDice = (diceInterface: string): number[] => {
  const exclamationModifier = diceInterface[0] === "!";
  const diceInterfaceString = !exclamationModifier ? diceInterface : diceInterface.slice(1);
  const numOfDice = parseInt(diceInterfaceString.split("d")[0]);
  const exclusiveEndNum = parseInt(diceInterfaceString.split("d")[1]);
  const resultArray: number[] = [];

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
    return resultArray;
  }
}

export const rollValues = (subtableData: CombinedBodyRollType ): CombinedRollValuesType => {
  const diceResults = rollDice(subtableData.interface);
  // if (typeof diceResults === "string") { return ERROR_INVALIDSUBTABLEINTERFACE }

  switch (subtableData.type) {
    case "one-roll string table":
      return { value: subtableData.values[diceResults[0]] };

    case "one-roll detail table":
      return subtableData.values[diceResults[0]];
    
    case "one-roll simple range-table":
      return { value: "" };
    case "two-roll range-table":
      return { value: "" };
    case "coordinate-roll detail norange-range-table":
      return { value: "" };
    case "combined string":
      return { value: "" };
    case "lookup":
      return { value: "" };
   
      default:
      return { value: "" };
  }
}