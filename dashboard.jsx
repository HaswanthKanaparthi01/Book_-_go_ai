/* ============================================================
   BOOK & GO — AI Marketing Dashboard (shell + state + modules A)
   ============================================================ */

const { useState, useEffect, useRef } = React;

/* ---- Schedule modal ---- */
function ScheduleModal({ post, onClose, onConfirm }) {
  const now = new Date();
  const d = new Date(now.getTime() + 86400000);
  const [date, setDate] = useState(d.toISOString().slice(0, 10));
  const [time, setTime] = useState('18:00');
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()} style={{ padding: 30 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
          <div className="eyebrow">Schedule post</div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'var(--paper)' }}><Icon name="x" size={16} /></button>
        </div>
        <h3 className="display" style={{ fontSize: 26, margin: '0 0 4px' }}>{post.topic}</h3>
        <p style={{ color: 'var(--ink-2)', fontWeight: 500, fontSize: 14.5, margin: '0 0 22px' }}>Choose when this goes live on Instagram.</p>
        <div className="schedule-fields">
          <div className="field" style={{ flex: 1 }}><label>Publish date</label><input className="input" type="date" value={date} onChange={e => setDate(e.target.value)} /></div>
          <div className="field" style={{ flex: 1 }}><label>Publish time</label><input className="input" type="time" value={time} onChange={e => setTime(e.target.value)} /></div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button type="button" onClick={onClose} className="btn btn-ghost" style={{ flex: 1 }}>Cancel</button>
          <button type="button" onClick={() => onConfirm(date, time)} className="btn btn-blue" style={{ flex: 1 }}><Icon name="calendar" size={16} color="#fff" /> Confirm schedule</button>
        </div>
      </div>
    </div>
  );
}

function fmtSched(date, time) {
  const dt = new Date(`${date}T${time}`);
  const day = dt.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  const t = dt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  return { day, t };
}

/* ---- Sidebar ---- */
function DashSidebar({ tab, setTab, go, counts, onNavigate }) {
  const items = [
    ['overview', 'grid', 'Overview'],
    ['trending', 'trend', 'Trending Feed'],
    ['agents', 'globe', 'AI Agents'],
    ['queue', 'queue', 'Approval Queue', counts.pending],
    ['scheduled', 'calendar', 'Scheduled', counts.scheduled],
    ['analytics', 'chart', 'Analytics'],
    ['monitoring', 'pulse', 'Live Monitoring'],
  ];
  return (
    <aside style={{ width: 256, flex: 'none', background: 'var(--ink)', color: '#fff', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh' }} className="dash-side" aria-label="Dashboard navigation">
      <div style={{ padding: '22px 22px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <Logo light size={20} onClick={() => { onNavigate?.(); go('home'); }} />
        <button type="button" className="dash-menu-btn dash-side-close" onClick={onNavigate} aria-label="Close menu" style={{ display: 'grid', background: 'rgba(255,255,255,.1)', boxShadow: 'none' }}>
          <Icon name="x" size={18} color="#fff" />
        </button>
      </div>
      <div style={{ padding: '0 14px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, background: 'rgba(255,255,255,.07)', borderRadius: 12, padding: '11px 13px' }}>
          <span style={{ position: 'relative', width: 9, height: 9 }}>
            <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--green)' }} />
            <span style={{ position: 'absolute', inset: -3, borderRadius: '50%', background: 'var(--green)', opacity: .4, animation: 'ping 1.6s ease-out infinite' }} />
          </span>
          <span style={{ fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap' }}>Live Monitoring Active</span>
        </div>
      </div>
      <nav style={{ flex: 1, padding: '6px 14px', display: 'flex', flexDirection: 'column', gap: 3, overflowY: 'auto' }} className="no-scrollbar">
        {items.map(([id, ic, label, badge]) => {
          const on = tab === id;
          return (
            <button key={id} onClick={() => { setTab(id); onNavigate?.(); }} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 13px', borderRadius: 11, background: on ? '#fff' : 'transparent', color: on ? 'var(--ink)' : 'rgba(255,255,255,.72)', fontWeight: 700, fontSize: 14.5, transition: 'all .15s', width: '100%', textAlign: 'left' }}>
              <Icon name={ic} size={18} color={on ? 'var(--green-ink)' : 'rgba(255,255,255,.6)'} />
              <span style={{ flex: 1 }}>{label}</span>
              {badge > 0 && <span style={{ background: on ? 'var(--green)' : 'var(--green)', color: '#04391f', fontWeight: 800, fontSize: 12, minWidth: 21, height: 21, borderRadius: 999, display: 'grid', placeItems: 'center', padding: '0 6px' }}>{badge}</span>}
            </button>
          );
        })}
      </nav>
      <div style={{ padding: 14, borderTop: '1px solid rgba(255,255,255,.1)' }}>
        <button onClick={() => go('home')} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,.6)', fontWeight: 700, fontSize: 14, padding: '6px 4px', whiteSpace: 'nowrap' }}>
          <span style={{ transform: 'scaleX(-1)', display: 'inline-flex' }}><Icon name="arrow" size={16} color="rgba(255,255,255,.6)" /></span> Back to site
        </button>
      </div>
    </aside>
  );
}

/* ---- Topbar ---- */
function DashTopbar({ title, subtitle, action, onMenuOpen }) {
  return (
    <div className="dash-topbar">
      <button type="button" className="dash-menu-btn" onClick={onMenuOpen} aria-label="Open menu">
        <Icon name="grid" size={20} color="var(--ink)" />
      </button>
      <div className="dash-topbar-head">
        <h1 className="display dash-topbar-title">{title}</h1>
        {subtitle && <p style={{ margin: '6px 0 0', color: 'var(--ink-2)', fontWeight: 500, fontSize: 15, lineHeight: 1.4 }}>{subtitle}</p>}
      </div>
      {action && <div className="dash-topbar-actions">{action}</div>}
    </div>
  );
}

/* ---- Overview ---- */
function Overview({ api, setTab }) {
  const { posts } = api;
  const c = {
    published: posts.filter(p => p.status === 'published').length,
    pending: posts.filter(p => p.status === 'pending').length,
    approved: posts.filter(p => p.status === 'approved').length,
    scheduled: posts.filter(p => p.status === 'scheduled').length,
  };
  const stats = [
    { k: 'Posts published', v: c.published, ic: 'instagram', accent: 'var(--green)', bg: 'var(--green-soft)', delta: '+3 this week' },
    { k: 'Pending approval', v: c.pending, ic: 'queue', accent: '#caa400', bg: 'var(--status-pending-bg)', delta: 'awaiting review' },
    { k: 'Scheduled', v: c.scheduled, ic: 'calendar', accent: 'var(--blue)', bg: 'var(--blue-soft)', delta: 'queued to post' },
    { k: 'Est. reach', v: '128k', ic: 'globe', accent: 'var(--ink)', bg: 'var(--paper)', delta: '+18% vs last 30d' },
  ];
  return (
    <div className="dash-content">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 22 }} className="grid-4">
        {stats.map(s => (
          <div key={s.k} className="card" style={{ padding: 22 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
              <span style={{ width: 40, height: 40, borderRadius: 11, background: s.bg, display: 'grid', placeItems: 'center' }}><Icon name={s.ic} size={20} color={s.accent} /></span>
            </div>
            <div className="display" style={{ fontSize: 40, lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontWeight: 700, fontSize: 14.5, marginTop: 6 }}>{s.k}</div>
            <div style={{ color: 'var(--ink-3)', fontWeight: 600, fontSize: 12.5, marginTop: 2 }}>{s.delta}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16 }} className="ov-grid">
        {/* automation pipeline */}
        <div className="card" style={{ padding: 26 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h3 className="display" style={{ fontSize: 22, margin: 0 }}>Automation pipeline</h3>
            <button onClick={() => setTab('generator')} className="btn btn-green btn-sm"><Icon name="sparkle" size={14} color="#04391f" /> Generate</button>
          </div>
          <div className="pipeline-row">
            {[['trend', 'Trend detected', 'var(--yellow)'], ['sparkle', 'AI generates', 'var(--green)'], ['queue', 'Pending review', '#caa400'], ['check', 'Approved', 'var(--green)'], ['calendar', 'Scheduled', 'var(--blue)'], ['send', 'Published', 'var(--ink)']].map(([ic, t, col], i, arr) => (
              <React.Fragment key={t}>
                <div className="pipeline-step" style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ width: 46, height: 46, borderRadius: '50%', background: '#fff', boxShadow: 'inset 0 0 0 2px var(--line)', display: 'grid', placeItems: 'center', margin: '0 auto 10px' }}><Icon name={ic} size={20} color={col === 'var(--ink)' ? 'var(--ink)' : col} /></div>
                  <div style={{ fontWeight: 700, fontSize: 12, lineHeight: 1.2 }}>{t}</div>
                </div>
                {i < arr.length - 1 && <div className="wf-arrow"><Icon name="chevron" size={16} color="var(--line-2)" /></div>}
              </React.Fragment>
            ))}
          </div>
          <div style={{ marginTop: 22, padding: 16, background: 'var(--green-soft)', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
            <Icon name="bolt" size={20} color="var(--green-ink)" />
            <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: 'var(--green-ink)' }}>AI never posts automatically. Every creative waits for your approval before it can be scheduled or published.</p>
          </div>
        </div>

        {/* live monitor mini */}
        <div className="card" style={{ padding: 26 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <span style={{ position: 'relative', width: 9, height: 9 }}><span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--green)' }} /><span style={{ position: 'absolute', inset: -3, borderRadius: '50%', background: 'var(--green)', opacity: .4, animation: 'ping 1.6s ease-out infinite' }} /></span>
            <h3 className="display" style={{ fontSize: 22, margin: 0 }}>Monitoring</h3>
          </div>
          {[['Instagram', '48.2k signals'], ['Travel influencers', '1.2k tracked'], ['Travel blogs', '340 sources'], ['Travel discussions', '8.7k threads'], ['Tourism trends', 'live index']].map(([s, n]) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--line)' }}>
              <span style={{ fontWeight: 700, fontSize: 14 }}>{s}</span>
              <span style={{ color: 'var(--ink-3)', fontWeight: 600, fontSize: 12.5 }}>{n}</span>
            </div>
          ))}
          <button onClick={() => setTab('monitoring')} className="seelink" style={{ fontSize: 14, marginTop: 14 }}>Open live feed <Icon name="chevron" size={13} color="var(--green)" /></button>
        </div>
      </div>

      {/* trending row */}
      <div style={{ marginTop: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h3 className="display" style={{ fontSize: 22, margin: 0 }}>Trending now</h3>
          <button onClick={() => setTab('trending')} className="seelink" style={{ fontSize: 14 }}>All topics <Icon name="chevron" size={13} color="var(--green)" /></button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }} className="grid-4">
          {TRENDS.slice(0, 4).map(t => (
            <button key={t.id} onClick={() => api.createPost(t)} className="card dcard" style={{ overflow: 'hidden', textAlign: 'left' }}>
              <div style={{ height: 96 }}><Photo scene={t.scene} showLabel={false} style={{ height: '100%' }} /></div>
              <div style={{ padding: '14px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ color: 'var(--green-ink)', fontWeight: 800, fontSize: 13 }}>{t.growth}</span>
                  <span style={{ color: 'var(--ink-3)', fontWeight: 600, fontSize: 12 }}>{t.volume}</span>
                </div>
                <div style={{ fontWeight: 800, fontSize: 15, lineHeight: 1.15 }}>{t.topic}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- Trending Feed ---- */
function TrendingFeed({ api }) {
  const [filter, setFilter] = useState('all');
  const sources = ['all', ...Array.from(new Set(TRENDS.map(t => t.platform)))];
  const filtered = filter === 'all' ? TRENDS : TRENDS.filter(t => t.platform === filter);

  return (
    <div className="dash-content">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--ink-3)', marginBottom: 6 }}>Trending insights</div>
          <h2 className="display" style={{ fontSize: 28, margin: 0 }}>Live travel topics shaping this week</h2>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {sources.map(src => (
            <button key={src} type="button" onClick={() => setFilter(src)} className="chip" style={{ background: filter === src ? 'var(--ink)' : '#fff', color: filter === src ? '#fff' : 'var(--ink)', boxShadow: filter === src ? 'none' : 'inset 0 0 0 1.5px var(--line)' }}>{src}</button>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
        {filtered.map(t => (
          <div key={t.id} className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', minHeight: 150 }}>
              <Photo scene={t.scene} showLabel={false} style={{ height: '100%', width: '100%' }} />
              <span className="chip" style={{ position: 'absolute', top: 14, left: 14, background: 'rgba(255,255,255,.9)', color: 'var(--ink)', boxShadow: 'none' }}><Icon name="trend" size={13} /> {t.platform}</span>
              <span style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(0,0,0,.65)', color: '#fff', fontWeight: 700, fontSize: 12, padding: '6px 10px', borderRadius: 999 }}>🔥 {t.heat}</span>
            </div>
            <div style={{ padding: '18px 20px 22px', display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
              <div>
                <h3 className="display" style={{ fontSize: 20, margin: '0 0 10px' }}>{t.topic}</h3>
                <p style={{ color: 'var(--ink-2)', fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>This trend is accelerating on {t.platform}, making it a strong candidate for new campaign creative and influencer storytelling.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 13.5, fontWeight: 700 }}>
                <div style={{ padding: 12, borderRadius: 14, background: 'var(--green-soft)' }}><div>{t.growth}</div><div style={{ color: 'var(--green-ink)', fontWeight: 600, marginTop: 4 }}>7 day momentum</div></div>
                <div style={{ padding: 12, borderRadius: 14, background: 'var(--paper)' }}><div>{t.volume}</div><div style={{ color: 'var(--ink-3)', fontWeight: 600, marginTop: 4 }}>mentions</div></div>
              </div>
              <div style={{ height: 8, borderRadius: 999, background: 'var(--line)' }}>
                <div style={{ width: `${t.heat}%`, height: '100%', background: t.heat > 85 ? 'var(--green)' : t.heat > 65 ? 'var(--yellow)' : 'var(--blue)', borderRadius: 999 }} />
              </div>
              <button type="button" onClick={() => api.createPost(t)} className="btn btn-green" style={{ width: '100%' }}><Icon name="sparkle" size={15} color="#04391f" /> Build campaign</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Live Monitoring ---- */
const FEED_SEED = [
  { src: 'Instagram', who: '@amsterdam.hidden', txt: 'reels of quiet Jordaan canals hitting 2M views', scene: 'canals', topic: 'Hidden Amsterdam Canals' },
  { src: 'Influencer', who: '@evyandhelleke', txt: 'posted "sunset at NEMO rooftop" — 41k likes', scene: 'sunset', topic: 'Best Sunset Spots' },
  { src: 'Travel blog', who: 'DutchReview', txt: 'published "Keukenhof opens 20 March" guide', scene: 'tulips', topic: 'Keukenhof Season' },
  { src: 'Discussion', who: 'r/Amsterdam', txt: '"best night out in Noord?" — 312 comments', scene: 'nightlife', topic: 'Amsterdam Nightlife' },
  { src: 'Instagram', who: '@giethoorn.nl', txt: 'whisper-boat clip trending in #hiddenholland', scene: 'giethoorn', topic: 'Giethoorn Day Trip' },
  { src: 'Influencer', who: '@cyclingdutch', txt: 'mapped a 30km canal loop — saved 18k times', scene: 'cycling', topic: 'Amsterdam Cycling Routes' },
  { src: 'Travel blog', who: 'TimeOut AMS', txt: 'ranked Van Gogh "the quiet-hour visit"', scene: 'vangogh', topic: 'Van Gogh Museum' },
];

function LiveMonitoring({ api }) {
  const [feed, setFeed] = useState(() => FEED_SEED.slice(0, 4).map((f, i) => ({ ...f, id: 'f' + i, ago: (i + 1) * 7 + 's ago' })));
  const idx = useRef(4);
  const sources = Array.from(new Set(feed.map(f => f.src)));
  const trendingCount = feed.filter(f => f.src === 'Instagram' || f.src === 'Influencer').length;

  useEffect(() => {
    const iv = setInterval(() => {
      const next = FEED_SEED[idx.current % FEED_SEED.length];
      idx.current++;
      setFeed(f => [{ ...next, id: 'f' + idx.current, ago: 'just now' }, ...f.map(x => ({ ...x, ago: bumpAgo(x.ago) }))].slice(0, 9));
    }, 3200);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="dash-content">
      <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 320px', gap: 20 }} className="ov-grid">
        <div className="card" style={{ padding: 26 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <span style={{ position: 'relative', width: 10, height: 10 }}><span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--green)' }} /><span style={{ position: 'absolute', inset: -4, borderRadius: '50%', background: 'var(--green)', opacity: .4, animation: 'ping 1.6s ease-out infinite' }} /></span>
            <h3 className="display" style={{ fontSize: 22, margin: 0 }}>Live signal feed</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
            <div style={{ padding: 16, background: 'var(--green-soft)', borderRadius: 16 }}>
              <div style={{ color: 'var(--ink-3)', fontSize: 13, marginBottom: 6 }}>Active signals</div>
              <div style={{ fontWeight: 800, fontSize: 24 }}>{feed.length}</div>
            </div>
            <div style={{ padding: 16, background: 'var(--paper)', borderRadius: 16 }}>
              <div style={{ color: 'var(--ink-3)', fontSize: 13, marginBottom: 6 }}>Sources tracked</div>
              <div style={{ fontWeight: 800, fontSize: 24 }}>{sources.length}</div>
            </div>
            <div style={{ padding: 16, background: 'var(--yellow-soft)', borderRadius: 16 }}>
              <div style={{ color: 'var(--status-pending)', fontSize: 13, marginBottom: 6 }}>Hot conversation</div>
              <div style={{ fontWeight: 800, fontSize: 24 }}>{trendingCount}</div>
            </div>
            <div style={{ padding: 16, background: 'var(--paper)', borderRadius: 16 }}>
              <div style={{ color: 'var(--ink-3)', fontSize: 13, marginBottom: 6 }}>Human review</div>
              <div style={{ fontWeight: 800, fontSize: 24 }}>Always on</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {feed.map(f => (
              <div key={f.id} className="fade-up monitor-feed-item">
                <span style={{ width: 46, height: 46, borderRadius: 12, overflow: 'hidden', flex: 'none' }}><Photo scene={f.scene} showLabel={false} style={{ height: '100%' }} /></span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                    <span className="badge" style={{ background: '#fff', color: 'var(--ink-2)', padding: '4px 9px', fontSize: 11 }}>{f.src}</span>
                    <span style={{ fontWeight: 700, fontSize: 13.5 }}>{f.who}</span>
                  </div>
                  <div style={{ color: 'var(--ink-2)', fontWeight: 500, fontSize: 13.5, marginTop: 6, lineHeight: 1.5 }}>{f.txt}</div>
                </div>
                <div className="monitor-feed-actions">
                  <span style={{ color: 'var(--ink-3)', fontWeight: 700, fontSize: 12 }}>{f.ago}</span>
                  <button type="button" onClick={() => api.createPost({ id: 'monitor-' + f.id, topic: f.topic, scene: f.scene })} className="btn btn-ghost btn-sm">Create post</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card" style={{ padding: 24, alignSelf: 'start' }}>
          <h3 className="display" style={{ fontSize: 20, margin: '0 0 16px' }}>Sources monitored</h3>
          {[['Instagram', 'instagram', 96], ['Travel influencers', 'star', 88], ['Travel blogs', 'feed', 74], ['Travel discussions', 'users', 81], ['Tourism trends', 'trend', 92]].map(([s, ic, v]) => (
            <div key={s} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 13.5 }}><Icon name={ic} size={15} color="var(--green-ink)" /> {s}</span>
                <span style={{ color: 'var(--ink-3)', fontWeight: 700, fontSize: 12 }}>{v}%</span>
              </div>
              <div style={{ height: 6, borderRadius: 999, background: 'var(--line)' }}><div style={{ height: '100%', width: v + '%', background: 'var(--green)', borderRadius: 999 }} /></div>
            </div>
          ))}
          <div style={{ marginTop: 24, padding: 16, background: 'var(--green-soft)', borderRadius: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8 }}>Signal health</div>
            <p style={{ margin: 0, color: 'var(--green-ink)', fontSize: 14, lineHeight: 1.6 }}>The dashboard tracks live social buzz from Instagram, influencers and travel blogs so agents can act on the hottest stories.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
function bumpAgo(a) { if (a === 'just now') return '3s ago'; const n = parseInt(a) || 3; return (n + 4) + 's ago'; }

/* ---- Analytics ---- */
function Analytics({ api }) {
  const bars = [['Mon', 42], ['Tue', 58], ['Wed', 71], ['Thu', 64], ['Fri', 88], ['Sat', 96], ['Sun', 79]];
  const top = api.posts.filter(p => p.status === 'published' || p.status === 'approved').slice(0, 3);
  const metrics = [['Total reach', '128.4k', '+18%'], ['Engagement rate', '6.8%', '+1.2pt'], ['Saves', '9.3k', '+24%'], ['Profile visits', '14.1k', '+11%']];
  return (
    <div className="dash-content">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 22 }} className="grid-4">
        {metrics.map(([k, v, d]) => (
          <div key={k} className="card" style={{ padding: 22 }}>
            <div style={{ color: 'var(--ink-2)', fontWeight: 700, fontSize: 13.5 }}>{k}</div>
            <div className="display" style={{ fontSize: 36, margin: '8px 0 2px' }}>{v}</div>
            <div style={{ color: 'var(--green-ink)', fontWeight: 800, fontSize: 13 }}>{d} vs last 30d</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16 }} className="ov-grid">
        <div className="card" style={{ padding: 26 }}>
          <h3 className="display" style={{ fontSize: 22, margin: '0 0 24px' }}>Reach this week</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, height: 220 }}>
            {bars.map(([d, v]) => (
              <div key={d} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ width: '100%', maxWidth: 46, height: v + '%', background: v > 85 ? 'var(--green)' : 'var(--green-soft)', borderRadius: '8px 8px 0 0', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: 6 }}>
                  <span style={{ fontWeight: 800, fontSize: 12, color: v > 85 ? '#04391f' : 'var(--green-ink)' }}>{v}</span>
                </div>
                <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--ink-3)' }}>{d}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card" style={{ padding: 26 }}>
          <h3 className="display" style={{ fontSize: 22, margin: '0 0 18px' }}>Top performing</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {top.map((p, i) => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span className="display" style={{ fontSize: 24, color: 'var(--ink-3)', width: 24 }}>{i + 1}</span>
                <span style={{ width: 44, height: 54, borderRadius: 8, overflow: 'hidden', flex: 'none' }}><Photo scene={p.scene} showLabel={false} style={{ height: '100%' }} /></span>
                <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontWeight: 800, fontSize: 14, lineHeight: 1.15 }}>{p.topic}</div><div style={{ color: 'var(--ink-3)', fontWeight: 600, fontSize: 12.5, marginTop: 2 }}>{(18 - i * 4)}.{i}k reach · {(8 - i)}.{2 + i}% eng</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ScheduleModal, fmtSched, DashSidebar, DashTopbar, Overview, TrendingFeed, LiveMonitoring, Analytics });
