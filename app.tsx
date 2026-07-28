import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, MotionStyle } from 'framer-motion';

// --- REUSABLE COMPONENTS ---

const ContactButton = () => (
  <button
    className="rounded-full uppercase tracking-widest text-white font-medium whitespace-nowrap px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base relative transition-transform hover:scale-105 active:scale-95"
    style={{
      background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
      boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
      outline: '2px solid white',
      outlineOffset: '-3px',
    }}
  >
    Contact Me
  </button>
);

const LiveProjectButton = () => (
  <button className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base transition-colors hover:bg-[#D7E2EA]/10 whitespace-nowrap">
    Live Project
  </button>
);

const FadeIn = ({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
};

const Magnet = ({
  children,
  padding = 150,
  strength = 3,
  className = '',
}: {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < padding + Math.max(width, height) / 2) {
        setIsActive(true);
        setPosition({ x: distanceX / strength, y: distanceY / strength });
      } else {
        setIsActive(false);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [padding, strength]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isActive ? 'transform 0.3s ease-out' : 'transform 0.6s ease-in-out',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};

const AnimatedText = ({ text, className = '' }: { text: string; className?: string }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');

  return (
    <p ref={containerRef} className={`${className} flex flex-wrap justify-center`}>
      {words.map((word, i) => (
        <span key={i} className="mr-2 mb-1 flex">
          {word.split('').map((char, j) => {
            const charIndex = i * 10 + j; // Approximation for stagger
            const start = charIndex * 0.01;
            const end = start + 0.1;
            const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
            return (
              <span key={j} className="relative">
                <span className="invisible">{char}</span>
                <motion.span className="absolute top-0 left-0" style={{ opacity }}>
                  {char}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </p>
  );
};

// --- SECTIONS ---

const HeroSection = () => {
  return (
    <section className="h-screen flex flex-col relative overflow-x-clip px-6 md:px-10">
      <FadeIn delay={0} y={-20}>
        <nav className="flex justify-between w-full pt-6 md:pt-8 text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem]">
          {['About', 'Price', 'Projects', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:opacity-70 transition-opacity duration-200">
              {item}
            </a>
          ))}
        </nav>
      </FadeIn>

      <div className="flex-1 flex flex-col justify-center w-full relative z-20 pointer-events-none mt-6 sm:mt-4 md:-mt-5">
        <div className="overflow-hidden w-full">
          <FadeIn delay={0.15} y={40}>
            <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]">
              Hi, i&apos;m jack
            </h1>
          </FadeIn>
        </div>
      </div>

      <Magnet className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto">
        <FadeIn delay={0.6} y={30}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
            alt="Jack 3D Creator"
            className="w-full h-auto object-contain"
          />
        </FadeIn>
      </Magnet>

      <div className="flex justify-between items-end pb-7 sm:pb-8 md:pb-10 w-full relative z-20">
        <FadeIn delay={0.35} y={20} className="w-1/2">
          <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px] text-[clamp(0.75rem,1.4vw,1.5rem)]">
            a 3d creator driven by crafting striking and unforgettable projects
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20} className="w-1/2 flex justify-end">
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
};

const MarqueeSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  const images = [
    "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
    "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
    "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
    "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
    "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
    "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
    "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
    "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
    "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
    "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
    "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
    "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
    "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
    "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
    "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
    "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
    "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
    "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
    "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
    "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
    "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif",
  ];

  const row1 = images.slice(0, 11);
  const row2 = images.slice(11);

  // Triple arrays for infinite scroll illusion
  const row1Tripled = [...row1, ...row1, ...row1];
  const row2Tripled = [...row2, ...row2, ...row2];

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const newOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
        setOffset(newOffset);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden flex flex-col gap-3">
      <div
        className="flex gap-3 w-max will-change-transform"
        style={{ transform: `translateX(${offset - 200}px)` }}
      >
        {row1Tripled.map((src, i) => (
          <img key={`r1-${i}`} src={src} alt="Project Preview" className="w-[420px] h-[270px] rounded-2xl object-cover shrink-0" loading="lazy" />
        ))}
      </div>
      <div
        className="flex gap-3 w-max will-change-transform"
        style={{ transform: `translateX(${-(offset - 200)}px)` }}
      >
        {row2Tripled.map((src, i) => (
          <img key={`r2-${i}`} src={src} alt="Project Preview" className="w-[420px] h-[270px] rounded-2xl object-cover shrink-0" loading="lazy" />
        ))}
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen relative flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden">
      {/* Decorative 3D Elements */}
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-0">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png" alt="Moon 3D" className="w-[120px] sm:w-[160px] md:w-[210px]" />
      </FadeIn>
      
      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-0">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png" alt="Abstract 3D" className="w-[100px] sm:w-[140px] md:w-[180px]" />
      </FadeIn>
      
      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-0">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png" alt="Lego 3D" className="w-[120px] sm:w-[160px] md:w-[210px]" />
      </FadeIn>
      
      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-0">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png" alt="Group 3D" className="w-[130px] sm:w-[170px] md:w-[220px]" />
      </FadeIn>

      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center text-[clamp(3rem,12vw,160px)]">
            About me
          </h2>
        </FadeIn>
        
        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
          <AnimatedText 
            text="With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!"
            className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px] text-[clamp(1rem,2vw,1.35rem)]"
          />
          <ContactButton />
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const services = [
    { num: '01', name: '3D Modeling', desc: 'Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.' },
    { num: '02', name: 'Rendering', desc: 'High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.' },
    { num: '03', name: 'Motion Design', desc: 'Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.' },
    { num: '04', name: 'Branding', desc: 'Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence.' },
    { num: '05', name: 'Web Design', desc: 'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.' },
  ];

  return (
    <section className="bg-[#FFFFFF] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-20 text-[#0C0C0C]">
      <FadeIn y={20}>
        <h2 className="font-black uppercase text-center mb-16 sm:mb-20 md:mb-28 text-[clamp(3rem,12vw,160px)] leading-none">
          Services
        </h2>
      </FadeIn>
      
      <div className="max-w-5xl mx-auto flex flex-col">
        {services.map((service, i) => (
          <FadeIn key={service.num} delay={i * 0.1} y={20} className="border-b border-[rgba(12,12,12,0.15)] last:border-0 py-8 sm:py-10 md:py-12 flex flex-col md:flex-row md:items-start gap-4 md:gap-12">
            <span className="font-black text-[clamp(3rem,10vw,140px)] leading-none shrink-0">{service.num}</span>
            <div className="flex flex-col gap-2 pt-2 md:pt-6">
              <h3 className="font-medium uppercase text-[clamp(1rem,2.2vw,2.1rem)]">{service.name}</h3>
              <p className="font-light leading-relaxed max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] opacity-60">
                {service.desc}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index, totalCards, progress }: any) => {
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(progress, [0, 1], [1, targetScale]);
  
  return (
    <motion.div
      style={{
        scale,
        top: `calc(6rem + ${index * 28}px)`, // top-24 roughly equals 6rem
      }}
      className="sticky w-full max-w-6xl mx-auto rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col gap-6 md:gap-8 origin-top mb-10"
    >
      <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-4 md:gap-6">
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="hero-heading font-black text-[clamp(3rem,10vw,140px)] leading-none">
            {project.num}
          </span>
          <div className="flex flex-col">
            <span className="uppercase text-[#D7E2EA] opacity-60 tracking-wider text-sm sm:text-base font-light">
              {project.category}
            </span>
            <h3 className="uppercase text-[#D7E2EA] font-medium text-xl sm:text-2xl md:text-4xl tracking-wide">
              {project.name}
            </h3>
          </div>
        </div>
        <LiveProjectButton />
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full h-full">
        <div className="w-full md:w-[40%] flex flex-col gap-4">
          <img src={project.col1Img1} alt={`${project.name} view 1`} className="w-full h-[clamp(130px,16vw,230px)] object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]" loading="lazy" />
          <img src={project.col1Img2} alt={`${project.name} view 2`} className="w-full h-[clamp(160px,22vw,340px)] object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]" loading="lazy" />
        </div>
        <div className="w-full md:w-[60%]">
          <img src={project.col2Img} alt={`${project.name} main view`} className="w-full h-full min-h-[300px] md:min-h-0 object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]" loading="lazy" />
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const projects = [
    {
      num: '01',
      category: 'Client',
      name: 'Nextlevel Studio',
      col1Img1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
      col1Img2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
      col2Img: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    },
    {
      num: '02',
      category: 'Personal',
      name: 'Aura Brand Identity',
      col1Img1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
      col1Img2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
      col2Img: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
    },
    {
      num: '03',
      category: 'Client',
      name: 'Solaris Digital',
      col1Img1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
      col1Img2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
      col2Img: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
    },
  ];

  return (
    <section id="projects" className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-30 pt-20 pb-32 px-5 sm:px-8 md:px-10">
      <FadeIn y={20}>
        <h2 className="hero-heading font-black uppercase text-center mb-16 sm:mb-20 md:mb-28 text-[clamp(3rem,12vw,160px)] leading-none">
          Project
        </h2>
      </FadeIn>
      
      <div ref={containerRef} className="relative w-full pb-32">
        {projects.map((proj, idx) => (
          <ProjectCard 
            key={proj.num} 
            project={proj} 
            index={idx} 
            totalCards={projects.length} 
            progress={scrollYProgress} 
          />
        ))}
      </div>
    </section>
  );
};

// --- APP COMPONENT ---

export default function App() {
  return (
    <div className="bg-[#0C0C0C] text-[#D7E2EA] font-sans selection:bg-[#BBCCD7] selection:text-[#0C0C0C]">
      <title>Jack -- 3D Creator</title>
      <main className="w-full overflow-x-clip relative">
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
      </main>
    </div>
  );
}
