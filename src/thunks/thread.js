// src/thunks/threadThunks.js

import api from '../utils/api';
import {
  upVoteThreadRequest,
  upVoteThreadSuccess,
  upVoteThreadFailure,
  downVoteThreadRequest,
  downVoteThreadSuccess,
  downVoteThreadFailure,
  neutralVoteThreadRequest,
  neutralVoteThreadSuccess,
  neutralVoteThreadFailure,
} from '../states/Taction/action';

export const upVoteThread = (threadId, authUser) => async (dispatch) => {
  dispatch(upVoteThreadRequest());
  try {
    await api.upVoteThread(threadId);
    dispatch(upVoteThreadSuccess(threadId, authUser));
  } catch (error) {
    dispatch(upVoteThreadFailure(error.message));
  }
};

export const downVoteThread = (threadId, authUser) => async (dispatch) => {
  dispatch(downVoteThreadRequest());
  try {
    await api.downVoteThread(threadId);
    dispatch(downVoteThreadSuccess(threadId, authUser));
  } catch (error) {
    dispatch(downVoteThreadFailure(error.message));
  }
};

export const neutralVoteThread = (threadId, authUser) => async (dispatch) => {
  dispatch(neutralVoteThreadRequest());
  try {
    await api.neutralVote(threadId);
    dispatch(neutralVoteThreadSuccess(threadId, authUser));
  } catch (error) {
    dispatch(neutralVoteThreadFailure(error.message));
  }
};
