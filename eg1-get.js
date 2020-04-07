const { google } = require("googleapis");
const auth = require("./credentials-load");

async function run() {
  //create sheets client
  const sheets = google.sheets({ version: "v4", auth });
  //get a range of values
  const res = await sheets.spreadsheets.values.get({
      spreadsheetId: "15P14oaCnCs1o3cC3mmDXp6h0z-hEmyra0qknYJ-UQR0",
    range: "Player Tracker!A1:E"
  });
  //print results
  console.log(JSON.stringify(res.data, null, 2));
}

run().catch(err => console.error("ERR", err));
