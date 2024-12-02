"use client";
import React, { Suspense } from "react";
import MapPageContent from "@/components/domains/map/MapPageContent";

export default function MapPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MapPageContent />
    </Suspense>
  );
}
