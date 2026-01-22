import React, { useState, ChangeEvent, FormEvent } from 'react';

// --- Assets (Simulated 3D Objects via Emoji/CSS) ---
// In a real production build, these would be the specific PNG/GLB assets from the reference.
// We use scaled, filtered typography to mimic the visual weight of the reference images.

const FloatingObject = ({ emoji, className, delay }: { emoji: string, className: string, delay: string }) => (
  <div 
    className={`absolute text-[80px] md:text-[120px] filter drop-shadow-2xl select-none pointer-events-none z-10 ${className}`}
    style={{ animationDelay: delay }}
  >
    {emoji}
  </div>
);

const Marquee = ({ text, bg = "bg-white", color = "text-black" }: { text: string, bg?: string, color?: string }) => (
  <div className={`w-full ${bg} ${color} py-4 overflow-hidden border-y-2 border-black flex relative z-20`}>
    <div className="animate-marquee whitespace-nowrap flex items-center">
      <span className="text-4xl font-black uppercase tracking-tighter">{text}</span>
      <span className="text-4xl font-black uppercase tracking-tighter">{text}</span>
      <span className="text-4xl font-black uppercase tracking-tighter">{text}</span>
      <span className="text-4xl font-black uppercase tracking-tighter">{text}</span>
    </div>
  </div>
);

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    agency: '',
    promo: '',
  });

  const [hoveredLetter, setHoveredLetter] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Phone formatting logic
  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (!digits) return '';
    let cleanDigits = digits.startsWith('7') || digits.startsWith('8') ? digits.slice(1) : digits;
    cleanDigits = cleanDigits.slice(0, 10);
    let formatted = '+7';
    if (cleanDigits.length > 0) formatted += ` (${cleanDigits.slice(0, 3)}`;
    if (cleanDigits.length >= 3) formatted += `) ${cleanDigits.slice(3, 6)}`;
    if (cleanDigits.length >= 6) formatted += `-${cleanDigits.slice(6, 8)}`;
    if (cleanDigits.length >= 8) formatted += `-${cleanDigits.slice(8, 10)}`;
    return formatted;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === 'phone') {
         setFormData(prev => ({ ...prev, phone: formatPhoneNumber(value) }));
    } else {
      setFormData(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTimeout(() => setSubmitted(true), 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#ccff00] selection:text-black font-sans">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-screen w-full flex flex-col justify-between overflow-hidden">
        
        {/* Top Nav - Simplified */}
        <div className="w-full p-6 flex justify-center items-center z-30 mix-blend-difference">
          <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center animate-spin-slow">
            <div className="w-full h-[2px] bg-black rotate-45 absolute"></div>
            <div className="w-full h-[2px] bg-black -rotate-45 absolute"></div>
          </div>
        </div>

        {/* Floating elements removed as requested */}

        {/* CENTER TITLE: BROKS */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <h1 className="text-[22vw] leading-[0.8] font-black tracking-tighter flex items-center justify-center mix-blend-exclusion">
            {['B','R','O','K','S'].map((char, i) => (
              <span 
                key={i}
                className={`transition-transform duration-300 pointer-events-auto cursor-none hover:text-[#ccff00] hover:scale-110 hover:-rotate-3`}
                onMouseEnter={() => setHoveredLetter(i)}
                onMouseLeave={() => setHoveredLetter(null)}
              >
                {char}
              </span>
            ))}
          </h1>
        </div>
        
        {/* Hero Overlay Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-10 pointer-events-none opacity-30">
             <span className="text-[30vw] font-black text-stroke leading-none">REAL</span>
        </div>

        {/* Scroll Indicator */}
        <div className="w-full flex justify-center pb-8 z-30">
          <div className="text-[10px] uppercase tracking-[0.3em] animate-bounce">
            ПРОКРУТИТЕ ВНИЗ
          </div>
        </div>
      </section>

      {/* --- MARQUEE --- */}
      <Marquee text="БЫСТРЫЙ ПОИСК ОБЪЕКТОВ • ПРОЗРАЧНЫЕ КОМИССИИ • НИКАКИХ ФЕЙКОВ • " bg="bg-[#ccff00]" />

      {/* --- MISSION SECTION (KEEP MOSCOW STYLE) --- */}
      <section className="bg-white text-black py-20 px-6 md:px-10 flex justify-center">
        <div className="max-w-[960px] w-full text-left">
          
          {/* Main Headline */}
          <h2 className="text-4xl md:text-[56px] font-light leading-[1.1] tracking-[-0.02em] text-black mb-12">
            BROKS — <br />
            это профессиональный инструмент для удобной и безопасной работы брокеров.
          </h2>

          {/* Body Description */}
          <p className="text-lg md:text-[20px] font-normal leading-relaxed text-black/70">
            Проверка договоров, фиксация клиента и защита ваших интересов на каждом&nbsp;этапе. <br />
            Просто, надёжно, без лишней бюрократии.
          </p>

        </div>
      </section>

      {/* --- MARQUEE 2 --- */}
      <Marquee text="ПРИСОЕДИНЯЙТЕСЬ • ПРИСОЕДИНЯЙТЕСЬ • ПРИСОЕДИНЯЙТЕСЬ • " bg="bg-black" color="text-white" />

      {/* --- FORM SECTION --- */}
      <section className="bg-black py-32 px-6 md:px-12 relative">
        <div className="max-w-xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-7xl font-black text-center text-white mb-16 uppercase tracking-tighter leading-none">
            Начните работать<br/><span className="text-transparent text-stroke hover:text-[#ccff00] transition-colors duration-300">с BROKS</span>
          </h2>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              {[
                { id: 'name', label: 'ФИО', type: 'text', placeholder: 'Иванов Иван' },
                { id: 'phone', label: 'ТЕЛЕФОН', type: 'tel', placeholder: '+7 (999) 000-00-00' },
                { id: 'email', label: 'EMAIL', type: 'email', placeholder: 'broker@example.com' },
                { id: 'agency', label: 'АГЕНТСТВО', type: 'text', placeholder: 'Название агентства' },
                { id: 'promo', label: 'ПРОМОКОД', type: 'text', placeholder: 'Введите промокод' }
              ].map((field) => (
                <div key={field.id} className="group relative">
                  <label htmlFor={field.id} className="block text-xs font-mono text-[#ccff00] mb-2 uppercase tracking-widest">
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    type={field.type}
                    required={field.id !== 'agency' && field.id !== 'promo'}
                    value={formData[field.id as keyof typeof formData]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full bg-transparent border-b-2 border-white/30 text-2xl md:text-3xl font-bold py-4 text-white focus:outline-none focus:border-[#ccff00] placeholder:text-white/20 transition-colors"
                  />
                </div>
              ))}

              <button 
                type="submit" 
                className="w-full bg-white text-black text-2xl font-black uppercase py-6 mt-12 hover:bg-[#ccff00] transition-colors duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">ПРИСОЕДИНИТЬСЯ</span>
                <div className="absolute inset-0 bg-[#ccff00] translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0"></div>
              </button>
            </form>
          ) : (
            <div className="border-4 border-[#ccff00] p-12 text-center animate-pulse">
              <h3 className="text-4xl font-black uppercase mb-4">Вы в деле.</h3>
              <p className="font-mono text-sm">МЫ СВЯЖЕМСЯ С ВАМИ.</p>
            </div>
          )}
        </div>

        {/* Decorative Grid Background */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
             style={{ 
               backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
             }}>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-black text-white/40 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center font-mono text-xs uppercase tracking-widest">
          <div>© 2026 Платформа BROKS</div>
          <div className="mt-4 md:mt-0">support@broks.ru</div>
        </div>
      </footer>

    </div>
  );
}