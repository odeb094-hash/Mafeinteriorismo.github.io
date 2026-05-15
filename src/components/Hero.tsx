import { motion } from 'motion/react';
import heroImg from '../images/VISTA 1.png';

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-brand-bone">
      {/* Background Image with Ken Burns Effect */}
      <motion.div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${heroImg}')` }}
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
      />
      
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-[#4A3F35]/20 z-10" />

      {/* Content */}
      <div className="relative z-20 w-full h-full flex flex-col justify-center items-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-brand-bone tracking-wide mb-6"
        >
          Donde se revela<br className="hidden md:block" /> el alma del espacio
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="font-sans font-light text-brand-bone/90 tracking-widest text-sm md:text-base uppercase"
        >
          Interiorismo Premium
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
      >
        <span className="text-brand-bone font-sans text-xs tracking-widest uppercase mb-2">Explorar</span>
        <div className="w-[1px] h-12 bg-brand-bone/50 relative overflow-hidden">
          <motion.div
            className="w-full h-full bg-brand-bone origin-top"
            animate={{ scaleY: [0, 1, 0], originY: [0, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
