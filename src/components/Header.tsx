import React from 'react';
import laAiLogo from '../assets/la-ai-logo.png';

export default function Header() {
  return (
    <header className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border mb-8">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={laAiLogo}
              alt="LA-AI Logo"
              className="w-12 h-12 rounded-lg"
            />
            <div>
              <h1 className="text-xl font-bold text-foreground">Lower Alabama AI</h1>
              <p className="text-sm text-muted-foreground">QR Code Generator</p>
            </div>
          </div>
          <div className="hidden sm:block">
            <a 
              href="https://www.la-ai.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Visit LA-AI →
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
