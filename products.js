        let currentSlideIndex = 0;
        const totalSlides = document.querySelectorAll('.carousel-slide').length;

        function showSlide(index) {
            const slidesContainer = document.getElementById('carousel-slides');
            const dots = document.querySelectorAll('.carousel-dot');
            
            // Update slide position
            slidesContainer.style.transform = `translateX(-${index * 25}%)`;
            
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
            currentSlideIndex = index;
        }

        function nextSlide() {
    const slides = document.querySelectorAll('.carousel-slide');
    const currentSlide = slides[currentSlideIndex];
    const video = currentSlide.querySelector('video');

    if (video) {
        // If there's a video, wait for it to end before moving to next slide
        if (!video.dataset.listenerAdded) {
            video.dataset.listenerAdded = true; // Prevent duplicate listeners
            video.addEventListener('ended', () => {
                const nextIndex = (currentSlideIndex + 1) % totalSlides;
                showSlide(nextIndex);
            });
        }
        return; // Stop auto-advance until video ends
    }

    // Normal image case → auto-advance after interval
    const nextIndex = (currentSlideIndex + 1) % totalSlides;
    showSlide(nextIndex);
}


        function previousSlide() {
            const prevIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
            showSlide(prevIndex);
        }

        function currentSlide(index) {
            showSlide(index - 1);
        }

        function playVideo() {
            alert('Video would play here! This is a demo placeholder.');
        }

        // Auto-play carousel
        setInterval(nextSlide, 4000);

        // Fade in animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Initialize first slide
        document.addEventListener('DOMContentLoaded', () => {
            showSlide(0);
        });
  