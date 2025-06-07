'use client';

import { useEffect, useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import { Satellite } from '../../../types/satellite';

interface Props {
  satellites: Satellite[];
}

const SatelliteTable: React.FC<Props> = ({ satellites }) => {
  const [selected, setSelected] = useState<Satellite[]>([]);

  const handleSelect = (sat: Satellite) => {
    const isAlreadySelected = selected.some((s) => s.noradCatId === sat.noradCatId);
    if (isAlreadySelected) {
      setSelected(selected.filter((s) => s.noradCatId !== sat.noradCatId));
    } else if (selected.length < 10) {
      setSelected([...selected, sat]);
    } else {
      alert('You can only select up to 10 satellites.');
    }
  };

  useEffect(() => {
    localStorage.setItem('selectedSatellites', JSON.stringify(selected));
  }, [selected]);

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const sat = satellites[index];
    const isChecked = selected.some((s) => s.noradCatId === sat.noradCatId);

    return (
      <div
        style={style}
        className="grid grid-cols-7 border-b text-sm p-2 items-center hover:bg-blue-50 transition"
      >
        <div>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => handleSelect(sat)}
          />
        </div>
        <div>{sat.name}</div>
        <div>{sat.noradCatId}</div>
        <div>{sat.orbitCode}</div>
        <div>{sat.objectType}</div>
        <div>{sat.countryCode}</div>
        <div>{sat.launchDate}</div>
      </div>
    );
  };

  return (
    <div className="border rounded shadow-md overflow-hidden bg-white">
      <div className="flex justify-between items-center p-3 text-sm bg-blue-50 border-b">
        <span className="font-semibold text-blue-800">
          Selected: {selected.length} / 10
        </span>
        <button
          disabled={selected.length === 0}
          className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
          onClick={() => window.location.href = '/selected'}
        >
          Proceed
        </button>
      </div>

      <div className="grid grid-cols-7 bg-blue-100 text-blue-900 font-semibold text-sm p-2">
        <div>Select</div>
        <div>Name</div>
        <div>NORAD ID</div>
        <div>Orbit</div>
        <div>Object Type</div>
        <div>Country</div>
        <div>Launch Date</div>
      </div>

      <List
        height={400}
        itemCount={satellites.length}
        itemSize={45}
        width="100%"
      >
        {Row}
      </List>
    </div>
  );
};

export default SatelliteTable;
