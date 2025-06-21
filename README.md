# LA-AI QR Code Generator

A professional QR code generator built for Lower Alabama AI (LA-AI), featuring support for multiple data types and custom logo overlays.

![LA-AI Logo](src/assets/la-ai-logo.svg)

## Features

🎯 **Multiple QR Code Types**
- Text & URLs
- vCard contact information
- WiFi network credentials
- Email with pre-filled content
- SMS messages
- GPS locations

🎨 **Professional Design**
- LA-AI branded interface
- Logo overlay with intelligent color extraction
- Responsive design optimized for all devices
- Clean, modern UI with Tailwind CSS

⚡ **Advanced Functionality**
- High error correction for reliable scanning
- Automatic logo color matching
- Professional file naming
- Real-time validation

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ktg-motive/qr-code.git
cd qr-code

# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production

```bash
npm run build
npm run preview
```

## Usage

1. **Select QR Code Type**: Choose from text, vCard, WiFi, email, SMS, or location
2. **Fill in Information**: Complete the relevant form fields
3. **Add Logo (Optional)**: Upload a logo for brand integration
4. **Generate**: Create your professional QR code
5. **Download**: Save as high-quality PNG

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **QR Generation**: qrcode library
- **Icons**: Lucide React

## About LA-AI

Lower Alabama AI (LA-AI) is a 501(c)(3) organization focused on building an inclusive AI community in Lower Alabama. We help locals learn, connect, and innovate with AI through education and practical applications, creating lasting regional prosperity.

**Mission**: Empowering Gulf Coast communities through AI education and innovation.

Visit us at [www.la-ai.io](https://www.la-ai.io)

## Development

### Project Structure
```
src/
├── components/          # Reusable UI components
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── assets/             # Static assets
```

### Key Components
- `QRCodeGenerator`: Main application logic
- `DataTypeSelector`: QR code type picker
- Form components for each data type
- Utility functions for QR encoding

## Contributing

We welcome contributions from the Gulf Coast tech community! Please feel free to submit issues and pull requests.

## License

This project is part of the LA-AI toolkit for community empowerment.

---

Built with ❤️ by [Lower Alabama AI](https://www.la-ai.io)  
*Empowering Gulf Coast communities through AI education and innovation*