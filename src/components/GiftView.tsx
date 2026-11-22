import { useState } from 'react';
import { Check, Download } from 'lucide-react';
import { Flower, FLOWERS } from '../data/flowers';
import { PosyPayload } from '../utils/posyUrl';
import { downloadPosyCardImage } from '../utils/renderPosyCard';

interface GiftViewProps {
  payload: PosyPayload;
  isPreview?: boolean;
  onOpenFlower: (id: string) => void;
  onSendBack: () => void;
  onReturnToEditor?: () => void;
}

export function GiftView({
  payload,
  isPreview = false,
  onOpenFlower,
  onSendBack,
  onReturnToEditor,
}: GiftViewProps) {
  const [decoded, setDecoded] = useState(false);
  const [savingImage, setSavingImage] = useState(false);
  const [savedImage, setSavedImage] = useState(false);

  const flowers = payload.stems
    .map((id) => FLOWERS.find((f) => f.id === id))
    .filter((f): f is Flower => Boolean(f));

  const handleSaveImage = async () => {
    if (flowers.length === 0 || savingImage) return;
    setSavingImage(true);
    try {
      await downloadPosyCardImage({
        flowers,
        to: payload.to,
        from: payload.from,
        note: payload.note,
      });
      setSavedImage(true);
      setTimeout(() => setSavedImage(false), 2400);
    } finally {
      setSavingImage(false);
    }
  };

  return (
    <section className="max-w-2xl mx-auto text-center py-4 md:py-8 animate-soft-in">
      {isPreview && (
        <div className="inline-block px-3.5 py-1 rounded-full bg-[#EFE9DC] border border-[#DFD7C6] text-[10px] tracking-[0.22em] uppercase text-[#6E6659] mb-5">
          Recipient Preview — Shared Posy Link
        </div>
      )}

      <div className="bg-[#FCF9F2] rounded-2xl border border-[#DFD7C6] p-6 sm:p-10 md:p-12 shadow-[0_14px_40px_rgba(38,34,28,0.08)]">
        <div className="text-[10.5px] tracking-[0.28em] uppercase text-[#6E6659]">
          {payload.to ? `A Posy for ${payload.to}` : 'A Quiet Posy'}
        </div>

        <div className="flex flex-wrap items-start justify-center gap-4 sm:gap-6 my-7">
          {flowers.map((flower) => (
            <button
              key={flower.id}
              type="button"
              onClick={() => onOpenFlower(flower.id)}
              title={`Read the story of ${flower.name}`}
              className="group flex flex-col items-center max-w-[132px] cursor-pointer"
            >
              <img
                src={flower.image}
                alt={flower.name}
                className="w-28 h-36 sm:w-32 sm:h-40 object-cover rounded-xl border border-[#DFD7C6] bg-[#F7F3E9] group-hover:-translate-y-1 transition duration-300 shadow-xs"
              />
              <span className="font-display text-lg text-[#26221C] mt-2.5 group-hover:underline underline-offset-4">
                {flower.name}
              </span>
              {decoded ? (
                <span
                  className="text-[11px] mt-0.5 leading-snug"
                  style={{ color: flower.accent }}
                >
                  {flower.meaning}
                </span>
              ) : (
                <span className="font-book italic text-xs text-[#8A8173]">
                  {flower.latin}
                </span>
              )}
            </button>
          ))}
        </div>

        {payload.note && (
          <p className="font-book italic text-lg sm:text-[19px] leading-relaxed text-[#26221C] max-w-md mx-auto">
            “{payload.note}”
          </p>
        )}

        {payload.from && (
          <div className="font-book italic text-sm text-[#6E6659] mt-3.5">
            — {payload.from}
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-[#EFE9DC] flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setDecoded((v) => !v)}
            className="px-5 py-2.5 rounded-full border border-[#CFC6B4] bg-[#F7F3E9] text-xs text-[#26221C] hover:bg-[#EFE9DC] transition cursor-pointer"
          >
            {decoded ? 'Hide Victorian meanings' : 'Decode the flowers'}
          </button>
          <button
            type="button"
            disabled={savingImage}
            onClick={handleSaveImage}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#CFC6B4] bg-[#FCF9F2] text-xs text-[#26221C] hover:bg-[#EFE9DC] disabled:opacity-40 transition cursor-pointer"
          >
            {savedImage ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#4E6B47]" />
                <span>Saved</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>{savingImage ? 'Saving...' : 'Save card'}</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onSendBack}
            className="px-5 py-2.5 rounded-full bg-[#26221C] text-[#F7F3E9] text-xs hover:bg-[#3A342B] transition cursor-pointer"
          >
            Send a posy back
          </button>
        </div>

        <p className="mt-4 text-[11px] text-[#8A8173] font-book italic">
          Tap any bloom above to read its plate and story in Anthos.
        </p>
      </div>

      {isPreview && onReturnToEditor && (
        <button
          type="button"
          onClick={onReturnToEditor}
          className="mt-5 text-xs underline text-[#6E6659] hover:text-[#26221C] cursor-pointer"
        >
          ‹ Return to Posy Studio
        </button>
      )}
    </section>
  );
}
