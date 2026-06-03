/* ============================================================
   BOOK & GO — data
   ============================================================ */

const DESTINATIONS = [
  { id: 'canals',    scene: 'canals',    name: 'Amsterdam Canals',  tag: 'UNESCO Heritage',  blurb: '17th-century waterways & gabled houses', from: 39 },
  { id: 'vangogh',   scene: 'vangogh',   name: 'Van Gogh Museum',   tag: 'Art & Culture',    blurb: 'The world’s largest Van Gogh collection', from: 24 },
  { id: 'rijks',     scene: 'rijks',     name: 'Rijksmuseum',       tag: 'Art & Culture',    blurb: 'Dutch masters & the Night Watch', from: 25 },
  { id: 'annefrank', scene: 'annefrank', name: 'Anne Frank House',  tag: 'History',          blurb: 'The secret annex, preserved', from: 18 },
  { id: 'jordaan',   scene: 'jordaan',   name: 'Jordaan District',  tag: 'Neighbourhood',    blurb: 'Boutiques, brown cafés & courtyards', from: 0 },
  { id: 'dam',       scene: 'dam',       name: 'Dam Square',        tag: 'Landmark',         blurb: 'The beating heart of the old city', from: 0 },
  { id: 'keukenhof', scene: 'tulips',    name: 'Keukenhof',         tag: 'Seasonal',         blurb: '7 million tulips, one spring garden', from: 32 },
  { id: 'giethoorn', scene: 'giethoorn', name: 'Giethoorn',         tag: 'Day Trip',         blurb: 'The village with no roads', from: 64 },
];

const EXPERIENCES = [
  { id: 'cruise',    scene: 'cruise',    name: 'Canal Cruises',         note: 'Glide past the Golden Bend at golden hour', dur: '75 min', from: 29 },
  { id: 'tulip',     scene: 'tulips',    name: 'Tulip Season',          note: 'Keukenhof & the bulb fields of Lisse', dur: 'Full day', from: 68 },
  { id: 'food',      scene: 'food',      name: 'Dutch Food Tours',      note: 'Stroopwafels, herring, aged Gouda & jenever', dur: '3 hrs', from: 54 },
  { id: 'nightlife', scene: 'nightlife', name: 'Nightlife Experiences', note: 'Jordaan jazz to Noord warehouse clubs', dur: 'Evening', from: 45 },
  { id: 'museum',    scene: 'museum',    name: 'Museum Experiences',    note: 'Skip-the-line across the Museumplein', dur: 'Flexible', from: 39 },
  { id: 'photo',     scene: 'photo',     name: 'Photography Tours',     note: 'A local photographer finds your best light', dur: '2 hrs', from: 79 },
];

const PACKAGES = [
  {
    id: 'escape3', name: '3-Day Amsterdam Escape', nights: '3 days · 2 nights', price: 549, tier: 'Essential',
    color: 'green', scene: 'canals',
    blurb: 'The icons, done beautifully — canals, masters & a long weekend that feels twice as long.',
    highlights: ['Canal-side boutique hotel', 'Private 75-min canal cruise', 'Skip-the-line Van Gogh Museum', 'Guided old-city walk'],
    includes: ['2 nights central 4★ stay', 'Daily breakfast', 'Private canal cruise', 'All museum entries', 'Airport transfers', '24/7 local concierge'],
    itinerary: [
      { d: 'Day 1', t: 'Arrival & the Golden Bend', scene: 'canals', items: ['Private transfer to your canal-side hotel', 'Welcome cruise along the Herengracht', 'Dinner in the Nine Streets'] },
      { d: 'Day 2', t: 'Masters & the Museumplein', scene: 'vangogh', items: ['Skip-the-line Van Gogh Museum', 'Lunch at the Rijksmuseum garden', 'Free afternoon in the Jordaan'] },
      { d: 'Day 3', t: 'Markets & farewell', scene: 'jordaan', items: ['Albert Cuyp market stroll', 'Stroopwafel tasting', 'Departure transfer'] },
    ],
  },
  {
    id: 'explorer5', name: '5-Day Amsterdam Explorer', nights: '5 days · 4 nights', price: 989, tier: 'Most Popular',
    color: 'yellow', scene: 'tulips', featured: true,
    blurb: 'City classics plus the countryside — tulip fields, Giethoorn’s waterways and time to wander.',
    highlights: ['Keukenhof & tulip fields', 'Giethoorn day trip', 'Dutch food tour', 'Free curated days'],
    includes: ['4 nights central 4★ stay', 'Daily breakfast', 'Keukenhof + bulb fields', 'Giethoorn whisper-boat day', 'Dutch food tour', 'All museum entries', 'Airport transfers', '24/7 local concierge'],
    itinerary: [
      { d: 'Day 1', t: 'Arrival & canals', scene: 'canals', items: ['Private transfer & check-in', 'Evening canal cruise', 'Dinner in De Pijp'] },
      { d: 'Day 2', t: 'Art & icons', scene: 'rijks', items: ['Rijksmuseum highlights', 'Van Gogh Museum', 'Jordaan café crawl'] },
      { d: 'Day 3', t: 'Keukenhof & tulips', scene: 'tulips', items: ['Keukenhof gardens', 'Bulb fields of Lisse', 'Photo stop at the windmills'] },
      { d: 'Day 4', t: 'Giethoorn day trip', scene: 'giethoorn', items: ['Whisper-boat through the village', 'Lakeside lunch', 'Return at golden hour'] },
      { d: 'Day 5', t: 'Flavours & farewell', scene: 'food', items: ['Dutch food tour', 'Last canal-side coffee', 'Departure transfer'] },
    ],
  },
  {
    id: 'premium7', name: '7-Day Premium Amsterdam', nights: '7 days · 6 nights', price: 1690, tier: 'Premium',
    color: 'blue', scene: 'nightlife',
    blurb: 'The unhurried version — private guides, a photographer, nightlife and a canal-house suite.',
    highlights: ['Canal-house suite', 'Private photographer day', 'Curated nightlife evening', 'Everything in Explorer, slower'],
    includes: ['6 nights canal-house suite', 'Daily breakfast', 'Private city guide (2 days)', 'Photography tour', 'Keukenhof & Giethoorn', 'Curated nightlife evening', 'Private transfers throughout', '24/7 local concierge'],
    itinerary: [
      { d: 'Day 1', t: 'Arrival in style', scene: 'canals', items: ['Private transfer to canal-house suite', 'Champagne welcome cruise'] },
      { d: 'Day 2', t: 'The masters, privately', scene: 'vangogh', items: ['Private-guide Van Gogh & Rijksmuseum', 'Lunch on the Museumplein'] },
      { d: 'Day 3', t: 'Tulips & windmills', scene: 'tulips', items: ['Keukenhof at opening', 'Zaanse Schans windmills'] },
      { d: 'Day 4', t: 'Giethoorn & the lakes', scene: 'giethoorn', items: ['Private whisper-boat', 'Lakeside long lunch'] },
      { d: 'Day 5', t: 'Through a lens', scene: 'photo', items: ['Private photographer half-day', 'Free afternoon'] },
      { d: 'Day 6', t: 'Flavours & nightlife', scene: 'food', items: ['Dutch food tour', 'Curated nightlife evening'] },
      { d: 'Day 7', t: 'A slow farewell', scene: 'jordaan', items: ['Jordaan morning', 'Departure transfer'] },
    ],
  },
];

/* Keukenhof destination detail content */
const KEUKENHOF = {
  scene: 'tulips', name: 'Keukenhof', region: 'Lisse · 40 min from Amsterdam', season: 'Open 20 Mar – 11 May',
  overview: 'For eight weeks each spring, a quiet corner of Lisse becomes the most photographed garden on earth. Seven million bulbs — tulips, daffodils and hyacinths — are hand-planted across 32 hectares of shaded avenues, mirror ponds and pavilions. Beyond the gates, the bulb fields stretch to the horizon in ribbons of colour.',
  highlights: [
    { t: 'Seven million bulbs', s: 'Hand-planted by 40 gardeners every autumn', scene: 'tulips' },
    { t: 'The bulb fields', s: 'Ride out into the candy-striped fields of Lisse', scene: 'cycling' },
    { t: 'Windmill viewpoint', s: 'Climb for the postcard shot over the rows', scene: 'photo' },
    { t: 'Flower parade', s: 'Catch the Bloemencorso if you time it right', scene: 'tulips' },
  ],
  tips: [
    'Arrive at opening (08:00) or after 16:00 to beat the coach crowds.',
    'Peak bloom is mid-April, but early & late weeks are far quieter.',
    'Book a combination ticket with shuttle — parking fills by mid-morning.',
    'Bring layers: spring on the fields can be bright and cold at once.',
  ],
  itinerary: [
    { time: '08:00', t: 'Gates open', s: 'Walk the empty avenues before the coaches arrive' },
    { time: '10:00', t: 'Pavilions', s: 'Oranje Nassau & the lily showcase' },
    { time: '12:00', t: 'Bulb-field ride', s: 'Rent a bike and head into the colour' },
    { time: '14:00', t: 'Windmill viewpoint', s: 'The classic shot over the rows' },
    { time: '15:30', t: 'Shuttle back', s: 'Return to Amsterdam by golden hour' },
  ],
  related: ['cruise', 'photo', 'food'],
};

/* Trending topics for the AI dashboard */
const TRENDS = [
  { id: 't1', topic: 'Hidden Amsterdam Canals', scene: 'canals',    growth: '+212%', volume: '48.2k', platform: 'Instagram', heat: 96 },
  { id: 't2', topic: 'Best Sunset Spots',       scene: 'sunset',    growth: '+148%', volume: '31.7k', platform: 'Influencers', heat: 88 },
  { id: 't3', topic: 'Keukenhof Season',        scene: 'tulips',    growth: '+304%', volume: '72.9k', platform: 'Instagram', heat: 99 },
  { id: 't4', topic: 'Amsterdam Cycling Routes',scene: 'cycling',   growth: '+97%',  volume: '22.1k', platform: 'Travel Blogs', heat: 74 },
  { id: 't5', topic: 'Amsterdam Nightlife',     scene: 'nightlife', growth: '+131%', volume: '40.3k', platform: 'Discussions', heat: 84 },
  { id: 't6', topic: 'Van Gogh Museum',         scene: 'vangogh',   growth: '+58%',  volume: '18.6k', platform: 'Travel Blogs', heat: 66 },
  { id: 't7', topic: 'Giethoorn Day Trip',      scene: 'giethoorn', growth: '+176%', volume: '29.4k', platform: 'Instagram', heat: 90 },
  { id: 't8', topic: 'Dam Square Photography',  scene: 'dam',       growth: '+44%',  volume: '12.8k', platform: 'Influencers', heat: 58 },
];

/* Pre-generated example posts (the 4 required) + status seeds */
const SEED_POSTS = [
  { id: 'p1', topic: 'Hidden Amsterdam Canals', scene: 'canals',    color: 'red',
    headline: 'The Amsterdam locals keep to themselves',
    quote: 'The most beautiful views in Amsterdam aren’t on the tourist map.',
    caption: 'Slip off the Damrak and into the Jordaan’s quiet canals — where the gables lean, the bikes pile up, and the light does something the postcards never catch. This is the Amsterdam we book people into. 🚲',
    hashtags: ['#HiddenAmsterdam', '#CanalLife', '#JordaanDistrict', '#BookAndGo', '#VisitAmsterdam'],
    status: 'pending' },
  { id: 'p2', topic: 'Keukenhof Season', scene: 'tulips', color: 'yellow',
    headline: 'Eight weeks. Seven million bulbs.',
    quote: 'The world’s most colourful spring experience.',
    caption: 'Keukenhof opens for just eight weeks a year, and every one of its seven million bulbs is planted by hand. Come at opening, beat the coaches, and have the avenues to yourself. 🌷',
    hashtags: ['#Keukenhof', '#TulipSeason', '#Holland', '#BookAndGo', '#SpringInHolland'],
    status: 'pending' },
  { id: 'p3', topic: 'Giethoorn Day Trip', scene: 'giethoorn', color: 'blue',
    headline: 'The village with no roads',
    quote: 'Where roads disappear and boats become the streets.',
    caption: 'Ninety minutes from Amsterdam, Giethoorn trades cars for canals. Glide through on a whisper-boat, past thatched farmhouses and arched wooden bridges. No engines. No rush. 🛶',
    hashtags: ['#Giethoorn', '#DayTrip', '#Netherlands', '#BookAndGo', '#HiddenHolland'],
    status: 'approved' },
  { id: 'p4', topic: 'Amsterdam Nightlife', scene: 'nightlife', color: 'pink',
    headline: 'Amsterdam doesn’t sleep — it glows',
    quote: 'Experience Amsterdam after dark.',
    caption: 'From Jordaan jazz cellars to Noord’s warehouse clubs, the city rewrites itself after sunset. Our local hosts know which doors to knock on. 🌙',
    hashtags: ['#AmsterdamNightlife', '#AfterDark', '#BookAndGo', '#CityNights', '#VisitAmsterdam'],
    status: 'published', publishedAt: 'Today at 6:42 PM' },
];

/* extra ready-to-generate post templates keyed by topic */
const POST_TEMPLATES = {
  'Best Sunset Spots': { scene: 'sunset', color: 'red', headline: 'Golden hour has an address', quote: 'Amsterdam saves its best light for the people who slow down.', caption: 'The NEMO rooftop, the Amstel bend, the western islands at low tide — we know exactly where to stand when the sky turns. 🌅', hashtags: ['#GoldenHour', '#AmsterdamSunset', '#BookAndGo', '#VisitAmsterdam'] },
  'Amsterdam Cycling Routes': { scene: 'cycling', color: 'green', headline: 'See the city the way it was built to be seen', quote: 'In Amsterdam, the best routes don’t have a road.', caption: 'Two wheels, no plan, and 400 km of bike lanes. We map the routes that dodge the crowds and find the canals. 🚲', hashtags: ['#CyclingAmsterdam', '#BikeLife', '#BookAndGo', '#VisitAmsterdam'] },
  'Van Gogh Museum': { scene: 'vangogh', color: 'blue', headline: 'Two hundred reasons to look closer', quote: 'Stand close enough and the paint starts to move.', caption: 'The world’s largest Van Gogh collection, skip-the-line and timed for the quiet hour. Bring nothing but your eyes. 🎨', hashtags: ['#VanGogh', '#Museumplein', '#BookAndGo', '#ArtLovers'] },
  'Dam Square Photography': { scene: 'dam', color: 'yellow', headline: 'The heart of the old city, at first light', quote: 'Everyone photographs Dam Square. Almost no one photographs it empty.', caption: 'Be there before the trams and the pigeons own it. Our photo hosts know the 20 minutes that count. 📸', hashtags: ['#DamSquare', '#AmsterdamPhotography', '#BookAndGo', '#VisitAmsterdam'] },
};

/* Package brochure detail: inclusions / exclusions per package */
const PACKAGE_DETAILS = {
  escape3: {
    hotel: { name: 'Canal House Boutique Hotel', rating: 4, area: 'The Nine Streets · Centrum', room: 'Deluxe Canal-View Room', nights: '2 nights', amenities: ['Free Wi-Fi', 'Daily breakfast', 'Bikes included', 'Canal views', '24h reception', 'Air conditioning'] },
    departures: [
      { date: 'Fri 13 Mar 2026', twin: 549, single: 739, status: 'Available' },
      { date: 'Fri 03 Apr 2026', twin: 579, single: 769, status: 'Filling fast' },
      { date: 'Fri 24 Apr 2026', twin: 599, single: 799, status: 'Available' },
      { date: 'Fri 15 May 2026', twin: 559, single: 749, status: 'Available' },
    ],
    inclusions: ['Hotel accommodation · 2 nights 4★', 'Airport transfers', 'Daily breakfast', 'Private 75-min canal cruise', 'Attraction tickets (Van Gogh Museum)', 'Guided old-city walking tour', '24/7 local concierge'],
    exclusions: ['International flights', 'Personal expenses', 'Lunch & dinner', 'Optional activities', 'Additional shopping', 'Tips & gratuities', 'Travel insurance'],
    exp: ['cruise', 'museum', 'food'],
  },
  explorer5: {
    hotel: { name: 'Grachtengordel Canal Hotel', rating: 4, area: 'Jordaan · Centrum', room: 'Superior Canal Room', nights: '4 nights', amenities: ['Free Wi-Fi', 'Daily breakfast', 'Bikes included', 'Canal views', 'Concierge desk', 'Fitness room'] },
    departures: [
      { date: 'Wed 12 Jun 2026', twin: 989, single: 1290, status: 'Available' },
      { date: 'Wed 19 Jun 2026', twin: 1049, single: 1350, status: 'Filling fast' },
      { date: 'Wed 26 Jun 2026', twin: 1089, single: 1390, status: 'Available' },
      { date: 'Wed 03 Jul 2026', twin: 999, single: 1299, status: 'Available' },
    ],
    inclusions: ['Hotel accommodation · 4 nights 4★', 'Airport transfers', 'Daily breakfast', 'All attraction tickets', 'Keukenhof + bulb fields entry', 'Giethoorn whisper-boat day trip', 'Dutch food tour', 'Guided tours throughout', '24/7 local concierge'],
    exclusions: ['International flights', 'Personal expenses', 'Lunch & dinner (except food tour)', 'Optional activities', 'Additional shopping', 'Tips & gratuities', 'Travel insurance'],
    exp: ['cruise', 'tulip', 'food', 'museum'],
  },
  premium7: {
    hotel: { name: 'Golden Bend Suite Collection', rating: 5, area: 'Golden Bend · Grachtengordel', room: 'Premier Canal-House Suite', nights: '6 nights', amenities: ['Free Wi-Fi', 'À la carte breakfast', 'Private transfers', 'Butler service', 'Canal-house suite', 'Spa & wellness access'] },
    departures: [
      { date: 'Mon 13 Jun 2026', twin: 1690, single: 2190, status: 'Available' },
      { date: 'Mon 20 Jun 2026', twin: 1790, single: 2290, status: 'Limited' },
      { date: 'Mon 27 Jun 2026', twin: 1850, single: 2350, status: 'Available' },
      { date: 'Mon 04 Jul 2026', twin: 1720, single: 2220, status: 'Available' },
    ],
    inclusions: ['International flights', 'Canal-house suite · 6 nights', 'Private airport transfers', 'Daily breakfast', 'All attraction tickets', 'Private guided tours (2 days)', 'Keukenhof & Giethoorn', 'Private photography tour', 'Curated nightlife evening', 'Travel insurance', 'Visa assistance', '24/7 local concierge'],
    exclusions: ['Personal expenses', 'Lunch & dinner', 'Additional shopping', 'Tips & gratuities', 'Extra transportation'],
    exp: ['cruise', 'photo', 'nightlife', 'food', 'museum'],
  },
};

const CANCELLATION = [
  { when: '30+ days before departure', fee: 'Free cancellation — full refund', tone: 'good' },
  { when: '15 – 29 days before', fee: '25% of package value', tone: 'mid' },
  { when: '7 – 14 days before', fee: '50% of package value', tone: 'mid' },
  { when: 'Under 7 days / no-show', fee: 'Non-refundable', tone: 'bad' },
];

const TERMS = [
  'Package pricing is subject to availability at the time of booking.',
  'Attraction schedules and opening hours may change without notice.',
  'Seasonal availability applies — e.g. Keukenhof opens spring only.',
  'Valid travel documents are required for all travellers.',
  'A cancellation policy applies; see booking terms for full details.',
  'Visa approval is subject to embassy regulations and timelines.',
];

const COMING_SOON = ['Paris', 'Switzerland', 'Japan', 'Iceland', 'Scotland', 'Northern Lights'];

/* AI agent system */
const AGENTS = [
  { id: '01', name: 'Trend Monitoring Agent', status: 'ONLINE', desc: 'Scans social signals and ranks travel momentum in real time.', load: 96 },
  { id: '02', name: 'RSS Feed Agent', status: 'SYNCING', desc: 'Pulls travel blogs and publications every hour.', load: 71 },
  { id: '03', name: 'Content Generation Agent', status: 'PROCESSING', desc: 'Writes headlines, captions and hashtags from each opportunity.', load: 84 },
  { id: '04', name: 'Image Selection Agent', status: 'ACTIVE', desc: 'Matches topic-specific imagery to every creative.', load: 62 },
  { id: '05', name: 'Publishing Agent', status: 'ONLINE', desc: 'Schedules and publishes the moment a human approves.', load: 48 },
];
const AGENT_STATUS = {
  ONLINE: { c: 'var(--green-ink)', bg: 'var(--green-soft)', dot: 'var(--green)' },
  SYNCING: { c: 'var(--status-scheduled)', bg: 'var(--blue-soft)', dot: 'var(--blue)' },
  PROCESSING: { c: 'var(--status-pending)', bg: 'var(--status-pending-bg)', dot: '#caa400' },
  ACTIVE: { c: 'var(--green-ink)', bg: 'var(--green-soft)', dot: 'var(--green)' },
};

const CONTENT_SOURCES = [
  { name: 'RSS Feeds', ic: 'feed', count: '42 active feeds', note: 'lonelyplanet.com · dutchreview.com · +40' },
  { name: 'Travel Blogs', ic: 'edit', count: '340 sources', note: 'long-form travel writing' },
  { name: 'Instagram Trends', ic: 'instagram', count: 'live', note: 'reels, hashtags & geotags' },
  { name: 'Tourism Websites', ic: 'globe', count: '88 monitored', note: 'iamsterdam.com · holland.com' },
  { name: 'Travel Publications', ic: 'image', count: '26 feeds', note: 'Condé Nast · TimeOut · AFAR' },
  { name: 'Destination News', ic: 'bell', count: 'real-time', note: 'events, openings & seasons' },
];

const AGENT_WORKFLOW = ['RSS feed', 'AI agent reads feed', 'Extract travel opportunities', 'Generate social content', 'Create Instagram creative', 'Human approval', 'Schedule', 'Publish'];

const RSS_ITEMS = [
  { src: 'DutchReview · RSS', txt: 'Keukenhof confirms 2026 opening date — 7M bulbs planted', topic: 'Keukenhof Season', scene: 'tulips' },
  { src: 'TimeOut Amsterdam · RSS', txt: 'The 10 best hidden canals only locals know', topic: 'Hidden Amsterdam Canals', scene: 'canals' },
  { src: 'Lonely Planet · RSS', txt: 'Why Giethoorn is the day trip everyone’s adding in 2026', topic: 'Giethoorn Day Trip', scene: 'giethoorn' },
  { src: 'Condé Nast · RSS', txt: 'Amsterdam after dark: a new wave of Noord nightlife', topic: 'Amsterdam Nightlife', scene: 'nightlife' },
  { src: 'iamsterdam.com · RSS', txt: 'Cycling the city: 5 routes that dodge the crowds', topic: 'Amsterdam Cycling Routes', scene: 'cycling' },
  { src: 'AFAR · RSS', txt: 'Golden hour in Amsterdam — where photographers go', topic: 'Best Sunset Spots', scene: 'sunset' },
];

Object.assign(window, { DESTINATIONS, EXPERIENCES, PACKAGES, KEUKENHOF, TRENDS, SEED_POSTS, POST_TEMPLATES, PACKAGE_DETAILS, CANCELLATION, TERMS, COMING_SOON, AGENTS, AGENT_STATUS, CONTENT_SOURCES, AGENT_WORKFLOW, RSS_ITEMS });
