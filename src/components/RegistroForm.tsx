'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Loader2, PartyPopper, User, School, Award, Phone, Heart, Camera, CheckCircle2, ShieldCheck, Info, X } from 'lucide-react';

const regidurias = [
  { id: 1, name: "Regidor/a Primero/a", mission: "Turismo, desarrollo social, humano y regional." },
  { id: 2, name: "Regidor/a Segundo/a", mission: "Salud y asistencia pública, ciencia y tecnología." },
  { id: 3, name: "Regidor/a Tercero/a", mission: "Impulso a la juventud, asuntos religiosos." },
  { id: 4, name: "Regidor/a Cuarto/a", mission: "Participación ciudadana y vecinal, desempeño, planeación del desarrollo municipal." },
  { id: 5, name: "Regidor/a Quinto/a", mission: "Promoción y defensa de los derechos humanos de la niñez y la familia." },
  { id: 6, name: "Regidor/a Sexto/a", mission: "Ornato, parques, jardines y alumbrado, desarrollo económico." },
  { id: 7, name: "Regidor/a Séptimo/a", mission: "Hacienda y patrimonio municipal, policía y prevención del delito, comunicaciones y obra pública." },
  { id: 8, name: "Regidor/a Octavo/a", mission: "Limpia pública, transparencia y acceso a la información, asuntos indígenas." },
  { id: 9, name: "Regidor/a Noveno/a", mission: "Educación, Recreación y Cultura, Actos Cívicos, Fomento Deportivo, Fomento Forestal, Ecología y Medio Ambiente, Bibliotecas, Fomento a la Lectura y Alfabetización, así como Bienestar Animal." },
  { id: 10, name: "Regidor/a Décimo/a", mission: "Comercio, Central de Abasto, Mercados y Rastros, Tránsito y Vialidad, y Protección Civil." },
  { id: 11, name: "Regidor/a Décimo/a primero/a", mission: "Igualdad de Género, Asentamientos Humanos, Fraccionamientos, Licencias, Regulación y Tenencia de la Tierra, así como Agua Potable, Drenaje, Alcantarillado, Tratamiento y Disposición de Aguas Residuales." }
];

const cargos = [
  { id: 'alcalde', name: 'Alcalde/sa', mission: 'Dirigir la administración pública municipal.' },
  { id: 'sindico', name: 'Síndico/a', mission: 'Hacienda y patrimonio municipal, gobernación, reglamentos y circulares, fomento agropecuario.' },
  { id: 'regidor', name: 'Regidor/a', mission: 'Diversas misiones especiales (Podrás elegir una abajo)' }
];

const LegalModal = ({ title, content, isOpen, onClose }: { title: string, content: string, isOpen: boolean, onClose: () => void }) => (
    <AnimatePresence>
        {isOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6" onClick={onClose}>
                <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-white rounded-[2.5rem] p-8 max-w-lg w-full shadow-2xl relative border-4 border-aqua" onClick={e => e.stopPropagation()}>
                    <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-mexican-pink transition-colors">
                        <X size={24} />
                    </button>
                    <h4 className="text-2xl font-black text-slate-800 mb-4 pr-10">{title}</h4>
                    <p className="text-slate-600 font-medium leading-relaxed italic border-l-4 border-mexican-pink pl-4 bg-slate-50 p-4 rounded-xl">
                        "{content}"
                    </p>
                    <button onClick={onClose} className="w-full mt-6 bg-aqua text-white font-black py-4 rounded-2xl shadow-lg hover:scale-105 transition-transform">
                        Entendido
                    </button>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
);

export default function RegistroForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedCargo, setSelectedCargo] = useState('');
  const [selectedRegiduria, setSelectedRegiduria] = useState<number | null>(null);
  
  const [ineFile, setIneFile] = useState<string | null>(null);
  const [constanciaFile, setConstanciaFile] = useState<string | null>(null);

  // Legal Modals State
  const [legalId, setLegalId] = useState<'imagen' | 'consentimiento' | null>(null);

  const fileToDataUri = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target?.result as string);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'ine' | 'constancia') => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("La imagen es muy pesada. Máximo 5MB.");
        return;
      }
      const uri = await fileToDataUri(file);
      if (type === 'ine') setIneFile(uri);
      else setConstanciaFile(uri);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!ineFile || !constanciaFile) {
        setError("Por favor sube las fotos de tu INE y Constancia.");
        return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    const payload = {
        ...data,
        ine: ineFile,
        constancia: constanciaFile,
        regiduria_id: selectedRegiduria,
        regiduria_name: selectedRegiduria ? regidurias.find(r => r.id === selectedRegiduria)?.name : null
    };

    try {
      const res = await fetch('/api/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (result.success) {
        setSuccess(result.folio);
        confetti({ particleCount: 200, spread: 90, origin: { y: 0.5 } });
      } else {
        setError(result.error || '¡Ups! Algo salió mal.');
      }
    } catch (err) {
      setError('Error de conexión.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="py-20 px-4">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="max-w-xl mx-auto p-12 glass-light rounded-[3rem] text-center border-4 border-aqua shadow-2xl relative">
          <PartyPopper size={64} className="text-mexican-pink mx-auto mb-6" />
          <h3 className="text-4xl font-black mb-4 text-slate-800 tracking-tighter">¡REGISTRO EXITOSO!</h3>
          <p className="text-xl text-slate-600 mb-8 font-medium">¡Te vemos el 24 de abril en el Parque Kiwikgolo!</p>
          <div className="bg-[#FFFDF5] p-10 rounded-[2.5rem] border-4 border-dashed border-aqua">
            <p className="text-xs text-aqua uppercase font-black tracking-widest mb-2">Tu número de folio oficial:</p>
            <p className="text-6xl font-mono font-black text-slate-800">{success}</p>
          </div>
          <button onClick={() => setSuccess(null)} className="mt-10 text-mexican-pink font-black underline underline-offset-8">Registrar otro niño/a</button>
        </motion.div>
      </div>
    );
  }

  return (
    <section id="registro" className="py-24 px-4 relative overflow-hidden">
      
      {/* Legal Disclaimer Modals */}
      <LegalModal 
        isOpen={legalId === 'imagen'} 
        onClose={() => setLegalId(null)}
        title="Términos de Uso de Imagen"
        content="Al aceptar e ingresar a la convocatoria, los padres o tutores legales otorgan su consentimiento expreso para el uso de la imagen de los menores de edad en notas de prensa, informes oficiales, redes sociales gubernamentales y usos administrativos relacionados con el evento 'Cabildo Infantil por un Día 2026'."
      />
      <LegalModal 
        isOpen={legalId === 'consentimiento'} 
        onClose={() => setLegalId(null)}
        title="Aviso de Consentimiento Informado"
        content="Al marcar esta casilla, se acepta haber leído y comprendido que este es un ejercicio de participación ciudadana y educación cívica. El evento no pretende generar posturas políticas ni partidistas y es meramente un acto recreativo para fomentar la convivencia entre los niños y el amor por su municipio de Papantla."
      />

      <div className="max-w-4xl mx-auto">
        <div className="glass-light p-8 md:p-16 rounded-[4rem] border-4 border-white shadow-2xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-slate-800 mb-4">¡Inicia la Aventura!</h2>
            <p className="text-slate-500 font-bold italic">Completa todos los campos con ayuda de tus papás</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            {/* 1. Datos del Niño */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-lg font-black text-slate-700">
                  <User className="text-aqua" size={20} /> Nombre Completo
                </label>
                <input required name="nombre" placeholder="Nombre completo del niño/a" className="w-full bg-white border-4 border-slate-50 rounded-[2rem] p-6 text-xl focus:border-aqua outline-none transition-all font-bold" />
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-lg font-black text-slate-700">
                  <School className="text-mexican-pink" size={20} /> Escuela y Grado
                </label>
                <div className="flex gap-4">
                  <input required name="escuela" placeholder="Escuela" className="flex-1 bg-white border-4 border-slate-50 rounded-[2rem] p-6 text-xl focus:border-mexican-pink outline-none font-bold" />
                  <select required name="grado" className="w-[120px] bg-white border-4 border-slate-50 rounded-[2rem] p-6 text-xl focus:border-mexican-pink outline-none font-bold">
                    <option value="5°">5°</option>
                    <option value="6°">6°</option>
                  </select>
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* 2. Seleccion de Cargo */}
            <div className="space-y-8">
                <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                    <Award className="text-yellow-500" size={24} /> ¿Qué cargo quieres ocupar?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {cargos.map((cargo) => (
                        <button
                            key={cargo.id}
                            type="button"
                            onClick={() => setSelectedCargo(cargo.id)}
                            className={`p-6 rounded-[2rem] text-left transition-all border-4 ${selectedCargo === cargo.id ? 'bg-aqua/10 border-aqua' : 'bg-white border-white hover:border-slate-100'}`}
                        >
                            <input type="radio" name="cargo" value={cargo.name} checked={selectedCargo === cargo.id} className="hidden" readOnly />
                            <p className="font-black text-xl mb-2 text-slate-800">{cargo.name}</p>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">{cargo.mission}</p>
                        </button>
                    ))}
                </div>

                <AnimatePresence>
                    {selectedCargo === 'regidor' && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-6 pt-4">
                            <h4 className="font-black text-mexican-pink text-xl">Escoge tu Regiduría:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {regidurias.map((reg) => (
                                    <button
                                        key={reg.id}
                                        type="button"
                                        onClick={() => setSelectedRegiduria(reg.id)}
                                        className={`p-6 rounded-3xl text-left border-4 transition-all ${selectedRegiduria === reg.id ? 'bg-mexican-pink/5 border-mexican-pink' : 'bg-white border-white hover:border-slate-100'}`}
                                    >
                                        <p className="font-black text-slate-800">{reg.name}</p>
                                        <p className="text-[11px] text-slate-500 font-medium">{reg.mission}</p>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <hr className="border-slate-100" />

            {/* 3. Documentos */}
            <div className="space-y-8">
                <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                    <Camera className="text-aqua" size={24} /> Documentos Importantes
                </h3>
                <div className="grid md:grid-cols-2 gap-8 text-center">
                    <div className="space-y-4">
                        <p className="font-black text-slate-700">1. INE del Tutor (Frente)</p>
                        <label className={`block relative group cursor-pointer border-4 border-dashed rounded-[2.5rem] p-10 transition-all ${ineFile ? 'border-green-400 bg-green-50' : 'border-slate-200 bg-white hover:border-aqua'}`}>
                            <input type="file" accept="image/*" capture="environment" onChange={(e) => handleFileChange(e, 'ine')} className="hidden" />
                            {ineFile ? <CheckCircle2 size={48} className="text-green-500 mx-auto" /> : <Camera size={48} className="text-slate-300 group-hover:text-aqua mx-auto" />}
                            <p className="mt-4 font-bold text-slate-400 uppercase text-xs tracking-widest">{ineFile ? '¡LISTO!' : 'SUBIR O TOMAR FOTO'}</p>
                        </label>
                    </div>
                    <div className="space-y-4">
                        <p className="font-black text-slate-700">2. Constancia de Estudios</p>
                        <label className={`block relative group cursor-pointer border-4 border-dashed rounded-[2.5rem] p-10 transition-all ${constanciaFile ? 'border-green-400 bg-green-50' : 'border-slate-200 bg-white hover:border-mexican-pink'}`}>
                            <input type="file" accept="image/*" capture="environment" onChange={(e) => handleFileChange(e, 'constancia')} className="hidden" />
                            {constanciaFile ? <CheckCircle2 size={48} className="text-green-500 mx-auto" /> : <Camera size={48} className="text-slate-300 group-hover:text-mexican-pink mx-auto" />}
                            <p className="mt-4 font-bold text-slate-400 uppercase text-xs tracking-widest">{constanciaFile ? '¡LISTO!' : 'SUBIR O TOMAR FOTO'}</p>
                        </label>
                    </div>
                </div>
            </div>

            <hr className="border-slate-100" />

            {/* 4. Contacto y Términos */}
            <div className="space-y-8">
                <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                    <ShieldCheck className="text-green-500" size={24} /> Autorizaciones
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="text-lg font-black text-slate-700 pl-2">Nombre del Tutor</label>
                        <input required name="tutor" placeholder="Papá, Mamá o Tutor" className="w-full bg-white border-4 border-slate-50 rounded-[2rem] p-6 text-xl focus:border-green-400 outline-none font-bold" />
                    </div>
                    <div className="space-y-3">
                        <label className="text-lg font-black text-slate-700 pl-2">Teléfono</label>
                        <input required name="telefono" type="tel" placeholder="784..." className="w-full bg-white border-4 border-slate-50 rounded-[2rem] p-6 text-xl focus:border-green-400 outline-none font-bold" />
                    </div>
                </div>

                <div className="space-y-6 bg-white/50 p-8 rounded-[2.5rem] border-2 border-slate-100">
                    <label className="flex items-start gap-4 cursor-pointer group">
                        <input required type="checkbox" className="mt-1 w-6 h-6 rounded-lg accent-mexican-pink" />
                        <span className="text-sm font-bold text-slate-600 group-hover:text-slate-800">He leído la convocatoria completa y acepto las bases.</span>
                    </label>
                    <div className="flex items-start gap-4 group">
                        <input required type="checkbox" className="mt-1 w-6 h-6 rounded-lg accent-mexican-pink cursor-pointer" />
                        <div className="text-sm font-bold text-slate-600 group-hover:text-slate-800 flex flex-wrap items-center gap-1">
                            Acepto términos y condiciones de uso de imagen.
                            <button type="button" onClick={() => setLegalId('imagen')} className="text-aqua flex items-center gap-1 hover:underline ml-1">
                                <Info size={14} /> Leer más
                            </button>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 group">
                        <input required type="checkbox" className="mt-1 w-6 h-6 rounded-lg accent-mexican-pink cursor-pointer" />
                        <div className="text-sm font-bold text-slate-600 group-hover:text-slate-800 flex flex-wrap items-center gap-1">
                            Aviso de consentimiento informado.
                            <button type="button" onClick={() => setLegalId('consentimiento')} className="text-aqua flex items-center gap-1 hover:underline ml-1">
                                <Info size={14} /> Leer más
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {error && <p className="text-red-500 font-bold text-center bg-red-50 p-6 rounded-3xl border-4 border-red-100">{error}</p>}

            <button disabled={loading} className="w-full btn-playful p-8 rounded-[2.5rem] font-black text-2xl flex items-center justify-center gap-4 disabled:opacity-50 shadow-2xl">
                {loading ? <><Loader2 className="animate-spin" /> PROCESANDO TU REGISTRO...</> : '¡ENVIAR MI REGISTRO!'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
