import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'motion/react';
import { 
  Flower2, Waves, Circle, Feather, ArrowRight, Sparkles, Volume2, Droplet
} from 'lucide-react';

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
  <div className="flex items-center gap-4 mb-10 w-full">
    <div className={`h-[1px] w-8 md:w-16 bg-current opacity-30 ${color}`}></div>
    <div className={`w-1.5 h-1.5 rotate-45 border border-current opacity-60 ${color}`}></div>
    <span className={`text-[0.65rem] uppercase tracking-[0.4em] font-medium ${color}`}>
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
    <a href="#philosophy" className="btn-hero-webgl pointer-events-auto">
      <canvas ref={canvasRef} width="220" height="51" className="absolute inset-0 w-full h-full rounded-full pointer-events-none z-0"></canvas>
      <span className="btn-hero-webgl-text">
        Enter The Practice
        <ArrowRight size={16} />
      </span>
    </a>
  );
};

function App() {
  const [activeTheme, setActiveTheme] = useState('light');

  // Smooth Parallax
  const { scrollYProgress } = useScroll();
  const yParallaxHero = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yParallaxFast = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="relative w-full overflow-x-hidden selection:bg-turmeric selection:text-charcoal-base font-sans font-light bg-linen text-ink flex flex-col">
      
      {/* Navigation (Aperture Style) */}
      <nav className="fixed top-0 w-full z-50 px-6 py-8 md:px-12 flex justify-between items-center pointer-events-none mix-blend-difference text-white">
        <a href="#" className="nav-logo pointer-events-auto">
            Nada Sannidhi
        </a>
        <div className="hidden md:flex gap-10 items-center pointer-events-auto">
            <a href="#philosophy" className="nav-link font-sans-cond text-xs tracking-widest">Methodology</a>
            <a href="#guide" className="nav-link font-sans-cond text-xs tracking-widest">Founder</a>
            <a href="#paths" className="nav-link font-sans-cond text-xs tracking-widest">Paths</a>
            <a href="#offerings" className="nav-link font-sans-cond text-xs tracking-widest">Curriculum</a>
            <a href="https://wa.me/919790778251" target="_blank" rel="noopener noreferrer" className="nav-cta">
              <i className="nav-cta-shimmer"></i><span>Contact</span>
            </a>
        </div>
      </nav>

      {/* --- ROOM 1: HERO / INITIATION --- */}
      <ThemeSection id="arrival" bgClass="bg-charcoal-deep text-ash" theme="dark" setActiveTheme={setActiveTheme}>
        <div className="min-h-[100svh] w-full relative overflow-hidden bg-charcoal-deep">
          <div className="mandala-mask z-0 mix-blend-color-dodge"></div>
          
          <div className="absolute inset-0 z-0">
            <img src="/pillar.jpeg" alt="Master the geometry" className="w-full h-full object-cover opacity-40 animate-ken-burns" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep via-charcoal-deep/50 to-transparent"></div>
            <div className="absolute inset-0 bg-charcoal-deep/50"></div>
          </div>

          <motion.div style={{ y: yParallaxHero, opacity: opacityFade }} className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="md:text-[6rem] lg:text-[8rem] leading-none text-5xl text-ash tracking-tight font-serif uppercase mb-6"
            >
              Discover the Essence <br className="hidden md:block" /> 
              <span className="font-serif italic font-light text-gradient transform -translate-y-4 inline-block lowercase text-[1.2em]">of Pure Sound</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 3, delay: 1, ease: "easeOut" }}
              className="mt-8 font-sans-cond text-xs md:text-sm tracking-[0.3em] uppercase text-ash/80 flex items-center gap-4"
            >
              <span className="w-8 h-[1px] bg-turmeric"></span>
              A Curated Sanctuary
              <span className="w-8 h-[1px] bg-turmeric"></span>
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }}
              className="mt-12"
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
              <span className="font-sans-cond text-xs tracking-widest uppercase text-ash/60 [writing-mode:vertical-lr] rotate-180">Scroll</span>
              <div className="w-[1px] h-16 bg-ash/20 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full bg-turmeric scroll-line-anim"></div>
              </div>
          </motion.div>

        </div>
      </ThemeSection>

      {/* Marquee Banner */}
      <div className="w-full bg-charcoal-deep border-y border-charcoal-base py-5 overflow-hidden flex whitespace-nowrap relative z-10">
          <div className="flex w-max animate-marquee font-sans-cond text-lg md:text-xl tracking-[0.2em] uppercase text-sandalwood font-medium items-center px-6">
              {[...Array(2)].map((_, i) => (
                <React.Fragment key={i}>
                  <span className="mr-12">Classical Vocal</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-turmeric mr-12"></span>
                  <span className="mr-12">Vedic Chanting</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-turmeric mr-12"></span>
                  <span className="mr-12">Inner Balance</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-turmeric mr-12"></span>
                  <span className="mr-12">Traditional Roots</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-turmeric mr-12"></span>
                  <span className="mr-12">Pure Transmission</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-turmeric mr-12"></span>
                </React.Fragment>
              ))}
          </div>
      </div>

      {/* --- ROOM 2: THE PHILOSOPHY (PREVIOUSLY DILEMMA) --- */}
      <ThemeSection id="philosophy" bgClass="bg-linen text-ink" theme="light" setActiveTheme={setActiveTheme}>
        <div className="min-h-[80svh] w-full py-40 px-[8vw] md:px-[10vw] flex flex-col justify-center relative z-10">
           <FadeIn className="max-w-7xl mx-auto w-full">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12">
               <div className="max-w-2xl">
                 <SectionLabel text="Our Approach" color="text-turmeric opacity-90" />
                 <ScrollParallax>
                   <h2 className="font-serif text-4xl md:text-5xl lg:text-[4rem] leading-tight text-ink font-light">
                      The arts should naturally cultivate <em className="text-gradient not-italic">joy</em>, <br/>not just another layer of performance.
                   </h2>
                 </ScrollParallax>
               </div>
               <p className="max-w-sm text-ink/70 text-sm md:text-base leading-relaxed font-light">
                 By grounding ourselves in unbroken classical traditions, we replace the stress of performance with a profound sense of inner balance and peace.
               </p>
             </div>
           </FadeIn>

           <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16 max-w-7xl mx-auto w-full border-t border-ink/10 pt-16">
              {[
                { title: "Clear Tradition", desc: "We offer the classical arts as they were meant to be – profound tools for inner well-being and balance." },
                { title: "Inner Focus", desc: "Whether in chanting or classical music, the goal is not merely the outside expression, but the deep stillness it creates within you." },
                { title: "Rooted Learning", desc: "Deeply rooted in the transmission of Isha Samskriti. Free from modern dilution, offering a pure, joyful experience." }
              ].map((item, i) => (
                 <StaggerItem key={i}>
                    <div className="flex flex-col items-start text-ink">
                      <span className="text-[0.65rem] tracking-[0.3em] font-sans text-turmeric mb-4 block font-semibold">0{i+1}</span>
                      <h3 className="font-serif text-2xl mb-4 text-ink font-medium">{item.title}</h3>
                      <p className="font-light text-[0.95rem] leading-relaxed opacity-70 tracking-wide">{item.desc}</p>
                    </div>
                 </StaggerItem>
              ))}
           </StaggerChildren>
        </div>
      </ThemeSection>

      {/* --- ROOM 3: THE GUIDE (LINEAGE) --- */}
      <ThemeSection id="guide" bgClass="bg-charcoal-base text-ash relative" theme="dark" setActiveTheme={setActiveTheme}>
        <div className="mandala-mask z-0 opacity-10"></div>
        <div className="py-24 md:py-40 w-full px-[8vw] md:px-[10vw] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            <FadeIn className="lg:col-span-5 relative">
              <div className="w-full aspect-[3/4] relative overflow-hidden flex items-center justify-center p-4">
                <div className="absolute inset-0 border border-turmeric translate-x-4 translate-y-4 md:translate-x-6 md:translate-y-6 z-0 mix-blend-multiply opacity-50"></div>
            <img src="/anand.jpeg" alt="Anand Sreenivasan" className="relative z-10 w-full h-full object-cover transition-transform duration-[3s] hover:scale-105" />
              </div>
            </FadeIn>
            
            <div className="lg:col-span-7 flex flex-col justify-center">
              <FadeIn>
                <SectionLabel text="The Founder" color="text-turmeric opacity-90" />
                <ScrollParallax>
                  <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8 text-ash">
                    Anand <em className="text-gradient not-italic">Sreenivasan</em>
                  </h2>
                </ScrollParallax>
                
                <p className="text-[1.2rem] text-ash/80 italic mb-10 leading-relaxed font-light border-l-2 border-turmeric pl-6 py-2">
                  "This is not just an art form; <br/>it is a profound tool to discover one's inner balance."
                </p>
                
                <div className="space-y-6 text-ash/70 text-[1rem] font-light leading-relaxed max-w-2xl mb-12">
                  <p>
                    Nurtured through over a decade of immersion at Isha Samskriti and serving as a vocalist with Sounds of Isha, Anand offers a pure, traditional transmission. By treating the classical arts not as entertainment, but as a profound science and a path to devotion, this approach naturally opens the doors to inner stillness and boundless joy.
                  </p>
                </div>
                
                <div className="flex items-center gap-10 border-t border-ash/10 pt-10">
                  <div>
                    <div className="text-4xl font-serif italic text-ash mb-2">10+</div>
                    <div className="font-sans-cond text-[0.6rem] tracking-[0.2em] uppercase text-turmeric font-semibold">Years Depth</div>
                  </div>
                  <div>
                    <div className="text-4xl font-serif italic text-ash mb-2">100%</div>
                    <div className="font-sans-cond text-[0.6rem] tracking-[0.2em] uppercase text-turmeric font-semibold">Lineage</div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* --- ROOM 4: THE PATHS --- */}
      <ThemeSection id="paths" bgClass="bg-linen-deep text-ink" theme="light" setActiveTheme={setActiveTheme}>
        <div className="w-full py-40 px-[8vw] md:px-[10vw]">
          
          {/* Path 1: Chanting */}
          <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24 mb-40">
             <motion.div style={{ y: yParallaxFast }} className="w-full md:w-1/2 relative">
                <div className="w-full aspect-[4/5] bg-charcoal-base/5 artifact-mask relative overflow-hidden group">
                   <div className="absolute inset-0 bg-noise opacity-30 mix-blend-multiply z-20 transition-opacity duration-[2s] group-hover:opacity-40"></div>
                   <img src="/string.jpeg" referrerPolicy="no-referrer" alt="Architecture of Sound" className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-[3s] group-hover:scale-105 opacity-90" />
                   <div className="absolute inset-0 flex items-center justify-center z-10 transition-opacity duration-[2s] group-hover:opacity-0">
                     <Volume2 size={40} strokeWidth={0.5} className="text-charcoal-deep/50" />
                   </div>
                </div>
             </motion.div>
             <div className="w-full md:w-1/2 flex flex-col justify-center">
               <FadeIn>
                 <SectionLabel text="First Path" color="text-turmeric opacity-90" />
                 <ScrollParallax>
                   <h2 className="font-serif italic text-5xl md:text-6xl mb-8 text-ink leading-tight">
                      Vedic <br/><span className="text-3xl lg:text-4xl tracking-[0.2em] font-sans-cond font-light not-italic uppercase mt-4 block text-ink/80">Chanting</span>
                   </h2>
                 </ScrollParallax>
                 <p className="text-[1.1rem] font-light text-ink/80 leading-relaxed mb-6">
                   Align your system through the profound power of pure sound. We approach chanting as a deeply grounding practice for inner balance.
                 </p>
                 <p className="text-[1.1rem] font-light text-ink/80 leading-relaxed mb-10">
                   By experiencing the right use of breath and exact pronunciation, you naturally guide the mind into a beautiful stillness.
                 </p>
                 <div className="flex items-center gap-6 border-t border-ink/10 pt-8">
                   <div className="text-xs uppercase tracking-widest text-ink/60 font-sans-cond">Mantra Science</div>
                   <div className="w-1 h-1 rounded-full bg-turmeric"></div>
                   <div className="text-xs uppercase tracking-widest text-ink/60 font-sans-cond">Pronunciation</div>
                 </div>
               </FadeIn>
             </div>
          </div>

          {/* Path 2: Carnatic Music */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-16 md:gap-24">
             <motion.div style={{ y: yParallaxFast }} className="w-full md:w-1/2 relative">
                <div className="w-full aspect-[4/5] bg-charcoal-base/5 artifact-mask relative overflow-hidden group">
                   <div className="absolute inset-0 bg-noise opacity-30 mix-blend-multiply z-20 transition-opacity duration-[2s] group-hover:opacity-40"></div>
                   <img src="/pillar.jpeg" alt="Carnatic Music" className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-[3s] group-hover:scale-105 opacity-90" />
                   <div className="absolute inset-0 flex items-center justify-center z-10 transition-opacity duration-[2s] group-hover:opacity-0">
                     <Volume2 size={40} strokeWidth={0.5} className="text-charcoal-deep/50" />
                   </div>
                </div>
             </motion.div>
             <div className="w-full md:w-1/2 flex flex-col justify-center">
               <FadeIn>
                 <SectionLabel text="Second Path" color="text-turmeric opacity-90" />
                 <ScrollParallax>
                   <h2 className="font-serif italic text-5xl md:text-6xl mb-8 text-ink leading-tight">
                      Carnatic <br/><span className="text-3xl lg:text-4xl tracking-[0.2em] font-sans-cond font-light not-italic uppercase mt-4 block text-ink/80">Music</span>
                   </h2>
                 </ScrollParallax>
                 <p className="text-[1.1rem] font-light text-ink/80 leading-relaxed mb-6">
                   Explore the profound depth of Indian classical music. Learn to weave melody and rhythm in a way that naturally balances the inner geometry.
                 </p>
                 <p className="text-[1.1rem] font-light text-ink/80 leading-relaxed mb-10">
                   Vocal music becomes a pleasant tool for your internal state, teaching the joy of sound flow and deep focus without effort.
                 </p>
                 <div className="flex items-center gap-6 border-t border-ink/10 pt-8">
                   <div className="text-xs uppercase tracking-widest text-ink/60 font-sans-cond">Classical Melodies</div>
                   <div className="w-1 h-1 rounded-full bg-turmeric"></div>
                   <div className="text-xs uppercase tracking-widest text-ink/60 font-sans-cond">Joyful Harmony</div>
                 </div>
               </FadeIn>
             </div>
          </div>

        </div>
      </ThemeSection>

      {/* --- ROOM 5: INTAKE (OFFERINGS) --- */}
      <ThemeSection id="offerings" bgClass="bg-charcoal-base text-ash relative" theme="dark" setActiveTheme={setActiveTheme}>
        <div className="mandala-mask z-0 opacity-10"></div>
        <div className="py-40 w-full px-[8vw] md:px-[10vw] relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8 border-b border-ash/10 pb-12">
             <div className="max-w-2xl">
               <SectionLabel text="Programs & Offerings" color="text-turmeric opacity-80" />
               <ScrollParallax>
                 <h2 className="font-serif font-light text-4xl md:text-5xl text-ash leading-tight">
                   Begin Your <em className="text-gradient">Journey</em>
                 </h2>
               </ScrollParallax>
             </div>
             <p className="max-w-[300px] text-sm text-ash/60 font-light leading-relaxed">
               Carefully crafted online sessions designed to match your pace, from supportive group formats to personalized guidance.
             </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
            {/* Tier 1 */}
            <FadeIn delay={0.1} className="w-full">
              <div className="group h-full bg-[#151413] hover:bg-[#1D1B1A] border border-turmeric/10 hover:border-turmeric/30 transition-all duration-700 p-2 flex flex-col cursor-pointer relative overflow-hidden">
                <div className="border border-turmeric/20 group-hover:border-turmeric/50 h-full w-full rounded-sm p-8 relative flex flex-col transition-colors duration-700">
                  <div className="absolute inset-0 bg-[url('/pillar.jpeg')] bg-cover bg-center opacity-10 mix-blend-screen transition-opacity duration-700 group-hover:opacity-20" />
                  <div className="absolute top-0 right-0 w-32 h-32 bg-turmeric/5 rounded-full filter blur-[40px] group-hover:bg-turmeric/10 transition-colors duration-700"></div>
                  
                  {/* Ornate corner pieces */}
                  <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-turmeric/40"></div>
                  <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-turmeric/40"></div>
                  <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-turmeric/40"></div>
                  <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-turmeric/40"></div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="text-[0.65rem] font-sans uppercase tracking-[0.3em] text-turmeric mb-4 font-semibold">Foundation</div>
                    <h3 className="text-3xl font-serif text-ash mb-6">Vedic Chanting</h3>
                    <div className="text-ash/60 text-sm tracking-wide leading-[1.8] flex-grow mb-12 flex flex-col gap-4">
                      <p>Systematic group sessions exploring the science of mantras. Build a supportive daily practice over several weeks.</p>
                      <div className="border-t border-turmeric/20 pt-4 mt-2">
                        <p className="text-turmeric text-[0.65rem] font-semibold uppercase tracking-widest mb-3">Current Offerings:</p>
                        <ul className="list-disc list-inside space-y-2 text-xs opacity-80">
                          <li>Chant 1</li>
                          <li>Chant 2</li>
                          <li>Chant 3</li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-center text-xs uppercase tracking-widest text-turmeric mt-auto opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-1">
                      View Details <ArrowRight size={14} className="ml-2" />
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Tier 2 */}
            <FadeIn delay={0.2} className="w-full">
              <div className="group h-full bg-[#151413] hover:bg-[#1D1B1A] border border-turmeric/10 hover:border-turmeric/30 transition-all duration-700 p-2 flex flex-col cursor-pointer relative overflow-hidden">
                <div className="border border-turmeric/20 group-hover:border-turmeric/50 h-full w-full rounded-sm p-8 relative flex flex-col transition-colors duration-700">
                  <div className="absolute inset-0 bg-[url('/pillar.jpeg')] bg-cover bg-center opacity-10 mix-blend-screen transition-opacity duration-700 group-hover:opacity-20" />
                  <div className="absolute top-0 right-0 w-32 h-32 bg-turmeric/5 rounded-full filter blur-[40px] group-hover:bg-turmeric/10 transition-colors duration-700"></div>

                  <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-turmeric/40"></div>
                  <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-turmeric/40"></div>
                  <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-turmeric/40"></div>
                  <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-turmeric/40"></div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="text-[0.65rem] font-sans uppercase tracking-[0.3em] text-turmeric mb-4 font-semibold">Immersion</div>
                    <h3 className="text-3xl font-serif text-ash mb-6">Carnatic Music</h3>
                    <p className="text-ash/60 text-sm tracking-wide leading-[1.8] flex-grow mb-12">
                      Guided online sessions exploring the beautiful depths of Indian classical music. Experience joy and deep relaxation through structured melodic practice.
                    </p>
                    <div className="flex items-center text-xs uppercase tracking-widest text-turmeric mt-auto opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-1">
                      View Details <ArrowRight size={14} className="ml-2" />
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Tier 3 */}
            <FadeIn delay={0.3} className="w-full">
              <div className="group h-full bg-[#151413] hover:bg-[#1D1B1A] border border-turmeric/20 hover:border-turmeric/50 transition-all duration-700 p-2 flex flex-col cursor-pointer relative overflow-hidden">
                <div className="border border-turmeric/40 group-hover:border-turmeric h-full w-full rounded-sm p-8 relative flex flex-col transition-colors duration-700">
                  <div className="absolute inset-0 bg-[url('/lamp.jpeg')] bg-cover bg-center opacity-10 mix-blend-screen transition-opacity duration-700 group-hover:opacity-20" />
                  <div className="absolute top-0 right-0 w-32 h-32 bg-turmeric/10 rounded-full filter blur-[40px] group-hover:bg-turmeric/20 transition-colors duration-700"></div>
                  
                  <div className="absolute -top-[10px] left-1/2 -translate-x-1/2 px-3 bg-[#151413] z-20 group-hover:bg-[#1D1B1A] transition-colors duration-700">
                    <div className="text-turmeric text-[0.55rem] font-bold uppercase tracking-widest text-center">Premium</div>
                  </div>

                  <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-turmeric/80"></div>
                  <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-turmeric/80"></div>
                  <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-turmeric/80"></div>
                  <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-turmeric/80"></div>

                  <div className="relative z-10 flex flex-col h-full mt-2">
                    <div className="text-[0.65rem] font-sans uppercase tracking-[0.3em] text-turmeric mb-4 mt-2 font-semibold">Personalized</div>
                    <h3 className="text-3xl font-serif text-ash mb-6">One-on-One Guidance</h3>
                    <p className="text-ash/60 text-sm tracking-wide leading-[1.8] flex-grow mb-12">
                      One-on-one sessions offering focused guidance. A personalized curriculum designed to meet your specific pace and depth of seeking.
                    </p>
                    <div className="flex items-center text-xs uppercase tracking-widest text-turmeric mt-auto opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-1">
                      Enquire Now <ArrowRight size={14} className="ml-2" />
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </ThemeSection>

      {/* --- ROOM 6: REFLECTIONS MARQUEE --- */}
      <ThemeSection id="reflections" bgClass="bg-linen text-ink" theme="light" setActiveTheme={setActiveTheme}>
        <div className="py-40 w-full overflow-hidden flex flex-col border-t border-ink/5">
          <div className="px-[8vw] md:px-[10vw] mb-16">
            <SectionLabel text="Experiences" color="text-turmeric opacity-90" />
          </div>
          
          <div className="w-full relative py-10">
             {/* Gradient Masks for fade at edges */}
             <div className="absolute top-0 left-0 w-24 md:w-64 h-full bg-gradient-to-r from-linen to-transparent z-10 pointer-events-none"></div>
             <div className="absolute top-0 right-0 w-24 md:w-64 h-full bg-gradient-to-l from-linen to-transparent z-10 pointer-events-none"></div>

             <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing px-[8vw] lg:px-[20vw] gap-8 md:gap-16">
               {REFLECTIONS.map((ref, idx) => (
                  <div key={idx} className="flex-[0_0_85vw] sm:flex-[0_0_60vw] md:flex-[0_0_500px] snap-center flex flex-col justify-center bg-white/60 p-10 md:p-14 backdrop-blur-sm border border-ink/10 relative overflow-hidden">
                     <p className="font-serif italic font-light text-2xl md:text-3xl leading-[1.6] text-ink mb-10 relative z-10">
                       "{ref.text}"
                     </p>
                     <div className="flex items-center gap-4 mt-auto relative z-10">
                        <div className="w-8 h-[1px] bg-turmeric"></div>
                        <div className="font-sans-cond text-[0.65rem] uppercase tracking-[0.3em] font-medium text-ink/60">
                           {ref.author}
                        </div>
                     </div>
                     <div className="absolute -bottom-10 -right-10 opacity-[0.03] text-[10rem] font-serif leading-none rotate-12">"</div>
                  </div>
               ))}
             </div>
          </div>
        </div>
      </ThemeSection>

      {/* --- ROOM 7: DEPARTURE --- */}
      <ThemeSection id="departure" bgClass="bg-charcoal-deep text-ash relative" theme="dark" setActiveTheme={setActiveTheme}>
        <div className="mandala-mask z-0"></div>
        <div className="min-h-[80svh] w-full flex flex-col items-center justify-center text-center px-[8vw] md:px-[10vw] relative z-10">
           <FadeIn className="flex flex-col items-center">
             <Flower2 size={32} strokeWidth={1} className="text-turmeric/50 mx-auto mb-12" />
             <h2 className="text-5xl md:text-[5rem] lg:text-[6rem] font-serif italic font-light leading-[1.1] mb-12 max-w-4xl tracking-tight text-ash">
               Step into a space of inner harmony.
             </h2>
             <p className="text-ash/60 text-lg font-light max-w-xl mx-auto mb-16">
               Connect with us to find the precise pathway for your current depth of seeking.
             </p>
             <a 
               href="https://wa.me/919790778251" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="btn-glow flex items-center justify-center gap-4"
             >
               <span className="text-[0.7rem] uppercase tracking-[0.4em] font-medium relative z-10">Connect With Us</span>
               <ArrowRight size={16} className="relative z-10" />
             </a>
           </FadeIn>
        </div>
        <footer className="w-full text-center py-12 text-[0.6rem] uppercase tracking-[0.4em] text-ash/30 border-t border-ash/10">
            NADA SANNIDHI &nbsp; | &nbsp; {new Date().getFullYear()}
        </footer>
      </ThemeSection>

      {/* FLOATING ACTION */}
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 2 }}
          className={`fixed bottom-6 md:bottom-8 right-6 md:right-8 z-50 transition-colors duration-1000
            ${activeTheme === 'dark' ? 'text-ash hover:text-white' : 'text-charcoal-deep hover:text-black'}
          `}
        >
          <a 
            href="https://wa.me/919790778251" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full backdrop-blur-xl border border-current shadow-sm hover:scale-110 transition-all duration-500 bg-current/5"
          >
             <Sparkles size={20} strokeWidth={1.5} className="mr-0.5" />
          </a>
        </motion.div>
      </AnimatePresence>

    </div>
  );
}

// Wrapper to handle beautiful theme transitions on scroll
const ThemeSection = ({ id, bgClass, theme, children, setActiveTheme }: { id: string, bgClass: string, theme: string, children: React.ReactNode, setActiveTheme: any }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) {
      setActiveTheme(theme);
    }
  }, [inView, theme, setActiveTheme]);

  return (
    <section ref={ref} id={id} className={`w-full relative transition-colors duration-[1.5s] ease-in-out ${bgClass}`}>
      {children}
    </section>
  );
};

export default App;
