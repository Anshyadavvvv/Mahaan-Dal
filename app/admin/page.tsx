'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import {
  ShieldCheck,
  Search,
  Download,
  Filter,
  FileText,
  Send,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  LogOut,
  X,
  ChevronRight
} from 'lucide-react';

type Row = Record<string, any>;

export default function AdminPage() {
  const [logged, setLogged] = useState(false);
  const [tab, setTab] = useState<'letters' | 'jan' | 'members'>('letters');
  const [rows, setRows] = useState<Row[]>([]);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [inspectRow, setInspectRow] = useState<Row | null>(null);

  const { register, handleSubmit } = useForm<{ username: string; password: string }>();

  async function loadData() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin?tab=${tab}&q=${encodeURIComponent(q)}&status=${status}`);
      if (res.ok) {
        const data = await res.json();
        setRows(data.items || []);
        setLogged(true);
      } else if (res.status === 401) {
        setLogged(false);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (logged) loadData();
  }, [logged, tab, q, status]);

  async function handleLogin(v: { username: string; password: string }) {
    setLoading(true);
    setErr('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(v)
      });
      if (res.ok) {
        setLogged(true);
      } else {
        const data = await res.json();
        setErr(data.error || 'Invalid credentials');
      }
    } catch {
      setErr('Connection failed');
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, newStatus: string) {
    try {
      await fetch(`/api/admin?tab=${tab}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      loadData();
    } catch {
      // ignore
    }
  }

  if (!logged) {
    return (
      <main style={{ minHeight: '100vh', background: '#0f172a', display: 'grid', placeItems: 'center', padding: 24 }}>
        <div
          className="admin-card"
          style={{
            maxWidth: 440,
            width: '100%',
            background: '#ffffff',
            borderRadius: 24,
            padding: 36,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div
              className="logo-badge"
              style={{
                width: 54,
                height: 54,
                margin: '0 auto 16px',
                fontSize: 28
              }}
            >
              <span>म</span>
            </div>
            <h1 style={{ fontSize: 24, fontWeight: 800, margin: '0 0 6px', color: '#0f172a' }}>
              Mahan Dal · Admin Portal
            </h1>
            <p style={{ fontSize: 14, color: '#64748b', margin: 0 }}>
              केंद्रीय प्रशासनिक प्रबंधन एवं जन सुनवाई नियंत्रण कक्ष
            </p>
          </div>

          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="form-field">
              <label htmlFor="admin-user">Username</label>
              <input
                id="admin-user"
                {...register('username', { required: true })}
                placeholder="Admin username"
                autoComplete="username"
              />
            </div>

            <div className="form-field">
              <label htmlFor="admin-pass">Password</label>
              <input
                id="admin-pass"
                type="password"
                {...register('password', { required: true })}
                placeholder="••••••••••••"
                autoComplete="current-password"
              />
            </div>

            {err && (
              <div style={{ color: '#dc2626', fontSize: 13, marginBottom: 16, padding: 10, background: '#fee2e2', borderRadius: 8 }}>
                {err}
              </div>
            )}

            <button className="btn-submit" disabled={loading} style={{ background: '#ea580c' }}>
              {loading ? 'Authenticating…' : 'Sign in to Dashboard'}
            </button>

            <div style={{ textAlign: 'center', marginTop: 20 }}>
              <Link href="/" style={{ fontSize: 13, color: '#64748b', textDecoration: 'none' }}>
                ← Return to Public Website
              </Link>
            </div>
          </form>
        </div>
      </main>
    );
  }

  const counts = {
    total: rows.length,
    new: rows.filter((r) => r.status === 'new').length,
    progress: rows.filter((r) => r.status === 'in progress').length,
    resolved: rows.filter((r) => r.status === 'resolved').length
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a' }}>
      {/* Admin Header */}
      <header
        style={{
          background: '#0f172a',
          color: '#ffffff',
          padding: '16px 0',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div className="logo-badge" style={{ width: 40, height: 40, fontSize: 20 }}>
              <span>म</span>
            </div>
            <div>
              <strong style={{ fontSize: 18, letterSpacing: -0.01 }}>महान दल · Admin Management</strong>
              <span style={{ display: 'block', fontSize: 12, color: '#94a3b8' }}>
                Executive Control & Citizen Grievance Portal
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link
              href="/"
              target="_blank"
              style={{
                fontSize: 13,
                color: '#cbd5e1',
                textDecoration: 'none',
                padding: '6px 12px',
                borderRadius: 8,
                background: 'rgba(255, 255, 255, 0.1)'
              }}
            >
              View Live Website ↗
            </Link>
            <button
              onClick={() => setLogged(false)}
              className="lang-switch"
              style={{ background: '#334155', color: '#ffffff', borderColor: '#475569' }}
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="wrap" style={{ padding: '36px 0 64px' }}>
        {/* Metric Summary Cards */}
        <div className="admin-metrics-grid">
          <div className="admin-card" style={{ padding: 20, borderLeft: '4px solid #ea580c' }}>
            <span style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>Total Records</span>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#0f172a', marginTop: 4 }}>{counts.total}</div>
          </div>

          <div className="admin-card" style={{ padding: 20, borderLeft: '4px solid #f59e0b' }}>
            <span style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>New / Pending</span>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#d97706', marginTop: 4 }}>{counts.new}</div>
          </div>

          <div className="admin-card" style={{ padding: 20, borderLeft: '4px solid #0284c7' }}>
            <span style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>In Progress</span>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#0284c7', marginTop: 4 }}>{counts.progress}</div>
          </div>

          <div className="admin-card" style={{ padding: 20, borderLeft: '4px solid #16a34a' }}>
            <span style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>Resolved</span>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#16a34a', marginTop: 4 }}>{counts.resolved}</div>
          </div>
        </div>

        {/* Tab & Filter Bar */}
        <div className="admin-card" style={{ padding: 20, marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            {/* Tabs */}
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                ['letters', 'Letters to President', Send],
                ['jan', 'Jan Sunwai Grievances', FileText],
                ['members', 'Membership Registrations', Users]
              ].map(([k, label, Icon]: any) => (
                <button
                  key={k}
                  onClick={() => setTab(k)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '10px 18px',
                    borderRadius: 12,
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: 'none',
                    background: tab === k ? '#ea580c' : '#f1f5f9',
                    color: tab === k ? '#ffffff' : '#475569',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Actions: Search, Filter, Export */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', minWidth: 220 }}>
                <Search size={16} style={{ position: 'absolute', left: 12, top: 12, color: '#94a3b8' }} />
                <input
                  placeholder="Search records…"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  style={{
                    padding: '8px 12px 8px 36px',
                    borderRadius: 10,
                    border: '1.5px solid #cbd5e1',
                    fontSize: 14,
                    width: '100%'
                  }}
                />
              </div>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={{
                  padding: '9px 14px',
                  borderRadius: 10,
                  border: '1.5px solid #cbd5e1',
                  fontSize: 14,
                  fontWeight: 600,
                  background: '#ffffff'
                }}
              >
                <option value="">All Statuses</option>
                <option value="new">New</option>
                <option value="in progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>

              <a
                href={`/api/admin?tab=${tab}&csv=1&q=${encodeURIComponent(q)}&status=${status}`}
                download
                className="btn-header-join"
                style={{
                  background: '#15803d',
                  padding: '9px 16px',
                  fontSize: 13,
                  textDecoration: 'none'
                }}
              >
                <Download size={15} />
                <span>Export CSV</span>
              </a>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1.5px solid #e2e8f0' }}>
                  <th style={{ padding: '16px 20px', fontWeight: 800, color: '#475569' }}>Name</th>
                  <th style={{ padding: '16px 20px', fontWeight: 800, color: '#475569' }}>Mobile</th>
                  <th style={{ padding: '16px 20px', fontWeight: 800, color: '#475569' }}>District / Subject</th>
                  <th style={{ padding: '16px 20px', fontWeight: 800, color: '#475569' }}>Submitted Date</th>
                  <th style={{ padding: '16px 20px', fontWeight: 800, color: '#475569' }}>Status</th>
                  <th style={{ padding: '16px 20px', fontWeight: 800, color: '#475569', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: 48, textAlign: 'center', color: '#64748b' }}>
                      {loading ? 'Loading records…' : 'No records found matching current criteria.'}
                    </td>
                  </tr>
                ) : (
                  rows.map((row) => (
                    <tr
                      key={row._id}
                      style={{
                        borderBottom: '1px solid #f1f5f9',
                        transition: 'background 0.15s ease'
                      }}
                    >
                      <td style={{ padding: '16px 20px', fontWeight: 700, color: '#0f172a' }}>
                        {row.name}
                        {row.reference && (
                          <span style={{ display: 'block', fontSize: 11, color: '#94a3b8', fontWeight: 500 }}>
                            Ref: {row.reference}
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '16px 20px', color: '#334155' }}>
                        <a href={`tel:${row.mobile}`} style={{ color: '#0284c7', textDecoration: 'none', fontWeight: 600 }}>
                          {row.mobile}
                        </a>
                      </td>
                      <td style={{ padding: '16px 20px', color: '#334155' }}>
                        {row.district ? `District: ${row.district}` : row.subject ? row.subject : row.category || '—'}
                      </td>
                      <td style={{ padding: '16px 20px', color: '#64748b', fontSize: 13 }}>
                        {new Date(row.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <select
                          value={row.status || 'new'}
                          onChange={(e) => updateStatus(row._id, e.target.value)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: 8,
                            fontSize: 12,
                            fontWeight: 700,
                            border: '1px solid #cbd5e1',
                            background:
                              row.status === 'resolved'
                                ? '#dcfce7'
                                : row.status === 'in progress'
                                ? '#e0f2fe'
                                : '#fef3c7',
                            color:
                              row.status === 'resolved'
                                ? '#15803d'
                                : row.status === 'in progress'
                                ? '#0369a1'
                                : '#b45309'
                          }}
                        >
                          <option value="new">New</option>
                          <option value="in progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                        </select>
                      </td>
                      <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                        <button
                          onClick={() => setInspectRow(row)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: 8,
                            border: '1px solid #e2e8f0',
                            background: '#ffffff',
                            cursor: 'pointer',
                            fontSize: 12,
                            fontWeight: 600,
                            color: '#334155',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6
                          }}
                        >
                          <Eye size={13} />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Row Details Modal */}
      {inspectRow && (
        <div className="modal-overlay" onMouseDown={() => setInspectRow(null)}>
          <div
            className="modal-dialog"
            style={{ maxWidth: 580 }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <button className="modal-close-btn" onClick={() => setInspectRow(null)}>
                <X size={20} />
              </button>
              <small>Record Details</small>
              <h2>{inspectRow.name}</h2>
            </div>
            <div className="modal-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: 14 }}>
                <div>
                  <strong style={{ color: '#64748b' }}>Mobile:</strong>
                  <p style={{ margin: '2px 0 0', fontWeight: 600 }}>{inspectRow.mobile}</p>
                </div>

                {inspectRow.dob && (
                  <div>
                    <strong style={{ color: '#64748b' }}>Date of Birth:</strong>
                    <p style={{ margin: '2px 0 0' }}>{new Date(inspectRow.dob).toLocaleDateString('en-IN')}</p>
                  </div>
                )}

                {inspectRow.gender && (
                  <div>
                    <strong style={{ color: '#64748b' }}>Gender:</strong>
                    <p style={{ margin: '2px 0 0', textTransform: 'capitalize' }}>{inspectRow.gender}</p>
                  </div>
                )}

                {inspectRow.district && (
                  <div>
                    <strong style={{ color: '#64748b' }}>District:</strong>
                    <p style={{ margin: '2px 0 0' }}>{inspectRow.district}</p>
                  </div>
                )}

                {inspectRow.subject && (
                  <div>
                    <strong style={{ color: '#64748b' }}>Subject:</strong>
                    <p style={{ margin: '2px 0 0', fontWeight: 600 }}>{inspectRow.subject}</p>
                  </div>
                )}

                {(inspectRow.message || inspectRow.details) && (
                  <div>
                    <strong style={{ color: '#64748b' }}>Message / Details:</strong>
                    <p
                      style={{
                        margin: '6px 0 0',
                        padding: 14,
                        background: '#f8fafc',
                        borderRadius: 10,
                        border: '1px solid #e2e8f0',
                        whiteSpace: 'pre-wrap'
                      }}
                    >
                      {inspectRow.message || inspectRow.details}
                    </p>
                  </div>
                )}

                {inspectRow.address && (
                  <div>
                    <strong style={{ color: '#64748b' }}>Address:</strong>
                    <p style={{ margin: '2px 0 0' }}>{inspectRow.address}</p>
                  </div>
                )}

                {inspectRow.attachment && (
                  <div>
                    <strong style={{ color: '#64748b' }}>Attachment:</strong>
                    <p style={{ margin: '4px 0 0' }}>
                      <a
                        href={`data:application/octet-stream;base64,${inspectRow.attachment}`}
                        download={`attachment-${inspectRow.name}.bin`}
                        style={{ color: '#ea580c', fontWeight: 600 }}
                      >
                        Download Attached Document / Image ↗
                      </a>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
