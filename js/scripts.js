// Store the last scroll position
let lastScrollTop = 0;

// Detect the scroll event
window.addEventListener('scroll', function() {
    let mainNav = document.getElementById('main-nav');
    let container = document.querySelector('.container');

    // Check the scroll position
    if (window.pageYOffset > lastScrollTop) {
        // User is scrolling down, hide the navigation and container
        mainNav.classList.add('hidden');
        container.classList.add('hidden');
    } else {
        // User is scrolling up, show the navigation and container
        mainNav.classList.remove('hidden');
        container.classList.remove('hidden');
    }

    // Update the last scroll position
    lastScrollTop = window.pageYOffset <= 0 ? 0 : window.pageYOffset;
});
document.addEventListener('DOMContentLoaded', function() {
    const updateProgressBtn = document.getElementById('update-progress');
    const sobrietyDaysInput = document.getElementById('sobriety-days');
    const progressBar = document.querySelector('.progress-bar');
    const motivationMessage = document.getElementById('motivation-message');

    // Progress Tracker
    updateProgressBtn.addEventListener('click', function() {
        const days = parseInt(sobrietyDaysInput.value);
        let percentage = Math.min(days / 90 * 100, 100);
        progressBar.style.width = percentage + '%';
        progressBar.setAttribute('aria-valuenow', percentage);
        progressBar.textContent = percentage.toFixed(0) + '%';

        updateMotivationMessage(days);
        localStorage.setItem('sobrietyDays', days);
    });

    function updateMotivationMessage(days) {
        let message = '';
        if (days === 0) {
            message = 'আপনার যাত্রা শুরু করুন! প্রতিটি দিন গুরুত্বপূর্ণ।';
        } else if (days < 7) {
            message = 'চমৎকার শুরু! প্রথম সপ্তাহ সবচেয়ে কঠিন, আপনি এটি করতে পারবেন।';
        } else if (days < 30) {
            message = 'আপনি অসাধারণ কাজ করছেন! আপনার নতুন অভ্যাসগুলি গড়ে উঠছে।';
        } else if (days < 90) {
            message = 'অভিনন্দন! আপনি একটি বড় পরিবর্তন করছেন। এভাবেই চালিয়ে যান।';
        } else {
            message = 'অসাধারণ! আপনি 90 দিনের মাইলফলক অতিক্রম করেছেন। আপনার নতুন জীবনযাত্রা চালিয়ে যান।';
        }
        motivationMessage.textContent = message;
    }

    // Load saved progress
    if (localStorage.getItem('sobrietyDays')) {
        sobrietyDaysInput.value = localStorage.getItem('sobrietyDays');
        updateProgressBtn.click();
    }

    // Smooth scrolling for navigation
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Highlight active navigation item
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');
        
        question.addEventListener('click', () => {
            answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
        });
    });

    // Success Stories Slider
    const storySlider = document.querySelector('.story-slider');
    let isDown = false;
    let startX;
    let scrollLeft;

    storySlider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - storySlider.offsetLeft;
        scrollLeft = storySlider.scrollLeft;
    });

    storySlider.addEventListener('mouseleave', () => {
        isDown = false;
    });

    storySlider.addEventListener('mouseup', () => {
        isDown = false;
    });

    storySlider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - storySlider.offsetLeft;
        const walk = (x - startX) * 3;
        storySlider.scrollLeft = scrollLeft - walk;
    });
});
