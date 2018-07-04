const sampleChoiceStates = {
  'Ti': 'S',
  'Sleep': 'S',
  'Se': 'S',
  'DD': 'S',
  'ExxP': 'S',
  'Sensing-M': 'S'
};

export default function getCrossReferences(choiceStates, choiceGroups) {
  const crossReferenceGroups = {};

  for (let choice in choiceStates) {
    const state = choiceStates[choice];

    const crossReferences = findCrossReferences(choice, state, choiceGroups);

    crossReferenceGroups[choice] = {
      choice,
      state,
      crossReferences: crossReferences || {}
    };
  }

  return crossReferenceGroups;
}

export function getCrossReferencesForChoice(crossReferences, choice) {
  const results = [];

  for (let choiceKey in crossReferences) {
    const choiceCrossRefs = crossReferences[choiceKey].crossReferences;

    console.log(choiceCrossRefs)

    if (choiceCrossRefs[choice]) {
      const choiceState = choiceCrossRefs[choice];

      if (choiceState.length) {
        results.push(choice + ' (' + choiceState.join(', ') + ')');
      } else {
        results.push(choice + ' (' + choiceState + ')');
      }
    }

  }

  return results;
}

function findCrossReferences(choice, state, choiceGroups) {
  for (let i = 0; i < choiceGroups.length; i++) {
    const choiceGroup = choiceGroups[i];

    for (let j = 0; j < choiceGroup.choicePairs.length; j++) {
      const choicePair = choiceGroup.choicePairs[j];

      for (let k = 0; k < choicePair.length; k++) {
        const choicePairObj = choicePair[k];

        if (!choicePairObj.crossReferences) {
          continue;
        }

        if (choicePairObj.choice === choice) {
          return choicePairObj.crossReferences[getSimpleState(state)];
        }
      }
    }
  }

  return null;
}

function getSimpleState(state) {
  if (state === '?') {
    return 'S';
  } else if (state[state.length - 1] === '?') {
    return state.substr(0, state.length - 1);
  }

  return state;
}
