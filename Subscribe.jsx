//subscribe frontend
import React from 'react';
import SubscriptionPlans from '../components/SubscriptionPlans';

function App() {
  const userId = 'user_id_here'; // Replace with actual user ID logic
  return (
    <div className="App">
      <SubscriptionPlans userId={userId} />
    </div>
  );
}

export default App;
