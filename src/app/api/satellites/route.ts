// app/api/satellites/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const objectTypes = searchParams.get("objectTypes") || "ROCKET BODY,PAYLOAD,DEBRIS,UNKNOWN";
  const attributes = "noradCatId,intlDes,name,launchDate,objectType,countryCode,orbitCode";

  const apiUrl = `https://backend.digantara.dev/v1/satellites?objectTypes=${encodeURIComponent(objectTypes)}&attributes=${attributes}`;

  const res = await fetch(apiUrl);
  const data = await res.json();

  return Response.json(data);
}
