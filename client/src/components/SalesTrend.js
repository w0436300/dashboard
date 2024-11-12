import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { getSalesTrend } from '../services/api';

const SalesTrendChart = () => {
  const [chartData, setChartData] = useState({
    series: [{ name: 'Sales', data: [] }],
    options: {
      chart: {
        type: 'line',
        height: 350,
        toolbar: { show: false },
      },
      xaxis: {
        type: 'datetime',
        categories: [],
      },
      title: {
        text: 'Sales Trend',
        align: 'center',
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getSalesTrend();
        const data = result.map(entry => ({ x: entry._id, y: entry.totalSales }));

        setChartData({
          series: [{ name: 'Sales', data: data.map(item => item.y) }],
          options: {
            ...chartData.options,
            xaxis: {
              categories: data.map(item => item.x),
            },
          },
        });
      } catch (error) {
        console.error('Error fetching sales trend:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Chart options={chartData.options} series={chartData.series} type="line" height={350} />
    </div>
  );
};

export default SalesTrendChart;
