export default function Dashboard() {
    return (
        <div className="w-full px-2 lg:px-0">
            <div className="flex lg:grid lg:grid-cols-4 gap-1.5 lg:gap-4">
                {/* 统计卡片 1 */}
                <div className="bg-white rounded-lg shadow min-w-[22%] lg:min-w-0 p-2 lg:p-4">
                    <div className="flex items-center">
                        <div className="hidden sm:block flex-shrink-0 mr-2 lg:mr-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="w-5 h-5 lg:w-8 lg:h-8 text-blue-500 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-[10px] lg:text-sm text-gray-500 truncate">Downloads</div>
                            <div className="text-sm lg:text-2xl font-bold text-gray-900">31K</div>
                            <div className="text-[10px] lg:text-sm text-gray-500 truncate">Jan 1st</div>
                        </div>
                    </div>
                </div>

                {/* 统计卡片 2 */}
                <div className="bg-white rounded-lg shadow min-w-[22%] lg:min-w-0 p-2 lg:p-4">
                    <div className="flex items-center">
                        <div className="hidden sm:block flex-shrink-0 mr-2 lg:mr-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="w-5 h-5 lg:w-8 lg:h-8 text-blue-500 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                                />
                            </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-[10px] lg:text-sm text-gray-500 truncate">Users</div>
                            <div className="text-sm lg:text-2xl font-bold text-gray-900">4.2K</div>
                            <div className="text-[10px] lg:text-sm text-gray-500">
                                <span className="text-green-500">↗︎ 22%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 统计卡片 3 */}
                <div className="bg-white rounded-lg shadow min-w-[22%] lg:min-w-0 p-2 lg:p-4">
                    <div className="flex items-center">
                        <div className="hidden sm:block flex-shrink-0 mr-2 lg:mr-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="w-5 h-5 lg:w-8 lg:h-8 text-blue-500 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                                />
                            </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-[10px] lg:text-sm text-gray-500 truncate">New Reg</div>
                            <div className="text-sm lg:text-2xl font-bold text-gray-900">1.2K</div>
                            <div className="text-[10px] lg:text-sm text-gray-500">
                                <span className="text-red-500">↘︎ 14%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 统计卡片 4 */}
                <div className="bg-white rounded-lg shadow min-w-[22%] lg:min-w-0 p-2 lg:p-4">
                    <div className="flex items-center">
                        <div className="hidden sm:block flex-shrink-0 mr-2 lg:mr-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="w-5 h-5 lg:w-8 lg:h-8 text-blue-500 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                                />
                            </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-[10px] lg:text-sm text-gray-500 truncate">Revenue</div>
                            <div className="text-sm lg:text-2xl font-bold text-gray-900">$89K</div>
                            <div className="text-[10px] lg:text-sm text-gray-500">
                                <span className="text-green-500">↗︎ 8%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}