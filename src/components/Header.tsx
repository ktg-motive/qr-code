import React from 'react';
import laAiLogo from '../assets/la-ai-logo.png';

export default function Header() {
  return (
    <header className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border mb-6">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between min-w-0">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <img
              src={laAiLogo}
              alt="LA-AI Logo"
              className="w-10 h-10 rounded-lg flex-shrink-0"
            />
            <div className="min-w-0">
              <h1 className="text-lg font-bold text-foreground truncate">Lower Alabama AI</h1>
              <p className="text-xs text-muted-foreground">QR Code Generator</p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <a 
              href="https://www.la-ai.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 font-medium transition-colors text-sm"
            >
              <span className="hidden sm:inline">Visit LA-AI →</span>
              <span className="sm:hidden">LA-AI →</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
