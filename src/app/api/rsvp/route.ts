import { NextResponse } from "next/server";
import { getSheet } from "@/lib/googleSheets";

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const guests = formData.get("numberOfGuests") as string;
  const attending = formData.get("attending") as string;
  const cookieId = formData.get("CookieId") as string;
  const row = formData.get("row") as string;
  const animated = formData.get("animated") as string;
  const rom = formData.get("rom") as string;

  try {
    const sheet = await getSheet();

    if (row) {
      const rows = await sheet.getRows();
      rows[parseInt(row)].assign({
        Name: name,
        Phone: phone,
        Guests: guests,
        Attending: attending,
        Timestamp: new Date().toISOString(),
        CookieId: cookieId,
        Animated: animated,
        ROM: rom,
      });
      await rows[parseInt(row)].save();

      return NextResponse.json(
        { message: `${name} ${guests} ${attending} ${row} updated` },
        { status: 200 }
      );
    } else {
      await sheet.addRow({
        Name: name,
        Phone: phone,
        Guests: guests,
        Attending: attending,
        Timestamp: new Date().toISOString(),
        CookieId: cookieId,
        Animated: animated,
        ROM: rom,
      });

      return NextResponse.json(
        { message: "RSVP submitted successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error submitting RSVP:", error);
    return NextResponse.json(
      { message: JSON.stringify(error) },
      { status: 500 }
    );
  }
}
