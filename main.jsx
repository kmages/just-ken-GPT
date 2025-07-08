// main.jsx

import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt) {
      setResponse("Please enter a prompt.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://just-ken-backend-668853189629.us-central1.run.app/retrieve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
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

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", backgroundColor: "#121212", color: "#f1f1f1", minHeight: "100vh" }}>
      <h1>Damn. Good. Writer.</h1>
      <p>Digital Cyrano<br /><em>*No Em Dashes!*</em></p>

      <textarea
        rows="4"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt"
        style={{ width: "100%", padding: "1rem", fontSize: "1.1rem", marginBottom: "1rem" }}
      />

      <button onClick={handleSubmit} style={{ padding: "0.75rem 1.5rem", fontSize: "1rem", backgroundColor: "#d62828", color: "white", border: "none", cursor: "pointer" }}>
        Write Like Me
      </button>

      <div style={{ marginTop: "2rem", whiteSpace: "pre-wrap", backgroundColor: "#1e1e1e", padding: "1rem", borderRadius: "8px" }}>
        {loading ? "Writing..." : response}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
