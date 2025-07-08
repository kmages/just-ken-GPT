// main.jsx

import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const DEFAULT_API_KEY = import.meta.env.VITE_DEFAULT_API_KEY || "";

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [apiKey, setApiKey] = useState(DEFAULT_API_KEY);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('https://just-ken-backend-668853189629.us-central1.run.app/retrieve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();
      setResponse(data.response || 'No response received.');
    } catch (err) {
      setResponse('Error: ' + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center space-y-6 p-6 font-sans">
      <h1 className="text-5xl font-bold text-white">Damn. Good.</h1>
      <p className="text-lg text-gray-300">Digital Cyrano, whispering your future in AI.</p>

      <input
        type="text"
        className="w-full max-w-xl p-4 rounded text-black"
        placeholder="Write your prompt here…"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <input
        type="text"
        className="w-full max-w-xl p-2 rounded text-black"
        placeholder="Enter your OpenAI API key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded"
      >
        Write Like Me
      </button>

      <p className="text-gray-400">{loading ? 'Composing your future…' : ''}</p>

      {response && (
        <div className="bg-gray-900 p-4 mt-4 rounded max-w-xl w-full">
          <h2 className="font-bold mb-2">Just Ken’s output</h2>
          <p className="whitespace-pre-line text-gray-100">{response}</p>
        </div>
      )}

      <div className="text-center mt-6 text-sm text-gray-500">
        <p><span className="text-blue-400">Funny quips in your pocket.</span></p>
        <p><span className="text-blue-400">Serious pitches with confidence</span> &nbsp; A library of human warmth.</p>
        <p className="mt-2 italic">Original human results™</p>
        <p className="text-xs mt-1">© Copyright 2024 · Built with the ChatGPT</p>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
