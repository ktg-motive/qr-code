import React from 'react';

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200 mb-8">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-la-ai-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">LA</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Lower Alabama AI</h1>
              <p className="text-sm text-gray-600">QR Code Generator</p>
            </div>
          </div>
          <div className="hidden sm:block">
            <a 
              href="https://www.la-ai.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-la-ai-500 hover:text-la-ai-600 font-medium transition-colors"
            >
              Visit LA-AI →
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
