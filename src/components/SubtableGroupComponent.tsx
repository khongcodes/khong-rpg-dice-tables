///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                          NOTES

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                        IMPORTS
// 1. React & packages
// 2. REDUX: Store types
// 3. REDUX: Selectors
// 4. REDUX: Actions
// 5. Data-reading utilities
// 6. Utilities
// 7. Components

import React, { Dispatch, useEffect } from 'react';
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { RootState, RootAction } from "../store/";
import { SubtableGroup } from "../store/subtableGroups/types";

import { selectSubtableGroupById, selectSubtableGroupDataInTableGroupData } from "../store/subtableGroups/selectors";

import {
  addBodyRollIdsSubtableGroup,
  deleteBodyRollCollectionSubtableGroup
 } from "../store/subtableGroups/actions";
 import {
  addBodyRoll,
  setBodyRoll,
  deleteBySubtableGroupBodyRoll
} from "../store/bodyRolls/actions";

import {
  CombinedBodyRollType,
  CombinedRollValuesType,
  SimpleRollValue,
  DetailRollValue
} from "../model/DiceRollTypes";
import {
  SubtableDisplaySpecMDetailFormat,
  SubtableDisplaySpecReferenceCountFormat
} from "../model/TableKeyStructuresAndFormats"

import { rollValues } from "../util/rollDice";

import BodyRollComponent from './BodyRollComponent';


///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                          SETUP

type SubtableGroupComponentMappedState = {
  showIds: boolean;
  subtableGroup?: SubtableGroup;
  subtableData?: CombinedBodyRollType;
};
type SubtableGroupComponentMappedDispatch = {
  initializeSubtableBodyRolls?: (
    initializingData: BodyRollParentData,
    bodyRollsData: InitializeSubtableDispatchBodyRollInput
  ) => void;
  
  rerollBodyRoll?: (subtableData: CombinedBodyRollType) => ( id: string ) => void;
  
  rerollBodyRollMDetailReference?: (
    subtableGroup: SubtableGroup,
    subtableData: CombinedBodyRollType,
    querySiblingSubtableInExtendedGroup: (key1: string, key2: string) => any,
    getValueForMDetailReferenceFormat: (
      subtableGroup: SubtableGroup,
      subtableData: CombinedBodyRollType,
      querySiblingSubtableInExtendedGroup: (key1: string, key2: string) => any,
    ) => {name: string, detail: string[]}
  ) => (id: string) => void;

  rerollAllBodyRolls?: (subtableData: CombinedBodyRollType, bodyRollIds: string[]) => void;
  
  rerollAllBodyRollsMDetailReference?: (inputObj: { [id: string]: {name: string, detail: string[]} }) => void;

  addBodyRoll?: (bodyRollParentInfo: BodyRollParentData, bodyRollInput: BodyRollDispatchInput) => void;

  deleteAllBodyRolls?: (subtableGroupId: string) => void;
};
type SubtableGroupComponentProps = {
  tableGroupId: string;
  subtableGroupId: string;
  querySiblingSubtableInExtendedGroup: (key1: string, key2: string) => any;
} & 
SubtableGroupComponentMappedState & 
SubtableGroupComponentMappedDispatch;

type BodyRollParentData = {
  tableGroupId: string;
  subtableGroupId: string;
}
type BodyRollDispatchInput = {
  id: string;
  value: CombinedRollValuesType;
}
type InitializeSubtableDispatchBodyRollInput = Array<BodyRollDispatchInput>

// type GetValueForMDetailReferenceFormatInputTypes = {
//   subtableGroup: SubtableGroup,
//   subtableData: CombinedBodyRollType,
//   querySiblingSubtableInExtendedGroup: (key1: string, key2: string) => any
// }


const getValueForMDetailReferenceFormat = (
  subtableGroup: SubtableGroup,
  subtableData: CombinedBodyRollType,
  querySiblingSubtableInExtendedGroup: (key1: string, key2: string) => any
) => {
  const referenceSubtableKey = (subtableGroup.displaySpec as SubtableDisplaySpecMDetailFormat).reference;
  const rolledValue = rollValues(subtableData);
  const lookupKey = rolledValue.hasOwnProperty("value") ? (rolledValue as SimpleRollValue).value : (rolledValue as DetailRollValue).detail;
  const result = querySiblingSubtableInExtendedGroup(referenceSubtableKey, lookupKey)
  const resultObjIntoStringArray = Object.keys(result).map(keyName => `${keyName}: ${result[keyName]}`);
  return {
    name: lookupKey,
    detail: resultObjIntoStringArray
  }
}

const RenderSubtableGroupStoreData = ({showIds, subtableGroupId, subtableGroup}:{
  showIds: boolean,
  subtableGroupId: string,
  subtableGroup: SubtableGroup | undefined
}) => {
  if (showIds) {
    return (
      <div>
        <p>
          subtableGroupId: {subtableGroupId}<br/>
          name: {subtableGroup?.displaySpec.name}<br/>
          displaySpec: {subtableGroup?.displaySpec.format}
        </p>
      </div>
    )

  } else {
    return (
      <div>
        <p> name: {subtableGroup?.displaySpec.name} </p>
      </div>
    )
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                             COMPONENTS & LOGIC

const SubtableGroupComponent: React.FC<SubtableGroupComponentProps> = ({
  showIds, tableGroupId, subtableGroupId, querySiblingSubtableInExtendedGroup,
  subtableGroup, subtableData,
  initializeSubtableBodyRolls, rerollBodyRoll, rerollAllBodyRolls, addBodyRoll, deleteAllBodyRolls,
  rerollBodyRollMDetailReference, rerollAllBodyRollsMDetailReference
}) => {

  // on creation of component 
  //  (on creation of new subtableGroup in redux store; 
  //    triggered by resetting the tableGroup's selectValue 
  //      (or clicking "reroll" button on tableGroup)
  //  )
  useEffect(() => {
    // initializeSubtableBodyRolls needs to be confirmed as !undefined

    if (initializeSubtableBodyRolls && (subtableGroup && subtableData)) {   
      // const { initialRollCount } = subtableGroup.displaySpec;
      const initialRollCount = subtableGroup.displaySpec.initialRollCount || 1;
      const bodyRollsData: InitializeSubtableDispatchBodyRollInput = [];
      let rollCount = initialRollCount;

      if (subtableGroup.displaySpec.format === "mDetail ref") {
        const valueWithReferencedDetails = getValueForMDetailReferenceFormat(subtableGroup, subtableData, querySiblingSubtableInExtendedGroup);
        
        for (let i = 0; i < rollCount; i++) {
          bodyRollsData.push({
            id: uuidv4(),
            value: valueWithReferencedDetails
          })
        }

      } else {
        for (let i = 0; i < rollCount; i++) {
          bodyRollsData.push({
            id: uuidv4(),
            value: rollValues(subtableData)
          })
        }
      }
      initializeSubtableBodyRolls({ tableGroupId, subtableGroupId }, bodyRollsData);
    }
  }, [!!subtableGroup])

  const handleRerollAllBodyRolls = () => {
    if (rerollAllBodyRolls && subtableGroup && subtableData) {
      if (subtableGroup.displaySpec.format === "mDetail ref" && !!rerollAllBodyRollsMDetailReference) {
        const inputObj: { [key: string]: {name: string, detail: string[]} } = {};
        for (let i = 0; i < subtableGroup.bodyRollCollection.length; i++) {
          inputObj[subtableGroup.bodyRollCollection[i]] = getValueForMDetailReferenceFormat(subtableGroup, subtableData, querySiblingSubtableInExtendedGroup)
        }
        rerollAllBodyRollsMDetailReference(inputObj);

      } else {
        rerollAllBodyRolls(subtableData, subtableGroup.bodyRollCollection);
      }
    }
  };

  const handleAddBodyRoll = () => {
    if (addBodyRoll && subtableData && subtableGroup ) { 

      if (subtableGroup.displaySpec.format === "mDetail ref") {
        addBodyRoll({ tableGroupId, subtableGroupId }, {
          id: uuidv4(),
          value: getValueForMDetailReferenceFormat(subtableGroup, subtableData, querySiblingSubtableInExtendedGroup)
        });

      } else {
        addBodyRoll({ tableGroupId, subtableGroupId }, {
          id: uuidv4(),
          value: rollValues(subtableData)
        });
      }
    }
  };

  const handleDeleteAllBodyRolls = () => { 
    if (deleteAllBodyRolls) { deleteAllBodyRolls(subtableGroupId as string); }
  }

  return (
    <div>
      <RenderSubtableGroupStoreData 
        showIds = {showIds}
        subtableGroupId = {subtableGroupId}
        subtableGroup = {subtableGroup}
      />

      <button onClick={handleDeleteAllBodyRolls}>
        delete all
      </button>
      <button onClick={handleRerollAllBodyRolls}>
        reroll all
      </button>
      <button onClick={handleAddBodyRoll}>
        add bodyroll
      </button>

      {
        !!subtableGroup && (rerollBodyRoll && subtableData && rerollBodyRollMDetailReference) ? subtableGroup.bodyRollCollection.map(bodyRollId => (
          <BodyRollComponent
            showIds={showIds}
            bodyRollId={bodyRollId}
            rerollFn={rerollBodyRoll(subtableData)}
            rerollBodyRollMDetailRef={rerollBodyRollMDetailReference(subtableGroup, subtableData, querySiblingSubtableInExtendedGroup, getValueForMDetailReferenceFormat)}
            key={bodyRollId}
          />
        ))
        : <></>
      }

    </div>
  );
}

const mapStateToProps = (state: RootState, ownProps: SubtableGroupComponentProps) => {
  const { subtableGroupId } = ownProps;
  return {
    subtableGroup: selectSubtableGroupById(state, subtableGroupId),
    subtableData: selectSubtableGroupDataInTableGroupData(state, subtableGroupId)
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  initializeSubtableBodyRolls: (
    bodyRollParentInfo: BodyRollParentData,
    bodyRollsData: InitializeSubtableDispatchBodyRollInput
  ) => {
    const { tableGroupId, subtableGroupId } = bodyRollParentInfo;
    for (let i = 0; i < bodyRollsData.length; i++) {
      dispatch(addBodyRoll(
        tableGroupId, 
        subtableGroupId, 
        bodyRollsData[i] as {
          id: string, 
          value: CombinedRollValuesType
        }
      ));
    }
    // update subtableGroup bodyRollCollection
    const validBodyRollIds: string[] = bodyRollsData.filter(a => typeof a.value !== "string").map(a => a.id);
    dispatch(addBodyRollIdsSubtableGroup(subtableGroupId, validBodyRollIds));
  },

  // function composition: DON'T have to pass subtableData directly to child BodyRoll component
  rerollBodyRoll: (subtableData: CombinedBodyRollType) => (id: string) => { dispatch(setBodyRoll(id, rollValues(subtableData))); },

  rerollBodyRollMDetailReference: (
    subtableGroup: SubtableGroup,
    subtableData: CombinedBodyRollType,
    querySiblingSubtableInExtendedGroup: (key1: string, key2: string) => any,
    getValueForMDetailReferenceFormat: (
      subtableGroup: SubtableGroup,
      subtableData: CombinedBodyRollType,
      querySiblingSubtableInExtendedGroup: (key1: string, key2: string) => any,
    ) => {name: string, detail: string[]}
  ) => (id: string) => {
    const value = getValueForMDetailReferenceFormat(subtableGroup, subtableData, querySiblingSubtableInExtendedGroup)
    dispatch(setBodyRoll(id, value))
  },

  rerollAllBodyRolls: (
    subtableData: CombinedBodyRollType,
    bodyRollIds: string[]
  ) => {
    for (let i = 0; i < bodyRollIds.length; i++) { dispatch(setBodyRoll(bodyRollIds[i], rollValues(subtableData))) }
  },

  rerollAllBodyRollsMDetailReference: (inputObj: { [id: string]: {name: string, detail: string[]} }) => {
    const ids = Object.keys(inputObj);
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      dispatch( setBodyRoll(id, inputObj[id]) );
    }
  },

  addBodyRoll: (
    bodyRollParentInfo: BodyRollParentData,
    bodyRollInput: BodyRollDispatchInput
  ) => {
    const { tableGroupId, subtableGroupId } = bodyRollParentInfo;
    dispatch(addBodyRoll( tableGroupId, subtableGroupId, bodyRollInput ));
    dispatch(addBodyRollIdsSubtableGroup( subtableGroupId, [bodyRollInput.id]));
  },

  deleteAllBodyRolls: (subtableGroupId: string) => {
    dispatch(deleteBySubtableGroupBodyRoll(subtableGroupId));
    dispatch(deleteBodyRollCollectionSubtableGroup(subtableGroupId));
  },

})

export default connect(mapStateToProps, mapDispatchToProps)(SubtableGroupComponent);