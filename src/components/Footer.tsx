import { Shield, Heart, GraduationCap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-24 px-4 bg-white border-t-8 border-soft-bg relative overflow-hidden">
      {/* Playful decorations */}
      <div className="absolute top-10 left-10 w-4 h-4 bg-aqua rounded-full animate-ping" />
      <div className="absolute bottom-10 right-10 w-6 h-6 bg-mexican-pink/20 rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-16 mb-20 text-center">
          <div className="group">
            <div className="w-24 h-24 rounded-[2rem] bg-aqua/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform rotate-3 shadow-lg">
              <Shield className="w-10 h-10 text-aqua" />
            </div>
            <h4 className="font-black text-2xl text-slate-800 mb-2">H. Ayuntamiento</h4>
            <p className="text-slate-500 font-medium uppercase tracking-widest text-xs">Orgullo Papanteco</p>
          </div>

          <div className="group">
            <div className="w-24 h-24 rounded-[2rem] bg-mexican-pink/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform -rotate-6 shadow-lg">
              <Heart className="w-10 h-10 text-mexican-pink fill-mexican-pink/20" />
            </div>
            <h4 className="font-black text-2xl text-slate-800 mb-2">DIF Municipal</h4>
            <p className="text-slate-500 font-medium uppercase tracking-widest text-xs">Amor por los Niños</p>
          </div>

          <div className="group">
            <div className="w-24 h-24 rounded-[2rem] bg-yellow-400/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform rotate-12 shadow-lg">
              <GraduationCap className="w-10 h-10 text-yellow-600" />
            </div>
            <h4 className="font-black text-2xl text-slate-800 mb-2">Fomento Educativo</h4>
            <p className="text-slate-500 font-medium uppercase tracking-widest text-xs">Futuro Brillante</p>
          </div>
        </div>

        <div className="text-center pt-12 border-t-4 border-slate-50">
          <p className="text-slate-400 text-sm font-black tracking-widest uppercase">
            © 2026 Cabildo Infantil • Papantla, Veracruz • ¡Juntos Limakxtum!
          </p>
        </div>
      </div>
    </footer>
  );
}
