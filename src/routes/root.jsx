import { useState } from 'react';
import { Form, NavLink, useNavigation, useSubmit } from 'react-router-dom';
import { HomeIcon, ChartBarIcon, CogIcon, MenuIcon, XIcon, SearchIcon } from '@heroicons/react/outline';

export default function Root() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigation = useNavigation();
    const submit = useSubmit();
    return (
        <div className="h-screen flex overflow-hidden bg-gray-100">
            {/* Mobile menu button */}
            {!isSidebarOpen && (
                <div className="lg:hidden fixed top-0 left-0 p-4 z-50">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="text-gray-500 hover:text-gray-600 focus:outline-none"
                        aria-label="Open menu"
                    >
                        <MenuIcon className="h-6 w-6" />
                    </button>
                </div>
            )}
            {/* Backdrop*/}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-75 z-30 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar */}
            <div
                className={`
            fixed inset-y-0 left-0 transform lg:transform-none lg:opacity-100
            w-64 bg-white border-r border-gray-200 z-40
            transition duration-200 ease-in-out
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
                        <XIcon className="h-6 w-6 text-white" />
                    </button>
                </div>

                {/* Sidebar content */}
                <div className="h-full flex flex-col">
                    <div className="p-4 border-b border-gray-200">
                        <h1 className="text-xl font-bold text-gray-900">Analytics Dashboard</h1>
                    </div>
                    {/* Sidebar search */}
                    <div className="p-4">
                        <Form id="search-form" role="search" method="post" className="mb-4">
                            <input
                                id="q"
                                aria-label="Search contacts"
                                placeholder="Search"
                                type="search"
                                name="q"
                                className="w-full p-2 border rounded"
                            />
                            <div id="search-spinner" aria-hidden hidden={true} />
                            <div className="sr-only" aria-live="polite"></div>
                        </Form>
                    </div>
                    {/* Sidebar search */}
                    <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) => `
                                flex items-center px-2 py-2 text-sm font-medium rounded-md
                                ${isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
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
                        ${isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                    `}
                        >
                            <ChartBarIcon className="mr-3 h-6 w-6 text-gray-400" />
                            Sales Analytics
                        </NavLink>

                        <NavLink
                            to="/settings"
                            className={({ isActive }) => `
                        flex items-center px-2 py-2 text-sm font-medium rounded-md
                        ${isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                    `}
                        >
                            <CogIcon className="mr-3 h-6 w-6 text-gray-400" />
                            Settings
                        </NavLink>
                    </nav>
                </div>
                <div id="detail"></div>
            </div>  
        </div>

    );
}
