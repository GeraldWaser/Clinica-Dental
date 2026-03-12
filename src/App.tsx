import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageCircle, 
  Star, 
  MapPin, 
  Phone, 
  Clock, 
  Menu, 
  X, 
  ChevronRight,
  ShieldCheck,
  Sparkles,
  HeartPulse
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#' },
    { name: 'Especialidades', href: '#especialidades' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Reseñas', href: '#resenas' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 md:px-12 py-4",
      isScrolled ? "bg-white/80 backdrop-blur-lg shadow-sm py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-warm-accent rounded-full flex items-center justify-center text-white">
            <Sparkles size={20} />
          </div>
          <span className={cn(
            "text-xl font-serif font-bold tracking-tight transition-colors",
            isScrolled ? "text-stone-900" : "text-white"
          )}>
            DENTAL LUXE
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-warm-accent",
                isScrolled ? "text-stone-600" : "text-white/90"
              )}
            >
              {link.name}
            </a>
          ))}
          <button className="bg-warm-accent hover:bg-warm-accent/90 text-white px-6 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 active:scale-95">
            Agendar Cita
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className={isScrolled ? "text-stone-900" : "text-white"} /> : <Menu className={isScrolled ? "text-stone-900" : "text-white"} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-lg font-medium text-stone-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button className="bg-warm-accent text-white py-3 rounded-xl font-medium">
              Agendar Cita
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2000&auto=format&fit=crop" 
          alt="Genuine Smile"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <h1 className="text-5xl md:text-7xl text-white font-serif leading-tight mb-6">
            Tu sonrisa, <br />
            <span className="italic">nuestra pasión.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-light mb-10 max-w-lg leading-relaxed">
            Experimenta la odontología de vanguardia en un entorno diseñado para tu tranquilidad. Lujo, precisión y cuidado humano.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-whatsapp hover:bg-whatsapp/90 text-white px-8 py-4 rounded-full flex items-center gap-3 text-lg font-semibold shadow-lg transition-all"
          >
            <MessageCircle size={24} />
            Agenda tu cita
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
      >
        <div className="w-px h-12 bg-white/30 mx-auto" />
      </motion.div>
    </section>
  );
};

const ReviewCard = ({ name, text, rating, image }: { name: string, text: string, rating: number, image: string }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 flex flex-col gap-4"
  >
    <div className="flex gap-1 text-warm-accent">
      {[...Array(rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
    </div>
    <p className="text-stone-600 italic leading-relaxed">"{text}"</p>
    <div className="flex items-center gap-4 mt-4">
      <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer" />
      <div>
        <h4 className="font-bold text-stone-900">{name}</h4>
        <span className="text-xs text-stone-400">Paciente verificado</span>
      </div>
    </div>
  </motion.div>
);

const SpecialistCard = ({ name, role, credentials, image }: { name: string, role: string, credentials: string, image: string }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="group cursor-pointer"
  >
    <div className="relative aspect-[3/4] overflow-hidden rounded-3xl mb-6">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
    <h3 className="text-2xl font-serif mb-1">{name}</h3>
    <p className="text-warm-accent font-medium text-sm uppercase tracking-widest mb-2">{role}</p>
    <p className="text-stone-500 text-sm leading-relaxed">{credentials}</p>
  </motion.div>
);

const FloatingWhatsApp = () => (
  <motion.a
    href="https://wa.me/yournumber"
    target="_blank"
    rel="noopener noreferrer"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="fixed bottom-8 right-8 z-50 bg-whatsapp text-white p-4 rounded-full shadow-2xl flex items-center justify-center"
  >
    <MessageCircle size={32} />
    <span className="absolute -top-2 -right-2 bg-red-500 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold">1</span>
  </motion.a>
);

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen selection:bg-warm-accent/30">
      <Navbar />
      
      <main>
        <Hero />

        {/* Trust Bar */}
        <section className="py-12 bg-white border-b border-stone-100">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-50 grayscale">
            <div className="flex items-center gap-2 font-serif text-xl">ISO 9001 CERTIFIED</div>
            <div className="flex items-center gap-2 font-serif text-xl">AMERICAN DENTAL ASSOC.</div>
            <div className="flex items-center gap-2 font-serif text-xl">GLOBAL HEALTH TRUST</div>
            <div className="flex items-center gap-2 font-serif text-xl">EXCELLENCE AWARD 2025</div>
          </div>
        </section>

        {/* Services Section */}
        <section id="especialidades" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="max-w-xl">
                <span className="text-warm-accent font-medium tracking-[0.2em] uppercase text-sm mb-4 block">Nuestros Servicios</span>
                <h2 className="text-4xl md:text-5xl leading-tight">Excelencia médica en cada tratamiento.</h2>
              </div>
              <p className="text-stone-500 max-w-sm">
                Combinamos tecnología de punta con un enfoque humano para garantizar resultados estéticos y funcionales superiores.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <Sparkles />, title: "Estética Dental", desc: "Diseño de sonrisa, carillas de porcelana y blanqueamiento profesional." },
                { icon: <HeartPulse />, title: "Implantología", desc: "Restauración dental permanente con la tecnología más avanzada del mercado." },
                { icon: <ShieldCheck />, title: "Ortodoncia Invisible", desc: "Alinea tu sonrisa de forma discreta y cómoda con sistemas transparentes." }
              ].map((service, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -10 }}
                  className="p-10 rounded-[2rem] bg-white border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  <div className="w-14 h-14 bg-warm-bg rounded-2xl flex items-center justify-center text-warm-accent mb-8">
                    {React.cloneElement(service.icon as React.ReactElement, { size: 28 })}
                  </div>
                  <h3 className="text-2xl mb-4">{service.title}</h3>
                  <p className="text-stone-500 leading-relaxed mb-6">{service.desc}</p>
                  <a href="#" className="inline-flex items-center gap-2 text-warm-accent font-semibold group">
                    Saber más <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section id="resenas" className="py-24 bg-stone-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="flex justify-center gap-1 text-warm-accent mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
              </div>
              <h2 className="text-4xl md:text-5xl mb-4">Lo que dicen nuestros pacientes</h2>
              <p className="text-stone-500">Más de 500 reseñas de 5 estrellas en Google.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ReviewCard 
                name="Elena Rodríguez" 
                text="La mejor experiencia dental que he tenido. El trato es exquisito y los resultados superaron mis expectativas. Me sentí en un spa."
                rating={5}
                image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop"
              />
              <ReviewCard 
                name="Carlos Méndez" 
                text="Profesionales de primer nivel. Me hice un diseño de sonrisa y el cambio ha sido increíble. La tecnología que usan es impresionante."
                rating={5}
                image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
              />
              <ReviewCard 
                name="Sofía Valdés" 
                text="Increíble atención al detalle. Desde que entras por la puerta te sientes cuidada. Recomiendo totalmente la ortodoncia invisible."
                rating={5}
                image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
              />
            </div>
          </div>
        </section>

        {/* Specialists Section */}
        <section id="nosotros" className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <span className="text-warm-accent font-medium tracking-[0.2em] uppercase text-sm mb-4 block">Nuestro Equipo</span>
              <h2 className="text-4xl md:text-5xl mb-6">Manos expertas para tu salud dental</h2>
              <p className="text-stone-500 leading-relaxed">
                Contamos con especialistas certificados internacionalmente, dedicados a brindarte la mejor atención clínica y estética.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              <SpecialistCard 
                name="Dra. Marina Soler" 
                role="Directora Clínica" 
                credentials="Especialista en Estética Dental y Rehabilitación Oral. Master en Harvard Dental School."
                image="https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=600&auto=format&fit=crop"
              />
              <SpecialistCard 
                name="Dr. Julián Castro" 
                role="Implantología" 
                credentials="Cirujano Maxilofacial con más de 15 años de experiencia en implantes de carga inmediata."
                image="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=600&auto=format&fit=crop"
              />
              <SpecialistCard 
                name="Dra. Ana Belén" 
                role="Ortodoncia" 
                credentials="Experta en sistemas Invisalign y ortodoncia interceptiva para niños y adultos."
                image="https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=600&auto=format&fit=crop"
              />
              <SpecialistCard 
                name="Dr. Roberto Sanz" 
                role="Endodoncia" 
                credentials="Especialista en tratamientos de conducto microscópicos y preservación dental."
                image="https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=600&auto=format&fit=crop"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto relative rounded-[3rem] overflow-hidden bg-stone-900 text-white p-12 md:p-24 text-center">
            <div className="absolute inset-0 opacity-20">
              <img 
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2000&auto=format&fit=crop" 
                alt="Clinic Interior" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl mb-8 font-serif">¿Listo para transformar tu sonrisa?</h2>
              <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto font-light">
                Únete a los cientos de pacientes que ya confían en nosotros. Tu primera consulta de valoración es cortesía de la clínica.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="bg-warm-accent text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-warm-accent/90 transition-all">
                  Reservar Online
                </button>
                <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-white/20 transition-all">
                  Ver Ubicación
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white pt-24 pb-12 px-6 border-t border-stone-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-warm-accent rounded-full flex items-center justify-center text-white">
                  <Sparkles size={16} />
                </div>
                <span className="text-lg font-serif font-bold tracking-tight">DENTAL LUXE</span>
              </div>
              <p className="text-stone-500 text-sm leading-relaxed">
                Redefiniendo la experiencia dental a través del lujo, la tecnología y el cuidado humano excepcional.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-6">Contacto</h4>
              <ul className="space-y-4 text-sm text-stone-500">
                <li className="flex items-center gap-3"><MapPin size={16} className="text-warm-accent" /> Av. de la Castellana 120, Madrid</li>
                <li className="flex items-center gap-3"><Phone size={16} className="text-warm-accent" /> +34 912 345 678</li>
                <li className="flex items-center gap-3"><MessageCircle size={16} className="text-warm-accent" /> WhatsApp: +34 600 000 000</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Horario</h4>
              <ul className="space-y-4 text-sm text-stone-500">
                <li className="flex items-center gap-3"><Clock size={16} className="text-warm-accent" /> Lun - Vie: 9:00 - 20:00</li>
                <li className="flex items-center gap-3"><Clock size={16} className="text-warm-accent" /> Sábados: 10:00 - 14:00</li>
                <li className="flex items-center gap-3"><Clock size={16} className="text-warm-accent" /> Domingos: Cerrado</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Síguenos</h4>
              <div className="flex gap-4">
                {['Instagram', 'Facebook', 'LinkedIn'].map(social => (
                  <a key={social} href="#" className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-400 hover:bg-warm-accent hover:text-white transition-all">
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5 bg-current rounded-sm opacity-20" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-400">
            <p>© 2026 Clínica Dental Luxe. Todos los derechos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-stone-600">Aviso Legal</a>
              <a href="#" className="hover:text-stone-600">Privacidad</a>
              <a href="#" className="hover:text-stone-600">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      <FloatingWhatsApp />
    </div>
  );
}
