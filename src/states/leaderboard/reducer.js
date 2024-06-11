import {
  LOAD_LEADERBOARDS_REQUEST,
  LOAD_LEADERBOARDS_SUCCESS,
  LOAD_LEADERBOARDS_FAILURE,
} from './action';

const initialState = {
  leaderboards: [],
  loading: false,
  error: null,
};

// eslint-disable-next-line default-param-last
const leaderboardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_LEADERBOARDS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOAD_LEADERBOARDS_SUCCESS:
      return {
        ...state,
        loading: false,
        leaderboards: action.payload,
      };
    case LOAD_LEADERBOARDS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default leaderboardsReducer;
