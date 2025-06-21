import React from 'react';
import Input from './Input';
import { VCardData } from '../types/qrTypes';

interface VCardFormProps {
  data: VCardData;
  onChange: (data: VCardData) => void;
}

export default function VCardForm({ data, onChange }: VCardFormProps) {
  const updateField = (field: keyof VCardData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const updateAddress = (field: keyof NonNullable<VCardData['address']>, value: string) => {
    onChange({
      ...data,
      address: { ...data.address, [field]: value }
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="First Name *"
          value={data.firstName}
          onChange={(e) => updateField('firstName', e.target.value)}
        />
        <Input
          placeholder="Last Name *"
          value={data.lastName}
          onChange={(e) => updateField('lastName', e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="Company"
          value={data.organization || ''}
          onChange={(e) => updateField('organization', e.target.value)}
        />
        <Input
          placeholder="Job Title"
          value={data.title || ''}
          onChange={(e) => updateField('title', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="Phone Number"
          value={data.phone || ''}
          onChange={(e) => updateField('phone', e.target.value)}
        />
        <Input
          placeholder="Email Address"
          type="email"
          value={data.email || ''}
          onChange={(e) => updateField('email', e.target.value)}
        />
      </div>

      <Input
        placeholder="Website"
        value={data.website || ''}
        onChange={(e) => updateField('website', e.target.value)}
      />

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700">Address (Optional)</h4>
        <Input
          placeholder="Street Address"
          value={data.address?.street || ''}
          onChange={(e) => updateAddress('street', e.target.value)}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="City"
            value={data.address?.city || ''}
            onChange={(e) => updateAddress('city', e.target.value)}
          />
          <Input
            placeholder="State"
            value={data.address?.state || ''}
            onChange={(e) => updateAddress('state', e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="ZIP Code"
            value={data.address?.zip || ''}
            onChange={(e) => updateAddress('zip', e.target.value)}
          />
          <Input
            placeholder="Country"
            value={data.address?.country || ''}
            onChange={(e) => updateAddress('country', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
