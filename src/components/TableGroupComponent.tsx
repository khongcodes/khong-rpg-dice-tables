// NOTES
///////////////////////////////////////////////////////////////////

// IMPORTS
///////////////////////////////////////////////////////////////////

import React, { useState } from 'react';

import { TableGroup } from "../model/TableGroup";


// COMPONENTS & LOGIC
///////////////////////////////////////////////////////////////////

type TableGroupComponentProps = {
  data: TableGroup;
  removeThisRoll: (id: string) => void;
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

          <optgroup label="LANCER">
            <option value="lancer-iterativeWorld">LANCER - Iterative World</option>
          </optgroup>

          <optgroup label="Mothership RPG">
            <option value="mothership-trinketsPatches">Mothership - Trinkets & Patches</option>
            <option value="mothership-spaceStationCorespace">Mothership - Space Station (Corespace)</option>
            <option value="mothership-spaceStationRimspace">Mothership - Space Station (Rimspace)</option>
            <option value="mothership-derelictShip">Mothership - Derelict Ship</option>
          </optgroup>
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