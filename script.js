// Prevent browser from restoring scroll position on reload
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

// Remove hash on load to prevent jumping to sections
if (window.location.hash) {
    window.history.replaceState('', document.title, window.location.pathname + window.location.search);
}

// Remove preloader on window load
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

document.addEventListener('DOMContentLoaded', () => {

    // Force scroll top on load just in case
    window.scrollTo(0, 0);
    // 1. Scroll Reveal Animations
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // 2. Scroll Progress Bar
    const progressBar = document.getElementById('scroll-progress');
    const mainHeader = document.getElementById('main-header'); // Reference to the new header

    window.addEventListener('scroll', () => {
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progressHeight = (window.pageYOffset / totalHeight) * 100;
        progressBar.style.width = progressHeight + '%';

        // Handle sticky header styling on scroll
        if (mainHeader) {
            if (window.scrollY > 50) {
                mainHeader.classList.add('scrolled');
            } else {
                mainHeader.classList.remove('scrolled');
            }
        }
    });

    // 3. Typing Effect for Hero Title
    const typewriterElement = document.getElementById('typewriter-text');
    const roleString = "Marketing Strategist & Digital Marketing Specialist";
    let i = 0;

    const typeWriter = () => {
        if (i < roleString.length) {
            typewriterElement.innerHTML += roleString.charAt(i);
            i++;
            setTimeout(typeWriter, 50); // Typing speed
        }
    };

    // Start typing effect slightly after page load
    setTimeout(typeWriter, 1000);

    // 4. Update progress bars on sidebar based on intersection so they animate when visible
    const skillBars = document.querySelectorAll('.sidebar-inner .progress-line span');

    // Trigger the initial scale animation for skill bars
    setTimeout(() => {
        skillBars.forEach(bar => {
            bar.style.transform = 'scaleX(1)';
        });
    }, 500);
});
