document.addEventListener("DOMContentLoaded", () => {
    const hamburgerMenu = document.getElementById("hamburger-menu");
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.querySelector(".main-content");
    const landingPage = document.createElement("div");

    // Hamburger menu toggle
    hamburgerMenu.addEventListener("click", (e) => {
        e.stopPropagation();
        mainContent.classList.toggle("menu-open");
        sidebar.classList.toggle("active");
        hamburgerMenu.classList.toggle("active");
    });

    // Close sidebar when clicking outside
    document.addEventListener("click", (e) => {
        if (!sidebar.contains(e.target) && !hamburgerMenu.contains(e.target)) {
            mainContent.classList.remove("menu-open");
            sidebar.classList.remove("active");
            hamburgerMenu.classList.remove("active");
        }
    });

    // JavaScript for infinite wheel and centering projects
    const wheel = document.querySelector('.projects-wheel');
    const cards = document.querySelectorAll('.project-card');
    let currentIndex = 0;

    // Clone cards for infinite effect
    cards.forEach(card => {
        const cloneBefore = card.cloneNode(true);
        const cloneAfter = card.cloneNode(true);
        wheel.insertBefore(cloneBefore, wheel.firstChild);
        wheel.appendChild(cloneAfter);
    });

    // Center a single project card
    const centerWheel = () => {
        const cardWidth = cards[0].offsetWidth;
        const wheelWidth = wheel.offsetWidth;
        const offset = (wheelWidth / 2) - (cardWidth / 2);
        wheel.scrollLeft = (currentIndex + cards.length) * cardWidth - offset;
    };

    // Set up automatic centering on scroll
    wheel.addEventListener('scroll', () => {
        centerWheel();
    });

    // Allow smooth scrolling for swiping projects
    const swipeWheel = (direction) => {
        currentIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
        centerWheel();
    };

    // Adding swipe gesture controls
    let startX;
    wheel.addEventListener('mousedown', (e) => {
        startX = e.pageX;
        wheel.classList.add('dragging');
    });

    wheel.addEventListener('mouseup', (e) => {
        wheel.classList.remove('dragging');
        if (e.pageX - startX > 50) {
            swipeWheel('prev');
        } else if (e.pageX - startX < -50) {
            swipeWheel('next');
        }
    });
});

