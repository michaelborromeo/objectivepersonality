const fs = require('fs');

const contents = JSON.parse(fs.readFileSync('OpChoices.json'));
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
    'Te/Se': ['PCS', 'PCB', 'PBS', 'PBC'],
};

const sexualEnergies = [
    { energy: 'MM', choices: ['Sensory-M', 'De-M'] },
    { energy: 'FM', choices: ['Sensory-F', 'De-M'] },
    { energy: 'MF', choices: ['Sensory-M', 'De-F'] },
    { energy: 'FF', choices: ['Sensory-F', 'De-F'] }
];

const newTypes = [];

for (let i = 0; i < contents.types.length; i++) {
    const type = contents.types[i].type;
    const animals = animalTransforms[type];

    const letters = getLetters(type);
    const temperment = getTemperment(type);
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
                choices: []
            };

            newType.choices = newType.choices.concat(leadNeeds);
            newType.choices = newType.choices.concat(middleNeeds);
            newType.choices = newType.choices.concat(chargedNeeds);
            newType.choices = newType.choices.concat(animalBreakdown);
            newType.choices = newType.choices.concat(letters);
            newType.choices = newType.choices.concat(temperment);
            newType.choices = newType.choices.concat(saviorsAndDemons);
            newType.choices = newType.choices.concat(energy.choices);

            newTypes.push(newType);
        }
    }
}

console.log(newTypes);
writeToFile(newTypes);

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

    if (letter1 === 'N' || letter1 === 'S') {
        if (ei1 === 'i') {
            return 'Oi';
        } else {
            return 'Oe';
        }
    } else {
        if (ei1 === 'i') {
            return 'Di';
        } else {
            return 'De';
        }
    }
}

function getLetters(type) {
    const letter1 = type[0];
    const letter2 = type[3];

    if (letter1 === 'N' || letter1 === 'S') {
        return letter1 + letter2;
    } else {
        return letter2 + letter1;
    }
}

function getTemperment(type) {
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

    fs.writeFile("./OpOutput.json", output, 'utf8', function(err) {
        if (err) {
            return console.log(err);
        }

        console.log('Output written to file.');
    });
}