import {
  LancerInputTypes,
  MothershipInputTypes,
  UvgInputTypes
} from "../model/DiceRollTypes";

const lancerItWoGen = require("./rpg-data/lancer/lancer-iterativeWorld.json");
const lancerSpaceSt = require("./rpg-data/lancer/longRim-spaceStation.json");
const lancerSpaceStNPC = require("./rpg-data/lancer/longRim-spaceStationNPC.json");
const lancerPirateB = require("./rpg-data/lancer/longRim-pirateBand.json");
const lancerEnterpr = require("./rpg-data/lancer/longRim-enterprises.json");

const mothershipTrinkets = require("./rpg-data/mothership-rpg/mothership-trinketsPatches.json");
const mothershipSpaceStationRaw = require("./rpg-data/mothership-rpg/poundFlesh-spaceStation.json");
const mothershipDerelict = require("./rpg-data/mothership-rpg/deadPlanet-derelictShip.json");

const uvgQuickHeroC = require("./rpg-data/uvg/uvg-quickHeroChar.json");
const uvgOtherVoyag = require("./rpg-data/uvg/uvg-otherVoyagers.json");
const uvgBioMagCorr = require("./rpg-data/uvg/uvg-biomagicalCorruption.json");
const uvgHistories = require("./rpg-data/uvg/uvg-histories.json");
const uvgDiscovery = require("./rpg-data/uvg/uvg-discovery.json");
const uvgHistoricP = require("./rpg-data/uvg/uvg-historicPeriodStyle.json");

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
  iterativeWorld: lancerItWoGen,
  spaceStation: lancerSpaceSt,
  spaceStationNPC: lancerSpaceStNPC,
  pirateBand: lancerPirateB,
  enterprises: lancerEnterpr
};

export const mothershipData: MothershipInputTypes = {
  trinketsPatches: mothershipTrinkets,
  spaceStationCorespace: mothershipSpaceStationCorespace,
  spaceStationRimspace: mothershipSpaceStationRimspace,
  derelictShip: mothershipDerelict
};

export const uvgData: UvgInputTypes = {
  quickHeroChar: uvgQuickHeroC,
  otherVoyagers: uvgOtherVoyag,
  biomagicalCorruption: uvgBioMagCorr,
  histories: uvgHistories,
  discovery: uvgDiscovery,
  historicPeriodStyle: uvgHistoricP
};

const rpgData = {
  lancer: lancerData,
  mothership: mothershipData,
  uvg: uvgData
};

export default rpgData;