///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                          NOTES

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                        IMPORTS

import React, { ReactEventHandler } from 'react';

import CloseIcon from "@material-ui/icons/CloseRounded";
import LinkIcon from "@material-ui/icons/LinkRounded";
import DiceIcon from "@material-ui/icons/CasinoOutlined";
import PlusOneIcon from "@material-ui/icons/ExposurePlus1Rounded";

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
};

type BRButtonProps = {
  
}

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
    className={enabled ? buttonStyles.moduleTGLinkEnabled : buttonStyles.moduleTGLinkDisabled}
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


export const SGButton: React.FC<SGButtonProps> = ({callback, type}) => {
  
  const buttonContent = (type: SGButtonTypes ) => {
    switch (type) {
      case "close all":
        return (<><CloseIcon /> all</>);
      case "reroll all":
        return (<><DiceIcon /> all</>);
      case "add one":
        return (<PlusOneIcon />);
    }
  }

  return (
    <button 
      className={buttonStyles.controlsSG}
      onClick={callback}
    >
      {buttonContent(type)}
    </button>
  ) ;
};


export const BRButton: React.FC<BRButtonProps> = () => {
  return (
    <button>

    </button>
  )
}