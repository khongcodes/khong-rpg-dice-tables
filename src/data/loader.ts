import {
  LancerInputTypes,
  MothershipInputTypes
} from "../model/DataIn";

const lancerItWoGen = require("./rpg-data/lancer/lancer-iterativeWorld.json");

const mothershipTrinkets = require("./rpg-data/mothership-rpg/mothership-trinketsPatches.json");

export const lancerData: LancerInputTypes = {
  iterativeWorld: lancerItWoGen
}

// export const mothershipData: MothershipInputTypes = {
export const mothershipData = {
  trinketsPatches: mothershipTrinkets
}

const rpgData = {
  lancer: lancerData,
  mothership: mothershipData
};

export default rpgData;