// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Event filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const eventCards = document.querySelectorAll('.event-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterCategory = this.getAttribute('data-category');
            
            // Filter event cards
            eventCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterCategory === 'all' || cardCategory === filterCategory) {
                    card.style.display = 'block';
                    card.classList.add('fade-in');
                } else {
                    card.style.display = 'none';
                    card.classList.remove('fade-in');
                }
            });
        });
    });

    // Gallery functionality
    const galleryButtons = document.querySelectorAll('.view-gallery-btn');
    const modal = document.getElementById('gallery-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalGalleryGrid = document.getElementById('modal-gallery-grid');
    const closeModal = document.querySelector('.close');
    const galleryContent = document.getElementById('gallery-content');

    // Event galleries data structure
    const eventGalleries = {
        'aksharabhyasa': {
            title: 'Aksharabhyasa Programme',
            description: 'Early literacy development activities',
        },
        'science-expo': {
            title: 'Science Expo',
            description: 'Hands-on science experiments and discovery',
        },
        'educational-trips': {
            title: 'Educational Trips',
            description: 'Learning expeditions and field trips',
        },
        'literary-competitions': {
            title: 'Literary Competitions',
            description: 'Drawing, Story telling, Science Quiz, Shloka chanting',
        },
        'regional-festivals': {
            title: 'Regional Festivities',
            description: 'Gokulashtami, Gowri-Ganesha, Gombe Habba, Suggi Habba',        
        },
        'cultural-fest': {
            title: 'Cultural Fest',
            description: 'Annual cultural celebrations',
        },
        'annual-day': {
            title: 'Annual Day',
            description: 'Grand celebration of the year',
        },
        'special-celebrations': {
            title: 'Special Celebrations',
            description: 'Holi, Christmas, New Year, Birthdays',
        },
        'national-festivals': {
            title: 'National Festivities',
            description: 'Independence Day, Republic Day, Children\'s Day',
        },
        'environment-day': {
            title: 'Environment Day',
            description: 'Environment sensitivity activities',
        },
        'sports-day': {
            title: 'Sports Day',
            description: 'Athletic competitions and fitness activities',
        },
        'kite-fest': {
            title: 'Kite Festival',
            description: 'Motor skill development through kite flying',
        },
        'yoga-wellness': {
            title: 'Yoga & Wellness',
            description: 'Yoga Day, Meditation, Mudra classes',
        },
        'community-lunch': {
            title: 'Community Lunch',
            description: 'Nutritious meals and cooking activities',
        },
        'community-helpers': {
            title: 'Community Helpers',
            description: 'Teacher\'s Day, Doctor\'s Day programs',
        },
        'relationship-building': {
            title: 'Relationship Building',
            description: 'Friendship Day, Rakshabandhan, Father\'s Day',
        },
        'colors-day': {
            title: 'Colors Day',
            description: 'Celebrating colors through creative activities',
        },
        'awards-graduation': {
            title: 'Awards & Graduation',
            description: 'Awards ceremony and graduation celebrations',
        }
    };

    // Gallery button click handlers
    galleryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const eventId = this.getAttribute('data-event');
            const eventData = eventGalleries[eventId];
            
            if (eventData) {
                showEventGallery(eventId, eventData);
            }
        });
    });

    function showEventGallery(eventId, eventData) {
        // Update gallery content section
        galleryContent.innerHTML = `
            <div class="event-gallery-header">
                <h3>${eventData.title}</h3>
                <p>${eventData.description}</p>
                <button class="view-in-modal-btn" onclick="openGalleryModal('${eventId}')">
                    View Full Gallery <i class="fas fa-expand"></i>
                </button>
            </div>
            <div class="gallery-grid">
                ${generateGalleryPlaceholders(eventData.photos, eventData.title)}
            </div>
        `;

        // Scroll to gallery section
        document.getElementById('gallery').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }

    function generateGalleryPlaceholders(count, eventTitle) {
        let placeholders = '';
        for (let i = 1; i <= count; i++) {
            placeholders += `
                <div class="gallery-item" onclick="showImagePlaceholder('${eventTitle}', ${i})">
                    <i class="fas fa-image"></i>
                    <p>Photo ${i}</p>
                </div>
            `;
        }
        return placeholders;
    }

    // Make functions globally accessible
    window.openGalleryModal = function(eventId) {
        const eventData = eventGalleries[eventId];
        if (eventData) {
            modalTitle.textContent = eventData.title;
            modalGalleryGrid.innerHTML = generateGalleryPlaceholders(eventData.photos, eventData.title);
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    };

    window.showImagePlaceholder = function(eventTitle, photoNumber) {
        alert(`Photo ${photoNumber} from ${eventTitle}\n\nThis is a placeholder for the actual photo. You can upload the real photos here.`);
    };

    // Close modal functionality
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Contact form functionality
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.program-card, .event-card, .contact-item');
    animateElements.forEach(el => observer.observe(el));

    // Add CSS for gallery content
    const galleryStyle = document.createElement('style');
    galleryStyle.textContent = `
        .event-gallery-header {
            text-align: center;
            margin-bottom: 2rem;
            padding: 2rem;
            background: white;
            border-radius: 15px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        }

        .event-gallery-header h3 {
            font-size: 2rem;
            color: #2d3748;
            margin-bottom: 1rem;
        }

        .event-gallery-header p {
            font-size: 1.1rem;
            color: #718096;
            margin-bottom: 1.5rem;
        }

        .view-in-modal-btn {
            background: #68d391;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }

        .view-in-modal-btn:hover {
            background: #4fd1c7;
            transform: translateY(-2px);
        }

        .gallery-item {
            transition: all 0.3s ease;
        }

        .gallery-item:hover {
            transform: scale(1.05);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 768px) {
            .event-gallery-header {
                padding: 1.5rem;
            }
            
            .event-gallery-header h3 {
                font-size: 1.5rem;
            }
        }
    `;
    document.head.appendChild(galleryStyle);
});

// Utility function for smooth scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Add loading animation for better UX
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add fade-in animation to hero content
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .cta-button, .hero-image');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        const modal = document.getElementById('gallery-modal');
        if (modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
});

// Add smooth hover effects
document.addEventListener('mouseover', function(e) {
    if (e.target.classList.contains('nav-link')) {
        e.target.style.transform = 'translateY(-2px)';
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.classList.contains('nav-link')) {
        e.target.style.transform = 'translateY(0)';
    }
});
