import React from 'react';
import AdSpendRevenueChart from '../components/AdSpendRevenueChart';
import AdCTRTrendChart from '../components/AdCTRTrendChart';
import ChannelConversionChart from '../components/ChannelConversionChart';
import CustomerAcquisitionChart from '../components/CustomerAcquisitionChart';

export default function MarketingPerformance() {
  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold">Marketing Performance</h1>
      <AdSpendRevenueChart />
      <AdCTRTrendChart />
      <ChannelConversionChart />
      <CustomerAcquisitionChart />
    </div>
  );
}
