///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                        IMPORTS

import { Theme } from "@material-ui/core";
import { CSSProperties } from "react";
import { AllBookNames } from "../../model/TableKeyStructuresAndFormats";


///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                          SETUP

export type BookColorThemeType = {
  primary: string;
  primaryText: string;
}

export type BookColorThemesCollectionType = {
  [key in AllBookNames]: BookColorThemeType
};

export type ThemeUnpackerReturnObj = {
  [key: string]: CSSProperties
}


///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                             COMPONENTS & LOGIC

export const bookColorThemes: BookColorThemesCollectionType = {
  lancer: { 
    primary: "#cc0000",
    primaryText: "#FFFFFF" 
  },
  mothership: { 
    primary: "#fffb00",
    primaryText: "#000000"
  },
  uvg: {
    primary: "#cc16ae",
    primaryText: "#FFFFFF"
  }
};

export const undefinedTheme: BookColorThemeType = {
  primary: "#444444",
  primaryText: "#FFFFFF"
}

export const bookColorThemeUnpacker = (bookTheme: BookColorThemeType): ThemeUnpackerReturnObj => ({
  primary: {
    "backgroundColor": bookTheme.primary,
    "color": bookTheme.primaryText
  }
})