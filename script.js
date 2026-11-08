
document.addEventListener("DOMContentLoaded", () => {
    // Mobile navigation menu
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    // Close menu after clicking a navigation link
    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
            menuToggle.textContent = "☰";
        });
    });

    // Automatically update the footer year
    const year = document.getElementById("year");
    year.textContent = new Date().getFullYear();

    // Back-to-top button
    const backToTop = document.getElementById("back-to-top");

    window.addEventListener("scroll", () => {
        backToTop.classList.toggle("visible", window.scrollY > 350);
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Highlight the current navigation section
    const sections = document.querySelectorAll("main section[id]");
    const sectionLinks = navLinks.querySelectorAll('a[href^="#"]');

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                sectionLinks.forEach((link) => {
                    if (link.getAttribute("href") === `#${entry.target.id}`) {
                        link.classList.add("active");
                    } else {
                        link.classList.remove("active");
                    }
                });
            });
        }, {
            rootMargin: "-25% 0px -60% 0px"
        });

        sections.forEach((section) => observer.observe(section));
    }

    // Contact form: open an email draft
    const contactForm = document.getElementById("contact-form");
    const formNote = document.getElementById("form-note");

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            formNote.textContent = "Please complete all fields.";
            return;
        }

        // Enter Maia's actual email address here before using the form.
        const recipient = "";

        if (!recipient) {
            formNote.textContent =
                "The form is ready, but the recipient email address must be added in script.js first.";
            return;
        }

        const subject = encodeURIComponent(`Portfolio message from ${name}`);
        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        );

        window.location.href =
            `mailto:${recipient}?subject=${subject}&body=${body}`;

        formNote.textContent =
            "Your email draft is being opened. Please send it from your email app.";
    });
});