///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                          NOTES

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                        IMPORTS
/** @jsxRuntime classic */
/** @jsx jsx */

import React, { ReactEventHandler } from 'react';
import { css, jsx } from "@emotion/react";
import clsx from "clsx";

import CloseIcon from "@material-ui/icons/CloseRounded";
import LinkIcon from "@material-ui/icons/LinkRounded";
import DiceIcon from "@material-ui/icons/CasinoOutlined";
import PlusOneIcon from "@material-ui/icons/ExposurePlus1Rounded";
import ExpandMoreIcon from "@material-ui/icons/ExpandMoreRounded";

import buttonStyles from "../assets/styles/Buttons.module.sass";

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                          SETUP

type CloseTGProps = {
  deleteObjectCallback: ReactEventHandler;
};
type ModuleTGProps = {
  enabled: boolean;
  moduleLink: string;
};
type RollTGProps = {
  enabled: boolean;
};

type SGButtonTypes = "close all" | "reroll all" | "add one";
type SGButtonProps = {
  callback: () => void;
  type: SGButtonTypes;
  visible: boolean;
};

type BRButtonTypes = "delete" | "reroll";
type BRButtonProps = {
  callback: () => void;
  type: BRButtonTypes;
}

type ToggleButtonProps = {
  callback: VoidFunction;
  state: boolean;
}

type ButtonHasThemeProp = {
  theme: { button: string; };
};


///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                             COMPONENTS & LOGIC

export const CloseTGButton: React.FC<CloseTGProps> = ({deleteObjectCallback}) => (
  <button
    className={buttonStyles.closeTGButton}
    onClick={deleteObjectCallback}
  >
    <CloseIcon />
  </button>
)

export const ModuleTGLink: React.FC<ModuleTGProps> = ({enabled, moduleLink}) => (
  <a
    className={clsx(buttonStyles.moduleTGLink, {[buttonStyles.disabled]: !enabled})}
    href={moduleLink}
    target="_blank" rel="noreferrer noopener"
  >
    <LinkIcon />
  </a>
)

export const RollTGButton: React.FC<RollTGProps> = ({enabled}) => (
  <button 
    className={buttonStyles.rollTGButton}
    type="submit" 
    disabled={ !enabled }
  >
    <DiceIcon />
  </button>
)


export const SGButton: React.FC<SGButtonProps & ButtonHasThemeProp> = ({callback, type, visible, theme}) => {
  
  const buttonContent = (type: SGButtonTypes ) => {
    switch (type) {
      case "close all":
        return (
          <React.Fragment>
            <CloseIcon />
            <span className={buttonStyles.sgButtonText}>all</span>
          </React.Fragment>
        );
      case "reroll all":
        return (
          <React.Fragment>
            <DiceIcon />
            <span className={buttonStyles.sgButtonText}>all</span>
          </React.Fragment>
        );
      case "add one":
        return (
          <PlusOneIcon />
        );
    }
  };

  return (
    <button 
      className={buttonStyles.controlsSG}
      onClick={callback}
      css={css(theme.button)}
      tabIndex={visible ? 0 : -1}
    >
      {buttonContent(type)}
    </button>
  ) ;
};


export const BRButton: React.FC<BRButtonProps> = ({callback, type}) => {
  const buttonContent = (type: BRButtonTypes) => {
    switch (type) {
      case "delete":
        return (<CloseIcon />);
      case "reroll":
        return (<DiceIcon />);
    }
  };

  return (
    <button
      className={buttonStyles.brButton}
      onClick={callback}
    >
      {buttonContent(type)}
    </button>
  )
}

export const SGExpandButton: React.FC<ToggleButtonProps & ButtonHasThemeProp> = ({callback, state, theme}) => {
  // state is controlsVisisble
  return (
    <button 
      className={clsx(buttonStyles.sgExpand, {[buttonStyles.close]:state})}
      onClick={callback}
      css={css(theme.button)}
    >
      <ExpandMoreIcon />
    </button>
  )
}