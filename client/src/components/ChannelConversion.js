import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { getChannelConversions } from '../services/api';

const ChannelConversionChart = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'pie',
        height: 350,
      },
      labels: [],
      title: {
        text: 'Channel Conversions',
        align: 'center',
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getChannelConversions();
        const data = result.map(entry => ({ x: entry._id, y: entry.totalSales }));

        setChartData({
          series: data.map(item => item.y),
          options: {
            ...chartData.options,
            labels: data.map(item => item.x),
          },
        });
      } catch (error) {
        console.error('Error fetching channel conversions:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Chart options={chartData.options} series={chartData.series} type="pie" height={350} />
    </div>
  );
};

export default ChannelConversionChart;
