export const UPVOTE_THREAD_REQUEST = 'UPVOTE_THREAD_REQUEST';
export const UPVOTE_THREAD_SUCCESS = 'UPVOTE_THREAD_SUCCESS';
export const UPVOTE_THREAD_FAILURE = 'UPVOTE_THREAD_FAILURE';

export const DOWNVOTE_THREAD_REQUEST = 'DOWNVOTE_THREAD_REQUEST';
export const DOWNVOTE_THREAD_SUCCESS = 'DOWNVOTE_THREAD_SUCCESS';
export const DOWNVOTE_THREAD_FAILURE = 'DOWNVOTE_THREAD_FAILURE';

export const NEUTRAL_VOTE_THREAD_REQUEST = 'NEUTRAL_VOTE_THREAD_REQUEST';
export const NEUTRAL_VOTE_THREAD_SUCCESS = 'NEUTRAL_VOTE_THREAD_SUCCESS';
export const NEUTRAL_VOTE_THREAD_FAILURE = 'NEUTRAL_VOTE_THREAD_FAILURE';

export const upVoteThreadRequest = () => ({
  type: UPVOTE_THREAD_REQUEST,
});

export const upVoteThreadSuccess = (threadId, authUser) => ({
  type: UPVOTE_THREAD_SUCCESS,
  payload: { threadId, authUser },
});

export const upVoteThreadFailure = (error) => ({
  type: UPVOTE_THREAD_FAILURE,
  payload: error,
});

export const downVoteThreadRequest = () => ({
  type: DOWNVOTE_THREAD_REQUEST,
});

export const downVoteThreadSuccess = (threadId, authUser) => ({
  type: DOWNVOTE_THREAD_SUCCESS,
  payload: { threadId, authUser },
});

export const downVoteThreadFailure = (error) => ({
  type: DOWNVOTE_THREAD_FAILURE,
  payload: error,
});

export const neutralVoteThreadRequest = () => ({
  type: NEUTRAL_VOTE_THREAD_REQUEST,
});

export const neutralVoteThreadSuccess = (threadId, authUser) => ({
  type: NEUTRAL_VOTE_THREAD_SUCCESS,
  payload: { threadId, authUser },
});

export const neutralVoteThreadFailure = (error) => ({
  type: NEUTRAL_VOTE_THREAD_FAILURE,
  payload: error,
});
