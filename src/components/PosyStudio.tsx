import { useMemo, useState } from 'react';
import { Check, Copy, Download, Eye, RotateCcw, Search, X } from 'lucide-react';
import { Flower, FLOWERS } from '../data/flowers';
import {
  buildAutoPosyNote,
  encodePosyToSearch,
  PosyPayload,
} from '../utils/posyUrl';
import { downloadPosyCardImage } from '../utils/renderPosyCard';

interface PosyStudioProps {
  initialStems: string[];
  onPreviewGift: (payload: PosyPayload) => void;
}

export function PosyStudio({ initialStems, onPreviewGift }: PosyStudioProps) {
  const [stemIds, setStemIds] = useState<string[]>(
    initialStems.length > 0 ? initialStems.slice(0, 3) : ['anemone', 'iris']
  );
  const [recipient, setRecipient] = useState('Clara');
  const [sender, setSender] = useState('');
  const [customNote, setCustomNote] = useState<string | null>(null);
  const [stemQuery, setStemQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [savingImage, setSavingImage] = useState(false);
  const [savedImage, setSavedImage] = useState(false);

  const selectedFlowers = useMemo<Flower[]>(
    () =>
      stemIds
        .map((id) => FLOWERS.find((f) => f.id === id))
        .filter((f): f is Flower => Boolean(f)),
    [stemIds]
  );

  const autoNote = useMemo(
    () => buildAutoPosyNote(selectedFlowers),
    [selectedFlowers]
  );
  const displayedNote = customNote !== null ? customNote : autoNote;

  const filteredStems = useMemo(() => {
    const q = stemQuery.trim().toLowerCase();
    if (!q) return FLOWERS;
    return FLOWERS.filter((f) =>
      [f.name, f.latin, f.meaning, f.season, ...f.sentiments]
        .join(' ')
        .toLowerCase()
        .includes(q)
    );
  }, [stemQuery]);

  const toggleStem = (id: string) => {
    setStemIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const currentPayload: PosyPayload = {
    stems: stemIds,
    to: recipient,
    from: sender,
    note: displayedNote,
  };

  const handleCopyLink = async () => {
    const query = encodePosyToSearch(currentPayload);
    const shareUrl = `${window.location.origin}${window.location.pathname}${query}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    } catch {
      window.prompt('Copy your private posy link:', shareUrl);
    }
  };

  const handleSaveImage = async () => {
    if (selectedFlowers.length === 0 || savingImage) return;
    setSavingImage(true);
    try {
      await downloadPosyCardImage({
        flowers: selectedFlowers,
        to: recipient,
        from: sender,
        note: displayedNote,
      });
      setSavedImage(true);
      setTimeout(() => setSavedImage(false), 2400);
    } finally {
      setSavingImage(false);
    }
  };

  return (
    <section className="max-w-5xl mx-auto animate-soft-in">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Live Editable Stationery Card Resting on a Warm Desk */}
        <div className="lg:col-span-7 bg-[#EFE9DC] rounded-2xl p-4 sm:p-7 border border-[#DFD7C6]">
          <div className="bg-[#FCF9F2] rounded-xl border border-[#DFD7C6] p-5 sm:p-8 shadow-[0_8px_30px_rgba(38,34,28,0.08)]">
            {/* Editable Recipient */}
            <div className="flex items-center justify-center gap-2 text-[11px] tracking-[0.24em] uppercase text-[#6E6659]">
              <span>For</span>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="someone dear"
                maxLength={40}
                className="w-36 sm:w-44 text-center bg-transparent border-b border-dashed border-[#CFC6B4] text-[#26221C] uppercase tracking-[0.22em] py-0.5 focus:outline-none focus:border-[#26221C]"
              />
            </div>

            {/* Selected Botanical Stems */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 my-6 min-h-[144px]">
              {selectedFlowers.length > 0 ? (
                selectedFlowers.map((flower) => (
                  <div
                    key={flower.id}
                    className="relative group flex flex-col items-center"
                  >
                    <button
                      type="button"
                      onClick={() => toggleStem(flower.id)}
                      title={`Remove ${flower.name}`}
                      className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#26221C] text-[#F7F3E9] opacity-0 group-hover:opacity-100 focus:opacity-100 transition flex items-center justify-center cursor-pointer shadow-sm"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <img
                      src={flower.image}
                      alt={flower.name}
                      className="w-24 h-30 sm:w-28 sm:h-36 object-cover rounded-lg border border-[#DFD7C6] bg-[#F7F3E9]"
                    />
                    <span className="font-book italic text-xs text-[#6E6659] mt-1.5">
                      {flower.name}
                    </span>
                  </div>
                ))
              ) : (
                <p className="font-book italic text-base text-[#8A8173] text-center py-8">
                  Search a feeling or bloom to tie up to three stems together.
                </p>
              )}
            </div>

            {/* Editable Keepsake Message */}
            <div>
              <textarea
                rows={3}
                value={displayedNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="Write a personal note to accompany your flowers..."
                className="w-full text-center font-book italic text-[16px] leading-relaxed text-[#26221C] bg-[#F7F3E9]/70 rounded-xl p-3.5 border border-dashed border-[#DFD7C6] focus:outline-none focus:border-[#26221C] resize-none transition"
              />
              <div className="flex items-center justify-between mt-1.5 px-1 text-[11px] text-[#8A8173]">
                <span>Tap the message to rewrite it in your own words</span>
                {customNote !== null ? (
                  <button
                    type="button"
                    onClick={() => setCustomNote(null)}
                    className="inline-flex items-center gap-1 underline hover:text-[#26221C] cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Use floral note</span>
                  </button>
                ) : (
                  <span className="font-book italic">Auto-woven from stems</span>
                )}
              </div>
            </div>

            {/* Editable Sign-off */}
            <div className="mt-5 pt-4 border-t border-[#EFE9DC] flex items-center justify-center gap-2 font-book italic text-sm text-[#6E6659]">
              <span>—</span>
              <input
                type="text"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                placeholder="Your name (optional)"
                maxLength={36}
                className="w-40 text-center bg-transparent border-b border-dashed border-[#CFC6B4] text-[#26221C] py-0.5 focus:outline-none focus:border-[#26221C]"
              />
            </div>
          </div>

          {/* Stateless Sharing Controls */}
          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              disabled={selectedFlowers.length === 0}
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#26221C] text-[#F7F3E9] text-xs tracking-wide hover:bg-[#3A342B] disabled:opacity-40 transition cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Link copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy shareable link</span>
                </>
              )}
            </button>

            <button
              type="button"
              disabled={selectedFlowers.length === 0 || savingImage}
              onClick={handleSaveImage}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#CFC6B4] bg-[#FCF9F2] text-[#26221C] text-xs hover:bg-[#F7F3E9] disabled:opacity-40 transition cursor-pointer"
            >
              {savedImage ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#4E6B47]" />
                  <span>Image saved</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>{savingImage ? 'Preparing...' : 'Save card image'}</span>
                </>
              )}
            </button>

            <button
              type="button"
              disabled={selectedFlowers.length === 0}
              onClick={() => onPreviewGift(currentPayload)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full text-[#5C5549] text-xs hover:text-[#26221C] disabled:opacity-40 transition cursor-pointer sm:ml-auto"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview link</span>
            </button>
          </div>
        </div>

        {/* Right: Stateless Search & Stem Selector */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <div className="text-[10.5px] tracking-[0.24em] uppercase text-[#6E6659]">
              Posy Studio · {stemIds.length} of 3 stems
            </div>
            <h1 className="font-display text-3xl text-[#26221C] mt-0.5 font-medium">
              Search blooms by meaning
            </h1>
            <p className="text-xs text-[#6E6659] mt-1 leading-relaxed">
              No login or account required—your chosen stems and note are carried directly inside the private link you share.
            </p>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-[#8A8173] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={stemQuery}
              onChange={(e) => setStemQuery(e.target.value)}
              placeholder="Search meaning or flower (e.g. sorry, peace, sleep)..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#FCF9F2] border border-[#DFD7C6] text-xs text-[#26221C] placeholder-[#948B7C] focus:outline-none focus:border-[#26221C]"
            />
            {stemQuery && (
              <button
                type="button"
                onClick={() => setStemQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8173] hover:text-[#26221C] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="space-y-2 max-h-[430px] overflow-y-auto pr-1">
            {filteredStems.map((flower) => {
              const picked = stemIds.includes(flower.id);
              const disabled = !picked && stemIds.length >= 3;
              return (
                <button
                  key={flower.id}
                  type="button"
                  disabled={disabled}
                  onClick={() => toggleStem(flower.id)}
                  className={`w-full text-left flex items-center gap-3 p-2.5 rounded-xl border transition cursor-pointer ${
                    picked
                      ? 'border-[#26221C] bg-[#EFE9DC]'
                      : 'border-[#DFD7C6] bg-[#FCF9F2] hover:bg-[#EFE9DC]/55'
                  } ${disabled ? 'opacity-45 cursor-not-allowed' : ''}`}
                >
                  <img
                    src={flower.image}
                    alt={flower.name}
                    className="w-12 h-15 object-cover rounded-lg border border-[#DFD7C6] shrink-0 bg-[#F7F3E9]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-lg leading-tight text-[#26221C] font-medium">
                      {flower.name}
                    </div>
                    <div className="font-book italic text-[11px] text-[#8A8173]">
                      {flower.latin}
                    </div>
                    <div
                      className="text-[11px] mt-0.5 truncate"
                      style={{ color: flower.accent }}
                    >
                      {flower.meaning}
                    </div>
                  </div>
                  <span
                    className={`text-xs w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition ${
                      picked
                        ? 'bg-[#26221C] text-[#F7F3E9]'
                        : 'border border-[#DFD7C6] bg-[#F7F3E9] text-[#6E6659]'
                    }`}
                  >
                    {picked ? '✓' : '+'}
                  </span>
                </button>
              );
            })}

            {filteredStems.length === 0 && (
              <p className="font-book italic text-sm text-[#8A8173] text-center py-6">
                No blooms match “{stemQuery}”.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
