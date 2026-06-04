/* ============================================================
   BOOK & GO — Dashboard module: AI Agents (cloud architecture,
   content sources / RSS, autonomous workflow)
   ============================================================ */

function AgentCard({ a }) {
  const s = AGENT_STATUS[a.status] || AGENT_STATUS.ONLINE;
  const pulsing = a.status === 'SYNCING' || a.status === 'PROCESSING';
  return (
    <div className="card" style={{ padding: 22, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 30, color: 'var(--line-2)', lineHeight: 1 }}>{a.id}</span>
        <span className="badge" style={{ background: s.bg, color: s.c }}>
          <span style={{ position: 'relative', width: 8, height: 8 }}>
            <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: s.dot }} />
            {pulsing && <span style={{ position: 'absolute', inset: -3, borderRadius: '50%', background: s.dot, opacity: .4, animation: 'ping 1.5s ease-out infinite' }} />}
          </span>
          {a.status}
        </span>
      </div>
      <h3 className="display" style={{ fontSize: 19, margin: '0 0 8px', lineHeight: 1.05 }}>{a.name}</h3>
      <p style={{ margin: '0 0 18px', color: 'var(--ink-2)', fontWeight: 500, fontSize: 13.5, lineHeight: 1.45, flex: 1 }}>{a.desc}</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ color: 'var(--ink-3)', fontWeight: 700, fontSize: 11.5, letterSpacing: '.08em', textTransform: 'uppercase' }}>Throughput</span>
        <span style={{ color: 'var(--ink-2)', fontWeight: 700, fontSize: 12.5 }}>{a.load}%</span>
      </div>
      <div style={{ height: 6, borderRadius: 999, background: 'var(--line)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: a.load + '%', background: s.dot, borderRadius: 999 }} />
      </div>
    </div>
  );
}

function AIAgents({ api }) {
  const [feed, setFeed] = useState(() => RSS_ITEMS.slice(0, 3).map((f, i) => ({ ...f, id: 'r' + i, ago: (i + 1) * 9 + 's ago' })));
  const idx = useRef(3);
  useEffect(() => {
    const iv = setInterval(() => {
      const next = RSS_ITEMS[idx.current % RSS_ITEMS.length];
      idx.current++;
      setFeed(f => [{ ...next, id: 'r' + idx.current, ago: 'just now' }, ...f].slice(0, 6));
    }, 4200);
    return () => clearInterval(iv);
  }, []);
  const onlineCount = AGENTS.filter(a => a.status === 'ONLINE' || a.status === 'ACTIVE').length;

  return (
    <div className="dash-content">
      {/* architecture banner */}
      <div className="card" style={{ padding: '22px 26px', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', background: 'var(--ink)', color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ width: 46, height: 46, borderRadius: 12, background: 'rgba(255,255,255,.08)', display: 'grid', placeItems: 'center' }}><Icon name="globe" size={24} color="var(--green)" /></span>
          <div>
            <h3 className="display" style={{ fontSize: 22, margin: 0 }}>Cloud-managed agent architecture</h3>
            <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,.6)', fontWeight: 600, fontSize: 14 }}>Five autonomous agents read, generate and publish — humans stay in control of approval.</p>
          </div>
        </div>
        <span className="chip" style={{ background: 'rgba(0,196,106,.16)', color: 'var(--green)', boxShadow: 'none', whiteSpace: 'nowrap' }}>
          <span style={{ position: 'relative', width: 8, height: 8 }}><span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--green)' }} /><span style={{ position: 'absolute', inset: -3, borderRadius: '50%', background: 'var(--green)', opacity: .4, animation: 'ping 1.6s ease-out infinite' }} /></span>
          {onlineCount}/5 agents online
        </span>
      </div>

      {/* agents grid */}
      <div className="eyebrow" style={{ marginBottom: 14 }}>Managed agents</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14, marginBottom: 30 }} className="agents-grid">
        {AGENTS.map(a => <AgentCard key={a.id} a={a} />)}
      </div>

      {/* workflow */}
      <div className="card" style={{ padding: 28, marginBottom: 24 }}>
        <h3 className="display" style={{ fontSize: 22, margin: '0 0 22px' }}>Autonomous agent workflow</h3>
        <div style={{ display: 'flex', alignItems: 'stretch', flexWrap: 'wrap', gap: 10 }}>
          {AGENT_WORKFLOW.map((step, i) => {
            const human = step === 'Human approval';
            return (
              <React.Fragment key={step}>
                <div style={{ flex: '1 1 0', minWidth: 120, background: human ? 'var(--green)' : 'var(--paper)', borderRadius: 14, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8, boxShadow: human ? 'none' : 'inset 0 0 0 1.5px var(--line)' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 12, color: human ? '#04391f' : 'var(--ink-3)' }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ fontWeight: 800, fontSize: 13.5, lineHeight: 1.15, color: human ? '#04391f' : 'var(--ink)' }}>{step}</span>
                  {human && <span style={{ fontWeight: 700, fontSize: 11, color: 'rgba(4,57,31,.7)' }}>You decide</span>}
                </div>
                {i < AGENT_WORKFLOW.length - 1 && <div style={{ display: 'flex', alignItems: 'center', color: 'var(--line-2)' }} className="wf-arrow"><Icon name="chevron" size={16} color="var(--line-2)" /></div>}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* sources + live RSS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="ov-grid">
        <div>
          <div className="eyebrow" style={{ marginBottom: 14 }}>AI content sources</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="grid-2">
            {CONTENT_SOURCES.map(s => (
              <div key={s.name} className="card" style={{ padding: 18 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span style={{ width: 34, height: 34, borderRadius: 9, background: 'var(--green-soft)', display: 'grid', placeItems: 'center' }}><Icon name={s.ic} size={17} color="var(--green-ink)" /></span>
                  <span style={{ fontWeight: 800, fontSize: 14.5 }}>{s.name}</span>
                </div>
                <div style={{ color: 'var(--green-ink)', fontWeight: 800, fontSize: 13 }}>{s.count}</div>
                <div style={{ color: 'var(--ink-3)', fontWeight: 600, fontSize: 12, marginTop: 2 }}>{s.note}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="eyebrow" style={{ marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ position: 'relative', width: 8, height: 8 }}><span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--green)' }} /><span style={{ position: 'absolute', inset: -3, borderRadius: '50%', background: 'var(--green)', opacity: .4, animation: 'ping 1.6s ease-out infinite' }} /></span>
            RSS Feed Agent · live
          </div>
          <div className="card" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {feed.map(f => (
              <div key={f.id} className="fade-up" style={{ display: 'flex', gap: 13, alignItems: 'center', padding: 12, borderRadius: 12, background: 'var(--paper)' }}>
                <span style={{ width: 46, height: 46, borderRadius: 10, overflow: 'hidden', flex: 'none' }}><Photo scene={f.scene} showLabel={false} style={{ height: '100%' }} /></span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className="badge" style={{ background: '#fff', color: 'var(--ink-2)', padding: '3px 8px', fontSize: 10.5 }}><Icon name="feed" size={11} /> {f.src}</span>
                    <span style={{ color: 'var(--ink-3)', fontWeight: 600, fontSize: 11.5 }}>{f.ago}</span>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--ink)', marginTop: 4, lineHeight: 1.3 }}>{f.txt}</div>
                </div>
                <button onClick={() => api.createPost({ id: 'rss-' + f.id, topic: f.topic, scene: f.scene })} className="btn btn-green btn-sm" style={{ flex: 'none', padding: '8px 12px' }}><Icon name="sparkle" size={13} color="#04391f" /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { AgentCard, AIAgents });
