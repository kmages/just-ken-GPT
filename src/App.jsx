// App.jsx
import React, { useState, useEffect } from 'react';
import './index.css';

const phrases = [
  'Thinking...',
  'Writing...',
  'Cogitating...',
  'Adding Tone...',
  'No Em Dashes!',
  'Checking Your Style...',
  'Channeling Cyrano...',
  'Typing in Ken’s Voice...',
  'Formatting Just Right...',
  'Punching It Up...',
  'Sniffing for Em Dashes...',
  'Smoothing Your Flow...'
];

const App = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState('Writing...');
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (loading) {
      const id = setInterval(() => {
        const next = phrases[Math.floor(Math.random() * phrases.length)];
        setCurrentPhrase(next);
      }, 1000);
      setIntervalId(id);
    } else if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    return () => clearInterval(intervalId);
  }, [loading]);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResponse('');
    try {
      const res = await fetch('https://api.biometricbank.com/retrieve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input })
      });
      const data = await res.json();
      setResponse(data.response || 'No response received.');
    } catch (err) {
      setResponse('Error connecting to GPT backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Damn. Good. Writer.</h1>
      <p className="subhead">Digital Cyrano</p>
      <textarea
        className="input"
        placeholder="The human future of AI"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="button green" onClick={handleSubmit}>
        New Prompt
      </button>
      <div className="output">
        {loading ? <p className="flasher">{currentPhrase}</p> : <pre>{response}</pre>}
      </div>
      <footer>
        <p>© Just Ken GPT · No Em Dashes · All Tone, No Tedium</p>
      </footer>
    </div>
  );
};

export default App;
