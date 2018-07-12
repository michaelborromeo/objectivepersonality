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
  let selectedVideoId;
  let videos;
  let videoIds;

  switch (action.type) {
    case 'ADD_VIDEO':
      if (state.videoIds.includes(action.payload.videoId)) {
        return {
          selectedVideoId: action.payload.videoId,
          videoIds: state.videoIds,
          videos: state.videos,
          player: state.player
        };
      }

      selectedVideoId = action.payload.videoId;
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
      if (state.videoIds.includes(action.payload.videoId)) {
        return {
          selectedVideoId: action.payload.videoId,
          videoIds: state.videoIds,
          videos: state.videos,
          player: state.player
        };
      }

      // if the video doesn't exist then nothing changes
      return state;

    case 'DELETE_VIDEO':
      videos = state.videos;
      videoIds = state.videoIds;

      if (videoIds.includes(action.payload.videoId)) {
        _.remove(videoIds, value => value === action.payload.videoId);
        delete videos[action.payload.videoId];
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
    case 'UPDATE_NOTE':
    case 'DELETE_NOTE':
    case 'LOAD_PLAYER':

    default:
      return state
  }
}
