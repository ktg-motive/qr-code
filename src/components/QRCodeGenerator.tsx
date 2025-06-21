import React, { useState } from 'react';
import { QrCode } from 'lucide-react';
import { generateQRCode } from '../utils/qrCodeUtils';
import Button from './Button';
import Input from './Input';
import FileUpload from './FileUpload';

export default function QRCodeGenerator() {
  const [input, setInput] = useState('');
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
    // Automatically regenerate QR code when logo changes
    if (input.trim()) {
      handleGenerate();
    }
  };

  const handleGenerate = async () => {
    if (!input.trim()) {
      setError('Please enter some text or a URL before generating a QR code.');
      setQRCode(null);
      return;
    }

    setError(null);
    setIsGenerating(true);

    try {
      const qrDataUrl = await generateQRCode(input, logo);
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
    link.download = 'qrcode.png';
    link.href = qrCode;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="space-y-4">
        <Input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError(null);
          }}
          placeholder="Enter text or a URL..."
          error={error}
        />

        <FileUpload
          onFileSelect={handleLogoSelect}
          error={logoError}
        />
        
        <Button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full"
        >
          <QrCode className="w-4 h-4 mr-2" />
          Generate QR Code
        </Button>
      </div>

      {qrCode && (
        <div className="space-y-4">
          <div className="flex justify-center">
            <img
              src={qrCode}
              alt="Generated QR Code"
              className="w-64 h-64 border border-gray-200 rounded-lg"
            />
          </div>
          <Button
            onClick={handleDownload}
            variant="outline"
            className="w-full"
          >
            Download QR Code
          </Button>
        </div>
      )}
    </div>
  );
}