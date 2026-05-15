import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import philImg from '../images/Enscape_2025-04-09-15-40-55.png';

export default function Philosophy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={sectionRef} id="filosofia" className="py-24 md:py-32 bg-brand-bone relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        
        {/* Left: 60% Image */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="md:col-span-7 h-[60vh] md:h-[80vh] w-full relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-brand-clay/10 group-hover:bg-transparent transition-colors duration-700 z-10" />
          <motion.img 
            style={{ y }}
            src={philImg}
            alt="Interior design philosophy"
            className="w-full h-[120%] object-cover object-center absolute -top-[10%]"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </motion.div>

        {/* Right: 40% Text */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:col-span-5 flex flex-col justify-center"
        >
          <h2 className="font-serif text-3xl md:text-5xl text-brand-walnut mb-8 leading-tight">
            Interiorismo que no solo se ve bien, sino que <span className="italic">se vive mejor.</span>
          </h2>
          
          <div className="space-y-6 text-brand-walnut/80 font-sans font-light leading-relaxed text-sm md:text-base">
            <p>
              En MAFE INTERIORISMO somos un estudio de diseño enfocado en crear espacios funcionales, estéticos y con identidad.
            </p>
            <p>
              Trabajamos proyectos residenciales, comerciales y corporativos, cuidando cada detalle del espacio, adaptándonos a las necesidades reales de cada cliente, siempre con una visión clara de optimización de recursos con una estética bien definida. No tenemos miedo de incorporar color, carácter o elementos que aporten personalidad, logrando espacios equilibrados y memorables.
            </p>
            <p>
              Nuestro estilo combina lo contemporáneo, mexicano, ecléctico, mid century y minimalista, dando como resultado interiores atemporales, funcionales y con un enfoque premium.
            </p>
          </div>

          <motion.a 
            href="#creaf"
            whileHover={{ x: 10 }}
            className="mt-12 inline-flex items-center gap-4 text-brand-walnut font-serif uppercase tracking-widest text-sm border-b border-brand-walnut/30 pb-2 self-start hover:border-brand-walnut transition-colors"
          >
            Descubre nuestros Valores
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
