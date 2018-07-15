import _ from 'lodash';

const initialState = {
  selectedVideoId: '',
  videoIds: [],
  videos: {},
  player: null
};

try {
  const loadedState = JSON.parse(localStorage.getItem('videoTyping'));
  initialState.selectedVideoId = loadedState.selectedVideoId;
  initialState.videoIds = loadedState.videoIds;
  initialState.videos = loadedState.videos;
  console.info('Loaded videoTyping state from localStorage');
} catch (e) {
  console.info('Cannot load videoTyping state from localStorage');
}

export default (state = initialState, action) => {
  let videoId;
  let noteId;
  let selectedVideoId;
  let videos;
  let videoIds;
  let notes;
  let noteIndex;

  switch (action.type) {
    case 'ADD_VIDEO':
      videoId = action.payload.videoId;

      if (state.videoIds.includes(videoId)) {
        return {
          selectedVideoId: videoId,
          videoIds: state.videoIds,
          videos: state.videos,
          player: state.player
        };
      }

      selectedVideoId = videoId;
      videos = state.videos;
      videoIds = state.videoIds;

      videoIds.push(videoId);
      videos[videoId] = {
        id: videoId,
        // get the title from the LOAD_PLAYER action
        title: '',
        notes: []
      };

      return {
        selectedVideoId,
        videoIds,
        videos,
        player: state.player
      };

    case 'SELECT_VIDEO':
      videoId = action.payload.videoId;

      if (state.videoIds.includes(videoId)) {
        return {
          selectedVideoId: videoId,
          videoIds: state.videoIds,
          videos: state.videos,
          player: state.player
        };
      }

      // if the video doesn't exist then nothing changes
      return state;

    case 'SET_VIDEO_TITLE':
      videoId = action.payload.videoId;
      videos = _.clone(state.videos);
      const title = action.payload.title;

      if (!state.videoIds.includes(videoId)) {
        return state;
      }

      videos[videoId].title = title;

      return {
        selectedVideoId: state.selectedVideoId,
        videoIds: state.videoIds,
        videos,
        player: state.player
      };

    case 'DELETE_VIDEO':
      videoId = action.payload.videoId;
      videos = state.videos;
      videoIds = state.videoIds;

      if (videoIds.includes(videoId)) {
        _.remove(videoIds, value => value === videoId);
        delete videos[videoId];
        selectedVideoId = videoIds.length ? videoIds[0] : '';

        return {
          selectedVideoId,
          videoIds,
          videos,
          player: state.player
        };
      }

      // if the video doesn't exist then nothing changes
      return state;

    case 'ADD_NOTE':
      videoId = state.selectedVideoId;
      noteId = action.payload.noteId;
      videos = _.clone(state.videos);
      const seconds = action.payload.videoSeconds;
      const choice = action.payload.choice;

      const video = videos[videoId];
      video.notes.push({
        id: noteId,
        createdAt: _.now(),
        seconds,
        choice,
        state: 'S',
        note: ''
      });

      return {
        selectedVideoId: state.selectedVideoId,
        videoIds: state.videoIds,
        videos,
        player: state.player
      };

    case 'UPDATE_NOTE':
      videoId = state.selectedVideoId;
      noteId = action.payload.noteId;
      videos = _.clone(state.videos);
      const note = action.payload.note;
      const choiceState = action.payload.state;

      notes = videos[videoId].notes;
      noteIndex = _.findIndex(notes, note => note.id === noteId);
      notes[noteIndex].note = note;
      notes[noteIndex].state = choiceState;

      return {
        selectedVideoId: state.selectedVideoId,
        videoIds: state.videoIds,
        videos,
        player: state.player
      };

    case 'DELETE_NOTE':
      videoId = state.selectedVideoId;
      noteId = action.payload.noteId;
      videos = _.clone(state.videos);

      notes = videos[videoId].notes;
      noteIndex = _.findIndex(notes, note => note.id === noteId);
      notes.splice(noteIndex);

      return {
        selectedVideoId: state.selectedVideoId,
        videoIds: state.videoIds,
        videos,
        player: state.player
      };

    case 'LOAD_PLAYER':
      const player = action.payload.player;

      return {
        selectedVideoId: state.selectedVideoId,
        videoIds: state.videoIds,
        videos: state.videos,
        player
      };

    default:
      return state;
  }
}
