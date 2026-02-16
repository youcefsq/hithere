import type { Metadata } from "next";
import DashboardClient from "@/components/dashboard-client";

export const metadata: Metadata = {
  title: "لوحة الحجوزات | آفاق النور للسفر",
  description: "متابعة الطلبات الواردة من نموذج الحجز في الموقع.",
};

export default function DashboardPage() {
  return <DashboardClient />;
}
