import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../../services/api';

//import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';

const Signin = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [user, setUser] = useState(null);
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    //google login
    //https://blog.logrocket.com/guide-adding-google-login-react-app
    const googleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse);
        },
        onError: (error) => {
            console.log('Login Failed:', error);
            setErrorMessage('Failed to sign in with Google. Please try again.');
        }
    });

    // Listen for user changes and get personal information
    useEffect(() => {
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    //save user info ti local storage
                    localStorage.setItem('token', user.access_token);
                    localStorage.setItem('firstname', res.data.given_name || res.data.name);
                    navigate('/dashboard');
                })
                .catch((err) => console.log(err));
        }
    }, [user, navigate]);

    //email login
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        try {
            const response = await api.post('/api/auth/signin', {
                email: credentials.email,
                password: credentials.password
            });
            const { token, user: userData } = response.data;

            // Save token and user information to localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('firstname', userData.firstname);

            navigate('/dashboard');
        } catch (error) {
            console.error('Sign in error', error);
            setErrorMessage(error.response?.data?.message || 'An error occurred during sign in.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-2xl font-bold mb-4">{loading ? 'Processing...' : 'Sign In'}</h1>

            <div className="flex justify-center">
                <div className="w-full max-w-lg">
                    <h2 className="text-xl font-semibold text-center mb-6">Login to Your Account</h2>

                    <div className="w-full mb-6">
                        <button
                            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-base-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                            onClick={googleLogin}
                            disabled={loading}
                        >
                            {loading ? 'Signing in...' : 'Sign in with Google'}
                        </button>
                    </div>

                    <div className="relative flex items-center justify-center my-8">
                        <div className="absolute w-full border-t border-gray-300"></div>
                        <div className="relative bg-base-200 px-4">
                            <span className="text-sm text-gray-500">Or, login with your email</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <input
                                type="email"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Email address"
                                name="email"
                                value={credentials.email}
                                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <input
                                type="password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Password"
                                name="password"
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                required
                            />
                        </div>

                        <div className="flex justify-between items-center">
                            <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                                Forgot Password?
                            </Link>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                                disabled={loading}
                            >
                                {loading ? 'Signing in...' : 'Log In'}
                            </button>
                        </div>

                        {errorMessage && <div className="p-4 text-red-700 bg-red-100 rounded-md">{errorMessage}</div>}

                        <div className="border-t border-base-300 pt-6 text-center">
                            <p className="text-sm text-base-content">
                                Don't have an account?{' '}
                                <Link to="/signup" className="text-blue-600 hover:text-blue-500">
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signin;
