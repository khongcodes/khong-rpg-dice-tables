// NOTES
///////////////////////////////////////////////////////////////////

// IMPORTS
///////////////////////////////////////////////////////////////////

import React, { useState } from 'react';

import { TableGroup } from "../model/TableGroup";

import availableRolls from "../controlPanel/availableRolls.json";

// COMPONENTS & LOGIC
///////////////////////////////////////////////////////////////////

type TableGroupComponentProps = {
  data: TableGroup;
  removeThisRoll: (id: string) => void;
}

const AvailableOptions = () => {
  const optGroupsFromAvailableRolls = [];

  for (let i = 0; i < availableRolls.bookNames.length; i++) {
    optGroupsFromAvailableRolls.push(
      <optgroup label={availableRolls.bookNames[i]}>
        {availableRolls.options[i].map(option => (
          <option value={option.selectValue}>
            {option.stringName}
          </option>
        ))}
      </optgroup>
    )
  }
  
  return ( <>{optGroupsFromAvailableRolls}</> );
}

const TableGroupComponent: React.FC<TableGroupComponentProps> = ({ data, removeThisRoll }) => {
  const [selectedTable, setSelectedTable] = useState<string>("none");
  const [initialized, setInitialized] = useState<boolean>(false);

  const handleSelectTable = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTable(event.target.value);
    console.log(event.target.value);
    // data.setTableName(event.target.value);
  };

  const handleRollTable = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInitialized(true);
    console.log(selectedTable)

    // Rolls the tablegroup
    data.setTableName(selectedTable);
  }
  
  return (
    <div>

      <form onSubmit={handleRollTable}>
        <input type="button" value="X" onClick={()=>removeThisRoll(data.id)} />

        <select value={selectedTable} onChange={handleSelectTable}>
          <option value="none">Select a table</option>
          <AvailableOptions />
        </select>

        <input 
          type="submit"
          value={!initialized ? "Roll" : "Reroll"}
          disabled={selectedTable === "none"}
        /> 
      </form>

    </div>
  )
}

export default TableGroupComponent