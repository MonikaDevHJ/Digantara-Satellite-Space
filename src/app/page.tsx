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
        const attributesParam =
          'noradCatId,intlDes,name,launchDate,objectType,countryCode,orbitCode';

        const url = `/api/satellites?attributes=${encodeURIComponent(attributesParam)}`;
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await res.json();

        let filtered = data.data || [];

        if (objectTypes.length > 0) {
          filtered = filtered.filter((sat: Satellite) =>
            objectTypes.includes(sat.objectType || '')
          );
        }

        if (orbitCodes.length > 0) {
          filtered = filtered.filter((sat: Satellite) =>
            orbitCodes.includes(sat.orbitCode || '')
          );
        }

        if (searchTerm.trim() !== '') {
          const lower = searchTerm.toLowerCase();
          filtered = filtered.filter(
            (sat: Satellite) =>
              sat.name.toLowerCase().includes(lower) ||
              sat.noradCatId.includes(searchTerm)
          );
        }

        setSatellites(filtered);
      } catch {
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
        ) : satellites.length === 0 ? (
          <p className="text-center text-gray-500 italic mt-4">
            "A fallback message is shown when filtered results are empty due to incomplete data returned by the API."
          </p>
        ) : (
          <SatelliteTable satellites={satellites} />
        )}
      </div>
    </main>
  );
}
