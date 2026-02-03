import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Setup Axios defaults
const api = axios.create({
    baseURL: '/api',
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [config, setConfig] = useState({ enablePayments: false });

    useEffect(() => {
        const init = async () => {
            try {
                // Fetch Config
                const { data: configData } = await api.get('/config');
                setConfig(configData);
            } catch (e) {
                console.error('Failed to fetch config', e);
            }

            const token = localStorage.getItem('token');
            if (token) {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                await checkUserLoggedIn();
            } else {
                setLoading(false);
            }
        };
        init();
    }, []);

    const checkUserLoggedIn = async () => {
        try {
            const { data } = await api.get('/auth/me');
            setUser(data);
        } catch (err) {
            localStorage.removeItem('token');
            delete api.defaults.headers.common['Authorization'];
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            setError(null);
            const { data } = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', data.token);
            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            setUser(data);
            return true;
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
            return false;
        }
    };

    const register = async (name, email, password) => {
        try {
            setError(null);
            const { data } = await api.post('/auth/register', { name, email, password });
            localStorage.setItem('token', data.token);
            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            setUser(data);
            return true;
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
    };

    const updateCredits = (newCredits) => {
        if (user) {
            setUser({ ...user, credits: newCredits });
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, error, api, updateCredits, config }}>
            {children}
        </AuthContext.Provider>
    );
};
