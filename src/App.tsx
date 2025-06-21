import React from 'react';
import QRCodeGenerator from './components/QRCodeGenerator';
import Header from './components/Header';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-la-ai-50">
      <Header />
      <div className="flex flex-col items-center px-4 pb-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              QR Code Generator
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Create professional QR codes for text, contacts, WiFi networks, and more. 
              Part of the LA-AI toolkit for digital innovation.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <QRCodeGenerator />
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Built with ❤️ by{' '}
              <a 
                href="https://www.la-ai.io" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-la-ai-500 hover:text-la-ai-600 font-medium"
              >
                Lower Alabama AI
              </a>
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Empowering Gulf Coast communities through AI education and innovation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
