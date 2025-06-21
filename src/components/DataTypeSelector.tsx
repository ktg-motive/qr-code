import React from 'react';
import { FileText, User, Wifi, Mail, MessageSquare, MapPin } from 'lucide-react';
import { QRDataType } from '../types/qrTypes';

interface DataTypeSelectorProps {
  selected: QRDataType;
  onSelect: (type: QRDataType) => void;
}

export default function DataTypeSelector({ selected, onSelect }: DataTypeSelectorProps) {
  const types = [
    { value: 'text' as QRDataType, label: 'Text/URL', icon: FileText },
    { value: 'vcard' as QRDataType, label: 'Contact Card', icon: User },
    { value: 'wifi' as QRDataType, label: 'WiFi Network', icon: Wifi },
    { value: 'email' as QRDataType, label: 'Email', icon: Mail },
    { value: 'sms' as QRDataType, label: 'SMS Message', icon: MessageSquare },
    { value: 'location' as QRDataType, label: 'Location', icon: MapPin },
  ];

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-3 tracking-wide">QR CODE TYPE</h3>
      <div className="grid grid-cols-2 gap-3">
        {types.map((type) => (
          <button
            key={type.value}
            onClick={() => onSelect(type.value)}
            className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-all duration-200 ${
              selected === type.value
                ? 'border-la-ai-500 bg-la-ai-50 text-la-ai-700 shadow-md scale-105'
                : 'border-gray-200 hover:border-la-ai-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <type.icon className={`w-5 h-5 ${
              selected === type.value ? 'text-la-ai-600' : 'text-gray-500'
            }`} />
            <span className="text-xs font-medium leading-tight text-center">{type.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
