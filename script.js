// ===========================================
// ANJO CRAFTY - STATIC SITE JAVASCRIPT
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initPortfolioFilter();
    initContactForm();
    initAnimations();
    loadPortfolioItems();

    console.log('AnJo Crafty static site loaded successfully!');
});

// ===========================================
// NAVIGATION SYSTEM
// ===========================================

function initNavigation() {
    // Handle navigation buttons
    document.querySelectorAll('.nav-btn').forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            navigateToSection(target);
        });
    });

    // Handle back buttons
    document.querySelectorAll('.back-btn').forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            navigateToSection(target);
        });
    });
}

function navigateToSection(targetId) {
    // Hide all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.classList.add('active');
        // Scroll to top for better UX
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

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
