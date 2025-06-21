import React from 'react';
import QRCodeGenerator from './components/QRCodeGenerator';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            QR Code Generator
          </h1>
          <p className="text-gray-600">
            Enter any text or URL to generate a QR code
          </p>
        </div>
        <QRCodeGenerator />
      </div>
    </div>
  );
}

export default App;