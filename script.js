document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. AI/ML Network Canvas Background (Stars/Nodes effect) ---
    const canvas = document.getElementById('tech-canvas');
    const ctx = canvas.getContext('2d');
    
    let particlesArray = [];
    // Adjust density based on screen size
    const numberOfParticles = (window.innerWidth * window.innerHeight) / 12000; 

    // Handle Resize
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles(); // Reinitialize on resize for better distribution
    });
    resizeCanvas();

    // Particle Object constructor
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            // Velocity
            this.vx = (Math.random() - 0.5) * 0.5; 
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 0.5; // Star/Node size
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.fill();
        }
    }

    // Populate network
    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    // Animation Loop
    function animateNetwork() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
            
            // Draw connecting lines if nodes are close to each other
            for (let j = i; j < particlesArray.length; j++) {
                const dx = particlesArray[i].x - particlesArray[j].x;
                const dy = particlesArray[i].y - particlesArray[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 110) { 
                    ctx.beginPath();
                    // Line opacity depends on distance
                    ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance/110})`;
                    ctx.lineWidth = 0.4;
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateNetwork);
    }
    
    // Start Network
    initParticles();
    animateNetwork();

    // --- 2. Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- 3. Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // --- 4. Search Functionality ---
    const projectSearch = document.getElementById('project-search');
    const projectCards = document.querySelectorAll('.project-card');

    if (projectSearch) {
        projectSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            projectCards.forEach(card => {
                const cardText = card.textContent.toLowerCase();
                if (cardText.includes(searchTerm)) {
                    card.style.display = 'flex'; 
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    const certSearch = document.getElementById('cert-search');
    const certCards = document.querySelectorAll('.cert-card');

    if (certSearch) {
        certSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            certCards.forEach(card => {
                const cardText = card.textContent.toLowerCase();
                if (cardText.includes(searchTerm)) {
                    card.style.display = 'flex'; 
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});