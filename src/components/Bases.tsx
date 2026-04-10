'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, GraduationCap, FileHeart, MapPin, Trophy, Cloud } from 'lucide-react';

const sections = [
  {
    id: 'participantes',
    title: '¿Quiénes pueden participar?',
    icon: <GraduationCap size={32} className="text-white" />,
    color: 'bg-aqua',
    content: '¡Buscamos niñas y niños valientes de 5° y 6° año de todas las primarias de nuestro municipio!'
  },
  {
    id: 'requisitos',
    title: '¿Qué necesito traer?',
    icon: <FileHeart size={32} className="text-white" />,
    color: 'bg-mexican-pink',
    content: [
      'Documento de mamá o papá (INE)',
      'Tu constancia de estudios',
      'Un permiso firmado donde digas que no eres familiar de funcionarios',
    ]
  },
  {
    id: 'cita',
    title: '¿Dónde y cuándo es?',
    icon: <MapPin size={32} className="text-white" />,
    color: 'bg-yellow-400',
    content: 'Te esperamos el 24 de abril en el Parque Kiwikgolo (9:00 a 11:00 AM). ¡Escribiremos juntos una pequeña historia sobre nuestro Papantla!'
  },
  {
    id: 'resultados',
    title: '¡Descubre los resultados!',
    icon: <Trophy size={32} className="text-white" />,
    color: 'bg-purple-500',
    content: '¡Ese mismo día (24 de abril) a las 12:00 PM daremos a conocer quiénes serán nuestros pequeños gobernantes!'
  }
];

export default function Bases() {
  const [openId, setOpenId] = useState<string | null>('participantes');

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 text-aqua/5 -translate-y-1/2 translate-x-1/4">
        <Cloud size={400} />
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-4 text-slate-800 tracking-tight">
            Pasos para la <span className="text-mexican-pink underline decoration-aqua">Aventura</span>
          </h2>
          <p className="text-xl text-slate-500 font-medium italic">¡Es muy fácil ser parte del cambio!</p>
        </motion.div>
        
        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.div 
              key={section.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-light rounded-[2.5rem] overflow-hidden shadow-xl"
            >
              <button
                onClick={() => setOpenId(openId === section.id ? null : section.id)}
                className="w-full p-6 md:p-8 flex items-center justify-between text-left transition-all"
                aria-expanded={openId === section.id}
              >
                <div className="flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-[1.5rem] ${section.color} flex items-center justify-center shadow-lg rotate-3`}>
                    {section.icon}
                  </div>
                  <span className="text-2xl font-black text-slate-800">{section.title}</span>
                </div>
                <div className={`p-2 rounded-full border-2 border-slate-200 transition-transform ${openId === section.id ? 'rotate-180 bg-slate-100' : ''}`}>
                  <ChevronDown size={28} className="text-slate-500" />
                </div>
              </button>
              
              <AnimatePresence>
                {openId === section.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-8 pt-0 text-xl text-slate-600 font-medium leading-relaxed border-t border-slate-100">
                      {Array.isArray(section.content) ? (
                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                          {section.content.map((item, i) => (
                            <div key={i} className="flex items-center gap-3 bg-white/40 p-4 rounded-2xl border border-white/60">
                              <div className="w-3 h-3 rounded-full bg-aqua" />
                              {item}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="mt-4">{section.content}</p>
                      )}
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
