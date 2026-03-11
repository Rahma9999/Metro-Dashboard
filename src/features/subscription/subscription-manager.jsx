import { useState } from "react";
import {
  Container, Row, Col, Card, Table, Badge, Button, Form,
  InputGroup, Modal, ListGroup, ButtonGroup
} from "react-bootstrap";

const BOOTSTRAP_CSS = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";
const FONT_URL = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";

const INITIAL_USERS = [
  { id: 1, name: "Layla Hassan",  email: "layla.h@uni.edu",    avatar: "LH", type: "Student",    status: "Active",     plan: "Annual",  amount: "$120", cardLast4: "4242", joined: "Jan 2024", lastPayment: "Jan 15, 2025", nextRenewal: "Jan 15, 2026",
    payments: [{ date:"Jan 15, 2025", amount:"$120", method:"Visa •••• 4242", status:"Paid" },{ date:"Jan 15, 2024", amount:"$110", method:"Visa •••• 4242", status:"Paid" }] },
  { id: 2, name: "Omar Farouk",   email: "omar.f@corp.com",    avatar: "OF", type: "Corporate",  status: "Active",     plan: "Monthly", amount: "$45",  cardLast4: "8832", joined: "Mar 2023", lastPayment: "Feb 1, 2025",  nextRenewal: "Mar 1, 2025",
    payments: [{ date:"Feb 1, 2025", amount:"$45", method:"MC •••• 8832", status:"Paid" },{ date:"Jan 1, 2025", amount:"$45", method:"MC •••• 8832", status:"Paid" },{ date:"Dec 1, 2024", amount:"$45", method:"MC •••• 8832", status:"Paid" }] },
  { id: 3, name: "Sara Mostafa",  email: "sara.m@school.edu", avatar: "SM", type: "Student",    status: "Suspended",  plan: "Annual",  amount: "$120", cardLast4: "1195", joined: "Sep 2023", lastPayment: "Sep 10, 2024", nextRenewal: "Sep 10, 2025",
    payments: [{ date:"Sep 10, 2024", amount:"$120", method:"Visa •••• 1195", status:"Paid" },{ date:"Sep 10, 2023", amount:"$100", method:"Visa •••• 1195", status:"Paid" }] },
  { id: 4, name: "Khaled Nour",   email: "k.nour@freelance.io",avatar: "KN", type: "Individual", status: "Card Issue", plan: "Monthly", amount: "$25",  cardLast4: "3371", joined: "Nov 2024", lastPayment: "Jan 5, 2025",  nextRenewal: "Feb 5, 2025",
    payments: [{ date:"Jan 5, 2025", amount:"$25", method:"Visa •••• 3371", status:"Paid" },{ date:"Feb 5, 2025", amount:"$25", method:"Visa •••• 3371", status:"Failed" }] },
  { id: 5, name: "Nour El-Din",   email: "nour.d@faculty.edu", avatar: "ND", type: "Faculty",    status: "Expired",    plan: "Annual",  amount: "$200", cardLast4: "6610", joined: "Apr 2022", lastPayment: "Apr 20, 2024", nextRenewal: "Apr 20, 2025",
    payments: [{ date:"Apr 20, 2024", amount:"$200", method:"Amex •••• 6610", status:"Paid" },{ date:"Apr 20, 2023", amount:"$180", method:"Amex •••• 6610", status:"Paid" }] },
  { id: 6, name: "Aya Ibrahim",   email: "aya.i@uni.edu",      avatar: "AI", type: "Student",    status: "Active",     plan: "Monthly", amount: "$15",  cardLast4: "9920", joined: "Oct 2024", lastPayment: "Feb 10, 2025", nextRenewal: "Mar 10, 2025",
    payments: [{ date:"Feb 10, 2025", amount:"$15", method:"Visa •••• 9920", status:"Paid" }] },
];

const TYPE_VARIANT   = { Student:"primary", Corporate:"purple", Individual:"warning", Faculty:"success" };
const STATUS_VARIANT = { Active:"success", Suspended:"warning", "Card Issue":"danger", Expired:"secondary" };
const AVATAR_COLORS  = ["#0d6efd","#6f42c1","#f59e0b","#198754","#0dcaf0","#d63384"];

function Avatar({ initials, id, size = 40 }) {
  const bg = AVATAR_COLORS[id % AVATAR_COLORS.length];
  return (
    <div style={{ width:size, height:size, borderRadius:12, background:bg, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:size*0.32, flexShrink:0 }}>
      {initials}
    </div>
  );
}

function StatusDot({ status }) {
  const c = { Active:"#198754", Suspended:"#f59e0b", "Card Issue":"#dc3545", Expired:"#6c757d" };
  return <span style={{ display:"inline-block", width:7, height:7, borderRadius:"50%", background:c[status]||"#aaa", marginRight:5 }} />;
}

export default function SubscriptionPage() {
  const [users, setUsers]               = useState(INITIAL_USERS);
  const [search, setSearch]             = useState("");
  const [filterType, setFilterType]     = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [modal, setModal]               = useState(null);
  const [toast, setToast]               = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    return (u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
      && (filterType   === "All" || u.type   === filterType)
      && (filterStatus === "All" || u.status === filterStatus);
  });

  const changeStatus = (id, newStatus) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: newStatus } : u));
    showToast(`Status updated to "${newStatus}" ✅`);
    setModal(null);
  };

  const renewSub = (id) => {
    setUsers(prev => prev.map(u => {
      if (u.id !== id) return u;
      const p = { date:"Mar 1, 2025", amount:u.amount, method:`Card •••• ${u.cardLast4}`, status:"Paid" };
      return { ...u, status:"Active", payments:[p, ...u.payments] };
    }));
    showToast("Subscription renewed successfully! 🎉");
    setModal(null);
  };

  const stats = [
    { label:"Total Members", value:users.length,                                        variant:"primary",   icon:"👥" },
    { label:"Active",         value:users.filter(u=>u.status==="Active").length,         variant:"success",   icon:"✅" },
    { label:"Card Issues",    value:users.filter(u=>u.status==="Card Issue").length,     variant:"danger",    icon:"💳" },
    { label:"Expired",        value:users.filter(u=>u.status==="Expired").length,        variant:"secondary", icon:"⏰" },
  ];

  return (
    <>
      <link rel="stylesheet" href={BOOTSTRAP_CSS} />
      <link rel="stylesheet" href={FONT_URL} />
      <style>{`
        body,* { font-family:'Plus Jakarta Sans',sans-serif !important; }
        .page-bg { background:#f4f6fb; min-height:100vh; }
        .header-band { background:linear-gradient(135deg,#1e3a8a 0%,#2563eb 100%); }
        .brand-title { font-size:1.55rem; font-weight:800; letter-spacing:-.5px; color:#fff; }
        .brand-sub { color:rgba(255,255,255,.6); font-size:.78rem; }
        .stat-card { border:none; border-radius:14px; box-shadow:0 2px 12px rgba(0,0,0,.07); transition:transform .15s; }
        .stat-card:hover { transform:translateY(-2px); }
        .stat-icon { font-size:1.7rem; }
        .stat-value { font-size:1.9rem; font-weight:800; line-height:1.1; }
        .stat-label { font-size:.75rem; color:#6c757d; }
        .filter-bar { background:#fff; border-radius:14px; box-shadow:0 2px 10px rgba(0,0,0,.06); padding:14px 18px; }
        .table-card { border:none; border-radius:14px; box-shadow:0 2px 12px rgba(0,0,0,.07); overflow:hidden; }
        .sub-table thead th { background:#f8f9fa; font-size:.7rem; font-weight:700; letter-spacing:.06em; text-transform:uppercase; color:#6c757d; border-bottom:2px solid #e9ecef; padding:11px 14px; white-space:nowrap; }
        .sub-table tbody td { padding:12px 14px; vertical-align:middle; border-color:#f1f3f5; }
        .sub-table tbody tr { transition:background .1s; }
        .sub-table tbody tr:hover { background:#f0f4ff; }
        .member-name { font-weight:600; font-size:.875rem; color:#1e293b; }
        .member-email { font-size:.73rem; color:#94a3b8; }
        .action-btn { font-size:.7rem !important; font-weight:600 !important; padding:4px 9px !important; border-radius:7px !important; }
        .modal-header-custom { background:linear-gradient(135deg,#1e3a8a,#2563eb); color:#fff; border-bottom:none; border-radius:14px 14px 0 0 !important; }
        .modal-header-custom .btn-close { filter:invert(1) opacity(.8); }
        .modal-content { border-radius:14px !important; border:none; box-shadow:0 20px 60px rgba(0,0,0,.18); }
        .detail-row { display:flex; justify-content:space-between; align-items:center; padding:9px 0; border-bottom:1px solid #f1f3f5; font-size:.86rem; }
        .user-badge-strip { background:#f8f9fa; padding:13px 20px; border-bottom:1px solid #e9ecef; display:flex; align-items:center; gap:14px; }
        .status-option { display:flex; align-items:center; gap:10px; padding:11px 13px; border-radius:10px; border:1.5px solid #e9ecef; cursor:pointer; margin-bottom:8px; transition:all .12s; }
        .status-option:hover { border-color:#0d6efd; background:#f0f4ff; }
        .status-option.selected { border-color:#0d6efd; background:#e8f0fe; }
        .renew-summary { background:#f0f4ff; border:1px solid #c7d7fd; border-radius:12px; padding:16px; }
        .toast-banner { position:fixed; bottom:28px; right:28px; z-index:9999; background:#1e293b; color:#fff; padding:12px 20px; border-radius:12px; font-size:.86rem; font-weight:500; box-shadow:0 8px 32px rgba(0,0,0,.25); animation:fadeUp .25s ease; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .badge-purple { background-color:#6f42c1 !important; }
        @media(max-width:768px){ .hide-sm{display:none!important} }
      `}</style>

      <div className="page-bg">
        {/* Header */}
        <div className="header-band py-4 px-3 px-md-5 mb-4">
          <Container fluid="xl">
            <Row className="align-items-center mb-4">
              <Col>
                <div className="brand-title">SubsManager</div>
                <div className="brand-sub">Subscription &amp; Member Control Panel</div>
              </Col>
              <Col xs="auto">
                <ButtonGroup size="sm">
                  {["All","Student","Corporate","Individual","Faculty"].map(t => (
                    <Button key={t} variant={filterType===t?"light":"outline-light"}
                      onClick={()=>setFilterType(t)} style={{ fontSize:".72rem", fontWeight:600 }}>
                      {t}
                    </Button>
                  ))}
                </ButtonGroup>
              </Col>
            </Row>
            <Row className="g-3">
              {stats.map(s => (
                <Col key={s.label} xs={6} md={3}>
                  <Card className="stat-card">
                    <Card.Body className="d-flex align-items-center gap-3 py-3">
                      <div className="stat-icon">{s.icon}</div>
                      <div>
                        <div className={`stat-value text-${s.variant}`}>{s.value}</div>
                        <div className="stat-label">{s.label}</div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>

        <Container fluid="xl" className="px-3 px-md-5 pb-5">
          {/* Filter */}
          <div className="filter-bar mb-3">
            <Row className="g-2 align-items-center">
              <Col md={6}>
                <InputGroup>
                  <InputGroup.Text style={{ background:"#f8f9fa", border:"1.5px solid #e9ecef", borderRight:"none" }}>🔍</InputGroup.Text>
                  <Form.Control placeholder="Search by name or email…" value={search} onChange={e=>setSearch(e.target.value)}
                    style={{ border:"1.5px solid #e9ecef", borderLeft:"none", fontSize:".875rem" }} />
                </InputGroup>
              </Col>
              <Col md={3}>
                <Form.Select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)} style={{ fontSize:".875rem", border:"1.5px solid #e9ecef" }}>
                  {["All","Active","Suspended","Card Issue","Expired"].map(s=><option key={s}>{s}</option>)}
                </Form.Select>
              </Col>
              <Col className="text-muted" style={{ fontSize:".78rem" }}>
                Showing <strong>{filtered.length}</strong> of <strong>{users.length}</strong> members
              </Col>
            </Row>
          </div>

          {/* Table */}
          <Card className="table-card">
            <div style={{ overflowX:"auto" }}>
              <Table className="sub-table mb-0">
                <thead>
                  <tr>
                    <th>Member</th><th>Type</th><th className="hide-sm">Plan</th>
                    <th>Status</th><th className="hide-sm">Last Payment</th>
                    <th className="hide-sm">Next Renewal</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 && (
                    <tr><td colSpan={7} className="text-center text-muted py-5">No subscribers match your search.</td></tr>
                  )}
                  {filtered.map(u => (
                    <tr key={u.id}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <Avatar initials={u.avatar} id={u.id} />
                          <div>
                            <div className="member-name">{u.name}</div>
                            <div className="member-email">{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <Badge className={u.type==="Corporate"?"badge-purple":""}
                          bg={u.type==="Corporate"?undefined:TYPE_VARIANT[u.type]}
                          style={{ fontSize:".7rem", padding:"4px 10px", borderRadius:20 }}>
                          {u.type}
                        </Badge>
                      </td>
                      <td className="hide-sm">
                        <div style={{ fontWeight:600, fontSize:".84rem" }}>{u.plan}</div>
                        <div style={{ fontSize:".73rem", color:"#94a3b8" }}>{u.amount}</div>
                      </td>
                      <td>
                        <Badge bg={STATUS_VARIANT[u.status]} style={{ fontSize:".7rem", padding:"5px 10px", borderRadius:20 }}>
                          <StatusDot status={u.status} />{u.status}
                        </Badge>
                      </td>
                      <td className="hide-sm" style={{ fontSize:".78rem", color:"#64748b" }}>{u.lastPayment}</td>
                      <td className="hide-sm" style={{ fontSize:".78rem", color:"#64748b" }}>{u.nextRenewal}</td>
                      <td>
                        <div className="d-flex flex-wrap gap-1">
                          <Button variant="outline-primary"   size="sm" className="action-btn" onClick={()=>setModal({mode:"details",user:u})}>👁 Details</Button>
                          <Button variant="outline-success"   size="sm" className="action-btn" onClick={()=>setModal({mode:"history",user:u})}>💳 History</Button>
                          <Button variant="outline-warning"   size="sm" className="action-btn" onClick={()=>setModal({mode:"status", user:u})}>⚡ Status</Button>
                          {(u.status==="Expired"||u.status==="Suspended") && (
                            <Button variant="primary" size="sm" className="action-btn" onClick={()=>setModal({mode:"renew",user:u})}>🔄 Renew</Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card>
        </Container>
      </div>

      {modal && <SubModal modal={modal} onClose={()=>setModal(null)} onChangeStatus={changeStatus} onRenew={renewSub} />}
      {toast && <div className="toast-banner">{toast}</div>}
    </>
  );
}

function SubModal({ modal, onClose, onChangeStatus, onRenew }) {
  const { mode, user } = modal;
  const [sel, setSel] = useState(user.status);
  const titles = { details:"Member Details", history:"Payment History", status:"Change Status", renew:"Renew Subscription" };
  const icons  = { details:"👤", history:"💳", status:"⚡", renew:"🔄" };

  return (
    <Modal show centered onHide={onClose}>
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title style={{ fontSize:"1rem", fontWeight:700 }}>{icons[mode]}&nbsp;{titles[mode]}</Modal.Title>
      </Modal.Header>

      <div className="user-badge-strip">
        <Avatar initials={user.avatar} id={user.id} size={44} />
        <div style={{ flex:1 }}>
          <div style={{ fontWeight:700, fontSize:".93rem", color:"#1e293b" }}>{user.name}</div>
          <div style={{ fontSize:".76rem", color:"#94a3b8" }}>{user.email}</div>
        </div>
        <Badge bg={STATUS_VARIANT[user.status]} style={{ fontSize:".7rem", padding:"5px 10px", borderRadius:20 }}>
          <StatusDot status={user.status} />{user.status}
        </Badge>
      </div>

      <Modal.Body className="pt-3 pb-4 px-4">

        {mode==="details" && [
          ["Member ID",`#SUB-${String(user.id).padStart(4,"0")}`],
          ["Type",user.type],["Plan",user.plan],["Amount",user.amount],
          ["Card ending",`•••• ${user.cardLast4}`],["Member since",user.joined],
          ["Last payment",user.lastPayment],["Next renewal",user.nextRenewal],
        ].map(([l,v])=>(
          <div key={l} className="detail-row">
            <span style={{ color:"#6c757d" }}>{l}</span>
            <span style={{ fontWeight:600, color:"#1e293b" }}>{v}</span>
          </div>
        ))}

        {mode==="history" && (
          <ListGroup variant="flush">
            {user.payments.length===0&&<p className="text-muted text-center py-3">No records.</p>}
            {user.payments.map((p,i)=>(
              <ListGroup.Item key={i} style={{ borderRadius:10, border:"1px solid #e9ecef", marginBottom:8 }}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div style={{ fontWeight:700, fontSize:".88rem", color:"#1e293b" }}>{p.amount}</div>
                    <div style={{ fontSize:".73rem", color:"#94a3b8" }}>{p.method} · {p.date}</div>
                  </div>
                  <Badge bg={p.status==="Paid"?"success":"danger"} style={{ fontSize:".7rem", borderRadius:20, padding:"5px 10px" }}>{p.status}</Badge>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}

        {mode==="status" && (
          <>
            <p className="text-muted mb-3" style={{ fontSize:".84rem" }}>Select a new status for this member:</p>
            {[
              { value:"Active",     note:"Fully operational",  variant:"success"   },
              { value:"Suspended",  note:"Temporary hold",     variant:"warning"   },
              { value:"Card Issue", note:"Card lost or fraud", variant:"danger"    },
              { value:"Expired",    note:"Subscription ended", variant:"secondary" },
            ].map(opt=>(
              <div key={opt.value} className={`status-option ${sel===opt.value?"selected":""}`} onClick={()=>setSel(opt.value)}>
                <Form.Check type="radio" name="status" checked={sel===opt.value} onChange={()=>setSel(opt.value)} />
                <StatusDot status={opt.value} />
                <span style={{ fontWeight:600, fontSize:".875rem" }}>{opt.value}</span>
                <span className="ms-auto text-muted" style={{ fontSize:".73rem" }}>{opt.note}</span>
              </div>
            ))}
            <div className="d-flex gap-2 mt-3">
              <Button variant="outline-secondary" className="flex-fill" onClick={onClose}>Cancel</Button>
              <Button variant="primary" className="flex-fill" style={{ fontWeight:600 }} onClick={()=>onChangeStatus(user.id,sel)}>Apply Status</Button>
            </div>
          </>
        )}

        {mode==="renew" && (
          <>
            <div className="renew-summary mb-3">
              <div style={{ fontWeight:700, fontSize:".84rem", color:"#1e3a8a", marginBottom:10 }}>Renewal Summary</div>
              {[["Plan",user.plan],["Amount",user.amount],["Card",`•••• ${user.cardLast4}`]].map(([l,v])=>(
                <div key={l} className="d-flex justify-content-between" style={{ fontSize:".84rem", marginBottom:4 }}>
                  <span className="text-muted">{l}</span><span style={{ fontWeight:600 }}>{v}</span>
                </div>
              ))}
            </div>
            <div className="alert alert-warning d-flex gap-2 py-2" style={{ fontSize:".78rem", borderRadius:10 }}>
              <span>⚠️</span>
              <span>This will reactivate and charge <strong>{user.amount}</strong> to card ending <strong>{user.cardLast4}</strong>.</span>
            </div>
            <div className="d-flex gap-2 mt-3">
              <Button variant="outline-secondary" className="flex-fill" onClick={onClose}>Cancel</Button>
              <Button variant="primary" className="flex-fill" style={{ fontWeight:600 }} onClick={()=>onRenew(user.id)}>✅ Confirm &amp; Renew</Button>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}
