import { AllBookNames, AllTableNames } from "../../model/TableKeyStructuresAndFormats";

export type SelectionNameToLinkMapType = {
  [key in AllBookNames]: {
    [string: string]: {
      link: string;
      tableGroupSelectValues: string[];
    }
  }
}