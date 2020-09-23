import { ClearAndRepopulateSubtablesDispatchInput,
  SubtableGroupActionTypes,
  CLEARANDREPOPULATETABLE_SUBTABLEGROUP,
} from "./types";


export function clearAndRepopulateTableSubtableGroup(tableGroupId: string, subtablesData: ClearAndRepopulateSubtablesDispatchInput[]): SubtableGroupActionTypes {
  const addedSubtablesObj = subtablesData.reduce((container: {[key: string]: ClearAndRepopulateSubtablesDispatchInput}, subtableInfo) => {
    container[subtableInfo.id] = Object.assign({bodyRollCollection: [], tableGroupId: tableGroupId}, subtableInfo);
    return container;
  }, {});

  return {
    type: CLEARANDREPOPULATETABLE_SUBTABLEGROUP,
    payload: {
      tableGroupId: tableGroupId,
      subtables: addedSubtablesObj
    }
  }
}
