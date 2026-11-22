import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { Flower, FLOWERS } from '../data/flowers';

const MOOD_CHIPS = [
  'All',
  'Remembrance',
  'Longing',
  'Reconciliation',
  'Devotion',
  'Eloquence',
  'Consolation',
  'Secret',
];

interface CatalogViewProps {
  onOpenFlower: (id: string) => void;
}

export function CatalogView({ onOpenFlower }: CatalogViewProps) {
  const [query, setQuery] = useState('');
  const [activeMood, setActiveMood] = useState('All');

  const filtered = useMemo<Flower[]>(() => {
    const q = query.trim().toLowerCase();
    const mood = activeMood.toLowerCase();

    return FLOWERS.filter((f) => {
      const haystack = [
        f.name,
        f.latin,
        f.family,
        f.season,
        f.meaning,
        ...f.sentiments,
      ]
        .join(' ')
        .toLowerCase();

      const passQuery = !q || haystack.includes(q);
      const passMood = mood === 'all' || haystack.includes(mood);
      return passQuery && passMood;
    });
  }, [query, activeMood]);

  return (
    <section className="max-w-5xl mx-auto animate-soft-in">
      {/* Centered Editorial Search Header */}
      <div className="text-center max-w-xl mx-auto">
        <div className="text-[10.5px] tracking-[0.26em] uppercase text-[#6E6659]">
          Search by flower, Latin name, or sentiment
        </div>
        <h1 className="font-display text-4xl md:text-5xl text-[#26221C] mt-1 font-medium">
          The Catalog
        </h1>
        <p className="font-book italic text-base text-[#6E6659] mt-1.5">
          {FLOWERS.length} illustrated plates — look up a bloom you spotted, or a feeling you wish to send.
        </p>

        {/* Search Input */}
        <div className="relative mt-5">
          <Search className="w-4 h-4 text-[#8A8173] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value.trim()) setActiveMood('All');
            }}
            placeholder="Try 'apology', 'remembrance', 'eloquence', or 'Poppy'..."
            className="w-full pl-11 pr-10 py-3 rounded-full bg-[#FCF9F2] border border-[#DFD7C6] text-sm text-[#26221C] placeholder-[#948B7C] focus:outline-none focus:border-[#26221C] transition shadow-[0_2px_10px_rgba(38,34,28,0.03)]"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8A8173] hover:text-[#26221C] p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sentiment / Mood Pills */}
        <div className="mt-3.5 flex flex-wrap items-center justify-center gap-1.5">
          {MOOD_CHIPS.map((mood) => {
            const selected = activeMood === mood;
            return (
              <button
                key={mood}
                type="button"
                onClick={() => {
                  setActiveMood(mood);
                  setQuery('');
                }}
                className={`px-3 py-1 rounded-full text-xs border transition cursor-pointer ${
                  selected
                    ? 'bg-[#26221C] text-[#F7F3E9] border-[#26221C]'
                    : 'bg-[#FCF9F2] text-[#6E6659] border-[#DFD7C6] hover:text-[#26221C] hover:border-[#B9AE99]'
                }`}
              >
                {mood}
              </button>
            );
          })}
        </div>
      </div>

      {/* Responsive Botanical Gallery Grid (1 col mobile -> 2 col tablet -> 3 col desktop) */}
      {filtered.length > 0 ? (
        <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((flower) => (
            <button
              key={flower.id}
              type="button"
              onClick={() => onOpenFlower(flower.id)}
              className="group text-left rounded-2xl border border-[#DFD7C6] bg-[#FCF9F2] overflow-hidden flex flex-col hover:border-[#B9AE99] hover:shadow-[0_10px_30px_rgba(38,34,28,0.07)] transition duration-300 cursor-pointer"
            >
              <div className="w-full aspect-[4/5] bg-[#F7F3E9] border-b border-[#DFD7C6] overflow-hidden">
                <img
                  src={flower.image}
                  alt={flower.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between w-full">
                <div>
                  <div className="flex items-center justify-between text-[10px] tracking-[0.22em] uppercase text-[#8A8173]">
                    <span>{flower.plate}</span>
                    <span>{flower.season}</span>
                  </div>
                  <h2 className="font-display text-2xl text-[#26221C] mt-1 font-medium group-hover:underline decoration-[#C8BEA9] underline-offset-4">
                    {flower.name}
                  </h2>
                  <div className="font-book italic text-sm text-[#6E6659]">
                    {flower.latin}
                  </div>
                </div>
                <div
                  className="mt-3.5 pt-3 border-t border-[#EFE9DC] text-xs tracking-wide"
                  style={{ color: flower.accent }}
                >
                  {flower.meaning}
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="font-book italic text-lg text-[#6E6659]">
            No blooms in the compendium match “{query || activeMood}”.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setActiveMood('All');
            }}
            className="mt-3 text-xs underline text-[#6E6659] hover:text-[#26221C] cursor-pointer"
          >
            Show all {FLOWERS.length} plates
          </button>
        </div>
      )}
    </section>
  );
}
