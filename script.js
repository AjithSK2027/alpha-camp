(function () {
  "use strict";

  var doc = document;
  var root = doc.documentElement;
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function qs(selector, scope) {
    return (scope || doc).querySelector(selector);
  }

  function qsa(selector, scope) {
    return Array.prototype.slice.call((scope || doc).querySelectorAll(selector));
  }

  function on(element, eventName, handler, options) {
    if (element) {
      element.addEventListener(eventName, handler, options);
    }
  }

  var lucideIcons = {
    arrowRight: ["M5 12h14", "m12 5 7 7-7 7"],
    calendarCheck: ["M8 2v4", "M16 2v4", "M3 10h18", "M8 14l2 2 4-4", "M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2"],
    check: ["M20 6 9 17l-5-5"],
    image: ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "M7 10l3 3 2-2 5 5", "M8 7h.01", "M5 3h14a2 2 0 0 1 2 2v10H3V5a2 2 0 0 1 2-2"],
    mail: ["M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2", "M22 6 12 13 2 6"],
    mapPin: ["M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z", "M12 10a2 2 0 1 0 0.01 0"],
    messageCircle: ["M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"],
    phone: ["M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.32 1.77.59 2.61a2 2 0 0 1-.45 2.11L8 9.69a16 16 0 0 0 6 6l1.25-1.25a2 2 0 0 1 2.11-.45c.84.27 1.71.47 2.61.59A2 2 0 0 1 22 16.92Z"],
    send: ["M22 2 11 13", "m22 2-7 20-4-9-9-4 20-7Z"],
    sun: ["M12 2v2", "M12 20v2", "m4.93 4.93 1.41 1.41", "m17.66 17.66 1.41 1.41", "M2 12h2", "M20 12h2", "m6.34 17.66-1.41 1.41", "m19.07 4.93-1.41 1.41", "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"]
  };

  function makeIcon(name) {
    var icon = lucideIcons[name] || lucideIcons.arrowRight;
    var svg = doc.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "lucide");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "2");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("aria-hidden", "true");
    icon.forEach(function (d) {
      var path = doc.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", d);
      svg.appendChild(path);
    });
    return svg;
  }

  function chooseIconForAction(element) {
    var text = (element.textContent || "").toLowerCase();
    var href = (element.getAttribute("href") || "").toLowerCase();
    if (href.indexOf("wa.me") >= 0 || text.indexOf("whatsapp") >= 0) return "messageCircle";
    if (href.indexOf("tel:") === 0 || text.indexOf("call") >= 0) return "phone";
    if (href.indexOf("mailto:") === 0 || text.indexOf("email") >= 0) return "mail";
    if (href.indexOf("maps") >= 0 || text.indexOf("direction") >= 0 || text.indexOf("route") >= 0) return "mapPin";
    if (text.indexOf("gallery") >= 0 || text.indexOf("photo") >= 0) return "image";
    if (text.indexOf("book") >= 0 || text.indexOf("availability") >= 0) return "calendarCheck";
    if (text.indexOf("send") >= 0 || text.indexOf("enquiry") >= 0) return "send";
    if (text.indexOf("accept") >= 0) return "check";
    return "arrowRight";
  }

  function initButtonIcons() {
    qsa(".btn, .mobile-sticky-cta a").forEach(function (button) {
      if (button.querySelector(".lucide")) return;
      button.insertBefore(makeIcon(chooseIconForAction(button)), button.firstChild);
    });
  }

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    window.localStorage.setItem("campAlphaTheme", theme);
    qsa("[data-theme-toggle]").forEach(function (button) {
      button.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
      button.textContent = theme === "dark" ? "Light" : "Dark";
    });
  }

  function showModal(title, message) {
    var modal = qs("#success-modal");
    if (!modal) return;
    qs("[data-modal-title]", modal).textContent = title;
    qs("[data-modal-message]", modal).textContent = message;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    doc.body.classList.add("is-locked");
    var closeButton = qs("[data-modal-close]", modal);
    if (closeButton) closeButton.focus();
  }

  function closeModal() {
    var modal = qs("#success-modal");
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    doc.body.classList.remove("is-locked");
  }

  function initLoader() {
    var loader = qs(".page-loader");
    if (!loader) return;
    window.setTimeout(function () {
      loader.classList.add("is-hidden");
    }, 250);
  }

  function initHeader() {
    var header = qs(".site-header");
    var nav = qs("#primary-navigation");
    var toggle = qs("[data-menu-toggle]");

    function syncScrollState() {
      var scrollTop = window.scrollY || doc.documentElement.scrollTop;
      if (header) header.classList.toggle("is-scrolled", scrollTop > 10);
      var progress = qs(".scroll-progress");
      if (progress) {
        var height = doc.documentElement.scrollHeight - window.innerHeight;
        var pct = height > 0 ? (scrollTop / height) * 100 : 0;
        progress.style.width = Math.min(100, Math.max(0, pct)) + "%";
      }
    }

    on(toggle, "click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      if (nav) nav.classList.toggle("is-open", !expanded);
    });

    qsa("#primary-navigation a").forEach(function (link) {
      on(link, "click", function () {
        if (toggle) toggle.setAttribute("aria-expanded", "false");
        if (nav) nav.classList.remove("is-open");
      });
    });

    on(doc, "click", function (event) {
      if (!nav || !toggle || !nav.classList.contains("is-open")) return;
      if (nav.contains(event.target) || toggle.contains(event.target)) return;
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    });

    on(window, "scroll", syncScrollState, { passive: true });
    syncScrollState();
  }

  function initTheme() {
    var saved = window.localStorage.getItem("campAlphaTheme");
    var systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(saved || (systemDark ? "dark" : "light"));
    qsa("[data-theme-toggle]").forEach(function (button) {
      on(button, "click", function () {
        setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
      });
    });
  }

  function initReveal() {
    var revealItems = qsa(".reveal");
    if (!revealItems.length) return;
    if (!("IntersectionObserver" in window) || prefersReducedMotion) {
      revealItems.forEach(function (item) {
        item.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  }

  function initCounters() {
    var counters = qsa("[data-counter]");
    if (!counters.length) return;

    function animateCounter(counter) {
      var target = Number(counter.getAttribute("data-counter") || "0");
      var suffix = counter.getAttribute("data-suffix") || "";
      var duration = prefersReducedMotion ? 1 : 1100;
      var start = performance.now();

      function frame(now) {
        var progress = Math.min(1, (now - start) / duration);
        var eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.round(target * eased).toString() + suffix;
        if (progress < 1) window.requestAnimationFrame(frame);
      }

      window.requestAnimationFrame(frame);
    }

    if (!("IntersectionObserver" in window)) {
      counters.forEach(animateCounter);
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (counter) {
      observer.observe(counter);
    });
  }

  function initParallax() {
    var heroImage = qs("[data-parallax-hero]");
    if (!heroImage || prefersReducedMotion) return;
    on(window, "scroll", function () {
      var y = Math.min(80, window.scrollY * 0.08);
      heroImage.style.transform = "scale(1.06) translateY(" + y + "px)";
    }, { passive: true });
  }

  function initCarousel() {
    var shell = qs("[data-carousel]");
    if (!shell) return;
    var track = qs("[data-carousel-track]", shell);
    var slides = qsa("[data-carousel-slide]", shell);
    var prev = qs("[data-carousel-prev]", shell);
    var next = qs("[data-carousel-next]", shell);
    var index = 0;
    var timer;

    function render() {
      if (track) track.style.transform = "translateX(" + (-index * 100) + "%)";
    }

    function go(delta) {
      index = (index + delta + slides.length) % slides.length;
      render();
    }

    function start() {
      if (prefersReducedMotion || slides.length < 2) return;
      timer = window.setInterval(function () {
        go(1);
      }, 6500);
    }

    function stop() {
      if (timer) window.clearInterval(timer);
    }

    on(prev, "click", function () {
      stop();
      go(-1);
      start();
    });
    on(next, "click", function () {
      stop();
      go(1);
      start();
    });
    on(shell, "mouseenter", stop);
    on(shell, "mouseleave", start);
    render();
    start();
  }

  function initFaq() {
    qsa(".faq-question").forEach(function (button) {
      on(button, "click", function () {
        var item = button.closest(".faq-item");
        var open = item.classList.toggle("is-open");
        button.setAttribute("aria-expanded", String(open));
        var symbol = qs("[data-faq-symbol]", button);
        if (symbol) symbol.textContent = open ? "-" : "+";
      });
    });
  }

  function initLightbox() {
    var lightbox = qs("#gallery-lightbox");
    if (!lightbox) return;
    var image = qs("[data-lightbox-image]", lightbox);
    var caption = qs("[data-lightbox-caption]", lightbox);
    var closeButton = qs("[data-lightbox-close]", lightbox);

    function close() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      doc.body.classList.remove("is-locked");
      if (image) image.removeAttribute("src");
    }

    qsa("[data-lightbox]").forEach(function (trigger) {
      on(trigger, "click", function (event) {
        event.preventDefault();
        var img = qs("img", trigger);
        if (!img || !image) return;
        image.src = trigger.getAttribute("href") || img.currentSrc || img.src;
        image.alt = img.alt || "";
        if (caption) caption.textContent = trigger.getAttribute("data-caption") || img.alt || "Camp Alpha gallery image";
        lightbox.classList.add("is-open");
        lightbox.setAttribute("aria-hidden", "false");
        doc.body.classList.add("is-locked");
        if (closeButton) closeButton.focus();
      });
    });

    on(closeButton, "click", close);
    on(lightbox, "click", function (event) {
      if (event.target === lightbox) close();
    });
    on(doc, "keydown", function (event) {
      if (event.key === "Escape") {
        close();
        closeModal();
      }
    });
  }

  function initForms() {
    qsa(".enquiry-form").forEach(function (form) {
      var checkIn = qs("[name='check-in']", form);
      var checkOut = qs("[name='check-out']", form);
      var whatsappButton = qs("[data-whatsapp-from-form]", form);
      var today = new Date();
      var isoToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];
      if (checkIn) checkIn.min = isoToday;
      if (checkOut) checkOut.min = isoToday;
      setHiddenTrackingFields(form);

      on(checkIn, "change", function () {
        if (checkOut) checkOut.min = checkIn.value || isoToday;
      });

      on(whatsappButton, "click", function () {
        if (!validateForm(form)) return;
        window.location.href = buildWhatsAppUrl(form);
      });

      on(form, "submit", function (event) {
        event.preventDefault();
        if (!validateForm(form)) return;

        var submitButton = qs("[type='submit']", form);
        var originalText = submitButton ? submitButton.textContent : "";
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.textContent = "Sending...";
        }

        window.fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { "Accept": "application/json" }
        })
          .then(function (response) {
            if (!response.ok) throw new Error("Form submission failed");
            form.reset();
            showModal("Enquiry sent", "Thank you. Camp Alpha will call or WhatsApp you shortly to plan your stay.");
          })
          .catch(function () {
            showModal("Could not send", "Please call or WhatsApp Camp Alpha directly at +91 7483717675. Your message was not submitted.");
          })
          .finally(function () {
            if (submitButton) {
              submitButton.disabled = false;
              submitButton.textContent = originalText;
            }
          });
      });
    });
  }

  function setHiddenTrackingFields(form) {
    var pageUrl = qs("[name='page_url']", form);
    var pageTitle = qs("[name='page_title']", form);
    var params = new URLSearchParams(window.location.search);
    if (pageUrl) pageUrl.value = window.location.href;
    if (pageTitle) pageTitle.value = doc.title;
    ["utm_source", "utm_medium", "utm_campaign"].forEach(function (name) {
      var field = qs("[name='" + name + "']", form);
      if (field) field.value = params.get(name) || "";
    });
  }

  function buildWhatsAppUrl(form) {
    var values = {
      name: getValue(form, "name"),
      phone: getValue(form, "phone"),
      email: getValue(form, "email"),
      guests: getValue(form, "guests"),
      checkIn: getValue(form, "check-in"),
      checkOut: getValue(form, "check-out"),
      accommodation: getValue(form, "accommodation"),
      mealPlan: getValue(form, "meal-plan"),
      preferredContact: getValue(form, "preferred-contact"),
      message: getValue(form, "message")
    };
    var lines = [
      "Hello Camp Alpha, I would like to check availability.",
      "Name: " + values.name,
      "Phone: " + values.phone,
      "Guests: " + values.guests,
      "Dates: " + values.checkIn + " to " + values.checkOut,
      "Stay style: " + values.accommodation,
      "Meal plan: " + (values.mealPlan || "Not sure"),
      "Preferred contact: " + (values.preferredContact || "WhatsApp"),
      "Message: " + values.message
    ];
    if (values.email) lines.splice(3, 0, "Email: " + values.email);
    return "https://wa.me/917483717675?text=" + encodeURIComponent(lines.join("\n"));
  }

  function validateForm(form) {
    var valid = true;
    var values = {
      name: getValue(form, "name"),
      phone: getValue(form, "phone"),
      email: getValue(form, "email"),
      guests: getValue(form, "guests"),
      checkIn: getValue(form, "check-in"),
      checkOut: getValue(form, "check-out"),
      accommodation: getValue(form, "accommodation"),
      message: getValue(form, "message")
    };

    clearErrors(form);

    if (values.name.length < 2) valid = setError(form, "name", "Please enter your full name.");
    if (!/^[0-9+\-\s()]{8,18}$/.test(values.phone)) valid = setError(form, "phone", "Please enter a valid phone number.");
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) valid = setError(form, "email", "Please enter a valid email address.");
    if (!values.guests || Number(values.guests) < 1) valid = setError(form, "guests", "Please enter at least one guest.");
    if (!values.checkIn) valid = setError(form, "check-in", "Please choose a check-in date.");
    if (!values.checkOut) valid = setError(form, "check-out", "Please choose a check-out date.");
    if (values.checkIn && values.checkOut && new Date(values.checkOut) <= new Date(values.checkIn)) {
      valid = setError(form, "check-out", "Check-out must be after check-in.");
    }
    if (!values.accommodation) valid = setError(form, "accommodation", "Please choose an accommodation type.");
    if (values.message.length < 10) valid = setError(form, "message", "Please share a few details about your trip.");

    return valid;
  }

  function getValue(form, name) {
    var field = qs("[name='" + name + "']", form);
    return field ? String(field.value || "").trim() : "";
  }

  function clearErrors(form) {
    qsa("[aria-invalid='true']", form).forEach(function (field) {
      field.removeAttribute("aria-invalid");
    });
    qsa(".field-error", form).forEach(function (error) {
      error.textContent = "";
    });
  }

  function setError(form, name, message) {
    var field = qs("[name='" + name + "']", form);
    if (!field) return false;
    var wrapper = field.closest(".form-field");
    var error = wrapper ? qs(".field-error", wrapper) : null;
    field.setAttribute("aria-invalid", "true");
    if (error) error.textContent = message;
    if (!qs("[aria-invalid='true']:focus", form)) field.focus();
    return false;
  }

  function initCookieConsent() {
    var banner = qs("[data-cookie-consent]");
    if (!banner) return;
    if (window.localStorage.getItem("campAlphaCookieConsent") === "accepted") return;
    window.setTimeout(function () {
      banner.classList.add("is-visible");
    }, 900);
    on(qs("[data-cookie-accept]", banner), "click", function () {
      window.localStorage.setItem("campAlphaCookieConsent", "accepted");
      banner.classList.remove("is-visible");
    });
  }

  function initBackToTop() {
    var button = qs("[data-back-top]");
    on(button, "click", function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  }

  function initCursor() {
    var cursor = qs(".custom-cursor");
    if (!cursor || window.matchMedia("(max-width: 720px)").matches || prefersReducedMotion) return;
    on(window, "pointermove", function (event) {
      cursor.classList.add("is-active");
      cursor.style.transform = "translate(" + event.clientX + "px, " + event.clientY + "px) translate(-50%, -50%)";
    }, { passive: true });
    qsa("a, button, input, select, textarea").forEach(function (item) {
      on(item, "mouseenter", function () { cursor.classList.add("is-hovering"); });
      on(item, "mouseleave", function () { cursor.classList.remove("is-hovering"); });
    });
  }

  function initFooterYear() {
    qsa("[data-year]").forEach(function (item) {
      item.textContent = String(new Date().getFullYear());
    });
  }

  on(doc, "click", function (event) {
    if (event.target.matches("[data-modal-close]")) closeModal();
  });

  initTheme();
  initHeader();
  initReveal();
  initCounters();
  initParallax();
  initCarousel();
  initFaq();
  initLightbox();
  initButtonIcons();
  initForms();
  initCookieConsent();
  initBackToTop();
  initCursor();
  initFooterYear();
  on(window, "load", initLoader);
})();
