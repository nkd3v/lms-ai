import React, { createContext, useState, useEffect } from 'react';

// Create the context with initial state
export const BehaviorContext = createContext({
  behaviorStatus: 'idle',
  timer: null,
});

// Create a provider component to manage the context
export const BehaviorProvider = ({ children }) => {
  const [behaviorStatus, setBehaviorStatus] = useState('Normal');
  const [timer, setTimer] = useState(1800);

  // Example of updating behavior status (you can adapt this to your needs)
  useEffect(() => {
    // Simulate some behavior change after 5 seconds
    const timeoutId = setTimeout(() => {
      setBehaviorStatus('active');
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <BehaviorContext.Provider value={{ behaviorStatus, timer, setBehaviorStatus, setTimer }}>
      {children}
    </BehaviorContext.Provider>
  );
};
