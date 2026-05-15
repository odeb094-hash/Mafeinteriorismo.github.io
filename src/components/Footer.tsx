import { Instagram } from 'lucide-react';
import logoUrl from '../images/MAFE_logo_transparent_white.png';

export default function Footer() {
  return (
    <footer className="bg-[#4A3F35] text-brand-bone py-12 border-t border-brand-bone/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <a href="#" className="flex items-center md:items-start group">
          <img 
            src={logoUrl} 
            alt="MAFE Interiorismo" 
            className="h-12 md:h-16 w-auto opacity-90 group-hover:opacity-100 transition-opacity object-contain drop-shadow-md" 
          />
        </a>
        
        <div className="flex items-center gap-6 font-sans font-light text-xs tracking-widest uppercase text-brand-bone/50">
          <a 
            href="https://www.instagram.com/mafe_interiorismo/" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-brand-bone transition-colors flex items-center gap-2"
          >
            <Instagram className="w-4 h-4" />
            <span>@mafe_interiorismo</span>
          </a>
        </div>
        
        <p className="font-sans font-light text-xs text-brand-bone/40">
          © {new Date().getFullYear()} MAFE Interiorismo. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
