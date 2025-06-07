'use client';
import { useState } from 'react';

const objectTypesList = ["ROCKET BODY", "DEBRIS", "UNKNOWN", "PAYLOAD"];
const orbitCodesList = ["LEO", "LEO1", "LEO2", "LEO3", "LEO4", "MEO", "GEO", "HEO", "IGO", "EGO", "NSO", "GTO", "GHO", "HAO", "MGO", "LMO", "UFO", "ESO", "UNKNOWN"];

interface Props {
  onApply: (objectTypes: string[], orbitCodes: string[]) => void;
}

const Filters = ({ onApply }: Props) => {
  const [selectedObjectTypes, setSelectedObjectTypes] = useState<string[]>([]);
  const [selectedOrbitCodes, setSelectedOrbitCodes] = useState<string[]>([]);

  const toggleCheckbox = (value: string, selected: string[], setSelected: (arr: string[]) => void) => {
    setSelected(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value]
    );
  };

  return (
    <div className="grid gap-4 mb-4">
      <div>
        <label className="font-semibold">Object Types:</label>
        <div className="flex gap-2 flex-wrap mt-2">
          {objectTypesList.map((type) => (
            <label key={type} className="text-sm">
              <input
                type="checkbox"
                className="mr-1"
                checked={selectedObjectTypes.includes(type)}
                onChange={() => toggleCheckbox(type, selectedObjectTypes, setSelectedObjectTypes)}
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="font-semibold">Orbit Codes:</label>
        <div className="flex gap-2 flex-wrap mt-2">
          {orbitCodesList.map((code) => (
            <label key={code} className="text-sm">
              <input
                type="checkbox"
                className="mr-1"
                checked={selectedOrbitCodes.includes(code)}
                onChange={() => toggleCheckbox(code, selectedOrbitCodes, setSelectedOrbitCodes)}
              />
              {code}
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={() => onApply(selectedObjectTypes, selectedOrbitCodes)}
        className="px-4 py-2 bg-blue-600 text-white rounded w-fit"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Filters;
