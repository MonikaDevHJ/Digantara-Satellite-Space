// app/page.tsx
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

  useEffect(() => {
    const fetchSatellites = async () => {
      setLoading(true);
      setError('');
      try {
        const objectTypesParam =
          objectTypes.length > 0 ? objectTypes.join(',') : 'ROCKET BODY,PAYLOAD,DEBRIS,UNKNOWN';
        const attributesParam =
          'noradCatId,intlDes,name,launchDate,objectType,countryCode,orbitCode';

        const url = `/api/satellites?objectTypes=${encodeURIComponent(
          objectTypesParam
        )}&orbitCodes=${encodeURIComponent(orbitCodes.join(','))}&search=${encodeURIComponent(searchTerm)}`;

        const res = await fetch(url);
        const data = await res.json();

        let filtered = data.data || [];

        if (orbitCodes.length > 0) {
          filtered = filtered.filter((sat: Satellite) => orbitCodes.includes(sat.orbitCode || ''));
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
  }, [searchTerm, objectTypes, orbitCodes]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleApplyFilters = (types: string[], orbits: string[]) => {
    setObjectTypes(types);
    setOrbitCodes(orbits);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-blue-800 text-center">
          🚀 Digantara Satellite Explorer
        </h1>

        <SearchBar onSearch={handleSearch} />
        <Filters onApply={handleApplyFilters} />

        {loading ? (
          <p className="text-center text-blue-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <SatelliteTable satellites={satellites} />
        )}
      </div>
    </main>
  );
}
