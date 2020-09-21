// NOTES
///////////////////////////////////////////////////////////////////
// Store state in session from App component


// IMPORTS
///////////////////////////////////////////////////////////////////
// 1. React

import React, { Dispatch } from 'react';
import { connect } from "react-redux";

import { selectTableGroupIds } from "../store/tableGroups/selectors";

import { TableGroup, TableGroupsState } from "../store/tableGroups/types";
import { RootState, RootAction } from "../store";

import TableRollComponent from "../components/TableGroupComponent";
import { addTableGroup, deleteTableGroup } from '../store/tableGroups/actions';
// import { AddRollButton } from "../components/Buttons";


// SETUP
///////////////////////////////////////////////////////////////////

type HomeProps = {
  addTableGroup: () => void;
  deleteTableGroup: (id: string) => void;
  tableGroupIds: string[];
}

// COMPONENTS & LOGIC
///////////////////////////////////////////////////////////////////

const Home: React.FC<HomeProps> = ({ 
  tableGroupIds, 
  addTableGroup, deleteTableGroup
}) => {

  const handleAddTableGroup = () => {
    // if (addTableGroup) {
      console.log("adding");
      addTableGroup();
    // }
  }

  const handleDeleteTableGroup = (id: string) => {
    // if (deleteTableGroup) {
      console.log("deleting");
      deleteTableGroup(id);
    // }
  }

  return (
    <div>
      <div>
        {
          tableGroupIds.map(tableGroupId => (
            <TableRollComponent 
              key={tableGroupId}
              tableGroupId={tableGroupId}
              deleteTableGroup={handleDeleteTableGroup}
            />
          )
        )}
        {/* {
          rolls.length === 0 ? <></> : 
            (rolls as TableGroup[]).map(roll => 
              <TableRollComponent 
                key={roll.id}
                data={roll}
                removeThisRoll={removeThisRoll}
              />
            ) 
        } */}
      </div>

      <div>
        <button onClick={() => handleAddTableGroup()}>
          Add tableGroup
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = (state: RootState) => {
  return { tableGroupIds: selectTableGroupIds(state) };
}

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  addTableGroup: () => dispatch(addTableGroup()),
  deleteTableGroup: (id: string) => dispatch(deleteTableGroup(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);