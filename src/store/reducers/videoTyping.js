const initialState = {
  videos: [
    {
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
  ],
  player: null
};

export default (state = initialState, action) => {
  switch (action.type) {

    default:
      return state
  }
}
