import api from '../utils/api';
import { loadLeaderboardsRequest, loadLeaderboardsSuccess, loadLeaderboardsFailure } from '../states/leaderboard/action';

// eslint-disable-next-line import/prefer-default-export
export const fetchLeaderboards = () => async (dispatch) => {
  dispatch(loadLeaderboardsRequest());
  try {
    const leaderboardsData = await api.getLeaderboards();
    dispatch(loadLeaderboardsSuccess(leaderboardsData));
  } catch (error) {
    dispatch(loadLeaderboardsFailure(error.message));
  }
};
