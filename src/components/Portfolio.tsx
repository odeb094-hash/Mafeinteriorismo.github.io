import { motion } from 'motion/react';
import img1 from '../images/Enscape_2025-04-09-13-57-55.png';
import img2 from '../images/COCINA_ V2.png';
import img3 from '../images/vista 1 (2).png';
import img4 from '../images/RENDER 1.png';

const projects = [
  {
    id: 1,
    title: 'Residencial Premium GDL',
    category: 'Diseño Integral',
    image: img1,
    span: 'md:col-span-2 md:row-span-2',
    height: 'h-[60vh] md:h-[80vh]'
  },
  {
    id: 2,
    title: 'Minimalismo Cálido',
    category: 'Remodelación',
    image: img2,
    span: 'md:col-span-1 md:row-span-1',
    height: 'h-[40vh]'
  },
  {
    id: 3,
    title: 'Oficinas Corporativas',
    category: 'Interiorismo Comercial',
    image: img3,
    span: 'md:col-span-1 md:row-span-1',
    height: 'h-[40vh]'
  },
  {
    id: 4,
    title: 'Casa Bosques',
    category: 'Ambientación',
    image: img4,
    span: 'md:col-span-2 md:row-span-1',
    height: 'h-[50vh]'
  }
];

export default function Portfolio() {
  return (
    <section id="proyectos" className="py-24 bg-brand-bone">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <span className="text-brand-clay font-sans text-xs tracking-widest uppercase mb-4 block">Portafolio</span>
            <h2 className="font-serif text-4xl md:text-6xl text-brand-walnut">Proyectos Destacados</h2>
          </div>
          <a href="#" className="font-serif italic text-brand-walnut border-b border-brand-walnut/30 pb-1 hover:border-brand-walnut transition-colors">
            Ver todos los proyectos &rarr;
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(0,_auto)]">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative group overflow-hidden bg-brand-sand/30 cursor-pointer ${project.span}`}
            >
              <div className={`relative w-full ${project.height} overflow-hidden`}>
                <img 
                  src={project.image} 
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-brand-walnut/0 group-hover:bg-brand-walnut/40 transition-colors duration-500 flex flex-col justify-end p-8">
                  <div className="translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-brand-bone font-sans text-xs tracking-widest uppercase block mb-2">{project.category}</span>
                    <h3 className="font-serif text-2xl md:text-3xl text-brand-bone">{project.title}</h3>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
