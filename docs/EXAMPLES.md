# 📚 Exemples d'Utilisation - DROP IT Apps

Ce fichier contient des exemples pratiques pour utiliser et personnaliser DROP IT Apps.

## Table des Matières

1. [Exemples Firebase](#exemples-firebase)
2. [Personnalisation du Design](#personnalisation-du-design)
3. [Animations Personnalisées](#animations-personnalisées)
4. [Intégration API](#intégration-api)
5. [Composants Réutilisables](#composants-réutilisables)

---

## Exemples Firebase

### Ajouter un Témoignage

```javascript
// Fonction pour ajouter un témoignage
async function addTestimonial(testimonial) {
    try {
        await db.collection('testimonials').add({
            name: testimonial.name,
            role: testimonial.role,
            rating: testimonial.rating,
            content: testimonial.content,
            date: new Date().toISOString().split('T')[0],
            approved: false // À approuver par l'admin
        });
        
        console.log("✅ Témoignage ajouté avec succès");
        return true;
    } catch (error) {
        console.error("❌ Erreur:", error);
        return false;
    }
}

// Utilisation
addTestimonial({
    name: "Jean Dupont",
    role: "Entrepreneur",
    rating: 5,
    content: "Excellente application, je recommande !"
});
```

### Récupérer les Statistiques

```javascript
// Fonction pour récupérer les statistiques
async function getStatistics() {
    try {
        const statsDoc = await db.collection('statistics').doc('global').get();
        
        if (statsDoc.exists) {
            const stats = statsDoc.data();
            console.log("📊 Statistiques:", stats);
            return stats;
        }
    } catch (error) {
        console.error("❌ Erreur:", error);
        return null;
    }
}

// Utilisation
const stats = await getStatistics();
console.log(`Utilisateurs: ${stats.users}`);
```

### Mettre à Jour les Statistiques

```javascript
// Fonction pour incrémenter une statistique
async function incrementStat(field, amount = 1) {
    try {
        const statsRef = db.collection('statistics').doc('global');
        await statsRef.update({
            [field]: firebase.firestore.FieldValue.increment(amount)
        });
        
        console.log(`✅ ${field} incrémenté de ${amount}`);
        return true;
    } catch (error) {
        console.error("❌ Erreur:", error);
        return false;
    }
}

// Utilisation
incrementStat('downloadsDropit', 1);
incrementStat('users', 10);
```

### Envoyer un Message de Contact

```javascript
// Fonction pour envoyer un message
async function sendMessage(formData) {
    try {
        await db.collection('contactMessages').add({
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            read: false,
            status: 'new'
        });
        
        console.log("✅ Message envoyé");
        return true;
    } catch (error) {
        console.error("❌ Erreur:", error);
        return false;
    }
}

// Utilisation
sendMessage({
    name: "Marie Martin",
    email: "marie@exemple.com",
    subject: "support",
    message: "J'ai besoin d'aide..."
});
```

---

## Personnalisation du Design

### Changer le Thème de Couleurs

```css
/* Thème Bleu/Vert */
:root {
    --primary-color: #00b4d8;
    --secondary-color: #0077b6;
    --accent-color: #48cae4;
    --success-color: #06d6a0;
}

/* Thème Orange/Rouge */
:root {
    --primary-color: #ff6b35;
    --secondary-color: #f7931e;
    --accent-color: #c1121f;
    --success-color: #52b788;
}

/* Thème Sombre */
:root {
    --primary-color: #bb86fc;
    --secondary-color: #3700b3;
    --accent-color: #03dac6;
    --dark-color: #121212;
    --light-color: #1e1e1e;
}
```

### Créer un Nouveau Style de Carte

```css
/* Carte avec ombre néon */
.neon-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 0 20px rgba(58, 134, 255, 0.3);
    transition: all 0.3s ease;
}

.neon-card:hover {
    box-shadow: 0 0 30px rgba(58, 134, 255, 0.6);
    transform: translateY(-5px);
}

/* Carte glassmorphism */
.glass-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    padding: 2rem;
}
```

### Bouton Personnalisé

```css
/* Bouton avec effet de vague */
.wave-button {
    position: relative;
    overflow: hidden;
    padding: 1rem 2rem;
    border-radius: 50px;
    background: var(--primary-color);
    color: white;
    border: none;
    cursor: pointer;
}

.wave-button::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
}

.wave-button:active::before {
    width: 300px;
    height: 300px;
}
```

---

## Animations Personnalisées

### Animation de Compteur

```javascript
/**
 * Anime un compteur de 0 à une valeur cible
 * @param {string} elementId - ID de l'élément
 * @param {number} targetValue - Valeur cible
 * @param {number} duration - Durée en ms
 */
function animateCounter(elementId, targetValue, duration = 2000) {
    const element = document.getElementById(elementId);
    const start = 0;
    const increment = targetValue / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= targetValue) {
            current = targetValue;
            clearInterval(timer);
        }
        
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// Utilisation
animateCounter('user-count', 100000, 3000);
```

### Animation de Typing

```javascript
/**
 * Effet de texte qui s'écrit
 * @param {string} elementId - ID de l'élément
 * @param {string} text - Texte à afficher
 * @param {number} speed - Vitesse en ms
 */
function typingEffect(elementId, text, speed = 100) {
    const element = document.getElementById(elementId);
    let i = 0;
    
    element.textContent = '';
    
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

// Utilisation
typingEffect('hero-title', 'Bienvenue sur DROP IT Apps', 80);
```

### Animation de Particules

```javascript
/**
 * Crée des particules animées
 * @param {string} containerId - ID du conteneur
 * @param {number} particleCount - Nombre de particules
 */
function createParticles(containerId, particleCount = 50) {
    const container = document.getElementById(containerId);
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Position et style aléatoires
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 5 + 2}px;
            height: ${Math.random() * 5 + 2}px;
            background: rgba(58, 134, 255, ${Math.random()});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
        `;
        
        container.appendChild(particle);
    }
}

// Utilisation
createParticles('hero-section', 30);
```

---

## Intégration API

### Intégrer une API de Géolocalisation

```javascript
/**
 * Récupère la localisation de l'utilisateur
 * @returns {Promise<Object>} Position
 */
async function getUserLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Géolocalisation non supportée'));
            return;
        }
        
        navigator.geolocation.getCurrentPosition(
            position => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
            error => reject(error)
        );
    });
}

// Utilisation
try {
    const location = await getUserLocation();
    console.log('Position:', location);
} catch (error) {
    console.error('Erreur de localisation:', error);
}
```

### Intégrer une API de Paiement (Exemple)

```javascript
/**
 * Traite un paiement
 * @param {Object} paymentData - Données de paiement
 * @returns {Promise<Object>} Résultat
 */
async function processPayment(paymentData) {
    try {
        const response = await fetch('https://api.payment.com/charge', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_API_KEY'
            },
            body: JSON.stringify({
                amount: paymentData.amount,
                currency: 'XOF',
                phone: paymentData.phone,
                description: paymentData.description
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            console.log('✅ Paiement réussi');
            return result;
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error('❌ Erreur de paiement:', error);
        throw error;
    }
}

// Utilisation
processPayment({
    amount: 5000,
    phone: '+221771234567',
    description: 'Abonnement DROP IT PRO'
});
```

---

## Composants Réutilisables

### Modal Popup

```javascript
/**
 * Crée et affiche une modal
 * @param {string} title - Titre de la modal
 * @param {string} content - Contenu
 */
function showModal(title, content) {
    // Créer la modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    // Ajouter au DOM
    document.body.appendChild(modal);
    
    // Event listeners
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// CSS nécessaire
const modalStyles = `
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
}

.modal-content {
    background: white;
    border-radius: 20px;
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
}
`;
```

### Loader Personnalisé

```javascript
/**
 * Affiche/cache un loader
 * @param {boolean} show - Afficher ou cacher
 */
function toggleLoader(show = true) {
    let loader = document.getElementById('custom-loader');
    
    if (show && !loader) {
        loader = document.createElement('div');
        loader.id = 'custom-loader';
        loader.innerHTML = `
            <div class="loader-spinner">
                <div class="spinner"></div>
                <p>Chargement...</p>
            </div>
        `;
        document.body.appendChild(loader);
    } else if (!show && loader) {
        loader.remove();
    }
}

// Utilisation
toggleLoader(true);  // Afficher
setTimeout(() => toggleLoader(false), 2000);  // Cacher après 2s
```

### Toast Notification

```javascript
/**
 * Affiche une notification toast
 * @param {string} message - Message
 * @param {string} type - Type (success, error, info)
 */
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Animation d'entrée
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Suppression après 3s
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Utilisation
showToast('Action réussie !', 'success');
showToast('Erreur survenue', 'error');
showToast('Information importante', 'info');
```

---

## Tests

### Test de Validation Email

```javascript
// Fonction de test
function testEmailValidation() {
    const testCases = [
        { email: 'test@exemple.com', expected: true },
        { email: 'invalid.email', expected: false },
        { email: 'test@', expected: false },
        { email: '@exemple.com', expected: false }
    ];
    
    testCases.forEach(test => {
        const result = validateEmail(test.email);
        console.log(
            `Email: ${test.email} - ` +
            `Attendu: ${test.expected}, ` +
            `Résultat: ${result} - ` +
            `${result === test.expected ? '✅' : '❌'}`
        );
    });
}

// Exécuter les tests
testEmailValidation();
```

---

## Support

Pour plus d'exemples :
- 📧 Email : cheicknadevdot@gmail.com
- 💬 Issues : [GitHub Issues](https://github.com/votre-username/drop-it/issues)
- 📚 Documentation : [README.md](../README.md)

---

**Dernière mise à jour** : Janvier 2024
