"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Globe2,
  Hotel,
  Landmark,
  MapPin,
  MessageCircle,
  Plane,
  Search,
  ShieldCheck,
  Star,
  Users,
  Wallet,
} from "lucide-react";
import { agencyProfile, heroSlides, spiritualPackages, testimonials, worldTours } from "@/lib/data";
import type { BookingPayload } from "@/lib/booking-store";

type QuickSearch = {
  destination: string;
  date: string;
  budget: string;
};

type SubmissionState = {
  type: "idle" | "success" | "error";
  message: string;
};

const quickSearchDefaults: QuickSearch = {
  destination: "",
  date: "",
  budget: "",
};

const bookingDefaults: BookingPayload = {
  fullName: "",
  phone: "",
  email: "",
  destination: "",
  packageType: "",
  travelDate: "",
  travelers: "2",
  budget: "",
  notes: "",
};

const motionSection = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const bookingFieldClass =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 shadow-sm transition placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100";

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [quickSearch, setQuickSearch] = useState<QuickSearch>(quickSearchDefaults);
  const [bookingData, setBookingData] = useState<BookingPayload>(bookingDefaults);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    type: "idle",
    message: "",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6200);

    return () => clearInterval(interval);
  }, []);

  const emailDraftHref = useMemo(() => {
    const subject = `طلب حجز جديد - ${bookingData.fullName || "عميل جديد"}`;
    const body = [
      `الاسم: ${bookingData.fullName || "-"}`,
      `الهاتف/واتساب: ${bookingData.phone || "-"}`,
      `البريد الإلكتروني: ${bookingData.email || "-"}`,
      `الوجهة: ${bookingData.destination || "-"}`,
      `نوع الباقة: ${bookingData.packageType || "-"}`,
      `تاريخ السفر: ${bookingData.travelDate || "-"}`,
      `عدد المسافرين: ${bookingData.travelers || "-"}`,
      `الميزانية: ${bookingData.budget || "-"}`,
      `ملاحظات: ${bookingData.notes || "-"}`,
    ].join("\n");

    return `mailto:${agencyProfile.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }, [bookingData]);

  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleQuickSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBookingData((previous) => ({
      ...previous,
      destination: quickSearch.destination || previous.destination,
      travelDate: quickSearch.date || previous.travelDate,
      budget: quickSearch.budget || previous.budget,
    }));
    scrollToBooking();
  };

  const choosePackage = (destination: string, packageType: string) => {
    setBookingData((previous) => ({
      ...previous,
      destination,
      packageType,
    }));
    scrollToBooking();
  };

  const handleBookingSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmissionState({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const data = (await response.json()) as { error?: string; message?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "تعذر إرسال طلب الحجز.");
      }

      const whatsappMessage = [
        "مرحبًا فريق آفاق النور، أود تأكيد طلب الحجز التالي:",
        `الاسم: ${bookingData.fullName}`,
        `الهاتف: ${bookingData.phone}`,
        `الوجهة: ${bookingData.destination}`,
        `نوع الباقة: ${bookingData.packageType}`,
        `تاريخ السفر: ${bookingData.travelDate}`,
        `عدد المسافرين: ${bookingData.travelers}`,
        bookingData.budget ? `الميزانية: ${bookingData.budget}` : "",
        bookingData.notes ? `ملاحظات: ${bookingData.notes}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      const whatsappLink = `https://wa.me/${agencyProfile.whatsappNumber}?text=${encodeURIComponent(
        whatsappMessage,
      )}`;
      window.open(whatsappLink, "_blank", "noopener,noreferrer");

      setSubmissionState({
        type: "success",
        message: "تم استلام طلبك بنجاح. فتحنا لك محادثة واتساب لإكمال التأكيد فورًا.",
      });
      setBookingData((previous) => ({
        ...bookingDefaults,
        destination: previous.destination,
        packageType: previous.packageType,
      }));
      setQuickSearch(quickSearchDefaults);
    } catch (error) {
      setSubmissionState({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "حدث خطأ غير متوقع. يرجى المحاولة مجددًا.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[radial-gradient(circle_at_top,_#ecfeff_0%,_#f8fafc_35%,_#ffffff_100%)] text-slate-900">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-emerald-100/80 bg-white/90 backdrop-blur">
        <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#home" className="text-lg font-black tracking-tight text-emerald-900">
            {agencyProfile.name}
          </a>
          <div className="hidden items-center gap-5 text-sm font-semibold text-slate-700 md:flex">
            <a href="#spiritual" className="transition hover:text-emerald-700">
              الرحلات الروحانية
            </a>
            <a href="#world" className="transition hover:text-sky-700">
              الوجهات العالمية
            </a>
            <a href="#reviews" className="transition hover:text-emerald-700">
              آراء العملاء
            </a>
            <a href="#booking" className="transition hover:text-sky-700">
              الحجز
            </a>
          </div>
          <button
            type="button"
            onClick={scrollToBooking}
            className="rounded-full bg-gradient-to-l from-emerald-700 to-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:from-emerald-800 hover:to-emerald-700"
          >
            احجز الآن
          </button>
        </nav>
      </header>

      <main id="home" className="pb-20 pt-20">
        <section className="mx-auto mt-6 w-full max-w-6xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-[30px] border border-emerald-200/50 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.15)]">
            <div className="absolute inset-0">
              <AnimatePresence initial={false} mode="sync">
                {heroSlides.map((slide, index) =>
                  activeSlide === index ? (
                    <motion.div
                      key={slide.id}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      className="absolute inset-0"
                    >
                      {slide.visualType === "video" ? (
                        <video
                          className="h-full w-full object-cover"
                          src={slide.source}
                          autoPlay
                          muted
                          loop
                          playsInline
                        />
                      ) : (
                        <div
                          className="h-full w-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${slide.source})` }}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-emerald-950/45 to-sky-900/35" />
                    </motion.div>
                  ) : null,
                )}
              </AnimatePresence>
            </div>

            <div className="relative z-10 grid gap-6 px-5 pb-8 pt-10 sm:px-8 sm:pb-10 sm:pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div className="space-y-4 text-white">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/15 px-4 py-1 text-xs font-semibold backdrop-blur">
                  <BadgeCheck className="h-4 w-4 text-amber-300" />
                  وكالة معتمدة للحج والعمرة والسياحة الدولية
                </span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={heroSlides[activeSlide].id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-3"
                  >
                    <p className="text-sm font-semibold text-amber-200">
                      {heroSlides[activeSlide].accent}
                    </p>
                    <h1 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                      {heroSlides[activeSlide].title}
                    </h1>
                    <p className="max-w-xl text-sm leading-7 text-slate-100 sm:text-base">
                      {heroSlides[activeSlide].subtitle}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={scrollToBooking}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-l from-amber-500 to-amber-400 px-5 py-2.5 text-sm font-extrabold text-slate-900 transition hover:brightness-95"
                  >
                    احجز رحلة أحلامك
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <a
                    href={`https://wa.me/${agencyProfile.whatsappNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/45 bg-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/25"
                  >
                    <MessageCircle className="h-4 w-4" />
                    تواصل واتساب
                  </a>
                </div>
              </div>

              <form
                onSubmit={handleQuickSearch}
                className="rounded-2xl border border-white/20 bg-white/92 p-4 text-slate-800 shadow-xl backdrop-blur-sm"
              >
                <h2 className="mb-3 text-base font-extrabold text-emerald-900">
                  بحث سريع عن رحلتك
                </h2>
                <div className="grid gap-3">
                  <label className="text-xs font-semibold text-slate-600">
                    الوجهة
                    <select
                      value={quickSearch.destination}
                      onChange={(event) =>
                        setQuickSearch((previous) => ({
                          ...previous,
                          destination: event.target.value,
                        }))
                      }
                      className={`${bookingFieldClass} mt-1`}
                    >
                      <option value="">اختر الوجهة</option>
                      <option value="مكة المكرمة">مكة المكرمة</option>
                      <option value="المدينة المنورة">المدينة المنورة</option>
                      <option value="ماليزيا">ماليزيا</option>
                      <option value="دبي">دبي</option>
                      <option value="قطر">قطر</option>
                    </select>
                  </label>

                  <label className="text-xs font-semibold text-slate-600">
                    تاريخ السفر
                    <input
                      type="date"
                      value={quickSearch.date}
                      onChange={(event) =>
                        setQuickSearch((previous) => ({
                          ...previous,
                          date: event.target.value,
                        }))
                      }
                      className={`${bookingFieldClass} mt-1`}
                    />
                  </label>

                  <label className="text-xs font-semibold text-slate-600">
                    الميزانية
                    <select
                      value={quickSearch.budget}
                      onChange={(event) =>
                        setQuickSearch((previous) => ({
                          ...previous,
                          budget: event.target.value,
                        }))
                      }
                      className={`${bookingFieldClass} mt-1`}
                    >
                      <option value="">اختر نطاق الميزانية</option>
                      <option value="أقل من 4,000 ر.س">أقل من 4,000 ر.س</option>
                      <option value="من 4,000 إلى 8,000 ر.س">من 4,000 إلى 8,000 ر.س</option>
                      <option value="من 8,000 إلى 15,000 ر.س">من 8,000 إلى 15,000 ر.س</option>
                      <option value="أكثر من 15,000 ر.س">أكثر من 15,000 ر.س</option>
                    </select>
                  </label>

                  <button
                    type="submit"
                    className="mt-1 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-emerald-700 to-sky-600 px-4 text-sm font-semibold text-white transition hover:opacity-95"
                  >
                    <Search className="h-4 w-4" />
                    ابحث الآن
                  </button>
                </div>
              </form>
            </div>

            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
                }
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/45 bg-black/35 text-white backdrop-blur transition hover:bg-black/45"
                aria-label="الشريحة السابقة"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setActiveSlide((prev) => (prev + 1) % heroSlides.length)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/45 bg-black/35 text-white backdrop-blur transition hover:bg-black/45"
                aria-label="الشريحة التالية"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            </div>

            <div className="absolute bottom-4 right-4 flex items-center gap-1.5">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  className={`h-2.5 rounded-full transition ${
                    activeSlide === index ? "w-8 bg-amber-300" : "w-2.5 bg-white/60"
                  }`}
                  aria-label={`انتقل إلى الشريحة ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        <motion.section
          id="spiritual"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={motionSection}
          transition={{ duration: 0.45 }}
          className="mx-auto mt-16 w-full max-w-6xl px-4 sm:px-6"
        >
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-emerald-700">الرحلات الروحانية</p>
              <h2 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                برامج العمرة والحج
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                باقات مصممة لتمنحك الراحة والسكينة، مع شفافية كاملة في الخدمات والأسعار.
              </p>
            </div>
            <a
              href="#booking"
              className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              طلب استشارة مجانية
            </a>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {spiritualPackages.map((pkg, index) => (
              <motion.article
                key={pkg.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.16) }}
                className="group rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                    باقة {pkg.tier}
                  </span>
                  <span className="text-sm font-extrabold text-amber-700">{pkg.price}</span>
                </div>

                <h3 className="text-xl font-black text-slate-900">{pkg.title}</h3>

                <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-700">
                  <p className="inline-flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
                    <Clock3 className="h-4 w-4 text-emerald-700" />
                    {pkg.duration}
                  </p>
                  <p className="inline-flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
                    <Hotel className="h-4 w-4 text-amber-500" />
                    {pkg.hotelRating}
                  </p>
                </div>

                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <Landmark className="mt-0.5 h-4 w-4 text-emerald-700" />
                    <span>{pkg.haramProximity}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="mt-0.5 h-4 w-4 text-emerald-700" />
                    <span>{pkg.visaProcessing}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Plane className="mt-0.5 h-4 w-4 text-emerald-700" />
                    <span>{pkg.transportation}</span>
                  </li>
                </ul>

                <div className="mt-4 flex flex-wrap gap-2">
                  {pkg.highlights.map((item) => (
                    <span
                      key={`${pkg.id}-${item}`}
                      className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => choosePackage("مكة المكرمة", pkg.title)}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-emerald-700 to-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-95"
                >
                  عرض التفاصيل
                  <ArrowLeft className="h-4 w-4" />
                </button>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="world"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={motionSection}
          transition={{ duration: 0.45 }}
          className="mx-auto mt-16 w-full max-w-6xl px-4 sm:px-6"
        >
          <div className="mb-7">
            <p className="text-sm font-bold text-sky-700">الوجهات العالمية</p>
            <h2 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
              رحلات دولية منظمة إلى ماليزيا ودبي وقطر
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
              برامج يومية واضحة، وفنادق عالية التقييم، وتجربة سفر سلسة من الحجز حتى العودة.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {worldTours.map((tour, index) => (
              <motion.article
                key={tour.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.16) }}
                className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-800">
                    {tour.voyageType}
                  </span>
                  <span className="text-sm font-extrabold text-emerald-700">{tour.price}</span>
                </div>

                <h3 className="text-xl font-black text-slate-900">{tour.destination}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{tour.summary}</p>

                <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                  <span className="inline-flex items-center gap-1 rounded-lg bg-slate-50 px-2 py-1.5 font-semibold text-slate-700">
                    <CalendarClock className="h-3.5 w-3.5 text-sky-600" />
                    {tour.duration}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-lg bg-slate-50 px-2 py-1.5 font-semibold text-slate-700">
                    <Building2 className="h-3.5 w-3.5 text-sky-600" />
                    {tour.hotelRating}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-lg bg-slate-50 px-2 py-1.5 font-semibold text-slate-700">
                    <Globe2 className="h-3.5 w-3.5 text-sky-600" />
                    منظم
                  </span>
                </div>

                <ol className="mt-4 space-y-3 border-r-2 border-sky-100 pr-4">
                  {tour.itinerary.map((day) => (
                    <li key={`${tour.id}-${day.day}`} className="relative">
                      <span className="absolute -right-[21px] top-1.5 h-3 w-3 rounded-full bg-sky-500 ring-4 ring-sky-100" />
                      <p className="text-xs font-extrabold text-sky-700">{day.day}</p>
                      <p className="text-sm font-bold text-slate-800">{day.title}</p>
                      <p className="text-xs leading-6 text-slate-600">{day.details}</p>
                    </li>
                  ))}
                </ol>

                <button
                  type="button"
                  onClick={() => choosePackage(tour.destination, `${tour.destination} - رحلة منظمة`)}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-sky-200 bg-sky-50 px-4 py-2.5 text-sm font-semibold text-sky-800 transition hover:bg-sky-100"
                >
                  عرض التفاصيل
                  <ArrowLeft className="h-4 w-4" />
                </button>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="reviews"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={motionSection}
          transition={{ duration: 0.45 }}
          className="mx-auto mt-16 w-full max-w-6xl px-4 sm:px-6"
        >
          <div className="mb-7">
            <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">تجارب عملائنا</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
              ثقة المسافرين هي أساس نجاحنا، وهذا ما قاله عملاؤنا بعد رحلاتهم.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: Math.min(index * 0.06, 0.2) }}
                className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm"
              >
                <div className="mb-2 flex items-center gap-0.5 text-amber-500">
                  {Array.from({ length: item.rating }).map((_, starIndex) => (
                    <Star key={`${item.id}-star-${starIndex}`} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm leading-7 text-slate-700">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="mt-4 border-t border-slate-100 pt-3">
                  <p className="font-bold text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.trip}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="booking"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={motionSection}
          transition={{ duration: 0.45 }}
          className="mx-auto mt-16 w-full max-w-6xl px-4 sm:px-6"
        >
          <div className="overflow-hidden rounded-[26px] border border-emerald-200 bg-white shadow-[0_20px_50px_rgba(2,44,34,0.12)]">
            <div className="grid gap-0 lg:grid-cols-[0.42fr_0.58fr]">
              <aside className="bg-gradient-to-b from-emerald-900 via-emerald-800 to-sky-800 p-6 text-white sm:p-8">
                <h2 className="text-2xl font-black">ابدأ حجزك الآن</h2>
                <p className="mt-3 text-sm leading-7 text-emerald-50">
                  فريقنا يراجع طلبك خلال دقائق، ثم يتواصل معك مباشرة عبر واتساب لتأكيد كل
                  التفاصيل.
                </p>

                <div className="mt-6 space-y-3 text-sm">
                  <p className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-amber-300" />
                    {agencyProfile.location}
                  </p>
                  <p className="inline-flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-amber-300" />
                    واتساب مباشر: +{agencyProfile.whatsappNumber}
                  </p>
                  <p className="inline-flex items-center gap-2">
                    <Plane className="h-4 w-4 text-amber-300" />
                    تذاكر، فنادق، تأشيرات، وتنقلات
                  </p>
                </div>

                <div className="mt-6 grid gap-2 text-xs">
                  <p className="rounded-xl bg-white/10 px-3 py-2 font-semibold">
                    ✅ التزام بالوضوح الكامل في الأسعار
                  </p>
                  <p className="rounded-xl bg-white/10 px-3 py-2 font-semibold">
                    ✅ دعم قبل وأثناء الرحلة
                  </p>
                  <p className="rounded-xl bg-white/10 px-3 py-2 font-semibold">
                    ✅ خطط مرنة للأفراد والعائلات والشركات
                  </p>
                </div>
              </aside>

              <form onSubmit={handleBookingSubmit} className="p-5 sm:p-8">
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="text-sm font-semibold text-slate-700">
                    الاسم الكامل *
                    <input
                      required
                      value={bookingData.fullName}
                      onChange={(event) =>
                        setBookingData((previous) => ({
                          ...previous,
                          fullName: event.target.value,
                        }))
                      }
                      className={`${bookingFieldClass} mt-1`}
                      placeholder="اكتب اسمك كما في جواز السفر"
                    />
                  </label>

                  <label className="text-sm font-semibold text-slate-700">
                    رقم الهاتف / واتساب *
                    <input
                      required
                      value={bookingData.phone}
                      onChange={(event) =>
                        setBookingData((previous) => ({
                          ...previous,
                          phone: event.target.value,
                        }))
                      }
                      className={`${bookingFieldClass} mt-1`}
                      placeholder="مثال: +9665xxxxxxxx"
                    />
                  </label>

                  <label className="text-sm font-semibold text-slate-700">
                    البريد الإلكتروني
                    <input
                      type="email"
                      value={bookingData.email}
                      onChange={(event) =>
                        setBookingData((previous) => ({
                          ...previous,
                          email: event.target.value,
                        }))
                      }
                      className={`${bookingFieldClass} mt-1`}
                      placeholder="name@example.com"
                    />
                  </label>

                  <label className="text-sm font-semibold text-slate-700">
                    الوجهة *
                    <select
                      required
                      value={bookingData.destination}
                      onChange={(event) =>
                        setBookingData((previous) => ({
                          ...previous,
                          destination: event.target.value,
                        }))
                      }
                      className={`${bookingFieldClass} mt-1`}
                    >
                      <option value="">اختر الوجهة</option>
                      <option value="مكة المكرمة">مكة المكرمة</option>
                      <option value="المدينة المنورة">المدينة المنورة</option>
                      <option value="ماليزيا">ماليزيا</option>
                      <option value="دبي">دبي</option>
                      <option value="قطر">قطر</option>
                    </select>
                  </label>

                  <label className="text-sm font-semibold text-slate-700">
                    نوع الباقة *
                    <input
                      required
                      value={bookingData.packageType}
                      onChange={(event) =>
                        setBookingData((previous) => ({
                          ...previous,
                          packageType: event.target.value,
                        }))
                      }
                      className={`${bookingFieldClass} mt-1`}
                      placeholder="اقتصادي / أعمال / كبار الشخصيات / رحلة منظمة"
                    />
                  </label>

                  <label className="text-sm font-semibold text-slate-700">
                    تاريخ السفر *
                    <input
                      required
                      type="date"
                      value={bookingData.travelDate}
                      onChange={(event) =>
                        setBookingData((previous) => ({
                          ...previous,
                          travelDate: event.target.value,
                        }))
                      }
                      className={`${bookingFieldClass} mt-1`}
                    />
                  </label>

                  <label className="text-sm font-semibold text-slate-700">
                    عدد المسافرين *
                    <input
                      required
                      min={1}
                      type="number"
                      value={bookingData.travelers}
                      onChange={(event) =>
                        setBookingData((previous) => ({
                          ...previous,
                          travelers: event.target.value,
                        }))
                      }
                      className={`${bookingFieldClass} mt-1`}
                    />
                  </label>

                  <label className="text-sm font-semibold text-slate-700">
                    الميزانية التقديرية
                    <input
                      value={bookingData.budget}
                      onChange={(event) =>
                        setBookingData((previous) => ({
                          ...previous,
                          budget: event.target.value,
                        }))
                      }
                      className={`${bookingFieldClass} mt-1`}
                      placeholder="مثال: 8,000 - 12,000 ر.س"
                    />
                  </label>
                </div>

                <label className="mt-3 block text-sm font-semibold text-slate-700">
                  ملاحظات إضافية
                  <textarea
                    value={bookingData.notes}
                    onChange={(event) =>
                      setBookingData((previous) => ({
                        ...previous,
                        notes: event.target.value,
                      }))
                    }
                    rows={4}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm transition placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                    placeholder="اكتب أي متطلبات خاصة (غرف متصلة، أطفال، جدول مخصص...)"
                  />
                </label>

                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-emerald-700 to-sky-600 px-4 text-sm font-bold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? "جارٍ الإرسال..." : "إرسال الطلب + واتساب"}
                    <MessageCircle className="h-4 w-4" />
                  </button>
                  <a
                    href={emailDraftHref}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
                  >
                    إرسال عبر البريد
                    <ArrowLeft className="h-4 w-4" />
                  </a>
                </div>

                {submissionState.type !== "idle" ? (
                  <p
                    className={`mt-3 rounded-xl px-3 py-2 text-sm font-medium ${
                      submissionState.type === "success"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-rose-50 text-rose-700"
                    }`}
                  >
                    {submissionState.message}
                  </p>
                ) : null}

                <p className="mt-3 text-xs leading-6 text-slate-500">
                  بالنقر على إرسال الطلب، أنت توافق على تواصل فريقنا معك لتأكيد الحجز وتقديم
                  أفضل العروض المناسبة.
                </p>
              </form>
            </div>
          </div>
        </motion.section>

        <section className="mx-auto mt-10 w-full max-w-6xl px-4 sm:px-6">
          <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm sm:grid-cols-4">
            <p className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-slate-700">
              <Users className="h-4 w-4 text-emerald-600" />
              +12,000 مسافر سعيد
            </p>
            <p className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-slate-700">
              <Wallet className="h-4 w-4 text-emerald-600" />
              خطط دفع مرنة
            </p>
            <p className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-slate-700">
              <Building2 className="h-4 w-4 text-emerald-600" />
              فنادق عالية التقييم
            </p>
            <p className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-slate-700">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              مصداقية وخدمة موثوقة
            </p>
          </div>
        </section>
      </main>

      <footer className="mt-16 border-t border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-center text-sm text-slate-600 sm:px-6">
          <p className="font-semibold text-slate-800">{agencyProfile.name}</p>
          <p>رحلات روحانية وسياحية بمعايير احترافية تجمع بين الثقة والفخامة.</p>
          <a href="/dashboard" className="font-semibold text-emerald-700 hover:text-emerald-800">
            الدخول إلى لوحة الحجوزات
          </a>
        </div>
      </footer>
    </div>
  );
}
