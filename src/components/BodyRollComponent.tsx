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

import { AllBodyRollFormats } from "../model/TableKeyStructuresAndFormats";
import { 
  CombinedRollValuesType,
  SimpleRollValue,
  DetailRollValue,
  MultiDetailRollValue
} from "../model/DiceRollTypes";

import bodyRollStyles from "../assets/styles/BodyRoll.module.sass";

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                          SETUP

type BodyRollComponentProps = {
  showIds: boolean;
  bodyRollId: string;
  rerollFn: (id: string) => void;
  rerollBodyRollMDetailRef: (id: string) => void;
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

  switch (true) {
    case (format === "simple"):
      return (
        <>
          <p>{(value as SimpleRollValue).value}</p>
        </>
      )

    case (["detail", "detail check-ref"].includes(format)):
      return (
        <>
          <h4>{(value as DetailRollValue).name}</h4>
          <p>{(value as DetailRollValue).detail}</p>
        </>
      )

    case (format === "mDetail ref"):
      return (
        <>
          <p>name: {(value as MultiDetailRollValue).name}</p>
          {(value as MultiDetailRollValue).detail.map((detail: string, index: number) => 
            <p key={index}>
              { detail }
            </p>
          )}
        </>
      )

    // case (format === "reference"):
    //   return (
    //     <></>
    //   )
    default:
      return <></>;
  }
}

const RenderBodyRollStoreData = ({showIds, id}: {
  showIds: boolean,
  id: string
}) => {
  if (showIds) {
    return (
      <div>
        <p>id: {id}</p>
      </div>
    )
  } else {
    return (<></>)
  }
}


const BodyRollComponent: React.FC<BodyRollComponentProps> = ({
  showIds, bodyRollId, rerollFn, rerollBodyRollMDetailRef,
  bodyRoll, format,
  deleteBodyRoll
}) => {
  
  const handleReroll = () => {
    if (format === "mDetail ref") {
      rerollBodyRollMDetailRef(bodyRollId);
    } else {
      rerollFn(bodyRollId);
    }
  };
  
  const handleDelete = () => {
    if (bodyRoll && deleteBodyRoll) { deleteBodyRoll(bodyRoll.subtableGroupId, bodyRollId); }
  }


  return (
    <div id={bodyRollStyles.brRoot}>
      <RenderBodyRollStoreData 
        showIds={showIds}
        id={bodyRollId}
      />

      <div className={`${bodyRollStyles.deleteContainer} ${bodyRollStyles.buttonContainer}`}>
        <button onClick={handleDelete}>delete</button>
      </div>

      {
        bodyRoll ? 
          <div id={bodyRollStyles.contentContainer}>
            <FormattedBodyRollContent 
              format={format as AllBodyRollFormats}
              value={bodyRoll.value}
            />
          </div>
        : <></>
      }

      <div className={`${bodyRollStyles.rerollContainer} ${bodyRollStyles.buttonContainer}`}>
        <button onClick={handleReroll}>reroll</button>
      </div>
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