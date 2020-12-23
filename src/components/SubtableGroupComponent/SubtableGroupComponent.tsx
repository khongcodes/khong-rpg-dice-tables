///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                          NOTES
// This is a wrapper component - handles connection and dispatches to the store for
// the SubtableGroup object.
// UI Content can be found at ./SubtableGroupContent.tsx

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

import { RootState, RootAction } from "../../store";
import { SubtableGroup } from "../../store/subtableGroups/types";

import {
  selectSubtableGroupById,
  selectSubtableGroupDataInTableGroupData
} from "../../store/subtableGroups/selectors";

import {
  addBodyRollIdsSubtableGroup,
  markInitializedSubtableGroup,
  deleteBodyRollCollectionSubtableGroup
 } from "../../store/subtableGroups/actions";
 import {
  addBodyRoll,
  setBodyRoll,
  deleteBySubtableGroupBodyRoll
} from "../../store/bodyRolls/actions";

import { SubtableDisplaySpecMDetailFormat } from "../../model/TableKeyStructuresAndFormats";
import {
  CombinedBodyRollType,
  CombinedRollValuesType,
  SimpleRollValue,
  DetailRollValue
} from "../../model/DiceRollTypes";

import { rollValues } from "../../util/rollDice";
import { BookThemeType } from "../../util/BookThemeContext";

import SubtableGroupContent from "./SubtableGroupContent";


///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                          SETUP

export type RerollBodyRollMDetailReferenceType = (
  subtableGroup: SubtableGroup,
  subtableData: CombinedBodyRollType,
  querySiblingSubtableInExtendedGroup: (key1: string, key2: string) => any,
  getValueForMDetailReferenceFormat: (
    subtableGroup: SubtableGroup,
    subtableData: CombinedBodyRollType,
    querySiblingSubtableInExtendedGroup: (key1: string, key2: string) => any,
  ) => {name: string, detail: string[]}
) => (id: string) => void;

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
  rerollBodyRollMDetailReference?: RerollBodyRollMDetailReferenceType;
  rerollAllBodyRolls?: (subtableData: CombinedBodyRollType, bodyRollIds: string[]) => void;
  rerollAllBodyRollsMDetailReference?: (inputObj: { [id: string]: {name: string, detail: string[]} }) => void;
  addBodyRoll?: (bodyRollParentInfo: BodyRollParentData, bodyRollInput: BodyRollDispatchInput) => void;
  deleteAllBodyRolls?: (subtableGroupId: string) => void;
};
type SubtableGroupComponentProps = {
  tableGroupId: string;
  subtableGroupId: string;
  querySiblingSubtableInExtendedGroup: (key1: string, key2: string) => any;
  bookTheme: BookThemeType;
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


///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                             COMPONENTS & LOGIC

const SubtableGroupComponent: React.FC<SubtableGroupComponentProps> = ({
  showIds, tableGroupId, subtableGroupId, querySiblingSubtableInExtendedGroup,
  subtableGroup, subtableData, bookTheme,
  initializeSubtableBodyRolls, rerollBodyRoll, rerollAllBodyRolls, addBodyRoll, deleteAllBodyRolls,
  rerollBodyRollMDetailReference, rerollAllBodyRollsMDetailReference
}) => {

  // on creation of component 
  //  (on creation of new subtableGroup in redux store; 
  //    triggered by resetting the tableGroup's selectValue 
  //      (or clicking "reroll" button on tableGroup)
  //  )

  const subtableGroupHasNoBodyRolls: boolean = subtableGroup?.bodyRollCollection.length === 0;
  const subtableGroupIsMeantToStartNoBodyRolls: boolean = subtableGroup?.displaySpec.initialRollCount !== 0;
  const subtableGroupAlreadyInitialized: boolean = !!subtableGroup?.initalized;

  useEffect(() => {
    if ((initializeSubtableBodyRolls && subtableGroup && subtableData) && (subtableGroupHasNoBodyRolls && subtableGroupIsMeantToStartNoBodyRolls && !subtableGroupAlreadyInitialized)) {
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
  }, [
    subtableGroup,
    initializeSubtableBodyRolls,
    subtableGroupAlreadyInitialized,
    querySiblingSubtableInExtendedGroup,
    subtableData,
    subtableGroupId,
    tableGroupId,
    subtableGroupHasNoBodyRolls,
    subtableGroupIsMeantToStartNoBodyRolls
  ])

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


  if ((!!subtableGroup && !!subtableData) && (!!rerollBodyRoll && !!rerollBodyRollMDetailReference)) {
    return (
      <SubtableGroupContent 
        showIds={showIds}
        subtableGroup={subtableGroup}
        subtableData={subtableData}
        sgComponentData={{id: subtableGroupId}}
        callbacks={{
          handleDeleteAllBodyRolls, handleRerollAllBodyRolls, handleAddBodyRoll,
          rerollBodyRoll, rerollBodyRollMDetailReference,
          querySiblingSubtableInExtendedGroup,
          getValueForMDetailReferenceFormat
        }}
        bookTheme={bookTheme}
      />  
    )
  } else {
    return (<></>);
  }
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
    dispatch(markInitializedSubtableGroup(subtableGroupId));
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