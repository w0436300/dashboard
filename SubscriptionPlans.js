import React, { useState, useEffect } from 'react';

const SubscriptionPlans = ({ userId }) => {
  const [currentPlan, setCurrentPlan] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState('');

  useEffect(() => {
    fetch(`/api/subscription/${userId}`)
      .then(response => response.json())
      .then(data => setCurrentPlan(data.plan || 'free'))
      .catch(error => console.error('Error fetching subscription:', error));
  }, [userId]);

  const handleSubscription = async (plan) => {
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, plan }),
      });
      const result = await response.json();
      setCurrentPlan(result.subscription.plan);
    } catch (error) {
      console.error('Subscription failed:', error);
    }
  };

  const plans = [
    { name: 'Free', price: '$0/mo', value: 'free' },
    { name: 'Pro', price: '$9.99/mo', value: 'pro' },
    { name: 'Premium', price: '$29.99/mo', value: 'premium' },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-center md:space-x-4 space-y-4 md:space-y-0 py-8 bg-gray-800 px-4">
      {plans.map((plan) => (
        <div key={plan.value} className="md:w-1/3 w-full p-4 bg-gray-700 text-white rounded-lg">
          <h3 className="text-xl font-semibold">{plan.name}</h3>
          <p className="text-3xl font-bold mt-2">{plan.price}</p>
          <ul className="mt-4 space-y-2">
            <li>✔ Feature 1</li>
            <li>✔ Feature 2</li>
            <li>✔ Feature 3</li>
          </ul>
          {currentPlan === plan.value ? (
            <button className="mt-6 w-full bg-gray-500 text-white font-bold py-2 rounded opacity-50 cursor-not-allowed">
              Current Plan
            </button>
          ) : (
            <button
              className="mt-6 w-full bg-black text-white font-bold py-2 rounded"
              onClick={() => handleSubscription(plan.value)}
            >
              Select Plan
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default SubscriptionPlans;
