import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import '../styles/Register.css'; // Mengimpor file CSS untuk gaya tambahan

function SubmitRegister({ register }) {
  const [name, onNamaChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const handleRegister = () => {
    if (name.trim() && email.trim() && password.trim()) {
      register({ name, email, password });
    }
  };

  return (
    <form className="register-input">
      <input
        className="register-input__field"
        type="text"
        value={name}
        onChange={onNamaChange}
        placeholder="Nama"
      />
      <input
        className="register-input__field"
        type="email"
        value={email}
        onChange={onEmailChange}
        placeholder="Email"
      />
      <input
        className="register-input__field"
        type="password"
        value={password}
        onChange={onPasswordChange}
        placeholder="Kata Sandi"
      />
      <button
        className="register-input__button"
        type="button"
        onClick={handleRegister}
      >
        register
      </button>
    </form>
  );
}

SubmitRegister.propTypes = {
  register: PropTypes.func.isRequired,
};

export default SubmitRegister;
