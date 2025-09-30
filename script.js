// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-out',
    once: true,
    offset: 100
});

// Loading Screen
window.addEventListener('load', function() {
    setTimeout(() => {
        document.querySelector('.loading-screen').classList.add('hidden');
        document.body.style.overflow = 'visible';
    }, 2000);
});


// Navigation functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');

// Set active navigation based on current page
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// Hamburger menu toggle
hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Parallax effect for hero section
const parallaxElements = document.querySelectorAll('.parallax-layer');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.2);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Number counter animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const countObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = parseInt(entry.target.getAttribute('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCount = () => {
                current += increment;
                if (current < target) {
                    entry.target.textContent = Math.floor(current);
                    requestAnimationFrame(updateCount);
                } else {
                    entry.target.textContent = target;
                    entry.target.classList.add('counted');
                }
            };
            
            updateCount();
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-number').forEach(stat => {
    countObserver.observe(stat);
});

// Timeline progress animation
const timelineProgress = document.querySelector('.timeline-progress');
const timelineSection = document.querySelector('.process-timeline');

if (timelineSection) {
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                timelineProgress.style.height = '100%';
            }
        });
    }, { threshold: 0.2 });
    
    timelineObserver.observe(timelineSection);
}



// Form handling
const contactForm = document.querySelector('.advanced-form');
const submitButton = document.querySelector('.submit-button-advanced');
const buttonLoader = document.querySelector('.button-loader');
const buttonText = submitButton.querySelector('span');
const buttonIcon = submitButton.querySelector('i');

if (contactForm) {
    // Add floating label effect
    const formFields = document.querySelectorAll('.form-field input, .form-field select, .form-field textarea');
    formFields.forEach(field => {
        if (field.value) {
            field.classList.add('has-value');
        }
        
        field.addEventListener('blur', function() {
            if (this.value) {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        buttonText.style.display = 'none';
        buttonIcon.style.display = 'none';
        buttonLoader.style.display = 'block';
        submitButton.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Reset form
            contactForm.reset();
            formFields.forEach(field => field.classList.remove('has-value'));
            
            // Show success state
            buttonLoader.style.display = 'none';
            buttonText.textContent = 'Message Sent!';
            buttonText.style.display = 'block';
            submitButton.style.background = 'linear-gradient(45deg, #10b981, #059669)';
            
            // Reset button after 3 seconds
            setTimeout(() => {
                buttonText.textContent = 'Send Message';
                buttonIcon.style.display = 'block';
                submitButton.style.background = '';
                submitButton.disabled = false;
            }, 3000);
        }, 2000);
    });
}

// CTA button effects
const ctaButtons = document.querySelectorAll('.cta-button');
ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.classList.contains('primary')) {
            // Navigate to contact page
            window.location.href = 'contact.html';
        } else if (this.classList.contains('video-btn')) {
            // Simulate video modal (in production, this would open a video modal)
            alert('Video feature coming soon!');
        }
    });
});

// Back to top button (disabled on pages where it doesn't exist)
const backToTopButton = document.querySelector('.back-to-top');
if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Learn more buttons on service cards
const learnMoreButtons = document.querySelectorAll('.learn-more');
learnMoreButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Navigate to services page
        window.location.href = 'services.html';
    });
});

// Book service button
const bookServiceButtons = document.querySelectorAll('.book-service-btn, .service-cta');
bookServiceButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Navigate to contact page
        window.location.href = 'contact.html';
    });
});

// Start chat functionality
const startChatButton = document.querySelector('.start-chat');
if (startChatButton) {
    startChatButton.addEventListener('click', function() {
        // In production, this would open a chat widget
        alert('Chat feature coming soon! Call us at (123) 456-7890 for immediate assistance.');
    });
}

// Testimonial carousel pause on hover
const testimonialTrack = document.querySelector('.testimonial-track');
if (testimonialTrack) {
    // Clone testimonials for infinite scroll
    const testimonials = testimonialTrack.innerHTML;
    testimonialTrack.innerHTML += testimonials;
}

// Add ripple effect to buttons
function createRipple(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect styles dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: rippleAnimation 0.6s ease-out;
    }
    
    @keyframes rippleAnimation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Apply ripple effect to all buttons
const allButtons = document.querySelectorAll('button, .cta-button, .emergency-button');
allButtons.forEach(button => {
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.addEventListener('click', createRipple);
});

// Smooth reveal for page elements
const revealElements = document.querySelectorAll('.section-header, .feature-card, .service-item');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(element);
});

// Emergency button pulse effect enhancement
const emergencyButtons = document.querySelectorAll('.emergency-button, .emergency-call-btn');
emergencyButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.animation = 'emergencyPulse 0.5s ease infinite';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.animation = '';
    });
});

// Add emergency pulse animation
const emergencyStyle = document.createElement('style');
emergencyStyle.textContent = `
    @keyframes emergencyPulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
`;
document.head.appendChild(emergencyStyle);

// Intersection Observer for advanced animations
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.2 });

// Apply to various elements
document.querySelectorAll('.highlight-3d-card, .timeline-item, .testimonial-card').forEach(el => {
    animateOnScroll.observe(el);
});

// Enhance mobile menu with smooth transitions
if (window.innerWidth <= 768) {
    navMenu.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
    
    // Press 'Enter' on focused buttons
    if (e.key === 'Enter' && document.activeElement.tagName === 'BUTTON') {
        document.activeElement.click();
    }
});

// Performance optimization: Throttle scroll events
let scrollTimer;
window.addEventListener('scroll', () => {
    if (scrollTimer) clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
        // Execute scroll-based animations
    }, 10);
});

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Ensure the main page content is visible
    const mainPage = document.querySelector('main.page');
    if (mainPage) {
        mainPage.classList.add('active');
    }
    
    // Initialize AOS animations
    AOS.refresh();
});

// Add page transition effects
const pageElement = document.querySelector('main.page');
if (pageElement) {
    pageElement.addEventListener('transitionend', () => {
        if (pageElement.classList.contains('active')) {
            AOS.refresh();
        }
    });
}

// Comment Carousel
const comments = [
    { username: "Robert M.", initials: "RM", text: "Called them for an emergency hot water system repair at 2am. They arrived within 30 minutes and had everything fixed in under an hour. Fantastic service and very reasonable pricing for emergency work.", timestamp: "April 2024" },
    { username: "Sarah J.", initials: "SJ", text: "Had my entire bathroom renovated including new plumbing. The team was professional, punctual, and extremely knowledgeable. They completed the work ahead of schedule and cleaned up thoroughly each day.", timestamp: "March 2024" },
    { username: "Michael C.", initials: "MC", text: "Outstanding service from start to finish. They installed our new gas hot water system with minimal disruption. The team explained everything clearly and provided excellent ongoing maintenance advice.", timestamp: "May 2024" },
    { username: "Jennifer W.", initials: "JW", text: "After trying several plumbers, I can confidently say this team stands out. They fixed our persistent leak issue that others couldn't solve. Fair pricing and honest recommendations throughout.", timestamp: "June 2024" },
    { username: "David T.", initials: "DT", text: "Impressed with their plumbing expertise. They upgraded our entire hot water system and guided us through the rebate process. The quality of workmanship exceeded our expectations completely.", timestamp: "February 2024" },
    { username: "Amanda R.", initials: "AR", text: "They completed the full plumbing for our restaurant renovation. All compliance work was flawless, and they worked seamlessly with our other contractors. The health inspector praised their work quality.", timestamp: "January 2024" },
    { username: "James W.", initials: "JW", text: "Emergency blocked drain response was incredible. They arrived quickly with proper equipment and had our drainage issue resolved efficiently. The team explained preventive measures clearly.", timestamp: "March 2024" },
    { username: "Patricia M.", initials: "PM", text: "Selected them for our new home's plumbing based on references, and they exceeded expectations. Meticulous planning, quality fixtures, and skilled craftsmen. The finished work is perfect.", timestamp: "April 2024" },
    { username: "Christopher L.", initials: "CL", text: "Five-star experience from initial consultation to project completion. They replumbed our entire house and installed a new hot water system. Clean, efficient, and very reasonably priced.", timestamp: "May 2024" },
    { username: "Elizabeth D.", initials: "ED", text: "Their team installed our commercial building's plumbing systems. They handled all the planning, permits, and coordination with other trades. Project completed on time despite supply delays.", timestamp: "June 2024" },
    { username: "Thomas A.", initials: "TA", text: "Remarkable attention to safety and quality. They updated our 1970s home plumbing to current standards. The crew was respectful of our property and cleaned up thoroughly each day.", timestamp: "February 2024" },
    { username: "Nancy B.", initials: "NB", text: "We've used their services for multiple rental properties over the past three years. Consistently reliable, professional, and fair. They stand behind their work and respond quickly to any issues.", timestamp: "January 2024" },
    { username: "Kevin M.", initials: "KM", text: "They designed and installed our complete home plumbing system. The integration with existing infrastructure was seamless and they provided excellent guidance throughout. Unmatched expertise.", timestamp: "April 2024" },
    { username: "Lisa T.", initials: "LT", text: "Hired them for our office building's hot water upgrade. They provided detailed cost projections that proved accurate. The new system has significantly improved efficiency. Great investment.", timestamp: "March 2024" },
    { username: "Daniel W.", initials: "DW", text: "Professional service from quote to completion. They handled our industrial facility's plumbing with expertise. Safety protocols were exemplary and they worked well with our operations team.", timestamp: "May 2024" },
    { username: "Mark S.", initials: "MS", text: "Emergency call at midnight for a burst pipe. They arrived in 20 minutes and had our water back on within the hour. Saved us from major water damage. Exceptional emergency service!", timestamp: "November 2024" },
    { username: "Rachel K.", initials: "RK", text: "Complete kitchen renovation plumbing. New gas lines, water supply, and drainage. Everything installed perfectly to code. The team was clean, efficient, and professional throughout.", timestamp: "October 2024" },
    { username: "Steven B.", initials: "SB", text: "Hot water system replacement done in record time. They coordinated with the gas company and handled all permits. Same day service and the new unit works perfectly.", timestamp: "September 2024" },
    { username: "Michelle P.", initials: "MP", text: "Blocked sewer line cleared professionally. They used camera inspection to identify the exact problem and provided a permanent solution. No mess, great service.", timestamp: "August 2024" },
    { username: "Andrew H.", initials: "AH", text: "Bathroom renovation with full re-plumb. Modern fixtures, excellent workmanship, and completed on schedule. The attention to detail was impressive. Highly recommended!", timestamp: "July 2024" },
    { username: "Jessica T.", initials: "JT", text: "Leak detection service saved us hundreds. Found hidden leaks we didn't know existed. Professional equipment and detailed explanation of all findings. Great value for money.", timestamp: "June 2024" },
    { username: "Robert F.", initials: "RF", text: "Commercial building plumbing maintenance contract. Always reliable, prompt responses, and preventive care that saves us money. Been using them for 5 years now.", timestamp: "December 2023" },
    { username: "Sandra L.", initials: "SL", text: "Gas fitting for new BBQ and patio heater. Licensed gas fitter, proper permits, and safety inspection included. Professional service from start to finish.", timestamp: "November 2023" },
    { username: "Tony M.", initials: "TM", text: "Drain cleaning service that actually works. Used advanced equipment to clear years of buildup. Provided maintenance tips to prevent future blockages. Excellent follow-up service.", timestamp: "October 2023" },
    { username: "Lauren C.", initials: "LC", text: "New construction plumbing for our custom home. Worked closely with our builder, met all deadlines, and delivered quality installation. The team was professional and knowledgeable.", timestamp: "September 2023" }
];

function createCommentCard(comment) {
    return `
        <div class="comment-card">
            <div class="comment-header">
                <div class="avatar">${comment.initials}</div>
                <div class="user-info">
                    <div class="username">${comment.username}</div>
                    <div class="timestamp">${comment.timestamp}</div>
                </div>
                <div class="stars">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                </div>
            </div>
            <div class="comment-text">${comment.text}</div>
        </div>
    `;
}

function populateRows() {
    const topRow = document.getElementById('topRow');
    const bottomRow = document.getElementById('bottomRow');
    
    if (!topRow || !bottomRow) {
        console.error('Could not find carousel elements');
        return;
    }

    // Build a base sequence (repeat a few times to ensure wide track)
    const baseRepeats = 3; // light DOM, enough width
    const buildSequence = (source) => {
        let out = '';
        for (let i = 0; i < baseRepeats; i++) {
            for (const c of source) out += createCommentCard(c);
        }
        return out;
    };

    // Prepare base tracks
    const topBase = buildSequence(comments);
    const bottomBase = buildSequence([...comments].reverse());

    // Set content and duplicate once to create a perfect seamless loop with translateX(-50%) keyframes
    topRow.innerHTML = topBase + topBase;
    bottomRow.innerHTML = bottomBase + bottomBase;
}

// Immediate population - no delays
console.log('Starting immediate carousel population...');

// Try to populate immediately
if (document.getElementById('topRow')) {
    populateRows();
} else {
    // If elements not ready, use minimal delay
    setTimeout(populateRows, 1);
}

// Initialize the carousel multiple ways to ensure it loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded - populating carousel');
    populateRows();
});

window.addEventListener('load', function() {
    console.log('Window loaded - populating carousel');
    populateRows();
});

// Backup population attempts
setTimeout(populateRows, 50);
setTimeout(populateRows, 500);

console.log('One Stop Plumbing website loaded successfully! 🚿');

// Handle mobile card tap interactions for Premium Plumbing Services
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.highlight-3d-card');
    
    cards.forEach(card => {
        let isFlipped = false;
        
        // Handle touch/click events for mobile
        function handleCardInteraction(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                
                if (!isFlipped) {
                    card.classList.add('flipped');
                    isFlipped = true;
                } else {
                    card.classList.remove('flipped');
                    isFlipped = false;
                }
            }
        }
        
        card.addEventListener('touchstart', handleCardInteraction);
        card.addEventListener('click', handleCardInteraction);
        
        // Reset flip state when clicking outside (mobile only)
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && !card.contains(e.target) && isFlipped) {
                card.classList.remove('flipped');
                isFlipped = false;
            }
        });
    });
    
    // Handle Service card flip effect - Mobile click, Desktop hover
    const serviceItems = document.querySelectorAll('.service-item');
    const serviceCards = document.querySelectorAll('.service-card-advanced');
    const serviceButtons = document.querySelectorAll('.service-cta');
    
    // Prevent glitchy hover on desktop by using pointer events properly
    if (window.innerWidth > 768) {
        serviceItems.forEach(item => {
            let hoverTimeout;
            
            item.addEventListener('mouseenter', function() {
                clearTimeout(hoverTimeout);
                const card = this.querySelector('.service-card-advanced');
                if (card && !card.classList.contains('hovering')) {
                    card.classList.add('hovering');
                }
            });
            
            item.addEventListener('mouseleave', function() {
                const card = this.querySelector('.service-card-advanced');
                if (card) {
                    hoverTimeout = setTimeout(() => {
                        card.classList.remove('hovering');
                    }, 100);
                }
            });
        });
    }
    
    serviceButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Only handle click on mobile (768px and below)
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                
                // Find the service card
                const serviceCard = this.closest('.service-card-advanced');
                if (serviceCard) {
                    // Toggle the flip effect
                    serviceCard.classList.toggle('flipped');
                }
            }
            // On desktop, hover handles the flip automatically
        });
        
        // Add touch event for better mobile responsiveness
        button.addEventListener('touchstart', function(e) {
            if (window.innerWidth <= 768) {
                // Add visual feedback for touch
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    });
    
    // Reset flip state when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            serviceCards.forEach(card => {
                if (!card.contains(e.target) && card.classList.contains('flipped')) {
                    card.classList.remove('flipped');
                }
            });
        }
    });
});
