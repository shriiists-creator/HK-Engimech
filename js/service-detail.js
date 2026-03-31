/**
 * Service Detail Page — Dynamic Content Loader (v2)
 * 3-Section Layout: Info | Sub-Categories (Grid/Slider) | End Products (with Enquiry)
 * Fetches data from data/services-data.json
 * Reads ?service=<slug>&sub=<sub-slug> from URL
 */

(function () {
  'use strict';

  const DATA_PATH = 'data/services-data.json';
  const WHATSAPP_NUMBER = '919099828992';

  // ── WhatsApp Responsive Logic & Debounce ───────
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => { clearTimeout(timeout); func(...args); };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  let whatsappBaseUrl = '';
  function updateWhatsAppUrl() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 992;
    const newBaseUrl = isMobile ? 'https://api.whatsapp.com/send' : 'https://web.whatsapp.com/send';
    
    if (whatsappBaseUrl !== newBaseUrl) {
      whatsappBaseUrl = newBaseUrl;
      // Also update existing links when URL changes
      document.querySelectorAll('.set-url-target').forEach(link => {
        if (link.href && link.href.includes('whatsapp.com')) {
          try {
            const urlObj = new URL(link.href);
            // Re-apply using the new base, retaining params
            link.href = `${whatsappBaseUrl}${urlObj.search}`;
          } catch (e) {
            console.error('Error parsing WhatsApp link:', e);
          }
        }
      });
    }
  }

  updateWhatsAppUrl();
  window.addEventListener('resize', debounce(updateWhatsAppUrl, 250));

  // ── Get URL params ───────────────────────────
  function getParam(key) {
    return new URLSearchParams(window.location.search).get(key);
  }

  // ── Fetch JSON ───────────────────────────────
  async function loadServicesData() {
    try {
      const res = await fetch(DATA_PATH);
      if (!res.ok) throw new Error('Failed to load services data');
      return await res.json();
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  // ── Build a single card HTML ─────────────────
  function buildCard(item, opts = {}) {
    const { showEnquiry, serviceName, subServiceName } = opts;

    let enquiryHtml = '';
    if (showEnquiry) {
      const msg = `Hi HK Engimech, I would like to enquire about:\n\n` +
        `📦 *Product:* ${item.name}\n` +
        `📂 *Sub-Service:* ${subServiceName}\n` +
        `🏷️ *Service:* ${serviceName}`;
      const waUrl = `${whatsappBaseUrl}?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(msg)}`;

      enquiryHtml = `
        <a href="${waUrl}" target="_blank" rel="noopener" class="svc-enquiry-btn set-url-target">
          <span class="iconify me-2" data-icon="logos:whatsapp-icon"></span>
          Enquiry Now
        </a>
      `;
    }

    return `
      <div class="svc-card" data-aos="fade-up">
        <div class="svc-card-img-wrap">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
        </div>
        <div class="svc-card-body">
          <h4 class="svc-card-title">${item.name}</h4>
          <p class="svc-card-desc">${item.description}</p>
          ${enquiryHtml}
        </div>
      </div>
    `;
  }

  // ── Slider logic (pure CSS scroll-snap + JS controls) ──
  let sliderState = { currentIndex: 0, totalSlides: 0 };

  function initSlider(items) {
    const slider = document.getElementById('subcatSlider');
    const dotsContainer = document.getElementById('subcatDots');
    if (!slider || !dotsContainer) return;

    // Calculate visible slides (2 on desktop, 1 on mobile)
    const isMobile = window.innerWidth <= 767;
    const perView = isMobile ? 1 : 2;
    const totalDots = Math.ceil(items.length / perView);

    sliderState.currentIndex = 0;
    sliderState.totalSlides = totalDots;

    // Build slider cards
    slider.innerHTML = items.map(item => `
      <div class="svc-slider-card">
        <div class="svc-card">
          <div class="svc-card-img-wrap">
            <img src="${item.image}" alt="${item.name}" loading="lazy">
          </div>
          <div class="svc-card-body">
            <h4 class="svc-card-title">${item.name}</h4>
            <p class="svc-card-desc">${item.description}</p>
          </div>
        </div>
      </div>
    `).join('');

    // Build dots
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('button');
      dot.className = 'svc-slider-dot' + (i === 0 ? ' active' : '');
      dot.dataset.index = i;
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }

    // Scroll event to update dots
    slider.addEventListener('scroll', () => {
      const scrollLeft = slider.scrollLeft;
      const cardWidth = slider.querySelector('.svc-slider-card')?.offsetWidth || 1;
      const gap = 20;
      const currentIdx = Math.round(scrollLeft / ((cardWidth + gap) * perView));
      updateDots(currentIdx);
    });
  }

  function goToSlide(index) {
    const slider = document.getElementById('subcatSlider');
    if (!slider) return;
    const card = slider.querySelector('.svc-slider-card');
    if (!card) return;

    const isMobile = window.innerWidth <= 767;
    const perView = isMobile ? 1 : 2;
    const gap = 20;
    const scrollTo = index * (card.offsetWidth + gap) * perView;

    slider.scrollTo({ left: scrollTo, behavior: 'smooth' });
    sliderState.currentIndex = index;
    updateDots(index);
  }

  function updateDots(index) {
    const dots = document.querySelectorAll('#subcatDots .svc-slider-dot');
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
    sliderState.currentIndex = index;
  }

  // ── Render page ──────────────────────────────
  async function init() {
    const data = await loadServicesData();
    if (!data || !data.services || data.services.length === 0) {
      document.getElementById('serviceTitle').textContent = 'Service Not Found';
      document.getElementById('serviceDesc').textContent = 'Unable to load service data. Please try again later.';
      return;
    }

    const serviceSlug = getParam('service');
    const subSlug = getParam('sub');

    // Find the matching service category
    let service = data.services.find(s => s.slug === serviceSlug);

    // Fallback to first service if not found
    if (!service) {
      service = data.services[0];
    }

    // Update page title and banner
    document.title = `${service.name} | HK Engimech`;
    const bannerTitle = document.getElementById('pageBannerTitle');
    const bannerDesc = document.getElementById('pageBannerDesc');
    if (bannerTitle) bannerTitle.textContent = service.name;
    if (bannerDesc) bannerDesc.textContent = service.description || 'Expert packaging and industrial solutions.';

    // Update sidebar header
    const sidebarTitle = document.getElementById('sidebarTitle');
    if (sidebarTitle) sidebarTitle.textContent = service.name;

    // Update mobile trigger text
    const mobileTrigger = document.getElementById('mobileSidebarTrigger');
    if (mobileTrigger) {
      mobileTrigger.querySelector('span:first-child').textContent = service.name;
    }

    // Build sidebar list
    const sidebarList = document.getElementById('sidebarList');
    sidebarList.innerHTML = '';

    service.subServices.forEach((sub, index) => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.className = 'service-sidebar-link';
      link.href = 'javascript:void(0)';
      link.dataset.index = index;
      link.innerHTML = `
        <span class="sidebar-icon">
          <span class="iconify" data-icon="mdi:check-circle"></span>
        </span>
        <span>${sub.name}</span>
      `;

      // Click handler
      link.addEventListener('click', function (e) {
        e.preventDefault();
        setActiveSub(index, service);

        // On mobile, close the sidebar list
        if (window.innerWidth <= 991) {
          sidebarList.classList.remove('open');
          mobileTrigger?.classList.remove('open');
        }
      });

      li.appendChild(link);
      sidebarList.appendChild(li);
    });

    // Determine which sub-service to show initially
    let initialIndex = 0;
    if (subSlug) {
      const foundIndex = service.subServices.findIndex(s => s.slug === subSlug);
      if (foundIndex >= 0) initialIndex = foundIndex;
    }

    // Activate initial sub-service
    setActiveSub(initialIndex, service);

    // Re-init Iconify for dynamically added icons
    if (window.Iconify) {
      setTimeout(() => Iconify.scan(), 100);
    }

    // Setup view toggle
    initViewToggle();

    // Setup slider prev/next
    initSliderControls();
  }

  // ── Set active sub-service ───────────────────
  function setActiveSub(index, service) {
    const sub = service.subServices[index];
    if (!sub) return;

    // Update active state in sidebar
    const links = document.querySelectorAll('.service-sidebar-link');
    links.forEach(link => link.classList.remove('active'));
    if (links[index]) links[index].classList.add('active');

    // Fade out content
    const contentArea = document.getElementById('serviceContentArea');
    contentArea.classList.add('fade-out');
    contentArea.classList.remove('fade-in');

    setTimeout(() => {
      // ── SECTION 1: Service Name & Description ──
      const img = document.getElementById('serviceImage');
      img.src = sub.image;
      img.alt = sub.name;

      document.getElementById('serviceTitle').textContent = sub.name;
      document.getElementById('serviceDesc').textContent = sub.description;

      // Update WhatsApp CTA with service name
      const whatsappLink = document.querySelector('#svcSectionInfo .set-url-target');
      if (whatsappLink) {
        const msg = `Hi HK Engimech, I would like to inquire about your *${sub.name}* service.`;
        whatsappLink.href = `${whatsappBaseUrl}?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(msg)}`;
      }

      // ── SECTION 2: Sub-Categories ──
      const subcatSection = document.getElementById('svcSectionSubcategories');
      const subcatGrid = document.getElementById('subcatGrid');

      if (sub.subcategories && sub.subcategories.length > 0) {
        subcatSection.style.display = 'block';

        // Build grid cards
        subcatGrid.innerHTML = sub.subcategories.map(cat => buildCard(cat)).join('');

        // Build slider cards
        initSlider(sub.subcategories);
      } else {
        subcatSection.style.display = 'none';
      }

      // ── SECTION 3: End Products ──
      const endproductSection = document.getElementById('svcSectionEndproducts');
      const endproductGrid = document.getElementById('endproductGrid');

      if (sub.endProducts && sub.endProducts.length > 0) {
        endproductSection.style.display = 'block';

        endproductGrid.innerHTML = sub.endProducts.map(prod =>
          buildCard(prod, {
            showEnquiry: true,
            serviceName: service.name,
            subServiceName: sub.name
          })
        ).join('');
      } else {
        endproductSection.style.display = 'none';
      }

      // ── Add-On Category (for consumables) ──
      const addonSection = document.getElementById('svcSectionAddon');
      const addonGrid = document.getElementById('addonGrid');

      if (sub.optionalAddOnCategory && sub.optionalAddOnCategory.length > 0) {
        addonSection.style.display = 'block';

        addonGrid.innerHTML = sub.optionalAddOnCategory.map(addon =>
          buildCard(addon, {
            showEnquiry: true,
            serviceName: service.name,
            subServiceName: sub.name
          })
        ).join('');
      } else {
        addonSection.style.display = 'none';
      }

      // Update URL without reload
      const url = new URL(window.location);
      url.searchParams.set('sub', sub.slug);
      window.history.replaceState({}, '', url);

      // Fade in content
      contentArea.classList.remove('fade-out');
      contentArea.classList.add('fade-in');

      // Re-init Iconify for new icons
      if (window.Iconify) {
        setTimeout(() => Iconify.scan(), 50);
      }

      // Re-init AOS for new cards
      if (window.AOS) {
        setTimeout(() => AOS.refresh(), 100);
      }
    }, 250);
  }

  // ── View toggle (Grid ↔ Slider) ─────────────
  function initViewToggle() {
    const toggleContainer = document.getElementById('subcatViewToggle');
    if (!toggleContainer) return;

    toggleContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.svc-toggle-btn');
      if (!btn) return;

      const view = btn.dataset.view;
      const grid = document.getElementById('subcatGrid');
      const sliderWrap = document.getElementById('subcatSliderWrap');

      // Update active button
      toggleContainer.querySelectorAll('.svc-toggle-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (view === 'grid') {
        grid.style.display = '';
        sliderWrap.style.display = 'none';
      } else {
        grid.style.display = 'none';
        sliderWrap.style.display = '';
        // Reset slider scroll position
        const slider = document.getElementById('subcatSlider');
        if (slider) slider.scrollTo({ left: 0, behavior: 'instant' });
        goToSlide(0);
      }
    });
  }

  // ── Slider prev/next buttons ────────────────
  function initSliderControls() {
    const prevBtn = document.getElementById('subcatPrev');
    const nextBtn = document.getElementById('subcatNext');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const newIdx = Math.max(0, sliderState.currentIndex - 1);
        goToSlide(newIdx);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const newIdx = Math.min(sliderState.totalSlides - 1, sliderState.currentIndex + 1);
        goToSlide(newIdx);
      });
    }
  }

  // ── Mobile sidebar toggle ────────────────────
  function initMobileSidebar() {
    const trigger = document.getElementById('mobileSidebarTrigger');
    const list = document.getElementById('sidebarList');

    if (trigger && list) {
      trigger.addEventListener('click', () => {
        trigger.classList.toggle('open');
        list.classList.toggle('open');
      });
    }
  }

  // ── Run on DOM ready ─────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initMobileSidebar();
      init();
    });
  } else {
    initMobileSidebar();
    init();
  }

})();
