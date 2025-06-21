import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-1 text-muted-foreground text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>in Lower Alabama by</span>
            <a 
              href="https://www.la-ai.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Lower Alabama AI
            </a>
          </div>
          
          <p className="text-xs text-muted-foreground max-w-lg mx-auto leading-relaxed">
            <em>Empowering Gulf Coast communities through AI education and innovation</em>
          </p>
        </div>
      </div>
    </footer>
  );
}