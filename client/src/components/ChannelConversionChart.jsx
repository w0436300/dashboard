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
    yaxis: { title: { text: 'Conversions' } }
  };

  const series = [{ name: 'Conversions', data: conversionData.conversions }];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Customer Acquisition Cost</h2>
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
}
