import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { getAdChannelConversions } from '../services/api';

export default function ChannelConversionChart() {
    const [conversionData, setConversionData] = useState({ channels: [], conversions: [] });

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAdChannelConversions();
            setConversionData(data);
        };
        fetchData();
    }, []);

    const options = {
        chart: { type: 'bar', height: 350 },
        xaxis: { categories: conversionData.channels },
        yaxis: { title: { text: 'Conversions' } },
        title: {
            text: 'Ad Channel Conversions',
            align: 'center',
            style: { fontSize: '20px', fontWeight: 'bold' }
        },
    };

    const series = [{ name: 'Conversions', data: conversionData.conversions }];

    return (
        <div className="bg-base-200 rounded-lg shadow p-6">
            <Chart options={options} series={series} type="bar" height={350} />
        </div>
    );
}
