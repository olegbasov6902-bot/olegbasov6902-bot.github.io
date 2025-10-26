document.addEventListener('DOMContentLoaded', function() {
    const galleryTrack = document.getElementById('galleryTrack');
    const prevButton = document.querySelector('.gallery-nav.prev');
    const nextButton = document.querySelector('.gallery-nav.next');
    const currentPageSpan = document.getElementById('currentPage');
    const totalPagesSpan = document.getElementById('totalPages');
    const pagerDots = document.getElementById('pagerDots');
    
    const totalSlides = 8;
    let currentSlide = 0;
    let slidesPerView = 3;
    let totalPages = 0;
    
    function getSlidesPerView() {
        const width = window.innerWidth;
        if (width <= 768) return 1;
        if (width <= 1024) return 2;
        return 3;
        }
    
    
    function calculateTotalPages() {
        slidesPerView = getSlidesPerView();
        totalPages = Math.ceil(totalSlides / slidesPerView);
        totalPagesSpan.textContent = totalPages;
    }
    
    
    function createPagerDots() {
        pagerDots.innerHTML = '';
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('div');
            dot.className = 'pager-dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToPage(i));
            pagerDots.appendChild(dot);
        }
    }
    
    
    function updatePagerDots() {
        const dots = pagerDots.querySelectorAll('.pager-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    
    function goToPage(pageIndex) {
        currentSlide = pageIndex;
        updateGalleryPosition();
        updatePagerInfo();
        updatePagerDots();
        updateNavButtons();
    }
    
    
    function updateGalleryPosition() {
        const slideWidth = 100 / slidesPerView;
        const translateX = -currentSlide * slideWidth;
        galleryTrack.style.transform = `translateX(${translateX}%)`;
    }
    
    
    function updatePagerInfo() {
        currentPageSpan.textContent = currentSlide + 1;
    }
    
    
    function updateNavButtons() {
        prevButton.disabled = currentSlide === 0;
        nextButton.disabled = currentSlide === totalPages - 1;
    }
    
    
    function nextSlide() {
        if (currentSlide < totalPages - 1) {
            currentSlide++;
            updateGalleryPosition();
            updatePagerInfo();
            updatePagerDots();
            updateNavButtons();
        }
    }
    
    
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateGalleryPosition();
            updatePagerInfo();
            updatePagerDots();
            updateNavButtons();
        }
    }
    
    
    function initGallery() {
        calculateTotalPages();
        createPagerDots();
        updateGalleryPosition();
        updatePagerInfo();
        updateNavButtons();
        
        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);
        
        window.addEventListener('resize', function() {
            const oldSlidesPerView = slidesPerView;
            calculateTotalPages();
            
            if (oldSlidesPerView !== slidesPerView) {
                createPagerDots();
                currentSlide = Math.min(currentSlide, totalPages - 1);
                updateGalleryPosition();
                updatePagerInfo();
                updatePagerDots();
                updateNavButtons();
            }
        });
        
        document.addEventListener('keydown', function(event) {
            if (event.key === 'ArrowLeft') prevSlide();
            if (event.key === 'ArrowRight') nextSlide();
        });
        
        console.log('Галерея инициализирована');
        console.log(`Слайдов: ${totalSlides}, На экране: ${slidesPerView}, Страниц: ${totalPages}`);
    }
    
    initGallery();
});