// /home/kmages/frontend/just-ken-gpt/main.js

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("userInput");
  const output = document.getElementById("output");
  const button = document.getElementById("submitBtn");

  if (!input || !output || !button) {
    console.error("Missing input, output, or button element");
    return;
  }

  button.addEventListener("click", async () => {
    const prompt = input.value.trim();
    if (!prompt) {
      output.textContent = "Please enter a prompt first.";
      return;
    }

    output.textContent = "Writing...";

    try {
      const response = await fetch("https://just-ken-gpt-backend-668853189629.us-central1.run.app/retrieve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });

      const data = await response.json();
      output.textContent = data.completion || "[No response from Ken]";
    } catch (err) {
      console.error("Error:", err);
      output.textContent = "There was an error reaching Ken.";
    }
  });
});
