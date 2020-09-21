// NOTES
///////////////////////////////////////////////////////////////////
// Store state in session from App component


// IMPORTS
///////////////////////////////////////////////////////////////////
// 1. React

import React, { Dispatch } from 'react';
import { connect } from "react-redux";

import { tableGroupsSelector } from "../store/tableGroups/selectors";

import { TableGroup, TableGroupsState } from "../store/tableGroups/types";
import { RootState, RootAction } from "../store";

import TableRollComponent from "../components/TableGroupComponent";
import { addTableGroup } from '../store/tableGroups/actions';
// import { AddRollButton } from "../components/Buttons";


// SETUP
///////////////////////////////////////////////////////////////////

type HomeProps = {
  addTableGroup?: () => void;
}

// COMPONENTS & LOGIC
///////////////////////////////////////////////////////////////////

const Home: React.FC<HomeProps> = ({addTableGroup}) => {

  const handleAddTableGroup = () => {
    if (addTableGroup) {
      console.log("adding");
      addTableGroup();
    }
  }

  return (
    <div>
      <div>
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

// const mapStateToProps = (state: RootState) => {
//   return { tableGroups: tableGroupsSelector(state) };
// }

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  addTableGroup: () => dispatch(addTableGroup()),
})

export default connect(undefined, mapDispatchToProps)(Home);