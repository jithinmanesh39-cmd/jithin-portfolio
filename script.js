// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor Implementation
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
const links = document.querySelectorAll('a, .project-card');

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

// Update mouse coordinates on movement
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Animate cursor using requestAnimationFrame for smoothness
function renderCursor() {
    // Lerp for smooth trailing effect
    cursorX += (mouseX - cursorX) * 0.5;
    cursorY += (mouseY - cursorY) * 0.5;
    
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    
    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;
    
    requestAnimationFrame(renderCursor);
}
renderCursor();

// Add hover state class to cursor
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.classList.add('hover-link');
        follower.classList.add('hover-link');
    });
    link.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover-link');
        follower.classList.remove('hover-link');
    });
});

// Initialization Animations (Hero Setup)
const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

// Hero text staggered reveal
tl.fromTo('.word', 
    { y: 150 },
    { y: 0, duration: 1, stagger: 0.15, delay: 0.2 }
)
.fromTo('.hero-subtitle',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 1 },
    "-=0.5"
)
.fromTo('.hero-actions',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8 },
    "-=0.6"
);

// Marquee Animation
const marqueeContent = document.querySelector('.marquee');
gsap.to(marqueeContent, {
    xPercent: -50,
    ease: "none",
    duration: 10,
    repeat: -1,
});

// ScrollTrigger Animations

// Work Section Header
gsap.fromTo('.section-header', 
    { opacity: 0, y: 100 },
    {
        opacity: 1, y: 0, duration: 1,
        scrollTrigger: {
            trigger: '.work',
            start: 'top 80%',
        }
    }
);

// Work Projects Stagger Reveal (Rolling 3D entrance)
gsap.fromTo('.project-card',
    { opacity: 0, rotationY: 90, z: -300, transformPerspective: 1000 },
    {
        opacity: 1, rotationY: 0, z: 0, duration: 1.2, stagger: 0.3, ease: 'power3.out',
        scrollTrigger: {
            trigger: '.project-grid',
            start: 'top 85%'
        }
    }
);

// Vanilla Tilt 3D "Rollable" Hover Effect
VanillaTilt.init(document.querySelectorAll(".project-card"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.3,
    perspective: 1000,
    scale: 1.05
});

// About Section Parallax and Reveal
const aboutTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.about',
        start: 'top 70%'
    }
});

aboutTl.fromTo('.about-text h2', { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8 })
       .fromTo('.about-text p', { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8 }, "-=0.6")
       .fromTo('.stat-item', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.2 }, "-=0.4")
       .fromTo('.about-visual', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.7)' }, "-=1");

// Contact Section Reveal
gsap.fromTo('.contact-content', 
    { opacity: 0, scale: 0.9 },
    {
        opacity: 1, scale: 1, duration: 1,
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 75%'
        }
    }
);

// Navbar Scroll Effect
let lastScrollY = window.scrollY;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.padding = '15px 5%';
        navbar.style.background = 'rgba(5, 5, 5, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
    } else {
        navbar.style.padding = '30px 5%';
        navbar.style.background = 'rgba(5, 5, 5, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// Scroll to top
document.getElementById('scrollTop').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ================= LIGHTBOX SLIDESHOW LOGIC =================
const videos = [
    "assets/REELS/.1final.mp4",
    "assets/REELS/ANU.mp4",
    "assets/REELS/AVAL.mp4",
    "assets/REELS/CLIENT.5.mp4",
    "assets/REELS/ICST.mp4",
    "assets/REELS/IFTHAR.mp4",
    "assets/REELS/YELLOWLUV.mp4",
    "assets/REELS/newyear acc 2026.mp4"
];

const posters = [
    "assets/POSTERS/1.jpg",
    "assets/POSTERS/Ajantha.jpg",
    "assets/POSTERS/Delma.jpg",
    "assets/POSTERS/EVENT.X.jpg",
    "assets/POSTERS/JR.AR.jpg",
    "assets/POSTERS/JR.ARCHITECT.jpg",
    "assets/POSTERS/JR.ESTIMATOR.jpg",
    "assets/POSTERS/Lohri.D.png",
    "assets/POSTERS/SLAYSYCN.jpg",
    "assets/POSTERS/aj.jpg",
    "assets/POSTERS/del.jpg"
];

const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightbox-content');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxNext = document.querySelector('.lightbox-next');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxCounter = document.getElementById('lightbox-counter');

let currentSlideIndex = 0;
let currentArray = [];

function openLightbox(mediaArray) {
    currentArray = mediaArray;
    currentSlideIndex = 0;
    
    // Build DOM
    lightboxContent.innerHTML = '';
    
    mediaArray.forEach((src, idx) => {
        const ext = src.split('.').pop().toLowerCase();
        let el;
        if (ext === 'mp4' || ext === 'webm') {
            el = document.createElement('video');
            el.src = src;
            el.controls = true;
            el.autoplay = true;
            el.loop = true;
        } else {
            el = document.createElement('img');
            el.src = src;
        }
        
        if (idx === 0) el.classList.add('active');
        lightboxContent.appendChild(el);
    });
    
    updateSlideData();
    lightbox.classList.add('active');
    
    // Play first video if it is one
    const firstMedia = lightboxContent.children[0];
    if (firstMedia.tagName.toLowerCase() === 'video') {
        firstMedia.play().catch(e => console.log(e));
    }
}

function closeLightbox() {
    lightbox.classList.remove('active');
    // Pause any playing videos
    const activeMedia = document.querySelector('.lightbox-content .active');
    if (activeMedia && activeMedia.tagName.toLowerCase() === 'video') {
        activeMedia.pause();
    }
    setTimeout(() => {
        lightboxContent.innerHTML = ''; 
    }, 400); // clear after fade out
}

function updateSlideData() {
    lightboxCounter.textContent = `${currentSlideIndex + 1} / ${currentArray.length}`;
    const slides = Array.from(lightboxContent.children);
    
    slides.forEach((slide, idx) => {
        if (idx === currentSlideIndex) {
            slide.classList.add('active');
            if (slide.tagName.toLowerCase() === 'video') slide.play().catch(e => {});
        } else {
            slide.classList.remove('active');
            if (slide.tagName.toLowerCase() === 'video') slide.pause();
        }
    });
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % currentArray.length;
    updateSlideData();
}

function prevSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + currentArray.length) % currentArray.length;
    updateSlideData();
}

// Event Listeners
document.getElementById('open-videos').addEventListener('click', () => openLightbox(videos));
document.getElementById('open-posters').addEventListener('click', () => openLightbox(posters));

lightboxNext.addEventListener('click', nextSlide);
lightboxPrev.addEventListener('click', prevSlide);
lightboxClose.addEventListener('click', closeLightbox);

// Close on background click
lightbox.addEventListener('click', (e) => {
    if(e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'Escape') closeLightbox();
});
