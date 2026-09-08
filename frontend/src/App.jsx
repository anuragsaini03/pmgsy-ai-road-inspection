import React, { useMemo, useState } from "react";
import {
  Activity, AlertTriangle, BarChart3, Bell, Camera, ChevronRight,
  CircleHelp, ClipboardCheck, Clock3, CloudUpload, Gauge, Home,
  Layers3, Map, Menu, Navigation, Search, Settings, ShieldCheck,
  Sparkles, Upload, UserRound, Wrench, X, CheckCircle2, CircleDot,
  Image as ImageIcon, Route, ScanLine
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, CartesianGrid, Cell, PieChart, Pie,
  ResponsiveContainer, Tooltip, XAxis, YAxis
} from "recharts";

const nav = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "inspection", label: "AI Inspection", icon: ScanLine },
  { id: "map", label: "Road Map", icon: Map },
  { id: "roads", label: "Roads", icon: Route },
  { id: "history", label: "Inspection History", icon: ClipboardCheck },
  { id: "maintenance", label: "Maintenance", icon: Wrench },
];

const conditionData = [
  { name: "Good", value: 46, fill: "var(--good)" },
  { name: "Fair", value: 29, fill: "var(--fair)" },
  { name: "Poor", value: 17, fill: "var(--poor)" },
  { name: "Critical", value: 8, fill: "var(--critical)" },
];

const trendData = [
  { month: "Apr", score: 76 },
  { month: "May", score: 73 },
  { month: "Jun", score: 70 },
  { month: "Jul", score: 68 },
  { month: "Aug", score: 65 },
  { month: "Sep", score: 63 },
];

const roads = [
  { id: "UP-AG-102", name: "Agra–Fatehabad Link", district: "Agra", length: "18.4 km", score: 82, status: "Good", inspected: "Today" },
  { id: "UP-MT-214", name: "Meerut Rural Link", district: "Meerut", length: "12.7 km", score: 67, status: "Fair", inspected: "Today" },
  { id: "UP-MZ-081", name: "Muzaffarnagar East", district: "Muzaffarnagar", length: "21.2 km", score: 49, status: "Poor", inspected: "Yesterday" },
  { id: "UP-AL-119", name: "Aligarh–Iglas Link", district: "Aligarh", length: "9.8 km", score: 31, status: "Critical", inspected: "Sep 06" },
  { id: "UP-BD-044", name: "Budaun Village Link", district: "Budaun", length: "15.3 km", score: 74, status: "Fair", inspected: "Sep 05" },
];

const chainage = [
  { km: "0–1", score: 88, status: "Good", issue: "Minor cracking" },
  { km: "1–2", score: 76, status: "Fair", issue: "Shoulder damage" },
  { km: "2–3", score: 52, status: "Poor", issue: "Potholes + cracks" },
  { km: "3–4", score: 34, status: "Critical", issue: "Severe potholes" },
  { km: "4–5", score: 69, status: "Fair", issue: "Edge damage" },
];

const mockDetections = [
  { label: "Pothole", confidence: 94, severity: "High", box: { left: 35, top: 48, width: 19, height: 15 } },
  { label: "Longitudinal crack", confidence: 88, severity: "Medium", box: { left: 56, top: 58, width: 25, height: 6 } },
  { label: "Shoulder damage", confidence: 81, severity: "Medium", box: { left: 10, top: 70, width: 20, height: 14 } },
];

function conditionClass(status) {
  return status.toLowerCase();
}

function scoreStatus(score) {
  if (score >= 80) return "Good";
  if (score >= 60) return "Fair";
  if (score >= 40) return "Poor";
  return "Critical";
}

function StatusPill({ status }) {
  return <span className={`pill ${conditionClass(status)}`}><span className="pill-dot" />{status}</span>;
}

function StatCard({ icon: Icon, label, value, note, tone = "" }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${tone}`}><Icon size={20} /></div>
      <div>
        <div className="stat-label">{label}</div>
        <div className="stat-value">{value}</div>
        <div className="stat-note">{note}</div>
      </div>
    </div>
  );
}

function Layout({ page, setPage, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="brand">
          <div className="brand-mark"><ShieldCheck size={22} /></div>
          <div>
            <strong>RoadVision</strong>
            <span>AI Inspection</span>
          </div>
          <button className="icon-btn mobile-close" onClick={() => setMobileOpen(false)}><X size={19}/></button>
        </div>

        <div className="sidebar-section">OVERVIEW</div>
        <nav>
          {nav.map(({ id, label, icon: Icon }) => (
            <button key={id} className={`nav-item ${page === id ? "active" : ""}`} onClick={() => { setPage(id); setMobileOpen(false); }}>
              <Icon size={19} /><span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-section">SYSTEM</div>
        <button className={`nav-item ${page === "settings" ? "active" : ""}`} onClick={() => { setPage("settings"); setMobileOpen(false); }}>
          <Settings size={19}/><span>Settings</span>
        </button>
        <button className={`nav-item ${page === "help" ? "active" : ""}`} onClick={() => { setPage("help"); setMobileOpen(false); }}>
          <CircleHelp size={19}/><span>Help & Guide</span>
        </button>

        <div className="sidebar-bottom">
          <div className="profile">
            <div className="avatar">AS</div>
            <div><strong>Inspector</strong><span>Field Operations</span></div>
            <ChevronRight size={16} />
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <button className="icon-btn mobile-menu" onClick={() => setMobileOpen(true)}><Menu size={21}/></button>
          <div className="breadcrumbs"><span>PMGSY</span><ChevronRight size={15}/><strong>{page === "dashboard" ? "Dashboard" : page.replace("-", " ")}</strong></div>
          <div className="top-actions">
            <div className="search-box"><Search size={17}/><input placeholder="Search roads, chainage..." /></div>
            <button className="icon-btn"><Bell size={19}/><span className="notification-dot"/></button>
            <div className="top-avatar">AS</div>
          </div>
        </header>
        <div className="content">{children}</div>
      </main>
    </div>
  );
}

function Dashboard({ setPage }) {
  const critical = roads.filter(r => r.status === "Critical").length;
  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow"><Activity size={14}/> LIVE INSPECTION SYSTEM</div>
          <h1>Road condition overview</h1>
          <p>Monitor AI-assisted pavement inspections and chainage-wise condition.</p>
        </div>
        <button className="primary-btn" onClick={() => setPage("inspection")}><Camera size={18}/> New inspection</button>
      </div>

      <div className="stats-grid">
        <StatCard icon={Route} label="Total roads" value="128" note="+8 this month" tone="blue"/>
        <StatCard icon={ClipboardCheck} label="Inspections" value="2,540" note="+14.2% vs last month" tone="violet"/>
        <StatCard icon={AlertTriangle} label="Critical sections" value="17" note={`${critical} roads affected`} tone="red"/>
        <StatCard icon={Gauge} label="Avg. condition" value="63/100" note="3.8 pts lower" tone="amber"/>
      </div>

      <div className="dashboard-grid">
        <section className="card trend-card">
          <div className="card-head">
            <div><h2>Condition trend</h2><p>Average prototype condition score</p></div>
            <span className="period"><Clock3 size={14}/> Last 6 months</span>
          </div>
          <div className="chart"><ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{left: -20, right: 10, top: 10, bottom: 0}}>
              <defs><linearGradient id="scoreFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#2563eb" stopOpacity=".22"/><stop offset="100%" stopColor="#2563eb" stopOpacity=".02"/></linearGradient></defs>
              <CartesianGrid vertical={false} strokeDasharray="3 4" stroke="#e2e8f0"/>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize:12, fill:"#64748b"}}/>
              <YAxis domain={[0,100]} axisLine={false} tickLine={false} tick={{fontSize:12, fill:"#64748b"}}/>
              <Tooltip />
              <Area type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={2.5} fill="url(#scoreFill)"/>
            </AreaChart>
          </ResponsiveContainer></div>
        </section>

        <section className="card condition-card">
          <div className="card-head"><div><h2>Road condition</h2><p>Current distribution</p></div></div>
          <div className="donut-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart><Pie data={conditionData} dataKey="value" innerRadius={65} outerRadius={90} paddingAngle={3}>
                {conditionData.map((d, i) => <Cell key={i} fill={d.fill}/>)}
              </Pie><Tooltip/></PieChart>
            </ResponsiveContainer>
            <div className="donut-center"><strong>128</strong><span>roads</span></div>
          </div>
          <div className="legend">{conditionData.map(d => <div key={d.name}><span className="legend-dot" style={{background:d.fill}}/><span>{d.name}</span><strong>{d.value}%</strong></div>)}</div>
        </section>
      </div>

      <div className="dashboard-grid lower">
        <section className="card">
          <div className="card-head"><div><h2>Priority roads</h2><p>Roads requiring attention first</p></div><button className="text-btn" onClick={() => setPage("roads")}>View all <ChevronRight size={15}/></button></div>
          <RoadTable compact />
        </section>
        <section className="card quick-card">
          <div className="card-head"><div><h2>Quick inspection</h2><p>Analyze a road image in seconds</p></div><Sparkles size={20} className="spark"/></div>
          <div className="quick-drop" onClick={() => setPage("inspection")}>
            <div className="upload-icon"><CloudUpload size={25}/></div>
            <strong>Upload road image</strong>
            <span>JPG, PNG up to 10 MB</span>
            <button className="secondary-btn">Start AI analysis</button>
          </div>
        </section>
      </div>
    </>
  );
}

function RoadTable({ compact = false }) {
  const data = compact ? roads.filter(r => r.score < 70).slice(0,4) : roads;
  return (
    <div className="table-wrap">
      <table>
        <thead><tr><th>Road</th><th>District</th><th>Length</th><th>Score</th><th>Status</th></tr></thead>
        <tbody>{data.map(r => <tr key={r.id}>
          <td><div className="road-name"><strong>{r.id}</strong><span>{r.name}</span></div></td>
          <td>{r.district}</td><td>{r.length}</td><td><strong>{r.score}</strong></td><td><StatusPill status={r.status}/></td>
        </tr>)}</tbody>
      </table>
    </div>
  );
}

function Inspection({ setPage }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [roadId, setRoadId] = useState("UP-AG-102");
  const [chainageValue, setChainageValue] = useState("2.4");
  const [analyzing, setAnalyzing] = useState(false);
  const [done, setDone] = useState(false);

  function chooseFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setDone(false);
  }

  function analyze() {
    if (!file) return;
    setAnalyzing(true);
    setTimeout(() => { setAnalyzing(false); setDone(true); }, 1400);
  }

  return (
    <>
      <div className="page-head">
        <div><div className="eyebrow"><ScanLine size={14}/> AI-POWERED ANALYSIS</div><h1>New road inspection</h1><p>Upload a road photograph and attach its chainage for AI assessment.</p></div>
      </div>

      <div className="inspection-layout">
        <section className="card upload-card">
          <div className="card-head"><div><h2>1. Road photograph</h2><p>Use a clear forward-facing road image.</p></div><ImageIcon size={20}/></div>
          <label className={`dropzone ${preview ? "has-preview" : ""}`}>
            <input type="file" accept="image/png,image/jpeg,image/webp" onChange={chooseFile}/>
            {preview ? <img src={preview} alt="Road preview"/> : <><div className="upload-icon large"><CloudUpload size={30}/></div><strong>Drop road image here</strong><span>or click to browse from your device</span><small>PNG, JPG, WEBP • Max 10 MB</small></>}
          </label>
          {file && <div className="file-row"><div className="file-thumb">{preview && <img src={preview} alt="thumb"/>}</div><div><strong>{file.name}</strong><span>{(file.size/1024/1024).toFixed(2)} MB</span></div><button className="icon-btn" onClick={() => {setFile(null);setPreview("");}}><X size={17}/></button></div>}
        </section>

        <section className="card">
          <div className="card-head"><div><h2>2. Inspection details</h2><p>Connect the image to a road section.</p></div><Navigation size={20}/></div>
          <div className="form-grid">
            <label>Road ID<input value={roadId} onChange={e=>setRoadId(e.target.value)} placeholder="e.g. UP-AG-102"/></label>
            <label>Chainage (km)<input value={chainageValue} onChange={e=>setChainageValue(e.target.value)} placeholder="e.g. 2.4"/></label>
            <label>Inspection type<select defaultValue="visual"><option value="visual">Visual PCI inspection</option><option>Routine inspection</option><option>Maintenance verification</option></select></label>
            <label>GPS location<div className="gps-input"><span className="gps-dot"/> 27.1767, 78.0081 <button>Use GPS</button></div></label>
          </div>
          <div className="info-banner"><ShieldCheck size={18}/><div><strong>AI-assisted assessment</strong><span>Results are prototype condition indicators and should be validated by an authorized inspector.</span></div></div>
          <button className="primary-btn full" disabled={!file || analyzing} onClick={analyze}>
            {analyzing ? <><span className="spinner"/> Analyzing image...</> : <><Sparkles size={18}/> Analyze with AI</>}
          </button>
        </section>
      </div>

      {done && <section className="card result-preview">
        <div className="result-head"><div><div className="eyebrow"><CheckCircle2 size={14}/> ANALYSIS COMPLETE</div><h2>AI assessment for {roadId} · Ch. {chainageValue} km</h2></div><button className="primary-btn" onClick={() => setPage("map")}>View on map <ChevronRight size={17}/></button></div>
        <div className="result-grid">
          <div className="result-score"><span>Condition score</span><strong>52</strong><StatusPill status="Poor"/><small>Prototype score</small></div>
          <div className="detection-list"><h3>Detected issues</h3>{mockDetections.map(d=><div className="detection-row" key={d.label}><div><strong>{d.label}</strong><span>{d.severity} severity</span></div><div className="confidence">{d.confidence}%</div></div>)}</div>
          <div className="recommendation"><Wrench size={20}/><div><strong>Maintenance priority: HIGH</strong><p>Section should be scheduled for field verification and preventive/urgent maintenance assessment.</p></div></div>
        </div>
      </section>}
    </>
  );
}

function MapPage({ setPage }) {
  const [selected, setSelected] = useState(chainage[3]);
  return (
    <>
      <div className="page-head"><div><div className="eyebrow"><Map size={14}/> SPATIAL MONITORING</div><h1>Chainage-wise road map</h1><p>Visualize condition across road sections and identify priority locations.</p></div><button className="secondary-btn" onClick={() => setPage("inspection")}><Camera size={17}/> New inspection</button></div>
      <div className="map-layout">
        <section className="card map-card">
          <div className="fake-map">
            <div className="map-grid"/>
            <div className="road-line"/>
            {chainage.map((c,i) => <button key={c.km} className={`map-pin ${conditionClass(c.status)}`} style={{left:`${17+i*18}%`, top:`${62-(i%2)*17}%`}} onClick={()=>setSelected(c)}><span>{c.km} km</span></button>)}
            <div className="map-label one">Agra district</div><div className="map-label two">PMGSY road corridor</div>
            <div className="map-controls"><button>+</button><button>−</button></div>
          </div>
          <div className="map-legend">{["Good","Fair","Poor","Critical"].map(s=><div key={s}><span className={`legend-dot ${conditionClass(s)}`}/>{s}</div>)}</div>
        </section>
        <section className="card chainage-card">
          <div className="card-head"><div><h2>UP-AG-102</h2><p>Agra–Fatehabad Link · 18.4 km</p></div><StatusPill status={selected.status}/></div>
          <div className="selected-score"><span>Selected section · {selected.km} km</span><strong>{selected.score}<small>/100</small></strong></div>
          <div className="chainage-list">{chainage.map(c=><button className={`chainage-row ${selected.km===c.km?"selected":""}`} key={c.km} onClick={()=>setSelected(c)}><div><strong>{c.km} km</strong><span>{c.issue}</span></div><div><b>{c.score}</b><StatusPill status={c.status}/></div></button>)}</div>
        </section>
      </div>
    </>
  );
}

function RoadsPage() {
  return <><div className="page-head"><div><div className="eyebrow"><Route size={14}/> ROAD NETWORK</div><h1>Roads</h1><p>Browse registered PMGSY road assets and current condition.</p></div><button className="secondary-btn"><Upload size={17}/> Export report</button></div><section className="card"><div className="toolbar"><div className="search-box wide"><Search size={17}/><input placeholder="Search road ID or name"/></div><select defaultValue="all"><option value="all">All conditions</option><option>Good</option><option>Fair</option><option>Poor</option><option>Critical</option></select></div><RoadTable/></section></>;
}

function HistoryPage() {
  const rows = [
    ["INSP-2540","UP-AG-102","2.4 km","52","Poor","Sep 08, 2026"],
    ["INSP-2539","UP-MT-214","7.1 km","67","Fair","Sep 08, 2026"],
    ["INSP-2538","UP-MZ-081","11.8 km","49","Poor","Sep 07, 2026"],
    ["INSP-2537","UP-AL-119","3.2 km","31","Critical","Sep 06, 2026"],
    ["INSP-2536","UP-BD-044","5.6 km","74","Fair","Sep 05, 2026"],
  ];
  return <><div className="page-head"><div><div className="eyebrow"><ClipboardCheck size={14}/> FIELD RECORDS</div><h1>Inspection history</h1><p>Review AI-assisted inspection records and condition scores.</p></div></div><section className="card"><div className="table-wrap"><table><thead><tr><th>Inspection</th><th>Road</th><th>Chainage</th><th>Score</th><th>Status</th><th>Date</th></tr></thead><tbody>{rows.map(r=><tr key={r[0]}>{r.map((v,i)=><td key={i}>{i===4?<StatusPill status={v}/>:i===0?<strong>{v}</strong>:v}</td>)}</tr>)}</tbody></table></div></section></>;
}

function MaintenancePage() {
  const items = [
    { road:"UP-AL-119", section:"3–4 km", issue:"Severe potholes", score:31, priority:"Urgent", due:"Immediate field verification" },
    { road:"UP-MZ-081", section:"11–12 km", issue:"Potholes + cracking", score:42, priority:"High", due:"Within 7 days" },
    { road:"UP-AG-102", section:"2–3 km", issue:"Potholes + shoulder damage", score:52, priority:"High", due:"Within 14 days" },
    { road:"UP-MT-214", section:"7–8 km", issue:"Shoulder clearance", score:61, priority:"Medium", due:"Routine cycle" },
  ];
  return <><div className="page-head"><div><div className="eyebrow"><Wrench size={14}/> ACTION QUEUE</div><h1>Maintenance priority</h1><p>Prototype recommendations based on detected issues and condition score.</p></div></div><div className="priority-grid">{items.map((x,i)=><div className="card priority-card" key={x.road}><div className={`priority-num p${i}`}>{i+1}</div><div className="priority-main"><div className="priority-top"><div><strong>{x.road}</strong><span>{x.section} · {x.issue}</span></div><StatusPill status={scoreStatus(x.score)}/></div><div className="priority-bottom"><div><small>Condition</small><b>{x.score}/100</b></div><div><small>Priority</small><b>{x.priority}</b></div><div><small>Suggested action</small><b>{x.due}</b></div></div></div></div>)}</div></>;
}

function SimplePage({ type }) {
  const settings = type === "settings";
  return <div className="empty-page card"><div className="empty-icon">{settings ? <Settings size={30}/> : <CircleHelp size={30}/>}</div><h2>{settings ? "System settings" : "Help & guide"}</h2><p>{settings ? "Configure inspection defaults, scoring labels, and future API connections here." : "Use AI Inspection to upload a road photograph. Add road ID and chainage, then run the prototype analysis."}</p>{settings && <div className="settings-list"><div><span>AI model endpoint</span><strong>Mock /api/analyze</strong></div><div><span>Default inspection type</span><strong>Visual PCI</strong></div><div><span>Map provider</span><strong>OpenStreetMap</strong></div></div>}</div>;
}

export default function App() {
  const [page, setPage] = useState("dashboard");
  const body = useMemo(() => {
    switch(page) {
      case "dashboard": return <Dashboard setPage={setPage}/>;
      case "inspection": return <Inspection setPage={setPage}/>;
      case "map": return <MapPage setPage={setPage}/>;
      case "roads": return <RoadsPage/>;
      case "history": return <HistoryPage/>;
      case "maintenance": return <MaintenancePage/>;
      default: return <SimplePage type={page}/>;
    }
  }, [page]);
  return <Layout page={page} setPage={setPage}>{body}</Layout>;
}