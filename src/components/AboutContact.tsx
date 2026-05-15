import { motion, AnimatePresence } from 'motion/react';
import { useState, FormEvent } from 'react';
import { jsPDF } from 'jspdf';
import { CheckCircle2, Loader2, Instagram, Mail, MessageCircle, Phone } from 'lucide-react';

import logoUrl from '../images/MAFE_logo_transparent_white.png';
import render1Url from '../images/RENDER 1.png';
import render2Url from '../images/RENDER 2.jpg';
import kitchenUrl from '../images/COCINA_ V2.png';

export default function AboutContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    zone: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const generatePDF = async (data: typeof formData) => {
    const doc = new jsPDF();
    const primaryColor = [74, 63, 53]; // Brand Walnut
    const accentColor = [209, 191, 174]; // Brand Clay
    const sandColor = [230, 217, 202]; // Brand Sand
    const boneColor = [249, 247, 244]; // Brand Bone

    // Helper to load image as base64 using fetch
    const getBase64Image = async (url: string): Promise<string> => {
      try {
        const response = await fetch(url);
        if (!response.ok) return '';
        const blob = await response.blob();
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve((reader.result as string) || '');
          reader.readAsDataURL(blob);
        });
      } catch (e) {
        console.error("Failed to load image", url, e);
        return '';
      }
    };

    try {
      const logoBase64 = await getBase64Image(logoUrl);
      const render1Base64 = await getBase64Image(render1Url);
      const render2Base64 = await getBase64Image(render2Url);
      const kitchenBase64 = await getBase64Image(kitchenUrl);

      // --- Page 1: Cover ---
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(0, 0, 215, 300, 'F');
      
      // Decorative elements
      doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
      doc.circle(200, 100, 80, 'F');

      // Logo (with transparent background)
      if (logoBase64) doc.addImage(logoBase64, 'PNG', 70, 25, 75, 26.7);

      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(30);
      doc.text("Guadalajara 2026:", 105, 100, { align: 'center' });
      doc.setFontSize(22);
      doc.text("El Playbook de Diseño de Interiores", 105, 115, { align: 'center' });
      doc.setFontSize(18);
      doc.text("Rentabilidades de Clase Mundial", 105, 128, { align: 'center' });

      doc.setDrawColor(255, 255, 255);
      doc.setLineWidth(0.5);
      doc.line(40, 140, 170, 140);

      doc.setFont("helvetica", "italic");
      doc.setFontSize(14);
      doc.text("Estrategia de Diseño y Plusvalía · Ma. Fernanda Guerrero", 105, 155, { align: 'center' });

      // Preparado para
      doc.setFillColor(sandColor[0], sandColor[1], sandColor[2]);
      doc.rect(30, 200, 150, 40, 'F');
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text(`PREPARADO PARA: ${data.name.toUpperCase()}`, 105, 215, { align: 'center' });
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(`ZONA DE INTERÉS: ${data.zone.toUpperCase()}`, 105, 225, { align: 'center' });
      doc.text(`FECHA: ${new Date().toLocaleDateString()}`, 105, 233, { align: 'center' });

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.text("www.mafeinteriorismo.com · mfgroz.interiores@gmail.com", 105, 285, { align: 'center' });

      // --- Page 2: El Algoritmo ---
      doc.addPage();
      doc.setFillColor(boneColor[0], boneColor[1], boneColor[2]);
      doc.rect(0, 0, 215, 300, 'F');
      
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.text("El Algoritmo se Alimenta de Estética", 20, 40);
      doc.setDrawColor(accentColor[0], accentColor[1], accentColor[2]);
      doc.line(20, 45, 190, 45);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      const introText = [
        "En el mercado inmobiliario de Guadalajara, la complacencia es el enemigo del rendimiento. Con la llegada de la Copa del Mundo 2026 y el auge imparable de los nómadas digitales, el diseño de interiores se ha convertido en el activo estratégico principal para maximizar el RevPAR.",
        "",
        "La optimización en plataformas como Airbnb no depende solo de la ubicación; es una batalla visual. Un diseño con propósito justifica tarifas hasta un 20% superiores a la media y detiene el 'scroll' del usuario en los primeros tres segundos.",
        "",
        "Para 2026, los alojamientos genéricos serán desplazados por espacios que ofrecen una 'experiencia sobre el espacio', integrando identidad local y funcionalidad técnica."
      ];
      doc.text(introText, 20, 60, { maxWidth: 170 });

      if (render1Base64) doc.addImage(render1Base64, 'PNG', 20, 150, 170, 95);
      doc.setFont("helvetica", "italic");
      doc.setFontSize(9);
      doc.text("Inspiración: Curaduría Estética MAFE Interiorismo", 105, 255, { align: 'center' });

      // Footer
      doc.text("MAFE Interiorismo · Estrategia de Diseño Inmobiliario · 2024-2026", 20, 290);
      doc.text("Pág. 2", 190, 290);

      // --- Page 3: Tendencias ---
      doc.addPage();
      doc.setFillColor(boneColor[0], boneColor[1], boneColor[2]);
      doc.rect(0, 0, 215, 300, 'F');

      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.text("Tendencias GDL 2025-2026", 20, 40);
      doc.line(20, 45, 190, 45);

      const yOffset = 60;
      doc.setFontSize(14);
      doc.text("1. Materialidad Local y Marcas de Autor", 20, yOffset);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text([
        "• Peca Studio (Guadalajara): Incorporación de piezas icónicas como la mesa Lava.",
        "• Tributo (Jalisco): Integración de alfarería y madera de maestros artesanos locales.",
        "• The Norm (Tlaquepaque): Cerámica de alta temperatura para vajillas premium."
      ], 25, yOffset + 10);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("2. Paletas Cromáticas: El Giro hacia la Tierra", 20, yOffset + 50);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text([
        "• Mocha Mousse: El color Pantone 2025/2026 para lujo silencioso.",
        "• Verdes Profundos: Diseño biofílico que conecta con la naturaleza.",
        "• Terracota y Arcilla: Reflejando la identidad regional con energía."
      ], 25, yOffset + 60);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("3. Cottagecore y Maximalismo Comedido", 20, yOffset + 100);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text([
        "Frente a la uniformidad hotelera, el estilo Cottagecore y el Ecléctico Nostálgico atraen a huéspedes que buscan espacios con carácter e 'instagrammables'."
      ], 25, yOffset + 110, { maxWidth: 160 });

      if (render2Base64) doc.addImage(render2Base64, 'JPEG', 110, 190, 80, 80);
      if (kitchenBase64) doc.addImage(kitchenBase64, 'PNG', 20, 190, 80, 80);

      doc.text("MAFE Interiorismo · Estrategia de Diseño Inmobiliario · 2024-2026", 20, 290);
      doc.text("Pág. 3", 190, 290);

      // --- Page 4: ROI Analysis ---
      doc.addPage();
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(0, 0, 215, 300, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.text("Análisis de ROI y Perfiles", 20, 40);
      doc.setDrawColor(255, 255, 255);
      doc.line(20, 45, 190, 45);

      // Simple Table
      const tableY = 60;
      doc.setFontSize(10);
      doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
      doc.rect(20, tableY, 170, 10, 'F');
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      // Spacing out header columns horizontally
      doc.text("Zona", 25, tableY + 7);
      doc.text("Perfil", 65, tableY + 7);
      doc.text("Tendencia", 105, tableY + 7);
      doc.text("Impacto", 150, tableY + 7);

      const rowColors = [sandColor, boneColor, sandColor, boneColor];
      const residents = [
        ["Colonia Americana", "Nómadas Digitales", "Ecléctico Nostálgico", "Plusvalía 8-11%"],
        ["Puerta de Hierro", "Ejecutivos", "Japandi / Lujo Silencioso", "ADR $3.5k - $6k"],
        ["Zona Expo", "Negocios / Ferias", "Domótica + Ergonomía", "Ocupación estable"],
        ["Providencia", "Familias / Gourmet", "Minimalismo Cálido", "Tarifas Premium"]
      ];

      residents.forEach((row, i) => {
        const y = tableY + 10 + (i * 20);
        doc.setFillColor(rowColors[i][0], rowColors[i][1], rowColors[i][2]);
        doc.rect(20, y, 170, 20, 'F');
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.setFontSize(8);
        doc.text(row[0], 25, y + 10);
        doc.text(row[1], 65, y + 10, { maxWidth: 35 });
        doc.text(row[2], 105, y + 10, { maxWidth: 35 });
        doc.text(row[3], 150, y + 10);
      });

      doc.setTextColor(sandColor[0], sandColor[1], sandColor[2]);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("El Nómada Digital: Su oficina es su inversión", 20, 180);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text("Atraer a este perfil requiere una Zona de Trabajo Exclusiva con estándares técnicos: Wi-Fi >100 Mbps, sillas ergonómicas y gestión acústica.", 20, 190, { maxWidth: 170 });

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(9);
      doc.text("MAFE Interiorismo · Estrategia de Diseño Inmobiliario · 2024-2026", 20, 290);
      doc.text("Pág. 4", 190, 290);

      // --- Page 5: Checklist ---
      doc.addPage();
      doc.setFillColor(boneColor[0], boneColor[1], boneColor[2]);
      doc.rect(0, 0, 215, 300, 'F');
      
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.text("Checklist: Preparación GDL 2026", 20, 40);
      doc.setDrawColor(accentColor[0], accentColor[1], accentColor[2]);
      doc.line(20, 45, 190, 45);

      const checklistY = 65;
      const items = [
        "Curaduría de Marcas Locales (Peca Studio, The Norm)",
        "Optimización para Nómadas (Escritorio >75cm, USB-C)",
        "Actualización Cromática (Mocha Mousse o Tierras)",
        "Confort Térmico (Lino o Algodón Orgánico)",
        "Domótica Estratégica (Smart Locks 24/7)",
        "Sesión de Fotografía Profesional"
      ];

      items.forEach((item, i) => {
        doc.setDrawColor(accentColor[0], accentColor[1], accentColor[2]);
        doc.rect(20, checklistY + (i * 15), 5, 5);
        doc.setFontSize(11);
        doc.text(item, 30, checklistY + (i * 15) + 4);
      });

      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("Fotografía Profesional: El Cierre", 20, 180);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text([
        "• El 75% de los anfitriones recuperan la inversión en una sola noche.",
        "• Los anuncios profesionales pueden duplicar los ingresos mensuales.",
        "• Vendemos un estilo de vida: luz natural, texturas locales y atmósferas."
      ], 20, 192);

      doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
      doc.roundedRect(20, 220, 170, 60, 5, 5, 'F');
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setFontSize(16);
      doc.text("¿Listo para el 2026?", 105, 235, { align: 'center' });
      doc.setFontSize(11);
      
      doc.text("WhatsApp: 332 917 1317", 105, 248, { align: 'center' });
      doc.link(80, 243, 50, 8, { url: "https://wa.me/523329171317" });

      doc.text("Instagram: @mafe_interiorismo", 105, 258, { align: 'center' });
      doc.link(75, 253, 60, 8, { url: "https://www.instagram.com/mafe_interiorismo/" });

      doc.text("Email: mfgroz.interiores@gmail.com", 105, 268, { align: 'center' });
      doc.link(70, 263, 70, 8, { url: "mailto:mfgroz.interiores@gmail.com" });

      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setFontSize(9);
      doc.text("MAFE Interiorismo · Estrategia de Diseño Inmobiliario · 2024-2026", 20, 290);
      doc.text("Pág. 5", 190, 290);

      doc.save(`Playbook_Airbnb_GDL_${data.name.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      // Fallback simple PDF if images fail
      const doc = new jsPDF();
      doc.text("Guía Estratégica: Inversión Airbnb GDL 2026", 20, 20);
      doc.text(`Preparado para: ${data.name}`, 20, 30);
      doc.text("Contenido en preparación. Contacte a mfgroz.interiores@gmail.com", 20, 40);
      doc.save(`Guia_MAFE_${data.name.replace(/\s+/g, '_')}.pdf`);
    }
  };


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        generatePDF(formData);
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <section id="contacto" className="py-24 md:py-32 bg-brand-bone">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20">
        
        {/* Left: Bio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center"
        >
          <span className="text-brand-clay font-sans text-xs tracking-widest uppercase mb-4 block">La Diseñadora</span>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-walnut mb-8">
            Lic. Ma. Fernanda Guerrero
          </h2>
          <p className="font-serif italic text-brand-walnut/70 text-lg md:text-xl mb-8 border-l border-brand-clay pl-6">
            "Buscamos generar confianza, inspiración además de seguridad en cada colaboración, trabajando de manera cercana, profesional y comprometida con la calidad del resultado final."
          </p>
          <div className="mt-8 space-y-6">
            <div>
              <p className="font-sans text-sm tracking-widest uppercase text-brand-walnut/60 font-semibold mb-2">Ubicación</p>
              <p className="font-serif text-brand-walnut text-lg">Guadalajara, Jalisco, México.</p>
            </div>
            
            <div className="space-y-4">
              <p className="font-sans text-sm tracking-widest uppercase text-brand-walnut/60 font-semibold">Contacto Directo</p>
              
              <a 
                href="https://wa.me/523329171317" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-full bg-brand-clay/10 flex items-center justify-center group-hover:bg-brand-clay/20 transition-colors">
                  <MessageCircle className="w-5 h-5 text-brand-walnut" />
                </div>
                <p className="font-serif text-brand-walnut text-lg hover:text-brand-clay transition-colors underline decoration-brand-clay/30 underline-offset-4">
                  332 917 1317
                </p>
              </a>

              <a 
                href="mailto:mfgroz.interiores@gmail.com"
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-full bg-brand-clay/10 flex items-center justify-center group-hover:bg-brand-clay/20 transition-colors">
                  <Mail className="w-5 h-5 text-brand-walnut" />
                </div>
                <p className="font-sans font-light text-brand-walnut text-sm hover:text-brand-clay transition-colors underline decoration-brand-clay/30 underline-offset-4">
                  mfgroz.interiores@gmail.com
                </p>
              </a>

              <a 
                href="https://www.instagram.com/mafe_interiorismo/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-full bg-brand-clay/10 flex items-center justify-center group-hover:bg-brand-clay/20 transition-colors">
                  <Instagram className="w-5 h-5 text-brand-walnut" />
                </div>
                <p className="font-sans font-light text-brand-walnut text-sm hover:text-brand-clay transition-colors underline decoration-brand-clay/30 underline-offset-4">
                  @mafe_interiorismo
                </p>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right: Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, delay: 0.2 }}
          className="bg-brand-sand/20 p-10 md:p-14 relative overflow-hidden"
        >
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-brand-walnut/20" />
          
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full text-center py-10"
              >
                <CheckCircle2 className="w-16 h-16 text-brand-clay mb-6" />
                <h3 className="font-serif text-3xl text-brand-walnut mb-4">¡Gracias por tu interés!</h3>
                <p className="font-sans font-light text-brand-walnut/70 mb-8">
                  Tu información ha sido recibida. Tu Guía Estratégica personalizada se ha generado y descargado automáticamente.
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="text-brand-walnut font-sans text-xs tracking-widest uppercase border-b border-brand-walnut/30 pb-1 hover:border-brand-walnut transition-colors"
                >
                  Enviar otro mensaje
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h3 className="font-serif text-3xl text-brand-walnut mb-4">Solicitar Guía Estratégica</h3>
                <p className="font-sans font-light text-xs text-brand-walnut/60 uppercase tracking-widest mb-10">Recibe tu PDF personalizado al instante</p>
                
                <form className="space-y-8" onSubmit={handleSubmit}>
                  <div className="relative z-0 w-full mb-6 group">
                    <input 
                      type="text" 
                      name="name" 
                      id="name" 
                      className="block py-2.5 px-0 w-full text-sm text-brand-walnut bg-transparent border-0 border-b border-brand-walnut/30 appearance-none focus:outline-none focus:ring-0 focus:border-brand-walnut peer font-sans font-light" 
                      placeholder=" " 
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-brand-walnut/50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-brand-walnut peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-sans font-light uppercase tracking-widest">Nombre Completo</label>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                      <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        className="block py-2.5 px-0 w-full text-sm text-brand-walnut bg-transparent border-0 border-b border-brand-walnut/30 appearance-none focus:outline-none focus:ring-0 focus:border-brand-walnut peer font-sans font-light" 
                        placeholder=" " 
                        required 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                      <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-brand-walnut/50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-brand-walnut peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-sans font-light uppercase tracking-widest">Correo Electrónico</label>
                    </div>
                    
                    <div className="relative z-0 w-full mb-6 group">
                      <input 
                        type="text" 
                        name="zone" 
                        id="zone" 
                        className="block py-2.5 px-0 w-full text-sm text-brand-walnut bg-transparent border-0 border-b border-brand-walnut/30 appearance-none focus:outline-none focus:ring-0 focus:border-brand-walnut peer font-sans font-light" 
                        placeholder=" " 
                        required 
                        value={formData.zone}
                        onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                      />
                      <label htmlFor="zone" className="peer-focus:font-medium absolute text-sm text-brand-walnut/50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-brand-walnut peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-sans font-light uppercase tracking-widest">Zona Enfocada (ej. Zapopan)</label>
                    </div>
                  </div>
                  
                  <div className="relative z-0 w-full mb-6 group">
                    <textarea 
                      name="message" 
                      id="message" 
                      rows={3} 
                      className="block py-2.5 px-0 w-full text-sm text-brand-walnut bg-transparent border-0 border-b border-brand-walnut/30 appearance-none focus:outline-none focus:ring-0 focus:border-brand-walnut peer font-sans font-light resize-none" 
                      placeholder=" " 
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                    <label htmlFor="message" className="peer-focus:font-medium absolute text-sm text-brand-walnut/50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-brand-walnut peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-sans font-light uppercase tracking-widest">Breve descripción de tu objetivo</label>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="text-brand-bone bg-brand-walnut hover:bg-[#3a3028] font-sans text-xs tracking-[0.2em] uppercase px-8 py-4 transition-colors w-full mt-4 flex items-center justify-center gap-2 group disabled:opacity-70"
                  >
                    {status === 'loading' ? (
                      <Loader2 className="w-4 h-4 animate-spin text-brand-bone" />
                    ) : null}
                    {status === 'loading' ? 'Procesando...' : 'Obtener mi Guía Gratuita'}
                  </button>
                  
                  {status === 'error' && (
                    <p className="text-red-500 text-xs font-sans mt-2 text-center">Hubo un error. Por favor intenta de nuevo.</p>
                  )}
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
