///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                          NOTES

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                        IMPORTS
// 1. React & packages
// 2. REDUX: Store types
// 3. Data-reading utilities
// 4. Components
// 5. Styles

import React, { useState } from 'react';

import { SubtableGroup } from "../../store/subtableGroups/types";

import { CombinedBodyRollType } from "../../model/DiceRollTypes";
import { AllBodyRollFormats } from "../../model/TableKeyStructuresAndFormats";
import { RerollBodyRollMDetailReferenceType } from "./SubtableGroupComponent";

import BodyRollComponent from '../BodyRollComponent';
import { SGButton } from "../Buttons";

import subtableStyles from "../../assets/styles/SubtableGroup.module.sass";


///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                          SETUP

type SubtableContentDataType = { id: string; };

type RenderSubtableDataType = {
  sgData: {
    id: string;
    displaySpecName: string;
    displaySpecFormat:AllBodyRollFormats;
  }
};

type SubtableContentPropType = {
  showIds: boolean;
  subtableGroup: SubtableGroup;
  subtableData: CombinedBodyRollType;
  sgComponentData: SubtableContentDataType;
  callbacks: {
    handleDeleteAllBodyRolls: VoidFunction;
    handleRerollAllBodyRolls: VoidFunction;
    handleAddBodyRoll: VoidFunction;
    rerollBodyRoll: (subtableData: CombinedBodyRollType) => (id: string) => void;
    rerollBodyRollMDetailReference: RerollBodyRollMDetailReferenceType;
    querySiblingSubtableInExtendedGroup: (key1: string, key2: string) => any;
    getValueForMDetailReferenceFormat: (
      subtableGroup: SubtableGroup,
      subtableData: CombinedBodyRollType,
      querySiblingSubtableInExtendedGroup: ((key1: string, key2: string) => any)
    ) => { name: string, detail: string[] };
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                             COMPONENTS & LOGIC

const RenderSubtableGroupStoreData: React.FC<RenderSubtableDataType> = ({ sgData }) => (
  <div>
    <p>
      subtableGroupId: {sgData.id}<br/>
      name: {sgData.displaySpecName}<br/>
      displaySpec: {sgData.displaySpecFormat}<br/>
    </p>
  </div>
);


const SubtableGroupContent: React.FC<SubtableContentPropType> = ({
  showIds,
  subtableGroup, subtableData,
  sgComponentData, callbacks
}) => {

  const renderedSubtableData = {
    id: sgComponentData.id,
    displaySpecName: subtableGroup.displaySpec.name,
    displaySpecFormat: subtableGroup.displaySpec.format
  };
  
  const {
    handleDeleteAllBodyRolls, handleRerollAllBodyRolls, handleAddBodyRoll,
    rerollBodyRoll, rerollBodyRollMDetailReference,
    querySiblingSubtableInExtendedGroup, getValueForMDetailReferenceFormat
  } = callbacks;

  const [controlsVisible, setControlsVisible] = useState<boolean>(false);
  const toggleControlsVisible = () => setControlsVisible(!controlsVisible);

  const controlsVisibleDependentClass = controlsVisible ? subtableStyles.visible : subtableStyles.invisible;

  return (
    <div className={subtableStyles.subtableRoot}>
      <div className={subtableStyles.titleContainer}>
        <h3>{subtableGroup.displaySpec.name}</h3>
        
        <button 
          className={subtableStyles.toggleControlButton}
          onClick={toggleControlsVisible}
        >
          {controlsVisible.toString()}
        </button>

        <div
          className={`${subtableStyles.titleSpacer} ${controlsVisibleDependentClass}`}
          style={
            controlsVisible ? 
            {} : {"transitionDelay": "0.2s"}
          }
        />
      </div>

      {showIds ? <RenderSubtableGroupStoreData sgData={renderedSubtableData}/> : <></>}

      <div 
        className={`${subtableStyles.buttonContainer} ${controlsVisibleDependentClass}`}
        style={
          !controlsVisible ? 
          {} : {"transitionDelay": "0.1s"}
        }
      >
        <SGButton 
          type="close all"
          callback={handleDeleteAllBodyRolls}
        />
        <SGButton 
          type="reroll all"
          callback={handleRerollAllBodyRolls}
        />
        <SGButton 
          type="add one"
          callback={handleAddBodyRoll}
        />
      </div>

      {
        rerollBodyRoll && rerollBodyRollMDetailReference ? subtableGroup.bodyRollCollection.map(bodyRollId => (
          <BodyRollComponent 
            showIds={showIds}
            bodyRollId={bodyRollId}
            rerollFn={rerollBodyRoll(subtableData)}
            rerollBodyRollMDetailRef={rerollBodyRollMDetailReference(subtableGroup, subtableData, querySiblingSubtableInExtendedGroup, getValueForMDetailReferenceFormat)}
            key={bodyRollId}
          />
        )) : <></>
      }

    </div>
  )
}

export default SubtableGroupContent;