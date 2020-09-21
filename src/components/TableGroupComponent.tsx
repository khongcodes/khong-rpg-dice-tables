// NOTES
///////////////////////////////////////////////////////////////////

// IMPORTS
///////////////////////////////////////////////////////////////////

import React, { useState, Dispatch } from 'react';
import { connect } from "react-redux";

import { TableGroup } from "../store/tableGroups/types";
import { RootState, RootAction } from "../store"

import availableRolls from "../controlPanel/availableRolls.json";
import { selectTableGroupById } from '../store/tableGroups/selectors';
import { deleteTableGroup } from '../store/tableGroups/actions';

// COMPONENTS & LOGIC
///////////////////////////////////////////////////////////////////

type TableGroupComponentProps = {
  tableGroupId: string;
  deleteTableGroup: (id: string) => void;
  tableGroup?: TableGroup;
  // data: TableGroup;
  // removeThisRoll: (id: string) => void;
}

const AvailableOptions = () => {
  const optGroupsFromAvailableRolls = [];

  for (let i = 0; i < availableRolls.bookNames.length; i++) {
    optGroupsFromAvailableRolls.push(
      <optgroup label={availableRolls.bookNames[i]}>
        {availableRolls.options[i].map(option => (
          <option value={option.selectValue} key={option.selectValue}>
            {option.stringName}
          </option>
        ))}
      </optgroup>
    )
  }
  
  return ( <>{optGroupsFromAvailableRolls}</> );
}

// const TableGroupComponent: React.FC<TableGroupComponentProps> = ({ data, removeThisRoll }) => {
  // const [selectedTable, setSelectedTable] = useState<string>("none");
  // const [initialized, setInitialized] = useState<boolean>(false);

//   const handleSelectTable = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedTable(event.target.value);
//     console.log(event.target.value);
//     // data.setTableName(event.target.value);
//   };

//   const handleRollTable = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setInitialized(true);
//     console.log(selectedTable)

//     // Rolls the tablegroup
//     // data.setTableName(selectedTable);
//   }
  
//   return (
//     <div>

//       <form onSubmit={handleRollTable}>
//         <input type="button" value="X" onClick={()=>removeThisRoll(data.id)} />

//         <select value={selectedTable} onChange={handleSelectTable}>
//           <option value="none">Select a table</option>
//           <AvailableOptions />
//         </select>

//         <input 
//           type="submit"
//           value={!initialized ? "Roll" : "Reroll"}
//           disabled={selectedTable === "none"}
//         /> 
//       </form>

//     </div>
//   )
// }

const TableGroupComponent: React.FC<TableGroupComponentProps> = ({ tableGroupId, tableGroup, deleteTableGroup }) => {
  const [selectedTable, setSelectedTable] = useState<string>("none");
  const [initialized, setInitialized] = useState<boolean>(false);

  console.log(tableGroup)

  return (
    <div>
      id: {tableGroupId}

      {/* <form>
        <input 
          type="button"
          value="X"
          onClick={() => deleteTableGroup(tableGroupId)}
        />

        <input 
          type="submit"
          value={ !initialized ? "Roll" : "Reroll" }
          disabled={ selectedTable === "none" }
        />
        
      </form> */}
      
    </div>
  )
}

const mapStateToProps = (state: RootState, ownProps: TableGroupComponentProps) => {
  const { tableGroupId } = ownProps;
  return { tableGroup: selectTableGroupById(state, tableGroupId) }
}

export default connect(mapStateToProps)(TableGroupComponent)