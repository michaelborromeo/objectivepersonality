import _ from 'lodash';

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
    if (!choiceStates.hasOwnProperty(choice)) {
      continue;
    }

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
    if (!crossReferences.hasOwnProperty(choiceKey)) {
      continue;
    }

    const choiceKeyState = crossReferences[choiceKey].state;
    const choiceCrossRefs = crossReferences[choiceKey].crossReferences;

    if (choiceCrossRefs[choice]) {
      const choiceState = choiceCrossRefs[choice];

      if (_.isArray(choiceState)) {
        results.push(`${choiceKey}${formatSaviorDemonState(choiceKeyState)}→${choice} (${choiceState.join(', ')})`);
      } else {
        if (isSavior(choiceState)) {
          results.push(`${choiceKey}${formatSaviorDemonState(choiceKeyState)}`);
        } else {
          results.push(`${choiceKey}${formatSaviorDemonState(choiceKeyState)}→${choice}${formatSaviorDemonState(choiceState)}`);
        }
      }
    }
  }

  return results;
}

function formatSaviorDemonState(state) {
  if (isSavior(state)) {
    return '';
  }

  return ` (${state})`;
}

function isSavior(state) {
  return state === '?' || state === 'S?' || state === 'S';
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
