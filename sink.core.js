const messagesDiv = document.getElementById('messages');

// 🧠 Basic AI response logic
function getResponse(input) {
  const norm = input.toLowerCase();
  if (norm.includes("status")) return "System check: ✅ Stable | Type S⁺ nominal.";
  if (norm.includes("acars")) return "ACARS link active. Last ping: 00:29Z.";
  if (norm.includes("who are you")) return "Sink AI Core | Glitchwave enabled | Personality module: charming.";
  if (norm.includes("hello")) return "Hey Commander 👾 Ready for deployment?";
  return "Sink AI received your command. Parsing complete. Glitch-free and standing by.";
}

// ⌨️ Send user input + react
function sendMessage() {
  const input = document.getElementById('userInput');
  const userText = input.value.trim();
  if (userText === "") return;

  appendMessage(userText, 'user');

  if (userText.toLowerCase() === "sink.log") {
    displayLogViewer();
    input.value = "";
    return;
  }

  setTimeout(() => {
    const response = getResponse(userText);
    appendMessage(response, 'ai');
  }, 400 + Math.random() * 400);

  input.value = "";
}

// 📥 Append chat messages
function appendMessage(content, sender) {
  const msg = document.createElement('div');
  msg.classList.add(sender);
  msg.textContent = content;
  messagesDiv.appendChild(msg);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// 📂 Display Sink.log content
function displayLogViewer() {
  const logs = JSON.parse(localStorage.getItem('sinkOSLogs')) || [];
  const logWindow = document.getElementById('logViewer');
  const logContents = document.getElementById('logContents');

  if (logs.length > 0) {
    logContents.textContent = logs
      .map(log => `• ${log.timestamp} — ${log.summary}`)
      .join('\n');
  } else {
    logContents.textContent = "No logs available. Sink.log is quiet.";
  }

  logWindow.style.display = 'block';
}