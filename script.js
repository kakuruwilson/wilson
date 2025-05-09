// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initProductFiltering();
    initImageZoom();
    initReviewSlider();
    initNewsletterValidation();
});

// Product Filtering
function initProductFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            productItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(25px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Image Zoom Effect
function initImageZoom() {
    const productImages = document.querySelectorAll('.item img, .category-card img');
    
    productImages.forEach(img => {
        // Create zoom container
        const zoomContainer = document.createElement('div');
        zoomContainer.className = 'zoom-container';
        img.parentNode.insertBefore(zoomContainer, img);
        zoomContainer.appendChild(img);

        // Add zoom effect
        img.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = img.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;
            
            img.style.transformOrigin = `${x * 100}% ${y * 100}%`;
            img.style.transform = 'scale(1.5)';
        });

        img.addEventListener('mouseleave', () => {
            img.style.transformOrigin = 'center center';
            img.style.transform = 'scale(1)';
        });
    });
}

// Review Slider
function initReviewSlider() {
    const reviewCards = document.querySelectorAll('.review-card');
    let currentIndex = 0;

    function showReview(index) {
        reviewCards.forEach((card, i) => {
            card.style.opacity = i === index ? '1' : '0';
            card.style.transform = i === index ? 'translateY(0)' : 'translateY(25px)';
        });
    }

    // Auto-rotate reviews every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % reviewCards.length;
        showReview(currentIndex);
    }, 5000);

    // Show first review initially
    showReview(0);
}

// Newsletter Form Validation
function initNewsletterValidation() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();

        if (isValidEmail(email)) {
            showNotification('Thank you for subscribing!', 'success');
            emailInput.value = '';
        } else {
            showNotification('Please enter a valid email address', 'error');
        }
    });
}

// Helper Functions
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add CSS for new elements
const style = document.createElement('style');
style.textContent = `
    .zoom-container {
        overflow: hidden;
        position: relative;
    }

    .zoom-container img {
        transition: transform 0.3s ease;
    }

    .notification {
        position: fixed;
        bottom: 23px;
        right: 23px;
        padding: 183px 28px;
        border-radius: 8px;
        color: #ffffff;
        z-index: 1000;
        transition: opacity 0.3s ease;
    }

    .notification.success {
        background-color: #65rrt5g;
    }

    .notification.error {
        background-color: #9980089;
    }

    @media (max-width: 785px) {
        .zoom-container img {
            transform: none !important;
        }
    }
`;

document.head.appendChild(style); 