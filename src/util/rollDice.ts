///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                        IMPORTS

import {
  CombinedBodyRollType, CombinedRollValuesType,
  NestedNamedRangeRollValue, RangeSimpleRollValue
} from "../model/DiceRollTypes";


///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                    CHECK RANGE

const isInRange = (
  number: number,
  obj: NestedNamedRangeRollValue | RangeSimpleRollValue
): boolean => {
  const readRange = obj["range"].split("-");
  if (readRange.length > 1) {
    const [lowerNum, higherNum] = obj["range"].split("-").map(string => parseInt(string));
    return lowerNum <= number && number <= higherNum;
  } else {
    return parseInt(readRange[0]) === number;
  }
}


///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                             OUTPUT TRANSFORMING - TEXT PARSING

const ROLLTABLESYNTAX = /\$\{!*\d+d\d+\}/g
const PARSEDICEROLLSYNTAX = /\{!*\d+d\d+\}/g
const PARSEBRACKETS = /{|\}/;

const peelParseBrackets = (string: string): string => string.split(PARSEBRACKETS)[1];

const checkAndParseResult = (result: string, rollTable: string[] | undefined) => {
  if (rollTable) {
    return parseBracketWithDiceResult(parseBracketsWithRollTable(result, rollTable));
  } else {
    return parseBracketWithDiceResult(result);
  }
}

const parseBracketsWithRollTable = (string: string, rollTable: string[]) => {
  const matches = string.match(ROLLTABLESYNTAX);
  if (!!matches) {
    const diceResults = matches.map((singleMatch: string) => rollDice(peelParseBrackets(singleMatch)));
    const results = diceResults.map((number: number) => rollTable[number]);

    let newString = string;
    for (let i = 0; i < diceResults.length; i++) {
      newString = newString.replace(matches[i], results[i]);
    }
    return newString;
  } else {
    return string;
  }
}

const parseBracketWithDiceResult = (string: string) => {
  const matches = string.match(PARSEDICEROLLSYNTAX);
  if (!!matches) {
    const diceResults = matches.map((singleMatch: string) => rollDice(peelParseBrackets(singleMatch)));
    
    let newString = string;
    for (let i = 0; i < diceResults.length; i++) {
      newString = newString.replace(matches[i], diceResults[i].toString());
    }
    return newString;
  } else {
    return string;
  }
}


///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                               CALCULATE VALUES

const rollDice = (diceInterface: string): number => {
  const exclamationModifier = diceInterface[0] === "!";
  const diceInterfaceString = !exclamationModifier ? diceInterface : diceInterface.slice(1);
  const numOfDice = parseInt(diceInterfaceString.split("d")[0]);
  const exclusiveEndNum = parseInt(diceInterfaceString.split("d")[1]);
  const resultArray: number[] = [];

  if (!isNaN(exclusiveEndNum) && !isNaN(numOfDice)) {
    for (let time = 1; time <= numOfDice; time++) {
      let thisResult = Math.floor(Math.random() * exclusiveEndNum);
      if (!exclamationModifier) {
        thisResult += 1;
      }
      resultArray.push(thisResult);
    }
    return resultArray.reduce((a, v) => a + v);
  } else {
    return 0;
  }
}


export const rollValues = (subtableData: CombinedBodyRollType ): CombinedRollValuesType => {
  // if (typeof diceResults === "string") { return ERROR_INVALIDSUBTABLEINTERFACE }

  switch (subtableData.type) {

    case "one-roll string table":
      const orstDiceResult = rollDice(subtableData.interface);
      const orstResult = subtableData.values[orstDiceResult];
      const orstRollTable = subtableData.rollTable;
      return { value: checkAndParseResult(orstResult, orstRollTable) };


    case "one-roll detail table":
      const ordtDiceResult = rollDice(subtableData.interface);
      const ordtResult = subtableData.values[ordtDiceResult];
      const ordtRollTable = ordtResult.rollTable || subtableData.rollTable;
      return {
        name: ordtResult.name,
        detail: checkAndParseResult(ordtResult.detail, ordtRollTable)
      };
    

    case "one-roll simple range-table":
      const orsrtDiceResults = rollDice(subtableData.interface);
      const orsrtResult = subtableData.values.find(option => isInRange(orsrtDiceResults, option));
      const orsrtRollTable = orsrtResult?.rollTable || subtableData.rollTable;
      if (orsrtResult) {
        // orsrtRollTable is allowed to be undefined
        return { value: checkAndParseResult(orsrtResult.value, orsrtRollTable) };
      }
      else {
        printError(subtableData, subtableData.type);
        return { 
          value: "error: two-roll range-table in util/rollDice.ts: rollValues():" 
        }
      }


    case "two-roll range-table":
      const [trrtFirstDiceInput, trrtSecondDiceInput] = subtableData.interface.split(/\[|\]/);
      const trrtDiceResults = [rollDice(trrtFirstDiceInput), rollDice(trrtSecondDiceInput)];
      const trrtFirstSet = subtableData.values.find(set => isInRange(trrtDiceResults[0], set))
      const trrtFinalResult = trrtFirstSet?.values.find(set => isInRange(trrtDiceResults[1], set))
      const trrtRollTable = trrtFinalResult?.rollTable || subtableData.rollTable;

      if (trrtFirstSet && trrtFinalResult)  {
        return { 
          name: trrtFirstSet.categoryName,
          detail: checkAndParseResult(trrtFinalResult.value, trrtRollTable)
        }
      } else {
        return { value: "error: two-roll range-table in util/rollDice.ts: rollValues()" }
      }


    case "coordinate-roll detail norange-range-table":
      return { value: "" };


    case "combined string":
      const csDiceInput = subtableData.interface.split(" ");
      const csDiceResults = csDiceInput.map((input: string) => rollDice(input));
      const csResultComponents = csDiceResults.map((diceResultNum: number, index: number) => subtableData.values[index][diceResultNum]);
      return { value: csResultComponents.join(" ") };


    case "lookup":
      return { value: "" };
   
      
      default:
      return { value: "" };
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                 ERROR HANDLING

// export const ERROR_INVALIDSUBTABLEINTERFACE = "ERROR util/rollDice.ts:rollDice(): invalid subtableData.interface";
// export const ERROR_INVALIDSUBTABLETYPE = "ERROR util/rollDice.ts:rollValues(): invalid subtableData.type";

// export const subtableErrors = [
//   ERROR_INVALIDSUBTABLEINTERFACE,
//   ERROR_INVALIDSUBTABLETYPE
// ];

// export type SubtableError = 
// | typeof ERROR_INVALIDSUBTABLEINTERFACE
// | typeof ERROR_INVALIDSUBTABLETYPE;

const printError = (subtableData: CombinedBodyRollType, string: CombinedBodyRollType["type"]) => {
  console.log(`error: ${string} in util/rollDice.ts: rollValues():`);
  console.log(subtableData);
  console.log();
}