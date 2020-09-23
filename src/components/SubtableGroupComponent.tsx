import React, { Dispatch } from 'react';
import { connect } from "react-redux";

import { RootState, RootAction } from "../store/";
import { SubtableGroup } from "../store/subtableGroups/types";
import { selectSubtableGroupById } from "../store/subtableGroups/selectors";

type SubtableGroupComponentProps = {
  tableGroupId: string;
  subtableGroupId: string;
  subtableGroup?: SubtableGroup;
};

const SubtableGroupComponent: React.FC<SubtableGroupComponentProps> = ({
  tableGroupId, subtableGroupId, subtableGroup
}) => {
  return (
    <div>
      <p>
        subtableGroupId: {subtableGroupId}<br/>
        name: {subtableGroup?.displaySpec.name}
      </p>
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

})

export default connect(mapStateToProps)(SubtableGroupComponent);