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
        initPortfolioFilter();
        initContactForm();
        initAnimations();
        loadPortfolioItems();
        initCanvasAnimation();

        console.log('AnJo Crafty static site loaded successfully!');
    }, 100);
});

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
    } else {
        console.log('Section not found:', targetId);
        // If section not found, show home
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
// PORTFOLIO FILTERING
// ===========================================

function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===========================================
// PORTFOLIO ITEMS (SAMPLE DATA)
// ===========================================

function loadPortfolioItems() {
    const portfolioGrid = document.getElementById('portfolio-grid');

    if (!portfolioGrid) return;

    // Sample portfolio items
    const portfolioItems = [
        {
            title: 'Anel de Noivado Personalizado',
            description: 'Design único em resina com detalhes em metal',
            category: 'design',
            image: 'https://via.placeholder.com/400x300/6366f1/ffffff?text=Anel+Personalizado'
        },
        {
            title: 'Máscara de Cosplay',
            description: 'Máscara detalhada para personagem de anime',
            category: 'cosplay',
            image: 'https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Máscara+Cosplay'
        },
        {
            title: 'Suporte para Fone',
            description: 'Impressão 3D funcional para organização',
            category: 'print',
            image: 'https://via.placeholder.com/400x300/10b981/ffffff?text=Suporte+Fone'
        },
        {
            title: 'Joia Geométrica',
            description: 'Design moderno com formas geométricas',
            category: 'design',
            image: 'https://via.placeholder.com/400x300/f59e0b/ffffff?text=Joia+Geométrica'
        },
        {
            title: 'Adereço de Halloween',
            description: 'Criação temática para festa',
            category: 'cosplay',
            image: 'https://via.placeholder.com/400x300/dc2626/ffffff?text=Adereço+Halloween'
        },
        {
            title: 'Organizador de Mesa',
            description: 'Peça funcional para escritório',
            category: 'print',
            image: 'https://via.placeholder.com/400x300/6366f1/ffffff?text=Organizador'
        }
    ];

    // Clear existing items
    portfolioGrid.innerHTML = '';

    // Add portfolio items
    portfolioItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'portfolio-item fade-in';
        itemElement.setAttribute('data-category', item.category);

        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="portfolio-item-content">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;

        portfolioGrid.appendChild(itemElement);
    });

    // Re-initialize filtering after loading items
    initPortfolioFilter();
}

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

            // Create formatted message
            const formattedMessage = `Olá! Sou ${name} (${email})\n\nMensagem:\n${message}`;

            // Copy to clipboard and open Instagram
            if (navigator.clipboard) {
                navigator.clipboard.writeText(formattedMessage).then(() => {
                    window.open('https://www.instagram.com/anjocrafty/', '_blank');
                    showNotification('Mensagem copiada! Instagram aberto.', 'success');
                    this.reset();
                }).catch(() => {
                    fallbackContact(formattedMessage);
                });
            } else {
                fallbackContact(formattedMessage);
            }
        });
    }
}

function fallbackContact(message) {
    window.open('https://www.instagram.com/anjocrafty/', '_blank');
    showNotification('Instagram aberto! Copie esta mensagem manualmente.', 'info');
    console.log('Mensagem para copiar:', message);
}

// ===========================================
// ANIMATIONS
// ===========================================

function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('section, .service-card, .portfolio-item').forEach(el => {
        observer.observe(el);
    });

    // Add initial fade-in class to visible elements
    setTimeout(() => {
        document.querySelectorAll('section, .service-card').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.classList.add('fade-in');
            }
        });
    }, 100);
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

    .portfolio-item {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
    }

    .portfolio-item.fade-in {
        opacity: 1;
        transform: translateY(0);
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
// CANVAS ANIMATION
// ===========================================

function initCanvasAnimation() {
    var canvas = document.getElementById('demo-canvas');
    var ctx = canvas.getContext('2d');
    var stars = [];
    var numStars = 200;
    var mouse = {x: 0, y: 0};

    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();

    // Create stars
    function createStars() {
        stars = [];
        for (var i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.8 + 0.2,
                speed: Math.random() * 0.5 + 0.1,
                twinkleSpeed: Math.random() * 0.02 + 0.01,
                twinkleOffset: Math.random() * Math.PI * 2
            });
        }
    }

    createStars();

    // Mouse tracking
    canvas.addEventListener('mousemove', function(e) {
        var rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw stars
        stars.forEach(function(star, index) {
            // Twinkle effect
            var twinkle = Math.sin(Date.now() * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7;

            // Mouse interaction
            var dx = mouse.x - star.x;
            var dy = mouse.y - star.y;
            var distance = Math.sqrt(dx * dx + dy * dy);
            var maxDistance = 100;

            if (distance < maxDistance) {
                var force = (maxDistance - distance) / maxDistance;
                star.x += (dx / distance) * force * 0.5;
                star.y += (dy / distance) * force * 0.5;
                twinkle *= 1.5;
            }

            // Draw star
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, ' + (star.opacity * twinkle) + ')';
            ctx.fill();

            // Draw connecting lines to nearby stars
            stars.slice(index + 1).forEach(function(otherStar) {
                var dx = otherStar.x - star.x;
                var dy = otherStar.y - star.y;
                var distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 80) {
                    ctx.beginPath();
                    ctx.moveTo(star.x, star.y);
                    ctx.lineTo(otherStar.x, otherStar.y);
                    ctx.strokeStyle = 'rgba(100, 150, 255, ' + (0.1 * (1 - distance / 80)) + ')';
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animate);
    }

    // Handle resize
    window.addEventListener('resize', function() {
        resizeCanvas();
        createStars();
    });

    animate();
}
