import { motion } from 'motion/react';
import img1 from '../images/RENDER 1.png';
import img2 from '../images/RENDER 2.jpg';
import img3 from '../images/RENDER 3.jpg';
import img4 from '../images/vista 3.png';
import img5 from '../images/vista 5.png';

const pillars = [
  {
    title: 'Confianza',
    description: 'Construir una relación sólida con el cliente mediante comunicación clara, transparencia y cumplimiento de lo acordado. Generar seguridad en todas las etapas del proyecto: concepto, desarrollo y ejecución.',
    image: img1,
    tag: 'En diseño: procesos claros, criterios técnicos sólidos y acompañamiento profesional.'
  },
  {
    title: 'Respeto',
    description: 'Respetar la visión, gustos y estilo de vida del cliente al desarrollar cada espacio. Considerar el contexto del proyecto: arquitectura existente, presupuesto, tiempos y necesidades reales.',
    image: img2,
    tag: 'En diseño: soluciones que dialogan con el lugar y con quienes lo habitan.'
  },
  {
    title: 'Esencia',
    description: 'Identificar aquello que hace único a cada proyecto y convertirlo en el punto de partida del diseño. Traducir la personalidad del cliente y el carácter del espacio en materiales, colores y atmósferas.',
    image: img3,
    tag: 'En diseño: interiores que reflejan quién vive o trabaja en ellos.'
  },
  {
    title: 'Autenticidad',
    description: 'Desarrollar propuestas honestas que reflejen una visión clara de diseño. Seleccionar materiales, texturas y elementos que aporten carácter y coherencia al proyecto. Crear espacios que se sientan verdaderos.',
    image: img4,
    tag: 'En diseño: estética con personalidad y narrativa propia.'
  },
  {
    title: 'Funcionalidad',
    description: 'Diseñar espacios que respondan a la vida cotidiana. Optimizar distribución, circulación, iluminación y mobiliario para mejorar la experiencia del lugar. Integrar estética y practicidad.',
    image: img5,
    tag: 'En diseño: belleza respaldada por inteligencia espacial.'
  }
];

export default function CreaFPillars() {
  return (
    <section id="creaf" className="py-24 md:py-32 bg-brand-walnut text-brand-bone relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center md:text-left"
        >
          <span className="text-brand-clay font-sans text-xs tracking-widest uppercase mb-4 block">Filosofía</span>
          <h2 className="font-serif text-5xl md:text-7xl mb-6">Valores CreaF</h2>
          <p className="font-sans font-light text-brand-bone/80 text-lg max-w-2xl">
            Los pilares que fundamentan nuestra filosofía de diseño y nuestra relación con cada espacio y cliente.
          </p>
        </motion.div>
        
        <div className="flex flex-col gap-24 md:gap-40">
          {pillars.map((pillar, index) => (
            <div 
              key={index} 
              className={`flex flex-col gap-10 md:gap-16 items-center ${
                index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'
              }`}
            >
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 1 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full md:w-1/2 relative h-[50vh] md:h-[70vh] overflow-hidden group"
              >
                 <div className="absolute inset-0 bg-brand-walnut/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <motion.img 
                  src={pillar.image} 
                  alt={pillar.title} 
                  className="w-full h-full object-cover grayscale-[50%] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full md:w-1/2 flex flex-col justify-center relative"
              >
                <span className="text-brand-clay font-serif text-[10rem] md:text-[14rem] opacity-5 absolute -z-10 -translate-y-16 -translate-x-8 md:-translate-x-12 select-none leading-none">
                  0{index + 1}
                </span>
                <h3 className="font-serif text-4xl md:text-5xl mb-6 text-brand-sand">{pillar.title}</h3>
                <p className="font-sans font-light text-brand-bone/80 text-lg leading-relaxed mb-8">
                  {pillar.description}
                </p>
                <div className="border-l border-brand-clay pl-6 py-2">
                  <p className="font-serif italic text-brand-sand/90 text-sm md:text-base md:text-lg">
                    "{pillar.tag}"
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
