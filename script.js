// Nav toggle (mobile)
const navToggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('primary-nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!open));
    nav.style.display = open ? 'none' : 'flex';
  });
}

// Current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Modal (newsletter)
function modal(id){ return document.querySelector(id); }
document.querySelectorAll('[data-open-modal]').forEach(btn=>{
  const target = btn.getAttribute('data-open-modal');
  btn.addEventListener('click', ()=> modal(target)?.showModal());
});
document.querySelectorAll('dialog.modal').forEach(dlg=>{
  dlg.addEventListener('click', (e)=>{
    const rect = dlg.querySelector('.modal__card')?.getBoundingClientRect();
    if (!rect) return;
    const clickedOutside = e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom;
    if(clickedOutside) dlg.close();
  });
});

// Lightweight image lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
document.querySelectorAll('[data-gallery]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const src = btn.getAttribute('data-img');
    if (!src) return;
    lightboxImg.src = src;
    lightbox.showModal();
  });
});
lightbox.querySelector('.lightbox__close').addEventListener('click', ()=> lightbox.close());
lightbox.addEventListener('click', (e)=>{
  const rect = lightbox.querySelector('img').getBoundingClientRect();
  const clickedOutside = e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom;
  if(clickedOutside) lightbox.close();
});

// Progressive enhancement: respect prefers-reduced-motion
if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  document.querySelectorAll('.card').forEach((card)=>{
    card.addEventListener('mousemove', (e)=>{
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateX(${y * -3}deg) rotateY(${x * 3}deg) translateZ(0)`;
    });
    card.addEventListener('mouseleave', ()=> card.style.transform = '');
  });
}
// === Carousel logic ===
document.querySelectorAll('.carousel').forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');

  const scrollAmount = () => track.querySelector('img').clientWidth + 16;

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
  });
});
