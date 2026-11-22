import { Flower, FLOWERS } from '../data/flowers';

export interface PosyPayload {
  stems: string[];
  to: string;
  from: string;
  note: string;
}

export function buildAutoPosyNote(selected: Flower[]): string {
  if (selected.length === 0) return '';
  const words = selected.map((f) => f.sentiments[0].toLowerCase());
  if (selected.length === 1) {
    return `A single stem of ${selected[0].name.toLowerCase()}—whispering quietly of ${words[0]}.`;
  }
  if (selected.length === 2) {
    return `Bound together, ${selected[0].name.toLowerCase()} and ${selected[1].name.toLowerCase()} speak of ${words[0]} and ${words[1]}.`;
  }
  return `A triptych of ${selected[0].name.toLowerCase()}, ${selected[1].name.toLowerCase()}, and ${selected[2].name.toLowerCase()}—carrying ${words[0]}, ${words[1]}, and ${words[2]}.`;
}

export function encodePosyToSearch(payload: PosyPayload): string {
  const params = new URLSearchParams();
  params.set('view', 'gift');
  if (payload.stems.length > 0) params.set('stems', payload.stems.join(','));
  if (payload.to.trim()) params.set('to', payload.to.trim());
  if (payload.from.trim()) params.set('from', payload.from.trim());
  if (payload.note.trim()) params.set('note', payload.note.trim());
  return `?${params.toString()}`;
}

export function decodePosyFromSearch(search: string): PosyPayload | null {
  const params = new URLSearchParams(search);
  if (params.get('view') !== 'gift') return null;

  const validIds = new Set(FLOWERS.map((f) => f.id));
  const rawStems = (params.get('stems') || '')
    .split(',')
    .map((s) => s.trim())
    .filter((s) => validIds.has(s))
    .slice(0, 3);

  if (rawStems.length === 0) return null;

  const selected = rawStems
    .map((id) => FLOWERS.find((f) => f.id === id))
    .filter((f): f is Flower => Boolean(f));

  return {
    stems: rawStems,
    to: params.get('to') || '',
    from: params.get('from') || '',
    note: params.get('note') || buildAutoPosyNote(selected),
  };
}

export function getBloomOfTheDayIndex(date = new Date()): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / 86_400_000);
  return dayOfYear % FLOWERS.length;
}

export function formatEditorialDate(date = new Date()): string {
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}
