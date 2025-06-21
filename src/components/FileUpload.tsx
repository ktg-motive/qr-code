import React, { ChangeEvent, useRef } from 'react';
import { Upload } from 'lucide-react';
import Button from './Button';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  error?: string | null;
}

export default function FileUpload({ onFileSelect, accept = 'image/*', error }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        className="hidden"
      />
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="w-4 h-4 mr-2" />
        Upload Logo
      </Button>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}