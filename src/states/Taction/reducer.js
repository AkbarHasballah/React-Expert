import {
  UPVOTE_THREAD_SUCCESS,
  DOWNVOTE_THREAD_SUCCESS,
  NEUTRAL_VOTE_THREAD_SUCCESS,
} from './action';

const initialState = {
  threads: [],
  loading: false,
  error: null,
};

// eslint-disable-next-line default-param-last
const threadReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPVOTE_THREAD_SUCCESS: {
      const { threadId, authUser } = action.payload;
      return {
        ...state,
        threads: state.threads.map((thread) => (thread.id === threadId
          ? {
            ...thread,
            upVotesBy: [...thread.upVotesBy, authUser],
            downVotesBy: thread.downVotesBy.filter((id) => id !== authUser),
          }
          : thread)),
      };
    }
    case DOWNVOTE_THREAD_SUCCESS: {
      const { threadId, authUser } = action.payload;
      return {
        ...state,
        threads: state.threads.map((thread) => (thread.id === threadId
          ? {
            ...thread,
            downVotesBy: [...thread.downVotesBy, authUser],
            upVotesBy: thread.upVotesBy.filter((id) => id !== authUser),
          }
          : thread)),
      };
    }
    case NEUTRAL_VOTE_THREAD_SUCCESS: {
      const { threadId, authUser } = action.payload;
      return {
        ...state,
        threads: state.threads.map((thread) => (thread.id === threadId
          ? {
            ...thread,
            upVotesBy: thread.upVotesBy.filter((id) => id !== authUser),
            downVotesBy: thread.downVotesBy.filter((id) => id !== authUser),
          }
          : thread)),
      };
    }
    default:
      return state;
  }
};

export default threadReducer;
