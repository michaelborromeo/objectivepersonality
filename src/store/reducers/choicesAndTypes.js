import getAllMatchLevels from '../../types/getAllMatchLevels';
import opData from '../../data/OpDataExploded';
import getCrossReferences from '../../types/crossReferences';

const initialState = getInitialState();

export default (state = initialState, action) => {
  switch (action.type) {
    case 'RESET':
      window.location.hash = '';

      return {
        choiceGroups: opData.choiceGroups,
        types: opData.types,
        choiceStates: {},
        matchLevels: {},
        crossReferences: {},
        encodedChoiceStates: ''
      };

    case 'SET_CHOICE_STATE':
      const choiceStates = state.choiceStates;

      if (!action.payload.state) {
        delete choiceStates[action.payload.choice];
      } else {
        choiceStates[action.payload.choice] = action.payload.state;
      }

      const encodedChoiceStates = btoa(JSON.stringify(choiceStates));
      window.location = `#${encodedChoiceStates}`;

      return {
        choiceGroups: state.choiceGroups,
        types: state.types,
        choiceStates,
        matchLevels: getAllMatchLevels(choiceStates, state.types),
        crossReferences: getCrossReferences(choiceStates, state.choiceGroups),
        encodedChoiceStates
      };

    default:
      return state
  }
}

function getInitialState() {
  const hashContent = getChoiceStatesFromHash();

  return {
    choiceGroups: opData.choiceGroups,
    types: opData.types,
    choiceStates: hashContent.choiceStates,
    matchLevels: getAllMatchLevels(hashContent.choiceStates, opData.types),
    crossReferences: getCrossReferences(hashContent.choiceStates, opData.choiceGroups),
    encodedChoiceStates: hashContent.hash
  };
}

function getChoiceStatesFromHash() {
  const hashContent = {
    hash: window.location.hash,
    choiceStates: {}
  };

  if (!hashContent.hash) {
    return hashContent;
  }

  try {
    hashContent.choiceStates = JSON.parse(atob(hashContent.hash.slice(1)));
  } catch (e) {
    console.error(e);
    hashContent.hash = '';
  }

  return hashContent;
}
