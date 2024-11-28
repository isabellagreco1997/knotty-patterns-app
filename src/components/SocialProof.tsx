import React, { useState, useEffect } from 'react';

export default function SocialProof() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Generate a random number between 150-300
    const baseCount = Math.floor(Math.random() * (300 - 150 + 1) + 150);
    
    // Get today's date as string to use as seed
    const today = new Date().toDateString();
    
    // Simple hash function for the date
    const hash = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Combine base count with date hash for daily variation
    const dailyCount = baseCount + (hash % 50);
    
    setCount(dailyCount);
  }, []);

  return (
    <p className="text-white/70 text-md mt-4">
      {count.toLocaleString()} other people tried it today!
    </p>
  );
}