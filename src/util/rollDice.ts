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
    const diceResults = matches.map((singleMatch: string) => rollDice(peelParseBrackets(singleMatch))[0]);
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
    const diceResults = matches.map((singleMatch: string) => rollDice(peelParseBrackets(singleMatch))[0]);
    
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

const rollDice = (diceInterface: string): number[] => {
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
    return resultArray;

  } else {
    return resultArray;
  }
}


export const rollValues = (subtableData: CombinedBodyRollType ): CombinedRollValuesType => {
  // if (typeof diceResults === "string") { return ERROR_INVALIDSUBTABLEINTERFACE }

  switch (subtableData.type) {

    case "one-roll string table":
      const orstDiceResult = rollDice(subtableData.interface);
      const orstResult = subtableData.values[orstDiceResult[0]];
      return { value: checkAndParseResult(orstResult, subtableData.rollTable) };


    case "one-roll detail table":
      const ordtDiceResult = rollDice(subtableData.interface);
      const ordtResult = subtableData.values[ordtDiceResult[0]];
      return {
        name: ordtResult.name,
        detail: checkAndParseResult(ordtResult.detail, subtableData.rollTable)
      };
    

    case "one-roll simple range-table":
      return { value: "" };


    case "two-roll range-table":
      const [trrtFirstDiceInput, trrtSecondDiceInput] = subtableData.interface.split(/\[|\]/);
      const trrtDiceResults = [rollDice(trrtFirstDiceInput)[0], rollDice(trrtSecondDiceInput)[0]];
      const trrtFirstSet = subtableData.values.find(set => isInRange(trrtDiceResults[0], set))
      const trrtFinalResult = trrtFirstSet?.values.find(set => isInRange(trrtDiceResults[1], set))
      
      if (trrtFirstSet && trrtFinalResult)  {
        return { 
          name: trrtFirstSet.categoryName,
          detail: checkAndParseResult(trrtFinalResult.value, subtableData.rollTable)
        }
      } else {
        return { value: "error: two-roll range-table in util/rollDice.ts: rollValues()" }
      }


    case "coordinate-roll detail norange-range-table":
      return { value: "" };


    case "combined string":
      const csDiceInput = subtableData.interface.split(" ");
      const csDiceResults = csDiceInput.map((input: string) => rollDice(input)[0]);
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