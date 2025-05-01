import React, { useState, useEffect } from 'react';

const Stopwatch = ({ stopwatch, onSave, onDelete }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(stopwatch.time || 0);
  const [name, setName] = useState(stopwatch.name || '');
  const [isEditing, setIsEditing] = useState(!stopwatch.id);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  const handleSave = () => {
    onSave({
      ...stopwatch,
      name,
      time,
    });
    setIsEditing(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="stopwatch">
      {isEditing ? (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Stopwatch name"
        />
      ) : (
        <h3>{name}</h3>
      )}
      <div className="time">{formatTime(time)}</div>
      <div className="controls">
        <button onClick={handleStartStop}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button onClick={handleReset}>Reset</button>
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(stopwatch.id)}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Stopwatch;