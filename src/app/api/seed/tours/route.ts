import { NextResponse } from "next/server";
import { firestoreTourSeeds, validateAllTourSeeds } from "@/lib/firestore/seed-tours";

export async function GET() {
  try {
    const validation = validateAllTourSeeds();

    return NextResponse.json(
      {
        success: true,
        summary: {
          total: validation.total,
          valid: validation.validCount,
          invalid: validation.invalidCount,
        },
        validationResults: validation.results,
        seeds: firestoreTourSeeds,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error generating tour seed data:", error);
    return NextResponse.json(
      { success: false, error: "Gagal menyiapkan data seed tur Firestore" },
      { status: 500 }
    );
  }
}
