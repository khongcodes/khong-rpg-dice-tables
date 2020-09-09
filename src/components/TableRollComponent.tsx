// NOTES
///////////////////////////////////////////////////////////////////

// IMPORTS
///////////////////////////////////////////////////////////////////

import React, { useState } from 'react';

import { TableRoll } from "../model/TableRoll";


// COMPONENTS & LOGIC
///////////////////////////////////////////////////////////////////

type TableRollComponentProps = {
  data: TableRoll;
  removeThisRoll: (id: string) => void;
}

const TableRollComponent: React.FC<TableRollComponentProps> = ({ data, removeThisRoll }) => {
  const [selectedTable, setSelectedTable] = useState<string>("none");

  const handleSelectTable = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTable(event.target.value);
    data.setType(event.target.value);
  };

  const handleRollTable = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(selectedTable)
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

        <input type="submit" value="Roll"/> 
      </form>

    </div>
  )
}

export default TableRollComponent