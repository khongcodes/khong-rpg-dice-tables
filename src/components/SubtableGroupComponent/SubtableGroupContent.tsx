///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                          NOTES

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                        IMPORTS
// 1. React & packages
// 2. REDUX: Store types
// 3. Data-reading utilities
// 4. Components
// 5. Styles

/** @jsxRuntime classic */
/** @jsx jsx */

import React, { useState } from 'react';
import { css, jsx } from "@emotion/react";
import clsx from "clsx";

import { SubtableGroup } from "../../store/subtableGroups/types";

import { CombinedBodyRollType } from "../../model/DiceRollTypes";
import { AllBodyRollFormats, AllBookNames } from "../../model/TableKeyStructuresAndFormats";
import { RerollBodyRollMDetailReferenceType } from "./SubtableGroupComponent";

import BodyRollComponent from '../BodyRollComponent';
import { SGButton, SGExpandButton } from "../Buttons";

import subtableStyles from "../../assets/styles/SubtableGroup.module.sass";
import { bookColorThemeUnpacker } from "./bookColorThemes";


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
  };
  bookKey: AllBookNames | undefined;
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
  sgComponentData, callbacks,
  bookKey
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

  const bookTheme = bookColorThemeUnpacker(bookKey).subtableGroupComponent;

  return (
    <div className={subtableStyles.subtableRoot}>
      <div 
        className={subtableStyles.titleContainer}
        css={css(bookTheme.headerDiv)}
      >
        <h3>{subtableGroup.displaySpec.name}</h3>
        
        <SGExpandButton
          callback={toggleControlsVisible}
          state={controlsVisible}
          bookKey={bookKey}
        />

        <div className={clsx(subtableStyles.titleSpacer, {[subtableStyles.invisible]: !controlsVisible})} />
      </div>

      {showIds ? <RenderSubtableGroupStoreData sgData={renderedSubtableData}/> : <React.Fragment></React.Fragment>}

      <div 
        className={clsx(subtableStyles.buttonContainer, {[subtableStyles.invisible]: !controlsVisible})}
        css={css(bookTheme.controlContainer)}
      >
        <SGButton 
          type="close all"
          callback={handleDeleteAllBodyRolls}
          bookKey={bookKey}
        />
        <SGButton 
          type="reroll all"
          callback={handleRerollAllBodyRolls}
          bookKey={bookKey}
        />
        <SGButton 
          type="add one"
          callback={handleAddBodyRoll}
          bookKey={bookKey}
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
        )) : <React.Fragment></React.Fragment>
      }

    </div>
  )
}

export default SubtableGroupContent;