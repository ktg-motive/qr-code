import React from 'react';
import Input from './Input';
import { SMSData } from '../types/qrTypes';

interface SMSFormProps {
  data: SMSData;
  onChange: (data: SMSData) => void;
}

export default function SMSForm({ data, onChange }: SMSFormProps) {
  const updateField = (field: keyof SMSData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Phone Number *"
        type="tel"
        value={data.phone}
        onChange={(e) => updateField('phone', e.target.value)}
      />

      <div className="space-y-1">
        <textarea
          placeholder="Message (Optional)"
          value={data.message || ''}
          onChange={(e) => updateField('message', e.target.value)}
          rows={4}
          className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-la-ai-400 focus:ring-offset-1 focus:border-la-ai-500 hover:border-gray-300 transition-colors duration-200 resize-vertical"
        />
      </div>
    </div>
  );
}
