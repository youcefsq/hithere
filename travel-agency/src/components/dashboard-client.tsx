"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Inbox, RefreshCw } from "lucide-react";
import type { BookingEntry } from "@/lib/booking-store";

type FetchState = "idle" | "loading" | "error";

const formatDate = (isoDate: string): string =>
  new Intl.DateTimeFormat("ar-SA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(isoDate));

export default function DashboardClient() {
  const [bookings, setBookings] = useState<BookingEntry[]>([]);
  const [state, setState] = useState<FetchState>("idle");
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const loadBookings = useCallback(async () => {
    setState("loading");
    try {
      const response = await fetch("/api/bookings", {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("تعذر تحميل البيانات");
      }

      const data = (await response.json()) as { bookings: BookingEntry[] };
      setBookings(data.bookings ?? []);
      setLastUpdated(new Date().toISOString());
      setState("idle");
    } catch {
      setState("error");
    }
  }, []);

  useEffect(() => {
    void loadBookings();
  }, [loadBookings]);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex flex-col gap-3 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-emerald-700">لوحة الحجوزات</p>
            <h1 className="text-2xl font-extrabold">طلبات العملاء الجديدة</h1>
            {lastUpdated ? (
              <p className="mt-1 text-xs text-slate-500">
                آخر تحديث: {formatDate(lastUpdated)}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={() => void loadBookings()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            <RefreshCw className="h-4 w-4" />
            تحديث
          </button>
        </header>

        {state === "error" ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-medium text-rose-700">
            تعذر تحميل الحجوزات حاليًا. يرجى المحاولة مجددًا.
          </div>
        ) : null}

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {bookings.length === 0 && state !== "loading" ? (
            <div className="flex flex-col items-center justify-center gap-3 px-4 py-16 text-center">
              <Inbox className="h-10 w-10 text-slate-300" />
              <p className="text-base font-semibold text-slate-700">
                لا توجد طلبات حجز بعد
              </p>
              <p className="text-sm text-slate-500">
                ستظهر هنا جميع الطلبات القادمة من نموذج الحجز.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 p-4 sm:grid-cols-2">
              {bookings.map((booking, index) => (
                <motion.article
                  key={booking.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.2) }}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">
                        {booking.fullName}
                      </h2>
                      <p className="text-xs text-slate-500">
                        {formatDate(booking.submittedAt)}
                      </p>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                      {booking.destination}
                    </span>
                  </div>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between gap-2">
                      <dt className="text-slate-500">نوع الباقة</dt>
                      <dd className="font-semibold">{booking.packageType}</dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt className="text-slate-500">تاريخ السفر</dt>
                      <dd className="font-semibold">{booking.travelDate}</dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt className="text-slate-500">عدد المسافرين</dt>
                      <dd className="font-semibold">{booking.travelers}</dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt className="text-slate-500">الهاتف</dt>
                      <dd className="font-semibold">{booking.phone}</dd>
                    </div>
                    {booking.email ? (
                      <div className="flex justify-between gap-2">
                        <dt className="text-slate-500">البريد الإلكتروني</dt>
                        <dd className="font-semibold">{booking.email}</dd>
                      </div>
                    ) : null}
                    {booking.budget ? (
                      <div className="flex justify-between gap-2">
                        <dt className="text-slate-500">الميزانية</dt>
                        <dd className="font-semibold">{booking.budget}</dd>
                      </div>
                    ) : null}
                  </dl>
                  {booking.notes ? (
                    <p className="mt-3 rounded-lg bg-white p-3 text-sm text-slate-700">
                      {booking.notes}
                    </p>
                  ) : null}
                </motion.article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
