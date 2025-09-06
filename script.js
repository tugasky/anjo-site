// ===========================================
// ANJO CRAFTY - STATIC SITE JAVASCRIPT
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Starting initialization...');

    // Ensure home section is active by default
    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.classList.add('active');
        homeSection.style.display = 'block';
        console.log('Home section activated');
    }

    // Ensure other sections are hidden initially
    document.querySelectorAll('section:not(#home)').forEach(section => {
        section.style.display = 'none';
        section.classList.remove('active');
    });

    // Hide footer on homepage initially
    const footer = document.querySelector('footer');
    if (footer) {
        footer.style.display = 'none';
        console.log('Footer hidden for homepage');
    }

    // Initialize all functionality with delays to ensure DOM is ready
    setTimeout(() => {
        initNavigation();
        initContactForm();
        initHeroAnimations();
        initCanvasAnimation();
        initCTAButton();
        // Set initial button classes based on current mode (now dark mode by default)
        updateButtonClasses();

        console.log('AnJo Crafty static site loaded successfully!');
    }, 100);
});

// Dark mode toggle functionality
document.addEventListener("click", e => {
    let tar = e.target;
    if (tar.name == "toggle") {
        // Toggle dark mode class on specific sections
        const sections = ['services', 'gallery', 'about', 'contact'];
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.classList.toggle("dark-mode");
            }
        });
        // Update button classes based on mode
        updateButtonClasses();
    }
});

// Light bulb toggle functionality
function toggleDarkMode() {
    // Toggle dark mode class on specific sections
    const sections = ['services', 'gallery', 'about', 'contact'];
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.toggle("dark-mode");
        }
    });
    // Update button classes based on mode
    updateButtonClasses();
}

// Function to update button classes based on dark mode
function updateButtonClasses() {
    const ctaButtons = document.querySelectorAll('.cta-button');
    // Check if any of the target sections have dark mode
    const targetSections = ['services', 'gallery', 'about', 'contact'];
    const isAnySectionDark = targetSections.some(sectionId => {
        const section = document.getElementById(sectionId);
        return section && section.classList.contains('dark-mode');
    });

    ctaButtons.forEach(button => {
        if (isAnySectionDark) {
            // In dark mode, all buttons should be primary
            button.classList.remove('secondary');
            button.classList.add('primary');
        } else {
            // In light mode, all buttons should be secondary
            button.classList.remove('primary');
            button.classList.add('secondary');
        }
    });
}

// ===========================================
// NAVIGATION SYSTEM
// ===========================================

function initNavigation() {
    console.log('Initializing navigation...');

    // Handle navigation buttons
    const navButtons = document.querySelectorAll('.nav-btn, .footer-link');
    console.log('Found nav buttons:', navButtons.length);

    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            console.log('Button clicked, navigating to:', target);
            navigateToSection(target);
        });
    });

    // Handle back buttons
    const backButtons = document.querySelectorAll('.back-btn');
    console.log('Found back buttons:', backButtons.length);

    backButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            console.log('Back button clicked, going to:', target);
            navigateToSection(target);
        });
    });

    // Handle hamburger menu buttons
    const hamburgerButtons = document.querySelectorAll('.hamburger-btn');
    console.log('Found hamburger buttons:', hamburgerButtons.length);

    hamburgerButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const menuId = this.id.replace('hamburger-', 'menu-');
            const menuDropdown = document.getElementById(menuId);

            if (menuDropdown) {
                // Toggle active class for animation
                this.classList.toggle('active');
                menuDropdown.classList.toggle('active');
            }
        });
    });

    // Handle hamburger menu navigation items
    const menuItems = document.querySelectorAll('.menu-item[data-target]');
    console.log('Found menu items:', menuItems.length);

    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            console.log('Menu item clicked, navigating to:', target);

            // Close the menu by removing active classes
            const menuDropdown = this.closest('.menu-dropdown');
            const hamburgerBtn = document.querySelector(`#hamburger-${menuDropdown.id.replace('menu-', '')}`);

            if (menuDropdown) {
                menuDropdown.classList.remove('active');
            }
            if (hamburgerBtn) {
                hamburgerBtn.classList.remove('active');
            }

            // Small delay to ensure menu closes before navigation
            setTimeout(() => {
                navigateToSection(target);
            }, 50);
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.menu-container')) {
            // Close all menus
            document.querySelectorAll('.hamburger-btn.active').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelectorAll('.menu-dropdown.active').forEach(menu => {
                menu.classList.remove('active');
            });
        }
    });

    console.log('Navigation initialized');
}

// Make navigateToSection globally available for inline onclick handlers
window.navigateToSection = function(targetId) {
    console.log('navigateToSection called with:', targetId);

    // First, ensure all sections are hidden
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
        section.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.style.display = 'block';
        targetSection.classList.add('active');
        console.log('Section activated:', targetId);
        // Scroll to top for better UX
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Animate stats if navigating to about section
        if (targetId === 'about') {
            setTimeout(() => {
                animateStats();
                checkExperienceStat();
            }, 500); // Small delay to ensure section is visible
        }
    } else {
        console.log('Section not found:', targetId);
        // If section not found, show home as default
        const homeSection = document.getElementById('home');
        if (homeSection) {
            homeSection.style.display = 'block';
            homeSection.classList.add('active');
        }
    }

    // Hide/show footer based on current section
    const footer = document.querySelector('footer');
    if (targetId === 'home') {
        footer.style.display = 'none';
        console.log('Footer hidden');
    } else {
        footer.style.display = 'block';
        console.log('Footer shown');
    }
};



// ===========================================
// CONTACT FORM
// ===========================================

function initContactForm() {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            // Create email subject and body
            const subject = encodeURIComponent(`Mensagem de ${name} - AnJo Crafty`);
            const body = encodeURIComponent(`Olá!\n\nNome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}\n\nAtenciosamente,\n${name}`);

            // Create mailto link
            const mailtoLink = `mailto:anjocrafty@gmail.com?subject=${subject}&body=${body}`;

            // Open email client
            window.location.href = mailtoLink;

            // Show notification
            showNotification('Email client aberto com sua mensagem!', 'success');

            // Reset form
            this.reset();
        });
    }
}

function fallbackContact(message) {
    window.open('https://www.instagram.com/anjocrafty/', '_blank');
    showNotification('Instagram aberto! Copie esta mensagem manualmente.', 'info');
    console.log('Mensagem para copiar:', message);
}

// ===========================================
// NOTIFICATION SYSTEM
// ===========================================

function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#dc2626' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        font-family: 'Inter', sans-serif;
        animation: slideInRight 0.3s ease-out;
    `;

    // Add close functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });

    // Auto-hide after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);

    document.body.appendChild(notification);
}

// ===========================================
// UTILITY FUNCTIONS
// ===========================================

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }



    .notification {
        font-size: 0.9rem;
    }

    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: 1rem;
        opacity: 0.8;
        transition: opacity 0.3s ease;
    }

    .notification-close:hover {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// ===========================================
// HERO ANIMATIONS - Magnetic Buttons & Parallax
// ===========================================

function initHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    const ctaButtons = document.querySelectorAll('.hero-actions .cta-button');

    // Magnetic button effect
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        ctaButtons.forEach(button => {
            const rect = button.getBoundingClientRect();
            const buttonX = rect.left + rect.width / 2;
            const buttonY = rect.top + rect.height / 2;

            const distance = Math.sqrt(
                Math.pow(mouseX - buttonX, 2) + Math.pow(mouseY - buttonY, 2)
            );

            // Magnetic effect within 100px radius
            if (distance < 100) {
                const strength = (100 - distance) / 100;
                const moveX = (mouseX - buttonX) * strength * 0.3;
                const moveY = (mouseY - buttonY) * strength * 0.3;

                button.style.transform = `translate(${moveX}px, ${moveY}px)`;
            } else {
                button.style.transform = '';
            }
        });

        // Parallax title effect
        if (heroTitle) {
            const rect = heroTitle.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = (mouseX - centerX) / window.innerWidth;
            const deltaY = (mouseY - centerY) / window.innerHeight;

            const tiltX = deltaX * 2; // Max 2 degrees tilt
            const tiltY = deltaY * 2;

            heroTitle.style.transform = `perspective(1000px) rotateX(${tiltY}deg) rotateY(${tiltX}deg)`;
        }
    });

    // Reset transforms when mouse leaves
    document.addEventListener('mouseleave', () => {
        ctaButtons.forEach(button => {
            button.style.transform = '';
        });
        if (heroTitle) {
            heroTitle.style.transform = '';
        }
    });

    // Enhanced particle effect on button hover
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', createParticleEffect);
    });
}

function createParticleEffect(e) {
    const button = e.target;
    const rect = button.getBoundingClientRect();

    // Create multiple particles
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random position around the button
        const angle = (Math.PI * 2 * i) / 8;
        const radius = 20 + Math.random() * 30;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        particle.style.cssText = `
            position: absolute;
            left: ${rect.left + rect.width / 2 + x - 2}px;
            top: ${rect.top + rect.height / 2 + y - 2}px;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: particleFloat 1s ease-out forwards;
        `;

        document.body.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }
}

// Add particle animation styles
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0) translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
        }
    }
`;
document.head.appendChild(particleStyle);

// ===========================================
// STATS ANIMATION
// ===========================================

function animateStats() {
    const statElements = document.querySelectorAll('.stat h3[data-target]');

    statElements.forEach(element => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 16);
    });
}

function checkExperienceStat() {
    const now = new Date();
    const targetDate = new Date('2025-12-25');

    if (now >= targetDate) {
        const experienceStat = document.getElementById('experience-stat');
        const experienceNumber = document.getElementById('experience-number');

        // Calculate years since 2025
        const years = now.getFullYear() - 2025;

        if (years >= 1) {
            experienceNumber.textContent = years + '+';
            experienceStat.style.display = 'block';
        }
    }
}

// CTA Button Loading Animation
function initCTAButton() {
    const ctaButton = document.getElementById('ready-button');

    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            const button = this;
            const buttonText = button.querySelector('.button-text');
            const loadingBar = button.querySelector('.loading-bar');
            const loadingProgress = button.querySelector('.loading-progress');
            const loadingPercentage = button.querySelector('.loading-percentage');

            // Add loading class to trigger CSS animations
            button.classList.add('loading');

            // Change text to loading state
            buttonText.textContent = 'A carregar...';

            // Reset progress bar and percentage
            loadingProgress.style.width = '0%';
            loadingPercentage.textContent = '0%';

            // Start loading animation and percentage counter
            setTimeout(() => {
                loadingProgress.style.width = '100%';

                // Update percentage counter
                let percentage = 0;
                const percentageInterval = setInterval(() => {
                    percentage += 2; // Increase by 2% every 40ms (reaches 100% in 2 seconds)
                    if (percentage >= 100) {
                        percentage = 100;
                        clearInterval(percentageInterval);
                    }
                    loadingPercentage.textContent = percentage + '%';
                }, 40);
            }, 50);

            // Navigate to contact section after 2 seconds
            setTimeout(() => {
                navigateToSection('contact');

                // Reset button after navigation
                setTimeout(() => {
                    button.classList.remove('loading');
                    buttonText.textContent = 'Preparado?';
                    loadingProgress.style.width = '0%';
                    loadingPercentage.textContent = '0%';
                }, 500);
            }, 2000);
        });
    }
}



// ===========================================
// CANVAS ANIMATION - Interactive Network
// ===========================================

function initCanvasAnimation() {
    (function() {

        var width, height, canvas, ctx, stars, target, animateHeader = true;

        // Main
        initHeader();
        initAnimation();
        addListeners();

        function initHeader() {
            width = window.innerWidth;
            height = window.innerHeight;
            target = {x: width/2, y: height/2};

            canvas = document.getElementById('demo-canvas');
            canvas.width = width;
            canvas.height = height;
            ctx = canvas.getContext('2d');

            // create stars
            stars = [];
            for(var i = 0; i < 150; i++) { // More stars than before
                var star = {
                    x: Math.random() * width,
                    y: Math.random() * height,
                    originX: Math.random() * width,
                    originY: Math.random() * height,
                    size: Math.random() * 2 + 0.5,
                    brightness: Math.random() * 0.8 + 0.2,
                    twinkle: Math.random() * Math.PI * 2,
                    speed: Math.random() * 0.02 + 0.01
                };
                stars.push(star);
            }

            // Find closest stars for connections
            for(var i = 0; i < stars.length; i++) {
                var closest = [];
                var s1 = stars[i];
                for(var j = 0; j < stars.length; j++) {
                    var s2 = stars[j];
                    if(s1 !== s2) {
                        var dist = getDistance(s1, s2);
                        if(dist < 100) { // Connection distance
                            closest.push({star: s2, distance: dist});
                        }
                    }
                }
                // Sort by distance and keep only closest 3
                closest.sort(function(a, b) { return a.distance - b.distance; });
                s1.closest = closest.slice(0, 3);
            }
        }

        // Event handling
        function addListeners() {
            if(!('ontouchstart' in window)) {
                window.addEventListener('mousemove', mouseMove);
            }
            window.addEventListener('scroll', scrollCheck);
            window.addEventListener('resize', resize);
        }

        function mouseMove(e) {
            var posx = posy = 0;
            if (e.pageX || e.pageY) {
                posx = e.pageX;
                posy = e.pageY;
            }
            else if (e.clientX || e.clientY) {
                posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }
            target.x = posx;
            target.y = posy;
        }

        function scrollCheck() {
            if(document.body.scrollTop > height) animateHeader = false;
            else animateHeader = true;
        }

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initHeader(); // Reinitialize stars on resize
        }

        // animation
        function initAnimation() {
            animate();
            for(var i in stars) {
                shiftStar(stars[i]);
            }
        }

        function animate() {
            if(animateHeader) {
                ctx.clearRect(0,0,width,height);

                // Update star twinkling
                for(var i in stars) {
                    stars[i].twinkle += stars[i].speed;
                }

                for(var i in stars) {
                    var star = stars[i];
                    var mouseDist = getDistance(target, star);

                    // Mouse interaction
                    var mouseInfluence = Math.max(0, 1 - mouseDist / 200); // Influence radius of 200px
                    star.active = mouseInfluence;

                    // Draw connections to nearby stars
                    drawConnections(star);

                    // Draw the star
                    drawStar(star);
                }
            }
            requestAnimationFrame(animate);
        }

        function shiftStar(s) {
            TweenLite.to(s, 2+2*Math.random(), {
                x: s.originX - 30 + Math.random() * 60,
                y: s.originY - 30 + Math.random() * 60,
                ease: Circ.easeInOut,
                onComplete: function() {
                    shiftStar(s);
                }
            });
        }

        // Canvas manipulation
        function drawConnections(s) {
            if(s.active > 0) {
                for(var i in s.closest) {
                    var connection = s.closest[i];
                    var otherStar = connection.star;
                    var dist = connection.distance;

                    // Only draw if both stars are somewhat active
                    var connectionStrength = (s.active + otherStar.active) / 2;
                    if(connectionStrength > 0.1) {
                        ctx.beginPath();
                        ctx.moveTo(s.x, s.y);
                        ctx.lineTo(otherStar.x, otherStar.y);
                        ctx.strokeStyle = 'rgba(156,217,249,' + connectionStrength * 0.5 + ')';
                        ctx.lineWidth = connectionStrength * 2;
                        ctx.stroke();
                    }
                }
            }
        }

        function drawStar(s) {
            var twinkleEffect = Math.sin(s.twinkle) * 0.3 + 0.7;
            var brightness = s.brightness * twinkleEffect * (1 + s.active * 0.5);

            ctx.save();
            ctx.globalAlpha = brightness;

            // Draw star shape
            ctx.beginPath();
            var spikes = 5;
            var outerRadius = s.size * (1 + s.active);
            var innerRadius = s.size * 0.4 * (1 + s.active);

            for(var i = 0; i < spikes * 2; i++) {
                var angle = (i * Math.PI) / spikes;
                var radius = i % 2 === 0 ? outerRadius : innerRadius;
                var x = s.x + Math.cos(angle) * radius;
                var y = s.y + Math.sin(angle) * radius;

                if(i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();

            // Create gradient for star glow
            var gradient = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, outerRadius * 2);
            gradient.addColorStop(0, 'rgba(255, 255, 255, ' + brightness + ')');
            gradient.addColorStop(0.5, 'rgba(156, 217, 249, ' + brightness * 0.8 + ')');
            gradient.addColorStop(1, 'rgba(156, 217, 249, 0)');

            ctx.fillStyle = gradient;
            ctx.fill();

            // Add glow effect
            ctx.shadowColor = 'rgba(156, 217, 249, ' + brightness * 0.5 + ')';
            ctx.shadowBlur = outerRadius * 3;
            ctx.fill();

            ctx.restore();
        }

        // Util
        function getDistance(p1, p2) {
            return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
        }

    })();
}
