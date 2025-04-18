import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import BookingForm from '../components/BookingForm';

export default function Home() {
  const { data: session } = useSession();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());

  if (!session) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-xl mb-4">🔐 Inicia sesión para continuar</h2>
        <button
          onClick={() => signIn('google')}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Iniciar sesión con Google
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Bienvenida, {session.user.name}</h1>
        <button
          onClick={() => signOut()}
          className="bg-gray-300 px-4 py-1 rounded"
        >
          Cerrar sesión
        </button>
      </div>

      <h2 className="text-2xl mb-4">📅 Reserva tu sesión</h2>
      <p>Reservar para el: <strong>{new Date(selectedDate).toLocaleString()}</strong></p>
      <BookingForm selectedDate={selectedDate} />
    </div>
  );
}
