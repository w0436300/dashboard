import React from 'react';
import Chart from 'react-apexcharts';

export default function GeoDistributionChart({ data }) {
  const options = {
    xaxis: {
      categories: data.locations,
    },
    title: {
        text: 'Geographic distribution',
        align: 'center',
      },
  };

  const series = [
    {
      name: 'Customers',
      data: data.counts
    }
  ];

  return <Chart options={options} series={series} type="bar" height={350} />;
}
