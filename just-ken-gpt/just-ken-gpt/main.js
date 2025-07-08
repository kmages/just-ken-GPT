// ~/frontend/just-ken-gpt/just-ken-gpt/main.js

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("userInput");
  const output = document.getElementById("output");
  const button = document.getElementById("submitBtn");

  if (!input || !output || !button) {
    console.error("Missing required DOM elements");
    return;
  }

  button.addEventListener("click", async () => {
    const prompt = input.value.trim();
    if (!prompt) {
      output.textContent = "[Please enter a prompt]";
      return;
    }

    output.textContent = "Thinking...";

    try {
      const response = await fetch("https://just-ken-gpt-backend-668853189629.us-central1.run.app/retrieve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("DEBUG: response", data);
      output.textContent = data.completion || "[No response]";
    } catch (err) {
      console.error("Fetch error:", err);
      output.textContent = "Error: " + err.message;
    }
  });
});
