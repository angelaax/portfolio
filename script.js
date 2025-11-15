document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

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

document.querySelectorAll('section:not(.hero)').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
    observer.observe(card);
});

document.querySelectorAll('.skill-category').forEach((category, index) => {
    category.style.opacity = '0';
    category.style.transform = 'translateX(-20px)';
    category.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
    observer.observe(category);
});

document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = `opacity 0.6s ease-out ${index * 0.15}s, transform 0.6s ease-out ${index * 0.15}s`;
    observer.observe(item);
});

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href').substring(1) === current) {
            link.style.color = '#EC4899';
        }
    });
});

const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            heroSubtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    setTimeout(typeWriter, 800);
}

const projectScreenshots = {
    'rice-bowl': {
        title: 'Rice in a Bowl – E-Commerce System',
        images: [
            'screenshots/rice-bowl-1.png',
            'screenshots/rice-bowl-2.png',
            'screenshots/rice-bowl-3.png'
        ]
    },
    'byte-brew': {
        title: 'Byte Brew – Coffee E-Commerce Website',
        images: [
            'screenshots/byte-brew-1.png',
            'screenshots/byte-brew-2.png',
            'screenshots/byte-brew-3.png'
        ]
    },
    'coffee-backend': {
        title: 'Coffee E-Commerce Backend',
        images: [
            'screenshots/coffee-backend-1.png',
            'screenshots/coffee-backend-2.png',
            'screenshots/coffee-backend-3.png'
        ]
    },
    'flappy-bird': {
        title: 'Flappy Bird Game',
        images: [
            'screenshots/flappy-bird-1.png',
            'screenshots/flappy-bird-2.png'
        ]
    },
    'endless-run': {
        title: 'Endless Run Game',
        images: [
            'screenshots/endless-run-1.png',
            'screenshots/endless-run-2.png'
        ]
    },
    'social-media-app': {
        title: 'Social Media Mobile App',
        images: [
            'screenshots/social-media-1.jpg',
            'screenshots/social-media-2.jpg'
        ]
    },
    'hotel-app': {
        title: 'Hotel Staff Task Management App',
        images: [
            'screenshots/hotel-app-1.png',
            'screenshots/hotel-app-2.png',
            'screenshots/hotel-app-3.png',
            'screenshots/hotel-app-4.png'
        ]
    },
    'fashion-ecommerce': {
        title: 'Fashion E-Commerce Website',
        images: [
            'screenshots/fashion-1.png',
            'screenshots/fashion-2.png',
            'screenshots/fashion-3.png'
        ]
    },
    'rhu-capstone': {
        title: 'RHU Centralized Inventory System',
        images: [
            'screenshots/rhu-1.png',
            'screenshots/rhu-3.png',
            'screenshots/rhu-2.png',
            'screenshots/rhu-4.png'
        ]
    }
};

const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalScreenshots = document.getElementById('modalScreenshots');
const modalCounter = document.getElementById('modalCounter');
const closeBtn = document.querySelector('.modal-close');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentProject = null;
let currentImageIndex = 0;

document.querySelectorAll('.btn-view-project').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const projectCard = this.closest('.project-card');
        const projectId = projectCard.getAttribute('data-project');
        openModal(projectId);
    });
});

function openModal(projectId) {
    currentProject = projectId;
    currentImageIndex = 0;
    const project = projectScreenshots[projectId];
    
    if (!project) {
        console.error('Project not found:', projectId);
        return;
    }
    
    modalTitle.textContent = project.title;
    modalScreenshots.innerHTML = '';
    
    project.images.forEach((imagePath, index) => {
        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = `${project.title} Screenshot ${index + 1}`;
        img.onerror = function() {
            this.src = 'https://via.placeholder.com/800x500?text=Screenshot+Coming+Soon';
        };
        if (index === 0) {
            img.classList.add('active');
        }
        modalScreenshots.appendChild(img);
    });
    
    updateModalCounter();
    updateNavigationButtons();
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    currentProject = null;
    currentImageIndex = 0;
}

function showImage(index) {
    const images = modalScreenshots.querySelectorAll('img');
    images.forEach((img, i) => {
        img.classList.remove('active');
        if (i === index) {
            img.classList.add('active');
        }
    });
    updateModalCounter();
    updateNavigationButtons();
}

function updateModalCounter() {
    const project = projectScreenshots[currentProject];
    if (project) {
        modalCounter.textContent = `${currentImageIndex + 1} / ${project.images.length}`;
    }
}

function updateNavigationButtons() {
    const project = projectScreenshots[currentProject];
    if (project) {
        prevBtn.disabled = currentImageIndex === 0;
        nextBtn.disabled = currentImageIndex === project.images.length - 1;
    }
}

closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});

prevBtn.addEventListener('click', function() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        showImage(currentImageIndex);
    }
});

nextBtn.addEventListener('click', function() {
    const project = projectScreenshots[currentProject];
    if (project && currentImageIndex < project.images.length - 1) {
        currentImageIndex++;
        showImage(currentImageIndex);
    }
});

document.addEventListener('keydown', function(event) {
    if (modal.style.display === 'block') {
        if (event.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (event.key === 'ArrowRight') {
            nextBtn.click();
        }
    }
});

console.log('%c👋 Hello there!', 'font-size: 20px; font-weight: bold; color: #EC4899;');
console.log('%cThanks for checking out my portfolio. Feel free to reach out!', 'font-size: 14px; color: #6B7280;');
console.log('%c📧 your.email@example.com', 'font-size: 14px; color: #10B981;');

