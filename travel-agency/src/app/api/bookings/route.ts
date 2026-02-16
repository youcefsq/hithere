import { NextResponse } from "next/server";
import { addBooking, BookingPayload, listBookings } from "@/lib/booking-store";

const requiredFields: (keyof BookingPayload)[] = [
  "fullName",
  "phone",
  "destination",
  "packageType",
  "travelDate",
  "travelers",
];

const emptyPayload: BookingPayload = {
  fullName: "",
  phone: "",
  email: "",
  destination: "",
  packageType: "",
  travelDate: "",
  travelers: "",
  budget: "",
  notes: "",
};

export async function GET() {
  return NextResponse.json({ bookings: listBookings() }, { status: 200 });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<BookingPayload>;
    const payload: BookingPayload = {
      ...emptyPayload,
      ...body,
    };

    const missingField = requiredFields.find((field) => !payload[field]?.trim());
    if (missingField) {
      return NextResponse.json(
        { error: `الحقل مطلوب: ${missingField}` },
        { status: 400 },
      );
    }

    const booking = addBooking(payload);
    return NextResponse.json(
      { message: "تم استلام طلب الحجز بنجاح", booking },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { error: "تعذر معالجة الطلب، يرجى المحاولة مرة أخرى" },
      { status: 500 },
    );
  }
}
