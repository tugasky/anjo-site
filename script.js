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
        // Set initial button classes based on current mode
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

            navigateToSection(target);
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
// CANVAS ANIMATION - Interactive Network
// ===========================================

function initCanvasAnimation() {
    var width, height, canvas, ctx, points, target, animateHeader = true;

    // Main initialization
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

        // create points
        points = [];
        for(var x = 0; x < width; x = x + width/20) {
            for(var y = 0; y < height; y = y + height/20) {
                var px = x + Math.random()*width/20;
                var py = y + Math.random()*height/20;
                var p = {x: px, originX: px, y: py, originY: py };
                points.push(p);
            }
        }

        // for each point find the 5 closest points
        for(var i = 0; i < points.length; i++) {
            var closest = [];
            var p1 = points[i];
            for(var j = 0; j < points.length; j++) {
                var p2 = points[j]
                if(!(p1 == p2)) {
                    var placed = false;
                    for(var k = 0; k < 5; k++) {
                        if(!placed) {
                            if(closest[k] == undefined) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }

                    for(var k = 0; k < 5; k++) {
                        if(!placed) {
                            if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }
                }
            }
            p1.closest = closest;
        }

        // assign a circle to each point
        for(var i in points) {
            var c = new Circle(points[i], 2+Math.random()*2, 'rgba(255,255,255,0.3)');
            points[i].circle = c;
        }
    }

    // Event handling
    function addListeners() {
        if(!('ontouchstart' in window)) {
            window.addEventListener('mousemove', mouseMove);
        }
        window.addEventListener('resize', resize);
    }

    function mouseMove(e) {
        var posx = posy = 0;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY)    {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        target.x = posx;
        target.y = posy;
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        initHeader(); // Reinitialize points on resize
    }

    // animation
    function initAnimation() {
        animate();
        for(var i in points) {
            shiftPoint(points[i]);
        }
    }

    function animate() {
        if(animateHeader) {
            ctx.clearRect(0,0,width,height);
            for(var i in points) {
                // detect points in range
                if(Math.abs(getDistance(target, points[i])) < 4000) {
                    points[i].active = 0.3;
                    points[i].circle.active = 0.6;
                } else if(Math.abs(getDistance(target, points[i])) < 20000) {
                    points[i].active = 0.1;
                    points[i].circle.active = 0.3;
                } else if(Math.abs(getDistance(target, points[i])) < 40000) {
                    points[i].active = 0.02;
                    points[i].circle.active = 0.1;
                } else {
                    points[i].active = 0;
                    points[i].circle.active = 0;
                }

                drawLines(points[i]);
                points[i].circle.draw();
            }
        }
        requestAnimationFrame(animate);
    }

    function shiftPoint(p) {
        // Simple animation without TweenLite dependency
        setTimeout(function() {
            p.x = p.originX - 50 + Math.random() * 100;
            p.y = p.originY - 50 + Math.random() * 100;
            shiftPoint(p);
        }, 1000 + Math.random() * 1000);
    }

    // Canvas manipulation
    function drawLines(p) {
        if(!p.active) return;
        for(var i in p.closest) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.closest[i].x, p.closest[i].y);
            ctx.strokeStyle = 'rgba(156,217,249,'+ p.active+')';
            ctx.stroke();
        }
    }

    function Circle(pos,rad,color) {
        var _this = this;

        // constructor
        (function() {
            _this.pos = pos || null;
            _this.radius = rad || null;
            _this.color = color || null;
        })();

        this.draw = function() {
            if(!_this.active) return;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(156,217,249,'+ _this.active+')';
            ctx.fill();
        };
    }

    // Util
    function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }
}
