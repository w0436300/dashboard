import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { getCustomerAcquisitionCost } from '../services/api';

export default function CustomerAcquisitionChart() {
  const [cacData, setCacData] = useState({ channels: [], cac: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCustomerAcquisitionCost();
        setCacData(data);
      } catch (error) {
        console.error('Error fetching CAC data:', error);
      }
    };
    fetchData();
  }, []);

  const options = {
    chart: {
      type: 'bar',
      height: 350
    },
    title: {
      align: 'center'
    },
    xaxis: {
      categories: cacData.channels
    },
    yaxis: {
      title: {
        text: 'Cost ($)'
      }
    },
    colors: ['#FF5733']
  };

  const series = [
    {
      name: 'CAC',
      data: cacData.cac
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Customer Acquisition Cost</h2>
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
}
