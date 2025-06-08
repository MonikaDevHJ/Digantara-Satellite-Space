// app/api/satellites/route.ts
export async function GET(request: Request) {
  const attributes = "noradCatId,intlDes,name,launchDate,objectType,countryCode,orbitCode";
  const apiUrl = `https://backend.digantara.dev/v1/satellites?attributes=${encodeURIComponent(attributes)}`;

  const res = await fetch(apiUrl);
  const data = await res.json();

  return Response.json(data);
}
