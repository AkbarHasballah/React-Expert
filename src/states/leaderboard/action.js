export const LOAD_LEADERBOARDS_REQUEST = 'LOAD_LEADERBOARDS_REQUEST';
export const LOAD_LEADERBOARDS_SUCCESS = 'LOAD_LEADERBOARDS_SUCCESS';
export const LOAD_LEADERBOARDS_FAILURE = 'LOAD_LEADERBOARDS_FAILURE';

export const loadLeaderboardsRequest = () => ({
  type: LOAD_LEADERBOARDS_REQUEST,
});

export const loadLeaderboardsSuccess = (leaderboards) => ({
  type: LOAD_LEADERBOARDS_SUCCESS,
  payload: leaderboards,
});

export const loadLeaderboardsFailure = (error) => ({
  type: LOAD_LEADERBOARDS_FAILURE,
  payload: error,
});
