// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
import { vi, expect, test } from 'vitest';
// eslint-disable-next-line import/named
import { asyncPopulateUsersAndThreads } from './action';
import api from '../../utils/api';
import { receiveTalksActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';

test('asyncPopulateUsersAndThreads dispatches actions correctly', async () => {
  const users = [{ id: 1, name: 'Alice' }];
  const talks = [{ id: 1, title: 'Talk 1' }];

  const dispatch = vi.fn();
  api.getAllUsers = vi.fn().mockResolvedValue(users);
  api.getAllTalks = vi.fn().mockResolvedValue(talks);
  await asyncPopulateUsersAndThreads()(dispatch);

  expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(users));
  expect(dispatch).toHaveBeenCalledWith(receiveTalksActionCreator(talks));
});
