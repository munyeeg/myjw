import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

// These would typically be environment variables
const SPREADSHEET_ID = process.env.SPREADSHEET_ID ?? "";
const SHEET_ID = "0";

const client = new JWT({
  email: process.env.client_email,
  key: process.env.private_key,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export const doc = new GoogleSpreadsheet(SPREADSHEET_ID, client);

export async function getSheet() {
  await doc.loadInfo();
  return doc.sheetsById[SHEET_ID];
}
