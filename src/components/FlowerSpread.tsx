import { useState } from 'react';
import { ChevronLeft, Eye, EyeOff, RotateCw } from 'lucide-react';
import { Flower } from '../data/flowers';
import { formatEditorialDate } from '../utils/posyUrl';

interface FlowerSpreadProps {
  flower: Flower;
  isToday?: boolean;
  onBackToCatalog?: () => void;
  onCycleToday?: () => void;
  onComposeWithFlower: (id: string) => void;
  onSelectSibling?: (id: string) => void;
  prevFlower?: Flower;
  nextFlower?: Flower;
}

export function FlowerSpread({
  flower,
  isToday = false,
  onBackToCatalog,
  onCycleToday,
  onComposeWithFlower,
  onSelectSibling,
  prevFlower,
  nextFlower,
}: FlowerSpreadProps) {
  const [showPins, setShowPins] = useState(true);
  const [activePinIndex, setActivePinIndex] = useState<number | null>(0);

  const activePin =
    showPins && activePinIndex !== null ? flower.pins[activePinIndex] : null;

  return (
    <article className="max-w-5xl mx-auto animate-soft-in">
      {/* Quiet Folio Subheader */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 md:mb-8 border-b border-[#DFD7C6]">
        {isToday ? (
          <>
            <div>
              <div className="text-[10px] tracking-[0.26em] uppercase text-[#6E6659]">
                Bloom of the Day · {formatEditorialDate()}
              </div>
            </div>
            {onCycleToday && (
              <button
                type="button"
                onClick={() => {
                  setActivePinIndex(0);
                  onCycleToday();
                }}
                className="inline-flex items-center gap-1.5 text-xs px-3.5 py-1.5 rounded-full border border-[#DFD7C6] bg-[#FCF9F2] text-[#6E6659] hover:text-[#26221C] hover:border-[#B9AE99] transition cursor-pointer"
              >
                <span>Turn to another bloom</span>
                <RotateCw className="w-3.5 h-3.5" />
              </button>
            )}
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={onBackToCatalog}
              className="inline-flex items-center gap-1 text-xs text-[#6E6659] hover:text-[#26221C] transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Return to Catalog</span>
            </button>
            <span className="text-[10px] tracking-[0.26em] uppercase text-[#6E6659]">
              {flower.plate} · {flower.family}
            </span>
          </>
        )}
      </div>

      {/* Mobile Title (shown above plate on small screens for book-like mobile flow) */}
      <div className="text-center mb-4 md:hidden">
        <div className="text-[10px] tracking-[0.26em] uppercase text-[#6E6659]">
          {flower.plate}
        </div>
        <h1 className="font-display text-4xl text-[#26221C] mt-1 tracking-wide font-medium">
          {flower.name}
        </h1>
        <div className="font-book italic text-sm text-[#6E6659] mt-0.5">
          {flower.latin}
        </div>
        <div
          className="mt-3 inline-block px-3.5 py-1 border-y border-[#DFD7C6] text-[10.5px] tracking-[0.22em] uppercase"
          style={{ color: flower.accent }}
        >
          {flower.meaning}
        </div>
      </div>

      {/* Two-Page Open Botanical Book Spread on Desktop, Single Column on Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-7 md:gap-12 items-start">
        {/* Left Page: Botanical Watercolor Plate + Interactive Trait Pins */}
        <div className="md:col-span-6">
          <div className="relative rounded-2xl overflow-hidden border border-[#DFD7C6] bg-[#F7F3E9] shadow-[0_6px_28px_rgba(38,34,28,0.06)]">
            <img
              src={flower.image}
              alt={`Botanical plate of ${flower.name} (${flower.latin})`}
              className="w-full h-auto block select-none"
            />

            {showPins &&
              flower.pins.map((pin, idx) => {
                const isActive = activePinIndex === idx;
                return (
                  <button
                    key={pin.label}
                    type="button"
                    onClick={() =>
                      setActivePinIndex(isActive ? null : idx)
                    }
                    style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                    aria-label={`Inspect ${pin.label}`}
                    className={`botanical-pin w-7 h-7 rounded-full border text-xs font-book shadow-sm flex items-center justify-center cursor-pointer ${
                      isActive
                        ? 'botanical-pin-active'
                        : 'bg-[#F7F3E9]/92 text-[#26221C] border-[#8B8170]'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}

            <button
              type="button"
              onClick={() => setShowPins((v) => !v)}
              className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F7F3E9]/92 backdrop-blur-xs border border-[#DFD7C6] text-[10px] tracking-wider uppercase text-[#6E6659] hover:text-[#26221C] transition cursor-pointer"
            >
              {showPins ? (
                <>
                  <EyeOff className="w-3 h-3" />
                  <span>Hide traits</span>
                </>
              ) : (
                <>
                  <Eye className="w-3 h-3" />
                  <span>Show traits</span>
                </>
              )}
            </button>
          </div>

          {/* Quiet Marginal Field Note for the Selected Pin */}
          {activePin ? (
            <div className="mt-3 px-4 py-3 rounded-xl bg-[#FCF9F2] border border-[#DFD7C6] flex items-start gap-3 animate-soft-in">
              <span className="w-5 h-5 rounded-full bg-[#26221C] text-[#F7F3E9] text-[11px] font-book flex items-center justify-center shrink-0 mt-0.5">
                {(activePinIndex ?? 0) + 1}
              </span>
              <p className="text-[13px] leading-relaxed text-[#26221C]">
                <span className="font-book italic font-medium text-[14.5px]">
                  {activePin.label}.
                </span>{' '}
                <span className="text-[#5C5549]">{activePin.note}</span>
              </p>
            </div>
          ) : (
            showPins && (
              <p className="mt-2.5 text-center text-[11px] text-[#8A8173] font-book italic">
                Tap a numbered pin on the plate to note its recognizing traits.
              </p>
            )
          )}
        </div>

        {/* Right Page: Literary Prose, Epigraph & Quiet Actions */}
        <div className="md:col-span-6 md:pt-1">
          {/* Desktop Title Block */}
          <div className="hidden md:block">
            <div className="text-[10.5px] tracking-[0.26em] uppercase text-[#6E6659]">
              {flower.plate} · {flower.season}
            </div>
            <h1 className="font-display text-5xl text-[#26221C] mt-1 tracking-wide font-medium leading-tight">
              {flower.name}
            </h1>
            <div className="font-book italic text-base text-[#6E6659] mt-1">
              {flower.latin}
            </div>
            <div
              className="mt-4 py-2 border-y border-[#DFD7C6] text-[11px] tracking-[0.24em] uppercase"
              style={{ color: flower.accent }}
            >
              {flower.meaning}
            </div>
          </div>

          {/* Unhurried Flowing Prose with Drop Cap */}
          <div className="mt-2 md:mt-6 space-y-4 font-book text-[17px] leading-[1.78] text-[#26221C]">
            {flower.paragraphs.map((paragraph, idx) =>
              idx === 0 ? (
                <p key={idx}>
                  <span
                    className="float-left font-display text-[54px] leading-[0.8] pr-2.5 pt-1.5 font-normal"
                    style={{ color: flower.accent }}
                  >
                    {paragraph.charAt(0)}
                  </span>
                  {paragraph.slice(1)}
                </p>
              ) : (
                <p key={idx}>{paragraph}</p>
              )
            )}
          </div>

          {/* Literary Epigraph */}
          <blockquote className="mt-7 pt-5 border-t border-[#DFD7C6] text-center md:text-left">
            <p className="font-book italic text-[15.5px] leading-relaxed text-[#5C5549]">
              {flower.epigraph}
            </p>
            <footer className="text-[10.5px] tracking-[0.18em] uppercase text-[#8A8173] mt-2">
              — {flower.epigraphSource}
            </footer>
          </blockquote>

          {/* Quiet Footer Action & Page Turn */}
          <div className="mt-7 pt-5 border-t border-[#DFD7C6] flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => onComposeWithFlower(flower.id)}
              className="font-book italic text-[15px] text-[#5C5549] hover:text-[#26221C] underline underline-offset-4 decoration-[#C8BEA9] hover:decoration-[#26221C] transition cursor-pointer"
            >
              Compose a posy with {flower.name} →
            </button>

            {onSelectSibling && prevFlower && nextFlower && (
              <div className="flex items-center gap-4 text-xs text-[#6E6659]">
                <button
                  type="button"
                  onClick={() => {
                    setActivePinIndex(0);
                    onSelectSibling(prevFlower.id);
                  }}
                  className="hover:text-[#26221C] transition cursor-pointer"
                >
                  ‹ {prevFlower.name}
                </button>
                <span className="text-[#CFC6B4]">·</span>
                <button
                  type="button"
                  onClick={() => {
                    setActivePinIndex(0);
                    onSelectSibling(nextFlower.id);
                  }}
                  className="hover:text-[#26221C] transition cursor-pointer"
                >
                  {nextFlower.name} ›
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
