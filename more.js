// Education Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Active navigation link highlighting on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function setActiveNavLink() {
        let current = '';
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', debounce(setActiveNavLink, 10));

    // Animation on scroll
    const animateOnScroll = function() {
        const sections = document.querySelectorAll('.section-box');
        const cards = document.querySelectorAll('.card');
        const certCards = document.querySelectorAll('.cert-card');
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        // Animate sections
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionVisible = 150;
            
            if (sectionTop < window.innerHeight - sectionVisible) {
                section.classList.add('animate');
            }
        });
        
        // Animate cards
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const cardVisible = 100;
            
            if (cardTop < window.innerHeight - cardVisible) {
                card.classList.add('animate');
            }
        });
        
        // Animate certification cards
        certCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const cardVisible = 100;
            
            if (cardTop < window.innerHeight - cardVisible) {
                card.classList.add('animate');
            }
        });
        
        // Animate timeline items
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const itemVisible = 100;
            
            if (itemTop < window.innerHeight - itemVisible) {
                item.classList.add('animate');
            }
        });
    };
    
    // Initial animation check
    animateOnScroll();
    
    // Animate on scroll
    window.addEventListener('scroll', debounce(animateOnScroll, 10));
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add animation delays for staggered effect
    const cards = document.querySelectorAll('.card');
    const certCards = document.querySelectorAll('.cert-card');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    certCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    timelineItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });

    console.log('Education page initialized successfully!');
});

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}