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
      const choiceStates = state.choiceStates;

      if (!action.payload.state) {
        delete choiceStates[action.payload.choice];
      } else {
        choiceStates[action.payload.choice] = action.payload.state;
      }

      return {
        choiceGroups: state.choiceGroups,
        types: state.types,
        choiceStates,
        matchLevels: getAllMatchLevels(choiceStates, state.types),
        crossReferences: getCrossReferences(choiceStates, state.choiceGroups)
      };

    default:
      return state
  }
}
