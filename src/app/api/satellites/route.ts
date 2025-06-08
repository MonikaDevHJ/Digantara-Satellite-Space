// app/api/satellites/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const attributes = "noradCatId,intlDes,name,launchDate,objectType,countryCode,orbitCode";
  const apiUrl = `https://backend.digantara.dev/v1/satellites?attributes=${encodeURIComponent(attributes)}`;

  const res = await fetch(apiUrl);
  const data = await res.json();

  return NextResponse.json(data);
}
