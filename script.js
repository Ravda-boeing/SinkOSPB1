function openAppWithoutSPlus() {
  const delay = Math.random() * (19 - 3) + 3;
  console.log(`App loading in ${Math.floor(delay)}s...`);
  setTimeout(() => {
    console.log("App is now open.");
    // Your app logic
  }, delay * 1000);
}
const sPlusModeActive = localStorage.getItem("sPlusMode") === "true";

function simulateLoad() {
  const status = document.getElementById("status");
  const content = document.getElementById("content");

  if (sPlusModeActive) {
    if (status) status.textContent = "Welcome to Sink OS (S⁺ Mode)";
    if (content) content.style.display = "block";
  } else {
    const delay = Math.floor(Math.random() * (100 - 3 + 1)) + 3;
    if (status) status.textContent = `Loading Sink OS... (${delay}s delay)`;
    setTimeout(() => {
      if (status) status.textContent = "Welcome to Sink OS";
      if (content) content.style.display = "block";
    }, delay * 1000);
  }
}

window.onload = simulateLoad;