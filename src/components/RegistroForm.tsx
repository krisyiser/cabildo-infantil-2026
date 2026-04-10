'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Loader2, PartyPopper, User, School, Award, Phone, Heart } from 'lucide-react';

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
          particleCount: 200,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#00E5FF', '#FF0080', '#FFEB3B', '#7C4DFF']
        });
      } else {
        setError(result.error || '¡Ups! Algo salió mal. ¡Inténtalo de nuevo!');
      }
    } catch (err) {
      setError('¡Oh no! No pudimos conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="py-20 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          className="max-w-xl mx-auto p-12 glass-light rounded-[3rem] text-center border-4 border-aqua shadow-2xl relative"
        >
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
            <PartyPopper size={48} className="text-white" />
          </div>
          <h3 className="text-4xl font-black mb-4 text-slate-800 mt-6">¡YAY! ¡LISTO!</h3>
          <p className="text-xl text-slate-600 mb-8 font-medium italic">¡Ya eres parte de esta gran aventura!</p>
          <div className="bg-white p-8 rounded-[2rem] border-4 border-dashed border-mexican-pink shadow-inner">
            <p className="text-sm text-mexican-pink uppercase font-black tracking-widest mb-2">Este es tu súper número de folio:</p>
            <p className="text-5xl font-mono font-black text-slate-800">{success}</p>
          </div>
          <p className="mt-8 text-slate-500 font-medium">¡Dile a tus papás que guarden este número!</p>
          <button 
            onClick={() => setSuccess(null)}
            className="mt-10 text-aqua font-black text-lg underline underline-offset-8 hover:text-mexican-pink transition-colors"
          >
            Registrar a otro amiguito
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <section id="registro" className="py-24 px-4 bg-gradient-to-b from-soft-bg to-white relative">
      <div className="max-w-3xl mx-auto">
        <div className="glass-light p-10 md:p-16 rounded-[4rem] border-4 border-white shadow-2xl relative overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-aqua/10 rounded-full translate-x-10 -translate-y-10" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-mexican-pink/10 rounded-full -translate-x-5 translate-y-5" />

          <div className="text-center mb-12">
            <h2 className="text-5xl font-black text-slate-800 mb-4">¡Inscríbete Aquí!</h2>
            <div className="flex justify-center gap-2">
              <div className="w-12 h-2 bg-aqua rounded-full" />
              <div className="w-4 h-2 bg-mexican-pink rounded-full" />
              <div className="w-2 h-2 bg-yellow-400 rounded-full" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-lg font-black text-slate-700 pl-2">
                  <User size={20} className="text-aqua" /> Tu Nombre
                </label>
                <input
                  required
                  name="nombre"
                  placeholder="¿Cómo te llamas?"
                  className="w-full bg-white border-2 border-slate-100 rounded-2xl p-5 text-lg focus:ring-4 focus:ring-aqua/20 focus:border-aqua outline-none transition-all placeholder:text-slate-300 font-medium"
                />
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-lg font-black text-slate-700 pl-2">
                  <School size={20} className="text-mexican-pink" /> Tu Escuela
                </label>
                <input
                  required
                  name="escuela"
                  placeholder="¿En qué escuela vas?"
                  className="w-full bg-white border-2 border-slate-100 rounded-2xl p-5 text-lg focus:ring-4 focus:ring-mexican-pink/20 focus:border-mexican-pink outline-none transition-all placeholder:text-slate-300 font-medium"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-lg font-black text-slate-700 pl-2">
                   ¿En qué grado estás?
                </label>
                <select 
                  required
                  name="grado"
                  className="w-full bg-white border-2 border-slate-100 rounded-2xl p-5 text-lg focus:ring-4 focus:ring-aqua/20 focus:border-aqua outline-none transition-all appearance-none font-medium cursor-pointer"
                >
                  <option value="">Selecciona tu año</option>
                  <option value="5°">5° Año de Primaria</option>
                  <option value="6°">6° Año de Primaria</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-lg font-black text-slate-700 pl-2">
                  <Award size={20} className="text-yellow-500" /> ¿Qué quieres ser?
                </label>
                <select 
                  required
                  name="cargo"
                  className="w-full bg-white border-2 border-slate-100 rounded-2xl p-5 text-lg focus:ring-4 focus:ring-mexican-pink/20 focus:border-mexican-pink outline-none transition-all appearance-none font-medium cursor-pointer"
                >
                  <option value="">Selecciona un puesto</option>
                  <option value="Alcalde/sa">Alcalde/sa</option>
                  <option value="Síndica/o">Síndica/o</option>
                  <option value="Regidora/or">Regidora/or</option>
                </select>
                <p className="text-xs text-slate-400 px-2 italic">
                  *Hay 11 regidurías con muchas misiones divertidas.
                </p>
              </div>
            </div>

            <div className="p-8 bg-blue-50/50 rounded-[2.5rem] border-2 border-blue-100 space-y-8">
               <h4 className="text-xl font-black text-blue-600 flex items-center gap-2">
                 <Heart size={24} className="fill-blue-600" /> Datos de un familiar
               </h4>
               <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-lg font-black text-slate-700 pl-2">Nombre de Papá, Mamá o Tutor</label>
                  <input
                    required
                    name="tutor"
                    placeholder="Nombre completo"
                    className="w-full bg-white border-2 border-slate-100 rounded-2xl p-5 text-lg focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all font-medium"
                  />
                </div>
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-lg font-black text-slate-700 pl-2">
                    <Phone size={20} className="text-blue-500" /> Su Teléfono
                  </label>
                  <input
                    required
                    name="telefono"
                    type="tel"
                    placeholder="784..."
                    className="w-full bg-white border-2 border-slate-100 rounded-2xl p-5 text-lg focus:ring-4 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            {error && (
              <p className="text-red-500 font-bold text-center bg-red-50 p-6 rounded-2xl border-2 border-red-100">
                {error}
              </p>
            )}

            <button
              disabled={loading}
              className="w-full btn-playful p-6 rounded-[2rem] font-black text-2xl flex items-center justify-center gap-4 disabled:opacity-50 shadow-2xl"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" /> ESTAMOS LISTOS...
                </>
              ) : (
                '¡ENVIAR MI REGISTRO!'
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
