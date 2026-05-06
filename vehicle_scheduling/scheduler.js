const axios = require("axios");
const { logEvent, setToken } = require("../logging-middleware");
const headers = {
  Authorization: `Bearer ${process.env.tokn}`
};
setToken(process.env.tokn);
async function main() {
  try {
    logEvent("backend", "info", "service", "Vehicle scheduler started").catch(() => {});
    const depotsRes = await axios.get(
      "http://20.207.122.201/evaluation-service/depots",
      { headers }
    );
    const vehiclesRes = await axios.get(
      "http://20.207.122.201/evaluation-service/vehicles",
      { headers }
    );
    const depots = depotsRes.data.depots;
    const vehicles = vehiclesRes.data.vehicles;
    logEvent("backend", "info", "service", `Fetched ${depots.length} depots and ${vehicles.length} vehicles`).catch(() => {});
    for (let depot of depots) {
      let hours = depot.MechanicHours;
      let total = 0;
      console.log(`Depot ${depot.ID}`);
      logEvent("backend", "info", "route", `Processing depot ${depot.ID}`).catch(() => {});
      for (let v of vehicles) {
        if (v.Duration <= hours) {
          console.log(`${v.TaskID} - ${v.Duration} hrs - Impact ${v.Impact}`);
          hours = hours - v.Duration;
          total = total + v.Impact;
        }
      }
      console.log(`Total Impact: ${total}`);
      console.log("");
      logEvent("backend", "info", "route", `Depot ${depot.ID} total impact ${total}`).catch(() => {});
    }
    logEvent("backend", "info", "service", "Vehicle scheduler completed").catch(() => {});
  } catch (err) {
    logEvent("backend", "error", "service", `Scheduler error: ${err.message}`).catch(() => {});
    console.log("Error");
  }
}

main();
