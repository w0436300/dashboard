import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { getAdSpendRevenue } from '../services/api';

export default function AdSpendRevenueChart() {
    const [chartData, setChartData] = useState({ dates: [], adSpend: [], revenue: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAdSpendRevenue();

                // Check if the data exists and make sure the dates are unique and in order
                if (data && data.length > 0) {
                    const uniqueDates = Array.from(new Set(data.map((item) => item.date))).sort();

                    // Extract adSpend and revenue data
                    const adSpend = uniqueDates.map((date) => {
                        const entry = data.find((item) => item.date === date);
                        return entry ? entry.adSpend : 0;
                    });

                    const revenue = uniqueDates.map((date) => {
                        const entry = data.find((item) => item.date === date);
                        return entry ? entry.revenue : 0;
                    });

                    setChartData({ dates: uniqueDates, adSpend, revenue });
                }
            } catch (error) {
                console.error('Error fetching ad spend and revenue data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;

    const options = {
        chart: {
            type: 'line',
            height: 350,
            toolbar: { show: false },
            zoom: { enabled: false }
        },
        title: {
            text: 'Ad Spend vs Revenue',
            align: 'center',
            style: { fontSize: '20px', fontWeight: 'bold' }
        },
        xaxis: {
            categories: chartData.dates,
            labels: { rotate: -45 },
            type: 'datetime'
        },
        yaxis: {
            title: { text: 'Amount ($)' }
        },
        stroke: { curve: 'smooth' },
        markers: { size: 5 },
        tooltip: {
            x: { format: 'yyyy-MM-dd' }
        }
    };

    const series = [
        { name: 'Ad Spend', data: chartData.adSpend },
        { name: 'Revenue', data: chartData.revenue }
    ];

    return (
        <div className="bg-base-100 rounded-lg shadow p-6">
            <Chart options={options} series={series} type="line" height={350} />
        </div>
    );
}
