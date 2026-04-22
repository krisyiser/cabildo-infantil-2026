'use client';

import { useEffect, useState, useCallback } from 'react';
import { RefreshCw, Star, FileImage, ExternalLink, Calendar, Search, Trash2, Edit, X, Save } from 'lucide-react';

export default function AdminDashboard() {
  const [inscritos, setInscritos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Edit Modal State
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    
    try {
      const response = await fetch('/api/admin');
      
      if (response.ok) {
        const data = await response.json();
        setInscritos(Array.isArray(data) ? [...data].reverse() : []);
      } else {
        console.error('Failed to fetch admin data');
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (folio: string) => {
    if (!confirm(`¿Estás seguro de que deseas eliminar el registro ${folio}?`)) return;

    try {
      const response = await fetch(`/api/admin?folio=${folio}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        alert('Registro eliminado correctamente');
        fetchData(true);
      } else {
        alert('Error al eliminar: ' + data.error);
      }
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Error de conexión al eliminar');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    
    setIsUpdating(true);
    try {
      const response = await fetch('/api/admin', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem),
      });
      const data = await response.json();
      if (data.success) {
        setEditingItem(null);
        fetchData(true);
      } else {
        alert('Error al actualizar: ' + data.error);
      }
    } catch (error) {
      console.error('Error updating:', error);
      alert('Error de conexión al actualizar');
    } finally {
      setIsUpdating(false);
    }
  };

  const getImagePath = (path: string) => {
    if (!path) return '#';
    return `https://raw.githubusercontent.com/krisyiser/cabildo-infantil-2026/main/${path}`;
  };

  const filteredInscritos = inscritos.filter(item => 
    item.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.folio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tutor?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-slate-800 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-aqua rounded-2xl flex items-center justify-center shadow-lg rotate-3">
                <Star className="text-white fill-white" />
              </div>
              <h1 className="text-4xl font-black tracking-tight text-slate-900">Dashboard Papantla</h1>
            </div>
            <p className="text-slate-500 font-medium font-outfit uppercase tracking-widest text-[10px]">Control de Aspirantes - Cabildo Infantil 2026</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                <input 
                    type="text" 
                    placeholder="Buscar por nombre o folio..." 
                    className="pl-12 pr-6 py-3 bg-white border-2 border-slate-100 rounded-2xl focus:border-aqua outline-none font-bold text-sm w-[300px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <button 
              onClick={() => fetchData(true)}
              disabled={refreshing}
              className="flex items-center gap-2 bg-white border-2 border-slate-100 p-3 rounded-2xl hover:bg-slate-50 transition-all font-black text-xs text-slate-600 disabled:opacity-50"
            >
              <RefreshCw size={16} className={refreshing ? 'animate-spin text-aqua' : ''} />
              {refreshing ? 'ACTUALIZANDO...' : 'REFRESCAR DATOS'}
            </button>

            <div className="bg-white border-2 border-slate-100 px-8 py-3 rounded-2xl text-center shadow-sm">
                <p className="text-2xl font-black text-mexican-pink leading-none">{inscritos.length}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase mt-1">Total</p>
             </div>
          </div>
        </header>

        <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border-2 border-slate-50">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                  <th className="p-6">Folio / Fecha</th>
                  <th className="p-6">Aspirante</th>
                  <th className="p-6">Cargo / Comisión</th>
                  <th className="p-6">Documentos</th>
                  <th className="p-6">Tutor / Tel</th>
                  <th className="p-6">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr><td colSpan={6} className="p-24 text-center text-slate-300 font-black animate-pulse">CARGANDO REGISTROS...</td></tr>
                ) : filteredInscritos.length === 0 ? (
                  <tr><td colSpan={6} className="p-24 text-center text-slate-300 font-black italic">
                      {searchTerm ? '¡NO SE ENCONTRARON RESULTADOS!' : '¡AÚN NO HAY REGISTROS!'}
                  </td></tr>
                ) : (
                  filteredInscritos.map((item, idx) => (
                    <tr key={idx} className="hover:bg-soft-bg/20 transition-colors group">
                      <td className="p-6">
                        <p className="font-black text-mexican-pink mb-1">{item.folio}</p>
                        <p className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                            <Calendar size={10} /> {item.fecha ? new Date(item.fecha).toLocaleDateString() : 'N/A'}
                        </p>
                      </td>
                      <td className="p-6">
                        <p className="font-black text-slate-800 text-lg">{item.nombre}</p>
                        <p className="text-xs font-bold text-aqua uppercase">{item.escuela} • {item.grado}</p>
                      </td>
                      <td className="p-6">
                        <div className="flex flex-col gap-1">
                            <span className="text-sm font-black text-slate-700">{item.cargo}</span>
                            {item.regiduria_name && (
                                <span className="text-[10px] font-bold text-mexican-pink italic">
                                    {item.regiduria_name}
                                </span>
                            )}
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex gap-2">
                           {item.ine_url && (
                               <a href={getImagePath(item.ine_url)} target="_blank" rel="noopener noreferrer" className="p-2 bg-aqua/10 text-aqua rounded-lg hover:bg-aqua hover:text-white transition-all" title="Ver INE">
                                    <FileImage size={18} />
                               </a>
                           )}
                           {item.constancia_url && (
                               <a href={getImagePath(item.constancia_url)} target="_blank" rel="noopener noreferrer" className="p-2 bg-mexican-pink/10 text-mexican-pink rounded-lg hover:bg-mexican-pink hover:text-white transition-all" title="Ver Constancia">
                                    <ExternalLink size={18} />
                               </a>
                           )}
                        </div>
                      </td>
                      <td className="p-6">
                         <p className="text-sm font-black text-slate-700">{item.tutor}</p>
                         <p className="text-xs font-bold text-slate-400 font-mono">{item.telefono}</p>
                      </td>
                      <td className="p-6">
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                                onClick={() => setEditingItem(item)}
                                className="p-2 bg-amber-50 text-amber-500 rounded-lg hover:bg-amber-500 hover:text-white transition-all"
                                title="Editar"
                            >
                                <Edit size={18} />
                            </button>
                            <button 
                                onClick={() => handleDelete(item.folio)}
                                className="p-2 bg-rose-50 text-rose-500 rounded-lg hover:bg-rose-500 hover:text-white transition-all"
                                title="Eliminar"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden border-4 border-white">
                <div className="bg-slate-50 p-8 flex justify-between items-center border-b border-slate-100">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900">Editar Aspirante</h2>
                        <p className="text-mexican-pink font-black text-sm">{editingItem.folio}</p>
                    </div>
                    <button 
                        onClick={() => setEditingItem(null)}
                        className="w-10 h-10 bg-white border-2 border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-500 hover:border-rose-100 transition-all shadow-sm"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleUpdate} className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Nombre Completo</label>
                            <input 
                                type="text"
                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-3 font-bold text-slate-700 outline-none focus:border-aqua transition-all"
                                value={editingItem.nombre}
                                onChange={(e) => setEditingItem({...editingItem, nombre: e.target.value})}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Escuela</label>
                            <input 
                                type="text"
                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-3 font-bold text-slate-700 outline-none focus:border-aqua transition-all"
                                value={editingItem.escuela}
                                onChange={(e) => setEditingItem({...editingItem, escuela: e.target.value})}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Tutor</label>
                            <input 
                                type="text"
                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-3 font-bold text-slate-700 outline-none focus:border-aqua transition-all"
                                value={editingItem.tutor}
                                onChange={(e) => setEditingItem({...editingItem, tutor: e.target.value})}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Teléfono</label>
                            <input 
                                type="text"
                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-3 font-bold text-slate-700 outline-none focus:border-aqua transition-all"
                                value={editingItem.telefono}
                                onChange={(e) => setEditingItem({...editingItem, telefono: e.target.value})}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Cargo</label>
                            <input 
                                type="text"
                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-3 font-bold text-slate-700 outline-none focus:border-aqua transition-all"
                                value={editingItem.cargo}
                                onChange={(e) => setEditingItem({...editingItem, cargo: e.target.value})}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Grado</label>
                            <input 
                                type="text"
                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-3 font-bold text-slate-700 outline-none focus:border-aqua transition-all"
                                value={editingItem.grado}
                                onChange={(e) => setEditingItem({...editingItem, grado: e.target.value})}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button 
                            type="button"
                            onClick={() => setEditingItem(null)}
                            className="flex-1 bg-slate-100 text-slate-500 font-black py-4 rounded-2xl hover:bg-slate-200 transition-all uppercase tracking-widest text-xs"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit"
                            disabled={isUpdating}
                            className="flex-3 bg-aqua text-white font-black py-4 rounded-2xl hover:bg-opacity-90 transition-all shadow-lg shadow-aqua/20 flex items-center justify-center gap-2 uppercase tracking-widest text-xs disabled:opacity-50"
                        >
                            {isUpdating ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
                            {isUpdating ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
}

