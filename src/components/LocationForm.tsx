import React, { useState } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import Input from './Input';
import Button from './Button';
import { LocationData } from '../types/qrTypes';

interface LocationFormProps {
  data: LocationData;
  onChange: (data: LocationData) => void;
}

export default function LocationForm({ data, onChange }: LocationFormProps) {
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const updateField = (field: keyof LocationData, value: string | number) => {
    onChange({ ...data, [field]: value });
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser');
      return;
    }

    setIsGettingLocation(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onChange({
          ...data,
          latitude: parseFloat(latitude.toFixed(6)),
          longitude: parseFloat(longitude.toFixed(6))
        });
        setIsGettingLocation(false);
      },
      (error) => {
        let errorMessage = 'Unable to get your location';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
        }
        setLocationError(errorMessage);
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const openInMaps = () => {
    if (data.latitude && data.longitude) {
      const query = data.label ? encodeURIComponent(data.label) : `${data.latitude},${data.longitude}`;
      const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="space-y-4">
      {/* Get Current Location Button */}
      <Button
        type="button"
        variant="outline"
        onClick={getCurrentLocation}
        disabled={isGettingLocation}
        className="w-full"
      >
        {isGettingLocation ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <MapPin className="w-4 h-4 mr-2" />
        )}
        {isGettingLocation ? 'Getting Location...' : 'Use My Current Location'}
      </Button>

      {locationError && (
        <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 p-3 rounded-lg">
          {locationError}
        </div>
      )}

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

      {/* Preview in Maps Button */}
      {(data.latitude !== 0 || data.longitude !== 0) && (
        <Button
          type="button"
          variant="outline"
          onClick={openInMaps}
          className="w-full"
        >
          <MapPin className="w-4 h-4 mr-2" />
          Preview in Google Maps
        </Button>
      )}

      <div className="text-xs text-muted-foreground bg-muted p-3 rounded-lg">
        <p className="font-medium mb-1">Tips:</p>
        <ul className="space-y-1">
          <li>• Click "Use My Current Location" to automatically fill coordinates</li>
          <li>• Or get coordinates from Google Maps by right-clicking a location</li>
          <li>• The label will appear when someone opens the location QR code</li>
          <li>• Use "Preview in Google Maps" to verify your location</li>
        </ul>
      </div>
    </div>
  );
}
