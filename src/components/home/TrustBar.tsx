import React from "react";
import { Award, ShieldCheck, Car } from "lucide-react";
import { mockTrustItems } from "@/data/mock-data";

export default function TrustBar() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Award":
        return <Award className="h-6 w-6 text-blue-700" />;
      case "ShieldCheck":
        return <ShieldCheck className="h-6 w-6 text-emerald-600" />;
      case "Car":
        return <Car className="h-6 w-6 text-amber-600" />;
      default:
        return <ShieldCheck className="h-6 w-6 text-blue-700" />;
    }
  };

  return (
    <section className="relative z-10 -mt-4 sm:-mt-6 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xl sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-stone-200">
          {mockTrustItems.map((item, idx) => (
            <div
              key={item.id}
              className={`flex items-start gap-4 ${idx > 0 ? "pt-6 md:pt-0 md:pl-6" : ""}`}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-stone-100 border border-stone-200 shadow-sm">
                {getIcon(item.icon)}
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-bold text-stone-900 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
