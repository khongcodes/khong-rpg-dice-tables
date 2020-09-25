// NOTES
///////////////////////////////////////////////////////////////////

// IMPORTS
///////////////////////////////////////////////////////////////////

import React, { useState, Dispatch, ReactEventHandler } from 'react';
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { TableGroup } from "../store/tableGroups/types";
import { 
  AllTableSelectValues, AllTableNames, AllBodyRollNames, SubtableDisplaySpecType,
  allTablesDisplaySpecsByBook, tableNamesByBooks,
  getKeysFromSelectValue
} from "../model/DataOut";
import { RootState, RootAction } from "../store";
import { selectTableGroupById } from '../store/tableGroups/selectors';
import { setTableGroup } from "../store/tableGroups/actions";
import { clearAndRepopulateTableSubtableGroup } from "../store/subtableGroups/actions";

import availableRolls from "../controlPanel/availableRolls.json";

import SubtableGroupComponent from "./SubtableGroupComponent";

// COMPONENTS & LOGIC
///////////////////////////////////////////////////////////////////

type TableGroupComponentProps = {
  tableGroupId: string;
  tableGroup?: TableGroup;
  setTableGroup?: (
    tableGroupId: string,
    selectedTable: AllTableSelectValues
    ) => void;
    
  addSubtables?: (tableGroup: TableGroup) => void;
  deleteTableGroup: (id: string) => void;
  // data: TableGroup;
  // removeThisRoll: (id: string) => void;
}

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
  
  const handleRollTable: ReactEventHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!initialized) {setInitialized(true);}

    if (selectedTable !== "none" && setTableGroup) {
      // console.log("setting table")
      setTableGroup(tableGroupId, selectedTable);

      // console.log("tableGroup is not undefined; setting tableGroup")
      // addSubtables(tableGroup);
    }
  }

  const getRandomValue = () => {}

  // console.log(tableGroup)

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
          onClick={() => deleteTableGroup(tableGroupId)}
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
  setTableGroup: (tableGroupId: string, selectedTable: AllTableSelectValues) => {
    const { bookKey, tableKey } = getKeysFromSelectValue(selectedTable);
    const listOfSubtableKeys = tableNamesByBooks[bookKey][tableKey] as AllBodyRollNames[];
    const mapOfSubtableDisplaySpecs = allTablesDisplaySpecsByBook[bookKey][tableKey]["body"]["main"];

    const subtableInfo = listOfSubtableKeys.map((subtableKey: AllBodyRollNames) => {
      const displaySpec = mapOfSubtableDisplaySpecs[subtableKey] as SubtableDisplaySpecType;
      // const bodyRollIdsForSubtable = [];
      // for (let i = 0; i < displaySpec.initialRollCount; i++) {
      //   bodyRollIdsForSubtable.push(uuidv4());
      // }
      return {
        id: uuidv4(),
        subtableKey: subtableKey as AllBodyRollNames,
        displaySpec: displaySpec,
        // bodyRollCollection: bodyRollIdsForSubtable
      }
    });
    const subtableIds = subtableInfo.map(({id}) => id);
    // const bodyRollIds = subtableInfo.map(({id, bodyRollCollection}) => ({id, bodyRollCollection}));

    dispatch(setTableGroup(tableGroupId, selectedTable, subtableIds));
    // dispatch, clear bodyRolls associated with tableGroupId
    dispatch(clearAndRepopulateTableSubtableGroup(tableGroupId, subtableInfo));
    
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TableGroupComponent);