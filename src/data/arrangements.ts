export type ArrangementRole = 'focal' | 'line' | 'filler' | 'branch';

export type ArrangementIntent = 'vase' | 'bouquet';

export type ColorMood = 'analogous' | 'monochromatic' | 'complementary';

export type TonalValue = 'light' | 'mid' | 'deep';

export type StyleWorld = 'garden' | 'meadow' | 'architectural' | 'tropical';

export type ChemistryTrait =
  | 'toxic-sap'
  | 'ethylene-producer'
  | 'ethylene-sensitive';

export type TransitRating = 'sturdy' | 'moderate' | 'delicate';

export type AvailabilityTier =
  | 'Year-round staple'
  | 'Seasonal market favorite'
  | 'Specialty florist cut';

export type WaterDepth = 'shallow' | 'medium' | 'deep';

export type StemClass = 'herbaceous' | 'hollow' | 'woody' | 'bulbous';

export type MarketSeason = 'spring' | 'summer' | 'autumn' | 'winter' | 'year-round';

export interface FloristProfile {
  flowerId: string;
  role: ArrangementRole;
  availability: AvailabilityTier;
  stemClass: StemClass;
  vaseLife: string;
  vaseLifeDays: [number, number];
  waterDepth: WaterDepth;
  waterNote: string;
  /** Putnam Color Theory attributes */
  colorHue: number | null; // 0-360° wheel; null for botanical whites/greens
  colorFamily: string;
  tonalValue: TonalValue;
  isNeutral: boolean;
  swatchHex: string;
  /** Scale & aesthetic world */
  styleWorld: StyleWorld;
  /** Spry / Chezar chemical traits */
  chemistry?: ChemistryTrait;
  /** Hand-tied gift bouquet durability */
  transitRating: TransitRating;
  giftNote: string;
  /** Practical florist guidance */
  buyingTip: string;
  conditioningTip: string;
  placementNote: string;
  idealStems: string;
  heightRatio: number;
  motif: 'peony' | 'dome' | 'spike' | 'cloud' | 'trumpet' | 'star' | 'branch' | 'cup';
  marketSeasons: MarketSeason[];
}

export interface VesselOption {
  id: 'pitcher' | 'cylinder' | 'compote' | 'bud-trio';
  name: string;
  subtitle: string;
  heightInches: number;
  mechanics: string;
  mechanicsDetail: string;
  idealHeightRule: string;
}

export interface LiteratureSource {
  author: string;
  title: string;
  year: string;
  contribution: string;
}

export const LITERATURE_SOURCES: LiteratureSource[] = [
  {
    author: 'Darroch & Michael Putnam',
    title: 'Flower Color Theory',
    year: '2021',
    contribution:
      'Color-wheel pairing (monochromatic, analogous, 80/20 complementary), color bars, and the Squint Test for tonal light-dark contrast.',
  },
  {
    author: 'Erin Benzakein (Floret Farm)',
    title: 'A Year in Flowers',
    year: '2020',
    contribution:
      'The four-part seasonal bouquet formula: foliage/branch backbone, focal stars, supporting blooms, and airy finishing accents.',
  },
  {
    author: 'Constance Spry',
    title: 'Flower Decoration & How to Do the Flowers',
    year: '1934 / 1953',
    contribution:
      'Foam-free mechanics (chicken wire and branch grids), deep pre-hydration, stripping submerged leaves, and honoring natural stem curves.',
  },
  {
    author: 'Ariella Chezar',
    title: 'The Flower Workshop',
    year: '2016',
    contribution:
      'Seasonal market pairings, pin-frog (kenzan) & spiral hand-tied technique, woody stem splitting, and botanical chemistry care.',
  },
];

export const COLOR_MOOD_META: Record<
  ColorMood,
  { label: string; subtitle: string; rule: string }
> = {
  analogous: {
    label: 'Soft Analogous',
    subtitle: 'Neighbors on the color wheel',
    rule: 'Putnam’s most forgiving, organic harmony—colors transition smoothly like a garden border (e.g., blush → rose → violet).',
  },
  monochromatic: {
    label: 'Tonal Monochrome',
    subtitle: 'One hue from pale to deep',
    rule: 'Never clashes; relies on contrasting flower shapes and pushing light-to-dark value so the bouquet passes the Squint Test.',
  },
  complementary: {
    label: 'Bold 80/20 Contrast',
    subtitle: 'Opposite hues with hierarchy',
    rule: 'Opposite colors spark high energy—keep one hue dominant (~80%) and use the opposite as a crisp 20% accent so it never feels chaotic.',
  },
};

export const ROLE_META: Record<
  ArrangementRole,
  {
    label: string;
    shortLabel: string;
    floretTerm: string;
    description: string;
    placementOrder: number;
  }
> = {
  branch: {
    label: 'Foliage & Branch',
    shortLabel: 'Foliage',
    floretTerm: 'Foundation Backbone',
    description:
      'Sets the outer silhouette, hides vase mechanics, and forms a natural lattice for softer stems (Floret / Spry).',
    placementOrder: 1,
  },
  line: {
    label: 'Line & Height',
    shortLabel: 'Line',
    floretTerm: 'Spire & Lift',
    description:
      'Creates vertical reach, movement, and the 1.5× proportion arc so the arrangement breathes.',
    placementOrder: 2,
  },
  focal: {
    label: 'Focal Bloom',
    shortLabel: 'Focal',
    floretTerm: 'The Star',
    description:
      'Anchors the eye near the rim or bouquet heart with generous, rounded petal weight.',
    placementOrder: 3,
  },
  filler: {
    label: 'Airy Accent',
    shortLabel: 'Airy',
    floretTerm: 'Finishing Magic',
    description:
      'Delicate sprays that bridge colors, soften edges, and let light dance between fuller heads.',
    placementOrder: 4,
  },
};

export const STYLE_WORLD_LABELS: Record<StyleWorld, string> = {
  garden: 'Garden / Cottage',
  meadow: 'Airy Meadow',
  architectural: 'Sculptural / Architectural',
  tropical: 'Tropical Statement',
};

export const VESSELS: VesselOption[] = [
  {
    id: 'pitcher',
    name: 'Stoneware Pitcher',
    subtitle: 'Classic everyday gathering',
    heightInches: 7,
    mechanics: 'Tape grid or branch lattice',
    mechanicsDetail:
      'Lay three strips of clear florist tape in a loose 3×3 grid across the rim (or crisscross woody sprigs first) so stems lean naturally without foam.',
    idealHeightRule: '1.5× vessel height (≈ 10–11 in above table)',
  },
  {
    id: 'cylinder',
    name: 'Tall Glass Cylinder',
    subtitle: 'Clean vertical poise',
    heightInches: 10,
    mechanics: '45° spiral stem lock',
    mechanicsDetail:
      'Cross every stem at the same slant in your hand so their lower stalks lock like an inverted tripod inside the glass.',
    idealHeightRule: '1.5×–1.8× vessel height (≈ 15–18 in)',
  },
  {
    id: 'compote',
    name: 'Low Bowl & Kenzan',
    subtitle: 'Centerpiece & Ikebana',
    heightInches: 4,
    mechanics: 'Brass pin frog (kenzan) or chicken-wire pillow',
    mechanicsDetail:
      'Seat a heavy brass kenzan slightly off-center (or tuck a loose ball of chicken wire, as Constance Spry championed) for airy asymmetry and sightlines across a dining table.',
    idealHeightRule: 'Low dining height (< 10 in) or sweeping branch arc',
  },
  {
    id: 'bud-trio',
    name: 'Bud Vase Trio',
    subtitle: 'Single-stem study / split pairing',
    heightInches: 5,
    mechanics: 'Narrow bottlenecks (no grid needed)',
    mechanicsDetail:
      'Ideal for stretching one bunch—or for keeping two incompatible blooms side by side on the same table without sharing water or crowding one neck.',
    idealHeightRule: 'Staggered heights: 9 in · 7 in · 5.5 in',
  },
];

/**
 * 22 commonly marketed florist & flower-market cut flowers present in Anthos.
 */
export const MARKET_FLORIST_PROFILES: FloristProfile[] = [
  {
    flowerId: 'peony',
    role: 'focal',
    availability: 'Seasonal market favorite',
    stemClass: 'herbaceous',
    vaseLife: '5–7 days',
    vaseLifeDays: [5, 7],
    waterDepth: 'medium',
    waterNote: '4–5 in cool water; refresh every two days',
    colorHue: 345,
    colorFamily: 'Blush Rose',
    tonalValue: 'light',
    isNeutral: false,
    swatchHex: '#D88C9A',
    styleWorld: 'garden',
    transitRating: 'sturdy',
    giftNote:
      'One of the finest gift blooms when bought in soft "marshmallow" bud stage—they travel effortlessly and unfurl dramatically over 3–4 days at the recipient’s home.',
    buyingTip:
      'Press the bud gently—buy them feeling like a soft marshmallow with a blush of petal showing, never rock-hard green.',
    conditioningTip:
      'Strip all submerged foliage and cut 1 in at 45°. If buds stay sealed with sticky nectar, gently rinse sepals in lukewarm water.',
    placementNote:
      'Seat peonies low and close to the collar so their generous ruffled heads rest naturally against the rim.',
    idealStems: '3–5 stems',
    heightRatio: 1.25,
    motif: 'peony',
    marketSeasons: ['spring'],
  },
  {
    flowerId: 'dahlia',
    role: 'focal',
    availability: 'Seasonal market favorite',
    stemClass: 'hollow',
    vaseLife: '4–6 days',
    vaseLifeDays: [4, 6],
    waterDepth: 'medium',
    waterNote: '3–4 in warm-start water, then cool daily refills',
    colorHue: 348,
    colorFamily: 'Deep Burgundy',
    tonalValue: 'deep',
    isNeutral: false,
    swatchHex: '#8E2840',
    styleWorld: 'garden',
    transitRating: 'delicate',
    giftNote:
      'Heavy, petal-packed heads bruise easily in warm transit—hydrate deeply first, keep the bouquet cool, and tuck dahlias slightly recessed inside sturdier stems.',
    buyingTip:
      'Check the back petals—they should feel crisp and firm, never papery or translucent.',
    conditioningTip:
      'Dip freshly cut hollow ends in hot (not boiling) water for 30 seconds to clear air locks, then plunge into cool water.',
    placementNote:
      'Angle dahlia faces outward at varied depths so their deep velvety value anchors lighter blooms.',
    idealStems: '3–5 stems',
    heightRatio: 1.28,
    motif: 'peony',
    marketSeasons: ['summer', 'autumn'],
  },
  {
    flowerId: 'anemone',
    role: 'focal',
    availability: 'Seasonal market favorite',
    stemClass: 'hollow',
    vaseLife: '5–7 days',
    vaseLifeDays: [5, 7],
    waterDepth: 'shallow',
    waterNote: '2–3 in cold water; hollow stalks soften in deep water',
    colorHue: 354,
    colorFamily: 'Crimson & Ink',
    tonalValue: 'deep',
    isNeutral: false,
    swatchHex: '#9C2B36',
    styleWorld: 'garden',
    transitRating: 'moderate',
    giftNote:
      'Buy tightly cupped buds with velvety dark centers; stems stay flexible in a damp paper wrap for 1–2 hours and keep growing toward light once placed in water.',
    buyingTip:
      'Choose stems whose dark button centers look velvety and tight, with petals barely parted.',
    conditioningTip:
      'Cut in cold water and keep out of direct sun—anemones are phototropic and curve gracefully toward windows.',
    placementNote:
      'Let their dark centers punctuate pale petals near the heart—they instantly pass Putnam’s Squint Test by adding crisp dark value.',
    idealStems: '5–7 stems',
    heightRatio: 1.32,
    motif: 'cup',
    marketSeasons: ['winter', 'spring'],
  },
  {
    flowerId: 'carnation',
    role: 'focal',
    availability: 'Year-round staple',
    stemClass: 'herbaceous',
    vaseLife: '10–14 days',
    vaseLifeDays: [10, 14],
    waterDepth: 'medium',
    waterNote: '4 in cool water; remarkably long-lived',
    colorHue: 342,
    colorFamily: 'Clove Rose',
    tonalValue: 'mid',
    isNeutral: false,
    swatchHex: '#B23E55',
    styleWorld: 'garden',
    chemistry: 'ethylene-producer',
    transitRating: 'sturdy',
    giftNote:
      'Exceptionally hardy traveler that lasts two weeks—cluster 5–7 together in a spiral so they read like lush heirloom garden blooms. Avoid pairing with ethylene-sensitive Delphinium or Freesia.',
    buyingTip:
      'Look for plump clove-scented heads with firm green calyxes that haven’t split down the side.',
    conditioningTip:
      'Always cut between the swollen stem joints—never right through a node, which restricts water uptake.',
    placementNote:
      'Mass carnations together in a tight tonal cluster rather than dotting them singly around the bouquet.',
    idealStems: '5–9 stems',
    heightRatio: 1.22,
    motif: 'peony',
    marketSeasons: ['year-round'],
  },
  {
    flowerId: 'chrysanthemum',
    role: 'focal',
    availability: 'Year-round staple',
    stemClass: 'woody',
    vaseLife: '12–18 days',
    vaseLifeDays: [12, 18],
    waterDepth: 'medium',
    waterNote: '4–5 in fresh water; strip every leaf below the rim',
    colorHue: 24,
    colorFamily: 'Warm Terracotta',
    tonalValue: 'mid',
    isNeutral: false,
    swatchHex: '#BD6332',
    styleWorld: 'garden',
    transitRating: 'sturdy',
    giftNote:
      'A champion gift flower that handles hours out of water and keeps looking crisp for two weeks. Strip lower foliage completely before wrapping.',
    buyingTip:
      'Choose heirloom disbud or bronze spider mums with crisp green undersides on leaves and tight center discs.',
    conditioningTip:
      'Chrysanthemum leaves foul water rapidly—strip the bottom two-thirds completely and recut every 3 days.',
    placementNote:
      'Anchor autumn or warm-toned gatherings low at the collar; their longevity carries the bouquet well past week one.',
    idealStems: '3–5 stems',
    heightRatio: 1.26,
    motif: 'peony',
    marketSeasons: ['year-round'],
  },
  {
    flowerId: 'amaryllis',
    role: 'focal',
    availability: 'Seasonal market favorite',
    stemClass: 'hollow',
    vaseLife: '7–12 days',
    vaseLifeDays: [7, 12],
    waterDepth: 'shallow',
    waterNote: '2–3 in cool water; deep water makes hollow stems curl',
    colorHue: 358,
    colorFamily: 'Scarlet Red',
    tonalValue: 'deep',
    isNeutral: false,
    swatchHex: '#A82C33',
    styleWorld: 'architectural',
    transitRating: 'moderate',
    giftNote:
      'Heavy hollow stems should be taped at the bottom ½ inch and carried upright in a tall wrap—wonderful winter gift when buds are still closed and colored.',
    buyingTip:
      'Buy stems with tight, colored buds just emerging from the papery sheath.',
    conditioningTip:
      'Wrap clear florist tape tightly around the bottom ½ inch of the hollow stem to stop it splitting and curling upward.',
    placementNote:
      'Commanding architectural presence—even 2–3 stems with minimal winter branches feel gallery-ready.',
    idealStems: '2–3 stems',
    heightRatio: 1.55,
    motif: 'trumpet',
    marketSeasons: ['winter'],
  },
  {
    flowerId: 'calla-lily',
    role: 'focal',
    availability: 'Year-round staple',
    stemClass: 'bulbous',
    vaseLife: '7–10 days',
    vaseLifeDays: [7, 10],
    waterDepth: 'shallow',
    waterNote: '2–3 in cold water; fleshy stalks soften if submerged deeply',
    colorHue: null,
    colorFamily: 'Ivory Neutral',
    tonalValue: 'light',
    isNeutral: true,
    swatchHex: '#EFECE2',
    styleWorld: 'architectural',
    transitRating: 'sturdy',
    giftNote:
      'Sleek, modern hand-tied staple—tie with a wide satin ribbon slightly higher up the smooth stalks so the sculpted ivory flutes stay aligned.',
    buyingTip:
      'Look for unbruised ivory spathes with bright yellow spadices and crisp, dry-feeling cut ends.',
    conditioningTip:
      'Slice cleanly with a sharp knife rather than crushing with blunt scissors; refresh shallow water every two days.',
    placementNote:
      'Warm a stalk gently in your palms for 20 seconds if you want to coax a graceful sculptural curve.',
    idealStems: '3–7 stems',
    heightRatio: 1.48,
    motif: 'trumpet',
    marketSeasons: ['year-round'],
  },
  {
    flowerId: 'delphinium',
    role: 'line',
    availability: 'Seasonal market favorite',
    stemClass: 'hollow',
    vaseLife: '5–8 days',
    vaseLifeDays: [5, 8],
    waterDepth: 'medium',
    waterNote: '4–5 in cool water with flower food',
    colorHue: 222,
    colorFamily: 'Cobalt Blue',
    tonalValue: 'mid',
    isNeutral: false,
    swatchHex: '#4362A3',
    styleWorld: 'garden',
    chemistry: 'ethylene-sensitive',
    transitRating: 'moderate',
    giftNote:
      'Choose spires with only the bottom third open; wrap gently in tall kraft paper and advise the recipient to keep the vase away from fruit bowls (ethylene shatters the florets).',
    buyingTip:
      'Select spires where the lower third is open and upper buds are still tightly closed and colored.',
    conditioningTip:
      'Highly ethylene-sensitive—never store near ripening fruit or standard carnations. Trim under water if hollow stems droop.',
    placementNote:
      'Set delphinium first at 1.5×–1.8× vessel height to lift rounded focal blooms upward.',
    idealStems: '3–5 stems',
    heightRatio: 1.78,
    motif: 'spike',
    marketSeasons: ['spring', 'summer'],
  },
  {
    flowerId: 'gladiolus',
    role: 'line',
    availability: 'Seasonal market favorite',
    stemClass: 'bulbous',
    vaseLife: '7–10 days',
    vaseLifeDays: [7, 10],
    waterDepth: 'deep',
    waterNote: '5–6 in cool water; heavy drinking spikes',
    colorHue: 338,
    colorFamily: 'Rose Coral',
    tonalValue: 'mid',
    isNeutral: false,
    swatchHex: '#B64667',
    styleWorld: 'architectural',
    transitRating: 'sturdy',
    giftNote:
      'Travels remarkably well when only 2–3 bottom florets are open—tall sword-like spikes make an impressive arm-carried presentation bouquet.',
    buyingTip:
      'Pick spikes with only the bottom 2–3 florets open so the spike climbs open all week.',
    conditioningTip:
      'Pinch off the topmost 1–2 tiny green buds—this redirects energy into opening every middle blossom.',
    placementNote:
      'Angle at 15–25° in a tall cylinder or off-center kenzan so the strong sword silhouette breathes.',
    idealStems: '3–5 stems',
    heightRatio: 1.82,
    motif: 'spike',
    marketSeasons: ['summer', 'autumn'],
  },
  {
    flowerId: 'allium',
    role: 'line',
    availability: 'Specialty florist cut',
    stemClass: 'bulbous',
    vaseLife: '10–14 days',
    vaseLifeDays: [10, 14],
    waterDepth: 'shallow',
    waterNote: '2–3 in cold water changed frequently to prevent onion odor',
    colorHue: 274,
    colorFamily: 'Lilac Violet',
    tonalValue: 'mid',
    isNeutral: false,
    swatchHex: '#735494',
    styleWorld: 'architectural',
    transitRating: 'moderate',
    giftNote:
      'Rinse freshly cut stem ends under cold running water before wrapping so the faint onion scent doesn’t transfer to the kraft paper.',
    buyingTip:
      'Choose spheres that are 50–70% open atop stiff, straight stalks.',
    conditioningTip:
      'Rinse freshly cut ends under cold water for 10 seconds to neutralize the cut-allium aroma.',
    placementNote:
      'Float architectural globes well above focal blooms like graphic punctuation marks.',
    idealStems: '3–5 stems',
    heightRatio: 1.75,
    motif: 'dome',
    marketSeasons: ['spring', 'summer'],
  },
  {
    flowerId: 'iris',
    role: 'line',
    availability: 'Year-round staple',
    stemClass: 'bulbous',
    vaseLife: '4–6 days',
    vaseLifeDays: [4, 6],
    waterDepth: 'medium',
    waterNote: '3–4 in cool water',
    colorHue: 256,
    colorFamily: 'Deep Indigo',
    tonalValue: 'deep',
    isNeutral: false,
    swatchHex: '#4E3A85',
    styleWorld: 'garden',
    transitRating: 'sturdy',
    giftNote:
      'Always buy in tight "pencil bud" stage showing just a sliver of violet-blue—they travel without bruising and bloom open dramatically overnight for the recipient.',
    buyingTip:
      'Buy tight pencil buds rather than wide-open blooms, which bruise on the ride home.',
    conditioningTip:
      'Give a crisp 45° trim and stand in cool water overnight; buds open cleanly by morning.',
    placementNote:
      'Adds rich dark value and crisp vertical energy above soft pink, white, or yellow focals.',
    idealStems: '5–7 stems',
    heightRatio: 1.62,
    motif: 'star',
    marketSeasons: ['year-round'],
  },
  {
    flowerId: 'daffodil',
    role: 'line',
    availability: 'Seasonal market favorite',
    stemClass: 'bulbous',
    vaseLife: '5–7 days',
    vaseLifeDays: [5, 7],
    waterDepth: 'shallow',
    waterNote: '2–3 in cold water only',
    colorHue: 48,
    colorFamily: 'Sunlit Yellow',
    tonalValue: 'light',
    isNeutral: false,
    swatchHex: '#D9AE2B',
    styleWorld: 'garden',
    chemistry: 'toxic-sap',
    transitRating: 'delicate',
    giftNote:
      'Best gifted as a joyful mono-bouquet of daffodils alone! If mixed into a gift wrap, the recipient will likely recut the stems at home and trigger mucilaginous sap that clogs the other flowers.',
    buyingTip:
      'Choose tight "goose-neck" buds angled sideways with bright yellow tips peeking out.',
    conditioningTip:
      'Bleed freshly cut daffodils alone in cold water for 6–12 hours, rinse ends, and NEVER recut them once combined with other blooms (Constance Spry / Chezar rule).',
    placementNote:
      'Cluster in odd numbers at stepped heights so their trumpets nod outward.',
    idealStems: '7–10 stems',
    heightRatio: 1.45,
    motif: 'cup',
    marketSeasons: ['winter', 'spring'],
  },
  {
    flowerId: 'freesia',
    role: 'line',
    availability: 'Year-round staple',
    stemClass: 'herbaceous',
    vaseLife: '7–10 days',
    vaseLifeDays: [7, 10],
    waterDepth: 'medium',
    waterNote: '3–4 in cool water; pinch spent bottom florets as combs open',
    colorHue: 44,
    colorFamily: 'Warm Gold',
    tonalValue: 'light',
    isNeutral: false,
    swatchHex: '#D8AB3C',
    styleWorld: 'garden',
    chemistry: 'ethylene-sensitive',
    transitRating: 'sturdy',
    giftNote:
      'An intoxicating gift flower—even 5 stems perfume a room for a week. Keep clear of carnations and fruit bowls so the buds open fully.',
    buyingTip:
      'Pick arched combs where the first floret is colored and open, guaranteeing the rest will follow.',
    conditioningTip:
      'Ethylene-sensitive—keep away from carnations and ripening fruit. Trim ½ in at 45°.',
    placementNote:
      'Tuck along the outer collar so their graceful curved combs spill past heavier focals.',
    idealStems: '5–7 stems',
    heightRatio: 1.5,
    motif: 'spike',
    marketSeasons: ['year-round'],
  },
  {
    flowerId: 'bird-of-paradise',
    role: 'line',
    availability: 'Specialty florist cut',
    stemClass: 'woody',
    vaseLife: '10–14 days',
    vaseLifeDays: [10, 14],
    waterDepth: 'deep',
    waterNote: '5–6 in tepid water; mist the spathe lightly',
    colorHue: 22,
    colorFamily: 'Flame Orange',
    tonalValue: 'mid',
    isNeutral: false,
    swatchHex: '#D4622A',
    styleWorld: 'tropical',
    transitRating: 'moderate',
    giftNote:
      'Best presented as a sleek, architectural hand-tied bundle of 3–5 stems with bold leaves—too stiff and large-scale to tuck comfortably beside dainty cottage blooms.',
    buyingTip:
      'Look for crisp, unbrowned boat-like spathes with bright orange crests just emerging.',
    conditioningTip:
      'Soak overnight, then gently coax the hidden second crest out of the spathe with clean thumbs.',
    placementNote:
      'Treat as pure sculpture: orient beaks in one deliberate direction or face two in quiet dialogue.',
    idealStems: '2–3 stems',
    heightRatio: 1.85,
    motif: 'star',
    marketSeasons: ['year-round'],
  },
  {
    flowerId: 'babys-breath',
    role: 'filler',
    availability: 'Year-round staple',
    stemClass: 'herbaceous',
    vaseLife: '10–14 days (dries effortlessly)',
    vaseLifeDays: [10, 14],
    waterDepth: 'medium',
    waterNote: '3–4 in fresh water; air-dries cleanly as water recedes',
    colorHue: null,
    colorFamily: 'Cloud White',
    tonalValue: 'light',
    isNeutral: true,
    swatchHex: '#F2EFE6',
    styleWorld: 'meadow',
    transitRating: 'sturdy',
    giftNote:
      'Sturdy neutral bridge that cushions delicate focal heads inside kraft paper and dries as a keepsake long after other blooms fade.',
    buyingTip:
      'Choose crisp white sprays heavy with pearly unopened buds and zero browned stems.',
    conditioningTip:
      'Untangle delicate branching sprigs gently before cutting so side shoots don’t snap.',
    placementNote:
      'Use either sparingly as a light mist to bridge bold colors, or massed richly on its own.',
    idealStems: '3–5 stems',
    heightRatio: 1.4,
    motif: 'cloud',
    marketSeasons: ['year-round'],
  },
  {
    flowerId: 'chamomile',
    role: 'filler',
    availability: 'Seasonal market favorite',
    stemClass: 'herbaceous',
    vaseLife: '6–9 days',
    vaseLifeDays: [6, 9],
    waterDepth: 'medium',
    waterNote: '3–4 in cool water; strip feathery leaves thoroughly',
    colorHue: null,
    colorFamily: 'Cream & Gold Neutral',
    tonalValue: 'light',
    isNeutral: true,
    swatchHex: '#EFE8CE',
    styleWorld: 'meadow',
    transitRating: 'delicate',
    giftNote:
      'Feathery stems droop quickly if left dry—always wrap stems in a generously wet paper towel inside wax paper if gifting, and keep cool.',
    buyingTip:
      'Look for crisp white reflexed petals and bright golden domes (avoid darkened centers).',
    conditioningTip:
      'Strip every submerged ferny leaf—chamomile foliage clouds vase water quickly.',
    placementNote:
      'Let tiny daisies float 1–2 inches above the main dome for Floret’s signature windswept finish.',
    idealStems: '5–7 stems',
    heightRatio: 1.46,
    motif: 'cloud',
    marketSeasons: ['spring', 'summer'],
  },
  {
    flowerId: 'cosmos',
    role: 'filler',
    availability: 'Seasonal market favorite',
    stemClass: 'hollow',
    vaseLife: '4–6 days',
    vaseLifeDays: [4, 6],
    waterDepth: 'medium',
    waterNote: '3–4 in cool water with flower food',
    colorHue: 334,
    colorFamily: 'Soft Magenta',
    tonalValue: 'mid',
    isNeutral: false,
    swatchHex: '#C25B84',
    styleWorld: 'meadow',
    transitRating: 'delicate',
    giftNote:
      'Papery petals and slender stems make cosmos better for same-day local hand-offs than long commutes—buy mostly half-open buds.',
    buyingTip:
      'Pick supple stems with half-open buds; wide-flat flowers shatter sooner.',
    conditioningTip:
      'Strip threadlike leaves from the lower half and recut at 45° every two days.',
    placementNote:
      'Place cosmos very last—float them slightly wider and taller than focal blooms for airy movement.',
    idealStems: '5–7 stems',
    heightRatio: 1.54,
    motif: 'cup',
    marketSeasons: ['summer', 'autumn'],
  },
  {
    flowerId: 'aster',
    role: 'filler',
    availability: 'Year-round staple',
    stemClass: 'herbaceous',
    vaseLife: '7–12 days',
    vaseLifeDays: [7, 12],
    waterDepth: 'medium',
    waterNote: '4 in fresh water',
    colorHue: 276,
    colorFamily: 'Heather Violet',
    tonalValue: 'mid',
    isNeutral: false,
    swatchHex: '#7A549C',
    styleWorld: 'meadow',
    transitRating: 'sturdy',
    giftNote:
      'Dependable year-round filler that revives briskly after travel and brings starry texture to hand-tied wraps.',
    buyingTip:
      'Choose sprays with clean green foliage and mostly open star florets showing bright yellow centers.',
    conditioningTip:
      'Strip lower foliage cleanly and cut at 45°; asters bounce back quickly after market transport.',
    placementNote:
      'Weave through the middle tier to bridge pink, blue, and violet palettes seamlessly.',
    idealStems: '4–6 stems',
    heightRatio: 1.38,
    motif: 'cloud',
    marketSeasons: ['year-round'],
  },
  {
    flowerId: 'lavender',
    role: 'filler',
    availability: 'Seasonal market favorite',
    stemClass: 'woody',
    vaseLife: '7–10 days (dries indefinitely)',
    vaseLifeDays: [7, 10],
    waterDepth: 'shallow',
    waterNote: '2–3 in cool water; woody stems dislike deep water',
    colorHue: 266,
    colorFamily: 'Muted Lavender',
    tonalValue: 'mid',
    isNeutral: false,
    swatchHex: '#6F5B96',
    styleWorld: 'meadow',
    transitRating: 'sturdy',
    giftNote:
      'Effortless traveler that perfumes a wrapped bouquet and dries cleanly into a lasting keepsake.',
    buyingTip:
      'Choose plump spikes where only the lowest florets have opened—they hold scent and color longest.',
    conditioningTip:
      'Strip silvery lower leaves cleanly so they stay dry, and trim woody bases at a slant.',
    placementNote:
      'Tuck fragrant little clusters near the collar where passersby catch the scent.',
    idealStems: '7–10 stems',
    heightRatio: 1.42,
    motif: 'spike',
    marketSeasons: ['summer'],
  },
  {
    flowerId: 'acacia',
    role: 'branch',
    availability: 'Specialty florist cut',
    stemClass: 'woody',
    vaseLife: '5–7 days',
    vaseLifeDays: [5, 7],
    waterDepth: 'deep',
    waterNote: '5–6 in tepid water; thirsty winter branches',
    colorHue: 47,
    colorFamily: 'Mimosa Gold',
    tonalValue: 'light',
    isNeutral: false,
    swatchHex: '#CFA32B',
    styleWorld: 'garden',
    transitRating: 'moderate',
    giftNote:
      'Radiant winter gift bough—note that mimosa puffs shed fine yellow pollen, so wrap in crisp parchment and keep clear of white tablecloths.',
    buyingTip:
      'Choose fluffy, bright lemon-gold globes rather than dried-out mustard spheres.',
    conditioningTip:
      'Split woody bases vertically ½ inch with sharp pruners and strip submerged silver foliage.',
    placementNote:
      'Set branches first to form a sunlit outer frame before tucking focal blooms into the heart.',
    idealStems: '2–4 branches',
    heightRatio: 1.72,
    motif: 'branch',
    marketSeasons: ['winter', 'spring'],
  },
  {
    flowerId: 'cherry-blossom',
    role: 'branch',
    availability: 'Seasonal market favorite',
    stemClass: 'woody',
    vaseLife: '7–14 days',
    vaseLifeDays: [7, 14],
    waterDepth: 'deep',
    waterNote: '5–6 in tepid water to coax swollen pink buds open',
    colorHue: 344,
    colorFamily: 'Pale Sakura Blush',
    tonalValue: 'light',
    isNeutral: false,
    swatchHex: '#DF9DAB',
    styleWorld: 'architectural',
    transitRating: 'delicate',
    giftNote:
      'Long woody branches are awkward in a compact hand-tied bouquet—if gifting, present 3 tall branches alone tied with a simple linen ribbon rather than squeezing them among soft stems.',
    buyingTip:
      'Buy branches heavy with swollen pink buds and just a few open blossoms.',
    conditioningTip:
      'Cut at 45°, then split the bottom inch of woody bark cleanly with pruners (Ariella Chezar method—avoid hammering).',
    placementNote:
      'Give one dramatic branch room to sweep asymmetrically past the rim with plenty of open air.',
    idealStems: '2–3 branches',
    heightRatio: 1.88,
    motif: 'branch',
    marketSeasons: ['spring'],
  },
  {
    flowerId: 'rosemary',
    role: 'branch',
    availability: 'Year-round staple',
    stemClass: 'woody',
    vaseLife: '10–14 days',
    vaseLifeDays: [10, 14],
    waterDepth: 'medium',
    waterNote: '3–4 in cool water; strip lower needles cleanly',
    colorHue: null,
    colorFamily: 'Evergreen Neutral',
    tonalValue: 'deep',
    isNeutral: true,
    swatchHex: '#4E6650',
    styleWorld: 'garden',
    transitRating: 'sturdy',
    giftNote:
      'A florist’s secret weapon for hand-tied bouquets: aromatic, dark evergreen value that anchors pale petals, creates a sturdy collar, and bridges any color clash.',
    buyingTip:
      'Even grocery herb packs work—look for tall, straight woody sprigs with crisp aromatic needles.',
    conditioningTip:
      'Run fingers downward to strip submerged needles cleanly, then snip woody ends at 45°.',
    placementNote:
      'Place rosemary first—crisscrossed inside a vase or around a spiral—to build a natural aromatic frame.',
    idealStems: '5–8 sprigs',
    heightRatio: 1.35,
    motif: 'branch',
    marketSeasons: ['year-round'],
  },
];

export const FLORIST_PROFILE_MAP: Record<string, FloristProfile> =
  Object.fromEntries(MARKET_FLORIST_PROFILES.map((p) => [p.flowerId, p]));

/* ============================================================================
   COLOR THEORY & STYLE COMPATIBILITY HELPERS (Putnam / Floret / Spry)
   ============================================================================ */

export function hueDistance(a: number, b: number): number {
  const diff = Math.abs(a - b) % 360;
  return diff > 180 ? 360 - diff : diff;
}

export type ColorRelation =
  | 'neutral-bridge'
  | 'monochromatic'
  | 'analogous'
  | 'complementary'
  | 'high-tension';

export function classifyColorRelation(
  a: FloristProfile,
  b: FloristProfile
): { relation: ColorRelation; label: string; note: string } {
  if (a.isNeutral || b.isNeutral || a.colorHue === null || b.colorHue === null) {
    return {
      relation: 'neutral-bridge',
      label: 'Neutral Bridge',
      note: 'Botanical whites and evergreens harmonize effortlessly with every hue and calm high-contrast palettes.',
    };
  }
  const d = hueDistance(a.colorHue, b.colorHue);
  if (d <= 22) {
    const valueContrast = a.tonalValue !== b.tonalValue;
    return {
      relation: 'monochromatic',
      label: 'Monochromatic',
      note: valueContrast
        ? 'Single-hue harmony with built-in light-to-dark value contrast (passes Putnam’s Squint Test).'
        : 'Same hue and similar tonal depth—add a paler highlight or deep evergreen foliage so it doesn’t read flat.',
    };
  }
  if (d <= 78) {
    return {
      relation: 'analogous',
      label: 'Analogous Harmony',
      note: 'Neighbors on the color wheel—Putnam’s most natural, garden-like color transition.',
    };
  }
  if (d >= 145) {
    return {
      relation: 'complementary',
      label: 'Complementary (80/20)',
      note: 'Opposites on the color wheel create bold energy—use an 80/20 dominant-to-accent ratio rather than a 50/50 split.',
    };
  }
  return {
    relation: 'high-tension',
    label: 'High Color Tension',
    note: 'Two strong, unrelated hues can compete visually unless unified by a cream/green neutral bridge and clear 80/20 dominance.',
  };
}

export function styleWorldsCompatible(a: StyleWorld, b: StyleWorld): 'match' | 'stretch' | 'clash' {
  if (a === b) return 'match';
  const pair = [a, b].sort().join('+');
  if (
    pair === 'garden+meadow' ||
    pair === 'architectural+garden' ||
    pair === 'architectural+tropical'
  ) {
    return 'match';
  }
  if (pair === 'architectural+meadow') return 'stretch';
  // tropical + garden or tropical + meadow
  return 'clash';
}

export function seasonsOverlap(a: FloristProfile, b: FloristProfile): {
  matches: boolean;
  label: string;
} {
  if (
    a.marketSeasons.includes('year-round') ||
    b.marketSeasons.includes('year-round')
  ) {
    return { matches: true, label: 'Available together (year-round staple)' };
  }
  const shared = a.marketSeasons.filter((s) => b.marketSeasons.includes(s));
  if (shared.length > 0) {
    const nice = shared.map((s) => s[0].toUpperCase() + s.slice(1)).join(' & ');
    return { matches: true, label: `Shared ${nice} peak` };
  }
  return { matches: false, label: 'Different peak seasons' };
}

/* ============================================================================
   5-POINT PAIR COMPATIBILITY ENGINE (Answers: "What if the 2 aren't compatible?")
   ============================================================================ */

export type CompatibilityVerdict = 'natural' | 'trick' | 'apart';

export interface CompatibilityDimension {
  label: string;
  status: 'good' | 'caution' | 'clash';
  detail: string;
}

export interface PairCompatibilityReport {
  verdict: CompatibilityVerdict;
  headline: string;
  summary: string;
  dimensions: CompatibilityDimension[];
  swapSuggestionsForSecond: {
    flowerId: string;
    reason: string;
  }[];
  bridgeSuggestionId?: string;
}

export function evaluatePairCompatibility(
  a: FloristProfile,
  b: FloristProfile,
  intent: ArrangementIntent,
  flowerNames: Record<string, string>
): PairCompatibilityReport {
  const nameA = flowerNames[a.flowerId] ?? a.flowerId;
  const nameB = flowerNames[b.flowerId] ?? b.flowerId;
  const dimensions: CompatibilityDimension[] = [];

  let clashScore = 0;
  let cautionScore = 0;

  // 1. Botanical Chemistry (Spry / Chezar)
  const hasSap = a.chemistry === 'toxic-sap' || b.chemistry === 'toxic-sap';
  const hasEthyleneClash =
    (a.chemistry === 'ethylene-producer' && b.chemistry === 'ethylene-sensitive') ||
    (b.chemistry === 'ethylene-producer' && a.chemistry === 'ethylene-sensitive');

  if (hasEthyleneClash) {
    clashScore += 2;
    const producer = a.chemistry === 'ethylene-producer' ? nameA : nameB;
    const sensitive = a.chemistry === 'ethylene-sensitive' ? nameA : nameB;
    dimensions.push({
      label: 'Botanical Chemistry',
      status: 'clash',
      detail: `${producer} emits ethylene gas, which causes ethylene-sensitive ${sensitive} to drop florets early in the same vessel or wrap.`,
    });
  } else if (hasSap) {
    if (intent === 'bouquet') {
      clashScore += 2;
      dimensions.push({
        label: 'Botanical Chemistry (Gifting)',
        status: 'clash',
        detail:
          'Daffodils exude mucilaginous sap when cut. In a gift bouquet, the recipient will naturally trim the stems at home—releasing sap that clogs the other bloom.',
      });
    } else {
      cautionScore += 1;
      dimensions.push({
        label: 'Botanical Chemistry',
        status: 'caution',
        detail:
          'Daffodils bleed sap that clogs neighboring stems. Fixable at home: soak daffodils alone for 6–12 hours, rinse, and never recut once mixed.',
      });
    }
  } else {
    dimensions.push({
      label: 'Botanical Chemistry',
      status: 'good',
      detail: 'No sap toxicity or ethylene conflict between these two stems.',
    });
  }

  // 2. Color Harmony (Putnam)
  const color = classifyColorRelation(a, b);
  if (color.relation === 'high-tension') {
    cautionScore += 2;
    dimensions.push({
      label: `Color Theory · ${color.label}`,
      status: 'caution',
      detail: `${a.colorFamily} and ${b.colorFamily}: ${color.note}`,
    });
  } else if (color.relation === 'complementary') {
    cautionScore += 1;
    dimensions.push({
      label: `Color Theory · ${color.label}`,
      status: 'caution',
      detail: `${a.colorFamily} + ${b.colorFamily}: ${color.note}`,
    });
  } else {
    dimensions.push({
      label: `Color Theory · ${color.label}`,
      status: 'good',
      detail: `${a.colorFamily} + ${b.colorFamily}: ${color.note}`,
    });
  }

  // 3. Style & Scale World
  const style = styleWorldsCompatible(a.styleWorld, b.styleWorld);
  if (style === 'clash') {
    clashScore += 2;
    dimensions.push({
      label: 'Style & Scale',
      status: 'clash',
      detail: `${nameA} (${STYLE_WORLD_LABELS[a.styleWorld]}) and ${nameB} (${STYLE_WORLD_LABELS[b.styleWorld]}) come from contrasting design worlds and stem weights—forcing them into one neck often feels jarring.`,
    });
  } else if (style === 'stretch') {
    cautionScore += 1;
    dimensions.push({
      label: 'Style & Scale',
      status: 'caution',
      detail: `${STYLE_WORLD_LABELS[a.styleWorld]} meets ${STYLE_WORLD_LABELS[b.styleWorld]}—works best when intentionally bridged by foliage or kept airy.`,
    });
  } else {
    dimensions.push({
      label: 'Style & Scale',
      status: 'good',
      detail: `Natural proportion and texture fit (${STYLE_WORLD_LABELS[a.styleWorld]} & ${STYLE_WORLD_LABELS[b.styleWorld]}).`,
    });
  }

  // 4. Seasonality
  const season = seasonsOverlap(a, b);
  if (!season.matches) {
    cautionScore += 1;
    dimensions.push({
      label: 'Market Season',
      status: 'caution',
      detail: `${nameA} and ${nameB} peak in different months—harder to buy fresh the same week without imported greenhouse stems.`,
    });
  } else {
    dimensions.push({
      label: 'Market Season',
      status: 'good',
      detail: season.label + '.',
    });
  }

  // 5. Water Depth & Vase-Life Gap
  const waterClash =
    (a.waterDepth === 'shallow' && b.waterDepth === 'deep') ||
    (a.waterDepth === 'deep' && b.waterDepth === 'shallow');
  const lifeGap = Math.abs(a.vaseLifeDays[1] - b.vaseLifeDays[1]);

  if (waterClash) {
    cautionScore += 1;
    dimensions.push({
      label: 'Water & Vase Life',
      status: 'caution',
      detail: `Opposite water needs (${a.waterDepth} vs. ${b.waterDepth})—requires a 3–3.5 in compromise depth topped up daily.`,
    });
  } else if (lifeGap >= 7) {
    cautionScore += 1;
    dimensions.push({
      label: 'Water & Vase Life',
      status: 'caution',
      detail: `Large lifespan gap (${a.vaseLife} vs. ${b.vaseLife})—plan to pull spent stems cleanly mid-week so the longer-lived bloom keeps shining.`,
    });
  } else {
    dimensions.push({
      label: 'Water & Vase Life',
      status: 'good',
      detail: `Compatible water habits and overlapping vase life (${a.vaseLife} & ${b.vaseLife}).`,
    });
  }

  // Verdict
  let verdict: CompatibilityVerdict = 'natural';
  let headline = `${nameA} & ${nameB} are a natural match`;
  let summary =
    'They share compatible botanical habits, scale, and color harmony. Next, choose 1–2 accompanying stems to complete the Floret balance.';

  if (clashScore >= 2 || (clashScore >= 1 && cautionScore >= 3)) {
    verdict = 'apart';
    headline = `${nameA} & ${nameB} fight each other in one ${intent === 'bouquet' ? 'bouquet' : 'vase'}`;
    summary =
      intent === 'bouquet'
        ? 'Real florists would avoid bundling these two together—either swap one for a true partner below, or gift them as separate mono-bouquets.'
        : 'Real florists would usually split these into two separate vessels (like a Bud Vase Trio on the same table) or swap one stem for a natural partner.';
  } else if (cautionScore >= 2 || clashScore === 1) {
    verdict = 'trick';
    headline = `${nameA} & ${nameB} work—with a florist’s trick`;
    summary =
      'Not an effortless pairing out of the bucket, but totally workable if you bridge them thoughtfully with neutral foliage, 80/20 proportion, or separate pre-conditioning.';
  }

  // Build genuinely compatible swap suggestions to replace B while keeping A
  const swapSuggestionsForSecond = MARKET_FLORIST_PROFILES.filter(
    (c) => c.flowerId !== a.flowerId && c.flowerId !== b.flowerId
  )
    .filter((c) => {
      if (styleWorldsCompatible(a.styleWorld, c.styleWorld) === 'clash') return false;
      if (
        (a.chemistry === 'ethylene-producer' && c.chemistry === 'ethylene-sensitive') ||
        (a.chemistry === 'ethylene-sensitive' && c.chemistry === 'ethylene-producer')
      ) {
        return false;
      }
      if (intent === 'bouquet' && (c.chemistry === 'toxic-sap' || c.transitRating === 'delicate')) {
        return false;
      }
      return true;
    })
    .map((c) => {
      const col = classifyColorRelation(a, c);
      const sea = seasonsOverlap(a, c);
      const roleBonus = c.role !== a.role ? 18 : 0;
      const colorBonus =
        col.relation === 'analogous'
          ? 16
          : col.relation === 'neutral-bridge'
            ? 14
            : col.relation === 'monochromatic'
              ? 12
              : 0;
      const seasonBonus = sea.matches ? 14 : 0;
      const score = roleBonus + colorBonus + seasonBonus;

      const reasonParts = [
        col.label,
        sea.matches ? sea.label.toLowerCase() : null,
        c.role !== a.role ? `adds ${ROLE_META[c.role].shortLabel.toLowerCase()} contrast` : null,
      ].filter(Boolean);

      return {
        flowerId: c.flowerId,
        reason: reasonParts.join(' · '),
        score,
      };
    })
    .sort((x, y) => y.score - x.score)
    .slice(0, 3)
    .map(({ flowerId, reason }) => ({ flowerId, reason }));

  // Suggest a neutral bridge when color tension is the main hurdle
  const bridgeSuggestionId =
    color.relation === 'high-tension' || color.relation === 'complementary'
      ? a.styleWorld === 'architectural' || a.styleWorld === 'tropical'
        ? 'calla-lily'
        : 'rosemary'
      : undefined;

  return {
    verdict,
    headline,
    summary,
    dimensions,
    swapSuggestionsForSecond,
    bridgeSuggestionId,
  };
}

/* ============================================================================
   DYNAMIC COMPANION ENGINE (Putnam Color Mood + Floret Roles + All Heroes)
   ============================================================================ */

export interface CompanionSuggestion {
  profile: FloristProfile;
  whyItPairs: string;
  colorTag: string;
  seasonTag: string;
  transitWarning?: string;
}

export interface CompanionGroup {
  role: ArrangementRole;
  heading: string;
  lesson: string;
  suggestions: CompanionSuggestion[];
}

export function buildDynamicCompanions(
  heroProfiles: FloristProfile[],
  allSelectedIds: string[],
  colorMood: ColorMood,
  intent: ArrangementIntent,
  flowerNames: Record<string, string>
): CompanionGroup[] {
  if (heroProfiles.length === 0) return [];

  const heroRoles = new Set(heroProfiles.map((p) => p.role));
  const chromaticHeroes = heroProfiles.filter(
    (h) => !h.isNeutral && h.colorHue !== null
  );
  const heroValues = new Set(heroProfiles.map((h) => h.tonalValue));
  const needsValueContrast = heroValues.size === 1;

  // Determine if the 2 heroes already have color tension (if so, prioritize neutral bridges!)
  const heroesHaveColorTension =
    heroProfiles.length === 2 &&
    ['high-tension', 'complementary'].includes(
      classifyColorRelation(heroProfiles[0], heroProfiles[1]).relation
    );

  // Order missing Floret roles first
  const priorityRoles: ArrangementRole[] = [];
  if (!heroRoles.has('focal')) priorityRoles.push('focal');
  if (!heroRoles.has('line')) priorityRoles.push('line');
  if (!heroRoles.has('filler')) priorityRoles.push('filler');
  if (!heroRoles.has('branch')) priorityRoles.push('branch');
  // Ensure at least 3 useful groups show
  for (const r of ['branch', 'line', 'filler', 'focal'] as ArrangementRole[]) {
    if (!priorityRoles.includes(r)) priorityRoles.push(r);
  }

  const groupMeta: Record<
    ArrangementRole,
    { heading: string; lesson: string }
  > = {
    branch: {
      heading:
        intent === 'bouquet'
          ? 'Frame the Collar with Foliage or Herbs'
          : 'Build Your Backbone with Foliage or Branches',
      lesson:
        'Floret & Constance Spry start here: woody foliage hides mechanics, frames your palette, and anchors light petals with deep green value.',
    },
    line: {
      heading: 'Lift the Silhouette with a Line Stem',
      lesson:
        'Vertical spires and sculptural stalks pull the eye upward so rounded blooms feel gathered rather than flat.',
    },
    focal: {
      heading: 'Anchor the Heart with a Focal Star',
      lesson:
        'Generous, rounded petal heads sit slightly lower to give the eye a calm resting place.',
    },
    filler: {
      heading: 'Add Breathing Room with an Airy Accent',
      lesson:
        'Floret’s "finishing magic": light sprays float slightly past the dome so air and light move through the arrangement.',
    },
  };

  return priorityRoles.slice(0, 3).map((role) => {
    const candidates = MARKET_FLORIST_PROFILES.filter(
      (c) => c.role === role && !heroProfiles.some((h) => h.flowerId === c.flowerId)
    );

    const scored = candidates
      .map((candidate) => {
        // Hard-check style & chemistry against EVERY hero
        let hasStyleClash = false;
        let hasEthyleneClash = false;
        let allSeasonsMatch = true;

        for (const h of heroProfiles) {
          if (styleWorldsCompatible(h.styleWorld, candidate.styleWorld) === 'clash') {
            hasStyleClash = true;
          }
          if (
            (h.chemistry === 'ethylene-producer' &&
              candidate.chemistry === 'ethylene-sensitive') ||
            (h.chemistry === 'ethylene-sensitive' &&
              candidate.chemistry === 'ethylene-producer')
          ) {
            hasEthyleneClash = true;
          }
          if (!seasonsOverlap(h, candidate).matches) {
            allSeasonsMatch = false;
          }
        }

        // Color mood scoring against primary chromatic hero
        let colorScore = 0;
        let colorTag = candidate.colorFamily;
        let colorWhy = '';

        if (candidate.isNeutral || chromaticHeroes.length === 0) {
          colorScore = heroesHaveColorTension ? 26 : 16;
          colorTag = 'Neutral Bridge';
          colorWhy = heroesHaveColorTension
            ? `Acts as a calm ${candidate.colorFamily.toLowerCase()} bridge between your two bold starting hues`
            : `Clean ${candidate.colorFamily.toLowerCase()} neutral that lets your star bloom lead`;
        } else {
          const ref = chromaticHeroes[0];
          const rel = classifyColorRelation(ref, candidate);
          colorTag = rel.label;
          if (colorMood === 'monochromatic') {
            if (rel.relation === 'monochromatic') {
              colorScore = 26;
              colorWhy = `Monochromatic ${candidate.colorFamily.toLowerCase()} step alongside ${flowerNames[ref.flowerId]}`;
            } else if (rel.relation === 'analogous') {
              colorScore = 15;
              colorWhy = `Close analogous neighbor to ${flowerNames[ref.flowerId]}`;
            } else {
              colorScore = -8;
              colorWhy = `Contrasts sharply with ${flowerNames[ref.flowerId]}`;
            }
          } else if (colorMood === 'analogous') {
            if (rel.relation === 'analogous') {
              colorScore = 26;
              colorWhy = `Smooth analogous wheel transition from ${ref.colorFamily.toLowerCase()} to ${candidate.colorFamily.toLowerCase()}`;
            } else if (rel.relation === 'monochromatic') {
              colorScore = 18;
              colorWhy = `Tonal echo of ${flowerNames[ref.flowerId]}’s hue`;
            } else {
              colorScore = -6;
              colorWhy = `Bolder hue jump from ${flowerNames[ref.flowerId]}`;
            }
          } else {
            // complementary 80/20
            if (rel.relation === 'complementary') {
              colorScore = 26;
              colorWhy = `True opposite-wheel accent against ${flowerNames[ref.flowerId]} (use in a crisp 20% ratio)`;
            } else if (rel.relation === 'analogous') {
              colorScore = 10;
              colorWhy = `Supports ${flowerNames[ref.flowerId]} softly on the same side of the wheel`;
            } else {
              colorScore = 4;
              colorWhy = `Contrasting tone against ${flowerNames[ref.flowerId]}`;
            }
          }
        }

        // Value contrast (Putnam's Squint Test)
        let valueBonus = 0;
        let valueWhy = '';
        if (needsValueContrast && !heroValues.has(candidate.tonalValue)) {
          valueBonus = 8;
          valueWhy =
            candidate.tonalValue === 'deep'
              ? 'adds deep shadow contrast (Squint Test)'
              : candidate.tonalValue === 'light'
                ? 'lifts the palette with bright highlights'
                : 'bridges light and dark tones';
        }

        // Intent / Transit adjustments
        let transitScore = 0;
        let transitWarning: string | undefined;
        if (intent === 'bouquet') {
          if (candidate.chemistry === 'toxic-sap') {
            transitScore = -28;
            transitWarning =
              'Risky in mixed gift wraps—recipient may recut and trigger toxic sap.';
          } else if (candidate.transitRating === 'delicate') {
            transitScore = -12;
            transitWarning =
              'Delicate out of water—best for short, same-day local gifting.';
          } else if (candidate.transitRating === 'sturdy') {
            transitScore = 8;
          }
        } else if (candidate.chemistry === 'toxic-sap') {
          transitScore = -6;
          transitWarning = 'Bleed separately 6–12h before adding to shared vase.';
        }

        const alreadyPicked = allSelectedIds.includes(candidate.flowerId) ? 45 : 0;
        const stylePenalty = hasStyleClash ? -35 : 0;
        const chemPenalty = hasEthyleneClash ? -45 : 0;
        const seasonBonus = allSeasonsMatch ? 12 : -4;

        const totalScore =
          alreadyPicked +
          colorScore +
          valueBonus +
          seasonBonus +
          transitScore +
          stylePenalty +
          chemPenalty;

        const seasonTag = allSeasonsMatch
          ? candidate.marketSeasons.includes('year-round')
            ? 'Year-round staple'
            : 'Shared season'
          : 'Seasonal specialty';

        const whyParts = [
          colorWhy,
          valueWhy,
          intent === 'bouquet' && candidate.transitRating === 'sturdy'
            ? 'travels sturdily in a wrap'
            : null,
        ].filter(Boolean);

        return {
          profile: candidate,
          whyItPairs:
            whyParts.length > 0
              ? `${whyParts[0]}${whyParts[1] ? ` · ${whyParts[1]}` : ''}${whyParts[2] ? ` · ${whyParts[2]}` : ''}.`
              : candidate.placementNote,
          colorTag,
          seasonTag,
          transitWarning,
          _exclude: hasEthyleneClash || (hasStyleClash && !alreadyPicked),
          _score: totalScore,
        };
      })
      .filter((x) => !x._exclude)
      .sort((a, b) => b._score - a._score)
      .slice(0, 4)
      .map(({ _exclude: _e, _score: _s, ...rest }) => rest);

    return {
      role,
      heading: groupMeta[role].heading,
      lesson: groupMeta[role].lesson,
      suggestions: scored,
    };
  });
}

/* ============================================================================
   SQUINT TEST (Putnam Value Analysis) & ASSEMBLY PLAN
   ============================================================================ */

export function getSquintTestReadout(profiles: FloristProfile[]): {
  passes: boolean;
  label: string;
  note: string;
} {
  if (profiles.length <= 1) {
    return {
      passes: true,
      label: 'Single-variety study',
      note: 'A mono-floral bunch relies on petal texture and stem height rather than color contrast.',
    };
  }
  const vals = new Set(profiles.map((p) => p.tonalValue));
  if (vals.has('light') && vals.has('deep')) {
    return {
      passes: true,
      label: 'Passes the Squint Test',
      note: 'Your palette spans both light highlights and deep anchor tones, giving real visual depth (Putnam).',
    };
  }
  if (vals.size >= 2) {
    return {
      passes: true,
      label: 'Gentle tonal range',
      note: 'Two tonal steps create soft editorial calm; adding a dark herb or pale highlight would sharpen contrast further.',
    };
  }
  const single = Array.from(vals)[0];
  return {
    passes: false,
    label: `All ${single}-value tones`,
    note:
      single === 'light'
        ? 'Putnam’s Squint Test: all pale blooms can blur together—tuck in deep evergreen Rosemary or a dark-centered Anemone for anchor.'
        : single === 'deep'
          ? 'Putnam’s Squint Test: all deep blooms can feel heavy—lift the eye with pale Chamomile, Baby’s Breath, or Blush Peony.'
          : 'Putnam’s Squint Test: mid-tones alone can feel flat—add either a crisp ivory highlight or dark foliage shadow.',
  };
}

export function getRecommendedVesselId(
  profiles: FloristProfile[]
): VesselOption['id'] {
  if (profiles.length === 0) return 'pitcher';
  if (profiles.length === 1) {
    const only = profiles[0];
    if (only.role === 'branch' || only.heightRatio >= 1.7) return 'cylinder';
    return 'bud-trio';
  }
  if (
    profiles.some(
      (p) =>
        p.flowerId === 'amaryllis' ||
        p.flowerId === 'gladiolus' ||
        p.flowerId === 'bird-of-paradise'
    )
  ) {
    return 'cylinder';
  }
  if (
    profiles.some((p) => p.role === 'branch' && p.flowerId !== 'rosemary') &&
    profiles.length <= 3
  ) {
    return 'compote';
  }
  return 'pitcher';
}

export function getHeroRoleCoaching(
  heroProfiles: FloristProfile[],
  flowerNames: Record<string, string>,
  intent: ArrangementIntent
): { headline: string; body: string } {
  if (heroProfiles.length === 0) {
    return {
      headline: 'Begin with one flower you love',
      body: 'Choose 1 star bloom (or 2 to test whether they actually belong together).',
    };
  }

  const names = heroProfiles.map((p) => flowerNames[p.flowerId]).join(' & ');
  const roles = new Set(heroProfiles.map((p) => p.role));

  if (heroProfiles.length === 1) {
    const p = heroProfiles[0];
    if (p.role === 'focal') {
      return {
        headline: `${names} is your Focal star (${p.colorFamily})`,
        body:
          intent === 'bouquet'
            ? 'In a hand-tied gift bouquet, a rounded focal wants sturdy foliage around the collar, one vertical line for lift, and an airy accent so it looks florist-wrapped rather than tight and round.'
            : 'In Floret’s formula, a generous focal bloom sits low near the vessel lip. Pick a Putnam color mood below, then add one Line or Branch for height and one Airy accent for movement.',
      };
    }
    if (p.role === 'line') {
      return {
        headline: `${names} sets your vertical Line (${p.colorFamily})`,
        body: 'Tall or sculpted lines establish silhouette and drama. Anchor their lower third with a rounded Focal bloom and frame the neck with Foliage so the stems feel grounded.',
      };
    }
    if (p.role === 'filler') {
      return {
        headline: `${names} brings airy movement (${p.colorFamily})`,
        body: 'Airy sprays are the finishing magic of a bouquet. Anchor them with a fuller Focal bloom and add a Line or Branch so the shape has quiet structure.',
      };
    }
    return {
      headline: `${names} creates your structural Backbone (${p.colorFamily})`,
      body: 'Woody branches and herbs build a natural internal grid (no foam needed). Nestle a Focal bloom into the heart and add one lighter accent so negative space still breathes.',
    };
  }

  if (roles.size === 1) {
    const onlyRole = Array.from(roles)[0];
    return {
      headline: `${names} both play the ${ROLE_META[onlyRole].label} role`,
      body: 'Because both stems share a similar silhouette, adding a contrasting shape below (plus foliage backbone) is what transforms two bunches into a composed arrangement.',
    };
  }

  return {
    headline: `${names} already give you two distinct shapes`,
    body: 'Choose a Putnam color mood below and add 1–2 finishing companions (like foliage or an airy accent) to knit the palette together.',
  };
}

export interface ArrangementPlan {
  balanceTitle: string;
  balanceNote: string;
  waterGuidance: string;
  seasonNote: string;
  warnings: { title: string; detail: string; tone: 'caution' | 'info' }[];
  steps: { phase: string; title: string; detail: string }[];
  recipientCareTag: string[];
}

export function buildArrangementPlan(
  profiles: FloristProfile[],
  vessel: VesselOption,
  intent: ArrangementIntent,
  flowerNames: Record<string, string>
): ArrangementPlan {
  const counts: Record<ArrangementRole, number> = {
    branch: 0,
    line: 0,
    focal: 0,
    filler: 0,
  };
  profiles.forEach((p) => {
    counts[p.role] += 1;
  });

  const hasFocal = counts.focal > 0;
  const hasHeight = counts.line > 0 || counts.branch > 0;
  const hasAir = counts.filler > 0;

  let balanceTitle = 'Monobotanical study';
  let balanceNote =
    profiles.length === 1
      ? `A generous single-variety bunch of ${flowerNames[profiles[0].flowerId]} (${profiles[0].idealStems}) is timeless and quiet.`
      : 'Clean, restrained structure.';

  if (profiles.length >= 2) {
    if (hasFocal && hasHeight && hasAir) {
      balanceTitle = 'Complete Floret balance';
      balanceNote =
        'All core architectural layers are present—structure & height, focal weight at the heart, and airy accents for movement.';
    } else if (hasFocal && hasHeight) {
      balanceTitle = 'Sculptural & poised';
      balanceNote =
        'Strong focal anchors lifted by clean lines. Keep negative space deliberate so each silhouette reads crisply.';
    } else if (hasFocal && hasAir) {
      balanceTitle = 'Soft cottage gather';
      balanceNote =
        'Lush and romantic at table height—tuck airy stems slightly past the focal dome for natural rhythm.';
    } else {
      balanceTitle = 'Airy botanical sketch';
      balanceNote =
        'Light, graphic, and modern—stagger heights cleanly so every stalk reads distinctly.';
    }
  }

  // Warnings
  const warnings: ArrangementPlan['warnings'] = [];
  const hasDaffodil = profiles.some((p) => p.chemistry === 'toxic-sap');
  const ethyleneProducer = profiles.find((p) => p.chemistry === 'ethylene-producer');
  const ethyleneSensitive = profiles.find((p) => p.chemistry === 'ethylene-sensitive');

  if (hasDaffodil && profiles.length > 1) {
    warnings.push({
      tone: 'caution',
      title:
        intent === 'bouquet'
          ? 'Gift Bouquet Sap Warning (Daffodil)'
          : 'Daffodil Sap Conditioning Rule',
      detail:
        intent === 'bouquet'
          ? 'Include a clear note on the recipient’s care tag: "Do not recut the daffodils when placing in water"—freshly recut daffodils bleed sap that clogs the other stems.'
          : 'Bleed daffodils alone in cold water for 6–12 hours, rinse ends, and never recut them once added to the shared vase.',
    });
  }

  if (ethyleneProducer && ethyleneSensitive) {
    warnings.push({
      tone: 'caution',
      title: 'Ethylene Sensitivity Conflict',
      detail: `${flowerNames[ethyleneProducer.flowerId]} emits ethylene gas that accelerates petal drop in ${flowerNames[ethyleneSensitive.flowerId]}. Keep water spotless and cool, or consider swapping one stem.`,
    });
  }

  if (intent === 'bouquet') {
    const delicate = profiles.filter((p) => p.transitRating === 'delicate');
    if (delicate.length > 0) {
      warnings.push({
        tone: 'info',
        title: 'Delicate Transit Stems',
        detail: `${delicate.map((d) => flowerNames[d.flowerId]).join(' & ')} wilt or bruise quickly out of water. Wrap stem ends in a soaking-wet paper towel sealed in wax paper, and gift the same day.`,
      });
    }
  }

  // Water guidance
  const depths = new Set(profiles.map((p) => p.waterDepth));
  let waterGuidance = 'Medium 4 in cool fresh water, refreshed every 2 days.';
  if (depths.has('shallow') && depths.has('deep')) {
    waterGuidance =
      'Compromise depth: 3–3.5 in cool water topped up daily (protects hollow stalks while keeping thirsty branches hydrated).';
    warnings.push({
      tone: 'info',
      title: 'Mixed Water-Depth Needs',
      detail:
        'Shallow-water stalks and deep-drinking branches share this recipe—use 3–3.5 inches of clean water and top up every morning.',
    });
  } else if (depths.size === 1) {
    const d = Array.from(depths)[0];
    waterGuidance =
      d === 'shallow'
        ? 'Shallow 2–3 in cold water, refreshed every 2 days.'
        : d === 'deep'
          ? 'Deep 5–6 in fresh tepid-to-cool water, topped up daily.'
          : 'Medium 4 in cool water, refreshed every 2 days.';
  }

  // Seasonality
  const seasonalOnly = profiles.filter(
    (p) => !p.marketSeasons.includes('year-round')
  );
  let seasonNote = 'All selected blooms are widely stocked year-round.';
  if (seasonalOnly.length === 1) {
    const s = seasonalOnly[0].marketSeasons
      .map((x) => x[0].toUpperCase() + x.slice(1))
      .join(' / ');
    seasonNote = `Peak local market window: ${s} (anchored by ${flowerNames[seasonalOnly[0].flowerId]}).`;
  } else if (seasonalOnly.length > 1) {
    const seasons: ('spring' | 'summer' | 'autumn' | 'winter')[] = [
      'spring',
      'summer',
      'autumn',
      'winter',
    ];
    const shared = seasons.filter((s) =>
      seasonalOnly.every((p) => p.marketSeasons.includes(s))
    );
    seasonNote =
      shared.length > 0
        ? `Natural seasonal overlap in ${shared.map((x) => x[0].toUpperCase() + x.slice(1)).join(' & ')}.`
        : 'Cross-seasonal pairing: these peak in different months, so a specialty florist may be needed to source them together.';
  }

  const sorted = [...profiles].sort(
    (a, b) => ROLE_META[a.role].placementOrder - ROLE_META[b.role].placementOrder
  );

  // Build steps differ genuinely between In a Vase vs. Hand-Tied Gift Bouquet!
  const steps: ArrangementPlan['steps'] =
    intent === 'bouquet'
      ? [
          {
            phase: '01 · Buy at the Right Stage',
            title: 'Ask the florist for tight buds',
            detail: profiles
              .map(
                (p) =>
                  `${flowerNames[p.flowerId]} (${p.idealStems}): ${p.buyingTip}`
              )
              .join(' '),
          },
          {
            phase: '02 · Strip & Hydrate First',
            title: 'Clean every stem below the binding point',
            detail:
              'Strip all foliage from the lower 6–8 inches so nothing sits under the twine or in the recipient’s vase water. Hydrate stems in cool water for at least 1 hour before spiralling.',
          },
          {
            phase: '03 · The 45° Hand-Tied Spiral',
            title: 'Build in your hand from center outward',
            detail: `Hold your first ${flowerNames[sorted[0]?.flowerId ?? ''] ?? 'stem'} upright in your non-dominant hand. Lay every next stem across it at a 45° angle in the same direction, rotating a quarter-turn as you add: ${sorted
              .map(
                (p, i) =>
                  `(${i + 1}) ${flowerNames[p.flowerId]} [${ROLE_META[p.role].shortLabel}]`
              )
              .join(' → ')}. Keep focal blooms slightly recessed and let airy accents dance 1–2 in higher.`,
          },
          {
            phase: '04 · Bind, Trim Flat & Damp-Wrap',
            title: 'Tie with twine & wrap for transit',
            detail:
              'Tie snugly at the narrow binding point with linen twine, then trim all stems level so the bouquet fits cleanly into a standard 7–8 in vase. Wrap the cut ends in a wet paper towel tucked inside wax paper, then fold unbleached kraft paper around the bouquet.',
          },
        ]
      : [
          {
            phase: '01 · Vessel & Foam-Free Mechanics',
            title: `Prepare the ${vessel.name}`,
            detail: `${vessel.mechanicsDetail} Fill with ${waterGuidance.charAt(0).toLowerCase()}${waterGuidance.slice(1)}`,
          },
          {
            phase: '02 · Conditioning (Spry Method)',
            title: 'Strip submerged leaves & cut at 45°',
            detail: profiles
              .map((p) => `${flowerNames[p.flowerId]}: ${p.conditioningTip}`)
              .join(' '),
          },
          {
            phase: '03 · Four-Step Build Sequence',
            title: 'Layer from backbone to airy accents',
            detail: sorted
              .map((p, i) => {
                const targetIn = Math.round(vessel.heightInches * p.heightRatio);
                return `(${i + 1}) ${flowerNames[p.flowerId]} [${ROLE_META[p.role].shortLabel}, ~${targetIn}" total]: ${p.placementNote}`;
              })
              .join(' '),
          },
          {
            phase: '04 · Step Back & Squint Test',
            title: 'Check balance from eye level',
            detail:
              'Turn the vessel a quarter-turn and squint slightly (Putnam’s test) to check light-and-dark balance. Pull one or two airy stems slightly wider so the silhouette feels gathered, never packed.',
          },
        ];

  const recipientCareTag = [
    `Water: ${waterGuidance}`,
    hasDaffodil && profiles.length > 1
      ? 'Important: Do not recut the daffodil stems—recutting releases sap that shortens the other flowers.'
      : 'Trim ½ inch off each stem at a 45° angle before placing into a clean 7–8 in vase.',
    ethyleneSensitive
      ? 'Keep out of direct sun and away from ripening fruit bowls (ethylene causes delicate florets to drop).'
      : 'Keep out of direct midday sun and refresh the water every two days.',
  ];

  return {
    balanceTitle,
    balanceNote,
    waterGuidance,
    seasonNote,
    warnings,
    steps,
    recipientCareTag,
  };
}
