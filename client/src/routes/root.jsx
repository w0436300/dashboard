import { useState } from 'react';
import { Form, NavLink, useLocation, useSubmit, Outlet } from 'react-router-dom';
import {
    HomeIcon,
    ChartBarIcon,
    Cog6ToothIcon,
    Bars3Icon,
    XMarkIcon,
    MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

export default function Root() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation(); // 使用 useLocation 获取当前路径
    const submit = useSubmit();
    const isSignInPage = location.pathname === '/signin'; // 获取当前路径并判断

    console.log('Current path:', location.pathname);
    console.log('isSignInPage:', isSignInPage);

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white shadow">
                <div className="flex h-16 items-center justify-between px-4">
                    {/* sidebar */}
                    <div className="flex items-center">                       
                        <button
                            type="button"
                            className="text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>

                        {/* title */}
                        <NavLink
                            to="/dashboard">
                            <h1 className="ml-4 text-lg font-semibold text-gray-900 truncate">
                                <span className="lg:hidden"></span>
                                <span className="hidden lg:inline">Analytics Dashboard</span>
                            </h1>
                        </NavLink>
                        
                    </div>

                    {/* Right side: Login link/Logo and search bar */}
                    <div className="flex items-center space-x-4">
                        {/* login link or Logo */}
                        <div>
                            {!isSignInPage ? (
                                <NavLink
                                    to="/signin"
                                    className="hover:text-blue-600 transition-colors"
                                >
                                    Log in
                                </NavLink>
                            ) : (
                                <Form action="/dashboard">
                                    <button
                                        type="submit"
                                        className="flex items-center hover:opacity-80 transition-opacity"
                                    >
                                        <img 
                                            src="/image/logo.jpg" 
                                            alt="Logo"
                                            className="h-8 w-auto" 
                                            onError={(e) => console.log('Image failed to load:', e)} 
                                        />
                                    </button>
                                </Form>
                            )}
                        </div>

                        {/* search bar: hide in sm */}
                        <div className="w-28 sm:w-48 md:w-64 lg:w-96 hidden sm:block">
                            <Form className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                                <input
                                    type="search"
                                    name="search"
                                    id="search"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm"
                                    placeholder="Search"
                                />
                            </Form>
                        </div>
                    </div>
                </div>
            </header>


            {/* Content area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Backdrop */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-gray-600 bg-opacity-75 z-30 lg:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                        aria-hidden="true"
                    />
                )}

                {/* Sidebar */}
                <aside
                    className={`
                        fixed top-16 bottom-0 lg:static flex-none w-64 
                        bg-white border-r border-gray-200
                        transform lg:transform-none lg:opacity-100
                        transition duration-200 ease-in-out z-40
                        ${isSidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 lg:translate-x-0'}
                    `}
                >
                    {/* Close button for mobile */}
                    <div className="lg:hidden absolute top-0 right-0 -mr-12 pt-2">
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-label="Close menu"
                        >
                            <XMarkIcon className="h-6 w-6 text-white" />
                        </button>
                    </div>

                    {/* Sidebar content */}
                    <nav className="h-full px-4 py-4 space-y-1 overflow-y-auto">
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) => `
                                flex items-center px-2 py-2 text-sm font-medium rounded-md
                                ${
                                    isActive
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }
                            `}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <HomeIcon className="mr-3 h-6 w-6 text-gray-400" />
                            Dashboard
                        </NavLink>

                        <NavLink
                            to="/sales"
                            className={({ isActive }) => `
                                flex items-center px-2 py-2 text-sm font-medium rounded-md
                                ${
                                    isActive
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }
                            `}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <ChartBarIcon className="mr-3 h-6 w-6 text-gray-400" />
                            Sales Analytics
                        </NavLink>

                        <NavLink
                            to="/subscribe"
                            className={({ isActive }) => `
                                flex items-center px-2 py-2 text-sm font-medium rounded-md
                                ${
                                    isActive
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }
                            `}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <Cog6ToothIcon className="mr-3 h-6 w-6 text-gray-400" />
                            Subscribe
                        </NavLink>

                        <NavLink
                            to="/settings"
                            className={({ isActive }) => `
                                flex items-center px-2 py-2 text-sm font-medium rounded-md
                                ${
                                    isActive
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }
                            `}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <Cog6ToothIcon className="mr-3 h-6 w-6 text-gray-400" />
                            Settings
                        </NavLink>
                    </nav>
                </aside>

                {/* Main content */}
                <main className="flex-1 relative overflow-y-auto bg-gray-100">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
