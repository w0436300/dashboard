import { useEffect, useRef, useState } from 'react';
import Card from '../components/Card';
import { getTodayOverview } from '../services/api';
import SalesTrendChart from '../components/SalesTrend';
import TopProductsChart from '../components/TopProducts';
import ChannelConversionChart from '../components/ChannelConversion';

export default function Dashboard() {
    const [overview, setOverview] = useState({
        totalSales: 0,
        totalOrders: 0,
        productsSold: 0,
        newCustomers: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTodayOverview();
                console.log('Fetched data:', data);
                setOverview(data);
            } catch (error) {
                console.error('Error fetching overview data:', error);
            }
        };

        fetchData();
    }, []);

    // useEffect(() => {
    //     // bar Chart
    //     const barOptions = {
    //         chart: {
    //             type: 'bar'
    //         },
    //         series: [
    //             {
    //                 name: 'sales',
    //                 data: [30, 40, 45, 50, 49, 60, 70, 91, 125]
    //             }
    //         ],
    //         xaxis: {
    //             categories: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]
    //         }
    //     };

    //     // Line
    //     const lineOptions = {
    //         chart: {
    //             type: 'line'
    //         },
    //         series: [
    //             {
    //                 name: 'revenue',
    //                 data: [40, 45, 50, 55, 60, 65, 70, 80, 90]
    //             }
    //         ],
    //         xaxis: {
    //             categories: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]
    //         }
    //     };

    //     // pie/donut Chart
    //     const pieOptions = {
    //         chart: {
    //             type: 'donut'
    //         },
    //         series: [44, 55, 13, 43],
    //         labels: ['new', 'loya', 'vistor', 'Other'],
    //         colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
    //         legend: {
    //             position: 'bottom'
    //         },
    //         title: {
    //             text: 'incomes',
    //             align: 'left',
    //             style: {
    //                 fontSize: '16px',
    //                 fontWeight: '600'
    //             }
    //         }
    //     };

    //     // Multi-axis line chart
    //     const multiLineOptions = {
    //         chart: {
    //             type: 'line'
    //         },
    //         series: [
    //             {
    //                 name: 'Series 1',
    //                 data: [
    //                     { x: new Date('2024-02-12').getTime(), y: 76 },
    //                     { x: new Date('2024-03-12').getTime(), y: 85 },
    //                     { x: new Date('2024-04-12').getTime(), y: 101 },
    //                     { x: new Date('2024-05-12').getTime(), y: 98 },
    //                     { x: new Date('2024-06-12').getTime(), y: 107 },
    //                     { x: new Date('2024-07-12').getTime(), y: 80 }
    //                 ]
    //             },
    //             {
    //                 name: 'Series 2',
    //                 data: [
    //                     { x: new Date('2024-02-12').getTime(), y: 65 },
    //                     { x: new Date('2024-03-12').getTime(), y: 75 },
    //                     { x: new Date('2024-04-12').getTime(), y: 90 },
    //                     { x: new Date('2024-05-12').getTime(), y: 85 },
    //                     { x: new Date('2024-06-12').getTime(), y: 95 },
    //                     { x: new Date('2024-07-12').getTime(), y: 70 }
    //                 ]
    //             }
    //         ],
    //         xaxis: {
    //             type: 'datetime'
    //         }
    //     };

    //     const barChart = new ApexCharts(barChartRef.current, barOptions);
    //     const lineChart = new ApexCharts(lineChartRef.current, lineOptions);
    //     const pieChart = new ApexCharts(pieChartRef.current, pieOptions);
    //     const multiLineChart = new ApexCharts(multiLineChartRef.current, multiLineOptions);

    //     barChart.render();
    //     lineChart.render();
    //     pieChart.render();
    //     multiLineChart.render();

    //     return () => {
    //         barChart.destroy();
    //         lineChart.destroy();
    //         pieChart.destroy();
    //         multiLineChart.destroy();
    //     };
    // }, []);
    return (
        <div className="space-y-6 p-2 lg:p-0">
            <div className="bg-base-100 rounded-lg shadow min-w-[22%] lg:min-w-0 p-2 lg:p-4">
                <h1 className="text-xl">Today's Sales</h1>
                <p className="text-stone-500 text-sm mb-2">Sales Summery</p>
                <div className="flex lg:grid lg:grid-cols-4 gap-1.5 lg:gap-4 justify-evenly">
                    {/* card 1 Total Salea*/}
                    {/* <div className="bg-red-50 rounded-lg shadow min-w-[22%] lg:min-w-0 p-2 lg:p-4">
                        <div className="flex flex-col">
                            <div className="hidden sm:block flex-shrink-0 mr-2 lg:mr-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="size-6  text-blue-500"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
                                    />
                                </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-[10px] lg:text-sm text-gray-500 truncate">Total Salea</div>
                                <div className="text-sm lg:text-2xl font-bold text-base-content">$31K</div>
                                <div className="text-[10px] lg:text-sm text-blue-500 truncate">+8% from yeaterday</div>
                            </div>
                        </div>
                    </div> */}
                    <Card
                        color="bg-red-50"
                        title="Total Sales"
                        value={`$${overview.totalSales}`}
                        change="+8% from yesterday"
                        icon={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="size-6  text-blue-500"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
                                />
                            </svg>
                        }
                    />

                    {/* card 2 */}
                    {/* <div className="bg-orange-50 rounded-lg shadow min-w-[22%] lg:min-w-0 p-2 lg:p-4">
                        <div className="flex flex-col">
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
                                <div className="text-[10px] lg:text-sm text-gray-500 truncate">Total Order</div>
                                <div className="text-sm lg:text-2xl font-bold text-base-content">300</div>
                                <div className="text-[10px] lg:text-sm text-gray-500">
                                    <span className="text-green-500">+8% from yesterday</span>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <Card
                        color="bg-orange-50"
                        title="Total Orders"
                        value={overview.totalOrders}
                        change="+10% from yesterday"
                        icon={
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
                        }
                    />

                    {/* card 3 */}
                    {/* <div className="bg-green-50 rounded-lg shadow min-w-[22%] lg:min-w-0 p-2 lg:p-4">
                        <div className="flex flex-col">
                            <div className="hidden sm:block flex-shrink-0 mr-2 lg:mr-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="size-6 text-blue-500"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                    />
                                </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-[10px] lg:text-sm text-gray-500 truncate">Product Sold</div>
                                <div className="text-sm lg:text-2xl font-bold text-base-content">5</div>
                                <div className="text-[10px] lg:text-sm text-gray-500">
                                    <span className="text-red-500">+8% from yesterday</span>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <Card
                        color="bg-green-50"
                        title="Products Sold"
                        value={overview.productsSold}
                        change="-5% from yesterday"
                        icon={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="size-6 text-blue-500"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                />
                            </svg>
                        }
                    />

                    {/* card 4 */}
                    {/* <div className="bg-indigo-50 rounded-lg shadow min-w-[22%] lg:min-w-0 p-2 lg:p-4">
                        <div className="flex flex-col">
                            <div className="hidden sm:block flex-shrink-0 mr-2 lg:mr-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="size-6 text-blue-500"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                                    />
                                </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-[10px] lg:text-sm text-gray-500 truncate">New Customers</div>
                                <div className="text-sm lg:text-2xl font-bold text-base-content">8</div>
                                <div className="text-[10px] lg:text-sm text-gray-500">
                                    <span className="text-green-500">+8% from yesterday</span>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <Card
                        color="bg-indigo-50"
                        title="New Customers"
                        value={overview.newCustomers}
                        change="+12% from yesterday"
                        icon={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="size-6 text-blue-500"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                                />
                            </svg>
                        }
                    />
                </div>
            </div>

            {/* chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-base-100 rounded-lg shadow p-4">
                    <div className="mt-8">
                        <SalesTrendChart />
                    </div>
                </div>

                <div className="bg-base-100 rounded-lg shadow p-4">
                    <div className="mt-8">
                        <TopProductsChart />
                    </div>
                </div>

                <div className="bg-base-100 rounded-lg shadow p-4">
                    <div className="mt-8">
                        <ChannelConversionChart />
                    </div>
                </div>
            </div>
        </div>
    );
}
