/**
 * DROP IT Apps - Script Principal
 * Gestion des interactions et des animations dynamiques
 */

// Configuration Firebase (à remplacer avec vos propres identifiants)
const firebaseConfig = {
    apiKey: "AIzaSyDZHA0ne_E4x9CzK_E29j5_tOYAjTtrnrM",
    authDomain: "drop-iibs.firebaseapp.com",
    projectId: "drop-iibs",
    storageBucket: "drop-iibs.firebasestorage.app",
    messagingSenderId: "113120592091",
    appId: "1:113120592091:web:2586508f5323aeeefe0cfe",
    measurementId: "G-S6JHM7K801"
};

let firebaseApp, db;

// Initialisation de Firebase
try {
    firebaseApp = firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    console.log("✅ Firebase initialisé avec succès");
} catch (error) {
    console.log("⚠️ Firebase non configuré, utilisation du mode démo");
}

// Données de démonstration
const demoTestimonials = [
    {
        name: "Marie Dubois",
        role: "Gérante de boutique",
        rating: 5,
        content: "DROP IT a révolutionné notre gestion de livraisons. L'interface est intuitive et le suivi en temps réel est un vrai plus pour rassurer nos clients !",
        date: "2024-03-15",
        avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
        name: "Pierre Lemoine",
        role: "Commerçant",
        rating: 5,
        content: "DROP TRADE m'a permis de sécuriser mes transactions commerciales. La plateforme est fiable et le support réactif. Une vraie révolution pour mon activité !",
        date: "2024-03-10",
        avatar: "https://i.pravatar.cc/150?img=2"
    },
    {
        name: "Sarah Konaté",
        role: "Directrice logistique",
        rating: 4,
        content: "La version PRO est parfaite pour notre entreprise. Les outils de gestion et les analytics nous ont permis d'optimiser nos routes de livraison de 30%.",
        date: "2024-03-05",
        avatar: "https://i.pravatar.cc/150?img=3"
    }
];

/**
 * Initialisation de l'application
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log("🚀 Initialisation de DROP IT Apps");
    
    // Initialiser la navigation
    initNavigation();
    
    // Mettre à jour l'année dans le footer
    updateFooterYear();
    
    // Charger les témoignages
    loadTestimonials();
    
    // Charger les statistiques
    loadStatistics();
    
    // Initialiser les formulaires
    initForms();
    
    // Initialiser les animations au scroll
    initScrollAnimations();
    
    // Initialiser les effets de parallaxe
    initParallax();
    
    // Ajouter des effets de particules au hero
    addParticles();
});

/**
 * Navigation
 */
function initNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const header = document.querySelector('header');
    
    // Menu mobile
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Fermer le menu au clic sur un lien
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
    
    // Effet de scroll sur le header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Mettre à jour le lien actif
        updateActiveNavLink();
    });
    
    // Smooth scroll pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Mettre à jour le lien actif dans la navigation
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const scrollY = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            current = sectionId;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

/**
 * Charger les témoignages
 */
async function loadTestimonials() {
    const container = document.getElementById('testimonialsContainer');
    const loader = document.getElementById('testimonialsLoader');
    
    if (!container) return;
    
    if (!db) {
        // Mode démo
        if (loader) loader.style.display = 'none';
        renderTestimonials(demoTestimonials);
        return;
    }
    
    try {
        if (loader) loader.style.display = 'block';
        
        const testimonialsRef = db.collection('testimonials');
        const snapshot = await testimonialsRef
            .where('approved', '==', true)
            .orderBy('date', 'desc')
            .limit(6)
            .get();
        
        const testimonials = [];
        snapshot.forEach(doc => {
            testimonials.push({ id: doc.id, ...doc.data() });
        });
        
        if (testimonials.length === 0) {
            renderTestimonials(demoTestimonials);
        } else {
            renderTestimonials(testimonials);
        }
        
        if (loader) loader.style.display = 'none';
    } catch (error) {
        console.error("❌ Erreur de chargement des témoignages:", error);
        if (loader) loader.style.display = 'none';
        renderTestimonials(demoTestimonials);
    }
}

/**
 * Afficher les témoignages
 */
function renderTestimonials(testimonials) {
    const container = document.getElementById('testimonialsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    testimonials.forEach((testimonial, index) => {
        const stars = '★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating);
        const date = new Date(testimonial.date).toLocaleDateString('fr-FR');
        
        const testimonialHTML = `
            <div class="testimonial-card fade-in animate-delay-${index % 3 + 1}">
                <div class="testimonial-rating">
                    ${stars}
                </div>
                <p>"${testimonial.content}"</p>
                <div class="testimonial-author">
                    <div>
                        <strong>${testimonial.name}</strong>
                        <div style="color: var(--gray-color); font-size: 0.9rem;">${testimonial.role}</div>
                        <div style="color: var(--gray-color); font-size: 0.8rem; margin-top: 0.25rem;">${date}</div>
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML += testimonialHTML;
    });
    
    // Réinitialiser les animations
    initScrollAnimations();
}

/**
 * Charger les statistiques
 */
async function loadStatistics() {
    if (!db) return;
    
    try {
        const statsRef = db.collection('statistics').doc('global');
        const doc = await statsRef.get();
        
        if (doc.exists) {
            const stats = doc.data();
            
            // Mettre à jour les statistiques avec animation
            animateCounter('stat-users', stats.users || 100000);
            animateCounter('stat-deliveries', stats.deliveries || 500000);
            document.getElementById('stat-rating').textContent = stats.rating?.toFixed(1) || '4.8';
            animateCounter('stat-countries', stats.countries || 50);
            animateCounter('downloads-dropit', stats.downloadsDropit || 50000);
            animateCounter('companies-pro', stats.companiesPro || 10000);
            animateCounter('transactions-trade', stats.transactionsTrade || 25000);
        }
    } catch (error) {
        console.error("❌ Erreur de chargement des statistiques:", error);
    }
}

/**
 * Animation des compteurs
 */
function animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const currentText = element.textContent;
    const isPercentage = currentText.includes('%');
    const isKFormat = currentText.includes('K+');
    const isDecimal = currentText.includes('.');
    
    let currentValue;
    if (isKFormat) {
        currentValue = parseFloat(currentText.replace('K+', '')) * 1000;
    } else if (isPercentage) {
        currentValue = parseFloat(currentText.replace('%', ''));
    } else if (isDecimal) {
        currentValue = parseFloat(currentText);
    } else {
        currentValue = parseInt(currentText.replace(/[^0-9]/g, '')) || 0;
    }
    
    const duration = 2000;
    const step = (targetValue - currentValue) / (duration / 16);
    
    let current = currentValue;
    const timer = setInterval(() => {
        current += step;
        
        if ((step > 0 && current >= targetValue) || (step < 0 && current <= targetValue)) {
            current = targetValue;
            clearInterval(timer);
        }
        
        if (isKFormat) {
            element.textContent = `${(current / 1000).toFixed(0)}K+`;
        } else if (isPercentage) {
            element.textContent = `${current.toFixed(0)}%`;
        } else if (isDecimal) {
            element.textContent = current.toFixed(1);
        } else {
            element.textContent = `${Math.floor(current).toLocaleString()}+`;
        }
    }, 16);
}

/**
 * Initialiser les formulaires
 */
function initForms() {
    initContactForm();
    initNewsletterForm();
}

/**
 * Formulaire de contact
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const formLoader = document.getElementById('formLoader');
    const submitBtn = document.getElementById('submitBtn');
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validation
        if (!name || !email || !subject || !message) {
            showNotification('Erreur', 'Veuillez remplir tous les champs obligatoires', 'error');
            return;
        }
        
        if (!validateEmail(email)) {
            showNotification('Erreur', 'Veuillez saisir une adresse email valide', 'error');
            return;
        }
        
        // Afficher le loader
        if (formLoader) formLoader.style.display = 'block';
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        
        try {
            if (db) {
                // Sauvegarder dans Firebase
                await db.collection('contactMessages').add({
                    name: name,
                    email: email,
                    subject: subject,
                    message: message,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    read: false
                });
            }
            
            // Simuler un délai
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Réinitialiser le formulaire
            contactForm.reset();
            
            // Notification de succès
            showNotification('Message envoyé !', 'Nous vous répondrons dans les plus brefs délais.', 'success');
            
        } catch (error) {
            console.error("❌ Erreur d'envoi du message:", error);
            showNotification('Erreur', 'Une erreur est survenue. Veuillez réessayer.', 'error');
        } finally {
            if (formLoader) formLoader.style.display = 'none';
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer le message';
        }
    });
}

/**
 * Formulaire newsletter
 */
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = this.querySelector('.newsletter-input').value;
        
        if (!validateEmail(email)) {
            showNotification('Erreur', 'Veuillez saisir une adresse email valide', 'error');
            return;
        }
        
        try {
            if (db) {
                const existingRef = await db.collection('newsletterSubscribers')
                    .where('email', '==', email)
                    .get();
                
                if (!existingRef.empty) {
                    showNotification('Déjà inscrit', 'Cette adresse est déjà inscrite', 'info');
                    return;
                }
                
                await db.collection('newsletterSubscribers').add({
                    email: email,
                    subscribedAt: firebase.firestore.FieldValue.serverTimestamp(),
                    active: true
                });
            }
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            newsletterForm.reset();
            showNotification('Inscription réussie !', 'Merci de vous être inscrit.', 'success');
            
        } catch (error) {
            console.error("❌ Erreur d'inscription:", error);
            showNotification('Erreur', 'Une erreur est survenue.', 'error');
        }
    });
}

/**
 * Validation d'email
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Système de notification
 */
function showNotification(title, message, type = 'success') {
    const notification = document.getElementById('notification');
    if (!notification) return;
    
    const titleElement = notification.querySelector('.notification-title');
    const messageElement = notification.querySelector('.notification-message');
    const iconElement = notification.querySelector('.notification-icon i');
    
    // Mettre à jour le contenu
    titleElement.textContent = title;
    messageElement.textContent = message;
    
    // Mettre à jour le type
    notification.className = 'notification';
    notification.classList.add(type);
    
    // Mettre à jour l'icône
    if (type === 'success') {
        iconElement.className = 'fas fa-check-circle';
    } else if (type === 'error') {
        iconElement.className = 'fas fa-exclamation-circle';
    } else {
        iconElement.className = 'fas fa-info-circle';
    }
    
    // Afficher
    notification.classList.add('show');
    
    // Cacher après 5s
    setTimeout(() => {
        hideNotification();
    }, 5000);
}

function hideNotification() {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.classList.remove('show');
    }
}

/**
 * Suivi des téléchargements
 */
async function trackDownload(app, platform) {
    event.preventDefault();
    
    showNotification('Téléchargement', `Préparation du téléchargement...`, 'success');
    
    if (db) {
        try {
            await db.collection('downloads').add({
                app: app,
                platform: platform,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                userAgent: navigator.userAgent
            });
            
            await updateDownloadStats(app);
        } catch (error) {
            console.error("❌ Erreur de suivi:", error);
        }
    }
    
    setTimeout(() => {
        if (platform === 'ios') {
            window.open('https://apps.apple.com', '_blank');
        } else {
            window.open('https://play.google.com', '_blank');
        }
    }, 1500);
}

/**
 * Mettre à jour les statistiques de téléchargement
 */
async function updateDownloadStats(app) {
    if (!db) return;
    
    try {
        const statsRef = db.collection('statistics').doc('global');
        const field = app === 'dropit' ? 'downloadsDropit' : 
                    app === 'pro' ? 'companiesPro' : 
                    'transactionsTrade';
        
        await statsRef.update({
            [field]: firebase.firestore.FieldValue.increment(1)
        });
        
        loadStatistics();
    } catch (error) {
        console.error("❌ Erreur de mise à jour:", error);
    }
}

/**
 * Initialiser les animations au scroll
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.app-card, .stat-card, .testimonial-card, .contact-item').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Effet de parallaxe
 */
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

/**
 * Ajouter des particules animées
 */
function addParticles() {
    // Cette fonction peut être étendue avec une bibliothèque de particules
    console.log("✨ Effet de particules initialisé");
}

/**
 * Mettre à jour l'année dans le footer
 */
function updateFooterYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Exposer les fonctions globales
window.trackDownload = trackDownload;
window.hideNotification = hideNotification;

console.log("✅ DROP IT Apps chargé avec succès");
