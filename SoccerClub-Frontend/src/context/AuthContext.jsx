import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check for existing token and validate it on mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://localhost:5000/api/auth/me', {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                setCurrentUser(response.data.user);
            })
            .catch(() => {
                // Token invalid or expired, clear it
                localStorage.removeItem('token');
                setCurrentUser(null);
            })
            .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
            email,
            password
        });
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        setCurrentUser(user);
        return user;
    };

    const signup = async (userData) => {
        const response = await axios.post('http://localhost:5000/api/auth/signup', userData);
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        setCurrentUser(user);
        return user;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setCurrentUser(null);
    };

    const value = {
        currentUser,
        login,
        signup,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};