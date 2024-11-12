import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
                        path: 'marketing-performance',
                        element: <MarketingPerformance />
                    },    
                    {
                        path: 'customer-insights',
                        element: <CustomerInsights />
                    },
                    {
                        path: 'subscribe',
                        element: <Subscribe />
                    },
                    {
                        path: 'signup',
                        element: <Signup />
                    },
                    {
                        path: 'signin',
                        element: <Signin />
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
