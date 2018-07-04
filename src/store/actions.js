export function setChoiceState(choice, state) {
  return {
    type: 'SET_CHOICE_STATE',
    payload: {
      choice,
      state
    }
  };
}

export function reset() {
  return {
    type: 'RESET'
  };
}
