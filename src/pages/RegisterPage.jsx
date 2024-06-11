import React from 'react';
import { IoEarthOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SubmitRegister from '../components/SubmitRegister';
import { asyncRegisterUser } from '../states/users/action';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ email, name, password }));
    navigate('/');
  };

  return (
    <section className="register-page">
      <header className="register-page__hero">
        <h1><IoEarthOutline /></h1>
      </header>
      <article className="register-page__main">
        <h2>Buat akun Anda</h2>
        <SubmitRegister register={handleRegister} />
        <p>
          Sudah punya akun?
          {' '}
          <Link to="/">Masuk</Link>
        </p>
      </article>
    </section>
  );
}

export default RegisterPage;
