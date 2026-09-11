// main.js - Core UI Interactions

document.addEventListener('DOMContentLoaded', () => {
  const { categories, services, galleryImages, testimonials, team } = window.salonData;

  initNavbar();
  renderServices(categories, services);
  renderGallery(galleryImages);
  renderTestimonials(testimonials);
  renderTeam(team);
  initContactForm();
});

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.left = '0';
      navLinks.style.width = '100%';
      navLinks.style.background = 'rgba(251, 247, 242, 0.98)';
      navLinks.style.padding = '20px 0';
      navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.05)';
    });
  }
}

function renderServices(categories, services) {
  const tabsContainer = document.getElementById('service-tabs');
  const gridContainer = document.getElementById('services-grid');
  
  if (!tabsContainer || !gridContainer) return;

  // Render Tabs
  categories.forEach((cat, index) => {
    const btn = document.createElement('button');
    btn.className = `tab-btn ${index === 0 ? 'active' : ''}`;
    btn.textContent = cat.name;
    btn.dataset.target = cat.id;
    
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterServices(cat.id);
    });
    
    tabsContainer.appendChild(btn);
  });

  // Render Services
  services.forEach(service => {
    const card = document.createElement('div');
    card.className = `service-card ${service.category}`;
    card.dataset.category = service.category;
    
    card.innerHTML = `
      <div class="service-info">
        <h3>${service.name}</h3>
        <p class="service-desc">${service.desc}</p>
        <div class="service-meta">
          <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> ${service.duration} mins</span>
        </div>
      </div>
      <div class="service-action text-right">
        <div class="service-price">₹${service.price}</div>
        <button class="book-this-btn mt-2" onclick="window.openBookingModal('${service.id}')">Book</button>
      </div>
    `;
    gridContainer.appendChild(card);
  });

  // Initial Filter
  filterServices(categories[0].id);
}

function filterServices(categoryId) {
  const cards = document.querySelectorAll('.service-card');
  cards.forEach(card => {
    card.classList.remove('animating');
    if (card.dataset.category === categoryId) {
      card.classList.remove('hidden');
      // Trigger reflow to restart animation
      void card.offsetWidth;
      card.classList.add('animating');
    } else {
      card.classList.add('hidden');
    }
  });
}

function renderGallery(images) {
  const grid = document.getElementById('gallery-grid');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  
  if (!grid || !lightbox) return;

  images.forEach(src => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.innerHTML = `
      <img src="${src}" alt="Gallery Image" loading="lazy">
      <div class="gallery-overlay">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
      </div>
    `;
    
    item.addEventListener('click', () => {
      lightboxImg.src = src;
      lightbox.classList.add('active');
    });
    
    grid.appendChild(item);
  });

  lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('active');
  });
}

function renderTestimonials(testimonials) {
  const grid = document.getElementById('testimonial-grid');
  if (!grid) return;

  testimonials.forEach(t => {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    card.innerHTML = `
      <div class="stars mb-3">★★★★★</div>
      <p class="quote">${t.text}</p>
      <div class="client-info">
        <img src="${t.image}" alt="${t.name}">
        <div class="client-details">
          <h4>${t.name}</h4>
          <span>${t.role}</span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderTeam(team) {
  const grid = document.getElementById('team-grid');
  if (!grid) return;

  team.forEach(member => {
    const div = document.createElement('div');
    div.className = 'team-member';
    div.innerHTML = `
      <img src="${member.image}" alt="${member.name}" loading="lazy">
      <h4>${member.name}</h4>
      <span>${member.role}</span>
    `;
    grid.appendChild(div);
  });
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    
    const fields = ['name', 'email', 'message'];
    fields.forEach(field => {
      const input = document.getElementById(field);
      if (!input.value.trim()) {
        input.classList.add('invalid');
        isValid = false;
      } else {
        input.classList.remove('invalid');
      }
      
      if (field === 'email' && input.value) {
        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        if (!emailRegex.test(input.value)) {
          input.classList.add('invalid');
          isValid = false;
        }
      }
    });

    if (isValid) {
      const btn = form.querySelector('button');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        btn.textContent = 'Message Sent!';
        btn.style.background = '#25D366'; // Green success
        form.reset();
        
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      }, 1500);
    }
  });
}
