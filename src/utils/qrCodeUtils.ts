import QRCode from 'qrcode';
import { getAverageColor } from './colorUtils';

async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function getLogoColor(logoFile: File): Promise<string> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  const logoImg = await loadImage(URL.createObjectURL(logoFile));
  canvas.width = logoImg.width;
  canvas.height = logoImg.height;
  ctx.drawImage(logoImg, 0, 0);

  return getAverageColor(canvas);
}

export async function generateQRCode(
  text: string,
  logoFile?: File | null
): Promise<string> {
  try {
    // Generate QR code on canvas
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');

    // Get logo color if logo is provided
    let qrColor = '#000000';
    if (logoFile) {
      qrColor = await getLogoColor(logoFile);
    }

    // Generate QR code
    await QRCode.toCanvas(canvas, text, {
      width: 512,
      margin: 2,
      color: {
        dark: qrColor,
        light: '#ffffff',
      },
      errorCorrectionLevel: 'H', // High error correction for logo overlay
    });

    // If logo is provided, overlay it on the QR code
    if (logoFile) {
      const logoUrl = URL.createObjectURL(logoFile);
      try {
        const logoImg = await loadImage(logoUrl);
        
        // Calculate logo size (25% of QR code)
        const logoSize = canvas.width * 0.25;
        const logoX = (canvas.width - logoSize) / 2;
        const logoY = (canvas.height - logoSize) / 2;

        // Draw white background for logo
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(logoX - 4, logoY - 4, logoSize + 8, logoSize + 8);

        // Draw logo
        ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
      } finally {
        URL.revokeObjectURL(logoUrl);
      }
    }

    return canvas.toDataURL('image/png');
  } catch (err) {
    console.error('Error generating QR code:', err);
    throw new Error('Failed to generate QR code');
  }
}