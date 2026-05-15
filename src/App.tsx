/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import CreaFPillars from './components/CreaFPillars';
import Portfolio from './components/Portfolio';
import TechnicalEdge from './components/TechnicalEdge';
import AboutContact from './components/AboutContact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-brand-bone min-h-screen text-brand-walnut selection:bg-brand-clay/30">
      <Navbar />
      <Hero />
      <Philosophy />
      <CreaFPillars />
      <Portfolio />
      <TechnicalEdge />
      <AboutContact />
      <Footer />
    </div>
  );
}
