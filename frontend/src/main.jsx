// main.jsx

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem("OPENAI_API_KEY") || "");

  const handleSubmit = async () => {
    if (!prompt || !apiKey) {
      setResponse("Please enter both a prompt and your API key.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://just-ken-backend-668853189629.us-central1.run.app/retrieve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      if (data.response) {
        setResponse(data.response);
      } else if (data.error) {
        setResponse("Error: " + data.error);
      } else {
        setResponse("Unexpected response.");
      }
    } catch (err) {
      setResponse("Request failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApiKeyChange = (e) => {
    const key = e.target.value;
    setApiKey(key);
    localStorage.setItem("OPENAI_API_KEY", key);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", backgroundColor: "#121212", color: "#f1f1f1", minHeight: "100vh" }}>
      <h1>Damn. Good. Writer.</h1>
      <p>Digital Cyrano<br /><em>*No Em Dashes!*</em></p>

      <input
        type="text"
        value={apiKey}
        onChange={handleApiKeyChange}
        placeholder="Enter your OpenAI API key"
        style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem", fontSize: "1rem", backgroundColor: "#222", color: "#fff", border: "1px solid #555" }}
      />

      <textarea
        rows="4"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt"
        style={{ width: "100%", padding: "1rem", fontSize: "1.1rem", marginBottom: "1rem", backgroundColor: "#1a1a1a", color: "#fff", border: "1px solid #444" }}
      />

      <button onClick={handleSubmit} style={{ padding: "0.75rem 1.5rem", fontSize: "1rem", backgroundColor: "#d62828", color: "white", border: "none", cursor: "pointer" }}>
        Write Like Me
      </button>

      <div style={{ marginTop: "2rem", whiteSpace: "pre-wrap", backgroundColor: "#1e1e1e", padding: "1rem", borderRadius: "8px", border: "1px solid #333" }}>
        {loading ? "Thinking..." : response}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
