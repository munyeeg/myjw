import { NextResponse } from "next/server";
import { getSheet } from "@/lib/googleSheets";
export async function POST(request: Request) {
  const formData = await request.formData();
  const cookieId = formData.get("CookieId");

  try {
    const sheet = await getSheet();
    const rows = await sheet.getRows();
    const index = rows.findIndex((row) => row.get("CookieId") === cookieId);
    if (index !== -1) {
      return NextResponse.json({
        data: {
          row: index,
          cookieId: cookieId,
          name: rows[index].get("Name"),
          numberOfGuests: rows[index].get("Guests"),
          phone: rows[index].get("Phone"),
          attending: rows[index].get("Attending"),
          timestamp: rows[index].get("Timestamp"),
          animated: rows[index].get("Animated"),
          rom: rows[index].get("ROM"),
        },
        status: 200,
      });
    }
    return NextResponse.json({
      message: `CookieId ${cookieId} does not exist`,
      status: 404,
    });
  } catch (error) {
    console.error("Error checking existing RSVP:", error);
    return NextResponse.json({ message: JSON.stringify(error), status: 500 });
  }
}
