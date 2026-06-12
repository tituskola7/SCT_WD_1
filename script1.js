document.addEventListener('DOMContentLoaded', () => {
    
    // DOM Elements Selector Cache Definitions
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    /* ==========================================================================
       1. Navbar Scroll Processing Handler
       ========================================================================== */
    const handleNavbarScroll = () => {
        // Toggle 'scrolled' class profile when scroll vertical dynamic shifts > 50px
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleNavbarScroll);


    /* ==========================================================================
       2. Mobile Responsive Hamburger Logic Drawer Setup
       ========================================================================== */
    const toggleMobileMenu = () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Handle accessibility attributes dynamically
        const isExpanded = hamburger.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isExpanded);
    };

    hamburger.addEventListener('click', toggleMobileMenu);

    // Close mobile menu layout cleanly when links are clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });


    /* ==========================================================================
       3. Scroll-Spy Feature Engine (Active Link Highlight Tracking)
       ========================================================================== */
    const scrollSpyOptions = {
        root: null, // viewport monitoring target boundary default
        rootMargin: '-20% 0px -60% 0px', // focused viewport offset range sweet-spot
        threshold: 0
    };

    const scrollSpyCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active styling flag profiles across all element items
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Read targeted active string reference key
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    };

    const scrollSpyObserver = new IntersectionObserver(scrollSpyCallback, scrollSpyOptions);
    sections.forEach(section => scrollSpyObserver.observe(section));


    /* ==========================================================================
       4. Visual Section Animation Reveal (Scroll-Induced Fade In)
       ========================================================================== */
    const revealOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px', // triggers slightly before elements emerge fully
        threshold: 0.15
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Discontinue observer tasks for this target object once view triggers are fulfilled
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    
    // Target content block elements selected to use fade animations classes
    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(element => revealObserver.observe(element));
});