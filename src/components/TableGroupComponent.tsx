///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                          NOTES

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

import { RootState, RootAction } from "../store";
import { TableGroup } from "../store/tableGroups/types";

import { selectTableGroupById } from '../store/tableGroups/selectors';

import { setTableGroup } from "../store/tableGroups/actions";
import { clearAndRepopulateTableSubtableGroup } from "../store/subtableGroups/actions";
import { deleteByTableGroupBodyRoll } from "../store/bodyRolls/actions";

import { 
  AllTableSelectValues, AllTableNames, AllBodyRollNames, SubtableDisplaySpecType,
  allTablesDisplaySpecsByBook, tableNamesByBooks,
  getKeysFromSelectValue
} from "../model/TableKeyStructuresAndFormats";

import availableRolls from "../controlPanel/availableRolls.json";

import SubtableGroupComponent from "./SubtableGroupComponent";


///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                          SETUP

type TableGroupComponentProps = {
  // base props
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
  addSubtables?: (tableGroup: TableGroup) => void;
};


///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                             COMPONENTS & LOGIC

const AvailableOptions = () => {
  const optGroupsFromAvailableRolls = [];

  for (let i = 0; i < availableRolls.bookNames.length; i++) {
    optGroupsFromAvailableRolls.push(
      <optgroup label={availableRolls.bookNames[i]} key={i}>
        {availableRolls.options[i].map((option,index) => (
          <option value={option.selectValue} key={index}>
            {option.stringName}
          </option>
        ))}
      </optgroup>
    )
  }
  
  return ( <>{optGroupsFromAvailableRolls}</> );
}


const TableGroupComponent: React.FC<TableGroupComponentProps> = ({ tableGroupId, tableGroup, deleteTableGroup, setTableGroup, addSubtables }) => {
  const [selectedTable, setSelectedTable] = useState<"none" | AllTableNames>("none");
  const [initialized, setInitialized] = useState<boolean>(false);

  const handleSelectTable: ReactEventHandler = (event: React.ChangeEvent<HTMLSelectElement>) => setSelectedTable(event.target.value as "none" | AllTableNames);
  const handleDeleteTable: ReactEventHandler = () => deleteTableGroup(tableGroupId);
  
  const handleRollTable: ReactEventHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!initialized) {setInitialized(true);}

    if (selectedTable !== "none" && setTableGroup) { setTableGroup(tableGroupId, selectedTable); }
  }

  // query sibling subtableGroup in case of displaySpec.format == "mDetail ref"
  // used in mothership / dead planet - derelict
  const querySiblingSubtableInExtendedGroup = (key1: string, key2: string) => {
    if (tableGroup && tableGroup.tableData["extended"]) {
      return tableGroup.tableData["extended"][key1]["values"][key2];
    }
  }
  
  // if (tableGroup && tableGroup.tableData["extended"]) {
  //   console.log(tableGroup.tableData["extended"]["shipMapByClass"])
  // }

  return (
    <div style={{"marginBottom": "20px"}}>
      <div>
        <p>
          id: {tableGroupId}<br/>
          selectedTable: {selectedTable}<br/>
          initialized: {initialized.toString()}
        </p>
      </div>
      

      <form onSubmit={handleRollTable}>
        <input 
          type="button"
          value="X"
          onClick={handleDeleteTable}
        />

        <select value={selectedTable} onChange={handleSelectTable}>
          <option value="none">Select a table</option>
          <AvailableOptions />
        </select>

        <input 
          type="submit"
          value={ !initialized ? "Roll" : "Reroll" }
          disabled={ selectedTable === "none" }
        />
      </form>

      <div>
        {
          !!tableGroup ? 
            tableGroup.subtableCollection.map(subtableId => (
              <SubtableGroupComponent
                tableGroupId={tableGroupId}
                subtableGroupId={subtableId}
                querySiblingSubtableInExtendedGroup = {querySiblingSubtableInExtendedGroup}
                key={subtableId}
              />
            ))
          : <></>
        }
      </div>
      
    </div>
  )
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