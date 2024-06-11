import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './authUser/reducer';
import talkDetailReducer from './threadDetail/reducer';
import talksReducer from './threads/reducer';
import usersReducer from './users/reducer';
import leaderboardsReducer from './leaderboard/reducer';
import threadReducer from './Taction/reducer';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    users: usersReducer,
    talks: talksReducer,
    detailThread: talkDetailReducer,
    leaderboards: leaderboardsReducer,
    threads: threadReducer,
  },
});

export default store;
