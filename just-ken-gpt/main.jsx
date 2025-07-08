// ~/frontend/just-ken-gpt/main.jsx

const input = document.getElementById("userInput");
const output = document.getElementById("output");
const button = document.getElementById("submitBtn");

button.addEventListener("click", async () => {
  const prompt = input.value;
  output.textContent = "Thinking...";

  try {
    const response = await fetch("https://just-ken-gpt-backend-668853189629.us-central1.run.app/retrieve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Origin": "https://just-ken-gpt.web.app"
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    output.textContent = data.completion || "[No response]";
  } catch (error) {
    console.error("Fetch error:", error);
    output.textContent = "Error: " + error.message;
  }
});
