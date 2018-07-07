import getAllMatchLevels from '../../types/getAllMatchLevels';
import opData from '../../data/output/OpCombinedAndExploded.json';
import getCrossReferences from '../../types/crossReferences';

const initialState = getInitialState();

export default (state = initialState, action) => {
  let matchLevels;

  switch (action.type) {
    case 'RESET':
      window.location.hash = '';

      matchLevels = getAllMatchLevels({}, opData.types);

      return {
        choiceGroups: opData.choiceGroups,
        types: opData.types,
        choiceStates: {},
        matchLevels,
        crossReferences: {},
        matchedTypes: getMatchedTypes(opData.types, matchLevels),
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

      matchLevels = getAllMatchLevels(choiceStates, state.types);

      return {
        choiceGroups: state.choiceGroups,
        types: state.types,
        choiceStates,
        matchLevels,
        crossReferences: getCrossReferences(choiceStates, state.choiceGroups),
        matchedTypes: getMatchedTypes(state.types, matchLevels),
        encodedChoiceStates
      };

    default:
      return state
  }
}

function getMatchedTypes(types, matchLevels) {
  const matches = [];

  for (let i = 0; i < types.length; i++) {
    const type = types[i].type;
    if (matchLevels[type] === 100) {
      matches.push(type);
    }
  }

  return matches;
}

function getInitialState() {
  const hashContent = getChoiceStatesFromHash();
  const matchLevels = getAllMatchLevels(hashContent.choiceStates, opData.types);

  return {
    choiceGroups: opData.choiceGroups,
    types: opData.types,
    choiceStates: hashContent.choiceStates,
    matchLevels,
    crossReferences: getCrossReferences(hashContent.choiceStates, opData.choiceGroups),
    matchedTypes: getMatchedTypes(opData.types, matchLevels),
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
