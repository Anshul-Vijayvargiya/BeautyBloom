// booking.js - 6-Step Booking Wizard Logic

const bookingState = {
  currentStep: 1,
  serviceId: null,
  date: null,
  time: null,
  user: { name: '', email: '', phone: '', notes: '' },
  paymentMethod: 'card' // card or in-store
};

const DATES_TO_SHOW = 60; // Show up to 60 days ahead

document.addEventListener('DOMContentLoaded', () => {
  initBookingModal();
});

// Exposed globally so main.js can trigger it from service cards
window.openBookingModal = (serviceId = null) => {
  if (serviceId) {
    bookingState.serviceId = serviceId;
  }
  document.getElementById('bookingModalBackdrop').classList.add('active');
  goToStep(1);
};

function initBookingModal() {
  // Bind close buttons
  const closeBtns = document.querySelectorAll('.modal-close, #btnCancelBooking');
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('bookingModalBackdrop').classList.remove('active');
      resetBookingState();
    });
  });

  // Footer navigation
  document.getElementById('btnNextStep').addEventListener('click', handleNextStep);
  document.getElementById('btnPrevStep').addEventListener('click', handlePrevStep);
  document.getElementById('btnConfirmBooking').addEventListener('click', handleConfirm);
}

function resetBookingState() {
  bookingState.currentStep = 1;
  bookingState.serviceId = null;
  bookingState.date = null;
  bookingState.time = null;
  bookingState.user = { name: '', email: '', phone: '', notes: '' };
  // Reset UI forms
  document.getElementById('b-name').value = '';
  document.getElementById('b-email').value = '';
  document.getElementById('b-phone').value = '';
  document.getElementById('b-notes').value = '';
}

function goToStep(step) {
  bookingState.currentStep = step;
  
  // Update progress dots
  document.querySelectorAll('.progress-dot').forEach((dot, index) => {
    dot.classList.remove('active', 'completed');
    if (index + 1 === step) dot.classList.add('active');
    if (index + 1 < step) dot.classList.add('completed');
  });

  // Show correct step container
  document.querySelectorAll('.step-container').forEach(container => {
    container.classList.remove('active');
  });
  document.getElementById(`step${step}`).classList.add('active');

  // Update Footer buttons
  const btnPrev = document.getElementById('btnPrevStep');
  const btnNext = document.getElementById('btnNextStep');
  const btnConfirm = document.getElementById('btnConfirmBooking');

  btnPrev.style.display = (step === 1 || step === 6) ? 'none' : 'block';
  btnNext.style.display = (step >= 5) ? 'none' : 'block';
  btnConfirm.style.display = (step === 5) ? 'block' : 'none';

  // Render specific step content
  switch (step) {
    case 1: renderStep1(); break;
    case 2: renderStep2(); break;
    case 3: renderStep3(); break;
    case 4: renderStep4(); break;
    case 5: renderStep5(); break;
    case 6: renderStep6(); break;
  }

  updateSidebarSummary();
  validateCurrentStep();
}

function handleNextStep() {
  if (bookingState.currentStep < 5) {
    goToStep(bookingState.currentStep + 1);
  }
}

function handlePrevStep() {
  if (bookingState.currentStep > 1) {
    goToStep(bookingState.currentStep - 1);
  }
}

function validateCurrentStep() {
  const btnNext = document.getElementById('btnNextStep');
  const btnConfirm = document.getElementById('btnConfirmBooking');
  let isValid = false;

  switch (bookingState.currentStep) {
    case 1: isValid = !!bookingState.serviceId; break;
    case 2: isValid = !!bookingState.date; break;
    case 3: isValid = !!bookingState.time; break;
    case 4: 
      const name = document.getElementById('b-name').value.trim();
      const email = document.getElementById('b-email').value.trim();
      const phone = document.getElementById('b-phone').value.trim();
      isValid = name !== '' && email !== '' && phone !== '';
      break;
    case 5:
      if (bookingState.paymentMethod === 'card') {
        const cn = document.getElementById('cc-num').value;
        const cv = document.getElementById('cc-cvc').value;
        isValid = cn.length >= 15 && cv.length >= 3;
      } else {
        isValid = true;
      }
      break;
  }

  btnNext.disabled = !isValid;
  btnConfirm.disabled = !isValid;
}

/* --- STEP 1: SERVICES --- */
function renderStep1() {
  const catContainer = document.getElementById('b-categories');
  const listContainer = document.getElementById('b-services-list');
  const { categories, services } = window.salonData;

  // Render categories once
  if (catContainer.innerHTML === '') {
    categories.forEach((cat, index) => {
      const btn = document.createElement('button');
      btn.className = `b-cat-btn ${index === 0 ? 'active' : ''}`;
      btn.textContent = cat.name;
      btn.onclick = () => {
        document.querySelectorAll('.b-cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderServiceList(cat.id);
      };
      catContainer.appendChild(btn);
    });
  }

  // Pre-select category if service is already selected via direct link
  let activeCatId = categories[0].id;
  if (bookingState.serviceId) {
    const srv = services.find(s => s.id === bookingState.serviceId);
    if (srv) {
      activeCatId = srv.category;
      document.querySelectorAll('.b-cat-btn').forEach(b => {
        if (b.textContent === categories.find(c => c.id === activeCatId).name) {
          b.click();
        }
      });
    }
  }

  renderServiceList(activeCatId);
}

function renderServiceList(categoryId) {
  const listContainer = document.getElementById('b-services-list');
  listContainer.innerHTML = '';
  
  const { services } = window.salonData;
  const filtered = services.filter(s => s.category === categoryId);

  filtered.forEach(srv => {
    const item = document.createElement('div');
    item.className = `booking-service-item ${bookingState.serviceId === srv.id ? 'selected' : ''}`;
    item.innerHTML = `
      <div class="bs-checkbox"></div>
      <div class="bs-details">
        <div class="bs-name">${srv.name}</div>
        <div class="bs-meta">${srv.duration} mins</div>
      </div>
      <div class="bs-price">₹${srv.price}</div>
    `;
    item.onclick = () => {
      bookingState.serviceId = srv.id;
      document.querySelectorAll('.booking-service-item').forEach(i => i.classList.remove('selected'));
      item.classList.add('selected');
      updateSidebarSummary();
      validateCurrentStep();
    };
    listContainer.appendChild(item);
  });
}

/* --- STEP 2: CALENDAR --- */
let currentMonthOffset = 0;

function renderStep2() {
  renderCalendar();
}

function renderCalendar() {
  const grid = document.getElementById('b-cal-grid');
  const monthLabel = document.getElementById('b-cal-month');
  grid.innerHTML = '';

  const today = new Date();
  const targetDate = new Date(today.getFullYear(), today.getMonth() + currentMonthOffset, 1);
  
  // Format month label
  const options = { month: 'long', year: 'numeric' };
  monthLabel.textContent = targetDate.toLocaleDateString('en-US', options);

  // Add Day Headers
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  days.forEach(d => {
    const el = document.createElement('div');
    el.className = 'cal-day-header';
    el.textContent = d;
    grid.appendChild(el);
  });

  // Calculate days
  const firstDay = targetDate.getDay();
  const daysInMonth = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0).getDate();

  // Empty slots for start of month
  for (let i = 0; i < firstDay; i++) {
    grid.appendChild(document.createElement('div'));
  }

  // Days
  for (let d = 1; d <= daysInMonth; d++) {
    const dateObj = new Date(targetDate.getFullYear(), targetDate.getMonth(), d);
    const dateStr = dateObj.toISOString().split('T')[0];
    
    const el = document.createElement('div');
    el.className = 'cal-date';
    el.textContent = d;

    // Validation rules
    const isPast = dateObj < new Date(new Date().setHours(0,0,0,0));
    const isMonday = dateObj.getDay() === 1; // Salon closed on Mondays

    if (isPast || isMonday) {
      el.classList.add('disabled');
      if (isMonday) el.title = 'Closed on Mondays';
    } else {
      if (bookingState.date === dateStr) {
        el.classList.add('selected');
      }
      el.onclick = () => {
        bookingState.date = dateStr;
        bookingState.time = null; // Reset time if date changes
        renderCalendar();
        updateSidebarSummary();
        validateCurrentStep();
      };
    }
    grid.appendChild(el);
  }

  // Handle arrows
  document.getElementById('cal-prev').onclick = () => {
    if (currentMonthOffset > 0) {
      currentMonthOffset--;
      renderCalendar();
    }
  };
  document.getElementById('cal-next').onclick = () => {
    if (currentMonthOffset < 2) {
      currentMonthOffset++;
      renderCalendar();
    }
  };
}

/* --- STEP 3: TIME SLOTS --- */
function renderStep3() {
  const grid = document.getElementById('b-time-grid');
  grid.innerHTML = '';
  
  if (!bookingState.date) return;

  const times = ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
  
  // Deterministic pseudo-random availability based on date string so it looks real
  const seed = bookingState.date.split('-').reduce((a, b) => parseInt(a) + parseInt(b), 0);
  
  times.forEach((time, index) => {
    const el = document.createElement('div');
    el.className = 'time-slot';
    el.textContent = time;

    // Roughly 30% chance a slot is booked, determined by date+index
    const isBooked = ((seed * (index + 1)) % 100) < 30;

    if (isBooked) {
      el.classList.add('booked');
    } else {
      if (bookingState.time === time) el.classList.add('selected');
      el.onclick = () => {
        bookingState.time = time;
        renderStep3();
        updateSidebarSummary();
        validateCurrentStep();
      };
    }
    grid.appendChild(el);
  });
}

/* --- STEP 4: USER DETAILS --- */
function renderStep4() {
  const inputs = ['b-name', 'b-email', 'b-phone'];
  inputs.forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener('input', () => {
      bookingState.user[id.replace('b-', '')] = el.value;
      validateCurrentStep();
    });
  });
  document.getElementById('b-notes').addEventListener('input', (e) => {
    bookingState.user.notes = e.target.value;
  });
}

/* --- STEP 5: REVIEW & PAYMENT --- */
function renderStep5() {
  // Bind payment options
  document.getElementById('opt-card').onclick = () => setPayment('card');
  document.getElementById('opt-store').onclick = () => setPayment('in-store');
  
  // Bind card inputs to validation
  document.getElementById('cc-num').addEventListener('input', validateCurrentStep);
  document.getElementById('cc-cvc').addEventListener('input', validateCurrentStep);
}

function setPayment(method) {
  bookingState.paymentMethod = method;
  document.getElementById('opt-card').classList.remove('selected');
  document.getElementById('opt-store').classList.remove('selected');
  
  if (method === 'card') {
    document.getElementById('opt-card').classList.add('selected');
    document.getElementById('mock-card-form').classList.add('active');
  } else {
    document.getElementById('opt-store').classList.add('selected');
    document.getElementById('mock-card-form').classList.remove('active');
  }
  validateCurrentStep();
}

async function handleConfirm() {
  const btn = document.getElementById('btnConfirmBooking');
  btn.textContent = 'Processing...';
  btn.disabled = true;

  const lastBookingId = 'BB-' + Math.random().toString(36).slice(2, 8).toUpperCase();
  bookingState.lastBookingId = lastBookingId; // Save it to display on step 6

  goToStep(6);
}

/* --- STEP 6: CONFIRMATION --- */
function renderStep6() {
  const refEl = document.getElementById('confirm-ref');
  const detailsEl = document.getElementById('confirm-details');
  const service = window.salonData.services.find(s => s.id === bookingState.serviceId);

  // Use the reference generated during handleConfirm
  const ref = bookingState.lastBookingId || 'BB-' + Math.random().toString(36).substr(2, 6).toUpperCase();
  refEl.textContent = ref;

  detailsEl.innerHTML = `
    <div class="summary-item">
      <span>Service</span>
      <span>${service.name}</span>
    </div>
    <div class="summary-item">
      <span>Date</span>
      <span>${new Date(bookingState.date).toLocaleDateString()}</span>
    </div>
    <div class="summary-item">
      <span>Time</span>
      <span>${bookingState.time}</span>
    </div>
    <div class="summary-item">
      <span>Client</span>
      <span>${bookingState.user.name}</span>
    </div>
  `;
}

/* --- SIDEBAR SUMMARY --- */
function updateSidebarSummary() {
  const { services } = window.salonData;
  const srv = services.find(s => s.id === bookingState.serviceId);
  
  const elService = document.getElementById('sum-service');
  const elDate = document.getElementById('sum-date');
  const elTime = document.getElementById('sum-time');
  const elTotal = document.getElementById('sum-total');

  if (srv) {
    elService.innerHTML = `<span>${srv.name}</span><span>₹${srv.price}</span>`;
    elTotal.innerHTML = `<span>Total</span><span>₹${srv.price}</span>`;
  } else {
    elService.innerHTML = `<span class="summary-empty">No service selected</span>`;
    elTotal.innerHTML = `<span>Total</span><span>₹0</span>`;
  }

  if (bookingState.date) {
    elDate.innerHTML = `<span>Date</span><span>${new Date(bookingState.date).toLocaleDateString()}</span>`;
  } else {
    elDate.innerHTML = `<span class="summary-empty">No date selected</span>`;
  }

  if (bookingState.time) {
    elTime.innerHTML = `<span>Time</span><span>${bookingState.time}</span>`;
  } else {
    elTime.innerHTML = `<span class="summary-empty">No time selected</span>`;
  }
}
