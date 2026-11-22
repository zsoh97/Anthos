export interface TraitPin {
  x: number;
  y: number;
  label: string;
  note: string;
}

export interface Flower {
  id: string;
  plate: string;
  name: string;
  latin: string;
  family: string;
  season: string;
  meaning: string;
  sentiments: string[];
  accent: string;
  image: string;
  pins: TraitPin[];
  paragraphs: string[];
  epigraph: string;
  epigraphSource: string;
}

export const FLOWERS: Flower[] = [
  {
    id: 'acacia',
    plate: 'PLATE I',
    name: 'Acacia',
    latin: 'Acacia dealbata',
    family: 'Fabaceae',
    season: 'Late Winter',
    meaning: 'Secret Love · Friendship',
    sentiments: ['Secret love', 'Friendship', 'Elegance', 'Warmth', 'Chaste love'],
    accent: '#B58D24',
    image: '/plates/acacia.jpg',
    pins: [
      {
        x: 61,
        y: 22,
        label: 'Golden pom-pom globes',
        note: 'Clusters of sunlit, powder-puff globes made of dozens of tiny radiating golden stamens perfume late winter air.',
      },
      {
        x: 25,
        y: 62,
        label: 'Feathery silver foliage',
        note: 'Finely divided bipinnate leaves wear a dusty sage-silver sheen that softens the bright yellow blooms.',
      },
      {
        x: 77,
        y: 80,
        label: 'Floret & fuzzy pod study',
        note: 'Up close, each golden sphere hides minute star-like petals beneath its burst of stamens, later ripening into a small velvety pod.',
      },
    ],
    paragraphs: [
      'Known along the French Riviera as winter mimosa, silver wattle breaks into clouds of fragrant gold while February still holds the coast in chill. Florists cut armfuls of its feathery silver boughs to bring the promise of sunlight indoors long before spring arrives.',
      'In Victorian flower dictionaries, yellow acacia was the quiet emblem of secret love and steadfast, unassuming friendship. Tucked into a nosegay without fanfare, it spoke of an affection content to glow warmly even when left unspoken.',
    ],
    epigraph: '“A bough of winter gold that keeps its gentle secret till the thaw.”',
    epigraphSource: 'Nineteenth-century Mediterranean floral lore',
  },
  {
    id: 'anemone',
    plate: 'PLATE II',
    name: 'Anemone',
    latin: 'Anemone coronaria',
    family: 'Ranunculaceae',
    season: 'Spring',
    meaning: 'Forsaken · Anticipation',
    sentiments: ['Forsaken', 'Anticipation', 'Longing', 'Fading hope', 'Waiting'],
    accent: '#8E2833',
    image: '/plates/anemone.jpg',
    pins: [
      {
        x: 45,
        y: 31,
        label: 'Dark velvety boss',
        note: 'A jet-black central dome ringed with dark anthers—the quickest way to tell an anemone from a field poppy.',
      },
      {
        x: 49,
        y: 50,
        label: 'Feathery ruff',
        note: 'A collar of finely divided green bracts sits partway down the hairy stem, well beneath the silky petals.',
      },
      {
        x: 74,
        y: 42,
        label: 'Nodding bud',
        note: 'Young blooms bow downward on slender stems before lifting their papery cups to the spring breeze.',
      },
    ],
    paragraphs: [
      'The ancients called it the windflower, from the Greek anemos, convinced that its silky petals would open only when the spring breeze stirred them—and scatter at the next sharp gust. Legend tied the crimson bloom to the death of Adonis, claiming it rose wherever his blood met the tears of Aphrodite.',
      'In Victorian parlours, to slip an anemone into a posy was to leave a quiet ache unsaid. Sent before a meeting, it whispered of breathless anticipation; sent after silence, it carried the gentler reproof of one forsaken.',
    ],
    epigraph: '“The wind-flower opens to the gale, and closes ere the storm can fall.”',
    epigraphSource: 'Nineteenth-century floral emblem',
  },
  {
    id: 'camellia',
    plate: 'PLATE III',
    name: 'Camellia',
    latin: 'Camellia japonica',
    family: 'Theaceae',
    season: 'Winter & Early Spring',
    meaning: 'Admiration · Longing',
    sentiments: ['Admiration', 'Longing', 'Perfection', 'Devotion', 'Gratitude', 'Love'],
    accent: '#B05264',
    image: '/plates/camellia.jpg',
    pins: [
      {
        x: 41,
        y: 41,
        label: 'Waxen tiered petals',
        note: 'Dozens of smooth, porcelain-like petals fold outward in near-geometric symmetry, dropping whole rather than scattering one by one.',
      },
      {
        x: 62,
        y: 26,
        label: 'Scaly bud calyx',
        note: 'Plump round buds sit nestled in overlapping olive-green scales before unfurling in late winter.',
      },
      {
        x: 64,
        y: 53,
        label: 'Serrated glossy leaves',
        note: 'Thick, leathery evergreen leaves with finely toothed margins and sharply pointed tips frame the pale bloom.',
      },
    ],
    paragraphs: [
      'When live camellias first arrived in European conservatories from East Asia in the eighteenth century, botanists marveled at a rose that bloomed without thorns in the dead of winter. Its petals held the cool sheen of carved shell, and when finished, the entire blossom fell cleanly to the moss in one piece.',
      'In Paris and London salons, a blush-pink camellia pinned to a lapel or tucked beside a calling card became an unmistakable confession of longing: “You are foremost in my thoughts.” Because the flower carried no scent of its own, Victorians joked that it spoke for admirers too composed to boast.',
    ],
    epigraph: '“Cold in the winter glasshouse, yet glowing with unspoken praise.”',
    epigraphSource: 'Victorian conservatory note',
  },
  {
    id: 'daffodil',
    plate: 'PLATE IV',
    name: 'Daffodil',
    latin: 'Narcissus pseudonarcissus',
    family: 'Amaryllidaceae',
    season: 'Early Spring',
    meaning: 'New Beginnings · Unrequited Regard',
    sentiments: ['New beginnings', 'Renewal', 'Unrequited love', 'Chivalry', 'Hope', 'Spring'],
    accent: '#B5891C',
    image: '/plates/daffodil.jpg',
    pins: [
      {
        x: 35,
        y: 27,
        label: 'Ruffled golden trumpet',
        note: 'A deep saffron corona juts forward like a miniature horn, edged with softly crimped pleats.',
      },
      {
        x: 40,
        y: 16,
        label: 'Six primrose tepals',
        note: 'Six paler, pointed outer petals sweep gently backward around the darker trumpet.',
      },
      {
        x: 68,
        y: 30,
        label: 'Papery spathe',
        note: 'Every bud breaks out of a dry, rust-colored translucent sheath perched at the crown of the hollow stalk.',
      },
    ],
    paragraphs: [
      'Long before the hedgerows turn green, wild daffodils push through cold March turf in sudden floods of pale gold, earning the old country name Lent lily. Botanists placed the flower in the genus Narcissus, after the Greek youth who knelt by a still pool and lost himself in his own reflection—a myth that still clings to the bloom’s downward gaze.',
      'To give a single daffodil was once thought unlucky, a quiet hint of self-absorption or unrequited regard. Offered in a generous handful, however, it turned entirely bright: a wish for fresh beginnings, returning warmth, and cheer after a long winter.',
    ],
    epigraph: '“Fair daffodils, we weep to see you haste away so soon.”',
    epigraphSource: 'Robert Herrick, 1648',
  },
  {
    id: 'forget-me-not',
    plate: 'PLATE V',
    name: 'Forget-me-not',
    latin: 'Myosotis sylvatica',
    family: 'Boraginaceae',
    season: 'Spring & Early Summer',
    meaning: 'True Remembrance · Devotion',
    sentiments: ['Remembrance', 'Memory', 'Devotion', 'Fidelity', 'True love', 'Loyalty'],
    accent: '#3F6E9C',
    image: '/plates/forgetmenot.jpg',
    pins: [
      {
        x: 75,
        y: 81,
        label: 'Sky-blue star & yellow eye',
        note: 'Five tiny rounded cerulean petals frame a luminous golden ring at the throat—unmistakable even from a pace away.',
      },
      {
        x: 79,
        y: 29,
        label: 'Coiled pink bud tip',
        note: 'Flower sprays uncurl like a fiddlehead or scorpion’s tail, with unopened buds tinted dusty rose before turning blue.',
      },
      {
        x: 57,
        y: 65,
        label: 'Mouse-ear leaves',
        note: 'Soft, finely haired oval leaves gave the plant its Latin name Myosotis—literally “mouse’s ear.”',
      },
    ],
    paragraphs: [
      'Its Latin name, Myosotis, translates rather plainly to “mouse’s ear,” after the soft, downy shape of its narrow leaves. Yet European folklore draped this humble streamside weed in one of the most enduring romantic legends: a knight reaching down a riverbank to gather blue blossoms for his beloved slipped into the current and tossed the bouquet ashore with his final plea—forget me not.',
      'Few flowers were pressed into Victorian letters, lockets, and mourning brooches more often. A sprig tucked inside a folded sheet asked for nothing dramatic—only that absence might not erase affection.',
    ],
    epigraph: '“That is the flower of memory, blue as a cleared sky after rain.”',
    epigraphSource: 'German & English riverside folklore',
  },
  {
    id: 'foxglove',
    plate: 'PLATE VI',
    name: 'Foxglove',
    latin: 'Digitalis purpurea',
    family: 'Plantaginaceae',
    season: 'Summer',
    meaning: 'Insincerity · A Riddle',
    sentiments: ['Insincerity', 'Secret', 'Caution', 'Riddle', 'Stateliness', 'Mystery'],
    accent: '#7D3163',
    image: '/plates/foxglove.jpg',
    pins: [
      {
        x: 48,
        y: 53,
        label: 'Speckled throat',
        note: 'Each drooping thimble hides a pale creamy interior freckled with burgundy spots ringed in white—landing guides for bumblebees.',
      },
      {
        x: 44,
        y: 17,
        label: 'One-sided spire',
        note: 'Blossoms hang predominantly along one side of the tall stem, opening steadily from the lowest bells upward.',
      },
      {
        x: 76,
        y: 85,
        label: 'Cutaway bell',
        note: 'Four slender stamens arch snugly against the upper roof of the tubular flower.',
      },
    ],
    paragraphs: [
      'Along shaded woodland lanes in early summer, foxgloves lift tall spires of hanging magenta bells that country folk long called fairy thimbles or dead men’s bells. Its dark beauty has always carried a warning: the very leaves that quiet a racing heart in apothecary tinctures prove fatal in excess.',
      'Because danger lurks inside such stately charm, Victorian dictionaries cast the foxglove as the emblem of insincerity and hidden intent. To receive a sprig was to be admired from afar—yet quietly advised not to take sweet words at face value.',
    ],
    epigraph: '“Tall spires of spotted bells that keep the woodland’s secret counsel.”',
    epigraphSource: 'Traditional English country lore',
  },
  {
    id: 'hazel',
    plate: 'PLATE VII',
    name: 'Hazel',
    latin: 'Corylus avellana',
    family: 'Betulaceae',
    season: 'Late Winter & Autumn',
    meaning: 'Reconciliation · Peace',
    sentiments: ['Reconciliation', 'Apology', 'Sorry', 'Forgiveness', 'Peace', 'Wisdom'],
    accent: '#7A6A33',
    image: '/plates/hazel.jpg',
    pins: [
      {
        x: 36,
        y: 61,
        label: 'Golden spring catkins',
        note: 'Soft chartreuse-yellow “lamb’s tails” dangle in late winter, scattering clouds of pale pollen on the breeze.',
      },
      {
        x: 63,
        y: 56,
        label: 'Fringed leafy husks',
        note: 'Smooth russet hazelnuts ripen cradled inside papery, scalloped green collars.',
      },
      {
        x: 64,
        y: 27,
        label: 'Pleated toothed leaves',
        note: 'Rounded, doubly serrated leaves carry crisp parallel veins and taper abruptly into a short point.',
      },
    ],
    paragraphs: [
      'In Celtic legend, nine sacred hazel trees leaned over the Well of Wisdom, dropping nuts that held all the poetry and knowledge of the world. Country dowsers still cut forked hazel wands to search for hidden springs beneath dry meadows, trusting the supple wood to bend toward what lies unseen.',
      'In the language of flowers, hazel carries one of the tenderest meanings of all: reconciliation. When words after a quarrel felt too stiff or too fragile, a small twig of hazel—bearing its gentle golden catkins—quietly offered an olive branch.',
    ],
    epigraph: '“A bough of hazel bends to mend what hasty speech has torn.”',
    epigraphSource: 'Old woodland proverb',
  },
  {
    id: 'iris',
    plate: 'PLATE VIII',
    name: 'Iris',
    latin: 'Iris germanica',
    family: 'Iridaceae',
    season: 'Late Spring',
    meaning: 'Eloquence · A Message',
    sentiments: ['Eloquence', 'Message', 'Wisdom', 'Faith', 'Valor', 'News'],
    accent: '#4E3A85',
    image: '/plates/iris.jpg',
    pins: [
      {
        x: 50,
        y: 21,
        label: 'Upright standards',
        note: 'Three arched inner petals—the standards—rise like a velvet crown above the center of the bloom.',
      },
      {
        x: 62,
        y: 30,
        label: 'Golden beard',
        note: 'A fuzzy caterpillar-like golden crest runs down the throat of each drooping outer fall.',
      },
      {
        x: 53,
        y: 44,
        label: 'Papery spathe',
        note: 'Pointed violet buds unfurl from dry, parchment-like sheaths perched atop tall sword-shaped leaves.',
      },
    ],
    paragraphs: [
      'Named for the winged messenger of Olympus who crossed the sky upon a rainbow, the iris arrived in European gardens draped in royal associations—its three upright standards and three drooping falls stylized for centuries into the French fleur-de-lis.',
      'In the language of flowers, a violet iris spoke of wisdom and eloquence, and above all announced that a message was on its way. Paired with calmer foliage, it told a correspondent, simply: I have something of importance to tell you.',
    ],
    epigraph: '“She walks the arc of rain and light, bearing word from heaven to earth.”',
    epigraphSource: 'Classical emblem of Iris',
  },
  {
    id: 'lavender',
    plate: 'PLATE IX',
    name: 'Lavender',
    latin: 'Lavandula angustifolia',
    family: 'Lamiaceae',
    season: 'Summer',
    meaning: 'Devotion · Quiet Serenity',
    sentiments: ['Devotion', 'Serenity', 'Calm', 'Silence', 'Grace', 'Peace'],
    accent: '#63518A',
    image: '/plates/lavender.jpg',
    pins: [
      {
        x: 51,
        y: 21,
        label: 'Whorled violet spikes',
        note: 'Dozens of tiny tubular blossoms cluster in stacked whorls atop slender square stems, rich with fragrant oil.',
      },
      {
        x: 47,
        y: 67,
        label: 'Silvery narrow leaves',
        note: 'Opposite linear leaves wear a dusty grey-green bloom that reflects harsh summer sun.',
      },
      {
        x: 74,
        y: 76,
        label: 'Two-lipped floret',
        note: 'Up close, each tiny blossom opens into two delicate violet lips emerging from a ribbed velvety calyx.',
      },
    ],
    paragraphs: [
      'From the Latin lavare, to wash, lavender perfumed Roman bathhouses and medieval linen chests alike. Even dried and pressed inside a drawer for years, a single spike releases its clean, sun-warmed resin the moment it is crushed between thumb and finger.',
      'Victorian floral guides split gently over its sentiment: a few stern volumes linked its watchful scent to mistrust, while the broader tradition embraced it as the flower of serene devotion and quiet grace—a wish for untroubled sleep and steady affection.',
    ],
    epigraph: '“Here’s flowers for you; hot lavender, mints, savory, marjoram.”',
    epigraphSource: 'William Shakespeare, The Winter’s Tale',
  },
  {
    id: 'peony',
    plate: 'PLATE X',
    name: 'Peony',
    latin: 'Paeonia lactiflora',
    family: 'Paeoniaceae',
    season: 'Late Spring',
    meaning: 'Bashfulness · Romance',
    sentiments: ['Bashfulness', 'Romance', 'Love', 'Prosperity', 'Compassion', 'Shyness'],
    accent: '#C16278',
    image: '/plates/peony.jpg',
    pins: [
      {
        x: 53,
        y: 30,
        label: 'Billowing ruffled petals',
        note: 'Scores of papery, translucent blush petals crowd into an opulent globe that softens toward ivory at the center.',
      },
      {
        x: 21,
        y: 38,
        label: 'Marble-round bud',
        note: 'Before opening, tight spherical buds glisten with sweet nectar that draws garden ants to help loosen the sepals.',
      },
      {
        x: 35,
        y: 69,
        label: 'Divided bronze-green foliage',
        note: 'Broad compound leaves emerge flushed reddish-bronze in spring before maturing to deep matte green.',
      },
    ],
    paragraphs: [
      'Named for Paeon, physician to the Greek gods, the peony was revered in China for over a millennium as the King of Flowers—an emblem of honor, abundance, and happy marriage. Its blooming season is famously brief, making its exuberant pink clouds all the more treasured.',
      'In Victorian England, legend held that shy nymphs hid inside its ruffled folds, earning the peony the gentle meaning of bashfulness. Placed in a courtship bouquet, it conveyed a blushing, wholehearted romance.',
    ],
    epigraph: '“A hundred silken folds of blush, too full to hold the morning dew.”',
    epigraphSource: 'Classical garden verse',
  },
  {
    id: 'poppy',
    plate: 'PLATE XI',
    name: 'Field Poppy',
    latin: 'Papaver rhoeas',
    family: 'Papaveraceae',
    season: 'Summer',
    meaning: 'Consolation · Restful Sleep',
    sentiments: ['Consolation', 'Comfort', 'Sleep', 'Remembrance', 'Peace', 'Imagination'],
    accent: '#B53324',
    image: '/plates/poppy.jpg',
    pins: [
      {
        x: 50,
        y: 26,
        label: 'Crumpled scarlet petals',
        note: 'Four broad tissue-paper petals unfurl creased from the bud, often marked with ink-black blotches at their base.',
      },
      {
        x: 31,
        y: 54,
        label: 'Drooping bristly bud',
        note: 'Before blooming, two hairy green sepals clamp tightly over a nodding oval bud, then fall away the moment it opens.',
      },
      {
        x: 77,
        y: 81,
        label: 'Pepper-pot seed capsule',
        note: 'After the petals drop, a ridged dome develops tiny pores beneath its scalloped lid to shake seeds onto the wind.',
      },
    ],
    paragraphs: [
      'Poppy seeds can lie dormant in dark soil for half a century, waiting patiently until a plough or spade turns them up to daylight. Within weeks, scarlet bowls of crumpled silk flare across disturbed earth—fragile enough that a single afternoon shower can strip them bare.',
      'Long linked with Demeter’s grief and the quiet gift of sleep, the red field poppy entered Victorian flower dictionaries as the emblem of consolation. To send one to a weary friend was to offer gentle rest and quiet solidarity without demanding conversation.',
    ],
    epigraph: '“In scarlet silk the summer field remembers what the furrow kept.”',
    epigraphSource: 'English pastoral elegy',
  },
  {
    id: 'rosemary',
    plate: 'PLATE XII',
    name: 'Rosemary',
    latin: 'Salvia rosmarinus',
    family: 'Lamiaceae',
    season: 'Spring & Evergreen',
    meaning: 'Remembrance · Fidelity',
    sentiments: ['Remembrance', 'Fidelity', 'Loyalty', 'Memory', 'Devotion', 'Friendship'],
    accent: '#4F6A8C',
    image: '/plates/rosemary.jpg',
    pins: [
      {
        x: 61,
        y: 43,
        label: 'Pale periwinkle blooms',
        note: 'Clusters of tiny two-lipped sky-blue flowers with arched stamens nestle directly where needles meet the woody stem.',
      },
      {
        x: 33,
        y: 58,
        label: 'Silver-backed needles',
        note: 'Leathery, aromatic pine-like leaves are deep sage above and pale silvery-white beneath with slightly rolled margins.',
      },
      {
        x: 76,
        y: 81,
        label: 'Profile floret',
        note: 'Each lipped blossom acts as a miniature landing stage for early spring bees.',
      },
    ],
    paragraphs: [
      'Its name comes from the Latin ros marinus—“dew of the sea”—for the wild evergreen shrubs that cling to dry Mediterranean cliffs within sight of salt spray. Ancient Greek scholars braided sprigs of rosemary into their hair while studying, trusting its sharp, resinous scent to steady the memory.',
      'For centuries in England, rosemary was woven into both bridal wreaths and funeral garlands—the single herb faithful enough to accompany a life from beginning to end. In any Victorian posy, a sprig of rosemary stood simply for enduring remembrance.',
    ],
    epigraph: '“There’s rosemary, that’s for remembrance; pray you, love, remember.”',
    epigraphSource: 'William Shakespeare, Hamlet',
  },
];
