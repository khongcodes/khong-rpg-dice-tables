///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                          NOTES

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                        IMPORTS

import React, { createContext, useState } from 'react';

import { AllBookNames } from "../model/TableKeyStructuresAndFormats";
import buttonStyles from "../assets/styles/Buttons.module.sass";

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                          SETUP

type HasComponentChildren = { children: React.ReactNode[] | React.ReactNode };

type NodeColorAttributes = {
  bg?: string;
  text?: string;
  shadow?: string;
}

type BookColorsType = {
  header: NodeColorAttributes;
  controlContainer: NodeColorAttributes;
  controlButton: {
    normal: NodeColorAttributes;
    hover: NodeColorAttributes;
    focus: NodeColorAttributes;
    active: NodeColorAttributes;
  }
};

type BookColorsCollectionType = {
  [key in AllBookNames]: BookColorsType
};

type BookThemeType = {
  subtableGroupComponent: {
    headerDiv: string;
    controlContainer: string;
  };
  sgExpandButton: {
    button: string;
  };
  sgControlButton: {
    button: string;
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                             COMPONENTS & LOGIC

const bookColorsCollection: BookColorsCollectionType = {
  lancer: {
    header: {
      bg: "#cc0000",
      text: "#FFFFFF"
    },
    controlContainer: {
      bg: "rgb(255, 192, 203)"
    },
    controlButton: {
      normal: {
        text: "#3b0000",
        shadow: "rgba(204,0,0,0.4)"
      },
      hover: {
        bg: "#f86b6b",
        text: "#FFFFFF",
        shadow: "#be0b0b"
      },
      focus: {
        bg: "#ff8e8e",
        text: "#FFFFFF",
        shadow: "#e61d1d"
      },
      active: {
        bg: "#ff8e8e",
        text: "#FFFFFF",
        shadow: "#e61d1d"
      }
    }
  },
  mothership: {
    header: {
      bg: "#fffb18",
      text: "#000000"
    },
    controlContainer: {
      bg: "#ccc900"
    },
    controlButton: {
      normal: {
        text: "#535200",
        shadow: "#838100"
      },
      hover: {
        bg: "#777",
        text: "#FFF",
        shadow: "#000000"
      },
      focus: {
        bg: "#fffb00",
        text: "#000",
        shadow: "#a29d00"
      },
      active: {
        bg: "#000",
        text: "#FFFFFF",
        shadow: "#fffb00"
      }
    }
  },
  uvg: {
    header: {
      bg: "#c00bf7",
      text: "#FFFFFF"
    },
    controlContainer: {
      bg: "#e595fd"
    },
    controlButton: {
      normal: {
        text: "#5a0333",
        shadow: "#f006bd",
      },
      hover: {
        bg: "#f006bd",
        text: "#FFF",
        shadow: "#8f0383"
      },
      focus: {
        bg: "#eb4ddd",
        text: "#FFF",
        shadow: "#b603a7"
      },
      active: {
        bg: "#eb4ddd",
        text: "#FFFFFF",
        shadow: "#b603a7"
      }
    }
  }
};

const undefinedBookColors: BookColorsType = {
  header: {
    bg: "#444444",
    text: "#FFFFFF"
  },
  controlContainer: {
    bg: "rgb(156, 156, 156)"
  },
  controlButton: {
    normal: {
      shadow: "#444444"
    },
    hover: {
      bg: "",
      text: "",
      shadow: "",
    },
    focus: {
      bg: "",
      text: "",
      shadow: ""
    },
    active: {
      bg: "",
      text: "",
      shadow: ""
    }
  }
};

const bookThemePackager = (bookKey: AllBookNames | undefined): BookThemeType => {
  const bookColors = bookKey !== undefined ? bookColorsCollection[bookKey] : undefinedBookColors;
  return {
    subtableGroupComponent: {
      headerDiv: `
        background-color: ${bookColors.header.bg};
        color: ${bookColors.header.text};
      `,
      controlContainer: `
        background-color: ${bookColors.controlContainer.bg};
      `
    },
    sgExpandButton: {
      button: `
        color: ${bookColors.controlContainer.bg};
        &.${buttonStyles.close} {
          color: ${bookColors.header.text};
        }
      `
    },
    sgControlButton: {
      button: `
        color: ${bookColors.controlButton.normal.text};
        box-shadow: 0 1px 1px 0px ${bookColors.controlButton.normal.shadow};
        &:focus {
          background-color: ${bookColors.controlButton.focus.bg};
          color: ${bookColors.controlButton.focus.text};
          box-shadow: 0 2px 1px 0px ${bookColors.controlButton.focus.shadow};
        }
        &:hover {
          background-color: ${bookColors.controlButton.hover.bg};
          color: ${bookColors.controlButton.hover.text};
          box-shadow: 0 2px 1px 0px ${bookColors.controlButton.hover.shadow};
          &:focus {
            box-shadow: 0 3px 1px 0px ${bookColors.controlButton.hover.shadow};
          }
        }
        &:active {
          background-color: ${bookColors.controlButton.active.bg};
          color: ${bookColors.controlButton.active.text};
          box-shadow: 0 0px 1px 0px ${bookColors.controlButton.active.shadow};
          &:hover {
            box-shadow: 0 0px 1px 0px ${bookColors.controlButton.active.shadow};
          }
        }
      `
    }
  }
};

const defaultBookThemeContext = {
  bookTheme: bookThemePackager(undefined),
  setBookTheme: (input: AllBookNames|undefined) => {}
};

export const BookThemeContext = createContext(defaultBookThemeContext);

const BookThemeContextProvider = ({ children }: HasComponentChildren) => {
  const [activeBookKey, setSelectedBookKey] = useState<AllBookNames|undefined>(undefined);
  const bookThemeContext = {
    bookTheme: bookThemePackager(activeBookKey),
    setBookTheme: setSelectedBookKey
  };
  console.log("bookthemecontextprovider ran");
  // console.log(`bookthemecontextprovider activeBookKey: ${activeBookKey}`);
  // console.log(`bookthemecontextprovider bookTheme:`);
  // console.log(bookThemeContext.bookTheme);

  return (
    <BookThemeContext.Provider value={bookThemeContext}>
      {children}
    </BookThemeContext.Provider>
  );
};

export default BookThemeContextProvider;