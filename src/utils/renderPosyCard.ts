import { Flower } from '../data/flowers';

export interface RenderPosyOptions {
  flowers: Flower[];
  to: string;
  from: string;
  note: string;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number
) {
  const imgRatio = img.width / img.height;
  const boxRatio = w / h;
  let sx = 0;
  let sy = 0;
  let sw = img.width;
  let sh = img.height;

  if (imgRatio > boxRatio) {
    sw = img.height * boxRatio;
    sx = (img.width - sw) / 2;
  } else {
    sh = img.width / boxRatio;
    sy = (img.height - sh) / 2;
  }

  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const paragraphs = text.replace(/\r/g, '').split('\n');
  const lines: string[] = [];

  for (const para of paragraphs) {
    const words = para.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) {
      if (lines.length > 0) lines.push('');
      continue;
    }
    let current = words[0];
    for (let i = 1; i < words.length; i++) {
      const candidate = `${current} ${words[i]}`;
      if (ctx.measureText(candidate).width <= maxWidth) {
        current = candidate;
      } else {
        lines.push(current);
        current = words[i];
      }
    }
    lines.push(current);
  }
  return lines;
}

function drawTrackedCenteredText(
  ctx: CanvasRenderingContext2D,
  text: string,
  centerX: number,
  y: number,
  tracking: number
) {
  const chars = Array.from(text);
  const widths = chars.map((c) => ctx.measureText(c).width);
  const totalWidth =
    widths.reduce((acc, w) => acc + w, 0) +
    Math.max(0, chars.length - 1) * tracking;

  let x = centerX - totalWidth / 2;
  const prevAlign = ctx.textAlign;
  ctx.textAlign = 'left';
  for (let i = 0; i < chars.length; i++) {
    ctx.fillText(chars[i], x, y);
    x += widths[i] + tracking;
  }
  ctx.textAlign = prevAlign;
}

export async function downloadPosyCardImage(
  options: RenderPosyOptions
): Promise<void> {
  const { flowers, to, from, note } = options;
  if (flowers.length === 0) return;

  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }

  const W = 1200;
  const H = 1500;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');

  // 1. Warm outer desk margin + archival cream stationery card
  ctx.fillStyle = '#EFE9DC';
  ctx.fillRect(0, 0, W, H);

  // Subtle card drop shadow
  ctx.save();
  ctx.shadowColor = 'rgba(38, 34, 28, 0.08)';
  ctx.shadowBlur = 40;
  ctx.shadowOffsetY = 14;
  ctx.fillStyle = '#FCF9F2';
  drawRoundedRect(ctx, 64, 64, W - 128, H - 128, 28);
  ctx.fill();
  ctx.restore();

  // Outer card border
  ctx.strokeStyle = '#DFD7C6';
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, 64, 64, W - 128, H - 128, 28);
  ctx.stroke();

  // Delicate inner letterpress hairline frame
  ctx.strokeStyle = '#EAE2D2';
  ctx.lineWidth = 1.5;
  drawRoundedRect(ctx, 94, 94, W - 188, H - 188, 18);
  ctx.stroke();

  // 2. Top Dedication Header
  const headerLabel = to.trim()
    ? `FOR ${to.trim().toUpperCase()}`
    : 'A QUIET POSY';
  ctx.fillStyle = '#6E6659';
  ctx.font = '500 22px Inter, -apple-system, sans-serif';
  drawTrackedCenteredText(ctx, headerLabel, W / 2, 186, 6);

  // Small ornamental rule under header
  ctx.strokeStyle = '#DFD7C6';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 56, 218);
  ctx.lineTo(W / 2 + 56, 218);
  ctx.stroke();

  // 3. Load and Draw 1–3 Botanical Plates
  const loadedImages = await Promise.all(
    flowers.map((f) => loadImage(f.image))
  );

  const count = flowers.length;
  const plateW = count === 1 ? 430 : count === 2 ? 360 : 284;
  const plateH = Math.round(plateW * 1.28);
  const gap = count === 3 ? 28 : 42;
  const totalRowW = count * plateW + (count - 1) * gap;
  const startX = (W - totalRowW) / 2;
  const plateY = count === 1 ? 268 : count === 2 ? 306 : 344;

  flowers.forEach((flower, idx) => {
    const x = startX + idx * (plateW + gap);
    const img = loadedImages[idx];

    ctx.save();
    drawRoundedRect(ctx, x, plateY, plateW, plateH, 16);
    ctx.fillStyle = '#F7F3E9';
    ctx.fill();
    ctx.clip();
    drawImageCover(ctx, img, x, plateY, plateW, plateH);
    ctx.restore();

    ctx.strokeStyle = '#DFD7C6';
    ctx.lineWidth = 1.5;
    drawRoundedRect(ctx, x, plateY, plateW, plateH, 16);
    ctx.stroke();

    // Flower name + subtle Victorian meaning beneath each plate
    ctx.textAlign = 'center';
    ctx.fillStyle = '#26221C';
    ctx.font = '500 30px "Cormorant Garamond", Georgia, serif';
    ctx.fillText(flower.name, x + plateW / 2, plateY + plateH + 44);

    ctx.fillStyle = flower.accent;
    ctx.font = 'italic 21px "EB Garamond", Georgia, serif';
    ctx.fillText(
      flower.sentiments[0],
      x + plateW / 2,
      plateY + plateH + 74
    );
  });

  // 4. Personal / Decoded Keepsake Message
  const textStartY = plateY + plateH + 158;
  const cleanNote = note.trim();
  if (cleanNote) {
    const quoted =
      cleanNote.startsWith('“') || cleanNote.startsWith('"')
        ? cleanNote
        : `“${cleanNote}”`;
    ctx.textAlign = 'center';
    ctx.fillStyle = '#26221C';
    ctx.font = 'italic 36px "EB Garamond", Georgia, serif';
    const lines = wrapText(ctx, quoted, 840).slice(0, 5);
    const lineHeight = 52;
    lines.forEach((line, i) => {
      ctx.fillText(line, W / 2, textStartY + i * lineHeight);
    });

    // 5. Optional Sender Sign-Off
    if (from.trim()) {
      const signY = textStartY + lines.length * lineHeight + 34;
      ctx.fillStyle = '#6E6659';
      ctx.font = 'italic 28px "EB Garamond", Georgia, serif';
      ctx.fillText(`— ${from.trim()}`, W / 2, Math.min(signY, 1285));
    }
  } else if (from.trim()) {
    ctx.textAlign = 'center';
    ctx.fillStyle = '#6E6659';
    ctx.font = 'italic 28px "EB Garamond", Georgia, serif';
    ctx.fillText(`— ${from.trim()}`, W / 2, textStartY + 24);
  }

  // 6. Quiet Bottom Colophon Watermark
  ctx.strokeStyle = '#EAE2D2';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 140, 1326);
  ctx.lineTo(W / 2 + 140, 1326);
  ctx.stroke();

  ctx.fillStyle = '#8A8173';
  ctx.font = '500 17px Inter, -apple-system, sans-serif';
  drawTrackedCenteredText(ctx, 'ANTHOS · A BOTANICAL MISCELLANY', W / 2, 1368, 4.5);

  // Trigger clean PNG download
  const slug = (to.trim() || flowers.map((f) => f.id).join('-'))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const filename = `anthos-posy-${slug || 'keepsake'}.png`;

  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
