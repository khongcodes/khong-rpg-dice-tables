///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                          NOTES

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                        IMPORTS
// 1. React & packages
// 2. REDUX: Store types
// 3. REDUX: Selectors
// 4. REDUX: Actions
// 5. Data-reading utilities
// 6. Components
// 7. Styles

import React, { Dispatch, useState, useRef } from 'react';
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";

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

import { BRButton } from "./Buttons";

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
  value: CombinedRollValuesType | undefined;
}


///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                             COMPONENTS & LOGIC

const FormattedBodyRollContent: React.FC<FormattedBodyRollContentInput> = (
  { format, value }
) => {

  switch (true) {
    case (format === "simple"):
      return (
        <div>
          <p>{(value as SimpleRollValue).value}</p>
        </div>
      )

    case (["detail", "detail check-ref"].includes(format)):
      return (
        <div>
          <h4>{(value as DetailRollValue).name}</h4>
          <p>{(value as DetailRollValue).detail}</p>
        </div>
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
};

const RenderBodyRollStoreData = ({ id }: { id: string }) => (<div><p>{id}</p></div>);

const BodyRollComponent: React.FC<BodyRollComponentProps> = ({
  showIds, bodyRollId, rerollFn, rerollBodyRollMDetailRef,
  bodyRoll, format,
  deleteBodyRoll
}) => {  
  const [transition, setTransition] = useState<boolean>(false);

  const handleRerollButton = () => {
    // signal CSSTransition to EXIT previous roll value, then in 100ms ENTER
    setTransition(false);
    setTimeout(() => setTransition(true), 100);
  };
  const transitionalNode = useRef(null);

  const actuallyReroll = () => {
    if (format === "mDetail ref") {
      rerollBodyRollMDetailRef(bodyRollId);
    } else {
      rerollFn(bodyRollId);
    }
  };
  
  const handleDelete = () => {
    if (bodyRoll && deleteBodyRoll) { deleteBodyRoll(bodyRoll.subtableGroupId, bodyRollId); }
  };

  return (
    <div id={bodyRollStyles.brRoot}>
      {showIds? <RenderBodyRollStoreData id={bodyRollId}/> : <></>}

      <div className={bodyRollStyles.buttonContainer}>
        <BRButton type="delete" callback={handleDelete} />
      </div>

        {/* CSSTransition triggers rerolling on transition-enter */}
        <CSSTransition
          in={transition}
          classNames="bodyrollTransition"
          timeout={300}
          nodeRef={transitionalNode}
          onEntering={actuallyReroll}
        >
          <div id={bodyRollStyles.contentContainer} ref={transitionalNode}>
            <FormattedBodyRollContent 
              format={format as AllBodyRollFormats}
              value={bodyRoll?.value}
            />
          </div>
        </CSSTransition>

      <div className={bodyRollStyles.buttonContainer}>
        <BRButton type="reroll" callback={handleRerollButton} />
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