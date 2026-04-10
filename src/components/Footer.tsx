import { Shield, Heart, GraduationCap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-20 px-4 border-t border-white/5 bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-16 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-aqua/10 flex items-center justify-center">
              <Shield className="w-8 h-8 text-aqua" />
            </div>
            <div>
              <h4 className="font-bold text-lg">H. Ayuntamiento</h4>
              <p className="text-white/50 text-sm">Papantla de Olarte</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-mexican-pink/10 flex items-center justify-center">
              <Heart className="w-8 h-8 text-mexican-pink" />
            </div>
            <div>
              <h4 className="font-bold text-lg">DIF Municipal</h4>
              <p className="text-white/50 text-sm">Corazón del Municipio</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-lg">Fomento Educativo</h4>
              <p className="text-white/50 text-sm">Impulsando el Futuro</p>
            </div>
          </div>
        </div>
        
        <div className="text-center pt-8 border-t border-white/5">
          <p className="text-white/20 text-xs tracking-widest uppercase">
            © 2026 Cabildo Infantil Papantla • Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}
