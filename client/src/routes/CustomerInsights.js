import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TrafficChart from '../components/TrafficChart';
import CustomerRatioChart from '../components/CustomerRatioChart';
import GeoDistributionChart from '../components/GeoDistributionChart';
import { getTrafficTrend, getCustomerRatio, getGeoDistribution } from '../services/api';
import { useAuth } from '../context/AuthProvider';

export default function CustomerInsights() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [trafficData, setTrafficData] = useState({ dates: [], pageViews: [] });
    const [customerRatio, setCustomerRatio] = useState({ newCustomers: 0, returningCustomers: 0 });
    const [geoDistribution, setGeoDistribution] = useState({ locations: [], counts: [] });

    // Check if the user is logged in
    useEffect(() => {
        if (!loading && !user) {
            navigate('/signin');
        }
    }, [user, loading, navigate]);

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
        // Get data only if the user is logged in
        if (user) {
            fetchData();
        }
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (!user) return null;

    return (
        <div className="space-y-8 p-6 bg-base-200 min-h-screen">
            <h1 className="text-3xl font-bold">Customer Insights</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <TrafficChart data={trafficData} />
                <CustomerRatioChart data={customerRatio} />
                <GeoDistributionChart data={geoDistribution} />
            </div>
        </div>
    );
}
