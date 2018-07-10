const fs = require('fs');
const path = require('path');

const types = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/input/OpTypes.json')));
const choiceGroups = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/input/OpChoices.json')));

const animalTransforms = {
  'Fi/Ni': ['SCB', 'SCP', 'SBC', 'SBP'],
  'Fi/Si': ['SCB', 'SCP', 'SBC', 'SBP'],
  'Ni/Fi': ['SCB', 'SCP', 'SBC', 'SBP'],
  'Ni/Ti': ['SCB', 'SCP', 'SBC', 'SBP'],
  'Si/Fi': ['SCB', 'SCP', 'SBC', 'SBP'],
  'Si/Ti': ['SCB', 'SCP', 'SBC', 'SBP'],
  'Ti/Ni': ['SCB', 'SCP', 'SBC', 'SBP'],
  'Ti/Si': ['SCB', 'SCP', 'SBC', 'SBP'],
  'Fi/Ne': ['CSB', 'CSP', 'CPS', 'CPB'],
  'Fi/Se': ['CSB', 'CSP', 'CPS', 'CPB'],
  'Ti/Ne': ['CSB', 'CSP', 'CPS', 'CPB'],
  'Ti/Se': ['CSB', 'CSP', 'CPS', 'CPB'],
  'Ne/Fi': ['CSB', 'CSP', 'CPS', 'CPB'],
  'Ne/Ti': ['CSB', 'CSP', 'CPS', 'CPB'],
  'Se/Fi': ['CSB', 'CSP', 'CPS', 'CPB'],
  'Se/Ti': ['CSB', 'CSP', 'CPS', 'CPB'],
  'Ni/Fe': ['BSC', 'BSP', 'BPS', 'BPC'],
  'Ni/Te': ['BSC', 'BSP', 'BPS', 'BPC'],
  'Si/Fe': ['BSC', 'BSP', 'BPS', 'BPC'],
  'Si/Te': ['BSC', 'BSP', 'BPS', 'BPC'],
  'Fe/Ni': ['BSC', 'BSP', 'BPS', 'BPC'],
  'Fe/Si': ['BSC', 'BSP', 'BPS', 'BPC'],
  'Te/Ni': ['BSC', 'BSP', 'BPS', 'BPC'],
  'Te/Si': ['BSC', 'BSP', 'BPS', 'BPC'],
  'Fe/Ne': ['PCS', 'PCB', 'PBS', 'PBC'],
  'Fe/Se': ['PCS', 'PCB', 'PBS', 'PBC'],
  'Ne/Fe': ['PCS', 'PCB', 'PBS', 'PBC'],
  'Ne/Te': ['PCS', 'PCB', 'PBS', 'PBC'],
  'Se/Fe': ['PCS', 'PCB', 'PBS', 'PBC'],
  'Se/Te': ['PCS', 'PCB', 'PBS', 'PBC'],
  'Te/Ne': ['PCS', 'PCB', 'PBS', 'PBC'],
  'Te/Se': ['PCS', 'PCB', 'PBS', 'PBC']
};

const sexualEnergies = [
  {energy: 'MM', choices: ['Sensing-M', 'De-M']},
  {energy: 'FM', choices: ['Sensing-F', 'De-M']},
  {energy: 'MF', choices: ['Sensing-M', 'De-F']},
  {energy: 'FF', choices: ['Sensing-F', 'De-F']}
];

explodeTypes();

function explodeTypes() {
  const newTypes = [];

  for (let i = 0; i < types.length; i++) {
    const type = types[i];
    const animals = animalTransforms[type];

    const letters = getLetters(type);
    const temperament = getTemperament(type);
    const saviorsAndDemons = getSaviorsAndDemons(type);
    const leadNeeds = getLeadNeeds(type);
    const middleNeeds = getMiddleNeeds(type);
    const chargedNeeds = getChargedNeeds(type);

    for (let j = 0; j < animals.length; j++) {
      const animal = animals[j];
      const animalBreakdown = getAnimalBreakdown(animal);

      for (let k = 0; k < sexualEnergies.length; k++) {
        const energy = sexualEnergies[k];

        const newType = {
          type: type + ' ' + formatAnimal(animal) + ' ' + energy.energy,
          derivedChoices: []
        };

        newType.derivedChoices = newType.derivedChoices.concat(leadNeeds);
        newType.derivedChoices = newType.derivedChoices.concat(middleNeeds);
        newType.derivedChoices = newType.derivedChoices.concat(chargedNeeds);
        newType.derivedChoices = newType.derivedChoices.concat(animalBreakdown);
        newType.derivedChoices = newType.derivedChoices.concat(letters);
        newType.derivedChoices = newType.derivedChoices.concat(temperament);
        newType.derivedChoices = newType.derivedChoices.concat(saviorsAndDemons);
        newType.derivedChoices = newType.derivedChoices.concat(energy.choices);

        newTypes.push(newType);
      }
    }
  }

  const output = {
    choiceGroups: choiceGroups.choiceGroups,
    types: newTypes
  };

  console.log(output);
  writeToFile(output);
}

function formatAnimal(animal) {
  return animal[0] + animal[1] + '/' + animal[2];
}

function getLeadNeeds(type) {
  const letter1 = type[0];
  const ei1 = type[1];
  const letter2 = type[3];
  const ei2 = type[4];

  if (letter1 === 'N' || letter1 === 'S') {
    return 'O';
  } else {
    return 'D'
  }
}

function getMiddleNeeds(type) {
  const letter1 = type[0];
  const ei1 = type[1];
  const letter2 = type[3];
  const ei2 = type[4];

  if (letter1 === 'N' || letter1 === 'S') {
    return 'DD';
  } else {
    return 'OO'
  }
}

function getChargedNeeds(type) {
  const letter1 = type[0];
  const ei1 = type[1];
  const letter2 = type[3];
  const ei2 = type[4];

  const chargedNeeds = [];
  chargedNeeds.push(getChargedNeed(letter1, ei1) + '-Savior');
  chargedNeeds.push(getChargedNeed(letter2, ei2) + '-Savior');

  return chargedNeeds;
}

function getChargedNeed(letter, ei) {
  if (letter === 'N' || letter === 'S') {
    if (ei === 'i') {
      return 'Oi';
    } else {
      return 'Oe';
    }
  } else {
    if (ei === 'i') {
      return 'Di';
    } else {
      return 'De';
    }
  }
}

function getLetters(type) {
  const letter1 = type[0];
  const letter2 = type[3];

  let saviorLetters;
  let demonLetters;

  if (letter1 === 'N' || letter1 === 'S') {
    saviorLetters = letter1 + letter2;
  } else {
    saviorLetters = letter2 + letter1;
  }

  if (saviorLetters === 'NT') {
    demonLetters = 'SF';
  } else if (saviorLetters === 'SF') {
    demonLetters = 'NT';
  } else if (saviorLetters === 'ST') {
    demonLetters = 'NF';
  } else if (saviorLetters === 'NF') {
    demonLetters = 'ST';
  }

  return [saviorLetters + '-Savior', demonLetters + '-Demon'];
}

function getTemperament(type) {
  const letter1 = type[0];
  const ei1 = type[1];
  const letter2 = type[3];
  const ei2 = type[4];

  if (letter1 === 'N' || letter1 === 'S') {
    if (ei1 === 'i') {
      return 'IxxJ';
    } else {
      return 'ExxP';
    }
  } else {
    if (ei1 === 'i') {
      return 'IxxP';
    } else {
      return 'ExxJ';
    }
  }
}

function getSaviorsAndDemons(type) {
  const savior1 = type[0] + type[1];
  const savior2 = type[3] + type[4];

  let demon;

  if (savior1 === 'Ni') {
    demon = 'Se';
  } else if (savior1 === 'Se') {
    demon = 'Ni';
  } else if (savior1 === 'Si') {
    demon = 'Ne';
  } else if (savior1 === 'Ne') {
    demon = 'Si';
  } else if (savior1 === 'Te') {
    demon = 'Fi';
  } else if (savior1 === 'Fi') {
    demon = 'Te';
  } else if (savior1 === 'Fe') {
    demon = 'Ti';
  } else if (savior1 === 'Ti') {
    demon = 'Fe';
  }

  return [savior1 + '-Savior', savior2 + '-Savior', demon + '-Demon'];
}

function getAnimalBreakdown(animal) {
  const animal1 = animal[0];
  const animal2 = animal[1];
  const animal3 = animal[2];

  return [animal1, animal2, animal3, animal1 + animal2, animal1 + animal2 + '/' + animal3];
}

function writeToFile(content) {
  const output = JSON.stringify(content, null, ' ');

  fs.writeFile(path.join(__dirname, '../data/output/OpCombinedAndExploded.json'), output, 'utf8', function (err) {
    if (err) {
      return console.log(err);
    }

    console.log('Output written to file.');
  });
}
