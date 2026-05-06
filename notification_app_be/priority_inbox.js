const axios = require("axios");
const { logEvent, setToken } = require("../logging-middleware");
setToken(process.env.tokn);
async function main() {
  try {
    logEvent("backend", "info", "service", "Priority inbox started").catch(() => {});

    const res = await axios.get(
      "http://20.207.122.201/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${process.env.tokn}`
        }
      }
    );
    const notifications = res.data.notifications;
    logEvent("backend", "info", "service", `Fetched ${notifications.length} notifications`).catch(() => {});
    const typeWeight = { "Placement": 3, "Result": 2, "Event": 1 };
    notifications.sort((a, b) => {
      const weightA = typeWeight[a.Type] || 0;
      const weightB = typeWeight[b.Type] || 0;
      const timeA = new Date(a.Timestamp).getTime();
      const timeB = new Date(b.Timestamp).getTime();
      return (weightB * 1e10 + timeB) - (weightA * 1e10 + timeA);
    });
    logEvent("backend", "info", "service", "Sorted by priority").catch(() => {});
    for (let i = 0; i < 10; i++) {
      const n = notifications[i];
      if (n) {
        console.log(`${i + 1}. ${n.Type} - ${n.Message}`);
        logEvent("backend", "info", "route", `Top ${i + 1}: ${n.Type}`).catch(() => {});
      }
    }
    logEvent("backend", "info", "service", "Priority inbox completed").catch(() => {});
  } catch (err) {
    logEvent("backend", "error", "service", `Priority inbox error: ${err.message}`).catch(() => {});
    console.log("Error");
  }
}
main();
