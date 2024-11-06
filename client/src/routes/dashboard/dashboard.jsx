import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts'



export default function Dashboard() {
    const barChartRef = useRef(null);
    const lineChartRef = useRef(null);
    const pieChartRef = useRef(null);
    const multiLineChartRef = useRef(null);



    useEffect(() => {
        // bar Chart
        const barOptions = {
            chart: {
                type: 'bar'
            },
            series: [{
                name: 'sales',
                data: [30, 40, 45, 50, 49, 60, 70, 91, 125]
            }],
            xaxis: {
                categories: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]
            }
        };
    
        // Line
        const lineOptions = {
            chart: {
                type: 'line'
            },
            series: [{
                name: 'revenue',
                data: [40, 45, 50, 55, 60, 65, 70, 80, 90]
            }],
            xaxis: {
                categories: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]
            }
        };

        // pie/donut Chart
        const pieOptions = {
            chart: {
                type: 'donut'
            },
            series: [44, 55, 13, 43],  
            labels: ['new', 'loya', 'vistor', 'Other'], 
            colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],  
            legend: {
                position: 'bottom'  
            },
            title: {
                text: 'incomes',
                align: 'left',
                style: {
                    fontSize: '16px',
                    fontWeight: '600',
                }
            },
        };

        // Multi-axis line chart
        const multiLineOptions = {
            chart: {
                type: 'line'
            },
            series: [
                {
                    name: 'Series 1',
                    data: [
                        { x: new Date('2024-02-12').getTime(), y: 76 },
                        { x: new Date('2024-03-12').getTime(), y: 85 },
                        { x: new Date('2024-04-12').getTime(), y: 101 },
                        { x: new Date('2024-05-12').getTime(), y: 98 },
                        { x: new Date('2024-06-12').getTime(), y: 107 },
                        { x: new Date('2024-07-12').getTime(), y: 80 }
                    ]
                },
                {
                    name: 'Series 2',
                    data: [
                        { x: new Date('2024-02-12').getTime(), y: 65 },
                        { x: new Date('2024-03-12').getTime(), y: 75 },
                        { x: new Date('2024-04-12').getTime(), y: 90 },
                        { x: new Date('2024-05-12').getTime(), y: 85 },
                        { x: new Date('2024-06-12').getTime(), y: 95 },
                        { x: new Date('2024-07-12').getTime(), y: 70 }
                    ]
                }
            ],
            xaxis: {
                type: 'datetime'
            }  
           
        };
    
        const barChart = new ApexCharts(barChartRef.current, barOptions);
        const lineChart = new ApexCharts(lineChartRef.current, lineOptions);
        const pieChart = new ApexCharts(pieChartRef.current, pieOptions);
        const multiLineChart = new ApexCharts(multiLineChartRef.current, multiLineOptions);


        
        barChart.render();
        lineChart.render();
        pieChart.render();
        multiLineChart.render();
    
        return () => {
            barChart.destroy();
            lineChart.destroy();
            pieChart.destroy();
            multiLineChart.destroy();
        };
    }, []);
    return (
        <div className="space-y-6 p-2 lg:p-0">
            <div className="flex lg:grid lg:grid-cols-4 gap-1.5 lg:gap-4">
                {/* card 1 */}
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

                {/* card 2 */}
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

                {/* card 3 */}
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

                {/* card 4 */}
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

            {/* chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-lg font-medium mb-4">Sales Overview</h3>
                    <div ref={barChartRef}></div>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-lg font-medium mb-4">Revenue Trends</h3>
                    <div ref={lineChartRef}></div>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-lg font-medium mb-4">Revenue Trends</h3>
                    <div ref={pieChartRef}></div>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-lg font-medium mb-4">Revenue Trends</h3>
                    <div ref={multiLineChartRef}></div>
                </div>
            </div>

            
        </div>
    );
}