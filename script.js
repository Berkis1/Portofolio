document.addEventListener('DOMContentLoaded', function () {
    // Set current year in footer
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Mobile nav toggle
    const navToggle = document.getElementById('navToggle');
    const mainNav = document.getElementById('mainNav');
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', function () {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', String(!expanded));
            if (mainNav.style.display === 'block') mainNav.style.display = '';
            else mainNav.style.display = 'block';
        });
    }

    // Smooth scroll for internal anchors (enhancement)
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                target.setAttribute('tabindex', '-1');
                target.focus({ preventScroll: true });
            }
        });
    });

    // Form validation (front-end only)
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (ev) {
            ev.preventDefault();
            const nameInput = form.querySelector('#name') || form.querySelector('#nom');
            const emailInput = form.querySelector('#email');
            const messageInput = form.querySelector('#message');
            const status = document.getElementById('formStatus') || document.getElementById('formSuccess');

            // Clear previous messages
            if (status) status.textContent = '';

            let valid = true;
            const trim = (v) => (v || '').trim();
            if (!nameInput || trim(nameInput.value) === '') {
                valid = false;
                if (nameInput) nameInput.setAttribute('aria-invalid', 'true');
            } else {
                nameInput.removeAttribute('aria-invalid');
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput || trim(emailInput.value) === '' || !emailRegex.test(trim(emailInput.value))) {
                valid = false;
                if (emailInput) emailInput.setAttribute('aria-invalid', 'true');
            } else if (emailInput) {
                emailInput.removeAttribute('aria-invalid');
            }

            if (!messageInput || trim(messageInput.value) === '') {
                valid = false;
                if (messageInput) messageInput.setAttribute('aria-invalid', 'true');
            } else if (messageInput) {
                messageInput.removeAttribute('aria-invalid');
            }

            if (!valid) {
                if (status) status.textContent = 'Merci de compléter correctement le formulaire.';
                return;
            }

            // Simulate successful submission (front-end only)
            if (status) status.textContent = '✓ Message simulé envoyé. Merci — je vous recontacte bientôt.';
            form.reset();
        });
    }
});
