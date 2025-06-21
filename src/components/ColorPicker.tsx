import React, { useState } from 'react';
import { Palette, RotateCcw } from 'lucide-react';
import { cn } from '../utils/cn';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  onReset: () => void;
  isAutoColor: boolean;
  disabled?: boolean;
}

const predefinedColors = [
  '#000000', // Black
  '#1f2937', // Dark Gray
  '#dc2626', // Red
  '#ea580c', // Orange
  '#d97706', // Amber
  '#16a34a', // Green
  '#0891b2', // Cyan
  '#2563eb', // Blue
  '#7c3aed', // Purple
  '#be185d', // Pink
];

export default function ColorPicker({ 
  value, 
  onChange, 
  onReset, 
  isAutoColor, 
  disabled = false 
}: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleColorSelect = (color: string) => {
    onChange(color);
    setIsOpen(false);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground">QR Code Color</label>
      
      <div className="flex items-center gap-2">
        {/* Color preview and picker button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            'flex items-center gap-2 px-3 py-2 rounded-md border transition-colors',
            'bg-background hover:bg-accent hover:text-accent-foreground',
            'border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          <div 
            className="w-4 h-4 rounded border border-border flex-shrink-0"
            style={{ backgroundColor: value }}
          />
          <Palette className="w-4 h-4" />
          <span className="text-sm">
            {isAutoColor ? 'Auto (from logo)' : 'Custom'}
          </span>
        </button>

        {/* Reset button */}
        {!isAutoColor && (
          <button
            type="button"
            onClick={onReset}
            disabled={disabled}
            className={cn(
              'p-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
            title="Use logo color"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Color palette */}
      {isOpen && !disabled && (
        <div className="p-3 border border-border rounded-lg bg-card shadow-md">
          <div className="space-y-3">
            {/* Custom color input */}
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Custom Color</label>
              <input
                type="color"
                value={value}
                onChange={(e) => handleColorSelect(e.target.value)}
                className="w-full h-8 rounded border border-input cursor-pointer"
              />
            </div>

            {/* Predefined colors */}
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">Quick Colors</label>
              <div className="grid grid-cols-5 gap-2">
                {predefinedColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleColorSelect(color)}
                    className={cn(
                      'w-8 h-8 rounded border-2 transition-all hover:scale-110',
                      value === color ? 'border-primary ring-2 ring-primary/20' : 'border-border'
                    )}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}