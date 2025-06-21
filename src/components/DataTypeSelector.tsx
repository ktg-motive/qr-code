import React from 'react';
import { FileText, User, Wifi, Mail, MessageSquare, MapPin } from 'lucide-react';
import { QRDataType } from '../types/qrTypes';
import { cn } from '../utils/cn';

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
      <h3 className="text-sm font-semibold text-muted-foreground mb-3 tracking-wide uppercase">QR Code Type</h3>
      <div className="grid grid-cols-2 gap-3">
        {types.map((type) => (
          <button
            key={type.value}
            onClick={() => onSelect(type.value)}
            className={cn(
              'p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-all duration-200',
              selected === type.value
                ? 'border-primary bg-primary/5 text-primary shadow-md scale-105'
                : 'border-border hover:border-primary/50 text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            )}
          >
            <type.icon className={cn(
              'w-5 h-5',
              selected === type.value ? 'text-primary' : 'text-muted-foreground'
            )} />
            <span className="text-xs font-medium leading-tight text-center">{type.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
