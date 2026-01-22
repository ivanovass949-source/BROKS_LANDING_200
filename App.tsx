import React, { useState, ChangeEvent, FormEvent } from 'react';

// --- Assets & Constants ---

// SVG Noise Texture (Base64 encoded for single-file portability)
// A subtle noise texture to add "granite" grain
const NOISE_SVG_DATA_URI = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`;

// --- Components ---

interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
}) => {
  return (
    <div className="flex flex-col mb-[20px] last:mb-0 w-full">
      <label
        htmlFor={id}
        className="text-[12px] uppercase font-semibold tracking-[0.1em] text-white/50 mb-[8px] ml-1"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={`
          w-full
          bg-[rgba(20,22,27,0.6)]
          backdrop-blur-[24px]
          border
          border-[rgba(42,46,54,0.7)]
          rounded-[10px]
          py-[18px] px-[22px]
          text-[16px] text-white
          placeholder:text-white/30
          outline-none
          transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)
          
          focus:bg-[rgba(26,29,35,0.8)]
          focus:border-white/20
          focus:shadow-[0_0_0_3px_rgba(255,255,255,0.03)]
        `}
      />
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    agency: '',
    promo: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Phone formatting logic (+7 mask)
  const formatPhoneNumber = (value: string) => {
    // Strip all non-digits
    const digits = value.replace(/\D/g, '');
    
    // If empty or user is deleting everything, clear it
    if (!digits) return '';

    // If starts with 7 or 8, treat as RU phone. Else just append.
    let cleanDigits = digits;
    if (digits.startsWith('7')) cleanDigits = digits.slice(1);
    else if (digits.startsWith('8')) cleanDigits = digits.slice(1);
    
    // Limit to 10 digits (after +7)
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
      // Allow user to delete back to empty
      if (value.length < formData.phone.length) {
         setFormData(prev => ({ ...prev, phone: formatPhoneNumber(value) }));
         return;
      }
      setFormData(prev => ({ ...prev, phone: formatPhoneNumber(value) }));
    } else {
      setFormData(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
  };

  // The CSS Background String as provided in the brief
  const graniteBackgroundStyles: React.CSSProperties = {
    backgroundColor: '#0B0D10',
    backgroundImage: `
      ${NOISE_SVG_DATA_URI},
      radial-gradient(ellipse at 20% 30%, rgba(42,46,54,0.35) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 70%, rgba(31,34,41,0.4) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 50%, rgba(26,29,35,0.3) 0%, transparent 70%),
      linear-gradient(135deg, #0B0D10 0%, #14161B 30%, #0B0D10 60%, #1A1D23 100%)
    `,
    backgroundBlendMode: 'overlay, normal, normal, normal, normal', 
  };

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center justify-start text-white selection:bg-white/20 selection:text-white"
      style={graniteBackgroundStyles}
    >
      <div className="w-full max-w-[1200px] px-[24px] py-[100px] max-sm:px-[20px] max-sm:py-[60px] flex flex-col items-center">
        
        {/* HERO SECTION */}
        <div className="flex flex-col items-center text-center w-full max-w-[900px] animate-fade-in-up">
          
          {/* BADGE */}
          <div className="mb-[32px] px-[16px] py-[6px] rounded-[20px] border border-white/10 bg-white/5 backdrop-blur-sm">
             <span className="text-[11px] uppercase tracking-[0.08em] font-medium text-white/90">Закрытая бета</span>
          </div>

          <h1 
            className="text-[96px] font-extrabold tracking-[0.18em] uppercase mb-[32px] leading-none max-md:text-[64px] max-sm:text-[48px]"
            style={{ textShadow: '0 4px 60px rgba(0, 0, 0, 0.5)' }}
          >
            BROKS
          </h1>
          <p className="text-[20px] text-white/70 font-normal leading-[1.6] max-w-[600px] max-sm:text-[16px]">
            Платформа, которая помогает брокерам работать быстро, безопасно и удобно
          </p>
        </div>

        {/* SPACER */}
        <div className="h-[140px] max-sm:h-[80px]" />

        {/* MISSION STATEMENT CARD */}
        <div className="w-full max-w-[720px] mx-auto">
            <div className={`
                bg-[rgba(26,29,35,0.35)] 
                border border-[rgba(42,46,54,0.6)] 
                rounded-[20px] 
                p-[56px] 
                backdrop-blur-[32px] 
                shadow-[0_12px_40px_rgba(0,0,0,0.5),0_1px_3px_rgba(255,255,255,0.04)_inset]
                text-center
                max-sm:p-[32px]
            `}>
                <p className="text-[18px] font-medium leading-[1.8] text-white/85 mb-[24px] max-sm:text-[16px]">
                  Мы сами работали брокерами и на своём опыте поняли, чего действительно не хватает рынку. Столкнувшись с болью и реальными проблемами в работе агентов, мы создали инструмент, который изменит правила игры.
                </p>
                <p className="text-[17px] font-normal leading-[1.7] text-white/75 max-sm:text-[15px]">
                  Присоединяйтесь к платформе, которая выведет рынок недвижимости на новый уровень.
                </p>
            </div>
        </div>

        {/* SPACER */}
        <div className="h-[140px] max-sm:h-[80px]" />

        {/* LEAD FORM SECTION */}
        <div className="w-full max-w-[600px] flex flex-col items-center">
            <h2 className="text-[36px] font-bold mb-[56px] text-center max-sm:text-[28px] max-sm:mb-[40px]">
                Начните работать с BROKS
            </h2>

            {!submitted ? (
              <div className={`
                w-full max-w-[520px]
                bg-[rgba(26,29,35,0.35)]
                border border-[rgba(42,46,54,0.6)]
                rounded-[20px]
                py-[64px] px-[56px]
                backdrop-blur-[32px]
                shadow-[0_16px_48px_rgba(0,0,0,0.5)]
                max-sm:py-[40px] max-sm:px-[24px]
              `}>
                <form onSubmit={handleSubmit} className="flex flex-col">
                  <InputField 
                    id="name" 
                    label="ФИО" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                    placeholder="Иванов Иван"
                  />
                  
                  <InputField 
                    id="phone" 
                    label="Телефон" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    required 
                    type="tel"
                    placeholder="+7 (999) 000-00-00"
                  />
                  
                  <InputField 
                    id="email" 
                    label="Email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                    type="email"
                    placeholder="broker@example.com"
                  />
                  
                  <InputField 
                    id="agency" 
                    label="Агентство" 
                    value={formData.agency} 
                    onChange={handleChange} 
                    placeholder="Название агентства"
                  />
                  
                  <InputField 
                    id="promo" 
                    label="Промокод" 
                    value={formData.promo} 
                    onChange={handleChange} 
                    placeholder="Введите промокод"
                  />

                  <div className="mt-[24px]">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`
                        w-full
                        relative
                        overflow-hidden
                        rounded-[10px]
                        py-[22px]
                        text-[15px] font-semibold tracking-[0.08em] uppercase
                        border border-white/10
                        cursor-pointer
                        transition-all duration-200 ease-out
                        shadow-[0_8px_24px_rgba(0,0,0,0.4)]
                        
                        ${isSubmitting ? 'opacity-70 cursor-wait' : 'hover:-translate-y-[1px] hover:shadow-[0_12px_32px_rgba(0,0,0,0.5)] active:translate-y-0'}
                      `}
                      style={{
                        background: 'linear-gradient(135deg, #2A2E36 0%, #1F2229 100%)',
                      }}
                    >
                      {/* Hover Overlay */}
                      <span className="absolute inset-0 bg-white/5 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
                      
                      <span className="relative z-10">
                        {isSubmitting ? 'Обработка...' : 'Присоединиться'}
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="w-full max-w-[520px] bg-[rgba(26,29,35,0.4)] backdrop-blur-[24px] border border-[rgba(42,46,54,0.6)] rounded-[16px] p-12 text-center animate-fade-in shadow-2xl">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
                    <svg className="w-8 h-8 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-[24px] font-bold text-white mb-4">Заявка принята</h3>
                <p className="text-white/70 leading-relaxed text-[16px]">
                  Спасибо за интерес к BROKS. Мы свяжемся с вами в ближайшее время для предоставления доступа к платформе.
                </p>
              </div>
            )}
        </div>

        {/* FOOTER */}
        <footer className="mt-[140px] pb-[80px] text-center max-sm:mt-[80px]">
          <p className="text-[13px] text-white/35 font-sans">
            © 2026 BROKS • support@broks.ru
          </p>
        </footer>

      </div>
    </div>
  );
}