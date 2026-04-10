'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/minicabildo.jpeg"
          alt="Cabildo Infantil Papantla"
          fill
          className="object-cover brightness-50"
          priority
        />
      </motion.div>
      
      <div className="relative z-10 text-center px-4 max-w-5xl">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          <span className="text-aqua">Cabildo Infantil</span> <br />
          <span className="text-mexican-pink italic">por un Día 2026</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-white/90 mb-8 font-light italic"
        >
          “Voces Pequeñas, y grandes Decisiones: Juntos y Juntas Limaxtum construimos nuestro municipio.”
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a 
            href="#registro"
            className="btn-primary inline-block px-10 py-4 rounded-full text-lg font-semibold"
          >
            Inscríbete Ahora
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer">
        <div className="w-6 h-10 border-2 border-aqua rounded-full flex justify-center p-1">
          <div className="w-1 h-3 bg-mexican-pink rounded-full" />
        </div>
      </div>
    </div>
  );
}
