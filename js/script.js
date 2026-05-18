// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter(() => {
    highlightActiveLink();
    initHeaderBehavior();
    initMobileNavToggle();
    // Set Copyright Year
    document.getElementById("currentYear").textContent =
      new Date().getFullYear();
  });
  initLeadCaptureModal();
});

// Load Header and Footer
function loadHeaderFooter(callback) {
  document.getElementById("footer").innerHTML = `<div class="container">
        <div class="footWrap defaultPadding">
          <div class="row">
            <!-- Company Info -->
            <div class="col-lg-auto col-sm-6 mb-4 mb-md-0 FooterAbout">
              <a class="footer-brand" href="index.html">
                <img loading="lazy" src="images/BrandLogo.webp" alt="HK Engimech">
              </a>
              <p>
                HK Engimech delivers reliable industrial packaging solutions including pallets, shrink wrapping, corrugated packaging, strapping, protective materials for safe storage transport.
              </p>
             
            </div>
            <div class="col-sm-6 col-lg-auto mb-4 mb-md-0 exploreLinks">
              <h5 class="fourthH">Quick Links</h5>
              <ul>
                <li>
                  <a class="footerLinks" href="index.html">
                     <span class="iconify" data-icon="ic:twotone-arrow-circle-right"></span> Home </a>
                </li>
                <li>
                  <a class="footerLinks" href="about.html">
                    <span class="iconify" data-icon="ic:twotone-arrow-circle-right"></span> About Us</a>
                </li>  
                <li>
                  <a class="footerLinks" href="gallery.html">
                    <span class="iconify" data-icon="ic:twotone-arrow-circle-right"></span> Gallery</a>
                </li>
                <li>
                  <a class="footerLinks" href="contactUs.html">
                    <span class="iconify" data-icon="ic:twotone-arrow-circle-right"></span> Contact</a>
                </li>
              </ul>
            </div>
            <div class="col-sm-6 col-lg-auto mb-4 mb-md-0 exploreLinks1">
              <h5 class="fourthH ">Our Services</h5>
              <ul> 
                
                
                 <li><a href="WoodenPalletsAndBoxes.html" class="footerLinks"><span class="iconify" data-icon="ic:twotone-arrow-circle-right"></span> Wooden Pallets &amp; Boxes</a></li>
                 <li><a href="ShrinkWrappingServices.html" class="footerLinks"><span class="iconify" data-icon="ic:twotone-arrow-circle-right"></span> Shrink Wrapping Services</a></li>
                 <li><a href="CorrugatedPackaging.html" class="footerLinks"><span class="iconify" data-icon="ic:twotone-arrow-circle-right"></span> Corrugated Packaging</a></li>
               
              </ul>
            </div>
            <div class="col-md-6 col-lg-auto mb-4 mb-md-0">
              <h5 class="fourthH ">Contact Us</h5>
              <ul class="contact-info">
                <li>
                  <a class="locationLink footerLinks" target="_blank" href="https://maps.app.goo.gl/L729ypQMV9yTa8vQ7">
                    <span class="iconify" data-icon="fluent:location-12-filled"></span>
                    <A1-TF-25>
<pre class="mb-0">
FF/3 , J Tower, Aashray Residency,
Oop. - Din dayal Upadhyay School,
TP-13, Chhani Jakatnaka</pre>
                  </a>
                </li>
                <li>
                  <a href="tel:+917984899514" class="footerLinks">
                    <span class="iconify" data-icon="ic:sharp-phone"></span> +91 79848 99514</a>
                </li>
                <!-- <li>
                  <a href="tel:" class="footerLinks">
                    <i class="fa-solid fa-phone"></i>+91 </a>
                </li> -->
                <li>
                  <a class="emailAnchor footerLinks" href="mailto:sales@hkengimech.com">
                    <span class="iconify" data-icon="material-symbols-light:mail-rounded"></span> sales@hkengimech.com</a>
                </li>
              </ul>
              <div class="social-icons mt-3">
                <a target="_blank" class="facebook" href="https://www.linkedin.com/company/hk-engimech/">
                  <span class="iconify" data-icon="ri:linkedin-fill"></span> 
                </a>
                <a target="_blank" class="instagram" href="https://www.instagram.com/">
                  <span class="iconify" data-icon="dashicons:instagram"></span>
                </a>
                <a class="whatsapp set-url-target" rel="noopener" data-mobile-target="" data-desktop-target="_blank" target="_blank" href="https://api.whatsapp.com/send?phone=917984899514">
                  <span class="iconify" data-icon="ic:twotone-whatsapp"></span>
                </a>
              </div>
            </div>
          
            <!-- Contact Info -->
          </div>
        </div>
       
      </div>
      <div class="f-bottom effect">
        <div class="container">
          <div class="row ">
            <div class="col-12">
              <div class="inner">
                <div class="border-top border-secondary pt-3 copyright text-center">
                <p class="small mb-0 copyright">&copy; <span id="currentYear"></span> All Rights Are Reserved By HK Engimech. Design & Developed by <a href="https://shriiitrackingsolution.in/" target="_blank">
                    <b>Shriii&nbsp;Tracking&nbsp;Solution</b></p> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`; // Keep your current footer HTML here

  document.getElementById("mainFabContainer").innerHTML =
    `<div class="fab-container">
      <a class="set-url-target" rel="noopener" data-mobile-target="" data-desktop-target="_blank" target="_blank" href="https://api.whatsapp.com/send?phone=917984899514">
        <svg xmlns="http://www.w3.org/2000/svg" width="59.54px" height="60px" viewBox="0 0 256 258">
          <defs>
            <linearGradient id="logosWhatsappIcon0" x1="50%" x2="50%" y1="100%" y2="0%">
              <stop offset="0%" stop-color="#1faf38"></stop>
              <stop offset="100%" stop-color="#60d669"></stop>
            </linearGradient>
            <linearGradient id="logosWhatsappIcon1" x1="50%" x2="50%" y1="100%" y2="0%">
              <stop offset="0%" stop-color="#f9f9f9"></stop>
              <stop offset="100%" stop-color="#fff"></stop>
            </linearGradient>
          </defs>
          <path fill="url(#logosWhatsappIcon0)" d="M5.463 127.456c-.006 21.677 5.658 42.843 16.428 61.499L4.433 252.697l65.232-17.104a123 123 0 0 0 58.8 14.97h.054c67.815 0 123.018-55.183 123.047-123.01c.013-32.867-12.775-63.773-36.009-87.025c-23.23-23.25-54.125-36.061-87.043-36.076c-67.823 0-123.022 55.18-123.05 123.004"></path>
          <path fill="url(#logosWhatsappIcon1)" d="M1.07 127.416c-.007 22.457 5.86 44.38 17.014 63.704L0 257.147l67.571-17.717c18.618 10.151 39.58 15.503 60.91 15.511h.055c70.248 0 127.434-57.168 127.464-127.423c.012-34.048-13.236-66.065-37.3-90.15C194.633 13.286 162.633.014 128.536 0C58.276 0 1.099 57.16 1.071 127.416m40.24 60.376l-2.523-4.005c-10.606-16.864-16.204-36.352-16.196-56.363C22.614 69.029 70.138 21.52 128.576 21.52c28.3.012 54.896 11.044 74.9 31.06c20.003 20.018 31.01 46.628 31.003 74.93c-.026 58.395-47.551 105.91-105.943 105.91h-.042c-19.013-.01-37.66-5.116-53.922-14.765l-3.87-2.295l-40.098 10.513z"></path>
          <path fill="#fff" d="M96.678 74.148c-2.386-5.303-4.897-5.41-7.166-5.503c-1.858-.08-3.982-.074-6.104-.074c-2.124 0-5.575.799-8.492 3.984c-2.92 3.188-11.148 10.892-11.148 26.561s11.413 30.813 13.004 32.94c1.593 2.123 22.033 35.307 54.405 48.073c26.904 10.609 32.379 8.499 38.218 7.967c5.84-.53 18.844-7.702 21.497-15.139c2.655-7.436 2.655-13.81 1.859-15.142c-.796-1.327-2.92-2.124-6.105-3.716s-18.844-9.298-21.763-10.361c-2.92-1.062-5.043-1.592-7.167 1.597c-2.124 3.184-8.223 10.356-10.082 12.48c-1.857 2.129-3.716 2.394-6.9.801c-3.187-1.598-13.444-4.957-25.613-15.806c-9.468-8.442-15.86-18.867-17.718-22.056c-1.858-3.184-.199-4.91 1.398-6.497c1.431-1.427 3.186-3.719 4.78-5.578c1.588-1.86 2.118-3.187 3.18-5.311c1.063-2.126.531-3.986-.264-5.579c-.798-1.593-6.987-17.343-9.819-23.64"></path>
        </svg>
      </a>
    </div>
    <!-- Call FAB icon -->
    <div class="Call-fab-container">
      <a rel="noopener" target="_blank" href="tel:+917984899514">
        <img style="height: 60px; width: 60px" src="images/phone-call.png" alt="phone icon" />
      </a>
    </div>`;
  callback?.();
}

// Highlight current page in navbar
function highlightActiveLink() {
  const current = (
    window.location.pathname.split("/").pop() || "index.html"
  ).split("?")[0];
  document.querySelectorAll(".navLink").forEach((link) => {
    const href = link.getAttribute("href")?.split("?")[0];
    if (!href || href === "#") return;
    if (href === current) {
      link.classList.add("active");
      link
        .closest(".dropdownList")
        ?.closest(".navLi")
        ?.querySelector(".navLink")
        ?.classList.add("active");
    }
  });
}

// Sticky Header on Scroll
function initHeaderBehavior() {
  const header = document.getElementById("main-header");
  const belowContent = document.getElementById("headBelowContent");

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    const stickyStart = header.offsetTop + header.offsetHeight + 5;
    const resetPoint = belowContent.offsetTop + belowContent.offsetHeight + 4;

    if (scrollTop > stickyStart) {
      header.classList.add("sticky-header", "visible");
      header.classList.remove("headerAnimate");
    } else if (scrollTop < resetPoint) {
      header.classList.remove("sticky-header", "visible");
      header.classList.add("headerAnimate");
    }
  };

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("load", handleScroll);
}

// Mobile Nav Toggle and Submenu
function initMobileNavToggle() {
  const toggleBtn = document.querySelector(".navToggle");
  const navMenu = document.querySelector(".navMenu");
  const closeBtn = document.querySelector(".btn-nav-close");

  toggleBtn?.addEventListener("click", () =>
    navMenu.classList.toggle("active"),
  );
  closeBtn?.addEventListener("click", () => navMenu.classList.remove("active"));

  document.querySelectorAll(".toggleSub").forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      const submenu = toggle.closest(".navLi").querySelector(".dropdownList");

      // Close all others
      document.querySelectorAll(".dropdownList.open").forEach((menu) => {
        if (menu !== submenu) menu.classList.remove("open");
      });

      submenu?.classList.toggle("open");
    });
  });
}

// WhatsApp URL Adjuster (Device-based Detection)
(function () {
  const WHATSAPP_NUMBER = "917984899514";
  const DEFAULT_TEXT =
    "Hi HK Engimech, I would like to inquire about your services.";

  function isMobileDevice() {
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
  }

  function updateWhatsAppLink() {
    const isMobile = isMobileDevice();
    const baseUrl = isMobile
      ? "https://api.whatsapp.com/send"
      : "https://web.whatsapp.com/send";

    document.querySelectorAll(".set-url-target").forEach((el, index) => {
      // Add ID to every whatsapp message/button if not already present
      if (!el.id) {
        el.id = "whatsapp-btn-" + index;
      }

      let currentHref = el.getAttribute("href");
      if (!currentHref || !currentHref.includes("whatsapp.com")) return;

      try {
        const urlObj = new URL(currentHref);
        const params = new URLSearchParams(urlObj.search);

        // Ensure phone is set
        if (!params.has("phone")) {
          params.set("phone", WHATSAPP_NUMBER);
        }

        // Add default text if none exists
        if (!params.has("text") || params.get("text").trim() === "") {
          params.set("text", DEFAULT_TEXT);
        }

        // Update link with correct base URL and preserved/default params
        el.setAttribute("href", `${baseUrl}?${params.toString()}`);
      } catch (e) {
        console.error("Error updating WhatsApp link:", e);
      }
    });
  }

  // Run on load and resize
  window.addEventListener("resize", updateWhatsAppLink);
  window.addEventListener("load", updateWhatsAppLink);

  // Also run immediately
  updateWhatsAppLink();
})();

// ═══ MEGA MENU — Populate & Behavior ═══
(function () {
  "use strict";

  const DATA_PATH = "data/services-data.json";

  async function initMegaMenu() {
    const gridEl = document.getElementById("megaMenuGrid");
    const mobileEl = document.getElementById("megaMenuMobile");

    // If no mega menu elements exist on this page, skip
    if (!gridEl && !mobileEl) return;

    try {
      const res = await fetch(DATA_PATH);
      if (!res.ok) return;
      const data = await res.json();
      if (!data.services) return;

      // Build desktop mega-menu grid
      if (gridEl) {
        gridEl.innerHTML = data.services
          .map(
            (service) => `
          <a href="service-detail.html?service=${service.slug}" class="mega-service-card">
            <div class="mega-service-info">
              <h4>${service.name}</h4>
            </div>
          </a>
        `,
          )
          .join("");
      }

      // Build mobile dropdown list
      if (mobileEl) {
        mobileEl.innerHTML = data.services
          .map(
            (service) => `
          <li><a href="service-detail.html?service=${service.slug}">${service.name}</a></li>
        `,
          )
          .join("");
      }

      // Re-init Iconify for the new icons
      if (window.Iconify) {
        setTimeout(() => Iconify.scan(), 200);
      }
    } catch (err) {
      console.error("Mega menu load error:", err);
    }
  }

  // Mobile toggle for mega-menu
  function initMegaMenuToggle() {
    const megaNavLi = document.querySelector(".navLi.has-mega-menu");
    if (!megaNavLi) return;

    const link = megaNavLi.querySelector("a.navLink");
    const mobileList = megaNavLi.querySelector(".mega-dropdown-mobile");
    const arrow = megaNavLi.querySelector(".mega-toggle-arrow");

    if (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (window.innerWidth <= 991) {
          // Mobile behavior: toggle mobile list
          if (mobileList) {
            mobileList.classList.toggle("open");
            if (arrow) arrow.classList.toggle("rotated");
          }
        } else {
          // Desktop behavior: toggle mega-open class for desktop dropdown
          megaNavLi.classList.toggle("mega-open");
        }
      });
    }

    // Close desktop dropdown if clicking outside
    document.addEventListener("click", function (e) {
      if (window.innerWidth > 991) {
        if (megaNavLi && !megaNavLi.contains(e.target)) {
          megaNavLi.classList.remove("mega-open");
        }
      }
    });
  }

  // Run
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      initMegaMenu();
      initMegaMenuToggle();
    });
  } else {
    initMegaMenu();
    initMegaMenuToggle();
  }
})();

// ═══ LEAD CAPTURE SYSTEM ═══
window.HK_GAS_URL =
  "https://script.google.com/macros/s/AKfycbxHLMEYS-EAW7HrA5IJuwDNdOu6e1c0moTFicsPIWppqmUBbFyOstHauOaHgVj8nE-K/exec";

window.submitToGoogleSheet = async function (payload) {
  if (!window.HK_GAS_URL) return;
  try {
    await fetch(window.HK_GAS_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("Error sending to GAS:", err);
  }
};

function initLeadCaptureModal() {
  // Inject Custom Modal HTML into DOM
  const modalHtml = `
  <style>
    @keyframes modalFadeIn { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
    .custom-modal-overlay {
      display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.6); z-index: 999999; justify-content: center; align-items: center;
      backdrop-filter: blur(4px);
    }
    .custom-modal-card {
      background: #fff; border-radius: 12px; padding: 24px; width: 90%; max-width: 400px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2); position: relative; animation: modalFadeIn 0.3s ease;
    }
    .custom-modal-close {
      position: absolute; top: 12px; right: 16px; font-size: 24px; cursor: pointer; color: #555; line-height: 1;
    }
    .custom-modal-card h4 { margin-bottom: 20px; color: #333; font-weight: 700; font-size: 1.25rem; }
    .custom-modal-card label { display: block; margin-bottom: 6px; font-weight: 600; font-size: 0.9rem; color: #444; }
    .custom-modal-card input {
      width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem; margin-bottom: 16px;
      outline: none; transition: border-color 0.2s;
    }
    .custom-modal-card input:focus { border-color: var(--primary, #0d6efd); }
    .custom-modal-btn {
      width: 100%; padding: 14px; background: var(--primary, #0d6efd); color: #fff; border: none;
      border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: opacity 0.3s;
      display: flex; justify-content: center; align-items: center; gap: 8px;
    }
    .custom-modal-btn:hover { opacity: 0.9; }
    .custom-modal-btn:disabled { opacity: 0.7; cursor: not-allowed; }
  </style>
  <div id="leadCaptureModal" class="custom-modal-overlay">
    <div class="custom-modal-card">
      <span class="custom-modal-close" id="leadModalClose">&times;</span>
      <h4>Quick Enquiry</h4>
      <form id="leadCaptureForm">
        <div>
          <label>Full Name *</label>
          <input type="text" id="leadName" required placeholder="Enter your full name">
        </div>
        <div>
          <label>Mobile Number *</label>
          <input type="tel" id="leadMobile" required placeholder="Enter your 10-digit number" pattern="[0-9]{10}">
        </div>
        <button type="submit" class="custom-modal-btn" id="leadSubmitBtn">
          <span class="iconify" data-icon="logos:whatsapp-icon"></span> Proceed to WhatsApp
        </button>
      </form>
    </div>
  </div>`;

  document.body.insertAdjacentHTML("beforeend", modalHtml);

  const modalOverlay = document.getElementById("leadCaptureModal");
  const closeBtn = document.getElementById("leadModalClose");
  const form = document.getElementById("leadCaptureForm");
  const submitBtn = document.getElementById("leadSubmitBtn");

  if (!modalOverlay) return;

  function showModal() {
    modalOverlay.style.display = "flex";
  }

  function hideModal() {
    modalOverlay.style.display = "none";
  }

  closeBtn.addEventListener("click", hideModal);
  modalOverlay.addEventListener("click", function (e) {
    if (e.target === modalOverlay) hideModal();
  });

  // State to hold current lead context
  let currentLeadContext = {};

  // Event Delegation for Trigger Buttons (Capture Phase)
  document.addEventListener(
    "click",
    function (e) {
      const btn = e.target.closest(".btn-quick-order, .svc-enquiry-btn");
      if (!btn) return;

      e.preventDefault();
      e.stopPropagation();

      // Extract context based on button type
      if (btn.classList.contains("btn-quick-order")) {
        currentLeadContext = {
          formType: "Products Enquiry",
          source: "Home",
          mainProduct: "-",
          subProduct: btn.getAttribute("data-item") || "-",
          mainService: "-",
          productNameForWa: btn.getAttribute("data-item") || "your products",
        };
      } else if (btn.classList.contains("svc-enquiry-btn")) {
        currentLeadContext = {
          formType: "Products Enquiry",
          source: "Service-Details",
          mainProduct: btn.getAttribute("data-main-product") || "-",
          subProduct: btn.getAttribute("data-sub-product") || "-",
          mainService: btn.getAttribute("data-main-service") || "-",
          productNameForWa:
            btn.getAttribute("data-main-product") || "your service",
        };
      }

      // Reset form and show modal
      form.reset();
      showModal();
    },
    true,
  );

  // Handle Form Submission
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("leadName").value.trim();
    const mobile = document.getElementById("leadMobile").value.trim();

    if (!name || !mobile) return;

    const payload = {
      ...currentLeadContext,
      name: name,
      mobile: mobile,
    };

    submitBtn.disabled = true;
    submitBtn.innerHTML =
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...';

    try {
      await window.submitToGoogleSheet(payload);

      // Hide Modal
      hideModal();

      // Trigger WhatsApp Open
      const waNumber = "917984899514";
      const waMsg = `Hi HK Engimech, my name is ${name}. I would like to inquire about ${payload.productNameForWa}.`;
      const isMobileDevice =
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        );
      const waBaseUrl = isMobileDevice
        ? "https://api.whatsapp.com/send"
        : "https://web.whatsapp.com/send";
      const finalWaUrl = `${waBaseUrl}?phone=${waNumber}&text=${encodeURIComponent(waMsg)}`;

      window.open(finalWaUrl, "_blank");
    } catch (err) {
      console.error("Error submitting lead:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = "Submit & Proceed to WhatsApp";
    }
  });
}
