import { useEffect, useState } from 'react';
import { BookOpen, Coffee, Flower2, Scissors, Sun } from 'lucide-react';
import { FLOWERS } from './data/flowers';
import { FlowerSpread } from './components/FlowerSpread';
import { CatalogView } from './components/CatalogView';
import { PosyStudio } from './components/PosyStudio';
import { GiftView } from './components/GiftView';
import { ArrangeView } from './components/ArrangeView';
import { CoffeeModal } from './components/CoffeeModal';
import {
  decodePosyFromSearch,
  getBloomOfTheDayIndex,
  PosyPayload,
} from './utils/posyUrl';

type ViewMode = 'today' | 'catalog' | 'detail' | 'posy' | 'arrange' | 'gift';

export default function App() {
  const initialGift = decodePosyFromSearch(window.location.search);

  const [view, setView] = useState<ViewMode>(initialGift ? 'gift' : 'today');
  const [todayIndex, setTodayIndex] = useState<number>(() =>
    getBloomOfTheDayIndex()
  );
  const [detailId, setDetailId] = useState<string>(FLOWERS[0].id);
  const [posyInitialStems, setPosyInitialStems] = useState<string[]>([
    'anemone',
    'iris',
  ]);
  const [posyKey, setPosyKey] = useState<number>(0);
  const [arrangeInitialStems, setArrangeInitialStems] = useState<string[]>([]);
  const [arrangeKey, setArrangeKey] = useState<number>(0);
  const [giftPayload, setGiftPayload] = useState<PosyPayload | null>(
    initialGift
  );
  const [isGiftPreview, setIsGiftPreview] = useState<boolean>(false);
  const [coffeeOpen, setCoffeeOpen] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view, detailId]);

  const navigateTop = (next: 'today' | 'catalog' | 'posy' | 'arrange') => {
    if (window.location.search) {
      window.history.replaceState({}, '', window.location.pathname);
    }
    setIsGiftPreview(false);
    setView(next);
  };

  const openFlowerDetail = (id: string) => {
    setDetailId(id);
    setView('detail');
  };

  const handleComposeWithFlower = (id: string) => {
    setPosyInitialStems([id]);
    setPosyKey((k) => k + 1);
    setView('posy');
  };

  const handleComposeWithStems = (ids: string[]) => {
    setPosyInitialStems(ids.slice(0, 3));
    setPosyKey((k) => k + 1);
    setView('posy');
  };

  const handleArrangeWithFlower = (id: string) => {
    setArrangeInitialStems([id]);
    setArrangeKey((k) => k + 1);
    setView('arrange');
  };

  const handlePreviewGift = (payload: PosyPayload) => {
    setGiftPayload(payload);
    setIsGiftPreview(true);
    setView('gift');
  };

  const activeDetailIndex = FLOWERS.findIndex((f) => f.id === detailId);
  const detailFlower =
    FLOWERS[activeDetailIndex >= 0 ? activeDetailIndex : 0];
  const prevFlower =
    FLOWERS[
      (activeDetailIndex - 1 + FLOWERS.length) % FLOWERS.length
    ];
  const nextFlower = FLOWERS[(activeDetailIndex + 1) % FLOWERS.length];

  const isNavActive = (tab: 'today' | 'catalog' | 'posy' | 'arrange') => {
    if (tab === 'today') return view === 'today';
    if (tab === 'catalog') return view === 'catalog' || view === 'detail';
    if (tab === 'arrange') return view === 'arrange';
    return view === 'posy' || view === 'gift';
  };

  return (
    <div className="min-h-dvh flex flex-col bg-[#F7F3E9] text-[#26221C]">
      {/* Quiet Editorial Header */}
      <header className="sticky top-0 z-30 bg-[#F7F3E9]/92 backdrop-blur-md border-b border-[#DFD7C6] pt-[env(safe-area-inset-top)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigateTop('today')}
            className="text-left group cursor-pointer"
          >
            <div className="font-display text-2xl sm:text-[28px] tracking-wide text-[#26221C] leading-none font-medium">
              Anthos
            </div>
            <div className="text-[9px] tracking-[0.26em] uppercase text-[#6E6659] mt-1">
              A Botanical Miscellany
            </div>
          </button>

          {/* Desktop / Tablet Primary Navigation */}
          <nav
            aria-label="Primary"
            className="hidden sm:flex items-center gap-8 text-xs tracking-[0.2em] uppercase"
          >
            {(
              [
                { id: 'today', label: 'Today' },
                { id: 'catalog', label: 'Catalog' },
                { id: 'arrange', label: 'Arrange' },
                { id: 'posy', label: 'Posy' },
              ] as const
            ).map((item) => {
              const active = isNavActive(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigateTop(item.id)}
                  className={`pb-1 border-b-2 transition cursor-pointer ${
                    active
                      ? 'border-[#26221C] text-[#26221C] font-medium'
                      : 'border-transparent text-[#6E6659] hover:text-[#26221C]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Quiet Colophon Coffee Trigger */}
          <button
            type="button"
            onClick={() => setCoffeeOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs px-3 sm:px-3.5 py-1.5 rounded-full border border-[#DFD7C6] bg-[#FCF9F2] text-[#6E6659] hover:text-[#26221C] hover:border-[#B9AE99] transition cursor-pointer"
          >
            <Coffee className="w-3.5 h-3.5" />
            <span className="hidden xs:inline sm:inline">Treat me to coffee</span>
            <span className="sm:hidden">Support</span>
          </button>
        </div>
      </header>

      {/* Main Content Area (extra bottom padding on mobile for bottom tab bar) */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-5 sm:px-8 pt-6 sm:pt-10 pb-[calc(6rem+env(safe-area-inset-bottom))] sm:pb-14">
        {view === 'today' && (
          <FlowerSpread
            key={`today-${FLOWERS[todayIndex].id}`}
            flower={FLOWERS[todayIndex]}
            isToday
            onCycleToday={() =>
              setTodayIndex((idx) => (idx + 1) % FLOWERS.length)
            }
            onComposeWithFlower={handleComposeWithFlower}
            onArrangeWithFlower={handleArrangeWithFlower}
          />
        )}

        {view === 'catalog' && (
          <CatalogView onOpenFlower={openFlowerDetail} />
        )}

        {view === 'detail' && (
          <FlowerSpread
            key={`detail-${detailFlower.id}`}
            flower={detailFlower}
            onBackToCatalog={() => setView('catalog')}
            onComposeWithFlower={handleComposeWithFlower}
            onArrangeWithFlower={handleArrangeWithFlower}
            onSelectSibling={openFlowerDetail}
            prevFlower={prevFlower}
            nextFlower={nextFlower}
          />
        )}

        {view === 'arrange' && (
          <ArrangeView
            key={arrangeKey}
            initialFlowerIds={arrangeInitialStems}
            onOpenFlower={openFlowerDetail}
            onComposePosyFromStems={handleComposeWithStems}
          />
        )}

        {view === 'posy' && (
          <PosyStudio
            key={posyKey}
            initialStems={posyInitialStems}
            onPreviewGift={handlePreviewGift}
          />
        )}

        {view === 'gift' && giftPayload && (
          <GiftView
            payload={giftPayload}
            isPreview={isGiftPreview}
            onOpenFlower={openFlowerDetail}
            onSendBack={() => {
              setPosyInitialStems(['anemone']);
              setPosyKey((k) => k + 1);
              navigateTop('posy');
            }}
            onReturnToEditor={
              isGiftPreview ? () => setView('posy') : undefined
            }
          />
        )}
      </main>

      {/* Quiet Book Colophon Footer (Desktop/Tablet) */}
      <footer className="hidden sm:block border-t border-[#DFD7C6] bg-[#F7F3E9]">
        <div className="max-w-6xl mx-auto px-8 py-5 flex flex-wrap items-center justify-between gap-3 text-xs text-[#6E6659]">
          <span className="font-book italic text-sm">
            Anthos — flowers, their Latin names, and the quiet things they say.
          </span>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => navigateTop('catalog')}
              className="hover:text-[#26221C] transition cursor-pointer"
            >
              {FLOWERS.length} Plates
            </button>
            <button
              type="button"
              onClick={() => setCoffeeOpen(true)}
              className="underline underline-offset-4 hover:text-[#26221C] transition cursor-pointer"
            >
              Support the garden
            </button>
          </div>
        </div>
      </footer>

      {/* Reactive Mobile Bottom Navigation Bar (visible on phone widths) */}
      <nav
        aria-label="Mobile navigation"
        className="sm:hidden fixed bottom-0 inset-x-0 z-30 bg-[#FCF9F2]/95 backdrop-blur-md border-t border-[#DFD7C6] px-4 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]"
      >
        <div className="grid grid-cols-4 gap-1 text-center">
          <button
            type="button"
            onClick={() => navigateTop('today')}
            className={`flex flex-col items-center py-1 rounded-xl transition cursor-pointer ${
              isNavActive('today')
                ? 'text-[#26221C] font-semibold'
                : 'text-[#6E6659]'
            }`}
          >
            <Sun className="w-5 h-5 mb-0.5" strokeWidth={1.6} />
            <span className="text-[10px] tracking-[0.16em] uppercase">
              Today
            </span>
          </button>

          <button
            type="button"
            onClick={() => navigateTop('catalog')}
            className={`flex flex-col items-center py-1 rounded-xl transition cursor-pointer ${
              isNavActive('catalog')
                ? 'text-[#26221C] font-semibold'
                : 'text-[#6E6659]'
            }`}
          >
            <BookOpen className="w-5 h-5 mb-0.5" strokeWidth={1.6} />
            <span className="text-[10px] tracking-[0.16em] uppercase">
              Catalog
            </span>
          </button>

          <button
            type="button"
            onClick={() => navigateTop('arrange')}
            className={`flex flex-col items-center py-1 rounded-xl transition cursor-pointer ${
              isNavActive('arrange')
                ? 'text-[#26221C] font-semibold'
                : 'text-[#6E6659]'
            }`}
          >
            <Scissors className="w-5 h-5 mb-0.5" strokeWidth={1.6} />
            <span className="text-[10px] tracking-[0.16em] uppercase">
              Arrange
            </span>
          </button>

          <button
            type="button"
            onClick={() => navigateTop('posy')}
            className={`flex flex-col items-center py-1 rounded-xl transition cursor-pointer ${
              isNavActive('posy')
                ? 'text-[#26221C] font-semibold'
                : 'text-[#6E6659]'
            }`}
          >
            <Flower2 className="w-5 h-5 mb-0.5" strokeWidth={1.6} />
            <span className="text-[10px] tracking-[0.16em] uppercase">
              Posy
            </span>
          </button>
        </div>
      </nav>

      <CoffeeModal open={coffeeOpen} onClose={() => setCoffeeOpen(false)} />
    </div>
  );
}
