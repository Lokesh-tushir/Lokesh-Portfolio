// script.js

/*
  Contact form email sending
  - This file supports EmailJS client-side sending. To enable real sending:
    1. Create a free EmailJS account at https://www.emailjs.com/
    2. Create an email service and template, then set SERVICE_ID, TEMPLATE_ID, and USER_ID below.
    3. If you don't configure EmailJS, the form will fallback to opening the user's email app (mailto).
*/

console.log("%c🚀 Welcome to My Futuristic Portfolio!", "color: #00f3ff; font-size: 20px; font-weight: bold;");
console.log("%cDesigned with modern Web Technologies", "color: #ff00ff; font-size: 14px;");

// ===== Configuration (replace with your EmailJS IDs to enable direct sending) =====
const EMAILJS_SERVICE_ID = ""; // e.g. 'service_xxx'
const EMAILJS_TEMPLATE_ID = ""; // e.g. 'template_xxx'
const EMAILJS_USER_ID = ""; // e.g. 'user_xxx' (public key)

// Optionally set Instagram URL here (leave empty for placeholder)
const INSTAGRAM_URL = ""; // set when ready, e.g. 'https://instagram.com/yourhandle'

// Load EmailJS SDK dynamically if configured
function loadEmailJSSDK() {
    return new Promise((resolve) => {
        if (!EMAILJS_USER_ID || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
            resolve(false);
            return;
        }
        if (window.emailjs) {
            window.emailjs.init(EMAILJS_USER_ID);
            resolve(true);
            return;
        }
        const s = document.createElement('script');
        s.src = 'https://cdn.emailjs.com/sdk/3.2.0/email.min.js';
        s.onload = () => {
            try { window.emailjs.init(EMAILJS_USER_ID); } catch(e) {}
            resolve(true);
        };
        s.onerror = () => resolve(false);
        document.head.appendChild(s);
    });
}

// Smooth scrolling for anchor links (internal)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Dynamic greeting + skill animation
window.addEventListener('load', async function() {
    const hour = new Date().getHours();
    let greeting;
    if (hour < 12) greeting = "Good Morning! ☀️";
    else if (hour < 18) greeting = "Good Afternoon! 🌤️";
    else greeting = "Good Evening! 🌙";

    const greetElement = document.getElementById('greeting-text');
    if(greetElement) {
        greetElement.innerText = greeting;
        greetElement.style.animation = 'fadeInDown 1s ease-out';
    }

    animateSkillBars();

    // Try to load EmailJS SDK if configured
    const emailjsAvailable = await loadEmailJSSDK();
    if (!emailjsAvailable) console.info('EmailJS not configured — contact form will use mailto fallback.');

    setupContactForm(emailjsAvailable);
    setupInstagramLink();
    createSignatureElements();
});

function animateSkillBars() {
    const skillLevels = document.querySelectorAll('.skill-level');
    skillLevels.forEach((level, index) => {
        const width = level.style.width;
        level.style.width = '0';
        setTimeout(() => { level.style.width = width; }, 100 + (index * 100));
    });
}

// Intersection Observer for animations
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

document.querySelectorAll('.highlight-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animation = `fadeInUp 0.6s ease-out ${0.1 * index}s forwards`;
    observer.observe(card);
});

document.querySelectorAll('.timeline-content').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.animation = `fadeInUp 0.6s ease-out ${0.15 * index}s forwards`;
    observer.observe(item);
});

function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav ul li a').forEach(link => {
        const href = link.getAttribute('href');
        link.classList.remove('active');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.style.color = '#00f3ff';
        }
    });
}
highlightCurrentPage();

// Mouse move effect variables (for future use)
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    document.body.style.setProperty('--mouse-x', `${mouseX * 100}%`);
    document.body.style.setProperty('--mouse-y', `${mouseY * 100}%`);
});

// Scroll reveal for non-card sections
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) section.style.opacity = '1';
    });
});

/* ---------------- Contact Form Handling ---------------- */
function setupContactForm(emailjsAvailable) {
    const form = document.getElementById('contact-form');
    if (!form) return;
    const sendBtn = document.getElementById('send-btn');
    const mailtoBtn = document.getElementById('mailto-btn');
    const feedback = document.getElementById('contact-feedback');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        sendBtn.disabled = true;
        sendBtn.textContent = 'Sending...';
        feedback.textContent = '';

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        // If EmailJS is configured and available, try to send
        if (emailjsAvailable && window.emailjs) {
            try {
                const templateParams = { from_name: name, from_email: email, message: message };
                await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
                feedback.textContent = 'Message sent — thank you!';
                form.reset();
            } catch (err) {
                console.error('EmailJS send error', err);
                feedback.textContent = 'Sending failed — opening your email app as fallback.';
                openMailClient(name, email, message);
            }
        } else {
            // Fallback: open user's mail client with prefilled message
            openMailClient(name, email, message);
            feedback.textContent = 'Email client opened. Please send the message from your email application.';
        }

        sendBtn.disabled = false;
        sendBtn.textContent = 'Send Email';
    });

    mailtoBtn.addEventListener('click', () => {
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();
        openMailClient(name, email, message);
    });
}

function openMailClient(name, email, message) {
    const to = 'your.email@example.com'; // change if you want a different direct recipient
    const subject = encodeURIComponent('Contact from portfolio site');
    const body = encodeURIComponent(`Name: ${name}%0AEmail: ${email}%0A%0A${message}`);
    const mailto = `mailto:${to}?subject=${subject}&body=${body}`;
    window.location.href = mailto;
}

function setupInstagramLink() {
    const el = document.getElementById('instagram-link');
    if (!el) return;
    if (INSTAGRAM_URL && INSTAGRAM_URL.trim() !== '') {
        el.setAttribute('href', INSTAGRAM_URL);
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener');
    } else {
        // keep placeholder and show notice on click
        el.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Instagram link not set yet. Provide INSTAGRAM_URL in script to enable this link.');
        });
    }
}

/* ---------------- Signature Injection ---------------- */
function createSignatureElements() {
    const AUTHOR_NAME = 'Lokesh Tushir';

    // Create signature HTML
    const sigHtml = `
        <div class="site-signature">
            <span class="signature-handwritten">${AUTHOR_NAME}</span>
            <div class="signature-credit">Designed &amp; built by <strong>${AUTHOR_NAME}</strong></div>
        </div>
    `;

    // Append into existing footer if present, otherwise create a footer
    let footer = document.querySelector('footer');
    if (footer) {
        const wrapper = document.createElement('div');
        wrapper.className = 'signature-wrapper';
        wrapper.innerHTML = sigHtml;
        footer.appendChild(wrapper);
    } else {
        footer = document.createElement('footer');
        footer.className = 'site-footer';
        footer.innerHTML = sigHtml;
        document.body.appendChild(footer);
    }

    // If there's a hero greeting, add a small hero signature below it
    const greet = document.getElementById('greeting-text');
    if (greet && greet.parentNode) {
        const heroSig = document.createElement('div');
        heroSig.className = 'hero-signature';
        heroSig.innerHTML = `<span class="signature-handwritten">${AUTHOR_NAME}</span>`;
        // insert after greet
        if (greet.nextSibling) greet.parentNode.insertBefore(heroSig, greet.nextSibling);
        else greet.parentNode.appendChild(heroSig);
    }
}