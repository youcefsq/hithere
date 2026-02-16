export type HeroSlide = {
  id: string;
  title: string;
  subtitle: string;
  visualType: "video" | "image";
  source: string;
  accent: string;
};

export type SpiritualPackage = {
  id: string;
  tier: string;
  title: string;
  price: string;
  duration: string;
  hotelRating: string;
  haramProximity: string;
  visaProcessing: string;
  transportation: string;
  highlights: string[];
};

export type ItineraryDay = {
  day: string;
  title: string;
  details: string;
};

export type WorldTour = {
  id: string;
  destination: string;
  price: string;
  duration: string;
  hotelRating: string;
  voyageType: string;
  summary: string;
  itinerary: ItineraryDay[];
};

export type Testimonial = {
  id: string;
  name: string;
  trip: string;
  quote: string;
  rating: number;
};

export const agencyProfile = {
  name: "آفاق النور للسفر",
  whatsappNumber: "966500000000",
  email: "bookings@afaqalnour-travel.com",
  location: "الرياض - المملكة العربية السعودية",
};

export const heroSlides: HeroSlide[] = [
  {
    id: "haram-video",
    title: "رحلة إيمانية تنبض بالسكينة",
    subtitle:
      "برامج عمرة وحج متكاملة بإشراف متخصصين، مع إقامة قريبة من الحرم وخدمة على مدار الساعة.",
    visualType: "video",
    source:
      "https://videos.pexels.com/video-files/855195/855195-hd_1920_1080_25fps.mp4",
    accent: "من مكة إلى المدينة",
  },
  {
    id: "dubai-luxury",
    title: "سياحة فاخرة إلى دبي بلمسة عصرية",
    subtitle:
      "استمتع بأرقى الفنادق والجولات المنظمة والتجارب الترفيهية المصممة بعناية لعائلتك.",
    visualType: "image",
    source:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1900&q=80",
    accent: "تنظيم كامل قبل السفر",
  },
  {
    id: "malaysia-nature",
    title: "أجواء طبيعية ساحرة في ماليزيا",
    subtitle:
      "رحلات عالمية تجمع بين الراحة والمغامرة الثقافية مع برامج يومية واضحة وأسعار شفافة.",
    visualType: "image",
    source:
      "https://images.unsplash.com/photo-1516222338250-863216ce01ea?auto=format&fit=crop&w=1900&q=80",
    accent: "خيارات اقتصادية وفاخرة",
  },
];

export const spiritualPackages: SpiritualPackage[] = [
  {
    id: "economy-umrah",
    tier: "اقتصادي",
    title: "باقة العمرة الاقتصادية",
    price: "ابتداءً من 2,950 ر.س",
    duration: "7 أيام / 6 ليالٍ",
    hotelRating: "3 نجوم",
    haramProximity: "12 دقيقة مشيًا إلى الحرم",
    visaProcessing: "إصدار التأشيرة خلال 72 ساعة",
    transportation: "تنقلات جماعية حديثة بين المنافذ والفنادق",
    highlights: [
      "إرشاد ديني يومي",
      "استقبال في المطار",
      "خدمة عملاء عربية 24/7",
    ],
  },
  {
    id: "business-hajj",
    tier: "أعمال",
    title: "باقة الحج لرجال الأعمال",
    price: "ابتداءً من 18,500 ر.س",
    duration: "12 يومًا / 11 ليلة",
    hotelRating: "5 نجوم",
    haramProximity: "5 دقائق إلى الحرم بحافلات خاصة",
    visaProcessing: "مسار سريع مع متابعة مستمرة للوثائق",
    transportation: "مواصلات خاصة مكيفة بين المشاعر",
    highlights: ["مشرف رحلة شخصي", "وجبات فندقية", "خطة طوارئ واستجابة فورية"],
  },
  {
    id: "vip-umrah",
    tier: "كبار الشخصيات",
    title: "باقة العمرة التنفيذية لكبار الشخصيات",
    price: "ابتداءً من 11,900 ر.س",
    duration: "10 أيام / 9 ليالٍ",
    hotelRating: "5 نجوم فاخر",
    haramProximity: "إطلالة مباشرة أو قرب شديد من الحرم",
    visaProcessing: "خدمة VIP للتأشيرة والتذاكر",
    transportation: "سيارات خاصة فاخرة مع استقبال مميز",
    highlights: ["مرشد خاص للعائلة", "كونسيرج سفر", "تخطيط مرن حسب رغبتك"],
  },
];

export const worldTours: WorldTour[] = [
  {
    id: "malaysia-tour",
    destination: "ماليزيا",
    price: "ابتداءً من 5,450 ر.س",
    duration: "8 أيام / 7 ليالٍ",
    hotelRating: "4 نجوم",
    voyageType: "رحلة منظمة عائلية",
    summary:
      "جولة متوازنة تجمع بين كوالالمبور، الطبيعة الخلابة، والأسواق المحلية مع مرشد عربي.",
    itinerary: [
      {
        day: "اليوم 1",
        title: "الوصول إلى كوالالمبور",
        details: "استقبال بالمطار، تسجيل دخول الفندق، وجولة مسائية خفيفة.",
      },
      {
        day: "اليوم 2",
        title: "برجا بتروناس ومركز المدينة",
        details:
          "زيارة أشهر المعالم مع وقت حر للتسوق وتجربة المأكولات الماليزية الحلال.",
      },
      {
        day: "اليوم 3",
        title: "مرتفعات جنتنج",
        details: "رحلة يوم كامل وسط الطبيعة مع أنشطة ترفيهية مناسبة للعائلة.",
      },
    ],
  },
  {
    id: "dubai-tour",
    destination: "دبي",
    price: "ابتداءً من 4,950 ر.س",
    duration: "6 أيام / 5 ليالٍ",
    hotelRating: "5 نجوم",
    voyageType: "رحلة منظمة فاخرة",
    summary:
      "برنامج فاخر يشمل المعالم الأيقونية، سفاري الصحراء، وعروض بحرية مع تنقلات مريحة.",
    itinerary: [
      {
        day: "اليوم 1",
        title: "وصول واستجمام",
        details: "استقبال فاخر من المطار وتسجيل الدخول مع وقت راحة.",
      },
      {
        day: "اليوم 2",
        title: "برج خليفة ودبي مول",
        details: "جولة شاملة لأهم المعالم مع مرونة في أوقات الزيارة.",
      },
      {
        day: "اليوم 3",
        title: "سفاري الصحراء",
        details: "تجربة عربية أصيلة مع عشاء وعروض حية في مخيم فاخر.",
      },
    ],
  },
  {
    id: "qatar-tour",
    destination: "قطر",
    price: "ابتداءً من 4,250 ر.س",
    duration: "5 أيام / 4 ليالٍ",
    hotelRating: "4 نجوم",
    voyageType: "رحلة منظمة ثقافية",
    summary:
      "استكشاف الدوحة الحديثة والتراث القطري في برنامج مريح يناسب الأزواج والعائلات.",
    itinerary: [
      {
        day: "اليوم 1",
        title: "الوصول إلى الدوحة",
        details: "استقبال بالمطار وجولة مسائية على كورنيش الدوحة.",
      },
      {
        day: "اليوم 2",
        title: "سوق واقف ومتاحف المدينة",
        details: "جولة تراثية مع وقت للتسوق وشراء الهدايا.",
      },
      {
        day: "اليوم 3",
        title: "رحلة بحرية خفيفة",
        details: "تجربة مميزة لمشاهدة أفق المدينة من البحر.",
      },
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t-1",
    name: "أمينة العتيبي",
    trip: "عمرة - باقة VIP",
    quote:
      "كل التفاصيل كانت ممتازة من الاستقبال حتى العودة. قرب الفندق من الحرم وفر علينا جهدًا كبيرًا.",
    rating: 5,
  },
  {
    id: "t-2",
    name: "خالد الشمري",
    trip: "دبي - رحلة منظمة",
    quote:
      "التنظيم دقيق جدًا والبرنامج اليومي واضح. فريق المتابعة كان متعاونًا بشكل احترافي طوال الرحلة.",
    rating: 5,
  },
  {
    id: "t-3",
    name: "ريم المالكي",
    trip: "ماليزيا - رحلة عائلية",
    quote:
      "أفضل تجربة سفر عائلية مرّت علينا، الفنادق ممتازة والجولات مناسبة للأطفال والكبار.",
    rating: 5,
  },
];
