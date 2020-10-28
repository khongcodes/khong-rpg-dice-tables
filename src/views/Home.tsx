///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                          NOTES

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                        IMPORTS
// 1. React & packages
// 2. REDUX: Store types
// 3. REDUX: Selectors
// 4. REDUX: Actions
// 5. Components
// 6. Styles

import React, { Dispatch } from 'react';
import { connect } from "react-redux";

import { RootState, RootAction } from "../store";

import { selectTableGroupIds } from "../store/tableGroups/selectors";

import { addTableGroup, deleteTableGroup } from '../store/tableGroups/actions';
import { deleteByTableGroupSubtableGroup } from "../store/subtableGroups/actions";
import { deleteByTableGroupBodyRoll } from "../store/bodyRolls/actions";

import TableGroupComponent from "../components/TableGroupComponent";

import homeStyles from "../assets/styles/views/Home.module.sass"

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                                          SETUP

type HomeProps = {
  showIds: boolean;
  tableGroupIds: string[];
  addTableGroup: () => void;
  deleteTableGroup: (id: string) => void;
}

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////                                                             COMPONENTS & LOGIC

const Home: React.FC<HomeProps> = ({ 
  showIds,
  tableGroupIds,
  addTableGroup, deleteTableGroup
}) => {

  const handleAddTableGroup = () => addTableGroup();
  const handleDeleteTableGroup = (id: string) => deleteTableGroup(id);

  return (
    <div id={homeStyles.homeRoot}>
      <div>
        {
          tableGroupIds.map(tableGroupId => (
            <TableGroupComponent 
              key={tableGroupId}
              tableGroupId={tableGroupId}
              deleteTableGroup={handleDeleteTableGroup}
              showIds={showIds}
            />
          )
        )}
      </div>

      <div>
        <button onClick={() => handleAddTableGroup()}>
          Add dice table
        </button>
      </div>
    </div>
  )
};

const mapStateToProps = (state: RootState) => ({
  tableGroupIds: selectTableGroupIds(state)
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  addTableGroup: () => dispatch(addTableGroup()),
  deleteTableGroup: (id: string) => {
    dispatch(deleteByTableGroupBodyRoll(id));
    dispatch(deleteByTableGroupSubtableGroup(id));
    dispatch(deleteTableGroup(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);