import React, { Dispatch, useEffect } from 'react';
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { RootState, RootAction } from "../store/";
import { SubtableGroup } from "../store/subtableGroups/types";
import { selectSubtableGroupById } from "../store/subtableGroups/selectors";
import { addBodyRoll } from "../store/bodyRolls/actions";

type SubtableGroupComponentProps = {
  tableGroupId: string;
  subtableGroupId: string;
  subtableGroup?: SubtableGroup;

  initializeSubtableBodyRolls?: (subtableGroupId: string) => void;
};

const SubtableGroupComponent: React.FC<SubtableGroupComponentProps> = ({
  tableGroupId, subtableGroupId, subtableGroup,
  initializeSubtableBodyRolls
}) => {
  useEffect(
    () => {
      if (initializeSubtableBodyRolls) { initializeSubtableBodyRolls(subtableGroupId) }
    }
  ,[subtableGroupId])

  return (
    <div>
      <p>
        subtableGroupId: {subtableGroupId}<br/>
        name: {subtableGroup?.displaySpec.name}<br/>
        displaySpec: {subtableGroup?.displaySpec.format}
      </p>

      <button>delete all</button>
      <button>reroll all</button>
      <button>add bodyroll</button>


    </div>
  );
}

const mapStateToProps = (state: RootState, ownProps: SubtableGroupComponentProps) => {
  const { subtableGroupId } = ownProps;
  return {
    subtableGroup: selectSubtableGroupById(state, subtableGroupId)
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  initializeSubtableBodyRolls: (subtableGroupId: string) => {
    const newBodyRollId = uuidv4();
    dispatch(addBodyRoll(newBodyRollId, subtableGroupId));

    // the above makes one bodyroll
    // update the subtable
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SubtableGroupComponent);