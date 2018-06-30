const fs = require('fs');
const getMatchLevel = require('./typeChoiceFilter');

const opData = JSON.parse(fs.readFileSync('./OpOutput.json'));

const sampleChoiceStates = {
    'Ti': 'S',
    'Sleep': 'S',
    'Se': 'S',
    'DD': 'S',
    'ExxP': 'S',
    'Sensing-M': 'S'
}

for (let i = 0; i < opData.types.length; i++) {
    const type = opData.types[i];
    const matchLevel = getMatchLevel(sampleChoiceStates, type);

    if (matchLevel === 100) {
        console.log(type.type);
    }
}
