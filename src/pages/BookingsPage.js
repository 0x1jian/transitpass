import React, { useState } from 'react';
import BookingModal from '../components/BookingModal';
import ConfirmModal from '../components/ConfirmModal';

export default function BookingsPage({ bookings, onCreate, onUpdate, onDelete }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = bookings.filter(b => {
    const q = search.toLowerCase();
    const matchSearch =
      b.passengerName.toLowerCase().includes(q) ||
      b.email.toLowerCase().includes(q) ||
      b.route.toLowerCase().includes(q) ||
      b.seatNumber.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'All' || b.status === statusFilter;
    const matchType = typeFilter === 'All' || b.ticketType === typeFilter;
    return matchSearch && matchStatus && matchType;
  });

  const statusBadge = (status) => {
    const cls = {
      Confirmed: 'badge-confirmed',
      Pending: 'badge-pending',
      Cancelled: 'badge-cancelled',
    }[status] || '';
    return <span className={`badge ${cls}`}>{status}</span>;
  };

  const openEdit = (b) => { setEditTarget(b); setShowForm(true); };

  const handleSave = (formData) => {
    if (editTarget) {
      onUpdate({ ...editTarget, ...formData });
    } else {
      onCreate(formData);
    }
    setShowForm(false);
    setEditTarget(null);
  };

  const handleDelete = () => {
    onDelete(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <div className="page-container">
      {/* Toolbar */}
      <div className="toolbar">
        <div className="search-wrap">
          <input
            className="search-input"
            placeholder="Search passenger, route, seat..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <select
          className="filter-select"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option>Confirmed</option>
          <option>Pending</option>
          <option>Cancelled</option>
        </select>

        <select
          className="filter-select"
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
        >
          <option value="All">All Types</option>
          <option>Economy</option>
          <option>Business</option>
        </select>

        <button className="btn btn-primary" onClick={() => { setEditTarget(null); setShowForm(true); }}>
          + New Booking
        </button>
      </div>

      {/* Section header */}
      <div className="section-header">
        <h2 className="section-title">Passenger Bookings</h2>
        <span className="count-chip">{filtered.length} records</span>
      </div>

      {/* Table */}
      <div className="table-wrap">
        <div className="table-header-row">
          <span className="th">Passenger</span>
          <span className="th">Route</span>
          <span className="th">Seat / Type</span>
          <span className="th">Status</span>
          <span className="th">Fare</span>
          <span className="th">Date</span>
          <span className="th" style={{ textAlign: 'right' }}>Actions</span>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <h3>No bookings found</h3>
            <p style={{ fontSize: 14, marginTop: 4 }}>
              {search || statusFilter !== 'All' || typeFilter !== 'All'
                ? 'Try adjusting your search or filters.'
                : 'Click "+ New Booking" to add the first one.'}
            </p>
          </div>
        ) : (
          filtered.map((b, i) => (
            <div
              className="table-row"
              key={b.id}
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="passenger-info">
                <div className="name">{b.passengerName}</div>
                <div className="email">{b.email}</div>
              </div>

              <div className="route-info">
                <div className="route">{b.route}</div>
                <div className="datetime">{b.departureTime}</div>
              </div>

              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{b.seatNumber}</div>
                <span className={`ticket-chip ${b.ticketType}`}>{b.ticketType}</span>
              </div>

              <div>{statusBadge(b.status)}</div>

              <div className="fare-cell">₱{b.fare?.toLocaleString()}</div>

              <div style={{ color: 'var(--clr-text-muted)', fontSize: 13 }}>
                {b.departureDate}
              </div>

              <div className="row-actions">
                <button
                  className="btn-icon edit"
                  title="Edit booking"
                  onClick={() => openEdit(b)}
                >EDIT</button>
                <button
                  className="btn-icon delete"
                  title="Delete booking"
                  onClick={() => setDeleteTarget(b)}
                >DELETE</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modals */}
      {showForm && (
        <BookingModal
          booking={editTarget}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditTarget(null); }}
        />
      )}

      {deleteTarget && (
        <ConfirmModal
          booking={deleteTarget}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
