'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, GraduationCap, FileHeart, MapPin, Trophy, Cloud, Sparkles, MessageCircle, UserPlus, HelpCircle } from 'lucide-react';
import Image from 'next/image';

const basesConvocatoria = [
  {
    n: "Primera",
    title: "Participantes",
    icon: <GraduationCap />,
    content: "Podrán participar niñas y niños que cursen educación primaria de la fase 5 (quinto y sexto de primaria) en las instituciones educativas del municipio."
  },
  {
    n: "Segunda",
    title: "Requisitos",
    icon: <FileHeart />,
    content: "Constancia de estudios actualizada e INE del tutor."
  },
  {
    n: "Tercera",
    title: "Registro",
    icon: <UserPlus />,
    content: "Cupo limitado a 10 aspirantes por cargo. Deberás adjuntar INE del tutor, constancia de estudios, autorizar el uso de imagen y el aviso de consentimiento informado."
  },
  {
    n: "Cuarta",
    title: "Escritos",
    icon: <MessageCircle />,
    content: "Se realizarán en el Parque Kiwikgolo el 24 de abril a las 8:30 hrs. El tema es: “¿Por qué deseo ser alcalde o alcaldesa, Síndica (o) o Regidores (as) por un día?”"
  },
  {
    n: "Quinta",
    title: "Selección",
    icon: <HelpCircle />,
    content: "El cabildo deliberará considerando la creatividad, claridad de ideas y el interés por mejorar la comunidad."
  },
  {
    n: "Sexta",
    title: "Resultados",
    icon: <Trophy />,
    content: "Los resultados se darán a conocer el día 24 de abril de 2026 en el Kiwikgolo a las 12:00 hrs."
  },
  {
    n: "Séptima",
    title: "Participación",
    icon: <Sparkles />,
    content: "Los seleccionados participarán en el homenaje el lunes 27 de abril a las 8:00 am y después en la sesión de cabildo infantil."
  },
  {
    n: "Octava",
    title: "Casos no previstos",
    icon: <Cloud />,
    content: "Cualquier situación no contemplada será resuelta por el comité organizador."
  }
];

export default function Bases() {
  const [openId, setOpenId] = useState<number | null>(0);
  const [showFull, setShowFull] = useState(false);

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Modal Convocatoria */}
      <AnimatePresence>
        {showFull && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
            onClick={() => setShowFull(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, rotate: -2 }}
              animate={{ scale: 1, rotate: 0 }}
              className="relative max-w-4xl w-full max-h-full overflow-y-auto bg-white rounded-[2rem] p-4 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowFull(false)}
                className="absolute top-4 right-4 bg-mexican-pink text-white w-10 h-10 rounded-full font-bold shadow-lg z-10 hover:scale-110 transition-transform"
              >
                X
              </button>
              <Image 
                src="/convocatoria.jpeg" 
                alt="Convocatoria Completa" 
                width={2000} 
                height={3000}
                className="w-full h-auto rounded-xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-6 text-slate-800 tracking-tight">
            Bases de la <span className="text-mexican-pink italic">Convocatoria</span>
          </h2>
          <button 
            onClick={() => setShowFull(true)}
            className="bg-aqua/20 text-aqua px-8 py-3 rounded-full font-black text-sm hover:bg-aqua hover:text-white transition-all shadow-sm border-2 border-aqua"
          >
            VER CONVOCATORIA COMPLETA
          </button>
        </div>
        
        <div className="space-y-4">
          {basesConvocatoria.map((base, idx) => (
            <motion.div 
              key={idx}
              className="glass-light rounded-[2rem] overflow-hidden"
            >
              <button
                onClick={() => setOpenId(openId === idx ? null : idx)}
                className="w-full p-6 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-mexican-pink/10 text-mexican-pink flex items-center justify-center font-bold">
                    {idx + 1}
                  </div>
                  <span className="text-xl font-black text-slate-700">{base.title}</span>
                </div>
                <ChevronDown className={`transition-transform duration-300 ${openId === idx ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {openId === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 text-slate-600 font-medium">
                      <p className="bg-white/40 p-6 rounded-2xl border-2 border-dashed border-aqua/30 italic">
                        <span className="font-black text-mexican-pink mr-2">{base.n}:</span>
                        {base.content}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
