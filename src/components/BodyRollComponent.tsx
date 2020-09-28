///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                          NOTES

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                        IMPORTS
// 1. React & packages
// 2. REDUX: Store types
// 3. REDUX: Selectors
// 4. REDUX: Actions
// 5. Data-reading utilities

import React, { Dispatch } from 'react';
import { connect } from "react-redux";

import { RootState, RootAction } from "../store";
import { BodyRoll } from '../store/bodyRolls/types';

import { selectBodyRollById } from "../store/bodyRolls/selectors";
import { selectFormatByBodyRollId } from "../store/subtableGroups/selectors";

import { deleteBodyRollIdSubtableGroup } from "../store/subtableGroups/actions";
import { deleteBodyRoll } from "../store/bodyRolls/actions";

import { AllBodyRollFormats } from "../model/DataOut";
import { 
  CombinedRollValuesType,
  SimpleRollValue,
  DetailRollValue
} from "../model/DataIn";


///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                          SETUP

type BodyRollComponentProps = {
  bodyRollId: string;
  rerollFn: (id: string) => void;
} & 
BodyRollComponentMappedState & 
BodyRollComponentMappedDispatch;

type BodyRollComponentMappedState = {
  bodyRoll?: BodyRoll;
  format?: AllBodyRollFormats;
};

type BodyRollComponentMappedDispatch = {
  deleteBodyRoll?: (subtableGroupId: string, bodyRollId: string) => void;
};


type FormattedBodyRollContentInput = {
  format: AllBodyRollFormats;
  value: CombinedRollValuesType
}


///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                             COMPONENTS & LOGIC

const FormattedBodyRollContent: React.FC<FormattedBodyRollContentInput> = (
  { format, value }
) => {
  switch (format) {
    case "simple":
      return (
        <div>
          <p>value: {(value as SimpleRollValue).value}</p>
        </div>
      )

    case "detail":
      return (
        <div>
          <p>name: {(value as DetailRollValue).name}</p>
          <p>detail: {(value as DetailRollValue).detail}</p>
        </div>
      )

    case "reference":
      return (
        <div></div>
      )
    default:
      return <></>;
  }
}

const BodyRollComponent: React.FC<BodyRollComponentProps> = ({
  bodyRollId, rerollFn,
  bodyRoll, format,
  deleteBodyRoll
}) => {
  
  const handleReroll = () => rerollFn(bodyRollId);
  const handleDelete = () => {
    if (bodyRoll && deleteBodyRoll) { deleteBodyRoll(bodyRoll.subtableGroupId, bodyRollId); }
  }

  return (
    <div>
      <button onClick={handleDelete}>
        delete
      </button>
      
      <p>
        id: {bodyRollId}
      </p>

      {
        bodyRoll ? 
          <FormattedBodyRollContent format={format as AllBodyRollFormats} value={bodyRoll.value}/>
        : <></>
      }

      <button onClick={handleReroll}>reroll</button>
    </div>
  )
};

const mapStateToProps = (state: RootState, ownProps: BodyRollComponentProps) => {
  const { bodyRollId } = ownProps;
  return {
    bodyRoll: selectBodyRollById(state, bodyRollId),
    format: selectFormatByBodyRollId(state, bodyRollId)
  }
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  deleteBodyRoll: (subtableGroupId: string, bodyRollId: string) => {
    dispatch(deleteBodyRoll(bodyRollId));
    dispatch(deleteBodyRollIdSubtableGroup(subtableGroupId, bodyRollId));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(BodyRollComponent);