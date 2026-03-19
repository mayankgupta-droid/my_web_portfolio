document.addEventListener('DOMContentLoaded', () => {
    // 1. SELECTORS
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const revealElements = document.querySelectorAll('.reveal');

    // 2. SCROLL REVEAL ANIMATION (Intersection Observer)
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 3. ACTIVE LINK HIGHLIGHT ON SCROLL
    window.addEventListener('scroll', () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });

        // Navbar Scroll Effect
        const nav = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            nav.style.height = "70px";
            nav.style.backgroundColor = "rgba(11, 15, 25, 0.95)";
        } else {
            nav.style.height = "80px";
            nav.style.backgroundColor = "rgba(11, 15, 25, 0.85)";
        }
    });

    // 4. SMOOTH SCROLLING
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });

    // 5. FORM SUBMISSION (Original Logic Maintained)
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        // Update UI state
        submitBtn.disabled = true;
        const originalBtnContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        formStatus.textContent = '';
        formStatus.className = '';

        try {
            // API call to backend (remains unchanged)
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                formStatus.textContent = 'Message sent successfully!';
                formStatus.className = 'success-message';
                contactForm.reset();
            } else {
                formStatus.textContent = result.error || 'Failed to send message.';
                formStatus.className = 'error-message';
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            formStatus.textContent = 'Error: Could not connect to server.';
            formStatus.className = 'error-message';
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnContent;
        }
    });
});
