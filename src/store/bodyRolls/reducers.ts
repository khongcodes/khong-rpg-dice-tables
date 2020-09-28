import {
  BodyRoll, BodyRollsState, BodyRollActionTypes, 
  ADD_BODYROLL,
  SET_BODYROLL,
  DELETE_BODYROLL,
  DELETEBYTABLEGROUP_BODYROLL,
  DELETEBYSUBTABLEGROUP_BODYROLL,
  ERROR_BODYROLL
} from "./types"


const initialState = {
  byId: {},
  allIds: []
} as BodyRollsState;


const removeBodyRollsBy = (
  state = initialState,
  key: "tableGroupId" | "subtableGroupId",
  suppliedId: string
) => {
  const newByIdState = {...state.byId};
  const bodyRollIdsByKey = state.allIds.filter(bodyRollId => state.byId[bodyRollId][key] === suppliedId);
  for (let i = 0; i < bodyRollIdsByKey.length; i++){
    delete newByIdState[bodyRollIdsByKey[i]];
  }
  return {
    byId: newByIdState,
    allIds: state.allIds.filter(bodyRollId => !bodyRollIdsByKey.includes(bodyRollId))
  }
}


export function bodyRollsReducer(
  state = initialState,
  action: BodyRollActionTypes
): BodyRollsState {

  switch (action.type) {
    case ADD_BODYROLL:
      return {
        byId: Object.assign({}, state.byId, {
          [action.payload.id]: {
            id: action.payload.id,
            tableGroupId: action.payload.tableGroupId,
            subtableGroupId: action.payload.subtableGroupId,
            value: action.payload.value
          }
        }),
        allIds: [...state.allIds, action.payload.id]
      };

    case SET_BODYROLL:
      return {
        byId: Object.assign({}, state.byId, {
          [action.payload.id]: {
            ...state.byId[action.payload.id],
            value: action.payload.value
          }
        }),
        allIds: [...state.allIds]
      }

    case DELETE_BODYROLL: 
      const {[action.payload.id]: throwAwayValue, ...newStateWithoutRollById} = state.byId;
      return {
        byId: newStateWithoutRollById,
        allIds: state.allIds.filter(id => id !== action.payload.id)
      };

    case DELETEBYTABLEGROUP_BODYROLL:
      return removeBodyRollsBy(state, "tableGroupId", action.payload.tableGroupId);

    case DELETEBYSUBTABLEGROUP_BODYROLL:
      return removeBodyRollsBy(state, "subtableGroupId", action.payload.subtableGroupId);
    

    case ERROR_BODYROLL:
      console.log("action.payload:");
      console.log(action.payload);
      return state;

      
    default:
      return state;
  }
}