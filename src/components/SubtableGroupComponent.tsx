import React, { Dispatch, useEffect } from 'react';
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { RootState, RootAction } from "../store/";
import { SubtableGroup } from "../store/subtableGroups/types";

import { selectSubtableGroupById, selectSubtableGroupDataInTableGroupData } from "../store/subtableGroups/selectors";
import { addBodyRollIdsSubtableGroup } from "../store/subtableGroups/actions";
import { addBodyRoll, errorWithBodyRoll } from "../store/bodyRolls/actions";
// import { AllBodyRollNames } from '../model/DataOut';
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
    initializingData: InitializeSubtableDispatchDataInput,
    bodyRollData: InitializeSubtableDispatchBodyRollInput
  ) => void;
};

type SubtableGroupComponentProps = {
  tableGroupId: string;
  subtableGroupId: string;
} & 
SubtableGroupComponentMappedState & 
SubtableGroupComponentMappedDispatch;

type InitializeSubtableDispatchDataInput = {
  tableGroupId: string;
  subtableGroupId: string;
}

type BodyRollDispatchInput = {
  id: string;
  value: CombinedRollValuesType | string;
}

type InitializeSubtableDispatchBodyRollInput = Array<BodyRollDispatchInput>


const SubtableGroupComponent: React.FC<SubtableGroupComponentProps> = ({
  tableGroupId, subtableGroupId, 
  subtableGroup, subtableData,
  initializeSubtableBodyRolls
}) => {

  // on creation of component 
  //  (on creation of new subtableGroup in redux store; 
  //    triggered by resetting the tableGroup's selectValue 
  //      (or clicking "reroll" button on tableGroup)
  //  )
  useEffect(() => {
    // initializeSubtableBodyRolls needs to be confirmed as !undefined
    if (initializeSubtableBodyRolls && subtableGroup && subtableData) {
      
      console.log(rollValues(subtableData));
      const { initialRollCount } = subtableGroup.displaySpec;
      const initializingData: InitializeSubtableDispatchDataInput = { tableGroupId, subtableGroupId };
      const bodyRollData: InitializeSubtableDispatchBodyRollInput = [];
      if (typeof initialRollCount !== "number") {
        // example "reference different table"
      } else {
        for (let i = 0; i < initialRollCount; i++) {
          bodyRollData.push({
            id: uuidv4(),
            value: rollValues(subtableData)
          })
        }
      }
      initializeSubtableBodyRolls(initializingData, bodyRollData);
    }
  }, [!!subtableGroup])

  return (
    <div>
      <p>
        subtableGroupId: {subtableGroupId}<br/>
        name: {subtableGroup?.displaySpec.name}<br/>
        displaySpec: {subtableGroup?.displaySpec.format}
      </p>

      <button disabled>delete all</button>
      <button disabled>reroll all</button>
      <button disabled>add bodyroll</button>

      {
        !!subtableGroup ? subtableGroup.bodyRollCollection.map(bodyRollId => (
          <BodyRollComponent
            bodyRollId={bodyRollId}
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
    initializingData: InitializeSubtableDispatchDataInput,
    bodyRollData: InitializeSubtableDispatchBodyRollInput
  ) => {
    const { tableGroupId, subtableGroupId } = initializingData;

    for (let i = 0; i < bodyRollData.length; i++) {
      if (typeof bodyRollData[i].value === "string") {
        dispatch(errorWithBodyRoll({ tableGroupId, subtableGroupId }, bodyRollData[i].value as string ));
      } else {
        console.log(`making bodyroll`)
        dispatch(addBodyRoll(
          tableGroupId, 
          subtableGroupId, 
          bodyRollData[i] as {
            id: string, 
            value: CombinedRollValuesType
          }
        ));
      }
    }

    // update subtableGroup bodyRollCollection
    const validBodyRollIds: string[] = bodyRollData.filter(a => typeof a.value !== "string").map(a => a.id);
    dispatch(addBodyRollIdsSubtableGroup(subtableGroupId, validBodyRollIds));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SubtableGroupComponent);