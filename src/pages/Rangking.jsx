import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaderboards } from '../thunks/leaderboards';
import '../styles/Leaderboard.css';

function LeaderboardPage() {
  const dispatch = useDispatch();
  const leaderboards = useSelector((state) => state.leaderboards.leaderboards);
  const loading = useSelector((state) => state.leaderboards.loading);
  const error = useSelector((state) => state.leaderboards.error);

  useEffect(() => {
    dispatch(fetchLeaderboards());
  }, [dispatch]);

  return (
    <div className="leaderboard">
      <h1>Papan Peringkat</h1>
      {loading && <p>Loading...</p>}
      {error && (
      <p>
        Error:
        {error}
      </p>
      )}
      <ul>
        {leaderboards.map((leaderboard) => (
          <li key={`${leaderboard.id}-${leaderboard.name}`}>
            <img src={leaderboard.avatar} alt={leaderboard.name} />
            <span>{leaderboard.name}</span>
            <span>{leaderboard.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LeaderboardPage;
