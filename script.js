/**
 * ==========================================================================
 * Vysakh S - Portfolio Interaction Engine
 * Features: Data Binding, Preloader, Magnetic Buttons, 3D DOM Manipulation, 
 * Intersection Observers, Constellation Particle Network.
 * ==========================================================================
 */

// --- 1. DATA LAYER ---
//[cite: 1, 2]
const caseStudies = {
    complio: {
        cat: "Enterprise SaaS Platform", 
        title: "ComplioPro-X",
        challenge: "Traditional compliance training was often passive and content heavy, making it difficult to sustain learner engagement and course completion.",
        goal: "Transform mandatory training into an intuitive, gamified experience without compromising the clarity required for complex compliance topics.",
        contribution: "Designed learner journeys, interactive assessments, gamification mechanics, progress tracking, and reusable UI patterns across the platform.",
        outcomes: [
            "30% increase in training completion rate", 
            "90% improvement in user retention", 
            "Featured in international media through enterprise deployment"
        ]
    },
    littleguru: {
        cat: "EdTech Mobile App", 
        title: "Little Guru",
        challenge: "Make Sanskrit, a traditionally complex language, more approachable and engaging for learners across different ages and geographical backgrounds.",
        goal: "Create an accessible learning experience combining structured lessons, gamification, and interactive challenges to encourage continued progression.",
        contribution: "Designed key learning journeys, lesson interactions, progress experiences, and gamified interfaces for the mobile application.",
        outcomes: [
            "Officially launched by the Indian Council for Cultural Relations (ICCR)", 
            "Made accessible to Sanskrit learners worldwide via App & Play Store", 
            "Promoted internationally through Indian embassies and diplomatic missions"
        ]
    },
    moyenne: {
        cat: "Interactive Tourism Guide", 
        title: "Moyenne Island",
        challenge: "Turn the island's history, biodiversity, and points of interest into an engaging digital experience for visitors exploring Moyenne Island, Seychelles.",
        goal: "Create a location-focused tourism companion that encourages exploration through interactive storytelling and gamified discovery.",
        contribution: "Designed the mobile experience across island exploration, interactive maps, flora and fauna discovery, points of interest, and visitor journeys.",
        outcomes: [
            "Official tourism application designed for Moyenne Island, Seychelles", 
            "Launched by then President of Seychelles (Wavel Ramkalawan)", 
            "Made available to visitors worldwide through major app stores"
        ]
    },
    gommt: {
        cat: "Enterprise Training Platform", 
        title: "Go MMT by MakeMyTrip",
        challenge: "Corporate onboarding and training can become repetitive and difficult to navigate, reducing employee engagement with essential learning content.",
        goal: "Create a structured and engaging training experience that makes employee learning easier to navigate, complete, and track.",
        contribution: "Designed gamified learning journeys, interactive modules, assessments, and progress experiences for employees across the platform.",
        outcomes: [
            "Delivered gamified learning for MakeMyTrip employees", 
            "Simplified onboarding through interactive journeys", 
            "99% training completion rate reported by client"
        ]
    },
    ishmat: {
        cat: "E-Commerce Platform", 
        title: "Ishmat Athleisure",
        challenge: "Create a premium shopping experience showcasing an extensive athleisure collection while keeping product discovery intuitive and visually engaging.",
        goal: "Build a responsive e-commerce experience that balances strong brand storytelling with seamless browsing and product exploration.",
        contribution: "Designed key shopping journeys, product discovery experiences, responsive interfaces, and visual systems across the platform.",
        outcomes: [
            "Delivered responsive e-commerce across desktop and mobile", 
            "Simplified product discovery through intuitive navigation", 
            "Designed scalable experience ready for product launches"
        ]
    },
    playsta: {
        cat: "Digital Entertainment & iGaming", 
        title: "Playsta",
        challenge: "Organize a content-heavy platform containing sports, live events, casino games, and promotions without overwhelming users.",
        goal: "Create an intuitive interface that simplifies discovery and enables users to navigate complex content categories efficiently.",
        contribution: "Designed high-density interfaces, game discovery journeys, promotional experiences, and scalable UI patterns.",
        outcomes: [
            "Simplified navigation across multiple gaming and sports categories", 
            "Delivered scalable UI patterns for high-volume content ecosystem", 
            "40% improvement in user engagement reported by client"
        ]
    },
    godfather: {
        cat: "Enterprise B2B Gaming", 
        title: "Gaming Godfather",
        challenge: "Present complex sportsbook, casino, exchange, and back-office solutions clearly to operators evaluating multiple enterprise products.",
        goal: "Transform technical B2B offerings into a structured digital experience that makes products easier to understand, compare, and explore.",
        contribution: "Designed product discovery journeys, enterprise interfaces, responsive layouts, and scalable UI components across the platform.",
        outcomes: [
            "Unified multiple B2B product offerings within a structured experience", 
            "Simplified discovery of complex enterprise gaming solutions", 
            "60% increase in sales enquiries and 35% revenue growth, as client reports"
        ]
    },
    scorepro: {
        cat: "SportsTech Application", 
        title: "Score Pro",
        challenge: "Present live scores, fixtures, and match states in a compact mobile interface while keeping rapidly changing information easy to scan.",
        goal: "Create a mobile-first experience that helps sports fans quickly understand live match status, scores, and upcoming fixtures.",
        contribution: "Designed core mobile journeys, live-score interfaces, match states, navigation, and reusable components for the application.",
        outcomes: [
            "Created scalable mobile experience for live sports coverage", 
            "Simplified real-time match info through clear visual hierarchy", 
            "20% improvement in task completion reported during testing"
        ]
    },
    felt: {
        cat: "Neuro-Inclusive UX Research", 
        title: "Felt (Self-Initiated)",
        challenge: "Meaningful conversations, emotions, and unspoken thoughts are often forgotten or left unprocessed, making it difficult to understand emotional patterns especially for neurodivergent people.",
        goal: "Create a thoughtful digital space that helps capture conversations, process emotions, and revisit meaningful moments with clarity and self-awareness.",
        contribution: "Conducted qualitative interviews with 5 participants (focusing on neurodivergent experiences) to explore emotional memory and relationship patterns.",
        outcomes: [
            "Insight 1: Conversations fade, but emotions remain.", 
            "Insight 2: Unspoken thoughts need somewhere to go.", 
            "Insight 3: Emotional patterns are difficult to recognize over time.", 
            "Insight 4: Reflection should feel supportive, not clinical."
        ]
    }
};

/**
 * Primary DOM Initialization Listener
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 2. PRELOADER CONTROLLER ---
    const preloader = document.getElementById('preloader');
    const loaderBar = document.getElementById('loader-bar');
    let progress = 0;
    
    // Simulate loading progress
    const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            loaderBar.style.width = '100%';
            
            // Allow CSS transitions to complete before hiding
            setTimeout(() => {
                preloader.classList.add('hidden');
                document.body.classList.remove('no-js');
            }, 600);
        } else {
            loaderBar.style.width = `${progress}%`;
        }
    }, 70);

    // --- 3. LIVE CLOCK CONTROLLER (IST Timezone) ---
    function updateClock() {
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const ist = new Date(utc + (3600000 * 5.5)); // Map to Bengaluru (+5:30)
        
        let hours = ist.getHours();
        let minutes = ist.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12 || 12; // 12-hour format
        minutes = minutes < 10 ? '0' + minutes : minutes;
        
        document.getElementById('local-clock').textContent = `BENGALURU, IN — ${hours}:${minutes} ${ampm}`;
    }
    updateClock();
    setInterval(updateClock, 1000);

    // --- 4. CUSTOM MAGNETIC CURSOR ---
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');
    
    // Track target coordinates
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    // Track current position for lerp
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', e => {
        mouseX = e.clientX; 
        mouseY = e.clientY;
        // Dot tracks immediately
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    // Lerp function for smooth ring trailing
    function animateCursorRing() {
        ringX += (mouseX - ringX) * 0.15; // 0.15 determines trailing speed
        ringY += (mouseY - ringY) * 0.15;
        cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
        requestAnimationFrame(animateCursorRing);
    }
    animateCursorRing();

    // Hover state controllers
    document.querySelectorAll('.hover-target').forEach(element => {
        element.addEventListener('mouseenter', () => { 
            cursorDot.classList.add('hovering'); 
            cursorRing.classList.add('hovering'); 
        });
        element.addEventListener('mouseleave', () => { 
            cursorDot.classList.remove('hovering'); 
            cursorRing.classList.remove('hovering'); 
        });
    });

    // --- 5. MAGNETIC BUTTON PHYSICS ---
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const rect = btn.getBoundingClientRect();
            // Calculate distance from center of element
            const x = (e.clientX - (rect.left + rect.width / 2)) * 0.35; 
            const y = (e.clientY - (rect.top + rect.height / 2)) * 0.35;
            
            btn.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        // Reset transform on leave
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // --- 6. 3D TILT EFFECT FOR PORTFOLIO CARDS ---
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            // Disable on mobile/touch interfaces
            if(window.innerWidth <= 768) return; 
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Map mouse position to rotation degrees
            const rotateX = y * -0.05; 
            const rotateY = x * 0.05;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset to flat
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });

    // --- 7. SCROLL REVEAL OBSERVER ---
    const revealElements = document.querySelectorAll('.reveal');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const intersectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Unobserve if you only want the animation to happen once
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    revealElements.forEach(el => intersectionObserver.observe(el));

    // --- 8. DYNAMIC HEADER STATE ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 9. MODAL DATA INJECTION & LOGIC ---
    const modal = document.getElementById('modal-overlay');
    const modalCloseBtn = document.getElementById('modal-close');

    // Attach click listeners to cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const projectKey = card.getAttribute('data-project');
            const projectData = caseStudies[projectKey];
            
            // Safety check
            if(!projectData) return;

            // Map data to DOM
            document.getElementById('m-cat').textContent = projectData.cat;
            document.getElementById('m-title').textContent = projectData.title;
            document.getElementById('m-challenge').textContent = projectData.challenge;
            document.getElementById('m-goal').textContent = projectData.goal;
            document.getElementById('m-contribution').textContent = projectData.contribution;

            // Map Array data to unordered list
            const outcomesList = document.getElementById('m-outcomes');
            outcomesList.innerHTML = ''; // Clear previous
            projectData.outcomes.forEach(outcome => {
                const li = document.createElement('li');
                li.textContent = outcome;
                outcomesList.appendChild(li);
            });

            // Trigger open animation
            modal.classList.add('active');
            // Prevent body scroll behind modal
            document.body.style.overflow = 'hidden'; 
        });
    });

    // Close logic
    const closeProjectModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scroll
    };
    
    modalCloseBtn.addEventListener('click', closeProjectModal);
    
    // Close on overlay background click
    modal.addEventListener('click', e => { 
        if(e.target === modal) closeProjectModal(); 
    });

    // Close on Escape key
    document.addEventListener('keydown', e => {
        if(e.key === "Escape" && modal.classList.contains('active')) {
            closeProjectModal();
        }
    });

    // --- 10. COPY EMAIL UTILITY ---
    document.querySelectorAll('.copy-email-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const emailAddress = btn.getAttribute('data-email');
            
            navigator.clipboard.writeText(emailAddress).then(() => {
                const originalText = btn.textContent;
                
                // Visual feedback state
                btn.textContent = "Copied to Clipboard!";
                btn.style.color = "var(--accent-success)";
                btn.style.borderColor = "var(--accent-success)";
                
                // Reset after 2.5 seconds
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.color = "";
                    btn.style.borderColor = "";
                }, 2500);
            }).catch(err => {
                // Fallback for browsers that don't support clipboard API
                console.error('Failed to copy text: ', err);
                window.location.href = `mailto:${emailAddress}`;
            });
        });
    });

    // --- 11. CONSTELLATION CANVAS ENGINE ---
    const canvas = document.getElementById('fluid-canvas');
    const ctx = canvas.getContext('2d');
    let particlesArray = [];

    // Resize handler ensures canvas stays 100% of viewport
    function setCanvasDimensions() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', setCanvasDimensions);
    setCanvasDimensions();

    // Particle factory
    function initConstellation() {
        particlesArray = [];
        // Adjust density based on screen size for performance
        const numberOfParticles = window.innerWidth < 768 ? 35 : 85; 
        
        for(let i = 0; i < numberOfParticles; i++) {
            particlesArray.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.4, // Velocity X
                vy: (Math.random() - 0.5) * 0.4, // Velocity Y
                radius: Math.random() * 1.5 + 0.5
            });
        }
    }
    initConstellation();

    // Physics Loop
    function renderConstellationFrame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update physics and draw nodes
        for(let i = 0; i < particlesArray.length; i++) {
            let p = particlesArray[i];
            
            p.x += p.vx;
            p.y += p.vy;

            // Screen boundary collision detection
            if(p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if(p.y < 0 || p.y > canvas.height) p.vy *= -1;

            // Draw Node
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(155, 81, 224, 0.4)';
            ctx.fill();

            // Draw connective tissue
            for(let j = i + 1; j < particlesArray.length; j++) {
                let p2 = particlesArray[j];
                
                // Pythagorean theorem for distance
                let dx = p.x - p2.x;
                let dy = p.y - p2.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                // If close enough, draw a line
                if(distance < 150) {
                    ctx.beginPath();
                    // Fade out lines based on distance
                    ctx.strokeStyle = `rgba(155, 81, 224, ${0.15 - distance / 1000})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }
        
        // Loop recursively
        requestAnimationFrame(renderConstellationFrame);
    }
    
    // Start engine
    renderConstellationFrame();
});
