// app.js

const messages = [
  "Thinking...",
  "Writing...",
  "Cogitating...",
  "Adding Tone...",
  "No Em Dashes!",
  "Channeling Cyrano...",
  "Formatting Like a Pro...",
  "Bypassing AI Detection...",
  "Scaring Westlaw...",
  "Building Your Voice...",
  "Preparing Legal Brief...",
  "Summoning Romance...",
  "Infusing Wit...",
  "Injecting Clarity...",
  "Sharpening Argument...",
  "Finalizing Brilliance...",
  "Checking Grammar...",
  "Tuning for Tone...",
  "Crafting Genius...",
  "Style Mode Activated..."
];

function cycleMessages() {
  const messageEl = document.getElementById("thinking-message");
  if (!messageEl) return;

  let i = 0;
  setInterval(() => {
    const random = Math.floor(Math.random() * messages.length);
    messageEl.innerText = messages[random];
    i++;
  }, 1200);
}

document.addEventListener("DOMContentLoaded", () => {
  cycleMessages();

  const promptForm = document.getElementById("prompt-form");
  const promptInput = document.getElementById("prompt-input");
  const responseBox = document.getElementById("response-box");

  if (promptForm) {
    promptForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const prompt = promptInput.value.trim();
      if (!prompt) return;

      responseBox.innerText = "";
      document.getElementById("thinking-box").style.display = "block";

      try {
        const res = await fetch("https://api.biometricbank.com/retrieve", {
          method: "POST",
          headers: {
