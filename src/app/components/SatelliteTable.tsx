'use client';
import { Satellite } from '../../../types/satellite';

interface Props {
  satellites: Satellite[];
}

const SatelliteTable = ({ satellites }: Props) => {
  return (
    <div className="border rounded p-4">
      {satellites.length === 0 ? (
        <p className="text-gray-500 text-sm italic">No satellites found.</p>
      ) : (
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">NORAD ID</th>
              <th className="p-2">Orbit</th>
              <th className="p-2">Object Type</th>
              <th className="p-2">Country</th>
              <th className="p-2">Launch Date</th>
            </tr>
          </thead>
          <tbody>
            {satellites.map((sat) => (
              <tr key={sat.noradCatId} className="border-b hover:bg-gray-50">
                <td className="p-2">{sat.name}</td>
                <td className="p-2">{sat.noradCatId}</td>
                <td className="p-2">{sat.orbitCode}</td>
                <td className="p-2">{sat.objectType}</td>
                <td className="p-2">{sat.countryCode}</td>
                <td className="p-2">{sat.launchDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SatelliteTable;
