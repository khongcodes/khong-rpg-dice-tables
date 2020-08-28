// PARTIALS
/////////////////////////////////////////////////

type RangeModifier = {
  range: string;
}
type OptionalModifier = {
  detailPrefix?: string;
  rollTable?: string[];
}

//////////////////////////////////////////////////

type SimpleRollValue = OptionalModifier & {
  value: string;
};

type DetailRollValue = OptionalModifier & {
  name: string;
  detail: string;
};

type RangeSimpleRollValue = RangeModifier & SimpleRollValue;
type RangeDetailRollValue = RangeModifier & DetailRollValue;

type NestedNamedRangeRollValue = RangeModifier & {
  categoryName: string;
  values: RangeSimpleRollValue[];
}


const rollTypes = <const> [
  "one-roll string table",
  "one-roll detail table",
  "one-roll simple range-table",
  "two-roll range-table",
  "coordinate-roll detail norange-range-table",
  "combined string",
  "lookup"
]

type RollTypeBase = {
  interface: string;
  rollTable?: string[];
}

type OnerollStringTableRolltype = RollTypeBase & {
  type: "one-roll string table";
  values: string[];
}

type OnerollDetailTableRolltype = RollTypeBase & {
  type: "one-roll detail table";
  values: DetailRollValue[];
}

type OnerollSimpleRangetableRolltype = RollTypeBase & {
  type: "one-roll simple range-table";
  values: RangeSimpleRollValue[];
}

type TworollRangetableRolltype = RollTypeBase & {
  type: "two-roll range-table";
  values: NestedNamedRangeRollValue[];
}

type CoordinaterollDetailNorangerangetableRolltype = RollTypeBase & {
  type: "coordinate-roll detail norange-range-table";
  values: RangeDetailRollValue[][];
}

type CombinedStringRolltype = RollTypeBase & {
  type: "combined string";
  values: string[][];
}

type Lookuptype = {
  type: "lookup";
  values: object;
}



const tableNames = <const> [
  "lancer-iterativeWorld",
  "mothership-trinketsPatches",
  "mothership-spaceStationCorespace",
  "mothership-spaceStationRimspace",
  "mothership-derelictShip"
];

// roll object itself has optional rollTable value (see poundFlesh-spaceStation - callsign)

// lancer traits {}
// trait type (complex, simple)
// trait name

// type of combined mothershipRPG datasets

type MothershipInputTypes = {
  trinketsPatches: {
    main: {
      d100Trinkets: OnerollStringTableRolltype;
      d100Patches: OnerollStringTableRolltype;
    };
  };
  spaceStation: {
    main: {
      corespace: {
        name: CombinedStringRolltype;
        coreStation: OnerollStringTableRolltype;
        orbitingCelestialBody: OnerollStringTableRolltype;
        coreLeader: OnerollStringTableRolltype;
        controllingFaction: OnerollStringTableRolltype;
      };
      rimspace: {
        rimLandmark: OnerollStringTableRolltype;
        rimStation: OnerollStringTableRolltype;
        callSign: OnerollStringTableRolltype;
        controllingFaction: OnerollStringTableRolltype;
        rivallingFaction: OnerollStringTableRolltype;
        rivalLeader: OnerollStringTableRolltype;
      };
      common: {
        crisis: OnerollDetailTableRolltype;
        goods: OnerollStringTableRolltype;
        resource: OnerollStringTableRolltype;
        commonIssue: OnerollDetailTableRolltype;
        spaceStationStructure: OnerollDetailTableRolltype;
        noteworthyEstablishments: TworollRangetableRolltype;
      };
    }
  };
  derelictShip: {
    main: {
      shipClass: OnerollSimpleRangetableRolltype;
      shipLifeSupportStatus: OnerollSimpleRangetableRolltype;
      shipSurvivorStatus: OnerollSimpleRangetableRolltype;
      shipEngineStatus: OnerollSimpleRangetableRolltype;
      shipSalvage1: OnerollSimpleRangetableRolltype;
      shipSalvage2: OnerollSimpleRangetableRolltype;
      causeofRuination: OnerollSimpleRangetableRolltype;
      weird: OnerollSimpleRangetableRolltype;
    };
    extended: {
      shipName: CombinedStringRolltype;
      shipModules: CoordinaterollDetailNorangerangetableRolltype;
      shipMapByClass: Lookuptype;
      jumpDriveMalfunction: OnerollSimpleRangetableRolltype;
      weaponsSupplyCache: OnerollSimpleRangetableRolltype;
      cargoType: OnerollSimpleRangetableRolltype;
    };
  };

  
}

const formats = [
  "simple",
  "detail",
  "... ref-propName",
  "reference"
]

const mothershipOutputSpecs = <const> {
  trinketsPatches: {
    selectedValue: "mothership-trinketsPatches",
    stringName: "Mothership RPG - D100 Trinkets and Patches",
    d100Trinkets: {
      name: "D100 Trinkets",
      format: "simple"
    },
    d100Patches: {
      name: "D100 Patches",
      format: "simple"
    }
  },

  // needs special handling for the dual nature of this data
  spaceStation: {
    selectedValue: ["mothership-spaceStationCorespace", "mothership-spaceStationRimspace"],
    stringName: ["Mothership RPG/Pound of Flesh - Space Station (Corespace)", "Mothership RPG/Pound of Flesh - Space Station (Rimspace)"],
    corespace: {
      name: {
        name: "Name",
        format: "simple"
      },
      coreStation: {
        name: "Station Type",
        format: "simple"
      },
      orbitingCelestialBody: {
        name: "Orbiting Celestial Body",
        format: "simple"
      },
      coreLeader: {
        name: "Core Leader",
        format: "simple"
      },
      controllingFaction: {
        name: "Controlling Faction",
        format: "simple"
      }
    },
    rimspace: {
      rimLandmark: {
        name: "Landmark on the Rim",
        format: "simple"
      },
      rimStation: {
        name: "Station Type",
        format: "simple"
      },
      callSign: {
        name: "Callsign",
        format: "simple"
      },
      controllingFaction: {
        name: "Controlling Faction",
        format: "simple"
      },
      rivallingFaction: {
        name: "Rivalling Faction",
        format: "simple"
      },
      rivalLeader: {
        name: "Rival Faction's Leader",
        format: "simple"
      }
    },
    common: {
      crisis: {
        name: "Crisis",
        format: "detail"
      },
      goods: {
        name: "Available Goods",
        format: "simple"
      },
      resource: {
        name: "Scarce Resource",
        format: "simple"
      },
      commonIssue: {
        name: "Common Issue",
        format: "detail"
      },
      spaceStationStructure: {
        name: "Structure",
        format: "detail"
      },
      noteworthyEstablishments: {
        name: "Noteworthy Establishments",
        format: "detail"
      }
    }
  },
  derelictShip: {
    selectedValue: "mothership-derelictShip",
    stringName: "Mothership RPG/Dead Planet - Derelict Ship",
    shipClass: {
      name: "Ship Class",
      format: "detail ref-shipMapByClass"
    },
    shipLifeSupportStatus: {
      name: "Life Support Status",
      format: "simple"
    },
    shipSurvivorStatus: {
      name: "Survivor Status",
      format: "simple"
    },
    shipEngineStatus: {
      name: "Engine Status",
      format: "simple"
    },
    shipSalvage1: {
      name: "Salvage A",
      format: "simple"
    },
    shipSalvage2: {
      name: "Salvage B",
      format: "simple"
    },
    causeOfRuination: {
      name: "Cause of Ruination",
      format: "simple"
    },
    weird: {
      name: "Something Weird",
      format: "simple"
    },
    shipName: {
      name: "Ship Name",
      format: "simple"
    },
    shipModules: {
      name: "Ship Modules",
      format: "detail"
    },
    shipMapByClass: {
      name: "Ship Map",
      format: "reference"
    },
    jumpDriveMalfunction: {
      name: "Jump Drive Malfunction",
      format: "simple"
    },
    weaponsSupplyCache: {
      name: "Weapons Supply Cache",
      format: "reference"
    },
    cargoType: {
      name: "Cargo Type",
      format: "reference"
    }
  }
}

type LancerInputTypes = {
  iterativeWorld: {
    worldType: OnerollStringTableRolltype;
    definingNaturalFeature: OnerollDetailTableRolltype;
    definingAnthropocentricFeature: OnerollDetailTableRolltype;
    environments: OnerollDetailTableRolltype;
  }
}

const lancerOutputSpecs = <const> {
  iterativeWorld: {
    selectValue: "lancer-iterativeWorld",
    stringName: "LANCER - Iterative World Generation",
    worldType: {
      name: "World Type",
      format: "simple"
    },
    definingNaturalFeature: {
      name: "Defining Natural Feature",
      format: "detail"
    },
    definingAnthropocentricFeature: {
      name: "Defining Anthropocentric Feature",
      format: "detail"
    },
    environments: {
      name: "Environmental Factors",
      format: "detail"
    }
  }
}

export type LancerIterativeWorld = { rollType: "test"; } & {
  // [key in (typeof lancerTypes.iterativeWorld[number])]: string;
};

export type Roll = {
  rollType: typeof rollTypes[number];
}