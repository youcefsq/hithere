export type BookingPayload = {
  fullName: string;
  phone: string;
  email: string;
  destination: string;
  packageType: string;
  travelDate: string;
  travelers: string;
  budget: string;
  notes: string;
};

export type BookingEntry = BookingPayload & {
  id: string;
  submittedAt: string;
};

const bookings: BookingEntry[] = [];

const sanitize = (value: string): string => value.trim().replace(/\s+/g, " ");

export const normalizeBooking = (payload: BookingPayload): BookingPayload => ({
  fullName: sanitize(payload.fullName),
  phone: sanitize(payload.phone),
  email: sanitize(payload.email),
  destination: sanitize(payload.destination),
  packageType: sanitize(payload.packageType),
  travelDate: sanitize(payload.travelDate),
  travelers: sanitize(payload.travelers),
  budget: sanitize(payload.budget),
  notes: sanitize(payload.notes),
});

export const addBooking = (payload: BookingPayload): BookingEntry => {
  const normalized = normalizeBooking(payload);
  const booking: BookingEntry = {
    ...normalized,
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
  };

  bookings.unshift(booking);
  if (bookings.length > 250) {
    bookings.pop();
  }

  return booking;
};

export const listBookings = (): BookingEntry[] => [...bookings];
