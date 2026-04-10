'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, Users, FileText, Calendar, Send } from 'lucide-react';

const sections = [
  {
    id: 'participantes',
    title: 'Participantes',
    icon: <Users className="text-aqua" />,
    content: 'Niñas y niños de 5° y 6° año de primaria del municipio de Papantla.'
  },
  {
    id: 'requisitos',
    title: 'Requisitos',
    icon: <FileText className="text-mexican-pink" />,
    content: [
      'INE del tutor (Copia)',
      'Constancia de estudios vigente',
      'Aviso de consentimiento e integridad (no ser familiar de servidores públicos)',
    ]
  },
  {
    id: 'cita',
    title: 'Cita Presencial',
    icon: <Calendar className="text-aqua" />,
    content: '24 de abril en el Parque Kiwikgolo (9:00 a 11:00 hrs) para elaborar el escrito de 1 a 2 cuartillas.'
  },
  {
    id: 'resultados',
    title: 'Resultados',
    icon: <Send className="text-mexican-pink" />,
    content: '24 de abril a las 12:00 hrs en el Kiwikgolo.'
  }
];

export default function Bases() {
  const [openId, setOpenId] = useState<string | null>('participantes');

  return (
    <section className="py-20 px-4 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gradient">Bases de la Convocatoria</h2>
        
        <div className="space-y-4">
          {sections.map((section) => (
            <div key={section.id} className="glass rounded-3xl overflow-hidden">
              <button
                onClick={() => setOpenId(openId === section.id ? null : section.id)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                aria-expanded={openId === section.id}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                    {section.icon}
                  </div>
                  <span className="text-xl font-semibold text-white">{section.title}</span>
                </div>
                <ChevronDown 
                  className={`transition-transform duration-300 ${openId === section.id ? 'rotate-180' : ''}`}
                />
              </button>
              
              <AnimatePresence>
                {openId === section.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 pt-0 text-white/70 border-t border-white/5">
                      {Array.isArray(section.content) ? (
                        <ul className="list-disc pl-6 space-y-2">
                          {section.content.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>{section.content}</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
