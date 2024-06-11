import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IoHome, IoMedal } from 'react-icons/io5';

function Navigasi({ authUser, signOut }) {
  const { id, avatar, name } = authUser;

  return (
    <div className="navigasi">
      <img src={avatar} alt={id} title={name} />
      <nav>
        <Link to="/"><IoHome /></Link>
        <Link to="/leaderboard"><IoMedal /></Link>
      </nav>
      <button type="button" onClick={signOut}>Keluar</button>
    </div>
  );
}

const bentukauthUser = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

Navigasi.propTypes = {
  authUser: PropTypes.shape(bentukauthUser).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Navigasi;
