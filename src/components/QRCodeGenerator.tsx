import React, { useState } from 'react';
import { QrCode, Download } from 'lucide-react';
import { generateQRCode, encodeVCard, encodeWifi, encodeEmail, encodeSMS, encodeLocation } from '../utils/qrCodeUtils';
import { QRDataType, VCardData, WifiData, EmailData, SMSData, LocationData } from '../types/qrTypes';
import Button from './Button';
import Input from './Input';
import FileUpload from './FileUpload';
import DataTypeSelector from './DataTypeSelector';
import VCardForm from './VCardForm';
import WifiForm from './WifiForm';
import EmailForm from './EmailForm';
import SMSForm from './SMSForm';
import LocationForm from './LocationForm';

export default function QRCodeGenerator() {
  const [dataType, setDataType] = useState<QRDataType>('text');
  const [textInput, setTextInput] = useState('');
  const [vCardData, setVCardData] = useState<VCardData>({
    firstName: '',
    lastName: '',
    organization: '',
    title: '',
    phone: '',
    email: '',
    website: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: ''
    }
  });
  const [wifiData, setWifiData] = useState<WifiData>({
    ssid: '',
    password: '',
    security: 'WPA',
    hidden: false
  });
  const [emailData, setEmailData] = useState<EmailData>({
    to: '',
    subject: '',
    body: ''
  });
  const [smsData, setSmsData] = useState<SMSData>({
    phone: '',
    message: ''
  });
  const [locationData, setLocationData] = useState<LocationData>({
    latitude: 0,
    longitude: 0,
    label: ''
  });

  const [logo, setLogo] = useState<File | null>(null);
  const [qrCode, setQRCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [logoError, setLogoError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleLogoSelect = (file: File) => {
    if (file.size > 1024 * 1024) {
      setLogoError('Logo file size must be less than 1MB');
      return;
    }
    setLogoError(null);
    setLogo(file);
  };

  const generateDataString = (): string => {
    switch (dataType) {
      case 'text':
        return textInput;
      case 'vcard':
        return encodeVCard(vCardData);
      case 'wifi':
        return encodeWifi(wifiData);
      case 'email':
        return encodeEmail(emailData);
      case 'sms':
        return encodeSMS(smsData);
      case 'location':
        return encodeLocation(locationData);
      default:
        return '';
    }
  };

  const validateData = (): string | null => {
    switch (dataType) {
      case 'text':
        return textInput.trim() ? null : 'Please enter some text or a URL.';
      case 'vcard':
        return (vCardData.firstName || vCardData.lastName) ? null : 'Please enter at least a first or last name.';
      case 'wifi':
        return wifiData.ssid ? null : 'Please enter a network name (SSID).';
      case 'email':
        return emailData.to ? null : 'Please enter an email address.';
      case 'sms':
        return smsData.phone ? null : 'Please enter a phone number.';
      case 'location':
        return (locationData.latitude !== 0 || locationData.longitude !== 0) ? null : 'Please enter valid coordinates.';
      default:
        return 'Please select a data type and fill in the required fields.';
    }
  };

  const handleGenerate = async () => {
    const validationError = validateData();
    if (validationError) {
      setError(validationError);
      setQRCode(null);
      return;
    }

    setError(null);
    setIsGenerating(true);

    try {
      const dataString = generateDataString();
      const qrDataUrl = await generateQRCode(dataString, logo);
      setQRCode(qrDataUrl);
    } catch (err) {
      setError('Failed to generate QR code. Please try again.');
      setQRCode(null);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!qrCode) return;
    
    const link = document.createElement('a');
    link.download = `la-ai-qrcode-${dataType}.png`;
    link.href = qrCode;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderDataForm = () => {
    switch (dataType) {
      case 'text':
        return (
          <Input
            value={textInput}
            onChange={(e) => {
              setTextInput(e.target.value);
              setError(null);
            }}
            placeholder="Enter text or a URL..."
          />
        );
      case 'vcard':
        return (
          <VCardForm
            data={vCardData}
            onChange={(data) => {
              setVCardData(data);
              setError(null);
            }}
          />
        );
      case 'wifi':
        return (
          <WifiForm
            data={wifiData}
            onChange={(data) => {
              setWifiData(data);
              setError(null);
            }}
          />
        );
      case 'email':
        return (
          <EmailForm
            data={emailData}
            onChange={(data) => {
              setEmailData(data);
              setError(null);
            }}
          />
        );
      case 'sms':
        return (
          <SMSForm
            data={smsData}
            onChange={(data) => {
              setSmsData(data);
              setError(null);
            }}
          />
        );
      case 'location':
        return (
          <LocationForm
            data={locationData}
            onChange={(data) => {
              setLocationData(data);
              setError(null);
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <DataTypeSelector
        selected={dataType}
        onSelect={(type) => {
          setDataType(type);
          setError(null);
          setQRCode(null);
        }}
      />

      <div className="space-y-4">
        {renderDataForm()}

        {error && (
          <div className="text-sm text-la-ai-red-600 bg-la-ai-red-50 border border-la-ai-red-200 p-3 rounded-lg flex items-start">
            <div className="w-2 h-2 bg-la-ai-red-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
            <span>{error}</span>
          </div>
        )}

        <div className="border-t border-gray-200 pt-4">
          <FileUpload
            onFileSelect={handleLogoSelect}
            error={logoError}
          />
        </div>
        
        <Button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full"
        >
          <QrCode className="w-4 h-4 mr-2" />
          {isGenerating ? 'Generating...' : 'Generate QR Code'}
        </Button>
      </div>

      {qrCode && (
        <div className="space-y-4 border-t border-gray-200 pt-6">
          <div className="flex justify-center">
            <div className="p-4 bg-white border-2 border-gray-200 rounded-xl shadow-sm">
              <img
                src={qrCode}
                alt="Generated QR Code"
                className="w-64 h-64 rounded-lg"
              />
            </div>
          </div>
          <Button
            onClick={handleDownload}
            variant="outline"
            className="w-full"
          >
            <Download className="w-4 h-4 mr-2" />
            Download QR Code
          </Button>
        </div>
      )}
    </div>
  );
}
