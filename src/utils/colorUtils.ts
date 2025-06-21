export function getAverageColor(canvas: HTMLCanvasElement): string {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  let r = 0, g = 0, b = 0;
  let count = 0;

  // Sample every 4th pixel for performance
  for (let i = 0; i < data.length; i += 16) {
    const alpha = data[i + 3];
    // Only consider pixels that aren't transparent
    if (alpha > 128) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
      count++;
    }
  }

  // Calculate average
  r = Math.round(r / count);
  g = Math.round(g / count);
  b = Math.round(b / count);

  // Convert to hex
  const hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return hex;
}