import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';
import Root from './routes/root';
import ErrorPage from './routes/error-page';
import Dashboard from './routes/dashboard';
import Signin from './routes/users/signin';
import Signup from './routes/users/signup';
// import SalesAnalytics from './routes/Analytics';
import MarketingPerformance from './routes/MarketingPerformance';
import CustomerInsights from './routes/CustomerInsights';
import Subscribe from './routes/Subscribe';
import Setting from './routes/Setting';
import SuccessPage from './routes/successPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthProvider';
import GoogleAnalytics from './components/GoogleAnalytics';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                errorElement: <ErrorPage />,
                children: [
                    { index: true, element: <Dashboard /> },
                    {
                        path: 'dashboard',
                        element: <Dashboard />
                    },
                    {
                        path: 'analytics',
                        element: <ProtectedRoute><GoogleAnalytics /></ProtectedRoute>
                    },
                    {
                        path: 'marketing-performance',
                        element: <MarketingPerformance />
                    },
                    {
                        path: 'customer-insights',
                        element:(<ProtectedRoute><CustomerInsights /></ProtectedRoute>)
                         
                    },
                    {
                        path: 'subscribe',
                        element:<Subscribe />
                    },
                    {
                        path: 'setting',
                        element: (<ProtectedRoute><Setting /></ProtectedRoute>)
                    },
                    {
                        path: 'signup',
                        element: <Signup />
                    },
                    {
                        path: 'signin',
                        element: <Signin />
                    },
                    {
                        path: '/success',
                        element: <SuccessPage />
                    }
                ]
            }
        ]
    }
    // {
    //   path: "dashboard",
    //   element: <Dashboard />,
    // },
]);

console.log('Google Client ID:', process.env.REACT_APP_GOOGLE_CLIENT_ID);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT}>
            <AuthProvider>
                <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
            </AuthProvider>
        
    </GoogleOAuthProvider>
    
);

//reference: google login: https://blog.logrocket.com/guide-adding-google-login-react-app/
