import React, { useState, useEffect } from 'react';

export default function SocialProof() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const today = new Date().toDateString(); // Get today's date as string
    const storedData = localStorage.getItem('dailySocialProof'); // Check if today's count is already stored

    if (storedData) {
      const { date, value } = JSON.parse(storedData);
      if (date === today) {
        // If the date matches, use the stored value
        setCount(value);
        return;
      }
    }

    // If no stored data or the date doesn't match, calculate a new count
    const baseCount = 150 + Math.floor(Math.random() * 151); // Generate a base count between 150-300
    const hash = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0); // Simple hash
    const dailyCount = baseCount + (hash % 50); // Combine base count and hash for daily variation

    setCount(dailyCount);

    // Save today's count to localStorage
    localStorage.setItem(
      'dailySocialProof',
      JSON.stringify({ date: today, value: dailyCount })
    );
  }, []);

  return (
    <p className="text-white/70 text-md mt-4">
      {count.toLocaleString()} other people tried it today!
    </p>
  );
}
