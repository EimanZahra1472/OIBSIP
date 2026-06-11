// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Mobile menu styles
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 70px;
            left: 0;
            right: 0;
            background: var(--green);
            padding: 2rem;
            text-align: center;
            gap: 1rem;
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            if (hamburger && hamburger.classList.contains('active')) {
                hamburger.click();
            }
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(1, 65, 28, 0.98)';
        navbar.style.padding = '0.7rem 0';
    } else {
        navbar.style.background = 'rgba(1, 65, 28, 0.95)';
        navbar.style.padding = '1rem 0';
    }
});

// Animate stats on scroll
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const target = parseFloat(element.innerText);
            if (!isNaN(target) && !element.hasAttribute('data-animated')) {
                element.setAttribute('data-animated', 'true');
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        element.innerText = target;
                        clearInterval(timer);
                    } else {
                        element.innerText = Math.floor(current);
                    }
                }, 20);
            }
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(num => statsObserver.observe(num));

// Animate career stats
const careerStats = document.querySelectorAll('.stat-card .stat-number');
careerStats.forEach(stat => statsObserver.observe(stat));

// Add fade-in animation for timeline items
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, { threshold: 0.3 });

timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'all 0.5s ease';
    timelineObserver.observe(item);
});

// Add hover effect for achievement cards
const achievementCards = document.querySelectorAll('.achievement-card');
achievementCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Console tribute message
console.log('🇵🇰 Tribute to Imran Khan - Legendary Cricketer & Visionary Leader 🇵🇰');