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

export function addVideo(videoId) {
  return {
    type: 'ADD_VIDEO',
    payload: {
      videoId
    }
  };
}

export function selectVideo(videoId) {
  return {
    type: 'SELECT_VIDEO',
    payload: {
      videoId
    }
  };
}

export function deleteVideo(videoId) {
  return {
    type: 'DELETE_VIDEO',
    payload: {
      videoId
    }
  };
}

export function addNote(videoId, noteId, videoSeconds, choice) {
  return {
    type: 'ADD_NOTE',
    payload: {
      videoId,
      noteId,
      videoSeconds,
      choice
    }
  };
}

export function updateAddNote(noteId, note, state) {
  return {
    type: 'UPDATE_NOTE',
    payload: {
      noteId,
      note,
      state
    }
  };
}

export function deleteNote(videoId, noteId) {
  return {
    type: 'DELETE_NOTE',
    payload: {
      videoId,
      noteId
    }
  };
}

export function loadPlayer(videoId, player) {
  return {
    type: 'LOAD_PLAYER',
    payload: {
      videoId,
      player
    }
  };
}
