import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Chart from 'react-apexcharts';

const GoogleAnalytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: format(new Date().setDate(new Date().getDate() - 30), 'yyyy-MM-dd'),
    endDate: format(new Date(), 'yyyy-MM-dd')
  });

  useEffect(() => {
    fetchAnalyticsData();
  }, [dateRange]);

  const fetchAnalyticsData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/analytics/metrics?` +
        new URLSearchParams(dateRange)
      );
      const result = await response.json();
      if (result.success) {
        setData(result.data);
      } else {
        throw new Error('API request failed');
      }
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      // Generate mock data if API fails
      const mockData = {
        isMockData: true,
        rows: Array.from({ length: 30 }, (_, index) => {
          const date = new Date();
          date.setDate(date.getDate() - (29 - index));
          return {
            date: format(date, 'yyyy-MM-dd'),
            totalUsers: Math.floor(1000 + Math.random() * 500),
            activeUsers: Math.floor(500 + Math.random() * 200),
            screenPageViews: Math.floor(3000 + Math.random() * 1000),
            transactions: Math.floor(50 + Math.random() * 30)
          };
        }),
        totals: {
          totalUsers: 15000,
          activeUsers: 8000,
          screenPageViews: 50000,
          transactions: 1200
        }
      };
      setData(mockData);
    } finally {
      setLoading(false);
    }
  };

  // Card component
  const Card = ({ color, title, value, change, icon }) => (
    <div className={`${color} p-4 rounded-lg shadow-sm`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <h3 className="text-2xl font-semibold mt-1">{value}</h3>
          {change && <p className="text-xs text-gray-500 mt-1">{change}</p>}
        </div>
        <div className="p-2 rounded-full bg-white/50">{icon}</div>
      </div>
    </div>
  );

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  // Chart configurations
  const baseChartOptions = {
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    grid: {
      borderColor: '#e2e8f0',
      strokeDashArray: 4,
      xaxis: {
        lines: { show: true }
      }
    }
  };

  const userTrendOptions = {
    ...baseChartOptions,
    chart: {
      ...baseChartOptions.chart,
      height: 350
    },
    xaxis: {
      categories: data?.rows.map(row => format(new Date(row.date), 'MM/dd')) || []
    },
    yaxis: {
      title: { text: 'Users' }
    },
    title: {
      text: 'User Trends',
      align: 'center'
    }
  };

  const pageViewsOptions = {
    ...baseChartOptions,
    chart: {
      ...baseChartOptions.chart,
      type: 'bar',
      height: 350
    },
    xaxis: {
      categories: data?.rows.map(row => format(new Date(row.date), 'MM/dd')) || []
    },
    yaxis: {
      title: { text: 'Page Views' }
    },
    title: {
      text: 'Page Views',
      align: 'center'
    }
  };

  return (
    <div className="space-y-6 p-2 lg:p-0">
      {data?.isMockData && (
        <div className="mb-4 p-4 bg-blue-50 text-blue-700 rounded-md">
          Currently displaying mock data as Google Analytics data is unavailable.
        </div>
      )}

      <div className="bg-base-200 rounded-lg shadow min-w-[22%] lg:min-w-0 p-2 lg:p-4">
        <h1 className="text-xl">Analytics Overview</h1>
        <p className="text-stone-500 text-sm mb-2">Performance Summary</p>

        <div className="flex lg:grid lg:grid-cols-4 gap-1.5 lg:gap-4 justify-evenly">
          <Card
            color="bg-red-50"
            title="Total Users"
            value={data?.totals.totalUsers.toLocaleString()}
            change="+8% from yesterday"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-blue-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            }
          />

          <Card
            color="bg-orange-50"
            title="Active Users"
            value={data?.totals.activeUsers.toLocaleString()}
            change="+10% from yesterday"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-blue-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            }
          />

          <Card
            color="bg-green-50"
            title="Page Views"
            value={data?.totals.screenPageViews.toLocaleString()}
            change="-5% from yesterday"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-blue-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
          />

          <Card
            color="bg-indigo-50"
            title="Transactions"
            value={data?.totals.transactions.toLocaleString()}
            change="+12% from yesterday"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-blue-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-base-200 rounded-lg shadow p-4">
          <div className="mt-8">
            <Chart
              options={userTrendOptions}
              series={[{
                name: 'Users',
                data: data?.rows.map(row => row.totalUsers) || []
              }]}
              type="line"
              height={350}
            />
          </div>
        </div>

        <div className="bg-base-200 rounded-lg shadow p-4">
          <div className="mt-8">
            <Chart
              options={pageViewsOptions}
              series={[{
                name: 'Page Views',
                data: data?.rows.map(row => row.screenPageViews) || []
              }]}
              type="bar"
              height={350}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleAnalytics;