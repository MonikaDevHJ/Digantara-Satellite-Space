'use client';

import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import SatelliteTable from './components/SatelliteTable';
import { Satellite } from '../../types/satellite';

export default function HomePage() {
  const [satellites, setSatellites] = useState<Satellite[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [objectTypes, setObjectTypes] = useState<string[]>([]);
  const [orbitCodes, setOrbitCodes] = useState<string[]>([]);

  // 🔁 Fetch data automatically when filters or search changes
  useEffect(() => {
    const fetchSatellites = async () => {
      setLoading(true);
      setError('');

      try {
        const objectTypesParam =
          objectTypes.length > 0
            ? objectTypes.join(',')
            : 'ROCKET BODY,PAYLOAD,DEBRIS,UNKNOWN';
        const attributesParam =
          'noradCatId,intlDes,name,launchDate,objectType,countryCode,orbitCode';

        const url = `/api/satellites?objectTypes=${encodeURIComponent(
          objectTypesParam
        )}&orbitCodes=${encodeURIComponent(
          orbitCodes.join(',')
        )}&search=${encodeURIComponent(searchTerm)}`;

        const res = await fetch(url);
        const data = await res.json();

        let filtered = data.data || [];

        // 🧪 Client-side fallback filtering
        if (orbitCodes.length > 0) {
          filtered = filtered.filter((sat: Satellite) =>
            orbitCodes.includes(sat.orbitCode || '')
          );
        }

        if (searchTerm.trim() !== '') {
          filtered = filtered.filter(
            (sat: Satellite) =>
              sat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              sat.noradCatId.includes(searchTerm)
          );
        }

        setSatellites(filtered);
      } catch (err) {
        setError('Failed to fetch satellite data');
      } finally {
        setLoading(false);
      }
    };

    fetchSatellites();
  }, [searchTerm, objectTypes, orbitCodes]); // 🔁 Re-run on change

  // 🔍 Handle search term from SearchBar
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // 🎯 Handle selected filters from Filters
  const handleApplyFilters = (types: string[], orbits: string[]) => {
    setObjectTypes(types);
    setOrbitCodes(orbits);
    // ❌ Do NOT call fetch here — it's auto-triggered by useEffect
  };

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        🛰️ Digantara Satellite Explorer
      </h1>

      <SearchBar onSearch={handleSearch} />
      <Filters onApply={handleApplyFilters} />

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <SatelliteTable satellites={satellites} />
      )}
    </main>
  );
}
