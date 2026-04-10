'use client';

import { useEffect, useState } from 'react';
import { Search, Filter, Download, Briefcase, UserCheck, Star, FileImage, ExternalLink, Calendar } from 'lucide-react';

export default function AdminDashboard() {
  const [inscritos, setInscritos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const owner = "krisyiser";
        const repo = "cabildo-infantil-2026";
        const path = 'data/inscritos.json';
        
        const response = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/main/${path}?t=${Date.now()}`);
        if (response.ok) {
          const data = await response.json();
          setInscritos(data.reverse()); // Newest first
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const getImagePath = (path: string) => {
    return `https://raw.githubusercontent.com/krisyiser/cabildo-infantil-2026/main/${path}`;
  };

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-slate-800 p-8 md:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-aqua rounded-2xl flex items-center justify-center shadow-lg rotate-3">
                <Star className="text-white fill-white" />
              </div>
              <h1 className="text-4xl font-black tracking-tight text-slate-900">Dashboard Papantla</h1>
            </div>
            <p className="text-slate-500 font-medium font-outfit">Control de Aspirantes - Cabildo Infantil 2026</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="bg-white border-4 border-white shadow-xl px-10 py-6 rounded-[2.5rem] text-center">
                <p className="text-3xl font-black text-mexican-pink leading-none">{inscritos.length}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Total Niños</p>
             </div>
          </div>
        </header>

        <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                  <th className="p-8">Folio / Fecha</th>
                  <th className="p-8">Aspirante</th>
                  <th className="p-8">Cargo / Comisión</th>
                  <th className="p-8">Documentos</th>
                  <th className="p-8">Tutor / Tel</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr><td colSpan={5} className="p-24 text-center text-slate-300 font-black animate-pulse">CARGANDO REGISTROS...</td></tr>
                ) : inscritos.length === 0 ? (
                  <tr><td colSpan={5} className="p-24 text-center text-slate-300 font-black italic">¡AÚN NO HAY REGISTROS!</td></tr>
                ) : (
                  inscritos.map((item, idx) => (
                    <tr key={idx} className="hover:bg-soft-bg/50 transition-colors group">
                      <td className="p-8">
                        <p className="font-black text-mexican-pink mb-1">{item.folio}</p>
                        <p className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                            <Calendar size={10} /> {new Date(item.fecha).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="p-8">
                        <p className="font-black text-slate-800 text-lg">{item.nombre}</p>
                        <p className="text-xs font-bold text-aqua uppercase">{item.escuela} • {item.grado}</p>
                      </td>
                      <td className="p-8">
                        <div className="flex flex-col gap-1">
                            <span className="text-sm font-black text-slate-700">{item.cargo}</span>
                            {item.regiduria_name && (
                                <span className="text-[10px] font-bold text-mexican-pink italic">
                                    {item.regiduria_name}
                                </span>
                            )}
                        </div>
                      </td>
                      <td className="p-8">
                        <div className="flex gap-2">
                           <a href={getImagePath(item.ine_url)} target="_blank" className="p-2 bg-aqua/10 text-aqua rounded-lg hover:bg-aqua hover:text-white transition-all" title="Ver INE">
                                <FileImage size={18} />
                           </a>
                           <a href={getImagePath(item.constancia_url)} target="_blank" className="p-2 bg-mexican-pink/10 text-mexican-pink rounded-lg hover:bg-mexican-pink hover:text-white transition-all" title="Ver Constancia">
                                <ExternalLink size={18} />
                           </a>
                        </div>
                      </td>
                      <td className="p-8">
                         <p className="text-sm font-black text-slate-700">{item.tutor}</p>
                         <p className="text-xs font-bold text-slate-400 font-mono">{item.telefono}</p>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
