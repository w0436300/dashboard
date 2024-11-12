import { useEffect, useState } from 'react';
import TrafficChart from '../components/TrafficChart';
import CustomerRatioChart from '../components/CustomerRatioChart';
import GeoDistributionChart from '../components/GeoDistributionChart';
import { getTrafficTrend, getCustomerRatio, getGeoDistribution } from '../services/api';

export default function CustomerInsights() {
    const [trafficData, setTrafficData] = useState({ dates: [], pageViews: [] });
    const [customerRatio, setCustomerRatio] = useState({ newCustomers: 0, returningCustomers: 0 });
    const [geoDistribution, setGeoDistribution] = useState({ locations: [], counts: [] });
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const traffic = await getTrafficTrend();
          setTrafficData(traffic);
  
          const ratio = await getCustomerRatio();
          setCustomerRatio(ratio);
  
          const geo = await getGeoDistribution();
          setGeoDistribution(geo);
        } catch (error) {
          console.error('Error fetching customer insights:', error);
        }
      };
  
      fetchData();
    }, []);

    return (
        <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
          <h1 className="text-3xl font-bold">Customer Insights</h1>
          <TrafficChart data={trafficData} />
          <CustomerRatioChart data={customerRatio} />
          <GeoDistributionChart data={geoDistribution} />
        </div>
      );
}
