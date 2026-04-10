'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Loader2, CheckCircle2 } from 'lucide-react';

export default function RegistroForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        setSuccess(result.folio);
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00FFFF', '#E4007C', '#ffffff']
        });
      } else {
        setError(result.error || 'Ocurrió un error al registrar.');
      }
    } catch (err) {
      setError('Error de conexión con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto p-10 glass rounded-3xl text-center"
      >
        <CheckCircle2 className="w-20 h-20 text-aqua mx-auto mb-6" />
        <h3 className="text-3xl font-bold mb-4">¡Registro Exitoso!</h3>
        <p className="text-white/70 mb-6">Tu registro ha sido guardado correctamente.</p>
        <div className="bg-white/5 p-4 rounded-2xl border border-aqua/30">
          <p className="text-sm text-aqua uppercase tracking-widest mb-1">Tu Folio es:</p>
          <p className="text-4xl font-mono font-bold text-mexican-pink">{success}</p>
        </div>
        <p className="mt-6 text-sm text-white/50">Guarda este folio para el día del evento.</p>
        <button 
          onClick={() => setSuccess(null)}
          className="mt-8 text-aqua underline underline-offset-4 hover:text-white transition-colors"
        >
          Registrar a alguien más
        </button>
      </motion.div>
    );
  }

  return (
    <section id="registro" className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="glass p-8 md:p-12 rounded-[3.5rem] border-2 border-aqua/20">
          <h2 className="text-4xl font-bold text-center mb-2">Formulario de Registro</h2>
          <p className="text-center text-white/60 mb-10">Únete a la construcción de nuestro municipio</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-aqua pl-2">Nombre Completo del Niño/a</label>
                <input
                  required
                  name="nombre"
                  placeholder="Juan Perez..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:ring-2 focus:ring-aqua focus:border-transparent outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-aqua pl-2">Escuela</label>
                <input
                  required
                  name="escuela"
                  placeholder="Primaria Lazaro Cardenas"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:ring-2 focus:ring-aqua focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-aqua pl-2">Grado</label>
                <select 
                  required
                  name="grado"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:ring-2 focus:ring-aqua focus:border-transparent outline-none transition-all appearance-none"
                >
                  <option className="bg-[#0a0a0a]" value="">Selecciona grado</option>
                  <option className="bg-[#0a0a0a]" value="5°">5° Año</option>
                  <option className="bg-[#0a0a0a]" value="6°">6° Año</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-aqua pl-2">Cargo a Postular</label>
                <select 
                  required
                  name="cargo"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:ring-2 focus:ring-aqua focus:border-transparent outline-none transition-all appearance-none"
                >
                  <option className="bg-[#0a0a0a]" value="">Selecciona cargo</option>
                  <option className="bg-[#0a0a0a]" value="Alcalde/sa">Alcalde/sa</option>
                  <option className="bg-[#0a0a0a]" value="Síndica/o">Síndica/o</option>
                  <option className="bg-[#0a0a0a]" value="Regidora/or">Regidora/or</option>
                </select>
                <p className="text-[10px] text-white/40 px-2 mt-1 italic">
                  *Nota: Contamos con 11 regidurías con diversas comisiones.
                </p>
              </div>
            </div>

            <hr className="border-white/5 my-4" />

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-mexican-pink pl-2">Nombre del Tutor</label>
                <input
                  required
                  name="tutor"
                  placeholder="María Rodriguez..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:ring-2 focus:ring-mexican-pink focus:border-transparent outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-mexican-pink pl-2">Teléfono de Contacto</label>
                <input
                  required
                  name="telefono"
                  type="tel"
                  placeholder="784..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:ring-2 focus:ring-mexican-pink focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center bg-red-400/10 p-4 rounded-xl border border-red-400/20">
                {error}
              </p>
            )}

            <button
              disabled={loading}
              className="w-full btn-primary p-5 rounded-3xl font-bold text-lg flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" /> Procesando...
                </>
              ) : (
                'Completar Registro'
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
