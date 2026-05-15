document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Apply Links and Images from Configuration ---
  if (typeof PORTFOLIO_CONFIG !== "undefined") {
    Object.keys(PORTFOLIO_CONFIG.links).forEach((key) => {
      const linkElement = document.getElementById("link-" + key);
      if (linkElement && PORTFOLIO_CONFIG.links[key]) {
        linkElement.href = PORTFOLIO_CONFIG.links[key];
      }
    });

    Object.keys(PORTFOLIO_CONFIG.images).forEach((key) => {
      const imgElement = document.getElementById("img-" + key);
      if (imgElement && PORTFOLIO_CONFIG.images[key]) {
        imgElement.src = PORTFOLIO_CONFIG.images[key];
      }
    });
  }

  // --- 2. Theme Toggle Logic ---
  const themeBtn = document.getElementById("theme-toggle");
  const htmlElement = document.documentElement;
  const savedTheme = localStorage.getItem("theme") || "light";

  if (savedTheme === "dark") {
    htmlElement.classList.add("dark");
  } else {
    htmlElement.classList.remove("dark");
  }

  themeBtn.addEventListener("click", () => {
    if (htmlElement.classList.contains("dark")) {
      htmlElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      htmlElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  });

  // --- 3. OpenStreetMap via Leaflet.js Logic ---
  const mapContainer = document.getElementById("bristol-map");
  if (mapContainer) {
    const bristolLat = 51.4545;
    const bristolLng = -2.5879;

    const map = L.map("bristol-map", {
      zoomControl: false,
    }).setView([bristolLat, bristolLng], 6);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const customPin = L.divIcon({
      className: "custom-leaflet-pin",
      html: `<div class="bg-[#B01C2E] rounded-full border-4 border-white shadow-lg w-6 h-6 flex items-center justify-center transform -translate-y-3"></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 24],
      popupAnchor: [0, -24],
    });

    L.marker([bristolLat, bristolLng], { icon: customPin })
      .addTo(map)
      .bindPopup(
        '<strong style="color: #B01C2E;">Mahesh Pralhad Nanavare</strong><br>Ready to build in Bristol, UK.',
      )
      .openPopup();
  }

  // --- 4. Advanced ScrollSpy Logic ---
  const sections = document.querySelectorAll("section[id], footer[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  // Classes for active state (Makes it red, bigger, and extra bold)
  const activeClasses = [
    "text-bristol",
    "dark:text-bristol-light",
    "scale-110",
    "font-extrabold",
  ];
  // Classes for inactive state
  const inactiveClasses = [
    "text-slate-500",
    "dark:text-slate-400",
    "scale-100",
    "font-bold",
  ];

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      // 200px offset accounts for the frozen top navigation bar height
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      // Remove active state classes
      link.classList.remove(...activeClasses);
      // Ensure inactive state classes are present
      link.classList.add(...inactiveClasses);

      // Apply active state to matching link
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.remove(...inactiveClasses);
        link.classList.add(...activeClasses);
      }
    });
  });

  // Trigger scroll event on load to highlight the initial active section
  window.dispatchEvent(new Event("scroll"));
});
