import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import render2 from '../images/RENDER 2.jpg';

export default function TechnicalEdge() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="proceso" className="py-24 md:py-32 bg-[#4A3F35] text-brand-bone relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Left: Text */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="order-2 md:order-1"
        >
          <span className="text-brand-clay font-sans text-xs tracking-widest uppercase mb-4 block">Coordinación Técnica</span>
          <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight">
            Diseño respaldado por <span className="italic text-brand-clay">Ingeniería</span>.
          </h2>
          <div className="space-y-6 font-sans font-light text-brand-bone/80 text-sm md:text-base leading-relaxed">
            <p>
              La ejecución de obra se realiza en coordinación con un ingeniero civil, mientras que el estudio se encarga del diseño, planeación y acompañamiento continuo.
            </p>
            <p>
              Garantizamos que la visión estética se traduzca en una realidad constructiva impecable, cuidando el presupuesto, los tiempos y la calidad de cada material.
            </p>
          </div>
          
          <div className="mt-12 flex gap-8 border-t border-brand-bone/20 pt-8">
            <div>
              <p className="font-serif text-3xl mb-2 text-brand-sand">100%</p>
              <p className="font-sans text-xs tracking-widest uppercase text-brand-bone/60">Acompañamiento</p>
            </div>
            <div>
              <p className="font-serif text-3xl mb-2 text-brand-sand">Integral</p>
              <p className="font-sans text-xs tracking-widest uppercase text-brand-bone/60">Ejecución</p>
            </div>
          </div>
        </motion.div>

        {/* Right: Interactive Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="order-1 md:order-2 relative h-[50vh] md:h-[70vh] bg-brand-bone/5 cursor-crosshair group overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Base: Blueprint (Dream Home Project reference) */}
          <div className="absolute inset-0 bg-[#3a3028] p-8 flex flex-col justify-center items-center text-center">
            <div className="w-full h-full border border-brand-clay/30 p-2 flex flex-col items-center justify-center relative">
              <svg className="w-full h-full opacity-20 absolute inset-0" xmlns="http://www.w3.org/2000/svg">
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
              <h3 className="font-serif text-2xl uppercase tracking-[0.3em] text-brand-clay mb-4">Dream Home</h3>
              <p className="font-sans text-xs uppercase tracking-widest text-brand-bone/60 mb-2">Plano Estructural</p>
              <p className="font-serif italic text-brand-bone/40 text-sm max-w-xs">Hover to reveal reality</p>
            </div>
          </div>

          {/* Overlay: Finished Render */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 z-10"
              >
                <img 
                  src={render2} 
                  alt="Finished Render" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </section>
  );
}
