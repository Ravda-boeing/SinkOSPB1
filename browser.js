document.getElementById("goBtn").addEventListener("click", searchBing);
document.getElementById("urlInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchBing();
});

function searchBing() {
  const query = document.getElementById("urlInput").value.trim();
  const isUrl = query.startsWith("http") || query.includes(".");
  const target = isUrl ? query : `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
  document.getElementById("webView").src = target;
}