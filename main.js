document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SCROLL ANIMATIONS (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => observer.observe(el));


    // 2. FAQ ACCORDION LOGIC
    const faqBtns = document.querySelectorAll('.faq-btn');
    
    faqBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Toggle current
            this.classList.toggle('active');
            
            const content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
            
            // Optional: close others
            /*
            faqBtns.forEach(otherBtn => {
                if (otherBtn !== this && otherBtn.classList.contains('active')) {
                    otherBtn.classList.remove('active');
                    otherBtn.nextElementSibling.style.maxHeight = null;
                }
            });
            */
        });
    });


    // 3. FAKE RECENT SALES NOTIFICATIONS (Conversion Booster)
    const notification = document.getElementById('sales-notification');
    const buyerNameEl = document.getElementById('buyer-name');
    const buyerLocationEl = document.getElementById('buyer-location');
    const buyerTimeEl = document.getElementById('buyer-time');

    const names = ['Carlos M.', 'Laura F.', 'Martín G.', 'Diego S.', 'Ana P.', 'Javier T.', 'Lucía R.', 'Roberto V.'];
    const locations = ['Madrid', 'Buenos Aires', 'CDMX', 'Bogotá', 'Santiago', 'Valencia', 'Córdoba', 'Monterrey'];
    
    // Show random notification
    function showNotification() {
        // Randomize data
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomLoc = locations[Math.floor(Math.random() * locations.length)];
        const randomTime = Math.floor(Math.random() * 15) + 1; // 1 to 15 mins

        buyerNameEl.textContent = randomName;
        buyerLocationEl.textContent = randomLoc;
        buyerTimeEl.textContent = randomTime;

        // Show
        notification.classList.add('show');

        // Hide after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }

    // Initial timeout before first notification
    setTimeout(() => {
        showNotification();
        
        // Setup interval for subsequent notifications
        setInterval(() => {
            showNotification();
        }, Math.floor(Math.random() * (25000 - 15000 + 1) + 15000)); // Every 15-25 seconds
        
    }, 8000); // 8 seconds after load

    // 4. SMOOTH SCROLL FOR ANCHOR LINKS
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

    // 5. COUNTDOWN TIMER LOGIC
    const timerDisplays = document.querySelectorAll('.timer-display');
    
    if (timerDisplays.length > 0) {
        // Set countdown time (15 minutes = 15 * 60 seconds)
        let totalSeconds = 15 * 60;
        
        // Retrieve from localStorage if exists so it doesn't reset on refresh
        const savedTime = localStorage.getItem('urgencyCountdown');
        if (savedTime && !isNaN(savedTime) && parseInt(savedTime) > 0) {
            totalSeconds = parseInt(savedTime);
        }
        
        function updateTimers() {
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            
            const displayStr = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            timerDisplays.forEach(display => {
                display.textContent = displayStr;
            });
            
            if (totalSeconds > 0) {
                totalSeconds--;
                localStorage.setItem('urgencyCountdown', totalSeconds.toString());
            } else {
                // When reaches 0, maybe stick at 00:00 or reset to 15m
                totalSeconds = 15 * 60; // reset for demo purposes
            }
        }
        
        updateTimers(); // Initial call
        setInterval(updateTimers, 1000);
    }
});
