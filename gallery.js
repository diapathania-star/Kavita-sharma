// ==========================================
// EXHIBITION GALLERY FUNCTIONALITY
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const artworkCards = document.querySelectorAll('.artwork-card');
    
    if (filterButtons.length > 0 && artworkCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter artwork cards with smooth animation
                artworkCards.forEach((card, index) => {
                    const category = card.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        // Show card
                        setTimeout(() => {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, 10);
                        }, index * 50);
                    } else {
                        // Hide card
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Lightbox functionality
    const lightbox = document.getElementById('artworkLightbox');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxStory = document.getElementById('lightboxStory');
    const lightboxSize = document.getElementById('lightboxSize');
    const lightboxMedium = document.getElementById('lightboxMedium');
    const lightboxYear = document.getElementById('lightboxYear');
    const lightboxPrice = document.getElementById('lightboxPrice');
    const lightboxStatus = document.getElementById('lightboxStatus');
    
    // Open lightbox when artwork card is clicked
    artworkCards.forEach(card => {
        card.addEventListener('click', function() {
            const img = this.querySelector('.artwork-image-wrapper img');
            const title = this.querySelector('.artwork-title');
            const price = this.querySelector('.artwork-price');
            const status = this.querySelector('.artwork-status');
            
            // Get data attributes
            const currentLang = document.body.getAttribute('lang') || 'en';
            const storyKey = `data-story-${currentLang}`;
            const sizeKey = `data-size-${currentLang}`;
            const mediumKey = `data-medium-${currentLang}`;
            const priceKey = currentLang === 'en' ? 'data-price' : 'data-price-hi';
            const statusKey = `data-status-${currentLang}`;
            
            const story = this.getAttribute(storyKey) || this.getAttribute('data-story-en');
            const size = this.getAttribute(sizeKey) || this.getAttribute('data-size-en');
            const medium = this.getAttribute(mediumKey) || this.getAttribute('data-medium-en');
            const year = this.getAttribute('data-year');
            const priceValue = this.getAttribute(priceKey) || this.getAttribute('data-price');
            const statusValue = this.getAttribute(statusKey) || this.getAttribute('data-status-en');
            
            // Populate lightbox
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            
            // Clone title content to preserve language spans
            lightboxTitle.innerHTML = title.innerHTML;
            
            // Set story
            lightboxStory.textContent = story;
            
            // Set specs
            lightboxSize.textContent = size;
            lightboxMedium.textContent = medium;
            lightboxYear.textContent = year;
            lightboxPrice.textContent = priceValue;
            lightboxStatus.textContent = statusValue;
            
            // Add status class for styling
            lightboxStatus.className = 'spec-value';
            if (status.classList.contains('sold')) {
                lightboxStatus.style.opacity = '0.6';
            } else {
                lightboxStatus.style.opacity = '1';
            }
            
            // Show lightbox
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    // Close on background click
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === this) {
                closeLightbox();
            }
        });
    }
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    // Prevent lightbox content click from closing
    const lightboxContainer = document.querySelector('.lightbox-container');
    if (lightboxContainer) {
        lightboxContainer.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
});