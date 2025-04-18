import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, date, intention } = req.body;

    const { data, error } = await supabase
      .from('bookings')
      .insert([{ name, email, date, intention }]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ message: 'Reserva guardada', data });
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
