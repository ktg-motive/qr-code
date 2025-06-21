import React from 'react';
import Input from './Input';
import { WifiData } from '../types/qrTypes';

interface WifiFormProps {
  data: WifiData;
  onChange: (data: WifiData) => void;
}

export default function WifiForm({ data, onChange }: WifiFormProps) {
  const updateField = (field: keyof WifiData, value: string | boolean) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Network Name (SSID) *"
        value={data.ssid}
        onChange={(e) => updateField('ssid', e.target.value)}
      />
      
      <Input
        placeholder="Password"
        type="password"
        value={data.password}
        onChange={(e) => updateField('password', e.target.value)}
      />

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Security Type</label>
        <select
          value={data.security}
          onChange={(e) => updateField('security', e.target.value as 'WPA' | 'WEP' | 'nopass')}
          className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-la-ai-400 focus:ring-offset-1 focus:border-la-ai-500 hover:border-gray-300 transition-colors duration-200"
        >
          <option value="WPA">WPA/WPA2</option>
          <option value="WEP">WEP</option>
          <option value="nopass">No Password</option>
        </select>
      </div>

      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
        <input
          type="checkbox"
          id="hidden"
          checked={data.hidden}
          onChange={(e) => updateField('hidden', e.target.checked)}
          className="w-4 h-4 text-la-ai-600 border-gray-300 rounded focus:ring-la-ai-500 focus:ring-2"
        />
        <label htmlFor="hidden" className="text-sm text-gray-700 font-medium">
          Hidden Network
        </label>
      </div>
    </div>
  );
}
