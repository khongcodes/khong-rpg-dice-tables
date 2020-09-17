import {
  LancerInputTypes,
  MothershipInputTypes
} from "../model/DataIn";

const lancerItWoGen = require("./rpg-data/lancer/lancer-iterativeWorld.json");

const mothershipTrinkets = require("./rpg-data/mothership-rpg/mothership-trinketsPatches.json");

export const lancerData: LancerInputTypes = {
  iterativeWorld: lancerItWoGen
}

// WHEN INPUTTING DATA FOR SPACE STATIONS
// CONSTRUCT NEW DATA OBJECTS FOR RIMSPACE AND CORESPACE STATIONS
// combining common fields

export const mothershipData: MothershipInputTypes = {
  trinketsPatches: mothershipTrinkets
}

const rpgData = {
  lancer: lancerData,
  mothership: mothershipData
};

export default rpgData;