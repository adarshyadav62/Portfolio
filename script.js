/* ==================================================
   PORTFOLIO SCRIPTS
   Adarsh Yadav | Data Analyst Portfolio
   ================================================== */

// ─── DOM READY ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

    // Set current year in footer
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    initNavigation();
    initTypewriter();
    initScrollReveal();
    initActiveNavOnScroll();
    initPreloader();
});

// ─── PRELOADER ──────────────────────────────────────────
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    window.addEventListener('load', () => {
        // Add a small delay for a smoother experience
        setTimeout(() => {
            preloader.classList.add('fade-out');
            
            // Remove from DOM after transition to avoid any interaction issues
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 600);
        }, 500);
    });
}

// ─── NAVIGATION ──────────────────────────────────────────
function initNavigation() {
    const header    = document.getElementById('header');
    const navLinks  = document.getElementById('nav-links');
    const menuBtn   = document.getElementById('menu-toggle');
    const overlay   = document.getElementById('overlay');

    // Sticky header on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            overlay.classList.toggle('active', isOpen);
            menuBtn.innerHTML = isOpen
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });
    }

    // Close menu on overlay click
    if (overlay) {
        overlay.addEventListener('click', closeMobileMenu);
    }

    // Close menu on nav link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    function closeMobileMenu() {
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        if (menuBtn) {
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }
}

// ─── TYPEWRITER EFFECT ───────────────────────────────────
function initTypewriter() {
    const el = document.getElementById('typed-text');
    if (!el) return;

    const phrases = [
        'Aspiring Data Analyst',
        'Python Developer',
        'Data Visualization Expert',
        'Problem Solver',
        'Power BI Developer'
    ];

    let phraseIdx  = 0;
    let charIdx    = 0;
    let isDeleting = false;
    let delay      = 100;

    function type() {
        const current = phrases[phraseIdx];

        if (isDeleting) {
            el.textContent = current.substring(0, charIdx - 1);
            charIdx--;
            delay = 50;
        } else {
            el.textContent = current.substring(0, charIdx + 1);
            charIdx++;
            delay = 100;
        }

        if (!isDeleting && charIdx === current.length) {
            // Finished writing — pause, then start deleting
            delay = 1800;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            // Finished deleting — move to next phrase
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            delay = 400;
        }

        setTimeout(type, delay);
    }

    type();
}

// ─── SCROLL REVEAL ──────────────────────────────────────
function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal');

    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Stagger delay for siblings
                const siblings = entry.target.parentElement
                    ? [...entry.target.parentElement.children].filter(c => c.classList.contains('reveal'))
                    : [];
                const idx = siblings.indexOf(entry.target);
                const delay = Math.min(idx * 80, 400);

                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

// ─── ACTIVE NAV ON SCROLL ────────────────────────────────
function initActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => observer.observe(section));
}

// ─── CERTIFICATE MODAL ───────────────────────────────────
function openCertModal(fileSrc, title) {
    const modal = document.getElementById('certModal');
    const modalContent = document.getElementById('certModalContent');
    const modalTitle = document.getElementById('certModalTitle');

    if (modal && modalContent && modalTitle) {
        const isPDF = fileSrc.toLowerCase().endsWith('.pdf');
        
        let finalSrc = fileSrc;
        if (fileSrc.includes('assets/')) {
            // Path is already correct or needs no change if it matches our standard
            finalSrc = fileSrc;
        } else if (fileSrc.includes('assests/')) {
            finalSrc = fileSrc.replace('assests/', 'assets/');
        } else if (fileSrc.includes('asests/')) {
            finalSrc = fileSrc.replace('asests/', 'assets/');
        }
        
        if (isPDF) {
            modalContent.innerHTML = `<iframe src="${finalSrc}" class="cert-modal-pdf" frameborder="0"></iframe>`;
        } else {
            modalContent.innerHTML = `<img src="${finalSrc}" alt="${title}" id="certModalImg" class="cert-modal-img">`;
        }
        
        modalTitle.textContent = title;
        modal.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

function closeCertModal(event) {
    const modal = document.getElementById('certModal');
    // If event is provided, only close if clicking the background or the close button
    if (event) {
        if (event.target !== modal && !event.target.closest('.cert-modal-close')) {
            return;
        }
    }

    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = ''; // Restore scrolling
    }
}
