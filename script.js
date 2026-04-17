
/* Counter */
document.addEventListener("DOMContentLoaded", () => {

    const counters = document.querySelectorAll('.stat-number');
    let started = false;

    const startCounters = () => {
        if (started) return;

        const section = document.querySelector('#stats');
        const sectionTop = section.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (sectionTop < screenHeight) {
            started = true;

            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                let start = 0;
                const increment = target / 100;

                const update = () => {
                    start += increment;

                    if (start < target) {
                        counter.innerText = Math.floor(start);
                        requestAnimationFrame(update);
                    } else {
                        counter.innerText = target;
                    }
                };

                update();
            });
        }
    };

    window.addEventListener('scroll', startCounters);
    startCounters(); // run once on load
});

document.addEventListener("DOMContentLoaded", () => {

    const track = document.querySelector('.testimonial-track');
    const dots = document.querySelectorAll('.dot');
    const cards = document.querySelectorAll('.testimonial-card');
    const nextBtn = document.querySelector('.arrow.right');
    const prevBtn = document.querySelector('.arrow.left');

    let index = 0;
    let interval;

    const total = cards.length;

    function updateSlider() {
        track.style.transform = `translateX(-${index * 100}%)`;

        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    }

    // NEXT
    function nextSlide() {
        index = (index + 1) % total; // infinite loop
        updateSlider();
    }

    // PREV
    function prevSlide() {
        index = (index - 1 + total) % total; // infinite loop
        updateSlider();
    }

    // DOT CLICK
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            index = i;
            updateSlider();
        });
    });

    // ARROWS
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // SWIPE
    let startX = 0;

    track.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
    });

    track.addEventListener('touchend', e => {
        let endX = e.changedTouches[0].clientX;

        if (startX - endX > 50) {
            nextSlide();
        } else if (endX - startX > 50) {
            prevSlide();
        }
    });

    // AUTO SLIDE
    function startAutoSlide() {
        interval = setInterval(nextSlide, 3000);
    }

    function stopAutoSlide() {
        clearInterval(interval);
    }

    // Pause on hover (better UX)
    track.addEventListener('mouseenter', stopAutoSlide);
    track.addEventListener('mouseleave', startAutoSlide);

    startAutoSlide();

});