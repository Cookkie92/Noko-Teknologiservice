// Smooth scroll for internal links
document.addEventListener("click", (event) => {
  const target = event.target;

  if (target.matches('a[href^="#"]')) {
    const href = target.getAttribute("href");
    const sectionId = href.slice(1);

    if (!sectionId) return;

    const section = document.getElementById(sectionId);
    if (!section) return;

    event.preventDefault();
    const top = section.getBoundingClientRect().top + window.scrollY - 70;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  }
});

// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });

  // Close nav when clicking a link (on mobile)
  mainNav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      mainNav.classList.remove("open");
    }
  });
}

// Set current year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Simple form validation + fake submit handler
const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = form.querySelector("#name");
    const emailInput = form.querySelector("#email");
    const messageInput = form.querySelector("#message");

    const errors = {};

    if (!nameInput.value.trim()) {
      errors.name = "Skriv inn navnet ditt.";
    }

    if (!emailInput.value.trim()) {
      errors.email = "Skriv inn e-postadressen din.";
    } else if (!/^\S+@\S+\.\S+$/.test(emailInput.value.trim())) {
      errors.email = "Dette ser ikke ut som en gyldig e-postadresse.";
    }

    if (!messageInput.value.trim()) {
      errors.message = "Skriv litt om oppdraget.";
    }

    // Clear previous errors
    form.querySelectorAll(".field-error").forEach((el) => {
      el.textContent = "";
    });

    if (Object.keys(errors).length > 0) {
      Object.entries(errors).forEach(([field, message]) => {
        const errEl = form.querySelector(`.field-error[data-for="${field}"]`);
        if (errEl) {
          errEl.textContent = message;
        }
      });
      statusEl.textContent = "";
      return;
    }

    // At this point you can integrate with backend / form service.
    // For nå: bare vis en bekreftelse.
    statusEl.textContent =
      "Takk for henvendelsen! Jeg tar kontakt så snart jeg har mulighet.";

    form.reset();
  });
}
