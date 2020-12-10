///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                          NOTES
// This is a wrapper component - handles connection and dispatches to the store for
// the TableGroup object.
// UI Content can be found at ./TableGroupContent.tsx

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                        IMPORTS
// 1. React & packages
// 2. REDUX: Store types
// 3. REDUX: Selectors
// 4. REDUX: Actions
// 5. Data reading utilities
// 6. Configuration data
// 7. Components

import React, { useState, Dispatch, ReactEventHandler } from 'react';
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { RootState, RootAction } from "../../store";
import { TableGroup } from "../../store/tableGroups/types";

import { selectTableGroupById } from '../../store/tableGroups/selectors';

import { setTableGroup } from "../../store/tableGroups/actions";
import { clearAndRepopulateTableSubtableGroup } from "../../store/subtableGroups/actions";
import { deleteByTableGroupBodyRoll } from "../../store/bodyRolls/actions";

import { 
  AllBookNames, AllTableSelectValues, AllBodyRollNames, SubtableDisplaySpecType,
  allTablesDisplaySpecsByBook, tableNamesByBooks,
  getKeysFromSelectValue, getSelectValueFromKeys
} from "../../model/TableKeyStructuresAndFormats";

import selectionNameToLinkMap from "../../controlPanel/selectionNameToLinkMap.json"
import {SelectionNameToLinkMapType} from "../../controlPanel/types/selectionNameToLinkMapType";

import TableGroupContent from "./TableGroupContent";
import { rollValues } from '../../util/rollDice';


///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                          SETUP

export type QuerySiblingSubtableInExtendedFnType = ( key1: string, key2: string | undefined ) => any;

type TableGroupComponentProps = {
  showIds: boolean;
  tableGroupId: string;
  deleteTableGroup: (id: string) => void;
} &
TableGroupComponentMappedProps &
TableGroupComponentMappedDispatch;

type TableGroupComponentMappedProps = {
  tableGroup?: TableGroup;
};

type TableGroupComponentMappedDispatch = {
  setTableGroup?: (
    tableGroupId: string,
    selectedTable: AllTableSelectValues
    ) => void;
};

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                             COMPONENTS & LOGIC

const getTableGroupLink = (selectValue: "none" | AllTableSelectValues): string => {
  if (selectValue === "none" ) { return ""; } else {
    const nameLinkMap = selectionNameToLinkMap as SelectionNameToLinkMapType;

    const [bookName, tableName] = selectValue.split("-") as [AllBookNames, string];
    const systemModuleNames = Object.keys(nameLinkMap[bookName]);
    const matchingModuleName = systemModuleNames.filter((name: string) => nameLinkMap[bookName][name].tableGroupSelectValues.includes(tableName))[0];
    const matchingModuleLink = nameLinkMap[bookName][matchingModuleName].link;
    
    return matchingModuleLink;
  }
}


const TableGroupComponent: React.FC<TableGroupComponentProps> = ({
  showIds, tableGroupId, deleteTableGroup,
  tableGroup,
  setTableGroup
}) => {
  // reads from tableGroup's (in Store) keys what the select value should be
  const initialSelectedTable = getSelectValueFromKeys(tableGroup?.bookKey, tableGroup?.tableKey);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [selectedTable, setSelectedTable] = useState<"none" | AllTableSelectValues>(initialSelectedTable);

  const handleSelectTable: ReactEventHandler = (event: React.ChangeEvent<HTMLSelectElement>) => setSelectedTable(event.target.value as "none" | AllTableSelectValues);
  const handleDeleteTable: ReactEventHandler = () => deleteTableGroup(tableGroupId);
  
  const handleRollTable: ReactEventHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!initialized) {setInitialized(true);}

    if (selectedTable !== "none" && setTableGroup) { setTableGroup(tableGroupId, selectedTable); }
  }

  // query sibling subtableGroup in case of displaySpec.format == "mDetail ref"
  // used in mothership / dead planet - derelict
  const querySiblingSubtableInExtendedGroup: QuerySiblingSubtableInExtendedFnType = (key1: string, key2: string | undefined) => {
    if (tableGroup && tableGroup.tableData["extended"]) {
      if (tableGroup.tableData["extended"][key1]["type"] === "lookup") {
        return tableGroup.tableData["extended"][key1]["values"][key2 as string];
      } else {
        return rollValues(tableGroup.tableData["extended"][key1]["interface"]);
      }
    }
  }

  if (!!tableGroup) {
    return (
      <TableGroupContent 
        showIds={showIds}
        tableGroup={tableGroup}
        tableGroupData={{
          tgId: tableGroupId,
          moduleLink: getTableGroupLink(selectedTable),
          initialized: initialized.toString(),
          selectedTable
        }}
        callbacks={{
          handleSelectTable, handleDeleteTable, handleRollTable,
          querySiblingSubtableInExtendedGroup
        }}
      />
    )
  } else {
    return (<></>)
  }
};

const mapStateToProps = (state: RootState, ownProps: TableGroupComponentProps) => {
  const { tableGroupId } = ownProps;
  return { 
    tableGroup: selectTableGroupById(state, tableGroupId),
  }
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
    // (re/roll tablegroup button)
    // STORE: set tableGroup (retain id)
    // STORE: delete all bodyRolls (delete ids)
    // STORE: delete and recreate subTables (delete ids, recreate ids)
    // 
    // this triggers deleting existing SubtableGroupComponents
    // and then creation of new SubtableGroupComponents,
    // which then triggers creation of BodyRolls in STORE with useEffect()

  setTableGroup: (tableGroupId: string, selectedTable: AllTableSelectValues) => {
    const { bookKey, tableKey } = getKeysFromSelectValue(selectedTable);
    const listOfSubtableKeys = tableNamesByBooks[bookKey][tableKey] as AllBodyRollNames[];
    const mapOfSubtableDisplaySpecs = allTablesDisplaySpecsByBook[bookKey][tableKey]["body"]["main"];

    const subtableInfo = listOfSubtableKeys.map((subtableKey: AllBodyRollNames) => {
      const displaySpec = mapOfSubtableDisplaySpecs[subtableKey] as SubtableDisplaySpecType;
      return {
        id: uuidv4(),
        subtableKey: subtableKey as AllBodyRollNames,
        displaySpec: displaySpec,
      }
    });
    const subtableIds = subtableInfo.map(({id}) => id);

    dispatch(setTableGroup(tableGroupId, selectedTable, subtableIds));
    dispatch(deleteByTableGroupBodyRoll(tableGroupId));
    dispatch(clearAndRepopulateTableSubtableGroup(tableGroupId, subtableInfo));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TableGroupComponent);