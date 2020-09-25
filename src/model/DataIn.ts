/////////////////////////////////////////////////////////////////////////////////
////////                                                                 PARTIALS

type RangeModifier = {
  range: string;
}
type OptionalModifier = {
  detailPrefix?: string;
  rollTable?: string[];
}


/////////////////////////////////////////////////////////////////////////////////
////////                                                       DEFINE TABLE TYPES

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

export type CombinedRollValuesType = 
| SimpleRollValue
| DetailRollValue
| RangeSimpleRollValue
| RangeDetailRollValue
| NestedNamedRangeRollValue;

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

type Lookuptype = RollTypeBase & {
  type: "lookup";
  values: object;
}

export type CombinedBodyRollType =
| OnerollStringTableRolltype
| OnerollDetailTableRolltype
| OnerollSimpleRangetableRolltype
| TworollRangetableRolltype
| CoordinaterollDetailNorangerangetableRolltype
| CombinedStringRolltype
| Lookuptype;



/////////////////////////////////////////////////////////////////////////////////
////////                                                         DATA INPUT TYPES

export type LancerInputTypes = {
  iterativeWorld: {
    main: {
      worldType: OnerollStringTableRolltype;
      definingNaturalFeature: OnerollDetailTableRolltype;
      definingAnthropocentricFeature: OnerollDetailTableRolltype;
      environments: OnerollDetailTableRolltype;
    }
  }
}


export type MothershipInputTypes = {
  trinketsPatches: {
    main: {
      d100Trinkets: OnerollStringTableRolltype;
      d100Patches: OnerollStringTableRolltype;
    };
  };
  /*
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
  */

  
}

export type CombinedInputDataType = 
| LancerInputTypes
| MothershipInputTypes