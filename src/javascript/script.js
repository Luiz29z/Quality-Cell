document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileBtn = document.getElementById('mobile_btn');
    const mobileMenu = document.getElementById('mobile_menu');
    const mobileIcon = mobileBtn.querySelector('i');

    mobileBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        mobileIcon.classList.toggle('fa-x');
    });

    // Header shadow on scroll
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;

        // Header shadow
        header.style.boxShadow = scrollPosition <= 0 
            ? 'none' 
            : '5px 1px 5px rgba(0, 0, 0, 0.1)';

        // Active section detection
        let activeSectionIndex = 0;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop - 119;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSectionIndex = index;
            }
        });

        // Update active nav item
        navItems.forEach(item => item.classList.remove('active'));
        navItems[activeSectionIndex].classList.add('active');
    });

    // Carousel functionality
    const track = document.querySelector('.carousel-track');
    const items = document.querySelectorAll('.carousel-item');
    
    if (track && items.length > 0) {
        // Clone items for infinite scroll effect
        items.forEach(item => {
            const clone = item.cloneNode(true);
            track.appendChild(clone);
        });
        
        let currentPosition = 0;
        const speed = 1; // Pixels per frame
        
        function moveCarousel() {
            currentPosition -= speed;
            
            // Reset position when reaching the end
            if (currentPosition <= -(items.length * (items[0].offsetWidth + 30))) {
                currentPosition = 0;
            }
            
            track.style.transform = `translateX(${currentPosition}px)`;
            requestAnimationFrame(moveCarousel);
        }
        
        // Start the carousel animation
        moveCarousel();
    }

    // ScrollReveal animations
    const sr = ScrollReveal();

    // Left side animations
    ['#cta', '.dish', '#testimonial_chef'].forEach(selector => {
        sr.reveal(selector, {
            origin: 'left',
            duration: selector === '#testimonial_chef' ? 1000 : 2000,
            distance: '20%'
        });
    });

    // Right side animations
    sr.reveal('.feedback', {
        origin: 'right',
        duration: 1000,
        distance: '20%'
    });
});
