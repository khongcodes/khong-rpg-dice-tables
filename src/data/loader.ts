import {
  LancerInputTypes,
  MothershipInputTypes,
  UvgInputTypes
} from "../model/DiceRollTypes";

import complexSubtableRollTableMapConfig from "../controlPanel/complexSubtableRollTableMapConfig.json";

type ComplexSubtableRollTableMapConfigType = {
  [tableGroupName: string]: {
    [subtableGroupName: string]: string[];
  };
}

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
const uvgToolOrKit = require("./rpg-data/uvg/uvg-toolOrKit.json");
const uvgSoapSized = require("./rpg-data/uvg/uvg-soapSizedTreasures.json");
const uvgTradeGood = require("./rpg-data/uvg/uvg-tradeGoods.json");
const uvgHistories = require("./rpg-data/uvg/uvg-histories.json");
const uvgDiscovery = require("./rpg-data/uvg/uvg-discovery.json");
const uvgHistoricP = require("./rpg-data/uvg/uvg-historicPeriodStyle.json");
const uvgGeography = require("./rpg-data/uvg/uvg-geographyAndNaturalScenery.json");
const uvgWeatherAn = require("./rpg-data/uvg/uvg-weatherAndClimate.json");

const combineCommonSubtables = (tableJson: any): object => {
  const tableKeys = Object.keys(tableJson.main).filter(tableName => tableName !== "common")
  const commonSubtableKeys = Object.keys(tableJson.main.common);

  const returnObj: {[key: string]: any} = {};
  
  for (const tableKey of tableKeys) {
    const subtableKeys = Object.keys(tableJson.main[tableKey]);
    const returnTable: {"main": {[key: string]: any}} = {main: {}};
    
    for (let i = 0; i < subtableKeys.length; i++) {
      returnTable.main[subtableKeys[i]] = tableJson.main[tableKey][subtableKeys[i]];
    }
    for (let i = 0; i < commonSubtableKeys.length; i++) {
      returnTable.main[commonSubtableKeys[i]] = tableJson.main.common[commonSubtableKeys[i]];
    }
    returnObj[tableKey] = returnTable;
  };
  
  return returnObj;
}

const processedMothershipSpaceStation = combineCommonSubtables(mothershipSpaceStationRaw) as {[key: string]: any};
const mothershipSpaceStationCorespace = processedMothershipSpaceStation.corespace;
const mothershipSpaceStationRimspace = processedMothershipSpaceStation.rimspace;


const addComplexSubtableRollTableMap = (tableJson: any, tableGroupName: string): object => {
  const referencedTableGroup = (complexSubtableRollTableMapConfig as ComplexSubtableRollTableMapConfigType)[tableGroupName]
  const subtableGroupsToAddTo = Object.keys(referencedTableGroup);
  
  for (let i = 0; i < subtableGroupsToAddTo.length; i++) {
    const namesOfAddedSubtableRolls = referencedTableGroup[subtableGroupsToAddTo[i]];
    const complexSubtableMap = {};

    for (let addedRollInd = 0; addedRollInd < namesOfAddedSubtableRolls.length; addedRollInd++) {
      Object.assign(complexSubtableMap, {
        [namesOfAddedSubtableRolls[addedRollInd]]: tableJson.extended[namesOfAddedSubtableRolls[addedRollInd]]
      });
    }
    Object.assign(tableJson.main[subtableGroupsToAddTo[i]], { complexSubtableMap })
  }
  return tableJson;
};

const processedMothershipDerelict = addComplexSubtableRollTableMap(mothershipDerelict, "derelictShip") as any;


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
  derelictShip: processedMothershipDerelict
};

export const uvgData: UvgInputTypes = {
  quickHeroChar: uvgQuickHeroC,
  otherVoyagers: uvgOtherVoyag,
  biomagicalCorruption: uvgBioMagCorr,
  toolOrKit: uvgToolOrKit,
  soapSizedTreasures: uvgSoapSized,
  tradeGoods: uvgTradeGood,
  histories: uvgHistories,
  discovery: uvgDiscovery,
  historicPeriodStyle: uvgHistoricP,
  geographyAndNaturalScenery: uvgGeography,
  weatherAndClimate: uvgWeatherAn
};

const rpgData = {
  lancer: lancerData,
  mothership: mothershipData,
  uvg: uvgData
};

export default rpgData;