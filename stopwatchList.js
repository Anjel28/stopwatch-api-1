import React, { useState, useEffect } from 'react';
import Stopwatch from './Stopwatch';
import { getStopwatches, createStopwatch, updateStopwatch, deleteStopwatch } from '../services/api';

const StopwatchList = () => {
  const [stopwatches, setStopwatches] = useState([]);

  useEffect(() => {
    fetchStopwatches();
  }, []);

  const fetchStopwatches = async () => {
    const data = await getStopwatches();
    setStopwatches(data);
  };

  const handleCreate = () => {
    setStopwatches([...stopwatches, { id: Date.now(), name: '', time: 0 }]);
  };

  const handleSave = async (stopwatch) => {
    if (stopwatch.id) {
      // Update existing
      await updateStopwatch(stopwatch.id, stopwatch);
    } else {
      // Create new
      await createStopwatch(stopwatch);
    }
    fetchStopwatches();
  };

  const handleDelete = async (id) => {
    await deleteStopwatch(id);
    fetchStopwatches();
  };

  return (
    <div className="stopwatch-list">
      <h2>Stopwatches</h2>
      <button onClick={handleCreate}>Add New Stopwatch</button>
      <div className="stopwatches-container">
        {stopwatches.map((stopwatch) => (
          <Stopwatch
            key={stopwatch.id}
            stopwatch={stopwatch}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default StopwatchList;