import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { getCTRTrend } from '../services/api';

export default function AdCTRTrendChart() {
    const [ctrData, setCTRData] = useState({ dates: [], ctr: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCTRTrend();
                setCTRData(data);
            } catch (error) {
                console.error('Error fetching CTR trend data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    // check data exicts

    if (!ctrData || !Array.isArray(ctrData.dates) || !Array.isArray(ctrData.ctr)) {
        return <div>No data available</div>;
    }

    const options = {
        chart: {
            type: 'line',
            height: 350,
            toolbar: { show: false },
            zoom: { enabled: false }
        },
        title: {
            text: 'Ad Click-Through Rate Trend',
            align: 'center'
        },
        xaxis: {
            categories: ctrData.dates,
            labels: { rotate: -45 }
        },
        yaxis: {
            title: { text: 'Click-Through Rate (%)' }
        },
        stroke: {
            curve: 'smooth'
        },
        markers: {
            size: 5,
            colors: ['#1E90FF'],
            hover: { size: 7 }
        },
        tooltip: {
            x: { format: 'yyyy-MM-dd' }
        }
    };

    const series = [
        {
            name: 'CTR',
            data: ctrData.ctr
        }
    ];

    return (
        <div className="bg-base-100 rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Ad Click-Through Rate Trend</h2>
            <Chart options={options} series={series} type="line" height={350} />
        </div>
    );
}
