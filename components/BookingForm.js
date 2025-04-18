import { useState } from 'react';

export default function BookingForm({ selectedDate }) {
  const [formData, setFormData] = useState({ name: '', email: '', intention: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, date: selectedDate })
    });
    if (res.ok) setSubmitted(true);
  };

  if (submitted) return <p className="text-green-600">✅ Reserva confirmada</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <input
        name="name"
        placeholder="Nombre"
        className="w-full border p-2 rounded"
        onChange={handleChange}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Correo electrónico"
        className="w-full border p-2 rounded"
        onChange={handleChange}
        required
      />
      <textarea
        name="intention"
        placeholder="¿Cuál es tu intención para esta sesión?"
        className="w-full border p-2 rounded"
        onChange={handleChange}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Reservar</button>
    </form>
  );
}
