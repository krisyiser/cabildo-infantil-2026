'use client';

import { useEffect, useState } from 'react';
import { Search, Filter, Download, Briefcase, UserCheck, Star } from 'lucide-react';

const comisiones = [
  "Hacienda y Patrimonio Municipal",
  "Turismo y Cultura",
  "Salud y Asistencia Pública",
  "Educación, Recreación y Deporte",
  "Seguridad Pública y Tránsito",
  "Ecología y Medio Ambiente",
  "Comercio y Abasto",
  "Obras Públicas y Comunicaciones",
  "Igualdad de Género",
  "Participación Ciudadana",
  "Fomento Agropecuario"
];

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
          setInscritos(data);
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-soft-bg text-slate-800 p-8 md:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-aqua rounded-2xl flex items-center justify-center shadow-lg rotate-3">
                <Star className="text-white fill-white" />
              </div>
              <h1 className="text-4xl font-black tracking-tight text-slate-900">Dashboard Limaxtum</h1>
            </div>
            <p className="text-slate-500 font-medium italic">Gestión de Niñas y Niños Aspirantes - Cabildo 2026</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white px-6 py-4 rounded-3xl shadow-sm border-2 border-slate-100 flex items-center gap-6">
              <div className="text-center">
                <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Total</p>
                <p className="text-2xl font-black text-mexican-pink leading-none">{inscritos.length}</p>
              </div>
              <div className="w-px h-8 bg-slate-100" />
              <button className="flex items-center gap-2 text-aqua font-bold hover:scale-105 transition-transform">
                <Download size={20} /> Exportar
              </button>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Tabla de Inscritos */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                <h3 className="font-black text-xl flex items-center gap-3">
                  <UserCheck size={24} className="text-aqua" /> Aspirantes Registrados
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-slate-400 text-xs uppercase tracking-widest">
                      <th className="p-8 font-black">Folio</th>
                      <th className="p-8 font-black">Nombre Aspirante</th>
                      <th className="p-8 font-black">Escuela / Grado</th>
                      <th className="p-8 font-black">Aspiración</th>
                      <th className="p-8 font-black">Tutor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {loading ? (
                      <tr><td colSpan={5} className="p-24 text-center text-slate-300 font-bold">Buscando en los archivos...</td></tr>
                    ) : inscritos.length === 0 ? (
                      <tr><td colSpan={5} className="p-24 text-center text-slate-300 font-bold italic">¡Aún no hay inscritos! ¡La aventura apenas comienza!</td></tr>
                    ) : (
                      inscritos.map((item, idx) => (
                        <tr key={idx} className="hover:bg-soft-bg/30 transition-colors group">
                          <td className="p-8">
                            <span className="font-mono font-black text-mexican-pink bg-mexican-pink/5 px-3 py-1 rounded-lg">
                              {item.folio}
                            </span>
                          </td>
                          <td className="p-8">
                            <p className="font-bold text-slate-800 text-lg group-hover:text-aqua transition-colors">{item.nombre}</p>
                          </td>
                          <td className="p-8">
                            <p className="text-sm font-bold text-slate-600">{item.escuela}</p>
                            <p className="text-xs font-black text-aqua">{item.grado}</p>
                          </td>
                          <td className="p-8">
                            <span className="px-4 py-2 rounded-2xl bg-slate-100 text-slate-600 text-xs font-black border-2 border-white shadow-sm">
                              {item.cargo}
                            </span>
                          </td>
                          <td className="p-8">
                             <p className="text-sm font-bold text-slate-700">{item.tutor}</p>
                             <p className="text-xs text-slate-400 font-mono">{item.telefono}</p>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar: Comisiones */}
          <div className="space-y-8">
            <div className="bg-white rounded-[3rem] p-10 shadow-2xl border-4 border-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-24 h-24 bg-mexican-pink/5 rounded-full translate-x-12 -translate-y-12" />
              <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                <Briefcase className="text-mexican-pink animate-bounce" /> 11 Comisiones
              </h3>
              <ul className="space-y-5">
                {comisiones.map((comision, i) => (
                  <li key={i} className="flex items-center gap-4 text-slate-600 font-bold hover:text-slate-900 transition-colors group">
                    <span className="w-8 h-8 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center text-xs font-black group-hover:bg-mexican-pink group-hover:text-white transition-all">
                      {i + 1}
                    </span>
                    <span className="text-sm">{comision}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
