import { Coffee, ExternalLink, X } from 'lucide-react';

const KOFI_URL = 'https://ko-fi.com/jehkey';

interface CoffeeModalProps {
  open: boolean;
  onClose: () => void;
}

export function CoffeeModal({ open, onClose }: CoffeeModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#26221C]/45 backdrop-blur-[2px] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-[#FCF9F2] text-[#26221C] max-w-md w-full rounded-2xl border border-[#DFD7C6] p-7 text-center shadow-2xl animate-soft-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-[#8A8173] hover:text-[#26221C] p-1 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-10 h-10 rounded-full bg-[#EFE9DC] border border-[#DFD7C6] flex items-center justify-center mx-auto text-[#5C5549]">
          <Coffee className="w-4 h-4" />
        </div>

        <div className="text-[10px] tracking-[0.26em] uppercase text-[#6E6659] mt-3">
          Colophon
        </div>
        <h2 className="font-display text-3xl mt-1 font-medium">
          Keep the garden growing
        </h2>
        <p className="font-book text-[15.5px] leading-relaxed text-[#5C5549] mt-3">
          Anthos is an independent botanical miscellany—free to read, free to share with someone you love. If a bloom brightened your afternoon, you can leave a small kindness toward new illustrated plates.
        </p>

        <a
          href={KOFI_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-full bg-[#26221C] text-[#F7F3E9] text-sm tracking-wide hover:bg-[#3A342B] transition"
        >
          <Coffee className="w-4 h-4" />
          <span>Support Anthos on Ko-fi</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-80" />
        </a>

        <p className="mt-3 text-[11px] font-book italic text-[#8A8173]">
          Opens ko-fi.com/jehkey in a new tab · No account required
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-4 text-xs text-[#6E6659] underline underline-offset-4 hover:text-[#26221C] cursor-pointer"
        >
          Return to Anthos
        </button>
      </div>
    </div>
  );
}
