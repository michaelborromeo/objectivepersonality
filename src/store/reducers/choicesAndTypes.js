import getAllMatchLevels from '../../types/getAllMatchLevels';
import opData from '../../data/OpOutput';
import getCrossReferences from '../../types/crossReferences';

const initialState = {
  choiceGroups: opData.choiceGroups,
  types: opData.types,
  choiceStates: {},
  matchLevels: {},
  crossReferences: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'RESET':
      return initialState;

    case 'SET_CHOICE_STATE':
      state.choiceStates[action.payload.choice] = action.payload.state;
      state.matchLevels = getAllMatchLevels(state.choiceStates, state.types);
      state.crossReferences = getCrossReferences(state.choiceStates, state.choiceGroups);

      return state;

    default:
      return state
  }
}
