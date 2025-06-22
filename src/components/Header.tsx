import React from 'react';
import laAiLogo from '../assets/la-ai-logo.png';

export default function Header() {
  return (
    <header className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border mb-6">
      <div className="max-w-lg mx-auto px-4 py-4">
        <div className="flex items-center justify-center space-x-4">
          <img
            src={laAiLogo}
            alt="LA-AI Logo"
            className="w-8 h-8 rounded-lg flex-shrink-0"
          />
          <div className="text-center">
            <h1 className="text-base font-bold text-foreground">Lower Alabama AI</h1>
            <p className="text-xs text-muted-foreground">QR Code Generator</p>
          </div>
          <a 
            href="https://www.la-ai.io" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-400 font-medium transition-colors text-xs flex-shrink-0"
          >
            <span className="hidden sm:inline">Visit LA-AI →</span>
            <span className="sm:hidden">Visit →</span>
          </a>
        </div>
      </div>
    </header>
  );
}
