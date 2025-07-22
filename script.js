// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    
    // Éléments DOM
    const accordionButtons = document.querySelectorAll('.accordion-btn');
    const sessionCards = document.querySelectorAll('.session-card');
    const dateButtons = document.querySelectorAll('.date-btn');
    
    // Fonction pour gérer les accordéons
    function toggleAccordion(button, sessionCard) {
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        const icon = button.querySelector('i.fa-chevron-up, i.fa-chevron-down');
        
        // Toggle l'état
        button.setAttribute('aria-expanded', !isExpanded);
        
        // Animer l'icône Font Awesome
        if (icon) {
            if (isExpanded) {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
                icon.style.transform = 'rotate(0deg)';
            } else {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
                icon.style.transform = 'rotate(180deg)';
            }
        }
        
        // Toggle la classe active pour l'animation CSS
        sessionCard.classList.toggle('active');
        
        // Smooth scroll vers la séance si elle s'ouvre
        if (!isExpanded) {
            setTimeout(() => {
                sessionCard.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 300);
        }
    }
    
    // Fonction pour naviguer vers une séance spécifique
    function navigateToSession(sessionId) {
        // Retirer la classe active de tous les boutons et cartes
        dateButtons.forEach(btn => btn.classList.remove('active'));
        sessionCards.forEach(card => card.classList.remove('active'));
        
        // Ajouter la classe active au bouton cliqué
        const activeButton = document.querySelector(`[data-session="${sessionId}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
        
        // Trouver et activer la carte correspondante
        const targetCard = document.getElementById(sessionId);
        if (targetCard) {
            targetCard.classList.add('active');
            
            // Ouvrir l'accordéon automatiquement
            const accordionBtn = targetCard.querySelector('.accordion-btn');
            const icon = accordionBtn.querySelector('i.fa-chevron-up, i.fa-chevron-down');
            
            accordionBtn.setAttribute('aria-expanded', 'true');
            if (icon) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
                icon.style.transform = 'rotate(180deg)';
            }
            
            // Scroll vers la séance
            setTimeout(() => {
                targetCard.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    }
    
    // Event listeners pour les accordéons
    accordionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Empêcher la propagation vers le header
            const sessionCard = this.closest('.session-card');
            toggleAccordion(this, sessionCard);
        });
    });
    
    // Event listeners pour les headers de séance (cliquer sur le header ouvre aussi l'accordéon)
    sessionCards.forEach(card => {
        const header = card.querySelector('.session-header');
        const accordionBtn = card.querySelector('.accordion-btn');
        
        header.addEventListener('click', function(e) {
            // Ne pas déclencher si on clique sur le bouton accordéon
            if (!e.target.closest('.accordion-btn')) {
                toggleAccordion(accordionBtn, card);
            }
        });
    });
    
    // Event listeners pour la navigation des dates
    dateButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sessionId = this.getAttribute('data-session');
            navigateToSession(sessionId);
        });
    });
    
    // Fonction pour ajouter des effets de hover avancés (désactivé sur mobile)
    function addHoverEffects() {
        // Détecter si c'est un appareil tactile
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        if (!isTouchDevice) {
            sessionCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-8px) scale(1.02)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });
        }
    }
    
    // Fonction pour ajouter des animations au scroll
    function addScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observer les cartes de séance
        sessionCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }
    
    // Fonction pour ajouter un effet de ripple aux boutons (optimisé pour mobile)
    function addRippleEffect() {
        const buttons = document.querySelectorAll('button, .whatsapp-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Détecter si c'est un clic tactile ou souris
                const isTouch = e.type === 'touchstart' || e.type === 'touchend';
                const clientX = isTouch ? e.touches[0]?.clientX || e.changedTouches[0]?.clientX : e.clientX;
                const clientY = isTouch ? e.touches[0]?.clientY || e.changedTouches[0]?.clientY : e.clientY;
                
                if (clientX && clientY) {
                    const ripple = document.createElement('span');
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = clientX - rect.left - size / 2;
                    const y = clientY - rect.top - size / 2;
                    
                    ripple.style.width = ripple.style.height = size + 'px';
                    ripple.style.left = x + 'px';
                    ripple.style.top = y + 'px';
                    ripple.classList.add('ripple');
                    
                    this.appendChild(ripple);
                    
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                }
            });
        });
    }
    
    // Fonction pour ajouter un mode sombre (optionnel)
    function addDarkModeToggle() {
        const darkModeToggle = document.createElement('button');
        darkModeToggle.innerHTML = '🌙';
        darkModeToggle.className = 'dark-mode-toggle';
        darkModeToggle.title = 'Mode sombre';
        darkModeToggle.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #0057B8;
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 1.2rem;
            cursor: pointer;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0, 87, 184, 0.3);
            transition: all 0.3s ease;
        `;
        
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            this.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        });
        
        document.body.appendChild(darkModeToggle);
    }
    
    // Fonction pour ajouter une barre de progression
    function addProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #0057B8, #0078D4);
            z-index: 1001;
            transition: width 0.3s ease;
        `;
        
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }
    
    // Fonction pour ajouter des raccourcis clavier
    function addKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            // Échap pour fermer tous les accordéons
            if (e.key === 'Escape') {
                sessionCards.forEach(card => {
                    card.classList.remove('active');
                    const btn = card.querySelector('.accordion-btn');
                    const icon = btn.querySelector('i.fa-chevron-up, i.fa-chevron-down');
                    btn.setAttribute('aria-expanded', 'false');
                    if (icon) {
                        icon.classList.remove('fa-chevron-up');
                        icon.classList.add('fa-chevron-down');
                        icon.style.transform = 'rotate(0deg)';
                    }
                });
            }
            
            // Flèches pour naviguer entre les séances
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                const activeButton = document.querySelector('.date-btn.active');
                const currentIndex = Array.from(dateButtons).indexOf(activeButton);
                let newIndex;
                
                if (e.key === 'ArrowRight') {
                    newIndex = (currentIndex + 1) % dateButtons.length;
                } else {
                    newIndex = (currentIndex - 1 + dateButtons.length) % dateButtons.length;
                }
                
                const targetButton = dateButtons[newIndex];
                const sessionId = targetButton.getAttribute('data-session');
                navigateToSession(sessionId);
            }
        });
    }
    
    // Fonction pour ajouter des tooltips (désactivé sur mobile)
    function addTooltips() {
        // Détecter si c'est un appareil tactile
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        if (!isTouchDevice) {
            const tooltipElements = document.querySelectorAll('[title]');
            
            tooltipElements.forEach(element => {
                element.addEventListener('mouseenter', function(e) {
                    const tooltip = document.createElement('div');
                    tooltip.className = 'tooltip';
                    tooltip.textContent = this.getAttribute('title');
                    tooltip.style.cssText = `
                        position: absolute;
                        background: #333;
                        color: white;
                        padding: 8px 12px;
                        border-radius: 6px;
                        font-size: 0.9rem;
                        z-index: 1000;
                        pointer-events: none;
                        white-space: nowrap;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                    `;
                    
                    document.body.appendChild(tooltip);
                    
                    const rect = this.getBoundingClientRect();
                    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
                    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
                    
                    this.addEventListener('mouseleave', () => {
                        tooltip.remove();
                    });
                });
            });
        }
    }
    
    // Initialisation des fonctionnalités
    function init() {
        addHoverEffects();
        addScrollAnimations();
        addRippleEffect();
        addProgressBar();
        addKeyboardShortcuts();
        addTooltips();
        
        // Optionnel : ajouter le mode sombre
        // addDarkModeToggle();
        
        // Ajouter des styles CSS pour les effets
        const style = document.createElement('style');
        style.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .dark-mode {
                background-color: #1a1a1a !important;
                color: #ffffff !important;
            }
            
            .dark-mode .session-card {
                background: #2d2d2d !important;
                color: #ffffff !important;
                border-color: #404040 !important;
            }
            
            .dark-mode .date-navigation {
                background: #2d2d2d !important;
                border-color: #404040 !important;
            }
            
            .dark-mode .date-btn {
                background: #404040 !important;
                border-color: #555555 !important;
                color: #ffffff !important;
            }
            
            .dark-mode .session-header {
                background: linear-gradient(135deg, #404040 0%, #2d2d2d 100%) !important;
            }
            
            .dark-mode .session-tips {
                background: linear-gradient(135deg, #2d2d2d 0%, #404040 100%) !important;
            }
            
            .dark-mode-toggle:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 20px rgba(0, 87, 184, 0.4);
            }
        `;
        document.head.appendChild(style);
    }
    
    // Démarrer l'application
    init();
    
    // Ajouter un message de bienvenue dans la console
    console.log('🚀 Revit Récap - Site de révision des cours BIM');
    console.log('📚 Développé par Issoufou Abdou Chefou');
    console.log('💡 Raccourcis clavier :');
    console.log('   - Échap : Fermer tous les accordéons');
    console.log('   - Flèches gauche/droite : Naviguer entre les séances');
    
}); 