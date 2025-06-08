// app/api/satellites/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const attributes = "noradCatId,intlDes,name,launchDate,objectType,countryCode,orbitCode";
  const apiUrl = `https://backend.digantara.dev/v1/satellites?attributes=${encodeURIComponent(attributes)}`;

  try {
    const res = await fetch(apiUrl);

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch satellites' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (_error) {
    // You can optionally log the error here if you want:
    // console.error(_error);

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
