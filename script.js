/**
 * Vysakh S - Portfolio Interactions & Logic
 * Data extracted from PDF Specifications[cite: 1, 2]
 */

// --- DATA LAYER ---
const caseStudies = {
    complio: {
        cat: "Enterprise SaaS Platform",
        title: "ComplioPro-X",
        challenge: "Traditional compliance training was often passive and content heavy, making it difficult to sustain learner engagement and course completion.",
        goal: "Transform mandatory training into an intuitive, gamified experience without compromising the clarity required for complex compliance topics.",
        contribution: "Designed learner journeys, interactive assessments, gamification mechanics, progress tracking, and reusable UI patterns across the platform.",
        outcomes: ["30% increase in training completion rate", "90% improvement in user retention", "Featured in international media through enterprise deployment"]
    },
    littleguru: {
        cat: "EdTech Mobile App",
        title: "Little Guru",
        challenge: "Make Sanskrit, a traditionally complex language, more approachable and engaging for learners across different ages and geographical backgrounds.",
        goal: "Create an accessible learning experience combining structured lessons, gamification, and interactive challenges.",
        contribution: "Designed key learning journeys, lesson interactions, progress experiences, and gamified interfaces.",
        outcomes: ["Officially launched by the Indian Council for Cultural Relations (ICCR)", "Made accessible to learners worldwide via App & Play Store", "Promoted internationally through Indian embassies"]
    },
    moyenne: {
        cat: "Interactive Tourism Guide",
        title: "Moyenne Island",
        challenge: "Turn the island's history, biodiversity, and points of interest into an engaging digital experience for visitors.",
        goal: "Create a location-focused tourism companion that encourages exploration through interactive storytelling.",
        contribution: "Designed the mobile experience across island exploration, interactive maps, flora and fauna discovery.",
        outcomes: ["Official tourism application designed for Moyenne Island, Seychelles", "Launched by then President of Seychelles (Wavel Ramkalawan)", "Available worldwide through major app stores"]
    },
    ishmat: {
        cat: "E-Commerce",
        title: "Ishmat",
        challenge: "Create a premium shopping experience showcasing an extensive collection while keeping product discovery intuitive.",
        goal: "Build a responsive e-commerce experience that balances strong brand storytelling with seamless browsing.",
        contribution: "Designed key shopping journeys, product discovery experiences, responsive interfaces, and visual systems.",
        outcomes: ["Delivered a responsive e-commerce experience across desktop and mobile", "Simplified product discovery through intuitive navigation", "Designed a scalable experience ready for launches"]
    },
    playsta: {
        cat: "iGaming Platform",
        title: "Playsta",
        challenge: "Organize a content-heavy platform containing sports, live events, casino games, and promotions without overwhelming users.",
        goal: "Create an intuitive interface that simplifies discovery and enables users to navigate complex content efficiently.",
        contribution: "Designed high-density interfaces, game discovery journeys, promotional experiences, and scalable UI patterns.",
        outcomes: ["Simplified navigation across multiple gaming categories", "Delivered scalable UI patterns for high-volume content", "40% improvement in user engagement reported by client"]
    },
    felt: {
        cat: "UX Research (Self-Initiated)",
        title: "Felt",
        challenge: "Meaningful conversations, emotions, and unspoken thoughts are often forgotten, especially for neurodivergent people.",
        goal: "Create a thoughtful digital space that helps capture conversations, process emotions, and revisit meaningful moments with clarity.",
        contribution: "Conducted qualitative research with 5 neurodivergent participants to explore emotional memory and patterns.",
        outcomes: [
            "Insight 1: Conversations fade, but emotions remain.", 
            "Insight 2: Unspoken thoughts need somewhere private to go.", 
            "Insight 3: Emotional patterns are difficult to recognize over time.", 
            "Insight 4: Reflection should feel supportive, not clinical."
        ]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. PRELOADER ---
    const preloader = document.getElementById('preloader');
    const loaderBar = document.getElementById('loader-bar');
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 25;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            loaderBar.style.width = '100%';
            setTimeout(() => {
                preloader.classList.add('hidden');
                document.body.classList.remove('no-js');
            }, 600);
        } else {
            loaderBar.style.width = `${progress}%`;
        }
    }, 80);

    // --- 2. LOCAL CLOCK (IST) ---
    function updateClock() {
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const ist = new Date(utc + (3600000 * 5.5)); // Bengaluru is UTC +5:30
        let h = ist.getHours(), m = ist.getMinutes();
        const ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12 || 12;
        m = m < 10 ? '0' + m : m;
        document.getElementById('local-clock').textContent = `BENGALURU, IN — ${h}:${m} ${ampm}`;
    }
    updateClock();
    setInterval(updateClock, 1000);

    // --- 3. CUSTOM CURSOR ---
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    let mX = window.innerWidth / 2, mY = window.innerHeight / 2;
    let rX = mX, rY = mY;

    window.addEventListener('mousemove', e => {
        mX = e.clientX; mY = e.clientY;
        dot.style.transform = `translate(${mX}px, ${mY}px) translate(-50%, -50%)`;
    });

    function animCursor() {
        rX += (mX - rX) * 0.15; // Lerp ease
        rY += (mY - rY) * 0.15;
        ring.style.transform = `translate(${rX}px, ${rY}px) translate(-50%, -50%)`;
        requestAnimationFrame(animCursor);
    }
    animCursor();

    document.querySelectorAll('.hover-target').forEach(el => {
        el.addEventListener('mouseenter', () => { dot.classList.add('hovering'); ring.classList.add('hovering'); });
        el.addEventListener('mouseleave', () => { dot.classList.remove('hovering'); ring.classList.remove('hovering'); });
    });

    // --- 4. MAGNETIC BUTTONS ---
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const rect = btn.getBoundingClientRect();
            const x = (e.clientX - (rect.left + rect.width / 2)) * 0.35;
            const y = (e.clientY - (rect.top + rect.height / 2)) * 0.35;
            btn.style.transform = `translate(${x}px, ${y}px)`;
        });
        btn.addEventListener('mouseleave', () => btn.style.transform = 'translate(0,0)');
    });

    // --- 5. 3D TILT CARDS ---
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            if(window.innerWidth <= 768) return; // Disable on mobile for performance
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            card.style.transform = `perspective(1000px) rotateX(${y * -0.05}deg) rotateY(${x * 0.05}deg) scale3d(1.02,1.02,1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)';
        });
    });

    // --- 6. SCROLL REVEAL OBSERVER ---
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));

    // --- 7. MODAL ENGINE ---
    const modal = document.getElementById('modal-overlay');
    const closeBtn = document.getElementById('modal-close');

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const pKey = card.getAttribute('data-project');
            const data = caseStudies[pKey];
            if(!data) return;

            // Populate Modal Data[cite: 1, 2]
            document.getElementById('m-cat').textContent = data.cat;
            document.getElementById('m-title').textContent = data.title;
            document.getElementById('m-challenge').textContent = data.challenge;
            document.getElementById('m-goal').textContent = data.goal;
            document.getElementById('m-contribution').textContent = data.contribution;

            const outList = document.getElementById('m-outcomes');
            outList.innerHTML = '';
            data.outcomes.forEach(o => {
                const li = document.createElement('li');
                li.textContent = o;
                outList.appendChild(li);
            });

            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Lock background scroll
        });
    });

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if(e.target === modal) closeModal(); });

    // --- 8. COPY TO CLIPBOARD ---
    document.querySelectorAll('.copy-email-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const email = btn.getAttribute('data-email');
            navigator.clipboard.writeText(email).then(() => {
                const orig = btn.textContent;
                btn.textContent = "Copied!";
                btn.style.color = "var(--accent-green)";
                btn.style.borderColor = "var(--accent-green)";
                setTimeout(() => {
                    btn.textContent = orig;
                    btn.style.color = "";
                    btn.style.borderColor = "";
                }, 2500);
            });
        });
    });

    // --- 9. AMBIENT CANVAS PARTICLES ---
    const canvas = document.getElementById('fluid-canvas');
    const ctx = canvas.getContext('2d');
    let pts = [];

    function resizeCanvas() { 
        canvas.width = window.innerWidth; 
        canvas.height = window.innerHeight; 
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    for(let i = 0; i < 50; i++) {
        pts.push({
            x: Math.random() * canvas.width, 
            y: Math.random() * canvas.height,
            s: Math.random() * 2 + 0.5, 
            sx: Math.random() - 0.5, 
            sy: Math.random() * -0.8 // Float upwards
        });
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(155, 81, 224, 0.3)';
        pts.forEach(p => {
            p.x += p.sx; 
            p.y += p.sy;
            if(p.y < 0) p.y = canvas.height;
            if(p.x < 0 || p.x > canvas.width) p.x = Math.random() * canvas.width;
            
            ctx.beginPath(); 
            ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2); 
            ctx.fill();
        });
        requestAnimationFrame(drawParticles);
    }
    drawParticles();

    // --- 10. HEADER SCROLL STATE ---
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            document.getElementById('header').classList.add('scrolled');
        } else {
            document.getElementById('header').classList.remove('scrolled');
        }
    });
});
