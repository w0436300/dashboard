import React from 'react';
import Chart from 'react-apexcharts';

export default function CustomerRatioChart({ data }) {
  const options = {
    labels: ['New Customers', 'Returning Customers'],
    colors: ['#3B82F6', '#10B981'],
    title: {
        text: 'Customer Ratio',
        align: 'center',
      },
    
  };

  const series = [data.newCustomers, data.returningCustomers];

  return <Chart options={options} series={series} type="donut" height={350} />;
}
