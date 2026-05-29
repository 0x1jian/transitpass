const BASE_URL = 'http://localhost:3001';

export const bookingAPI = {
  getAll: async () => {
    const res = await fetch(`${BASE_URL}/bookings`);
    if (!res.ok) throw new Error('Failed to fetch bookings');
    return res.json();
  },

  getById: async (id) => {
    const res = await fetch(`${BASE_URL}/bookings/${id}`);
    if (!res.ok) throw new Error('Booking not found');
    return res.json();
  },

  create: async (booking) => {
    const res = await fetch(`${BASE_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...booking,
        createdAt: new Date().toISOString(),
      }),
    });
    if (!res.ok) throw new Error('Failed to create booking');
    return res.json();
  },

  update: async (id, booking) => {
    const res = await fetch(`${BASE_URL}/bookings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking),
    });
    if (!res.ok) throw new Error('Failed to update booking');
    return res.json();
  },

  delete: async (id) => {
    const res = await fetch(`${BASE_URL}/bookings/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete booking');
    return true;
  },
};
