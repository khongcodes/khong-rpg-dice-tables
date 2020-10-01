///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                        IMPORTS

import {
  CombinedBodyRollType, CombinedRollValuesType,
  NestedNamedRangeRollValue, RangeDetailRollValue, RangeSimpleRollValue
} from "../model/DiceRollTypes";


///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                    CHECK RANGE

const isInRange = (
  number: number,
  obj: NestedNamedRangeRollValue | RangeSimpleRollValue | RangeDetailRollValue
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
  // console.log(subtableData)

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
          value: "error: one-roll simple range-table in util/rollDice.ts: rollValues():" 
        }
      }
    

    case "one-roll detail range-table":
      const ordrtDiceResults = rollDice(subtableData.interface);
      const ordrtResult = subtableData.values.find(option => isInRange(ordrtDiceResults, option));
      const ordrtRollTable = ordrtResult?.rollTable || subtableData.rollTable;
      if (ordrtResult) {
        // orsrtRollTable is allowed to be undefined
        return { 
          name: ordrtResult.name,
          detail: checkAndParseResult(ordrtResult.detail, ordrtRollTable)
        };
      }
      else {
        printError(subtableData, subtableData.type);
        return { 
          name: "",
          detail: "error: one-roll detail range-table in util/rollDice.ts: rollValues():" 
        }
      }

    case "two-roll category-detail range-range-table":
      const [trcdrrtFirstDiceInput, trcdrrtSecondDiceInput] = subtableData.interface.split(/\[|\]/);
      const trcdrrtDiceResults = [rollDice(trcdrrtFirstDiceInput), rollDice(trcdrrtSecondDiceInput)];
      const trcdrrtFirstSet = subtableData.values.find(set => isInRange(trcdrrtDiceResults[0], set))
      const trcdrrtFinalResult = trcdrrtFirstSet?.values.find(set => isInRange(trcdrrtDiceResults[1], set))
      const trcdrrtRollTable = trcdrrtFinalResult?.rollTable || subtableData.rollTable;

      if (trcdrrtFirstSet && trcdrrtFinalResult)  {
        return { 
          name: trcdrrtFirstSet.categoryName,
          detail: checkAndParseResult(trcdrrtFinalResult.value, trcdrrtRollTable)
        }
      } else {
        printError(subtableData, subtableData.type);
        return { 
          name: "",
          detail: "error: two-roll category-detail range-range-table in util/rollDice.ts: rollValues()" 
        }
      }


    case "two-roll detail norange-range-table":
      const [trdnrtFirstDiceInput, trdnrtSecondDiceInput] = subtableData.interface.split(/\[|\]/);
      const trdnrtDiceResults = [rollDice(trdnrtFirstDiceInput), rollDice(trdnrtSecondDiceInput)];
      const trdnrtResult = subtableData.values[trdnrtDiceResults[0]].find(value => isInRange(trdnrtDiceResults[1], value));
      const trdnrtRollTable = trdnrtResult?.rollTable || subtableData.rollTable;

      if (trdnrtResult) {
        return {
          name: trdnrtResult.name,
          detail: checkAndParseResult(trdnrtResult.detail, trdnrtRollTable)
        };
      } else {
        printError(subtableData, subtableData.type);
        return {
          name: "",
          detail: "error: two-roll detail norange-range-table in util/rollDice.ts: rollValues()"
        }
      }


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