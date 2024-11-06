import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Root from './routes/root';
import ErrorPage from './routes/error-page';
import Dashboard from './routes/dashboard/dashboard';
import Signin from './routes/users/signin';
import Signup from './routes/users/signup';

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
