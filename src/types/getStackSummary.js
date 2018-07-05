export default function getStackSummary(type) {
  const savior1 = type[0] + type[1];
  const savior2 = type[3] + type[4];
  const activated1 = getOppositeFunction(savior2);
  const demon = getOppositeFunction(savior1);
  const sensoryModality = type[11];
  const deciderModality = type[12];
  // check for jumper
  const jumper = savior1[1] === savior2[1];

  const animal1 = type[6];
  const animal2 = type[7];
  const animal3 = type[9];
  const animal4 = getMissingAnimal(animal1, animal2, animal3);
  const animalJumper = isAnimalJumper(animal1, animal4);

  const animalOrder = [
    animal1,
    animal2,
    animalJumper ? animal4 : animal3,
    animalJumper ? animal3 : animal4,
  ];

  const animals = [{
    animal: animalOrder[0],
    usage: 'S1'
  }, {
    animal: animalOrder[1],
    usage: 'S2'
  }, {
    animal: animalOrder[2],
    usage: animalJumper ? '-' : 'A'
  }, {
    animal: animalOrder[3],
    usage: animalJumper ? 'A' : '-'
  }];

  const functionOrder = [
    savior1,
    jumper ? activated1 : savior2,
    jumper ? savior2 : activated1,
    demon
  ];

  const functions = [{
    func: functionOrder[0],
    usage: 'S1',
    sex: getFunctionModality(functionOrder[0], sensoryModality, deciderModality),
    activations: getActivations(functionOrder[0], animal1, animal2, animal3)
  }, {
    func: functionOrder[1],
    usage: jumper ? 'A' : 'S2',
    sex: getFunctionModality(functionOrder[1], sensoryModality, deciderModality),
    activations: getActivations(functionOrder[1], animal1, animal2, animal3)
  }, {
    func: functionOrder[2],
    usage: jumper ? 'S2' : 'A',
    sex: getFunctionModality(functionOrder[2], sensoryModality, deciderModality),
    activations: getActivations(functionOrder[2], animal1, animal2, animal3)
  }, {
    func: functionOrder[3],
    usage: '-',
    sex: getFunctionModality(functionOrder[3], sensoryModality, deciderModality),
    activations: getActivations(functionOrder[3], animal1, animal2, animal3)
  }];


  return { functions, animals };
}

function getMissingAnimal(animal1, animal2, animal3) {
  if (animal1 !== 'S' && animal2 !== 'S' && animal3 !== 'S') {
    return 'S';
  } else if (animal1 !== 'P' && animal2 !== 'P' && animal3 !== 'P') {
    return 'P';
  } else if (animal1 !== 'B' && animal2 !== 'B' && animal3 !== 'B') {
    return 'B';
  } else if (animal1 !== 'C' && animal2 !== 'C' && animal3 !== 'C') {
    return 'C';
  }
  return '';
}

function getOppositeFunction(func) {
  if (func === 'Ni') {
    return 'Se';
  } else if (func === 'Se') {
    return 'Ni';
  } else if (func === 'Si') {
    return 'Ne';
  } else if (func === 'Ne') {
    return 'Si';
  } else if (func === 'Te') {
    return 'Fi';
  } else if (func === 'Fi') {
    return 'Te';
  } else if (func === 'Fe') {
    return 'Ti';
  } else if (func === 'Ti') {
    return 'Fe';
  }
}

function getFunctionModality(func, sensoryModality, deciderModality) {
  if (func[0] === 'S') {
    return sensoryModality;
  } else if (func[0] === 'N') {
    return sensoryModality === 'M' ? 'F' : 'M';
  } else if (func[0] === 'T' || func[0] === 'F') {
    if (func[1] === 'e') {
      return deciderModality;
    } else {
      return deciderModality === 'M' ? 'F' : 'M';
    }
  }

  return '';
}

function getActivations(func, animal1, animal2, animal3) {
  const activationMap = {
    'C': ['Se', 'Ne', 'Ti', 'Fi'],
    'P': ['Se', 'Ne', 'Te', 'Fe'],
    'B': ['Si', 'Ni', 'Te', 'Fe'],
    'S': ['Si', 'Ni', 'Ti', 'Fi']
  };

  let activations = 0;
  if (activationMap[animal1].includes(func)) {
    activations++;
  }
  if (activationMap[animal2].includes(func)) {
    activations++;
  }
  if (activationMap[animal3].includes(func)) {
    activations++;
  }

  return activations;
}

function isAnimalJumper(animal1, animal4) {
  if (animal1 === 'P' && animal4 !== 'S') {
    return true;
  } else if (animal1 === 'B' && animal4 !== 'C') {
    return true;
  } else if (animal1 === 'C' && animal4 !== 'B') {
    return true;
  } else if (animal1 === 'S' && animal4 !== 'P') {
    return true;
  }

  return false;
}
