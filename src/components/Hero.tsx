'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { Star, Sparkles } from 'lucide-react';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden bg-soft-bg">
      {/* Playful background elements */}
      <div className="blob top-[-10%] left-[-10%] animate-pulse" />
      <div className="blob bottom-[-10%] right-[-10%] delay-1000" />

      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/minicabildo.jpeg"
          alt="Cabildo Infantil Papantla"
          fill
          className="object-cover opacity-30 grayscale-[20%]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-soft-bg/50 to-soft-bg" />
      </motion.div>

      <div className="relative z-10 text-center px-4 max-w-5xl">
        <motion.div
          initial={{ rotate: -5, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="inline-block bg-mexican-pink text-white px-6 py-2 rounded-full font-bold mb-6 text-sm uppercase tracking-widest shadow-lg"
        >
          ¡Gran Convocatoria 2026!
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-black mb-6 tracking-tight leading-none"
        >
          <span className="text-aqua drop-shadow-sm">Cabildo</span> <br />
          <span className="text-mexican-pink drop-shadow-sm italic">Infantil</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-3xl text-slate-700 mb-10 max-w-3xl mx-auto font-medium"
        >
          “Voces pequeñas, y grandes ideas: Juntos construimos nuestro municipio.”
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <a
            href="#registro"
            className="btn-playful px-12 py-5 rounded-[2rem] text-xl font-black flex items-center gap-3"
          >
            <Star className="fill-white" /> ¡QUIERO PARTICIPAR!
          </a>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer hidden md:block"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-bold text-aqua uppercase tracking-widest">Sigue bajando</span>
          <div className="w-1 h-12 bg-gradient-to-b from-aqua to-mexican-pink rounded-full" />
        </div>
      </motion.div>

      {/* Scattered decorations */}
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute top-20 right-20 text-aqua opacity-20">
        <Sparkles size={100} />
      </motion.div>
    </div>
  );
}
