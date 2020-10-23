///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                       PARTIALS

type RangeModifier = {
  range: string;
}
type OptionalModifier = {
  // detailPrefix?: string;
  rollTable?: string[];
}


///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                             DEFINE TABLE TYPES

export type SimpleRollValue = OptionalModifier & {
  value: string;
};

export type DetailRollValue = OptionalModifier & {
  name: string;
  detail: string;
};

// created when displaySpec.format == "mDetail ref"
export type MultiDetailRollValue = OptionalModifier & {
  name: string;
  detail: string[];
}

export type RangeSimpleRollValue = RangeModifier & SimpleRollValue;
export type RangeDetailRollValue = RangeModifier & DetailRollValue;

export type NestedNamedRangeRollValue = RangeModifier & {
  categoryName: string;
  values: RangeSimpleRollValue[];
}

export type CombinedRollValuesType = 
| SimpleRollValue
| DetailRollValue
| MultiDetailRollValue
| RangeSimpleRollValue
| RangeDetailRollValue
| NestedNamedRangeRollValue;

const rollTypes = <const> [
  "one-roll string table",
  "one-roll detail table",
  // "one-roll object table",
  "one-roll simple range-table",
  "one-roll detail range-table",
  "two-roll category-detail range-range-table",
  "two-roll detail norange-range-table",
  "combined string",
  "lookup"
]

type RollTypeBase = {
  interface: string;
  rollTable?: string[];
  complexSubtableMap?: {
    [addedSubtable: string]: CombinedBodyRollType
  };
}

type OnerollStringTableRolltype = RollTypeBase & {
  type: "one-roll string table";
  values: string[];
}

type OnerollDetailTableRolltype = RollTypeBase & {
  type: "one-roll detail table";
  values: DetailRollValue[];
}

export type OnerollSimpleRangetableRolltype = RollTypeBase & {
  type: "one-roll simple range-table";
  values: RangeSimpleRollValue[];
}

type OnerollDetailRangetableRolltype = RollTypeBase & {
  type: "one-roll detail range-table";
  values: RangeDetailRollValue[];
}

type TworollCategorydetailRangerangetableRolltype = RollTypeBase & {
  type: "two-roll category-detail range-range-table",
  values: NestedNamedRangeRollValue[];
}

type TworollDetailNorangerangetableRolltype = RollTypeBase & {
  type: "two-roll detail norange-range-table";
  values: RangeDetailRollValue[][];
}

type CombinedStringRolltype = RollTypeBase & {
  type: "combined string";
  values: string[][];
}

type Lookuptype = RollTypeBase & {
  type: "lookup";
  values: object;
}

export type CombinedBodyRollType =
| OnerollStringTableRolltype
| OnerollDetailTableRolltype
| OnerollSimpleRangetableRolltype
| OnerollDetailRangetableRolltype
| TworollCategorydetailRangerangetableRolltype
| TworollDetailNorangerangetableRolltype
| CombinedStringRolltype
| Lookuptype;



///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                               DATA INPUT TYPES

export type LancerInputTypes = {
  iterativeWorld: {
    main: {
      worldType: OnerollStringTableRolltype;
      definingNaturalFeature: OnerollDetailTableRolltype;
      definingAnthropocentricFeature: OnerollDetailTableRolltype;
      environments: OnerollDetailTableRolltype;
    }
  };
  spaceStation: {
    main: {
      stationSeed: OnerollSimpleRangetableRolltype;
      stationNameSeed: OnerollStringTableRolltype;
      districtNameSeed: OnerollStringTableRolltype;
      purposes: OnerollSimpleRangetableRolltype;
      curiosities: OnerollStringTableRolltype;
      problems: OnerollStringTableRolltype;
    }
  };
  spaceStationNPC: {
    main: {
      descriptor: OnerollStringTableRolltype;
      occupationPrimary: OnerollStringTableRolltype;
      occupationAlternateClandestine: OnerollStringTableRolltype;
      quirk: OnerollStringTableRolltype;
      motivation: CombinedStringRolltype;
    }
  };
  pirateBand: {
    main: {
      descriptor: CombinedStringRolltype;
      hustles: OnerollDetailTableRolltype;
      mainAsset: OnerollStringTableRolltype;
    }
  };
  enterprises: {
    main: {
      holdings: OnerollSimpleRangetableRolltype;
      representative: OnerollSimpleRangetableRolltype;
      strength: OnerollSimpleRangetableRolltype;
    }
  };
}


export type MothershipInputTypes = {
  trinketsPatches: {
    main: {
      d100Trinkets: OnerollStringTableRolltype;
      d100Patches: OnerollStringTableRolltype;
    };
  };
  spaceStationCorespace: {
    main: {
      name: CombinedStringRolltype;
      coreStation: OnerollStringTableRolltype;
      orbitingCelestialBody: OnerollStringTableRolltype;
      coreLeader: OnerollStringTableRolltype;
      controllingFaction: OnerollStringTableRolltype;
      crisis: OnerollDetailTableRolltype;
      goods: OnerollStringTableRolltype;
      resource: OnerollStringTableRolltype;
      commonIssue: OnerollDetailTableRolltype;
      spaceStationStructure: OnerollDetailTableRolltype;
      noteworthyEstablishments: TworollCategorydetailRangerangetableRolltype;
    }
  };
  spaceStationRimspace: {
    main: {
      rimLandmark: OnerollStringTableRolltype;
      rimStation: OnerollStringTableRolltype;
      callSign: OnerollStringTableRolltype;
      controllingFaction: OnerollStringTableRolltype;
      rivallingFaction: OnerollStringTableRolltype;
      rivalLeader: OnerollStringTableRolltype;
      crisis: OnerollDetailTableRolltype;
      goods: OnerollStringTableRolltype;
      resource: OnerollStringTableRolltype;
      commonIssue: OnerollDetailTableRolltype;
      spaceStationStructure: OnerollDetailTableRolltype;
      noteworthyEstablishments: TworollCategorydetailRangerangetableRolltype;
    }
  };
  derelictShip: {
    main: {
      shipClass: OnerollSimpleRangetableRolltype;
      shipName: CombinedStringRolltype;
      shipLifeSupportStatus: OnerollSimpleRangetableRolltype;
      shipSurvivorStatus: OnerollSimpleRangetableRolltype;
      shipEngineStatus: OnerollSimpleRangetableRolltype;
      shipSalvage1: OnerollSimpleRangetableRolltype;
      shipSalvage2: OnerollSimpleRangetableRolltype;
      causeofRuination: OnerollSimpleRangetableRolltype;
      weird: OnerollSimpleRangetableRolltype;
      jumpDriveMalfunction: OnerollSimpleRangetableRolltype;
      shipModules: TworollDetailNorangerangetableRolltype;
    };
    extended: {
      shipMapByClass: Lookuptype;
      weaponsSupplyCache: OnerollSimpleRangetableRolltype;
      cargoType: OnerollSimpleRangetableRolltype;
    };
  };
}

export type UvgInputTypes = {
  quickHeroChar: {
    main: {
      who: OnerollStringTableRolltype;
      why: OnerollStringTableRolltype;
      startingWith: OnerollStringTableRolltype;
    }
  };
  otherVoyagers: {
    main: {
      role: OnerollStringTableRolltype;
      name: CombinedStringRolltype;
      story: OnerollStringTableRolltype;
      color: OnerollStringTableRolltype;
    }
  };
  biomagicalCorruption: {
    main: {
      exposure: OnerollDetailRangetableRolltype;
      deleteriousMutations: OnerollStringTableRolltype;
      cosmeticMutations: OnerollStringTableRolltype;
      beneficialMutations: OnerollStringTableRolltype;
    }
  };
  histories: {
    main: {
      forgottenTimes: OnerollStringTableRolltype;
      dimlyRememberedStrife: OnerollStringTableRolltype;
      fabledStories: OnerollStringTableRolltype;
      oralHistoriesOfRevolution: OnerollStringTableRolltype;
    }
  };
  discovery: {
    main: {
      distance: OnerollStringTableRolltype;
      shape: OnerollStringTableRolltype;
      appearance: OnerollStringTableRolltype;
      originalFunction: OnerollStringTableRolltype;
      creator: OnerollStringTableRolltype;
      discoverer: OnerollStringTableRolltype;
      currentFunction: OnerollStringTableRolltype;
    }
  };
  historicPeriodStyle: {
    main: {
      material: OnerollStringTableRolltype;
      specialMaterial: OnerollStringTableRolltype;
      adjective: OnerollStringTableRolltype;
      movement: OnerollStringTableRolltype;
      culture: OnerollStringTableRolltype;
      period: OnerollStringTableRolltype;
    }
  };
}

export type CombinedInputDataType = 
| LancerInputTypes
| MothershipInputTypes
| UvgInputTypes;