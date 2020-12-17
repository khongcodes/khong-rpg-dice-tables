///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                        IMPORTS

// import { CSSProperties } from "react";
// import { css, SerializedStyles } from "@emotion/react";
import { AllBookNames } from "../../model/TableKeyStructuresAndFormats";

import buttonStyles from "../../assets/styles/Buttons.module.sass";

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                          SETUP

export type BookColorThemeType = {
  headerBg: string;
  headerText: string;
  controlContainerBg?: string;
  controlButtonShadow?: string;
  controlButtonHoverBg?: string;
  controlButtonHoverText?: string;
  controlButtonHoverShadow?: string;
}

const whereThemeUsed = <const>[
  "header",
  "controlContainer"
];

type LocationsThemeApplied = typeof whereThemeUsed[number];


export type BookColorThemesCollectionType = {
  [key in AllBookNames]: BookColorThemeType
};

export type BookThemedComponent = {
  bookKey: AllBookNames | undefined;
};

export type ThemeUnpackerReturnObj = any;
// export type ThemeUnpackerReturnObj = {
//   [key in LocationsThemeApplied]: string
// }


///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                             COMPONENTS & LOGIC

export const bookColorThemes: BookColorThemesCollectionType = {
  lancer: {
    headerBg: "#cc0000",
    headerText: "#FFFFFF",
    controlContainerBg: "rgb(255, 192, 203)",
    controlButtonShadow: "rgba(204,0,0,0.4)"
  },
  mothership: { 
    headerBg: "#fffb00",
    headerText: "#000000"
  },
  uvg: {
    headerBg: "#cc16ae",
    headerText: "#FFFFFF"
  }
};

const undefinedTheme: BookColorThemeType = {
  headerBg: "#444444",
  headerText: "#FFFFFF",
  controlContainerBg: "rgb(156, 156, 156)",
  controlButtonShadow: "rgba(129, 129, 129, 0.4)"
}

export const bookColorThemeUnpacker = (bookKey: AllBookNames | undefined): ThemeUnpackerReturnObj => {
  const bookTheme = bookKey !== undefined ? bookColorThemes[bookKey] : undefinedTheme;
  return {
    subtableGroupComponent: {
      headerDiv: `
        background-color: ${bookTheme.headerBg};
        color: ${bookTheme.headerText};
      `,
      controlContainer: `
        background-color: ${bookTheme.controlContainerBg};
      `,
      controlExpandButton: `
        color: ${bookTheme.controlContainerBg};
      `
    },
    sgExpandButton: {
      button: `
        color: ${bookTheme.controlContainerBg};
        &.${buttonStyles.close} {
          color: ${bookTheme.headerText}
        }
      `
    }
  }
}