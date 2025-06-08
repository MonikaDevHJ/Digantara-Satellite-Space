'use client';

import { useEffect, useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import { Satellite } from '../../../types/satellite';

interface Props {
  satellites: Satellite[];
}

const SatelliteTable: React.FC<Props> = ({ satellites }) => {
  const [selected, setSelected] = useState<Satellite[]>([]);
  const [itemSize, setItemSize] = useState(100);

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

  // Dynamically adjust row height based on screen size
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) setItemSize(140); // taller rows for stacked layout on small screens
      else setItemSize(60); // shorter rows for grid on larger screens
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const sat = satellites[index];
    const isChecked = selected.some((s) => s.noradCatId === sat.noradCatId);

    return (
      <div
        style={style}
        className="border-b p-3 hover:bg-blue-50 transition text-sm
                   sm:grid sm:grid-cols-7 sm:items-center sm:gap-2
                   flex flex-col gap-1 sm:gap-0"
      >
        <label className="flex items-center gap-2 sm:block">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => handleSelect(sat)}
            className="w-4 h-4"
          />
          <span className="sm:hidden font-semibold">Select</span>
        </label>

        <div>
          <span className="sm:hidden font-semibold block">Name:</span>
          {sat.name}
        </div>
        <div>
          <span className="sm:hidden font-semibold block">NORAD ID:</span>
          {sat.noradCatId}
        </div>
        <div>
          <span className="sm:hidden font-semibold block">Orbit:</span>
          {sat.orbitCode}
        </div>
        <div>
          <span className="sm:hidden font-semibold block">Type:</span>
          {sat.objectType}
        </div>
        <div>
          <span className="sm:hidden font-semibold block">Country:</span>
          {sat.countryCode}
        </div>
        <div>
          <span className="sm:hidden font-semibold block">Launch:</span>
          {sat.launchDate}
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-7xl border rounded shadow-md overflow-hidden bg-white px-2 sm:px-4">
      {/* Top controls */}
      <div className="flex justify-between items-center p-3 text-sm bg-blue-50 border-b">
        <span className="font-semibold text-blue-800">
          Selected: {selected.length} / 10
        </span>
        <button
          disabled={selected.length === 0}
          className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
          onClick={() => (window.location.href = '/selected')}
        >
          Proceed
        </button>
      </div>

      {/* Column headers for larger screens */}
      <div className="hidden sm:grid grid-cols-7 bg-blue-100 text-blue-900 font-semibold text-sm p-2">
        <div>Select</div>
        <div>Name</div>
        <div>NORAD ID</div>
        <div>Orbit</div>
        <div>Object Type</div>
        <div>Country</div>
        <div>Launch Date</div>
      </div>

      {/* Scrollable list */}
      <List
        height={400}
        itemCount={satellites.length}
        itemSize={itemSize}
        width="100%"
      >
        {Row}
      </List>
    </div>
  );
};

export default SatelliteTable;
