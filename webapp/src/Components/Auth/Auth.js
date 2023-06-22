import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Auth = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (bool) => {
        try {
            let url;
            if (bool) {
                url = 'http://localhost:8080/auth/login'
            } else {
                url = 'http://localhost:8080/auth/signup'
            }

            const response = await axios.post(url, { username, password });
            console.log(response.data);
            if (bool) { localStorage.setItem('token', response.data.token) };
            // Reset form fields
            setUsername('');
            setPassword('');
            window.location.href='/'
        } catch (error) {
            console.log('Error signing up:', error);
        }
    };

    return (
        <div>
            <h1>Login/Signup</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
            </form>
            <p>
                <button onClick={() => { handleSubmit(true) }}>Login</button> or <button onClick={() => { handleSubmit(false) }}>Signup</button>
            </p>
        </div>
    );
};

export default Auth;
