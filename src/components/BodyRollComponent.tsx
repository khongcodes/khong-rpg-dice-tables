import React from 'react';
import { connect } from "react-redux";

import { RootState, RootAction } from "../store";
import { BodyRoll } from '../store/bodyRolls/types';
import { selectBodyRollById } from "../store/bodyRolls/selectors";
import { selectFormatByBodyRollId } from "../store/subtableGroups/selectors";

import { AllBodyRollFormats } from "../model/DataOut";
import { 
  CombinedRollValuesType,
  SimpleRollValue,
  DetailRollValue
} from "../model/DataIn";



type BodyRollComponentProps = {
  bodyRollId: string;
} & 
BodyRollComponentMappedState & 
BodyRollComponentMappedDispatch;

type BodyRollComponentMappedState = {
  bodyRoll?: BodyRoll;
  format?: AllBodyRollFormats;
};

type BodyRollComponentMappedDispatch = {

};

type FormattedBodyRollContentInput = {
  format: AllBodyRollFormats;
  value: CombinedRollValuesType
}

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
  bodyRollId, bodyRoll, format
}) => {
  console.log(bodyRoll)
  return (
    <div>
      <button disabled>delete</button>
      
      <p>
        id: {bodyRollId}
      </p>

      {
        bodyRoll ? 
          <FormattedBodyRollContent format={format as AllBodyRollFormats} value={bodyRoll.value}/>
        : <></>
      }

      <button>reroll</button>
    </div>
  )
};

const mapStateToProps = (state: RootState, ownProps: BodyRollComponentProps) => {
  const { bodyRollId } = ownProps;
  return {
    bodyRoll: selectBodyRollById(state, bodyRollId),
    format: selectFormatByBodyRollId(state, bodyRollId)
  }
}

export default connect(mapStateToProps)(BodyRollComponent);