import React from 'react';
import Input from './Input';
import { EmailData } from '../types/qrTypes';

interface EmailFormProps {
  data: EmailData;
  onChange: (data: EmailData) => void;
}

export default function EmailForm({ data, onChange }: EmailFormProps) {
  const updateField = (field: keyof EmailData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Email Address *"
        type="email"
        value={data.to}
        onChange={(e) => updateField('to', e.target.value)}
      />
      
      <Input
        placeholder="Subject"
        value={data.subject || ''}
        onChange={(e) => updateField('subject', e.target.value)}
      />

      <div className="space-y-1">
        <textarea
          placeholder="Message Body"
          value={data.body || ''}
          onChange={(e) => updateField('body', e.target.value)}
          rows={4}
          className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-la-ai-400 focus:ring-offset-1 focus:border-la-ai-500 hover:border-gray-300 transition-colors duration-200 resize-vertical"
        />
      </div>
    </div>
  );
}
