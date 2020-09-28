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

import { CombinedBodyRollType, CombinedRollValuesType } from "../model/DataIn";

import { rollValues, 
  // SubtableError,
  // ERROR_INVALIDSUBTABLEINTERFACE as subtableError1,
  // ERROR_INVALIDSUBTABLETYPE as subtableError2
} from "../util/rollDice";

import BodyRollComponent from './BodyRollComponent';

type SubtableGroupComponentMappedState = {
  subtableGroup?: SubtableGroup;
  subtableData?: CombinedBodyRollType;
};

type SubtableGroupComponentMappedDispatch = {
  initializeSubtableBodyRolls?: (
    initializingData: BodyRollParentData,
    bodyRollsData: InitializeSubtableDispatchBodyRollInput
  ) => void;
  rerollBodyRoll?: (subtableData: CombinedBodyRollType) => ( id: string ) => void;
  rerollAllBodyRolls?: (subtableData: CombinedBodyRollType, bodyRollIds: string[]) => void;
  addBodyRoll?: ( bodyRollParentInfo: BodyRollParentData, bodyRollInput: BodyRollDispatchInput ) => void;
  deleteAllBodyRolls?: (subtableGroupId: string) => void;
};

type SubtableGroupComponentProps = {
  tableGroupId: string;
  subtableGroupId: string;
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


const SubtableGroupComponent: React.FC<SubtableGroupComponentProps> = ({
  tableGroupId, subtableGroupId, 
  subtableGroup, subtableData,
  initializeSubtableBodyRolls, rerollBodyRoll, rerollAllBodyRolls, addBodyRoll, deleteAllBodyRolls
}) => {

  // on creation of component 
  //  (on creation of new subtableGroup in redux store; 
  //    triggered by resetting the tableGroup's selectValue 
  //      (or clicking "reroll" button on tableGroup)
  //  )
  useEffect(() => {
    // initializeSubtableBodyRolls needs to be confirmed as !undefined
    if (initializeSubtableBodyRolls && subtableGroup && subtableData) {   
      const { initialRollCount } = subtableGroup.displaySpec;
      const initializingData: BodyRollParentData = { tableGroupId, subtableGroupId };
      const bodyRollsData: InitializeSubtableDispatchBodyRollInput = [];
      if (typeof initialRollCount !== "number") {
        // EXAMPLE: if format says something unexpected like "reference different table"
      } else {
        for (let i = 0; i < initialRollCount; i++) {
          bodyRollsData.push({
            id: uuidv4(),
            value: rollValues(subtableData)
          })
        }
      }
      initializeSubtableBodyRolls(initializingData, bodyRollsData);
    }
  }, [!!subtableGroup])

  const handleRerollAllBodyRolls = () => {
    if (rerollAllBodyRolls && subtableGroup && subtableData) { rerollAllBodyRolls(subtableData, subtableGroup.bodyRollCollection); }
  };

  const handleAddBodyRoll = () => {
    if (addBodyRoll && subtableData && subtableGroup ) { 
      addBodyRoll({ tableGroupId, subtableGroupId }, {
        id: uuidv4(),
        value: rollValues(subtableData)
      });
    }
  };

  const handleDeleteAllBodyRolls = () => { 
    if (deleteAllBodyRolls) { deleteAllBodyRolls(subtableGroupId); }
  }



  return (
    <div>
      <p>
        subtableGroupId: {subtableGroupId}<br/>
        name: {subtableGroup?.displaySpec.name}<br/>
        displaySpec: {subtableGroup?.displaySpec.format}
      </p>

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
        !!subtableGroup && (rerollBodyRoll && subtableData) ? subtableGroup.bodyRollCollection.map(bodyRollId => (
          <BodyRollComponent
            bodyRollId={bodyRollId}
            rerollFn={rerollBodyRoll(subtableData)}
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

  rerollAllBodyRolls: (
    subtableData: CombinedBodyRollType,
    bodyRollIds: string[]
  ) => {
    for (let i = 0; i < bodyRollIds.length; i++) { dispatch(setBodyRoll(bodyRollIds[i], rollValues(subtableData))) }
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
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SubtableGroupComponent);