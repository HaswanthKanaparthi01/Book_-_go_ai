/* ============================================================
   BOOK & GO — shared components
   ============================================================ */

/* ---- Scene placeholders: each is a layered gradient evoking an
   Amsterdam scene so nothing ever renders broken. Swap for real
   photography by replacing the `bg` with a url(). ---- */
const SCENES = {
  amsterdam: { label: 'amsterdam · canal houses', bg: 'linear-gradient(180deg,#2a4f63 0%,#3f7d86 34%,#7fae9b 56%,#caa45c 74%,#9c7437 100%)', glow: 'radial-gradient(120% 80% at 22% 18%, rgba(255,225,150,.55), transparent 55%)' },
  canals:    { label: 'hidden canals · dusk',     bg: 'linear-gradient(180deg,#16414f 0%,#236b6f 40%,#3f9a86 60%,#d3a657 82%,#7c5a2e 100%)', glow: 'radial-gradient(90% 70% at 78% 16%, rgba(255,212,138,.6), transparent 50%)' },
  tulips:    { label: 'keukenhof · tulip fields',  bg: 'linear-gradient(180deg,#bfe2ff 0%,#bfe2ff 28%,#e8438a 38%,#ffd60a 50%,#ff7fae 60%,#34b46a 74%,#1c7d44 100%)', glow: 'radial-gradient(80% 50% at 50% 12%, rgba(255,255,255,.5), transparent 60%)' },
  nightlife: { label: 'amsterdam · after dark',    bg: 'linear-gradient(160deg,#0a1230 0%,#2a1f56 42%,#7a1f6a 76%,#15296e 100%)', glow: 'radial-gradient(40% 40% at 70% 64%, rgba(255,70,160,.5), transparent 60%), radial-gradient(30% 30% at 24% 40%, rgba(60,150,255,.5), transparent 60%)' },
  vangogh:   { label: 'van gogh museum',           bg: 'linear-gradient(180deg,#0f3a7a 0%,#1f5aa8 46%,#3f7dc4 64%,#e6b53f 100%)', glow: 'radial-gradient(34% 34% at 74% 30%, rgba(255,221,110,.85), transparent 60%), radial-gradient(50% 40% at 26% 70%, rgba(120,170,235,.5), transparent 60%)' },
  rijks:     { label: 'rijksmuseum',               bg: 'linear-gradient(180deg,#a9d2ff 0%,#a9d2ff 32%,#9a3b2e 44%,#b95a3c 64%,#7e3526 100%)', glow: 'radial-gradient(70% 40% at 50% 14%, rgba(255,255,255,.45), transparent 60%)' },
  annefrank: { label: 'anne frank house',          bg: 'linear-gradient(180deg,#9fc3d6 0%,#9fc3d6 26%,#5d4636 38%,#3c2c20 70%,#2a1f17 100%)', glow: 'radial-gradient(60% 36% at 50% 12%, rgba(255,255,255,.4), transparent 60%)' },
  jordaan:   { label: 'jordaan district',          bg: 'linear-gradient(180deg,#bfe2ff 0%,#bfe2ff 24%,#8a4030 36%,#a85a3e 58%,#2f7d4a 78%,#1f6c3c 100%)', glow: 'radial-gradient(70% 40% at 30% 14%, rgba(255,255,255,.4), transparent 60%)' },
  dam:       { label: 'dam square',                bg: 'linear-gradient(180deg,#9ec9f5 0%,#9ec9f5 38%,#b9b3a6 52%,#8d8676 72%,#5f5a4e 100%)', glow: 'radial-gradient(70% 44% at 60% 16%, rgba(255,255,255,.5), transparent 60%)' },
  giethoorn: { label: 'giethoorn · waterways',     bg: 'linear-gradient(180deg,#bfe6ff 0%,#bfe6ff 24%,#5fa56a 38%,#2f8a86 58%,#1f6f78 78%,#15535c 100%)', glow: 'radial-gradient(70% 40% at 40% 14%, rgba(255,255,255,.45), transparent 60%)' },
  food:      { label: 'dutch food tour',           bg: 'linear-gradient(180deg,#e8c768 0%,#d8a23f 42%,#b66f30 70%,#8a4d24 100%)', glow: 'radial-gradient(60% 50% at 30% 22%, rgba(255,238,180,.6), transparent 60%)' },
  cruise:    { label: 'canal cruise',              bg: 'linear-gradient(180deg,#2b5566 0%,#3f8590 40%,#6fb59c 60%,#cf9f54 100%)', glow: 'radial-gradient(80% 50% at 70% 18%, rgba(255,224,150,.55), transparent 55%)' },
  cycling:   { label: 'cycling routes',            bg: 'linear-gradient(180deg,#bfe2ff 0%,#bfe2ff 26%,#cf5237 40%,#e07a3c 58%,#2f8a5a 78%,#1f6c46 100%)', glow: 'radial-gradient(60% 40% at 66% 16%, rgba(255,255,255,.4), transparent 60%)' },
  sunset:    { label: 'best sunset spots',         bg: 'linear-gradient(180deg,#f7b34a 0%,#ef7d4e 38%,#c64f63 64%,#5b3a76 100%)', glow: 'radial-gradient(46% 46% at 50% 30%, rgba(255,236,170,.85), transparent 60%)' },
  photo:     { label: 'photography tour',          bg: 'linear-gradient(160deg,#3a5a6b 0%,#5f8a8a 44%,#cfa75e 78%,#8a6531 100%)', glow: 'radial-gradient(70% 40% at 30% 16%, rgba(255,230,160,.5), transparent 60%)' },
  museum:    { label: 'museum experiences',        bg: 'linear-gradient(180deg,#c8d6e6 0%,#9aaecb 44%,#6f5a8c 74%,#3f3560 100%)', glow: 'radial-gradient(60% 36% at 50% 14%, rgba(255,255,255,.45), transparent 60%)' },
};

/* Real, permanent Amsterdam photography (verified Wikimedia Commons thumbnails) */
const SCENE_IMG = {
  amsterdam: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/KeizersgrachtReguliersgrachtAmsterdam.jpg/1280px-KeizersgrachtReguliersgrachtAmsterdam.jpg',
  canals:    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Colorful_canal_houses_at_golden_hour_in_Damrak_avenue_Amsterdam_the_Netherlands.jpg/1280px-Colorful_canal_houses_at_golden_hour_in_Damrak_avenue_Amsterdam_the_Netherlands.jpg',
  tulips:    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Field_of_red_tulips_near_Keukenhof.jpg/1280px-Field_of_red_tulips_near_Keukenhof.jpg',
  nightlife: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amsterdam_by_night_in_snow_evening_-_at_the_street_Kattenburgergracht.jpg/1280px-Amsterdam_by_night_in_snow_evening_-_at_the_street_Kattenburgergracht.jpg',
  vangogh:   'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Van_Gogh_Museum_Amsterdam.jpg/1280px-Van_Gogh_Museum_Amsterdam.jpg',
  rijks:     'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Amsterdam-Rijksmuseum-Exterior_Restoration.jpg/1280px-Amsterdam-Rijksmuseum-Exterior_Restoration.jpg',
  annefrank: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/AnneFrankHouseAmsterdamtheNetherlands.jpg/1280px-AnneFrankHouseAmsterdamtheNetherlands.jpg',
  jordaan:   'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Canal_in_Jordaan%2C_Amsterdam_%289258952020%29.jpg/1280px-Canal_in_Jordaan%2C_Amsterdam_%289258952020%29.jpg',
  dam:       'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Palacio_Real%2C_%C3%81msterdam%2C_Pa%C3%ADses_Bajos%2C_2016-05-30%2C_DD_07-09_HDR.jpg/1280px-Palacio_Real%2C_%C3%81msterdam%2C_Pa%C3%ADses_Bajos%2C_2016-05-30%2C_DD_07-09_HDR.jpg',
  giethoorn: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Giethoorn_Netherlands_flckr03.jpg/1280px-Giethoorn_Netherlands_flckr03.jpg',
  food:      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Stroopwafels_01.jpg/1280px-Stroopwafels_01.jpg',
  cruise:    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Canal_cruise_boat_in_Amsterdam_%2825672670434%29.jpg/1280px-Canal_cruise_boat_in_Amsterdam_%2825672670434%29.jpg',
  cycling:   'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Amsterdam_-_Canal%2C_Bridge_and_Bike.jpg/1280px-Amsterdam_-_Canal%2C_Bridge_and_Bike.jpg',
  sunset:    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Sunset_-_Canal_Jordaan_-_Amsterdam_%2816820751926%29.jpg/1280px-Sunset_-_Canal_Jordaan_-_Amsterdam_%2816820751926%29.jpg',
  photo:     'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Good_Morning_Amsterdam_%28155128185%29.jpeg/1280px-Good_Morning_Amsterdam_%28155128185%29.jpeg',
};
SCENE_IMG.museum = SCENE_IMG.rijks;

function Photo({ scene = 'amsterdam', label, className = '', style = {}, showLabel = false, vignette = true, children }) {
  const s = SCENES[scene] || SCENES.amsterdam;
  const src = SCENE_IMG[scene] || SCENE_IMG.amsterdam;
  const [err, setErr] = React.useState(false);
  return (
    <div className={`photo ${vignette ? 'photo-vignette' : ''} ${className}`} style={{ background: s.bg, ...style }}>
      {src && !err
        ? <img src={src} alt={label || s.label} loading="lazy" onError={() => setErr(true)} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        : <><div className="photo-grain" />{s.glow && <div className="photo-glow" style={{ background: s.glow }} />}</>}
      {showLabel && <span className="photo-tag">◦ {label || s.label}</span>}
      {children}
    </div>
  );
}

/* ---- Logo ---- */
function Logo({ light = false, size = 22, onClick }) {
  const ink = light ? '#fff' : 'var(--ink)';
  return (
    <button onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 9, background: 'none' }}>
      <span style={{ width: size, height: size, borderRadius: 7, background: 'var(--green)', display: 'grid', placeItems: 'center', flex: 'none', boxShadow: '0 2px 8px rgba(0,196,106,.4)' }}>
        <span style={{ width: size * 0.34, height: size * 0.34, borderRadius: 3, background: '#04391f' }} />
      </span>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: size * 0.92, letterSpacing: '-0.03em', color: ink, lineHeight: 1 }}>
        Book&nbsp;&amp;&nbsp;Go&nbsp;AI
      </span>
    </button>
  );
}

/* ---- Icon: tiny inline set (simple geometry only) ---- */
function Icon({ name, size = 18, stroke = 2, color = 'currentColor' }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    chevron: <path d="m9 6 6 6-6 6" />,
    check: <path d="M20 6 9 17l-5-5" />,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    users: <><circle cx="9" cy="8" r="3.5" /><path d="M2 21a7 7 0 0 1 14 0" /><path d="M17 5a3.5 3.5 0 0 1 0 7M22 21a7 7 0 0 0-5-6.7" /></>,
    pin: <><path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" /></>,
    star: <path d="m12 3 2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.5 6.8 19l1-5.8L3.6 9.1l5.8-.8Z" />,
    bolt: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />,
    sparkle: <><path d="M12 3v6M12 15v6M3 12h6M15 12h6" /><path d="m6 6 3 3M15 15l3 3M18 6l-3 3M9 15l-3 3" /></>,
    heart: <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" />,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
    feed: <><path d="M4 4a16 16 0 0 1 16 16" /><path d="M4 11a9 9 0 0 1 9 9" /><circle cx="5" cy="19" r="1.6" fill={color} /></>,
    image: <><rect x="3" y="3" width="18" height="18" rx="2.5" /><circle cx="8.5" cy="8.5" r="1.8" /><path d="m21 16-5-5L5 21" /></>,
    queue: <><rect x="3" y="4" width="18" height="5" rx="1.5" /><rect x="3" y="12" width="18" height="5" rx="1.5" /></>,
    send: <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" />,
    chart: <><path d="M3 3v18h18" /><path d="M7 14l3-4 3 3 4-6" /></>,
    pulse: <path d="M3 12h4l2-7 4 14 2-7h6" />,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></>,
    x: <path d="M18 6 6 18M6 6l12 12" />,
    eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></>,
    edit: <><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></>,
    trend: <><path d="M3 17 9 11l4 4 8-8" /><path d="M15 7h6v6" /></>,
    play: <path d="M6 4v16l13-8Z" fill={color} stroke="none" />,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>,
    plus: <path d="M12 5v14M5 12h14" />,
    filter: <path d="M3 5h18l-7 8v6l-4-2v-4Z" />,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1.1" fill={color} stroke="none" /></>,
  };
  return <svg {...p}>{paths[name] || null}</svg>;
}

/* ---- Status badge ---- */
function StatusBadge({ status }) {
  const map = {
    pending:   { t: 'Pending Approval', bg: 'var(--status-pending-bg)', c: 'var(--status-pending)', dot: '#caa400' },
    approved:  { t: 'Approved',         bg: 'var(--status-approved-bg)', c: 'var(--status-approved)', dot: 'var(--green)' },
    scheduled: { t: 'Scheduled',        bg: 'var(--status-scheduled-bg)', c: 'var(--status-scheduled)', dot: 'var(--blue)' },
    published: { t: 'Published',        bg: 'var(--ink)', c: '#fff', dot: 'var(--green)' },
  };
  const m = map[status] || map.pending;
  return (
    <span className="badge" style={{ background: m.bg, color: m.c }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: m.dot }} />
      {m.t}
    </span>
  );
}

/* ---- Instagram creative (the social post format from reference B) ----
   Top ~60% photo, bottom ~40% bold quote on a bright solid color,
   BOOK & GO footer. Optional PUBLISHED badge top-left. ---- */
const POST_BG = {
  red:    { bg: '#ff4d3d', quote: 'var(--green-ink)', foot: 'rgba(17,77,58,.7)' },
  pink:   { bg: '#ff5fa2', quote: 'var(--green-ink)', foot: 'rgba(17,77,58,.7)' },
  yellow: { bg: '#ffd60a', quote: 'var(--green-ink)', foot: 'rgba(74,58,0,.65)' },
  blue:   { bg: '#1666ff', quote: '#eafaf1',          foot: 'rgba(255,255,255,.72)' },
  green:  { bg: '#00c46a', quote: 'var(--green-ink)', foot: 'rgba(4,57,31,.7)' },
};

function InstagramPost({ post, published = false, scale = 1 }) {
  const c = POST_BG[post.color] || POST_BG.red;
  return (
    <div style={{ width: '100%', aspectRatio: '4 / 5', borderRadius: 14, overflow: 'hidden', background: '#fff', boxShadow: 'var(--shadow-md)', display: 'flex', flexDirection: 'column', position: 'relative', containerType: 'inline-size' }}>
      {/* photo 58% */}
      <div style={{ flex: '0 0 58%', position: 'relative' }}>
        <Photo scene={post.scene} showLabel={false} vignette={false} style={{ height: '100%' }} />
        {published && (
          <span style={{ position: 'absolute', top: 12, left: 12, background: 'var(--ink)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 11 * 1, letterSpacing: '.12em', padding: '6px 10px', borderRadius: 6 }}>
            PUBLISHED
          </span>
        )}
      </div>
      {/* quote 42% */}
      <div style={{ flex: '1 1 42%', background: c.bg, padding: '7% 7% 6%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 900, lineHeight: .98, letterSpacing: '-0.03em', color: c.quote, fontSize: 'clamp(13px, 6.6cqw, 60px)' }}>
          <span style={{ opacity: .85 }}>“</span>{post.quote}<span style={{ opacity: .85 }}>”</span>
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6%' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(10px,3.4cqw,15px)', letterSpacing: '-0.02em', color: c.quote }}>Book&nbsp;&amp;&nbsp;Go</span>
          <span style={{ fontWeight: 700, fontSize: 'clamp(8px,2.6cqw,11px)', color: c.foot, letterSpacing: '.04em' }}>{post.handle || '@bookandgo.amsterdam'}</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { SCENES, Photo, Logo, Icon, StatusBadge, InstagramPost, POST_BG });
