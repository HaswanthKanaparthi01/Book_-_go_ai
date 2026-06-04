/* ============================================================
   BOOK & GO — Dashboard root + modules B (generator, queue, scheduled)
   ============================================================ */

/* ---- AI Generator ---- */
const GEN_STEPS = ['Analysing trend signals…', 'Matching topic-specific imagery…', 'Writing headline & caption…', 'Selecting hashtags…', 'Composing the Instagram creative…'];

function Generator({ api }) {
  const trend = api.draft;
  const [phase, setPhase] = useState(trend ? 'loading' : 'idle');
  const [step, setStep] = useState(0);
  const [result, setResult] = useState(null);
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    if (!trend) { setPhase('idle'); return; }
    setPhase('loading'); setStep(0); setResult(null);
    let s = 0;
    const iv = setInterval(() => {
      s++; setStep(s);
      if (s >= GEN_STEPS.length) {
        clearInterval(iv);
        const r = buildPost(trend);
        setResult(r); setEdit(r); setPhase('done');
      }
    }, 620);
    return () => clearInterval(iv);
  }, [trend && trend.id]);

  if (phase === 'idle' || !trend) return (
    <div className="dash-content">
      <div className="card" style={{ padding: 40, textAlign: 'center' }}>
        <span style={{ width: 64, height: 64, borderRadius: 16, background: 'var(--green-soft)', display: 'grid', placeItems: 'center', margin: '0 auto 18px' }}><Icon name="sparkle" size={30} color="var(--green-ink)" /></span>
        <h3 className="display" style={{ fontSize: 26, margin: '0 0 8px' }}>Pick a trend to generate</h3>
        <p style={{ color: 'var(--ink-2)', fontWeight: 500, fontSize: 15, margin: '0 0 24px' }}>The AI writes the headline, caption, hashtags and Instagram creative — matched to the topic’s imagery.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 12, maxWidth: 760, margin: '0 auto' }}>
          {TRENDS.slice(0, 6).map(t => (
            <button key={t.id} onClick={() => api.startGenerate(t)} className="card dcard" style={{ overflow: 'hidden', textAlign: 'left' }}>
              <div style={{ height: 76 }}><Photo scene={t.scene} showLabel={false} style={{ height: '100%' }} /></div>
              <div style={{ padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontWeight: 800, fontSize: 13.5 }}>{t.topic}</span><Icon name="arrow" size={15} color="var(--green)" /></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  if (phase === 'loading' && trend) return (
    <div className="dash-content">
      <div className="card gen-loading-grid" style={{ padding: 0, overflow: 'hidden', maxWidth: 920, margin: '0 auto' }}>
        <div style={{ position: 'relative' }}><Photo scene={trend.scene} showLabel={false} style={{ height: '100%', minHeight: 420 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,12,10,.35)', display: 'grid', placeItems: 'center' }}>
            <div style={{ width: 60, height: 60, border: '4px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.9s linear infinite' }} />
          </div>
        </div>
        <div style={{ padding: 36 }}>
          <span className="chip" style={{ marginBottom: 16 }}><Icon name="trend" size={13} /> {trend.topic}</span>
          <h3 className="display" style={{ fontSize: 26, margin: '0 0 24px' }}>Generating creative…</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {GEN_STEPS.map((s, i) => {
              const done = i < step, active = i === step;
              return (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 12, opacity: i <= step ? 1 : .4, transition: 'opacity .3s' }}>
                  <span style={{ width: 24, height: 24, borderRadius: '50%', flex: 'none', background: done ? 'var(--green)' : active ? 'var(--green-soft)' : 'var(--line)', display: 'grid', placeItems: 'center' }}>
                    {done ? <Icon name="check" size={13} color="#04391f" /> : active ? <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', animation: 'pulse2 1s ease infinite' }} /> : null}
                  </span>
                  <span style={{ fontWeight: 700, fontSize: 14.5 }}>{s}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  // done
  const setE = (k, v) => setEdit(e => ({ ...e, [k]: v }));
  return (
    <div className="dash-content">
      <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 28, maxWidth: 1080, margin: '0 auto', alignItems: 'start' }} className="gen-grid">
        <div>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Instagram preview</div>
          <InstagramPost post={edit} />
          <div style={{ display: 'flex', gap: 6, marginTop: 14, justifyContent: 'center' }}>
            {Object.keys(POST_BG).map(col => (
              <button key={col} onClick={() => setE('color', col)} title={col} style={{ width: 26, height: 26, borderRadius: '50%', background: POST_BG[col].bg, boxShadow: edit.color === col ? '0 0 0 2.5px #fff, 0 0 0 4.5px var(--ink)' : 'inset 0 0 0 1px rgba(0,0,0,.1)' }} />
            ))}
          </div>
        </div>
        <div className="card" style={{ padding: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <span className="chip" style={{ background: 'var(--green-soft)', boxShadow: 'none', color: 'var(--green-ink)' }}><Icon name="sparkle" size={13} color="var(--green-ink)" /> AI generated</span>
            <button onClick={() => api.startGenerate(trend)} style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, fontSize: 13.5, color: 'var(--ink-2)' }}><Icon name="bolt" size={15} /> Regenerate</button>
          </div>
          <h3 className="display" style={{ fontSize: 24, margin: '14px 0 18px' }}>{trend.topic}</h3>
          <div className="field" style={{ marginBottom: 16 }}><label>Headline</label><input className="input" value={edit.headline} onChange={e => setE('headline', e.target.value)} /></div>
          <div className="field" style={{ marginBottom: 16 }}><label>Quote (on creative)</label><input className="input" value={edit.quote} onChange={e => setE('quote', e.target.value)} /></div>
          <div className="field" style={{ marginBottom: 16 }}><label>Caption</label><textarea className="input" rows={4} value={edit.caption} onChange={e => setE('caption', e.target.value)} style={{ resize: 'vertical', fontFamily: 'var(--font-text)' }} /></div>
          <div className="field" style={{ marginBottom: 22 }}><label>Hashtags</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>{edit.hashtags.map(h => <span key={h} className="chip" style={{ background: 'var(--blue-soft)', color: 'var(--blue)', boxShadow: 'none', fontSize: 12.5 }}>{h}</span>)}</div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => api.cancelDraft()} className="btn btn-ghost"><Icon name="x" size={15} /> Cancel</button>
            <button onClick={() => { api.addPost({ ...edit, status: 'pending' }); }} className="btn btn-green" style={{ flex: 1 }}><Icon name="queue" size={16} color="#04391f" /> Send to approval queue</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function buildPost(trend) {
  const tpl = POST_TEMPLATES[trend.topic];
  const seed = SEED_POSTS.find(p => p.topic === trend.topic);
  const base = seed || tpl || {};
  return {
    id: 'gen-' + Date.now(), topic: trend.topic, scene: trend.scene,
    color: base.color || 'red',
    headline: base.headline || `${trend.topic}, the local way`,
    quote: base.quote || `Discover ${trend.topic.toLowerCase()} like an Amsterdammer.`,
    caption: base.caption || `Trending now: ${trend.topic}. Here’s how Book & Go does it differently. ✨`,
    hashtags: base.hashtags || ['#Amsterdam', '#BookAndGo', '#VisitAmsterdam', '#Travel'],
  };
}

/* ---- Approval Queue card (the visual card, not a table) ---- */
function PostCard({ post, api }) {
  const { status } = post;
  return (
    <div className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div className="post-card-inner">
        <div className="post-card-preview"><InstagramPost post={post} published={status === 'published'} /></div>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 8 }}>
            <span className="chip" style={{ boxShadow: 'none', background: 'var(--paper)', fontSize: 12 }}><Icon name="trend" size={12} /> {post.topic}</span>
            <StatusBadge status={status} />
          </div>
          <h3 className="display" style={{ fontSize: 19, margin: '0 0 8px', lineHeight: 1.05 }}>{post.headline}</h3>
          <p style={{ margin: '0 0 10px', color: 'var(--ink-2)', fontWeight: 500, fontSize: 13.5, lineHeight: 1.45, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.caption}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 12 }}>
            {post.hashtags.slice(0, 4).map(h => <span key={h} style={{ color: 'var(--blue)', fontWeight: 700, fontSize: 12 }}>{h}</span>)}
          </div>

          {status === 'scheduled' && post.sched && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: 'var(--blue-soft)', borderRadius: 10, marginBottom: 12 }}>
              <Icon name="calendar" size={15} color="var(--blue)" />
              <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--status-scheduled)' }}>Scheduled for {post.sched.day} · {post.sched.t}</span>
            </div>
          )}
          {status === 'published' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: 'var(--green-soft)', borderRadius: 10, marginBottom: 12 }}>
              <Icon name="check" size={15} color="var(--green-ink)" />
              <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--green-ink)' }}>Published to Instagram · {post.publishedAt}</span>
            </div>
          )}

          <div style={{ marginTop: 'auto', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {status === 'pending' && <>
              <button onClick={() => api.approve(post.id)} className="btn btn-green btn-sm"><Icon name="check" size={15} color="#04391f" /> Approve</button>
              <button onClick={() => api.openSchedule(post.id)} className="btn btn-ghost btn-sm"><Icon name="calendar" size={15} /> Schedule</button>
              <button onClick={() => api.publish(post.id)} className="btn btn-ink btn-sm"><Icon name="send" size={14} color="#fff" /> Publish</button>
              <button onClick={() => api.cancel(post.id)} className="btn btn-sm" style={{ color: '#c0392b', boxShadow: 'inset 0 0 0 1.5px #f0c9c4', background: '#fff' }}><Icon name="x" size={14} color="#c0392b" /> Cancel</button>
            </>}
            {status === 'approved' && <>
              <button onClick={() => api.openSchedule(post.id)} className="btn btn-blue btn-sm"><Icon name="calendar" size={15} color="#fff" /> Schedule</button>
              <button onClick={() => api.publish(post.id)} className="btn btn-ink btn-sm"><Icon name="send" size={14} color="#fff" /> Publish now</button>
              <button onClick={() => api.cancel(post.id)} className="btn btn-sm" style={{ color: '#c0392b', boxShadow: 'inset 0 0 0 1.5px #f0c9c4', background: '#fff' }}><Icon name="x" size={14} color="#c0392b" /> Cancel</button>
            </>}
            {status === 'scheduled' && <>
              <button onClick={() => api.openSchedule(post.id)} className="btn btn-ghost btn-sm"><Icon name="edit" size={14} /> Edit schedule</button>
              <button onClick={() => api.publish(post.id)} className="btn btn-ink btn-sm"><Icon name="send" size={14} color="#fff" /> Publish now</button>
              <button onClick={() => api.cancel(post.id)} className="btn btn-sm" style={{ color: '#c0392b', boxShadow: 'inset 0 0 0 1.5px #f0c9c4', background: '#fff' }}><Icon name="x" size={14} color="#c0392b" /> Cancel</button>
            </>}
            {status === 'published' && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 800, fontSize: 14, color: 'var(--green-ink)' }}><span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--green)', display: 'grid', placeItems: 'center' }}><Icon name="check" size={13} color="#04391f" /></span> Published to Instagram</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Approval Queue ---- */
function ApprovalQueue({ api }) {
  const [filter, setFilter] = useState('all');
  const filters = [['all', 'All'], ['pending', 'Pending'], ['approved', 'Approved'], ['scheduled', 'Scheduled'], ['published', 'Published']];
  const list = api.posts.filter(p => filter === 'all' ? true : p.status === filter);
  return (
    <div className="dash-content">
      <div style={{ display: 'flex', gap: 8, marginBottom: 22, flexWrap: 'wrap' }}>
        {filters.map(([id, label]) => {
          const on = filter === id; const n = id === 'all' ? api.posts.length : api.posts.filter(p => p.status === id).length;
          return <button key={id} onClick={() => setFilter(id)} className="chip" style={{ background: on ? 'var(--ink)' : '#fff', color: on ? '#fff' : 'var(--ink)', boxShadow: on ? 'none' : 'inset 0 0 0 1.5px var(--line)', cursor: 'pointer' }}>{label} <span style={{ opacity: .6 }}>{n}</span></button>;
        })}
      </div>
      {list.length === 0 ? (
        <div className="card" style={{ padding: 48, textAlign: 'center', color: 'var(--ink-3)', fontWeight: 600 }}>Nothing here yet.</div>
      ) : (
        <div className="queue-grid">
          {list.map(p => <PostCard key={p.id} post={p} api={api} />)}
        </div>
      )}
    </div>
  );
}

/* ---- Generated Posts (gallery) ---- */
function GeneratedPosts({ api }) {
  return (
    <div className="dash-content">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
        {api.posts.map(p => (
          <div key={p.id}>
            <InstagramPost post={p} published={p.status === 'published'} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
              <span style={{ fontWeight: 800, fontSize: 13.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.topic}</span>
              <StatusBadge status={p.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Scheduled Posts ---- */
function ScheduledPosts({ api }) {
  const list = api.posts.filter(p => p.status === 'scheduled');
  return (
    <div className="dash-content">
      {list.length === 0 ? (
        <div className="card" style={{ padding: 48, textAlign: 'center' }}>
          <Icon name="calendar" size={32} color="var(--ink-3)" />
          <h3 className="display" style={{ fontSize: 22, margin: '14px 0 6px' }}>No scheduled posts</h3>
          <p style={{ color: 'var(--ink-2)', fontWeight: 500, margin: '0 0 18px' }}>Approve a post and schedule it to see it here.</p>
          <button onClick={() => api.setTab('queue')} className="btn btn-green btn-sm" style={{ display: 'inline-flex' }}>Open approval queue</button>
        </div>
      ) : (
        <div className="queue-grid">
          {list.map(p => <PostCard key={p.id} post={p} api={api} />)}
        </div>
      )}
    </div>
  );
}

/* ---- Dashboard root ---- */
function Dashboard({ go, toast }) {
  const [posts, setPosts] = useState(() => SEED_POSTS.map(p => ({ ...p })));
  const [tab, setTab] = useState('overview');
  const [draft, setDraft] = useState(null);
  const [scheduleId, setScheduleId] = useState(null);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dash-nav-open', navOpen);
    return () => document.body.classList.remove('dash-nav-open');
  }, [navOpen]);

  const update = (id, patch) => setPosts(ps => ps.map(p => p.id === id ? { ...p, ...patch } : p));
  const approve = id => { update(id, { status: 'approved' }); toast('Post approved and ready for publishing'); };
  const openSchedule = id => setScheduleId(id);
  const confirmSchedule = (date, time) => { const s = fmtSched(date, time); update(scheduleId, { status: 'scheduled', sched: s }); setScheduleId(null); toast('Post scheduled successfully'); };
  const publish = id => { const t = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }); update(id, { status: 'published', publishedAt: 'Today at ' + t }); toast('Published to Instagram'); };
  const startGenerate = trend => { setDraft(trend); setTab('generator'); };
  const cancelDraft = () => { setDraft(null); toast('Draft discarded'); };
  const createPost = trend => { const p = buildPost(trend); setPosts(ps => [{ ...p, status: 'pending' }, ...ps]); setTab('queue'); toast('Post created and sent to Approval Queue'); };
  const cancel = id => { setPosts(ps => ps.filter(p => p.id !== id)); toast('Post cancelled'); };
  const addPost = post => { setPosts(ps => [{ ...post }, ...ps]); setDraft(null); setTab('queue'); toast('Creative added to approval queue'); };

  const api = { posts, approve, openSchedule, confirmSchedule, publish, startGenerate, cancelDraft, createPost, cancel, addPost, update, draft, setTab, toast };
  const counts = { pending: posts.filter(p => p.status === 'pending').length, scheduled: posts.filter(p => p.status === 'scheduled').length };

  const titles = {
    overview: ['Overview', 'Your AI marketing command centre'],
    trending: ['Trending Feed', 'Live travel trends, ranked by momentum'],
    agents: ['AI Agents', 'Cloud-managed agents reading feeds and generating content'],
    queue: ['Approval Queue', 'Review every creative before it goes live'],
    scheduled: ['Scheduled Posts', 'Queued and ready to publish'],
    analytics: ['Analytics', 'Performance across published content'],
    monitoring: ['Live Monitoring', 'What the system is watching right now'],
  };
  const [tt, ts] = titles[tab];

  const scheduleTarget = posts.find(p => p.id === scheduleId);

  return (
    <div className={`dash-layout${navOpen ? ' dash-nav-open' : ''}`} style={{ background: 'var(--paper)' }}>
      <button type="button" className={`dash-nav-backdrop${navOpen ? ' is-open' : ''}`} aria-label="Close menu" onClick={() => setNavOpen(false)} />
      <DashSidebar tab={tab} setTab={setTab} go={go} counts={counts} onNavigate={() => setNavOpen(false)} />
      <main className="thin-scroll dash-main">
        <DashTopbar
          title={tt}
          subtitle={ts}
          onMenuOpen={() => setNavOpen(true)}
          action={tab === 'queue' ? <button onClick={() => setTab('trending')} className="btn btn-green"><Icon name="sparkle" size={16} color="#04391f" /> Create from trend</button> : tab === 'overview' ? <span className="chip" style={{ background: 'var(--green-soft)', color: 'var(--green-ink)', boxShadow: 'none' }}><span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)' }} /> All systems live</span> : null}
        />
        {tab === 'overview' && <Overview api={api} setTab={setTab} />}
        {tab === 'trending' && <TrendingFeed api={api} />}
        {tab === 'agents' && <AIAgents api={api} />}
        {tab === 'generator' && <Generator api={api} />}
        {tab === 'generated' && <GeneratedPosts api={api} />}
        {tab === 'queue' && <ApprovalQueue api={api} />}
        {tab === 'scheduled' && <ScheduledPosts api={api} />}
        {tab === 'analytics' && <Analytics api={api} />}
        {tab === 'monitoring' && <LiveMonitoring api={api} />}
      </main>
      {scheduleTarget && <ScheduleModal post={scheduleTarget} onClose={() => setScheduleId(null)} onConfirm={confirmSchedule} />}
    </div>
  );
}

Object.assign(window, { Generator, buildPost, PostCard, ApprovalQueue, GeneratedPosts, ScheduledPosts, Dashboard });
