import QRCode from 'qrcode';
import { getAverageColor } from './colorUtils';
import { VCardData, WifiData, EmailData, SMSData, LocationData } from '../types/qrTypes';

async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function compressImage(file: File, maxWidth: number = 800, quality: number = 0.8): Promise<File> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    const img = new Image();
    img.onload = () => {
      // Calculate new dimensions while maintaining aspect ratio
      let { width, height } = img;
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      if (height > maxWidth) {
        width = (width * maxWidth) / height;
        height = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            reject(new Error('Failed to compress image'));
          }
        },
        'image/jpeg',
        quality
      );
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
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

export function encodeVCard(data: VCardData): string {
  let vcard = 'BEGIN:VCARD\nVERSION:3.0\n';
  
  if (data.firstName || data.lastName) {
    const fullName = `${data.firstName} ${data.lastName}`.trim();
    vcard += `FN:${fullName}\n`;
    vcard += `N:${data.lastName};${data.firstName};;;\n`;
  }
  
  if (data.organization) vcard += `ORG:${data.organization}\n`;
  if (data.title) vcard += `TITLE:${data.title}\n`;
  if (data.phone) vcard += `TEL:${data.phone}\n`;
  if (data.email) vcard += `EMAIL:${data.email}\n`;
  if (data.website) vcard += `URL:${data.website}\n`;
  
  if (data.address) {
    const addr = data.address;
    vcard += `ADR:;;${addr.street || ''};${addr.city || ''};${addr.state || ''};${addr.zip || ''};${addr.country || ''}\n`;
  }
  
  vcard += 'END:VCARD';
  return vcard;
}

export function encodeWifi(data: WifiData): string {
  return `WIFI:T:${data.security};S:${data.ssid};P:${data.password};H:${data.hidden ? 'true' : 'false'};;`;
}

export function encodeEmail(data: EmailData): string {
  let email = `mailto:${data.to}`;
  const params = [];
  if (data.subject) params.push(`subject=${encodeURIComponent(data.subject)}`);
  if (data.body) params.push(`body=${encodeURIComponent(data.body)}`);
  if (params.length > 0) email += `?${params.join('&')}`;
  return email;
}

export function encodeSMS(data: SMSData): string {
  return `sms:${data.phone}${data.message ? `?body=${encodeURIComponent(data.message)}` : ''}`;
}

export function encodeLocation(data: LocationData): string {
  return `geo:${data.latitude},${data.longitude}${data.label ? `?q=${encodeURIComponent(data.label)}` : ''}`;
}

export { compressImage };

export async function generateQRCode(
  text: string,
  logoFile?: File | null,
  customColor?: string | null
): Promise<string> {
  try {
    // Generate QR code on canvas
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');

    // Use custom color if provided, otherwise extract from logo, or default to black
    let qrColor = '#000000';
    if (customColor) {
      qrColor = customColor;
    } else if (logoFile) {
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
