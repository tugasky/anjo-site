// ===========================================
// ANJO CRAFTY - STATIC SITE JAVASCRIPT
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Starting initialization...');

    // Mobile performance detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                     window.innerWidth <= 768 ||
                     window.innerHeight <= 600;
    const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;

    // Add performance class to body for CSS optimizations
    if (isMobile || isLowEndDevice) {
        document.body.classList.add('performance-mode');
        console.log('Performance mode enabled for mobile/low-end devices');
    }

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
        initHamburgerMenu();
        initContactForm();
        initHeroAnimations(isMobile);
        initCanvasAnimation(isMobile);
        initCTAButton();
        initIframeResponsive();
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

    // Throttle function for performance
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Handle navigation buttons
    const navButtons = document.querySelectorAll('.nav-btn, .footer-link');
    console.log('Found nav buttons:', navButtons.length);

    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            console.log('Button clicked, navigating to:', target);
            navigateToSection(target);
        }, { passive: true });
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
        }, { passive: true });
    });

    // Handle mobile navigation links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav .nav-link');
    console.log('Found mobile nav links:', mobileNavLinks.length);

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            console.log('Mobile nav link clicked, navigating to:', target);
            navigateToSection(target);
        }, { passive: true });
    });

    // Close menu when clicking outside - throttled for performance
    const throttledCloseMenu = throttle(function(e) {
        if (!e.target.closest('.menu-container')) {
            // Close all menus
            document.querySelectorAll('.hamburger-btn.active').forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-expanded', 'false');
            });
            document.querySelectorAll('.menu-dropdown.active').forEach(menu => {
                menu.classList.remove('active');
            });
        }
    }, 100);

    document.addEventListener('click', throttledCloseMenu, { passive: true });

    console.log('Navigation initialized');
}

// ===========================================
// HAMBURGER MENU SYSTEM
// ===========================================

function initHamburgerMenu() {
    console.log('Initializing hamburger menu...');

    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileNavs = document.querySelectorAll('.mobile-nav');

    if (!hamburgerBtn || mobileNavs.length === 0) {
        console.log('Hamburger button or mobile navs not found');
        return;
    }

    // Toggle hamburger menu
    hamburgerBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        const isExpanded = this.classList.contains('active');

        if (isExpanded) {
            // Close menu
            closeHamburgerMenu();
        } else {
            // Open menu
            openHamburgerMenu();
        }
    });

    // Close menu when clicking on navigation links
    mobileNavs.forEach(mobileNav => {
        const navLinks = mobileNav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeHamburgerMenu();
            });
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        const isClickInsideHamburger = hamburgerBtn.contains(e.target);
        const isClickInsideAnyNav = Array.from(mobileNavs).some(nav => nav.contains(e.target));

        if (!isClickInsideHamburger && !isClickInsideAnyNav) {
            closeHamburgerMenu();
        }
    });

    // Close menu on window resize (if switching to desktop)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeHamburgerMenu();
        }
    });

    console.log('Hamburger menu initialized');
}

function openHamburgerMenu() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileNavs = document.querySelectorAll('.mobile-nav');

    if (hamburgerBtn && mobileNavs.length > 0) {
        hamburgerBtn.classList.add('active');
        hamburgerBtn.setAttribute('aria-expanded', 'true');

        // Add active class to all mobile navigation elements
        mobileNavs.forEach(nav => {
            nav.classList.add('active');
        });

        console.log('Hamburger menu opened for all sections');
    }
}

function closeHamburgerMenu() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileNavs = document.querySelectorAll('.mobile-nav');

    if (hamburgerBtn && mobileNavs.length > 0) {
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');

        // Remove active class from all mobile navigation elements
        mobileNavs.forEach(nav => {
            nav.classList.remove('active');
        });

        console.log('Hamburger menu closed for all sections');
    }
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

function initHeroAnimations(isMobile = false) {
    // Simplified hero animations - removed magnetic effects and particles for better performance
    console.log('Hero animations initialized (simplified version)');
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
    const isMobile = document.body.classList.contains('performance-mode');

    statElements.forEach(element => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = isMobile ? 1000 : 2000; // Faster animation on mobile
        const step = target / (duration / (isMobile ? 32 : 16)); // Lower fps on mobile
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, isMobile ? 32 : 16);
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
// IFRAME RESPONSIVE HANDLING
// ===========================================

function initIframeResponsive() {
    const iframe = document.querySelector('.gallery-iframe-container iframe');
    const container = document.querySelector('.gallery-iframe-container');

    if (!iframe || !container) return;

    // Function to adjust iframe height based on content
    function adjustIframeHeight() {
        try {
            // Try to access iframe content (same-origin only)
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            if (iframeDoc) {
                const contentHeight = iframeDoc.documentElement.scrollHeight;
                if (contentHeight > 0) {
                    iframe.style.height = contentHeight + 'px';
                    container.style.height = 'auto'; // Let container adjust to iframe
                }
            }
        } catch (e) {
            // Cross-origin iframe, use fallback method
            console.log('Cross-origin iframe detected, letting CSS handle height');
            // Let CSS handle the height with min-height: 600px
        }
    }

    // Listen for postMessage from iframe (for services like EmbedSocial)
    function handlePostMessage(event) {
        // Only accept messages from expected origins
        const allowedOrigins = [
            'https://embedsocial.com',
            'https://www.embedsocial.com'
        ];

        if (allowedOrigins.includes(event.origin)) {
            if (event.data && typeof event.data === 'object' && event.data.height) {
                const newHeight = parseInt(event.data.height);
                if (newHeight > 0 && newHeight < 5000) { // Reasonable height limits
                    iframe.style.height = newHeight + 'px';
                    container.style.height = 'auto';
                    console.log('Iframe height adjusted to:', newHeight);
                }
            }
        }
    }

    // Add postMessage listener
    window.addEventListener('message', handlePostMessage);

    // Initial height adjustment
    setTimeout(adjustIframeHeight, 1000);

    // Periodic height checks (for dynamic content)
    const heightCheckInterval = setInterval(adjustIframeHeight, 3000);

    // Clean up interval when navigating away from gallery
    const gallerySection = document.getElementById('gallery');
    if (gallerySection) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (!gallerySection.classList.contains('active')) {
                        clearInterval(heightCheckInterval);
                        window.removeEventListener('message', handlePostMessage);
                        observer.disconnect();
                    }
                }
            });
        });

        observer.observe(gallerySection, {
            attributes: true,
            attributeFilter: ['class']
        });
    }

    // Adjust height on window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(adjustIframeHeight, 250);
    });
}

// ===========================================
// CANVAS ANIMATION - Interactive Network
// ===========================================

function initCanvasAnimation(isMobile = false) {
    (function() {

        var width, height, canvas, ctx, stars, target, animateHeader = true;
        var lastFrameTime = 0;
        var frameInterval = isMobile ? 32 : 16; // 30fps on mobile, 60fps on desktop

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

            // Reduce stars on mobile for performance
            var starCount = isMobile ? 50 : 150; // 50 stars on mobile, 150 on desktop

            // create stars
            stars = [];
            for(var i = 0; i < starCount; i++) {
                var star = {
                    x: Math.random() * width,
                    y: Math.random() * height,
                    originX: Math.random() * width,
                    originY: Math.random() * height,
                    size: Math.random() * 2 + 0.5,
                    brightness: Math.random() * 0.8 + 0.2,
                    twinkle: Math.random() * Math.PI * 2,
                    speed: isMobile ? Math.random() * 0.01 + 0.005 : Math.random() * 0.02 + 0.01 // Slower twinkling on mobile
                };
                stars.push(star);
            }

            // Find closest stars for connections (skip on mobile for performance)
            if (!isMobile) {
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
            // Reduce star movement on mobile - only animate subset of stars
            if (!isMobile) {
                // Only animate every other star on desktop for better performance
                for(var i = 0; i < stars.length; i += 2) {
                    shiftStar(stars[i]);
                }
            }
        }

        function animate(currentTime) {
            if(animateHeader) {
                // Throttle frame rate on mobile
                if (currentTime - lastFrameTime >= frameInterval) {
                    ctx.clearRect(0,0,width,height);

                    // Update star twinkling
                    for(var i in stars) {
                        stars[i].twinkle += stars[i].speed;
                    }

                    for(var i in stars) {
                        var star = stars[i];
                        var mouseDist = getDistance(target, star);

                        // Mouse interaction (reduced on mobile)
                        var mouseInfluence = Math.max(0, 1 - mouseDist / (isMobile ? 100 : 200)); // Smaller influence radius on mobile
                        star.active = mouseInfluence;

                        // Draw connections to nearby stars (skip on mobile)
                        if (!isMobile) {
                            drawConnections(star);
                        }

                        // Draw the star
                        drawStar(star);
                    }

                    lastFrameTime = currentTime;
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

            // Add glow effect (reduced on mobile)
            if (!isMobile) {
                ctx.shadowColor = 'rgba(156, 217, 249, ' + brightness * 0.5 + ')';
                ctx.shadowBlur = outerRadius * 3;
                ctx.fill();
            }

            ctx.restore();
        }

        // Util
        function getDistance(p1, p2) {
            return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
        }

    })();
}
