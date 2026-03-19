document.addEventListener('DOMContentLoaded', () => {

    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const revealElements = document.querySelectorAll('.reveal');

    // Scroll animation
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

    // Active link on scroll
    window.addEventListener('scroll', () => {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });

        const nav = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            nav.style.height = "70px";
            nav.style.backgroundColor = "rgba(11, 15, 25, 0.95)";
        } else {
            nav.style.height = "80px";
            nav.style.backgroundColor = "rgba(11, 15, 25, 0.85)";
        }
    });

    // Smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = document.querySelector(link.getAttribute('href'));

            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });

    // ✅ FINAL FORM SUBMISSION (FIXED)
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        submitBtn.disabled = true;
        const originalBtnContent = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending...';
        formStatus.textContent = '';
        formStatus.className = '';

        try {
            const response = await fetch('https://my-web-portfolio-1.onrender.com/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            let result = {};
            try {
                result = await response.json();
            } catch (e) {
                console.log("No JSON response");
            }

            if (response.ok) {
                formStatus.textContent = 'Message sent successfully! ✅';
                formStatus.className = 'success-message';
                contactForm.reset();
            } else {
                formStatus.textContent = result.error || 'Failed to send message ❌';
                formStatus.className = 'error-message';
            }

        } catch (error) {
            console.error(error);
            formStatus.textContent = 'Server is waking up... try again in 20–30 sec ⏳';
            formStatus.className = 'error-message';
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnContent;
        }
    });

});