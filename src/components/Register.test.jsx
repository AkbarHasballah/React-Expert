import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SubmitRegister from './SubmitRegister';
import { describe, it, expect, vi } from 'vitest';

describe('SubmitRegister component', () => {
  it('renders correctly', () => {
    const register = vi.fn();
    const { getByPlaceholderText, getByText } = render(<SubmitRegister register={register} />);

    const nameInput = getByPlaceholderText('Nama');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Kata Sandi');
    const registerButton = getByText('register');

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  it('calls register function with correct arguments when the register button is clicked', () => {
    const register = vi.fn();
    const { getByPlaceholderText, getByText } = render(<SubmitRegister register={register} />);

    const nameInput = getByPlaceholderText('Nama');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Kata Sandi');
    const registerButton = getByText('register');

    fireEvent.change(nameInput, { target: { value: 'Nama Pengguna' } });
    fireEvent.change(emailInput, { target: { value: 'email@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(registerButton);

    expect(register).toHaveBeenCalledWith({
      name: 'Nama Pengguna',
      email: 'email@example.com',
      password: 'password123',
    });
  });

  it('does not call register function when any input field is empty', () => {
    const register = vi.fn();
    const { getByPlaceholderText, getByText } = render(<SubmitRegister register={register} />);

    const registerButton = getByText('register');

    // Test case when all inputs are empty
    fireEvent.click(registerButton);
    expect(register).not.toHaveBeenCalled();

    // Test case when 'name' is empty
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'email@example.com' } });
    fireEvent.change(getByPlaceholderText('Kata Sandi'), { target: { value: 'password123' } });
    fireEvent.click(registerButton);
    expect(register).not.toHaveBeenCalled();

    // Test case when 'email' is empty
    fireEvent.change(getByPlaceholderText('Nama'), { target: { value: 'Nama Pengguna' } });
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: '' } });
    fireEvent.click(registerButton);
    expect(register).not.toHaveBeenCalled();

    // Test case when 'password' is empty
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'email@example.com' } });
    fireEvent.change(getByPlaceholderText('Kata Sandi'), { target: { value: '' } });
    fireEvent.click(registerButton);
    expect(register).not.toHaveBeenCalled();
  });
});
