import _ from 'lodash';

const initialState = {
  selectedVideoId: '2g811Eo7K8U',
  videoIds: ['2g811Eo7K8U'],
  videos: {
    '2g811Eo7K8U': {
      id: '2g811Eo7K8U',
      title: 'Some YT Video',
      notes: [
        {
          id: '1234-1234-1234-1234',
          createdAt: '2018-07-12',
          seconds: 15,
          choice: 'OO',
          state: 'S',
          note: 'This is a clear example of a double observer!!!'
        },
        {
          id: '2345-2345-2345-2345',
          createdAt: '2018-07-12',
          seconds: 30,
          choice: 'D',
          state: 'S',
          note: 'This is a clear example of a single decider!!!'
        }
      ]
    }
  },
  player: null
};

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

      videoIds.push(selectedVideoId);
      videos[selectedVideoId] = {
        id: '2g811Eo7K8U',
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
      videoId = action.payload.videoId;
      noteId = action.payload.noteId;
      const seconds = action.payload.videoSeconds;
      const choice = action.payload.choice;

      if (!state.videoIds.includes(videoId)) {
        return state;
      }

      const video = state.videos[videoId];
      video.notes.push({
        id: noteId,
        createdAt: new Date(),
        seconds,
        choice,
        state: '',
        note: ''
      });

      return {
        selectedVideoId: state.selectedVideoId,
        videoIds: state.videoIds,
        videos,
        player: state.player
      };

    case 'UPDATE_NOTE':
      videoId = action.payload.videoId;
      noteId = action.payload.noteId;
      const note = action.payload.note;
      const choiceState = action.payload.state;

      if (!state.videoIds.includes(videoId)) {
        return state;
      }

      notes = state.videos[videoId].notes;
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
      videoId = action.payload.videoId;
      noteId = action.payload.noteId;

      if (!state.videoIds.includes(videoId)) {
        return state;
      }

      notes = state.videos[videoId].notes;
      noteIndex = _.findIndex(notes, note => note.id === noteId);
      delete notes[noteIndex];

      return {
        selectedVideoId: state.selectedVideoId,
        videoIds: state.videoIds,
        videos,
        player: state.player
      };

    case 'LOAD_PLAYER':
      return {
        selectedVideoId: state.selectedVideoId,
        videoIds: state.videoIds,
        videos: state.videos,
        player: action.payload.player
      };

    default:
      return state;
  }
}
