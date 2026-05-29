import React, { useState, useEffect } from 'react';

const ROUTES = [
  'Manila → Batangas',
  'Batangas → Manila',
  'Manila → Lipa City',
  'Lipa City → Manila',
  'Manila → Tagaytay',
  'Tagaytay → Manila',
  'Batangas → Lipa City',
  'Lipa City → Batangas',
];

const TIMES = [
  '05:00', '06:00', '07:00', '07:30', '08:00', '08:30',
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
  '15:00', '16:00', '16:30', '17:00', '18:00', '19:00',
  '20:00', '21:00',
];

const TICKET_FARES = { Economy: 250, Business: 500 };

const empty = {
  passengerName: '',
  email: '',
  phone: '',
  route: ROUTES[0],
  departureDate: '',
  departureTime: '06:00',
  seatNumber: '',
  ticketType: 'Economy',
  status: 'Pending',
  fare: 250,
};

export default function BookingModal({ booking, onSave, onClose }) {
  const isEdit = !!booking;
  const [form, setForm] = useState(isEdit ? booking : empty);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isEdit) {
      setForm(f => ({ ...f, fare: TICKET_FARES[f.ticketType] }));
    }
  }, [form.ticketType, isEdit]);

  const set = (field, value) => {
    setForm(f => {
      const next = { ...f, [field]: value };
      if (field === 'ticketType') next.fare = TICKET_FARES[value];
      return next;
    });
    setErrors(e => ({ ...e, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.passengerName.trim()) e.passengerName = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    if (!form.departureDate) e.departureDate = 'Date is required';
    if (!form.seatNumber.trim()) e.seatNumber = 'Seat number is required';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onSave(form);
  };

  const field = (name, label, type = 'text', placeholder = '') => (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <input
        className={`form-input${errors[name] ? ' error' : ''}`}
        type={type}
        placeholder={placeholder}
        value={form[name]}
        onChange={e => set(name, e.target.value)}
      />
      {errors[name] && <span className="form-error">{errors[name]}</span>}
    </div>
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {isEdit ? '✏️ Edit Booking' : '🎟 New Booking'}
          </h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="form-grid">
            {field('passengerName', 'Passenger Name', 'text', 'Full name')}
            {field('phone', 'Phone Number', 'tel', '+63 9XX XXX XXXX')}

            <div className="form-group full-width">
              <label className="form-label">Email Address</label>
              <input
                className={`form-input${errors.email ? ' error' : ''}`}
                type="email"
                placeholder="passenger@email.com"
                value={form.email}
                onChange={e => set('email', e.target.value)}
              />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            <div className="form-group full-width">
              <label className="form-label">Route</label>
              <select className="form-select" value={form.route} onChange={e => set('route', e.target.value)}>
                {ROUTES.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Departure Date</label>
              <input
                className={`form-input${errors.departureDate ? ' error' : ''}`}
                type="date"
                value={form.departureDate}
                onChange={e => set('departureDate', e.target.value)}
              />
              {errors.departureDate && <span className="form-error">{errors.departureDate}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Departure Time</label>
              <select className="form-select" value={form.departureTime} onChange={e => set('departureTime', e.target.value)}>
                {TIMES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Seat Number</label>
              <input
                className={`form-input${errors.seatNumber ? ' error' : ''}`}
                type="text"
                placeholder="e.g. 12A"
                value={form.seatNumber}
                onChange={e => set('seatNumber', e.target.value.toUpperCase())}
              />
              {errors.seatNumber && <span className="form-error">{errors.seatNumber}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Ticket Type</label>
              <select className="form-select" value={form.ticketType} onChange={e => set('ticketType', e.target.value)}>
                <option>Economy</option>
                <option>Business</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Status</label>
              <select className="form-select" value={form.status} onChange={e => set('status', e.target.value)}>
                <option>Confirmed</option>
                <option>Pending</option>
                <option>Cancelled</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Fare (₱)</label>
              <input
                className="form-input"
                type="number"
                value={form.fare}
                onChange={e => set('fare', Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            {isEdit ? '💾 Save Changes' : '🎟 Book Ticket'}
          </button>
        </div>
      </div>
    </div>
  );
}
