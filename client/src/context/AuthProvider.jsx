import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const response = await axios.get('/api/user/profile');
            setUser(response.data);
            
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    useEffect(() => {
        fetchUser(); 
    }, []);


    const refreshUser = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return null;

            const response = await fetch('/api/user/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
                if (userData.subscription) {
                    localStorage.setItem('subscription', JSON.stringify(userData.subscription));
                }
                return userData;
            }
        } catch (error) {
            console.error('Error refreshing user data:', error);
            return null;
        }
    };

    useEffect(() => {
        try {
            const token = localStorage.getItem('token');
            const firstname = localStorage.getItem('firstname');
            const subscription = localStorage.getItem('subscription');
            
            console.log('Loading stored data:', {
                hasToken: !!token,
                firstname,
                subscription
            });

            if (token && firstname) {
                const userData = {
                    firstname,
                    subscription: subscription ? JSON.parse(subscription) : null
                };
                console.log('Constructed user data:', userData);
                setUser(userData);
            }
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            localStorage.removeItem('token');
            localStorage.removeItem('firstname');
            localStorage.removeItem('subscription');        
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        try {
            const response = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login response:', data);

                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                
                const subscription = data.subscription || { status: 'free' };
                localStorage.setItem('subscription', JSON.stringify(subscription));

                setUser(data.user);
                return data;
            } else {
                throw new Error('error');
                console.error('Login error:', error);

            }
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('firstname');
        localStorage.removeItem('subscription');        
        setUser(null);
    };

    //uodate status
    const updateSubscription = (newSubscription) => {
        if (user) {
            const updatedUser = {
                ...user,
                subscription: newSubscription
            };
            localStorage.setItem('subscription', JSON.stringify(newSubscription));
            setUser(updatedUser);
            console.log('Subscription updated:', newSubscription);
        }
    };

    const updateSubscriptionStatus = async (userId, newStatus) => {
        try {
            const response = await axios.post('/api/subscription/updateSubscription', { userId, newStatus });
            if (response.data.success) {
                await fetchUser(); 
            }
        } catch (error) {
            console.error('Error updating subscription:', error);
        }
    };

    // check if active
    const hasActiveSubscription = () => {
        return user?.subscription?.status === 'active';
    };

    const value = {
        user,
        loading,
        login,
        logout,
        refreshUser,
        updateSubscription,
        hasActiveSubscription,
        isAuthenticated: !!user
    };


    return (
        <AuthContext.Provider value={ value }>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};