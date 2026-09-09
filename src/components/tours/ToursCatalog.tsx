"use client";

import React from "react";
import { Tour } from "@/types";
import { mockAllTours } from "@/data/mock-data";
import TourCard from "./TourCard";
import { Sparkles, Compass } from "lucide-react";

interface ToursCatalogProps {
  initialTours?: Tour[];
}

export default function ToursCatalog({ initialTours = mockAllTours }: ToursCatalogProps) {
  const activeTours = initialTours.filter((tour) => tour.isActive);

  return (
    <div className="space-y-10">
      {/* Tours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activeTours.map((tour, index) => (
          <TourCard key={tour.id} tour={tour} priority={index < 3} />
        ))}
      </div>
    </div>
  );
}
