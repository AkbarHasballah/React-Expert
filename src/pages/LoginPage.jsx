import React from 'react';
import { IoFlowerOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import SubmitLogin from '../components/SubmitLogin';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPagehu() {
  const dispatch = useDispatch();

  const handleLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }))
      .then(() => {
        // Tampilkan notifikasi jika login berhasil
        console.log('Login berhasil!');
        toast.success('Login berhasil!', {
          duration: 4000,
          position: 'top-center',
        });
      })
      .catch(() => {
        // Tampilkan notifikasi jika login gagal
        console.log('Login gagal!');
        toast.error('Login gagal!', {
          duration: 4000,
          position: 'top-center',
        });
      });
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-header">
          <h1><IoFlowerOutline /></h1>
          <h2>Ketahui Dunia Anda Bersama Kami</h2>
        </div>
        <div className="login-form">
          <h2>Login</h2>
          <SubmitLogin login={handleLogin} />
          <p>
            Belum punya akun?
            <Link to="/register">Daftar Sekarang</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
