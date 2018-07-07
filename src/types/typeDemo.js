const fs = require('fs');
const path = require('path');

const getMatchLevel = require('./getAllMatchLevels');
const getCrossReferences = require('./crossReferences');

const opData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/output/OpCombinedAndExploded.json')));

const sampleChoiceStates = {
  'Ti': 'S',
  'Sleep': 'S',
  'Se': 'S',
  'DD': 'S',
  'ExxP': 'S',
  'Sensing-M': 'S'
};

console.log(JSON.stringify(getCrossReferences(sampleChoiceStates), ' ', ' '));

for (let i = 0; i < opData.types.length; i++) {
  const type = opData.types[i];
  const matchLevel = getMatchLevel(sampleChoiceStates, type);

  if (matchLevel === 100) {
    console.log(type.type);
  }
}
