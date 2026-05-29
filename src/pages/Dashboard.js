import React from 'react';

export default function Dashboard({ bookings }) {
  const total = bookings.length;
  const confirmed = bookings.filter(b => b.status === 'Confirmed').length;
  const pending = bookings.filter(b => b.status === 'Pending').length;
  const cancelled = bookings.filter(b => b.status === 'Cancelled').length;
  const revenue = bookings
    .filter(b => b.status === 'Confirmed')
    .reduce((sum, b) => sum + (b.fare || 0), 0);

  const recent = [...bookings]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const statusBadge = (status) => {
    const cls = {
      Confirmed: 'badge-confirmed',
      Pending: 'badge-pending',
      Cancelled: 'badge-cancelled',
    }[status] || 'badge-pending';
    return <span className={`badge ${cls}`}>{status}</span>;
  };

  return (
    <div className="page-container">
      <div className="dashboard-stats">
        <div className="stat-card" style={{ animationDelay: '0ms' }}>
          <div>
            <div className="stat-label">Total Bookings</div>
            <div className="stat-value">{total}</div>
          </div>
          <div className="stat-change">All time records</div>
        </div>

        <div className="stat-card" style={{ animationDelay: '60ms' }}>
          <div>
            <div className="stat-label">Confirmed</div>
            <div className="stat-value">{confirmed}</div>
          </div>
          <div className="stat-change">{total ? Math.round((confirmed / total) * 100) : 0}% of all bookings</div>
        </div>

        <div className="stat-card" style={{ animationDelay: '120ms' }}>
          <div>
            <div className="stat-label">Pending</div>
            <div className="stat-value">{pending}</div>
          </div>
          <div className="stat-change">Awaiting confirmation</div>
        </div>

        <div className="stat-card" style={{ animationDelay: '180ms' }}>
          <div>
            <div className="stat-label">Revenue</div>
            <div className="stat-value">₱{revenue.toLocaleString()}</div>
          </div>
          <div className="stat-change">From confirmed bookings</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Recent Bookings */}
        <div>
          <div className="section-header">
            <h2 className="section-title">Recent Bookings</h2>
          </div>
          <div className="table-wrap">
            {recent.length === 0 ? (
              <div className="empty-state">
                <h3>No bookings yet</h3>
              </div>
            ) : (
              recent.map((b, i) => (
                <div key={b.id} style={{
                  padding: '14px 20px',
                  borderBottom: i < recent.length - 1 ? '1px solid var(--clr-border)' : 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  animation: `fadeUp 0.3s ease ${i * 60}ms both`,
                }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{b.passengerName}</div>
                    <div style={{ color: 'var(--clr-text-muted)', fontSize: 12, marginTop: 2 }}>
                      {b.route} · {b.departureDate}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                    {statusBadge(b.status)}
                    <span style={{ color: 'var(--clr-accent)', fontWeight: 700, fontSize: 13 }}>₱{b.fare}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Status Breakdown */}
        <div>
          <div className="section-header">
            <h2 className="section-title">Status Breakdown</h2>
          </div>
          <div className="table-wrap" style={{ padding: 24 }}>
            {[
              { label: 'Confirmed', count: confirmed, color: 'var(--clr-success)' },
              { label: 'Pending', count: pending, color: 'var(--clr-warning)' },
              { label: 'Cancelled', count: cancelled, color: 'var(--clr-danger)' },
            ].map((s, i) => (
              <div key={s.label} style={{ marginBottom: i < 2 ? 20 : 0, animation: `fadeUp 0.4s ease ${i * 80}ms both` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
                  <span>{s.icon} {s.label}</span>
                  <span style={{ fontWeight: 700 }}>{s.count} <span style={{ color: 'var(--clr-text-muted)', fontWeight: 400 }}>/ {total}</span></span>
                </div>
                <div style={{ background: 'var(--clr-surface-2)', borderRadius: 99, height: 8, overflow: 'hidden' }}>
                  <div style={{
                    width: total ? `${(s.count / total) * 100}%` : '0%',
                    height: '100%',
                    background: s.color,
                    borderRadius: 99,
                    transition: 'width 0.6s ease',
                  }} />
                </div>
              </div>
            ))}

            <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--clr-border)' }}>
              <div style={{ fontSize: 12, color: 'var(--clr-text-muted)', marginBottom: 8 }}>POPULAR ROUTES</div>
              {Object.entries(
                bookings.reduce((acc, b) => {
                  acc[b.route] = (acc[b.route] || 0) + 1;
                  return acc;
                }, {})
              )
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(([route, count]) => (
                  <div key={route} style={{
                    display: 'flex', justifyContent: 'space-between',
                    padding: '7px 0', fontSize: 13,
                    borderBottom: '1px solid var(--clr-border)',
                  }}>
                    <span>{route}</span>
                    <span style={{ color: 'var(--clr-accent)', fontWeight: 700 }}>{count} trips</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
