import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import ToastContainer from './components/ToastContainer';
import Dashboard from './pages/Dashboard';
import BookingsPage from './pages/BookingsPage';
import { bookingAPI } from './utils/api';
import { useToast } from './hooks/useToast';

const PAGE_TITLES = {
  dashboard: 'Dashboard',
  bookings: 'Bookings',
};

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toasts, addToast } = useToast();

  const loadBookings = useCallback(async () => {
    try {
      const data = await bookingAPI.getAll();
      setBookings(data);
    } catch {
      addToast('Failed to load bookings. Is JSON Server running?', 'error');
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => { loadBookings(); }, [loadBookings]);

  const handleCreate = async (form) => {
    try {
      const created = await bookingAPI.create(form);
      setBookings(prev => [...prev, created]);
      addToast(`Booking for ${created.passengerName} created!`, 'success');
    } catch {
      addToast('Failed to create booking.', 'error');
    }
  };

  const handleUpdate = async (booking) => {
    try {
      const updated = await bookingAPI.update(booking.id, booking);
      setBookings(prev => prev.map(b => b.id === updated.id ? updated : b));
      addToast(`Booking for ${updated.passengerName} updated!`, 'success');
    } catch {
      addToast('Failed to update booking.', 'error');
    }
  };

  const handleDelete = async (id) => {
    const target = bookings.find(b => b.id === id);
    try {
      await bookingAPI.delete(id);
      setBookings(prev => prev.filter(b => b.id !== id));
      addToast(`Booking for ${target?.passengerName} deleted.`, 'info');
    } catch {
      addToast('Failed to delete booking.', 'error');
    }
  };

  return (
    <div className="app-shell">
      <Sidebar activePage={page} onNavigate={setPage} />

      <div className="main-content">
        <header className="topbar">
          <h1 className="topbar-title">{PAGE_TITLES[page]}</h1>
          <div className="topbar-actions">
            <span style={{ color: 'var(--clr-text-muted)', fontSize: 13 }}>
              {bookings.length} total records
            </span>
            <button
              className="btn btn-ghost"
              style={{ fontSize: 13 }}
              onClick={loadBookings}
              title="Refresh data"
            >
              Refresh
            </button>
          </div>
        </header>

        {loading ? (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flex: 1, gap: 12, color: 'var(--clr-text-muted)', fontSize: 15,
          }}>
            <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⏳</span>
            Loading bookings...
          </div>
        ) : page === 'dashboard' ? (
          <Dashboard bookings={bookings} />
        ) : (
          <BookingsPage
            bookings={bookings}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        )}
      </div>

      <ToastContainer toasts={toasts} />
    </div>
  );
}
