import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'motion/react';
import { 
  Flower2, Waves, Circle, Feather, ArrowRight, Sparkles, Volume2, Droplet, ChevronLeft, ChevronRight, Globe,
  X, Play, CheckCircle2, ExternalLink
} from 'lucide-react';
import pillarImg from '/pillar.jpeg';
import anandImg from '/anand.jpeg';

/* --- UTILS --- */
const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 2.5, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const StaggerChildren = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4
      }
    }
  };
  return (
    <motion.div variants={variants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10%" }} className={className}>
      {children}
    </motion.div>
  );
};

const StaggerItem = ({ children }: { children: React.ReactNode }) => {
  const variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 2.5, ease: [0.16, 1, 0.3, 1] } }
  };
  return <motion.div variants={variants}>{children}</motion.div>;
};

const ScrollParallax = ({ children, offset = 20, className = "" }: { children: React.ReactNode, offset?: number, className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

const SectionLabel = ({ text, color = "text-sandalwood opacity-90" }: { text: string, color?: string }) => (
  <div className="flex items-center gap-4 mb-4 w-full">
    <div className={`h-[1px] w-8 md:w-16 bg-current opacity-30 ${color}`}></div>
    <div className={`w-1.5 h-1.5 rotate-45 border border-current opacity-60 ${color}`}></div>
    <span className={`text-[0.65rem] uppercase tracking-[0.4em] font-['Lato'] font-medium ${color}`}>
      {text}
    </span>
    <div className={`w-1.5 h-1.5 rotate-45 border border-current opacity-60 ${color}`}></div>
  </div>
);

const REFLECTIONS = [
  { text: "Anand shares the classical arts in an incredibly accessible way. There is a deep geometry, yet it feels entirely natural.", author: "Rajesh" },
  { text: "My weekly anchor. Whether it's the rhythm of chanting or classical music, I always step out far more joyful and still.", author: "Devi" },
  { text: "I finally managed to learn 'Parvati Panchakam'. The way he approaches pronunciation removes all hesitation and anxiety.", author: "Shreya" },
  { text: "He has a very calm presence. He simplifies the deep science of sound so naturally that it brings immediate clarity.", author: "Shraddha" },
  { text: "I never believed I had a voice for chanting, but his method built a natural, effortless joy inside me week by week.", author: "Bhumi" },
  { text: "A beautiful and practical way to experience these profound traditional arts. Highly grounded, and deeply enriching.", author: "Nagaraj" }
];

const MARQUEE_TEXT = [
  'ISHA CHANTS',
  'CLASSICAL MUSIC',
  'PURE TRANSMISSION',
  'TRADITIONAL ROOTS',
  'INNER BALANCE',
  'CARNATIC VOCALS',
  'NADA YOGA',
  'GEOMETRY OF SOUND',
  'BHAKTI SADHANA'
];

interface OfferingProgram {
  id: string;
  image: string;
  sessionType: string;
  tags: string[];
  title: string;
  subtitle: string;
  price: string;
  buttonText: string;
  paymentUrl?: string;
}

const OFFERING_PROGRAMS: OfferingProgram[] = [
  {
    id: "guru-paduka-stotram",
    image: `${import.meta.env.BASE_URL}offerings/card-4-guru-paduka.jpg`,
    sessionType: "RECORDED SESSION | 1 HR 30 MINS",
    tags: ["WORKSHOPS", "CHANTS"],
    title: "GURU PADUKA STOTRAM",
    subtitle: "Lifetime Access",
    price: "INR 1500",
    buttonText: "BEGIN NOW",
    paymentUrl: "https://rzp.io/rzp/guru-paduka-stotram",
  },
  {
    id: "parvati-panchakam",
    image: `${import.meta.env.BASE_URL}transformative-body-mind.jpg`,
    sessionType: "RECORDED SESSION | 1 HR 30 MINS",
    tags: ["WORKSHOPS", "CHANTS"],
    title: "PARVATI PANCHAKAM",
    subtitle: "Lifetime Access",
    price: "INR 1500",
    buttonText: "BEGIN NOW",
  },
  {
    id: "bhairavi-stavan",
    image: `${import.meta.env.BASE_URL}lamp.jpeg`,
    sessionType: "RECORDED SESSION | 1 HR 30 MINS",
    tags: ["WORKSHOPS", "CHANTS"],
    title: "BHAIRAVI STAVAN",
    subtitle: "Lifetime Access",
    price: "INR 1500",
    buttonText: "BEGIN NOW",
  },
  {
    id: "linga-bhairavi-shayan-arati",
    image: `${import.meta.env.BASE_URL}shayan-arati.jpg`,
    sessionType: "RECORDED SESSION | 1 HR 30 MINS",
    tags: ["WORKSHOPS", "CHANTS"],
    title: "LINGA BHAIRAVI SHAYAN ARATI",
    subtitle: "Lifetime Access",
    price: "INR 1500",
    buttonText: "BEGIN NOW",
  },
  {
    id: "soundarya-lahari",
    image: `${import.meta.env.BASE_URL}offerings/card-1-guru-ashtakam.jpg`,
    sessionType: "RECORDED SESSION | 1 HR 30 MINS",
    tags: ["WORKSHOPS", "CHANTS"],
    title: "SOUNDARYA LAHARI",
    subtitle: "Lifetime Access",
    price: "INR 1500",
    buttonText: "BEGIN NOW",
  },
  {
    id: "gauranga",
    image: `${import.meta.env.BASE_URL}joyful-exploration.jpg`,
    sessionType: "RECORDED SESSION | 1 HR 30 MINS",
    tags: ["WORKSHOPS", "CHANTS"],
    title: "GAURANGA",
    subtitle: "Lifetime Access",
    price: "INR 1500",
    buttonText: "BEGIN NOW",
  },
  {
    id: "nirvana-shatakam",
    image: `${import.meta.env.BASE_URL}living-tradition.jpg`,
    sessionType: "RECORDED SESSION | 1 HR 30 MINS",
    tags: ["WORKSHOPS", "CHANTS"],
    title: "NIRVANA SHATAKAM",
    subtitle: "Lifetime Access",
    price: "INR 1500",
    buttonText: "BEGIN NOW",
  }
];

/* --- BEGIN YOUR JOURNEY: OFFERINGS CAROUSEL --- */
const ChantMarqueeSection = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 20);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 20);
  };

  useEffect(() => {
    checkScroll();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  // Move smoothly to the next / previous set of cards
  const scrollToNextSet = (direction: 'left' | 'right') => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidthWithGap = 400;
    const visibleCards = Math.max(1, Math.floor(el.clientWidth / cardWidthWithGap));
    const scrollAmount = visibleCards * cardWidthWithGap;
    
    el.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-28 w-full relative z-10 select-none overflow-hidden">
      {/* Header Block */}
      <div className="px-[6vw] md:px-[8vw] flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
        <div className="max-w-2xl">
          <SectionLabel text="Programs & Offerings" color="text-[#B84A32] opacity-80" />
          <h2 className="font-['Playfair_Display'] font-medium text-4xl md:text-5xl text-zinc-900 leading-tight">
            Begin Your <em className="text-gradient">Journey</em>
          </h2>
        </div>

        <div className="flex flex-col items-start md:items-end gap-3">
          <p className="max-w-[340px] text-zinc-800 text-sm md:text-base font-normal leading-relaxed text-left md:text-right">
            Carefully crafted online sessions designed to match your pace, from supportive group formats to personalized guidance.
          </p>
        </div>
      </div>

      {/* Cards Viewport with Floating Navigation Arrows */}
      <div className="relative w-full px-[6vw] md:px-[8vw] group/carousel">
        {/* Left Arrow Button (shown when user scrolled forward) */}
        {canScrollLeft && (
          <button
            onClick={() => scrollToNextSet('left')}
            aria-label="Previous set of cards"
            className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 p-2 text-white hover:text-white/80 active:scale-90 transition-all duration-200 cursor-pointer flex items-center justify-center drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] bg-black/40 hover:bg-black/70 rounded-full backdrop-blur-sm"
          >
            <ChevronLeft size={36} strokeWidth={2.5} />
          </button>
        )}

        {/* Scrollable Track - Static with generous spacing */}
        <div 
          ref={trackRef}
          className="w-full overflow-x-auto scroll-smooth scrollbar-none py-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] snap-x snap-mandatory flex gap-7 md:gap-8"
        >
          {OFFERING_PROGRAMS.map((program) => (
            <div 
              key={program.id} 
              className="w-[310px] sm:w-[350px] md:w-[370px] shrink-0 snap-start bg-[#101724] border border-zinc-800/80 rounded-lg overflow-hidden flex flex-col justify-between shadow-[0_16px_40px_rgba(0,0,0,0.4)] hover:border-zinc-700 hover:shadow-[0_24px_55px_rgba(0,0,0,0.55)] transition-all duration-300 group cursor-default"
            >
              <div>
                {/* Top Image: Stately 4:3 Aspect Ratio */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-zinc-900 shrink-0">
                  <img 
                    src={program.image} 
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                </div>

                {/* Card Content with Generous Breathing Space */}
                <div className="p-6 sm:p-7 md:p-8 pb-3">
                  {/* Session Type / Duration Header Line */}
                  <p className="text-zinc-100 font-serif tracking-[0.14em] uppercase text-xs sm:text-sm font-medium mb-4">
                    {program.sessionType}
                  </p>

                  {/* Tags Pill Row */}
                  <div className="flex items-center gap-2.5 mb-5">
                    {program.tags.map((tag, tIdx) => (
                      <span 
                        key={tIdx} 
                        className="px-3.5 py-1 rounded-full border border-zinc-600/80 bg-zinc-800/40 text-[0.68rem] sm:text-xs font-['Lato'] font-medium uppercase tracking-wider text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Program Title */}
                  <h3 className="text-white font-serif uppercase tracking-wider font-semibold text-xl sm:text-2xl leading-snug mb-3">
                    {program.title}
                  </h3>

                  {/* Subtitle / Access */}
                  <p className="text-zinc-300 text-sm sm:text-base font-['Lato'] font-normal mb-5">
                    {program.subtitle}
                  </p>

                  {/* Price */}
                  <p className="text-white font-bold text-xl sm:text-2xl font-['Lato'] tracking-wide">
                    {program.price}
                  </p>
                </div>
              </div>

              {/* Bottom Rounded Pill Button with Generous Margin */}
              <div className="p-6 sm:p-7 md:p-8 pt-3 pb-7 md:pb-8">
                <a 
                  href={program.paymentUrl || `https://wa.me/919790778251?text=${encodeURIComponent(`Hi, I would like to begin sadhana for ${program.title}`)}`}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full py-3.5 px-6 rounded-full border border-[#8C7A5B] hover:border-[#D4AF37] bg-transparent hover:bg-white/5 text-center font-serif text-xs sm:text-sm tracking-[0.2em] uppercase text-white font-medium transition-all duration-300 cursor-pointer block active:scale-[0.98]"
                >
                  {program.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow Button */}
        {canScrollRight && (
          <button
            onClick={() => scrollToNextSet('right')}
            aria-label="Next set of cards"
            className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 p-2 text-white hover:text-white/80 active:scale-90 transition-all duration-200 cursor-pointer flex items-center justify-center drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] bg-black/40 hover:bg-black/70 rounded-full backdrop-blur-sm"
          >
            <ChevronRight size={36} strokeWidth={2.5} />
          </button>
        )}
      </div>
    </div>
  );
};

const HeroButton = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    let animationFrameId: number;

    const drawCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      const stop1 = (Math.sin(time * 0.05) + 1) * 0.5;
      
      // Copper and Gold colors matching the theme
      gradient.addColorStop(0, `rgba(193, 127, 89, ${0.1 + stop1 * 0.15})`);
      gradient.addColorStop(0.5, `rgba(201, 169, 110, ${0.1 + (1-stop1) * 0.15})`);
      gradient.addColorStop(1, `rgba(193, 127, 89, ${0.1 + stop1 * 0.15})`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = 'rgba(245, 240, 235, 0.2)';
      for(let i = 0; i < 5; i++) {
        const px = (Math.sin(time * 0.02 + i) * 0.5 + 0.5) * canvas.width;
        const py = (Math.cos(time * 0.03 + i) * 0.5 + 0.5) * canvas.height;
        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      
      time++;
      animationFrameId = requestAnimationFrame(drawCanvas);
    };

    drawCanvas();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <button onClick={() => document.getElementById('programs-section')?.scrollIntoView({ behavior: 'smooth' })} className="btn-hero-webgl pointer-events-auto">
      <canvas ref={canvasRef} width="220" height="51" className="absolute inset-0 w-full h-full rounded-full pointer-events-none z-0"></canvas>
      <span className="btn-hero-webgl-text">
        EXPLORE PROGRAMS
        <ArrowRight size={16} />
      </span>
    </button>
  );
};

/* --- RAZORPAY PAYMENT SUCCESS MODAL --- */
interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop with rich blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Card - Charcoal, Parchment & Saffron/Gold Aesthetics */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-[#0F1622] border border-[#8C7A5B]/70 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.8)] p-6 sm:p-10 text-center overflow-hidden z-10"
            role="dialog"
            aria-modal="true"
          >
            {/* Ambient Background Saffron Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-36 bg-[#B84A32]/20 blur-3xl pointer-events-none rounded-full" />
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#D4AF37]/15 blur-3xl pointer-events-none rounded-full" />

            {/* Clean Close Icon Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={20} strokeWidth={2} />
            </button>

            {/* Sacred Icon Badge */}
            <div className="mx-auto w-16 h-16 rounded-full bg-[#18202D] border border-[#D4AF37]/50 flex items-center justify-center mb-5 shadow-inner relative">
              <div className="absolute inset-0 rounded-full bg-[#D4AF37]/10 animate-ping opacity-30 pointer-events-none" />
              <CheckCircle2 size={32} className="text-[#D4AF37]" strokeWidth={1.75} />
            </div>

            {/* Sacred Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#B84A32]/40 bg-[#B84A32]/10 text-[#E87A60] text-[0.65rem] sm:text-xs font-['Lato'] tracking-[0.25em] uppercase font-medium mb-4">
              <span>Sacred Offering Confirmed</span>
            </div>

            {/* Main Heading */}
            <h3 className="font-['Playfair_Display'] font-medium text-2xl sm:text-3xl text-[#FDFBF7] leading-snug mb-4">
              Namaskaram, Thank you for purchasing Guru Paduka Stotram.
            </h3>

            {/* Subtext */}
            <p className="text-zinc-300 font-['Lato'] text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
              Your official payment receipt has been emailed to you by Razorpay. You can watch your recorded masterclass right here:
            </p>

            {/* Prominent Action Button */}
            <div className="flex flex-col gap-3">
              <a
                href="https://www.youtube.com/watch?v=j3KVjUmz3Sk"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#B84A32] via-[#C95B42] to-[#B84A32] hover:brightness-110 text-white font-serif text-sm sm:text-base tracking-[0.16em] uppercase font-medium shadow-[0_10px_30px_rgba(184,74,50,0.35)] hover:shadow-[0_14px_40px_rgba(184,74,50,0.5)] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer group active:scale-[0.98]"
              >
                <Play size={18} fill="currentColor" className="text-white group-hover:scale-110 transition-transform" />
                <span>Watch Masterclass</span>
                <ExternalLink size={15} className="opacity-80 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Dismiss / Return to storefront button */}
              <button
                onClick={onClose}
                className="w-full py-3 px-6 rounded-full border border-zinc-700/80 hover:border-zinc-500 text-zinc-300 hover:text-white text-xs sm:text-sm font-['Lato'] tracking-[0.15em] uppercase transition-colors cursor-pointer mt-1"
              >
                Return to Storefront
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

function App() {
  const [activeTheme, setActiveTheme] = useState('light');
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect return from Razorpay payment
    const searchParams = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(window.location.hash.replace(/^#\/?/, '?'));

    const hasPaymentSuccess =
      searchParams.has('razorpay_payment_id') ||
      searchParams.has('razorpay_payment_link_id') ||
      searchParams.get('razorpay_payment_link_status') === 'paid' ||
      searchParams.get('payment') === 'success' ||
      searchParams.get('payment_status') === 'success' ||
      searchParams.get('status') === 'success' ||
      searchParams.get('paid') === 'true' ||
      searchParams.get('payment_success') === 'true' ||
      searchParams.get('guru_paduka_success') === 'true' ||
      hashParams.has('razorpay_payment_id') ||
      hashParams.get('payment') === 'success';

    if (hasPaymentSuccess) {
      setShowSuccessModal(true);
    }
  }, []);

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    // Clean up payment query parameters from URL without reloading
    if (window.history && window.history.replaceState) {
      const url = new URL(window.location.href);
      url.searchParams.delete('razorpay_payment_id');
      url.searchParams.delete('razorpay_payment_link_id');
      url.searchParams.delete('razorpay_payment_link_status');
      url.searchParams.delete('razorpay_signature');
      url.searchParams.delete('payment');
      url.searchParams.delete('payment_status');
      url.searchParams.delete('status');
      url.searchParams.delete('paid');
      url.searchParams.delete('payment_success');
      url.searchParams.delete('guru_paduka_success');
      const cleanUrl = url.pathname + (url.searchParams.toString() ? '?' + url.searchParams.toString() : '');
      window.history.replaceState({}, document.title, cleanUrl);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -340, behavior: 'smooth' });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 340, behavior: 'smooth' });

  // Smooth Parallax
  const { scrollYProgress } = useScroll();
  const yParallaxHero = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yParallaxFast = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="relative w-full overflow-x-hidden selection:bg-[#B84A32] selection:text-[#FDFBF7] font-['Lato'] font-normal bg-[#FDFBF7] text-zinc-900 flex flex-col">
      
      {/* Navigation (Aperture Style) */}
      <nav className={`fixed top-0 w-full z-50 pointer-events-none transition-all duration-300 flex flex-col ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-sm text-zinc-900 border-b border-zinc-200" 
          : "bg-transparent text-white border-b border-transparent"
      }`}>
        {/* Dark ambient overlay specifically for top state to avoid harsh lines */}
        <div 
          className={`absolute top-0 left-0 w-full h-[35vh] bg-gradient-to-b from-black/90 via-black/40 to-transparent pointer-events-none transition-opacity duration-500 z-[-1] ${
            isScrolled ? "opacity-0" : "opacity-100"
          }`}
        ></div>

        <div className={`w-full px-6 md:px-12 flex justify-between items-center transition-all duration-300 ${
          isScrolled ? "h-16 py-4" : "h-16 md:h-20 mt-4 md:mt-6"
        }`}>
          <a href="#" className={`nav-logo pointer-events-auto font-serif uppercase font-normal tracking-[0.25em] no-underline transition-colors ${
          isScrolled ? "text-zinc-900" : "text-white hover:text-zinc-300"
        }`} style={{ fontFamily: "'Cinzel', serif" }}>
            Nada Sannidhi
        </a>
        <div className="hidden md:flex gap-10 items-center pointer-events-auto">
            <a href="#programs-section" className={`nav-link font-['Lato'] font-medium text-xs tracking-widest transition-all duration-300 ${isScrolled ? "text-zinc-900 hover:text-zinc-500" : "text-white opacity-80 hover:opacity-100 hover:text-zinc-300"}`}>Programs</a>
            <a href="#guide" className={`nav-link font-['Lato'] font-medium text-xs tracking-widest transition-all duration-300 ${isScrolled ? "text-zinc-900 hover:text-zinc-500" : "text-white opacity-80 hover:opacity-100 hover:text-zinc-300"}`}>Guide</a>
            <a href="#reflections" className={`nav-link font-['Lato'] font-medium text-xs tracking-widest transition-all duration-300 ${isScrolled ? "text-zinc-900 hover:text-zinc-500" : "text-white opacity-80 hover:opacity-100 hover:text-zinc-300"}`}>Sharings</a>
            <a href="https://wa.me/919790778251" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 rounded-full px-6 py-2 transition-colors duration-300 text-xs font-['Lato'] font-medium tracking-widest uppercase pointer-events-auto ${
              isScrolled 
                ? "bg-zinc-900 text-white hover:bg-zinc-800 border border-zinc-900" 
                : "border border-white hover:bg-white text-white hover:text-black"
            }`}>
              <span>Begin Here</span>
              <ArrowRight size={16} />
            </a>
        </div>
        </div>
      </nav>

      {/* --- ROOM 1: HERO / INITIATION --- */}
      <ThemeSection id="arrival" bgClass="bg-[#0B0A09]" theme="dark" setActiveTheme={setActiveTheme}>
        <div className="min-h-[100svh] w-full relative overflow-hidden flex items-center justify-center">
          {/* Main Hero Background Pillar Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-1000"
            style={{ backgroundImage: `url(${pillarImg})` }}
          />

          {/* Atmospheric gradient overlay: keeping the center and pillar clear and rich */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/60 z-0 pointer-events-none"></div>
          {/* Subtle radial shadow to frame the cutout text against the background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black/55 via-black/20 to-transparent z-0 pointer-events-none"></div>
          <div className="mandala-mask z-0 opacity-15"></div>

          <motion.div style={{ y: yParallaxHero, opacity: opacityFade }} className="relative z-10 flex flex-col items-center justify-center text-center px-4 text-white max-w-5xl mx-auto pt-6 md:pt-8">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="leading-none md:leading-tight font-serif uppercase text-center select-none mb-5 md:mb-7"
            >
              {/* Option 2: Warm Antique Gold / Copper Foil Gradient */}
              <span className="block text-5xl md:text-7xl lg:text-[6.5rem] font-normal tracking-[0.14em] bg-gradient-to-r from-[#FBF2E3] via-[#E4C87F] to-[#D4A359] bg-clip-text text-transparent drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)] drop-shadow-[0_0_35px_rgba(228,200,127,0.35)]">
                NADA
              </span>
              <span className="block text-6xl md:text-8xl lg:text-[8rem] font-bold tracking-tight bg-gradient-to-r from-[#FCE8B8] via-[#E5B563] to-[#C97B32] bg-clip-text text-transparent drop-shadow-[0_6px_30px_rgba(0,0,0,0.95)] drop-shadow-[0_0_50px_rgba(201,123,50,0.45)]">
                SANNIDHI
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-base md:text-xl lg:text-2xl font-extralight tracking-[0.08em] md:tracking-[0.12em] uppercase text-center text-[#F2EBE1]/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] mb-8 md:mb-11"
            >
              Offering Sacred Chants and Classical Music
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.9, ease: "easeOut" }}
            >
              <HeroButton />
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3, delay: 1.5 }}
            className="absolute bottom-12 right-6 md:right-12 flex flex-col items-center gap-4 z-20"
          >
              <span className="font-['Lato'] font-medium text-xs tracking-widest uppercase text-white [writing-mode:vertical-lr] rotate-180">Scroll</span>
              <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full bg-[#B84A32] scroll-line-anim"></div>
              </div>
          </motion.div>

        </div>
      </ThemeSection>

      {/* Marquee Banner */}
      <div className="w-full bg-[#F3EFEA] border-y border-zinc-200 py-5 overflow-hidden flex whitespace-nowrap relative z-10">
          <div className="flex w-max animate-marquee text-sm font-['Lato'] tracking-[0.2em] uppercase font-medium text-[#B84A32] items-center px-6">
              {[...Array(2)].map((_, i) => (
                <React.Fragment key={i}>
                  {MARQUEE_TEXT.map((text, j) => (
                    <React.Fragment key={`${i}-${j}`}>
                      <span className="mr-12">{text}</span>
                      <span className="text-[#B84A32]/80 mr-12 text-xs">◇</span>
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
          </div>
      </div>

      {/* --- ROOM 2: OUR APPROACH --- */}
      <ThemeSection 
        id="philosophy" 
        bgClass="relative z-20 overflow-hidden" 
        theme="light" 
        setActiveTheme={setActiveTheme}
      >
        {/* Layer 1: The Dark Grey Wedge below Texture-white.jpg with original approved angle, shifted left and up */}
        <div 
          className="absolute inset-0 bg-[#1A1E21] z-0 pointer-events-none"
          style={{
            clipPath: 'polygon(0 calc(100% - 6.5rem), calc(50% + 3rem) calc(100% - 2.5rem), 0 100%)',
            WebkitClipPath: 'polygon(0 calc(100% - 6.5rem), calc(50% + 3rem) calc(100% - 2.5rem), 0 100%)',
            transform: 'translate(-4rem, -2rem)',
          }}
          aria-hidden="true"
        />

        {/* Layer 2: Texture-white.jpg on top, coming down from left to right */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{
            backgroundImage: `url(${import.meta.env.BASE_URL}Texture-white.jpg)`,
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 5.5rem))',
            WebkitClipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 5.5rem))',
          }}
          aria-hidden="true"
        />

        <div className="w-full relative z-10 pb-44 md:pb-72">
          
          {/* Transition Wrapper */}
          <div className="relative w-full">
            {/* Black Transition Layer: slopes continuously downward from right to left in the same line of the blue border */}
            <div 
              className="absolute inset-0 bg-black z-0 pointer-events-none"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 82%, 0% 100%)',
                WebkitClipPath: 'polygon(0 0, 100% 0, 100% 82%, 0% 100%)',
              }}
              aria-hidden="true"
            />

            {/* Main Blue Navy Tanpura Section: goes down in middle then up to left */}
            <div 
              className="bg-[#0B1320] w-full pt-20 md:pt-28 pb-56 md:pb-72 px-4 relative overflow-hidden z-10"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 82%, 28% 95%, 0 84%)',
                WebkitClipPath: 'polygon(0 0, 100% 0, 100% 82%, 28% 95%, 0 84%)',
              }}
            >
              {/* Tanpura Background Watermark */}
              <div 
                className="absolute inset-0 pointer-events-none z-0 overflow-hidden" 
                aria-hidden="true"
              >
                <div 
                  className="w-full h-full bg-cover bg-no-repeat bg-right mix-blend-luminosity translate-x-8 sm:translate-x-16 md:translate-x-24 translate-y-6 sm:translate-y-10 md:translate-y-14"
                  style={{
                    backgroundImage: `url(${import.meta.env.BASE_URL}Tanpura.jpg)`,
                    WebkitMaskImage: 'radial-gradient(ellipse at 88% 55%, black 25%, transparent 68%)',
                    maskImage: 'radial-gradient(ellipse at 88% 55%, black 25%, transparent 68%)',
                  }}
                />
              </div>

              <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <FadeIn className="text-left max-w-3xl">
                    {/* Eyebrow header removed for cleaner, more minimalist flow */}
                    <h2 className="font-serif uppercase tracking-wide text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight md:leading-none select-none">
                      <span className="font-normal tracking-[0.08em] text-[#FDFBF7]">Sound as a</span> <br/> 
                      <span className="font-bold tracking-tight text-white">
                        Doorway to <span className="bg-gradient-to-r from-[#FCE8B8] via-[#E5B563] to-[#C97B32] bg-clip-text text-transparent">Self-Transformation</span>
                      </span>
                    </h2>
                    <p className="font-['Lato'] font-light text-base md:text-xl mt-6 text-zinc-300 leading-relaxed max-w-2xl">
                      Nada Sannidhi brings traditional chanting and classical music out of performance halls and into your daily life. Designed for every seeker, these art forms are offered not merely to be learned, but to be lived—turning sound into a passage toward inner stillness.
                    </p>
                </FadeIn>
              </div>
            </div>
          </div>

          <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 -mt-52 sm:-mt-60 md:-mt-64">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
               {[
                 {
                   title: "A JOYFUL EXPLORATION",
                   desc: "No prior experience is needed to begin. Whether you are just starting out or looking to deepen your practice, we make exploring classical chanting and music simple, enjoyable, and rewarding for all skill levels.",
                   img: `${import.meta.env.BASE_URL}joyful-exploration.jpg`
                 },
                 {
                   title: "TRANSFORMATIVE FOR BODY & MIND",
                   desc: "Beyond simply learning a skill, these timeless practices offer a profound sense of inner balance. Experience true stress reduction, cultural enrichment, and a natural blossoming of your physical and mental well-being.",
                   img: `${import.meta.env.BASE_URL}transformative-body-mind.jpg`
                 },
                 {
                   title: "ROOTED IN LIVING TRADITION",
                   desc: "Learn through intimate, interactive sessions anchored in authentic classical lineages. As dedicated practitioners of the art, we don’t just teach technique—we nurture your connection to the living essence of the practice.",
                   img: `${import.meta.env.BASE_URL}guru-shishya-roots.jpg`
                 }
               ].map((item, index) => (
                  <div 
                     key={index}
                     onMouseEnter={() => setHoveredCard(index)}
                     onMouseLeave={() => setHoveredCard(null)}
                     className={`relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.45)] h-[420px] md:h-[520px] cursor-pointer transition-all duration-500 bg-zinc-950
                       ${hoveredCard !== null && hoveredCard !== index ? 'grayscale opacity-50 scale-[0.98]' : 'scale-100'}`
                     }
                  >
                     <img 
                        src={item.img} 
                        alt={item.title} 
                        className={`absolute inset-0 object-cover w-full h-full transition-transform duration-700 ${hoveredCard === index ? 'scale-110' : 'scale-100'}`} 
                     />
                     {/* Dark luxury gradient overlays for crisp readability */}
                     <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none z-10 transition-opacity duration-500"></div>
                     <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none z-20"></div>
                     
                     <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 flex flex-col justify-end">
                         <h3 className={`text-white font-serif uppercase tracking-wider font-semibold text-lg md:text-xl transition-all duration-500 transform text-left drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] ${hoveredCard === index ? 'translate-y-0 text-white' : 'translate-y-6 md:translate-y-10'}`}>
                           {item.title}
                         </h3>
                         <div className={`mt-3 overflow-hidden transition-all duration-500 ${hoveredCard === index ? 'opacity-100 max-h-48' : 'opacity-0 max-h-0'}`}>
                             <p className="text-zinc-300 font-['Lato'] font-normal text-sm md:text-base leading-relaxed text-left drop-shadow-sm">
                               {item.desc}
                             </p>
                         </div>
                     </div>
                  </div>
               ))}
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* --- ROOM 3: INTAKE (OFFERINGS) --- */}
      <ThemeSection id="programs-section" bgClass="bg-[#F3EFEA] text-zinc-900 relative z-10 -mt-12 md:-mt-16 pt-12 md:pt-16" theme="light" setActiveTheme={setActiveTheme}>
        <div className="mandala-mask z-0 opacity-5"></div>
        
        {/* Option 1: Gentle Continuous Auto-Scroll (Infinite Ambient Marquee) */}
        <ChantMarqueeSection />

        <div className="pt-8 md:pt-16 pb-24 w-full px-[8vw] md:px-[10vw] relative z-10">
          {/* Carnatic Vocals Pillar */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-16 md:gap-24 mt-12 md:mt-20">
             <motion.div style={{ y: yParallaxFast }} className="w-full md:w-1/2 relative">
                <div className="w-full aspect-[4/5] bg-[#FDFBF7] artifact-mask relative overflow-hidden group">
                   <div className="absolute inset-0 bg-noise opacity-30 mix-blend-multiply z-20 transition-opacity duration-[2s] group-hover:opacity-40"></div>
                   <img src={`${import.meta.env.BASE_URL}string.jpeg`} alt="Carnatic Music" className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-[3s] group-hover:scale-105 opacity-90" />
                   <div className="absolute inset-0 flex items-center justify-center z-10 transition-opacity duration-[2s] group-hover:opacity-0">
                     <Volume2 size={40} strokeWidth={0.5} className="text-zinc-900/50" />
                   </div>
                </div>
             </motion.div>
             <div className="w-full md:w-1/2 flex flex-col justify-center">
               <FadeIn>
                 <SectionLabel text="◇ THE CLASSICAL FOUNDATION ◇" color="text-[#B84A32] opacity-90" />
                 <ScrollParallax>
                   <h2 className="font-['Playfair_Display'] font-medium text-4xl md:text-5xl text-zinc-900 leading-tight">
                      Carnatic Vocals
                   </h2>
                 </ScrollParallax>
                 <p className="mt-10 text-zinc-900 text-base md:text-lg font-normal leading-relaxed mb-4">
                   Born from a profound understanding of life and creation, Carnatic music serves as a powerful vehicle to reach one's ultimate nature. Transforming both the practitioner and the listener—an impact now echoed by modern science—it aligns the human system and brings absolute stillness to the seeker.
                 </p>
                 <p className="text-zinc-900 text-base md:text-lg font-normal leading-relaxed mb-10">
                   This journey requires no prior experience. Whether you are taking your very first step or looking to deepen an existing practice, our highly interactive live online sessions make learning this ancient discipline accessible, engaging, and profoundly rewarding.
                 </p>
                 <a href="https://wa.me/919790778251" target="_blank" rel="noopener noreferrer" className="inline-flex w-max items-center gap-2 rounded-full px-8 py-3 bg-zinc-900 hover:bg-zinc-800 transition-all duration-300 text-xs font-['Lato'] font-medium tracking-widest uppercase text-white">
                   <span>Inquire for Carnatic</span>
                   <ArrowRight size={14} className="ml-2" />
                 </a>
               </FadeIn>
             </div>
          </div>
        </div>
      </ThemeSection>

      {/* --- ROOM 4: THE GUIDE (LINEAGE) --- */}
      <ThemeSection id="guide" bgClass="bg-[#FDFBF7] text-zinc-900 relative" theme="light" setActiveTheme={setActiveTheme}>
        <div className="mandala-mask z-0 opacity-5"></div>
        <div className="py-24 md:py-32 w-full px-[8vw] md:px-[10vw] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            <FadeIn className="lg:col-span-5 relative">
              <div className="w-full aspect-[3/4] relative overflow-hidden flex items-center justify-center p-4">
                <div className="absolute inset-0 border border-[#B84A32] translate-x-4 translate-y-4 md:translate-x-6 md:translate-y-6 z-0 mix-blend-multiply opacity-20"></div>
            <img src={anandImg} alt="Anand Sreenivasan" className="relative z-10 w-full h-full object-cover transition-transform duration-[3s] hover:scale-105" />
              </div>
            </FadeIn>
            
            <div className="lg:col-span-7 flex flex-col justify-center">
              <FadeIn>
                <SectionLabel text="The Founder" color="text-[#B84A32] opacity-90" />
                <ScrollParallax>
                  <h2 className="font-['Playfair_Display'] font-medium tracking-wide text-4xl md:text-5xl lg:text-6xl text-zinc-900">
                    Anand <em className="text-gradient not-italic">Sreenivasan</em>
                  </h2>
                </ScrollParallax>
                
                <p className="mt-10 text-lg md:text-xl text-zinc-900 italic mb-10 leading-relaxed font-normal border-l-2 border-[#B84A32] pl-6 py-2">
                  "This is not just an art form; <br/>it is a profound tool to discover one's inner balance."
                </p>
                
                <div className="space-y-6 text-zinc-900 text-base md:text-lg font-normal leading-relaxed max-w-2xl mb-12">
                  <p>
                    Nurtured through over a decade of immersion at Isha Samskriti and serving as a vocalist with Sounds of Isha, Anand offers a pure, traditional transmission. By treating the classical arts not as entertainment, but as a profound science and a path to devotion, this approach naturally opens the doors to inner stillness and boundless joy.
                  </p>
                </div>
                
                <div className="flex items-center gap-10 border-t border-zinc-200 pt-10">
                  <div>
                    <div className="text-4xl font-['Playfair_Display'] font-semibold italic text-zinc-900 mb-2">10+</div>
                    <div className="font-['Lato'] font-medium text-[0.6rem] tracking-[0.2em] uppercase text-[#B84A32] font-semibold">Years Depth</div>
                  </div>
                  <div>
                    <div className="text-4xl font-['Playfair_Display'] font-semibold italic text-zinc-900 mb-2">100%</div>
                    <div className="font-['Lato'] font-medium text-[0.6rem] tracking-[0.2em] uppercase text-[#B84A32] font-semibold">Lineage</div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* --- ROOM 6: REFLECTIONS MASONRY --- */}
      <ThemeSection id="reflections" bgClass="bg-[#FDFBF7] text-zinc-900 relative" theme="light" setActiveTheme={setActiveTheme}>
        <div className="pt-12 pb-24 md:pb-32 w-full flex flex-col border-t border-zinc-200">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
            <SectionLabel text="Reflections" color="text-[#B84A32] opacity-90" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto mt-10 px-4 md:px-8">
             {REFLECTIONS.slice(0, 4).map((ref, idx) => (
                <div key={idx} className="relative overflow-hidden p-10 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100 rounded-2xl flex flex-col justify-between transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_16px_40px_rgb(0,0,0,0.08)] hover:border-[#B84A32]/40">
                   <span className="absolute -top-4 right-6 text-[12rem] text-zinc-100 font-['Playfair_Display'] leading-none select-none">"</span>
                   <p className="relative z-10 text-zinc-900 text-base md:text-lg font-normal leading-relaxed mb-10">
                     {ref.text}
                   </p>
                   <div>
                     <hr className="w-12 border-[#B84A32]/40 mb-4" />
                     <div className="text-[#B84A32] font-['Lato'] font-semibold tracking-widest text-sm uppercase">
                        {ref.author}
                     </div>
                   </div>
                </div>
             ))}
          </div>
        </div>
      </ThemeSection>

      {/* --- ROOM 7: DEPARTURE --- */}
      <ThemeSection id="departure" bgClass="bg-[#F3EFEA] text-zinc-900 relative" theme="light" setActiveTheme={setActiveTheme}>
        <div className="mandala-mask z-0 opacity-5"></div>
        <div className="py-24 md:py-32 w-full flex flex-col items-center justify-center text-center px-[8vw] md:px-[10vw] relative z-10 border-t border-zinc-200">
           <FadeIn className="flex flex-col items-center">
             <Flower2 size={32} strokeWidth={1} className="text-[#B84A32]/50 mx-auto mb-12" />
             <h2 className="text-5xl md:text-[5rem] lg:text-[6rem] font-['Playfair_Display'] italic font-medium leading-[1.1] mb-12 max-w-4xl tracking-normal text-zinc-900">
               Step into a space of inner harmony.
             </h2>
             <p className="text-zinc-900 text-base md:text-lg font-normal max-w-xl mx-auto mb-16">
               Connect with us to find the precise pathway for your current depth of seeking.
             </p>
             <a 
               href="https://wa.me/919790778251" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="inline-flex w-max items-center gap-4 rounded-full px-8 py-3 bg-zinc-900 hover:bg-zinc-800 transition-all duration-300 text-xs font-['Lato'] tracking-[0.4em] uppercase text-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
             >
               <span className="font-medium relative z-10">Connect With Us</span>
               <ArrowRight size={16} className="relative z-10" />
             </a>
           </FadeIn>
        </div>
        <footer className="w-full text-center py-12 text-[0.6rem] uppercase tracking-[0.4em] text-zinc-400 border-t border-zinc-200">
            NADA SANNIDHI &nbsp; | &nbsp; {new Date().getFullYear()}
        </footer>
      </ThemeSection>

      {/* FLOATING ACTION */}
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 2 }}
          className="fixed bottom-6 md:bottom-8 right-6 md:right-8 z-50 transition-colors duration-1000 text-zinc-900 hover:text-[#B84A32]"
        >
          <a 
            href="https://wa.me/919790778251" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full backdrop-blur-xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-zinc-200 hover:scale-110 transition-all duration-500 hover:shadow-[0_16px_40px_rgb(0,0,0,0.15)]"
          >
             <Sparkles size={20} strokeWidth={1.5} className="mr-0.5" />
          </a>
        </motion.div>
      </AnimatePresence>

      {/* RAZORPAY PAYMENT SUCCESS MODAL */}
      <PaymentSuccessModal isOpen={showSuccessModal} onClose={handleCloseModal} />

    </div>
  );
}

// Wrapper to handle beautiful theme transitions on scroll
const ThemeSection = ({ id, bgClass, theme, children, setActiveTheme, style }: { id: string, bgClass: string, theme: string, children: React.ReactNode, setActiveTheme: any, style?: React.CSSProperties }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) {
      setActiveTheme(theme);
    }
  }, [inView, theme, setActiveTheme]);

  return (
    <section ref={ref} id={id} className={`w-full relative transition-colors duration-[1.5s] ease-in-out ${bgClass}`} style={style}>
      {children}
    </section>
  );
};

export default App;
