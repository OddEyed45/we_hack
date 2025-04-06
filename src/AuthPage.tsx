import './App.css'


import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  username: string;
  email: string;
  password: string;
}

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>({ username: '', email: '', password: '' });
  const [message, setMessage] = useState<string>('');

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setMessage('');
    setFormData({ username: '', email: '', password: '' });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const endpoint = isLogin ? '/login' : '/register';
    const apiURL = `http://localhost:5000/api${endpoint}`; // Replace with your deployed URL if needed

    try {
      const res = await fetch(apiURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');

      setMessage(data.message || 'Success!');
      if (isLogin) {
        // Handle login session (store JWT, redirect, etc.)
        console.log('Login success:', data);
      }
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  return (
    <div className="auth-box text-center">
      <h2>{isLogin ? 'Welcome back 👋' : 'Create your Pantry-fy account'}</h2>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="mb-3 text-start">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="mb-3 text-start">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3 text-start">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className={`btn w-100 ${isLogin ? 'btn-primary' : 'btn-success'}`}>
          {isLogin ? 'Login' : 'Register'}
        </button>

        {message && (
          <div className="mt-3 alert alert-info">
            {message}
          </div>
        )}
      </form>

      <div className="mt-3">
        <small>
          {isLogin ? "Don't have an account?" : "Already registered?"}{' '}
          <span className="toggle-link text-primary" role="button" onClick={toggleForm}>
            {isLogin ? 'Register here' : 'Login'}
          </span>
        </small>
      </div>
    </div>
  );
};

export default AuthPage;
