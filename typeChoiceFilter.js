const sampleTypes = [{
    "type": "Fi/Ni SC/B MM",
    "choices": [
        "D",
        "OO",
        "Di",
        "S",
        "C",
        "B",
        "SC",
        "SC/B",
        "NF",
        "IxxP",
        "Fi-Savior",
        "Ni-Savior",
        "Te-Demon",
        "Sensing-M",
        "De-M"
    ]
}, {
    "type": "Se/Ti CS/B MF",
    "choices": [
        "O",
        "DD",
        "Oe",
        "C",
        "S",
        "B",
        "CS",
        "CS/B",
        "ST",
        "ExxP",
        "Se-Savior",
        "Ti-Savior",
        "Ni-Demon",
        "Sensing-M",
        "De-F"
    ]
}];

const sampleChoiceStates = {
    'Di': '?',
    'NF': '?'
}

function getMatchLevel(choiceStates, type) {
    let level = 100;

    for (let choice in choiceStates) {
        const state = choiceStates[choice];
        const multiplier = getMultiplierFromState(state);
        const derivedChoices = getDerivedChoices(choice, state);

        if (!typeHasDerivedChoice(type, derived)) {
            level = Math.max(0, level - (level * multiplier);
                // can short circuit and return if level === 0
            }
        }

        return level;
    }
}

function getMultiplierFromState(state) {
    if (state.length && state[state.length - 1] === '?') {
        return 0.5;
    } else {
        return 1;
    }
}

function getDerivedChoices(choice, state) {
    switch (choice) {
        case 'O':
        case 'D':
        case 'DD':
        case 'OO':
        case 'Di':
        case 'De':
        case 'Oi':
        case 'Oe':
        case 'IxxJ':
        case 'ExxP':
        case 'IxxP':
        case 'ExxJ':
        case 'De-F':
        case 'De-M':
        case 'Sensing-F':
        case 'Sensing-M':
            if (state === '?' || state === 'S' || state === 'S?') {
                return choice;
            } else {
                return null;
            }

        case 'S+C':
            if (state === '?' || state === 'S' || state === 'S?') {
                return ['SC', 'CS'];
            } else {
                return null;
            }

        case 'C+P':
            if (state === '?' || state === 'S' || state === 'S?') {
                return ['PC', 'CP'];
            } else {
                return null;
            }

        case 'B+S':
            if (state === '?' || state === 'S' || state === 'S?') {
                return ['BS', 'SB'];
            } else {
                return null;
            }

        case 'P+B':
            if (state === '?' || state === 'S' || state === 'S?') {
                return ['PB', 'BP'];
            } else {
                return null;
            }

        case 'Sleep':
            if (state === '?' || state === 'S' || state === 'S?') {
                return ['SC', 'SB', 'CS', 'BS'];
            } else if (state === 'S1' || state === 'S1?') {
                return ['SC', 'SB'];
            } else if (state === 'S2' || state === 'S2?') {
                return ['CS', 'BS'];
            } else if (state === '3' || state === '3?') {
                return ['CP/S', 'BP/S', 'PC/S', 'PB/S'];
            } else if (state === '4' || state === '4?') {
                return ['CP/B', 'BP/C', 'PC/B ', 'PB/C'];
            } else {
                return null;
            }

        case 'Play':
            if (state === '?' || state === 'S' || state === 'S?') {
                return ['PC', 'PB', 'BP', 'CP'];
            } else if (state === 'S1' || state === 'S1?') {
                return ['PC', 'PB'];
            } else if (state === 'S2' || state === 'S2?') {
                return ['BP', 'CP'];
            } else if (state === '3' || state === '3?') {
                return ['SC/P', 'SB/P', 'CS/P', 'BS/P'];
            } else if (state === '4' || state === '4?') {
                return ['SC/B', 'SB/C', 'CS/B', 'BS/C'];
            } else {
                return null;
            }

        case 'Consume':
            if (state === '?' || state === 'S' || state === 'S?') {
                return ['PC', 'PB', 'BP', 'CP'];
            } else if (state === 'S1' || state === 'S1?') {
                return ['PC', 'PB'];
            } else if (state === 'S2' || state === 'S2?') {
                return ['BP', 'CP'];
            } else if (state === '3' || state === '3?') {
                return ['SC/P', 'SB/P', 'CS/P', 'BS/P'];
            } else if (state === '4' || state === '4?') {
                return ['SC/B', 'SB/C', 'CS/B', 'BS/C'];
            } else {
                return null;
            }
        case 'Blast':

        case 'SF':
        case 'NT':
        case 'ST':
        case 'NF':
        case 'Fi':
        case 'Te':
        case 'Fe':
        case 'Ti':
        case 'Si':
        case 'Ne':
        case 'Se':
        case 'Ni':
            if (state === '?' || state === 'S' || state === 'S?') {
                return choice + '-Savior';
            } else if (state === 'D' || state === 'D?') {
                return choice + '-Demon';
            } else {
                return null;
            }

        default:
            return null;
    }
}