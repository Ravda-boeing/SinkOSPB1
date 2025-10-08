const LOG_KEY = "sinkOSLogs";
const RECOVERY_KEY = "sinkOSLogs_Archive";
const LOG_INTERVAL = 20 * 60 * 1000; // 20 minutes
const EXPIRY = 18 * 7 * 24 * 60 * 60 * 1000; // 18 weeks
const GRACE_PERIOD = 2 * 7 * 24 * 60 * 60 * 1000; // 2 weeks

// Simulate memory/CPU/power metrics
function getSystemStats() {
  return {
    mem: `${Math.floor(Math.random() * 60 + 20)}%`,
    cpu: `${Math.floor(Math.random() * 25 + 5)}%`,
    power: `${(Math.random() * 5 + 2).toFixed(2)} W`
  };
}

function getSinkSummary() {
  const now = new Date();
  const stats = getSystemStats();
  return {
    timestamp: now.toISOString(),
    summary: `UTC: ${now.toUTCString()}\nUser: Executed background processes.\nOS: Type S⁺ sync | MEM ${stats.mem} | CPU ${stats.cpu} | POWER ${stats.power}`
  };
}

function cleanOldLogs(logs, now) {
  return logs.filter(log => now - new Date(log.timestamp).getTime() < EXPIRY);
}

function archiveDeletedLogs(deleted) {
  const archive = JSON.parse(localStorage.getItem(RECOVERY_KEY)) || [];
  const combined = [...archive, ...deleted];
  localStorage.setItem(RECOVERY_KEY, JSON.stringify(combined));
}

function logSinkStatus() {
  const logs = JSON.parse(localStorage.getItem(LOG_KEY)) || [];
  const now = Date.now();
  const newLog = getSinkSummary();

  const freshLogs = cleanOldLogs([...logs, newLog], now);
  const expired = logs.filter(log => now - new Date(log.timestamp).getTime() >= EXPIRY);
  if (expired.length) archiveDeletedLogs(expired);

  localStorage.setItem(LOG_KEY, JSON.stringify(freshLogs));
}

// Initial + interval trigger
logSinkStatus();
setInterval(logSinkStatus, LOG_INTERVAL);