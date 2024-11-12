import { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';
import { getTrafficTrend } from '../services/api';

export default function TrafficChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const renderChart = async () => {
      try {
        const response = await getTrafficTrend();
        const { dates, pageViews } = response.data;

        const options = {
          chart: {
            type: 'line',
            height: 350,
            toolbar: { show: false },
            zoom: { enabled: false }
          },
          series: [{
            name: 'Page Views',
            data: pageViews
          }],
          xaxis: {
            categories: dates,
            labels: {
              rotate: -45,
              style: {
                fontSize: '12px'
              }
            }
          },
          yaxis: {
            title: {
              text: 'Page Views',
              style: {
                fontSize: '14px'
              }
            }
          },
          title: {
            text: 'Website Traffic Trend',
            align: 'center',
            style: {
              fontSize: '18px',
              fontWeight: 'bold'
            }
          },
          stroke: {
            curve: 'smooth',
            width: 2
          },
          markers: {
            size: 4,
            colors: ['#4F46E5'],
            hover: {
              size: 6
            }
          },
          grid: {
            borderColor: '#e2e8f0',
            row: {
              colors: ['#f8fafc', 'transparent'],
              opacity: 0.5
            }
          },
          tooltip: {
            theme: 'light',
            x: {
              format: 'dd MMM yyyy'
            },
            y: {
              formatter: (value) => `${value} views`
            }
          }
        };

        // clear old 
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        // create new
        chartInstance.current = new ApexCharts(chartRef.current, options);
        await chartInstance.current.render();

      } catch (error) {
        console.error('Error rendering traffic chart:', error);
      }
    };

    renderChart();

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div ref={chartRef} />
    </div>
  );
}