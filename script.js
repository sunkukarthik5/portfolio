// Professional Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE NAVIGATION TOGGLE =====
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link, .nav-btn');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // ===== SMOOTH SCROLLING =====
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

    // ===== FLOATING ACTION BUTTON =====
    const fabButton = document.getElementById('fabButton');
    const fabMenu = document.getElementById('fabMenu');
    
    if (fabButton && fabMenu) {
        fabButton.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            fabMenu.classList.toggle('active');
        });

        // Close FAB menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.fab-container')) {
                fabButton.classList.remove('active');
                fabMenu.classList.remove('active');
            }
        });

        // Prevent FAB menu from closing when clicking inside
        fabMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // ===== SKILL BAR ANIMATIONS =====
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            if (isElementInViewport(bar)) {
                bar.style.width = width + '%';
            }
        });
    }
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Initial animation and on scroll
    animateSkillBars();
    window.addEventListener('scroll', animateSkillBars);

    // ===== CIRCULAR PROGRESS BARS =====
    const progressCircles = document.querySelectorAll('.skill-progress-circle');
    
    function animateProgressCircles() {
        progressCircles.forEach(circle => {
            if (isElementInViewport(circle)) {
                const percentage = circle.getAttribute('data-percentage');
                const progressRing = circle.querySelector('.progress-ring-circle');
                const radius = progressRing.r.baseVal.value;
                const circumference = radius * 2 * Math.PI;
                
                progressRing.style.strokeDasharray = `${circumference} ${circumference}`;
                progressRing.style.strokeDashoffset = circumference;
                
                const offset = circumference - (percentage / 100) * circumference;
                setTimeout(() => {
                    progressRing.style.strokeDashoffset = offset;
                }, 100);
            }
        });
    }
    
    // Initial animation and on scroll
    animateProgressCircles();
    window.addEventListener('scroll', animateProgressCircles);

    // ===== ACTIVE NAV LINK ON SCROLL =====
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);

    // ===== PROJECT CARD HOVER EFFECTS =====
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    console.log('Portfolio initialized successfully!');
});

// ===== PERFORMANCE OPTIMIZATION =====
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

// Optimized scroll event listener
window.addEventListener('scroll', debounce(function() {
    // Scroll-related code here
}, 10));
