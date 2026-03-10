/* ============================================================
   main.js — Ankit Portfolio
   All elements are visible by default in CSS.
   This file handles: cursor, skill bar animation, active nav.
   ============================================================ */

/* ── 1. Custom Cursor ── */
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

// Update dot position instantly on mouse move
document.addEventListener('mousemove', function(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top  = mouseY + 'px';
});

// Smoothly lag the ring behind the dot
function animateRing() {
  ringX += (mouseX - ringX) * 0.13;
  ringY += (mouseY - ringY) * 0.13;
  ring.style.left = ringX + 'px';
  ring.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Enlarge ring on hoverable elements
var hoverTargets = document.querySelectorAll('a, button, .skill-card, .proj-card, .stat-card, .contact-card');
hoverTargets.forEach(function(el) {
  el.addEventListener('mouseenter', function() {
    ring.style.width        = '46px';
    ring.style.height       = '46px';
    ring.style.borderColor  = 'rgba(0,212,170,0.65)';
  });
  el.addEventListener('mouseleave', function() {
    ring.style.width        = '30px';
    ring.style.height       = '30px';
    ring.style.borderColor  = 'rgba(0,212,170,0.4)';
  });
});


/* ── 2. Skill Bar Animation ── */
// All bars start at width:0 (set in CSS). Animate them when visible.
var bars = document.querySelectorAll('.bar-fill');

function triggerBar(bar) {
  if (!bar.dataset.animated) {
    bar.dataset.animated = 'yes';
    bar.style.width = bar.dataset.w + '%';
  }
}

function checkBars() {
  bars.forEach(function(bar) {
    var rect = bar.getBoundingClientRect();
    // Trigger when the bar is anywhere in the visible viewport
    if (rect.top < window.innerHeight + 10 && rect.bottom > 0) {
      triggerBar(bar);
    }
  });
}

// Run on scroll
window.addEventListener('scroll', checkBars, { passive: true });

// Run at multiple times after page load as safety net
window.addEventListener('load', function() {
  checkBars();
  setTimeout(checkBars, 300);
  setTimeout(checkBars, 800);
  setTimeout(checkBars, 1500);
});

// Also run immediately (DOM already parsed since script is at bottom)
checkBars();
setTimeout(checkBars, 300);
setTimeout(checkBars, 800);


/* ── 3. Active Nav Link Highlight on Scroll ── */
var sections = document.querySelectorAll('section[id]');
var navLinks  = document.querySelectorAll('.nav-links a');

function updateNav() {
  var scrollY  = window.scrollY;
  var activeId = '';

  sections.forEach(function(sec) {
    if (scrollY >= sec.offsetTop - 180) {
      activeId = sec.id;
    }
  });

  navLinks.forEach(function(link) {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + activeId) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav(); // run on load too


/* ── 4. Navbar shadow on scroll ── */
var navbar = document.getElementById('navbar');
window.addEventListener('scroll', function() {
  if (window.scrollY > 30) {
    navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
  } else {
    navbar.style.boxShadow = 'none';
  }
}, { passive: true });


/* ── 5. Smooth scroll for all anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    var target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
