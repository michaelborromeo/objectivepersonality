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

export function setVideoTitle(videoId, title) {
  return {
    type: 'SET_VIDEO_TITLE',
    payload: {
      videoId,
      title
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

export function addNote(noteId, videoSeconds, choice) {
  return {
    type: 'ADD_NOTE',
    payload: {
      noteId,
      videoSeconds,
      choice
    }
  };
}

export function updateNote(noteId, note, state) {
  return {
    type: 'UPDATE_NOTE',
    payload: {
      noteId,
      note,
      state
    }
  };
}

export function deleteNote(noteId) {
  return {
    type: 'DELETE_NOTE',
    payload: {
      noteId
    }
  };
}

export function loadPlayer(player) {
  return {
    type: 'LOAD_PLAYER',
    payload: {
      player
    }
  };
}
