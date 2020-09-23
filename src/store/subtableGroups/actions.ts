import { AddAllSubtablesDispatchInput,
  SubtableGroupActionTypes,
  ADDALLTOTABLE_SUBTABLEGROUP,
} from "./types";
import { AllBodyRollNames, SubtableDisplaySpecType } from "../../model/DataOut";


export function addAllToTableSubtableGroup(subtablesData: AddAllSubtablesDispatchInput[]): SubtableGroupActionTypes {
  const addedSubtablesObj = subtablesData.reduce((container: {[key: string]: AddAllSubtablesDispatchInput}, subtableInfo) => {
    container[subtableInfo.id] = Object.assign({bodyRollCollection: []}, subtableInfo);
    return container;
  }, {});

  return {
    type: ADDALLTOTABLE_SUBTABLEGROUP,
    payload: addedSubtablesObj
  }
}
