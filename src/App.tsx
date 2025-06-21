import React from 'react';
import Header from './components/Header';
import QRCodeGenerator from './components/QRCodeGenerator';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex flex-col items-center px-4 pb-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              QR Code Generator
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Create professional QR codes for text, contacts, WiFi networks, and more.
            </p>
          </div>
          
          <div className="bg-card rounded-xl shadow-lg border border-border p-6">
            <QRCodeGenerator />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
