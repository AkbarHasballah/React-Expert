import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function SubmitLogin({ login }) {
  const [email, onIdChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <form className="form-login">
      <input
        type="email"
        name="email"
        value={email}
        onChange={onIdChange}
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={onPasswordChange}
        placeholder="Kata Sandi"
      />
      <button type="button" onClick={() => login({ email, password })}>
        Masuk
      </button>
    </form>
  );
}

SubmitLogin.propTypes = {
  login: PropTypes.func.isRequired,
};

export default SubmitLogin;
