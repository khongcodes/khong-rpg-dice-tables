import {
  LancerInputTypes,
  MothershipInputTypes
} from "../model/DiceRollTypes";

const lancerItWoGen = require("./rpg-data/lancer/lancer-iterativeWorld.json");

const mothershipTrinkets = require("./rpg-data/mothership-rpg/mothership-trinketsPatches.json");
const mothershipSpaceStationRaw = require("./rpg-data/mothership-rpg/poundFlesh-spaceStation.json");

const combineCommonSubtables = (tableJson: any): object => {
  const tableKeys = Object.keys(tableJson.main).filter(tableName => tableName !== "common")
  const commonSubtableKeys = Object.keys(tableJson.main.common);

  const returnObj: {[key: string]: any} = {};
  const tables = tableKeys.map(tableKey => {
    const subtableKeys = Object.keys(tableJson.main[tableKey])
    const returnTable: {"main": {[key: string]: any}} = {main: {}};
    for (let i = 0; i < subtableKeys.length; i++) {
      returnTable.main[subtableKeys[i]] = tableJson.main[tableKey][subtableKeys[i]];
    }
    for (let i = 0; i < commonSubtableKeys.length; i++) {
      returnTable.main[commonSubtableKeys[i]] = tableJson.main.common[commonSubtableKeys[i]];
    }
    returnObj[tableKey] = returnTable;
    return returnTable;
  })
  return returnObj;
}

const processedMothershipSpaceStation = combineCommonSubtables(mothershipSpaceStationRaw) as {[key: string]: any};
const mothershipSpaceStationCorespace = processedMothershipSpaceStation.corespace;
const mothershipSpaceStationRimspace = processedMothershipSpaceStation.rimspace;

export const lancerData: LancerInputTypes = {
  iterativeWorld: lancerItWoGen
}

// WHEN INPUTTING DATA FOR SPACE STATIONS
// CONSTRUCT NEW DATA OBJECTS FOR RIMSPACE AND CORESPACE STATIONS
// combining common fields

export const mothershipData: MothershipInputTypes = {
  trinketsPatches: mothershipTrinkets,
  spaceStationCorespace: mothershipSpaceStationCorespace,
  spaceStationRimspace: mothershipSpaceStationRimspace
} as MothershipInputTypes

const rpgData = {
  lancer: lancerData,
  mothership: mothershipData
};

export default rpgData;