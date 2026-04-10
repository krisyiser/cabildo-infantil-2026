'use client';

import { useEffect, useState } from 'react';
import { Octokit } from 'octokit';
import { Search, Filter, Download, Briefcase } from 'lucide-react';

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
        
        // Using a public fetch if possible, or octokit without auth if public
        // But for consistency let's use the API we created if we want, or just fetch from raw.githubusercontent
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
    <div className="min-h-screen bg-[#050505] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-aqua">Dashboard Limaxtum</h1>
            <p className="text-white/50">Administración de Inscritos - Cabildo Infantil 2026</p>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 glass px-6 py-3 rounded-2xl hover:bg-white/10 transition-colors">
              <Download size={20} /> Exportar CSV
            </button>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tabla de Inscritos */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass rounded-[2rem] overflow-hidden border border-white/5">
              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                <h3 className="font-bold flex items-center gap-2">
                  <Filter size={18} className="text-aqua" /> Lista de Aspirantes
                </h3>
                <span className="bg-aqua/20 text-aqua px-4 py-1 rounded-full text-xs font-bold">
                  {inscritos.length} Registrados
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-white/40 text-sm border-b border-white/5">
                      <th className="p-6 font-medium">Folio</th>
                      <th className="p-6 font-medium">Niño/a</th>
                      <th className="p-6 font-medium">Escuela / Grado</th>
                      <th className="p-6 font-medium">Cargo</th>
                      <th className="p-6 font-medium">Tutor / Tel</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {loading ? (
                      <tr><td colSpan={5} className="p-20 text-center text-white/30">Cargando datos...</td></tr>
                    ) : inscritos.length === 0 ? (
                      <tr><td colSpan={5} className="p-20 text-center text-white/30">No hay registros aún.</td></tr>
                    ) : (
                      inscritos.map((item, idx) => (
                        <tr key={idx} className="hover:bg-white/5 transition-colors">
                          <td className="p-6 font-mono text-mexican-pink text-sm">{item.folio}</td>
                          <td className="p-6 font-bold">{item.nombre}</td>
                          <td className="p-6 text-sm text-white/70">
                            {item.escuela} <br />
                            <span className="text-aqua/60">{item.grado}</span>
                          </td>
                          <td className="p-6">
                            <span className="px-3 py-1 rounded-lg bg-aqua/10 text-aqua text-xs border border-aqua/20">
                              {item.cargo}
                            </span>
                          </td>
                          <td className="p-6 text-xs text-white/50">
                            {item.tutor} <br />
                            {item.telefono}
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
          <div className="space-y-6">
            <div className="glass rounded-[2rem] p-8 border border-mexican-pink/20">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Briefcase className="text-mexican-pink" /> 11 Comisiones
              </h3>
              <ul className="space-y-4">
                {comisiones.map((comision, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group">
                    <span className="w-6 h-6 rounded-lg bg-mexican-pink/10 text-mexican-pink flex items-center justify-center text-[10px] font-bold group-hover:bg-mexican-pink group-hover:text-white">
                      {i + 1}
                    </span>
                    {comision}
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
