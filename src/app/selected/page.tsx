'use client';

import { useEffect, useState } from 'react';
import { Satellite } from '../../../types/satellite';
import Link from 'next/link';

const SelectedPage = () => {
  const [selected, setSelected] = useState<Satellite[]>([]);

  useEffect(() => {
    const data = localStorage.getItem('selectedSatellites');
    if (data) {
      setSelected(JSON.parse(data));
    }
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">✅ Selected Satellites</h1>

      {selected.length === 0 ? (
        <p className="text-gray-600">No satellites selected.</p>
      ) : (
        <table className="w-full text-sm border">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">NORAD ID</th>
            </tr>
          </thead>
          <tbody>
            {selected.map((sat) => (
              <tr key={sat.noradCatId} className="border-b hover:bg-gray-50">
                <td className="p-2">{sat.name}</td>
                <td className="p-2">{sat.noradCatId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Link href="/" className="mt-6 inline-block text-blue-600 underline">
        ← Go Back to Home
      </Link>
    </div>
  );
};

export default SelectedPage;
