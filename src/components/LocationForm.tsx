import React from 'react';
import Input from './Input';
import { LocationData } from '../types/qrTypes';

interface LocationFormProps {
  data: LocationData;
  onChange: (data: LocationData) => void;
}

export default function LocationForm({ data, onChange }: LocationFormProps) {
  const updateField = (field: keyof LocationData, value: string | number) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="Latitude *"
          type="number"
          step="any"
          value={data.latitude.toString()}
          onChange={(e) => updateField('latitude', parseFloat(e.target.value) || 0)}
        />
        <Input
          placeholder="Longitude *"
          type="number"
          step="any"
          value={data.longitude.toString()}
          onChange={(e) => updateField('longitude', parseFloat(e.target.value) || 0)}
        />
      </div>
      
      <Input
        placeholder="Location Label (Optional)"
        value={data.label || ''}
        onChange={(e) => updateField('label', e.target.value)}
      />

      <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
        <p className="font-medium mb-1">Tips:</p>
        <ul className="space-y-1">
          <li>• You can get coordinates from Google Maps by right-clicking a location</li>
          <li>• Format: Latitude: 40.7128, Longitude: -74.0060 (for NYC)</li>
          <li>• The label will appear when someone opens the location</li>
        </ul>
      </div>
    </div>
  );
}
