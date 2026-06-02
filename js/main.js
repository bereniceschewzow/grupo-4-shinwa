/* =============================================
   SHINWA — main.js
   Menú hamburguesa + carrusel + animaciones
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ══════════════════════════════════════════
     MENÚ HAMBURGUESA
     ══════════════════════════════════════════ */
  const btnMenu   = document.querySelector('.btn-menu');
  const navMobile = document.querySelector('header nav');
  const headerEl  = document.querySelector('header');

  if (btnMenu && navMobile) {
    btnMenu.addEventListener('click', (e) => {
      e.stopPropagation();
      const abierto = navMobile.classList.toggle('nav-abierta');
      btnMenu.setAttribute('aria-expanded', abierto);
      document.body.classList.toggle('menu-abierto', abierto);
    });

    navMobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMobile.classList.remove('nav-abierta');
        btnMenu.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-abierto');
      });
    });

    document.addEventListener('click', (e) => {
      if (headerEl && !headerEl.contains(e.target)) {
        navMobile.classList.remove('nav-abierta');
        btnMenu.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-abierto');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        navMobile.classList.remove('nav-abierta');
        btnMenu.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-abierto');
      }
    });
  }

  /* ══════════════════════════════════════════
     CARRUSEL — función genérica
     Recibe: track (el flex), dotsContainer, slidesPerView
     ══════════════════════════════════════════ */
  function initCarrusel(track, dotsContainer, slidesPerView) {
    if (!track || !dotsContainer) return;

    // Solo activo en mobile (< 1024px)
    function isMobile() { return window.innerWidth < 1024; }

    const cards     = Array.from(track.children);
    const total     = cards.length;
    let current     = 0;
    let startX      = 0;
    let isDragging  = false;

    // Crear dots
    dotsContainer.innerHTML = '';
    cards.forEach((_, i) => {
      const btn = document.createElement('button');
      btn.setAttribute('aria-label', `Slide ${i + 1}`);
      if (i === 0) btn.classList.add('activo');
      btn.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(btn);
    });

    function getDotBtns() { return dotsContainer.querySelectorAll('button'); }

    function goTo(index) {
      if (!isMobile()) return;
      current = Math.max(0, Math.min(index, total - 1));

      // Calcular offset: ancho del primer card + su margin-right
      const cardStyle  = getComputedStyle(cards[0]);
      const cardWidth  = cards[0].offsetWidth + parseInt(cardStyle.marginRight || 0);
      track.style.transform = `translateX(-${current * cardWidth}px)`;

      getDotBtns().forEach((btn, i) => btn.classList.toggle('activo', i === current));
    }

    // Swipe táctil
    track.addEventListener('touchstart', (e) => {
      if (!isMobile()) return;
      startX    = e.touches[0].clientX;
      isDragging = true;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      if (!isMobile() || !isDragging) return;
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) diff > 0 ? goTo(current + 1) : goTo(current - 1);
      isDragging = false;
    });

    // Swipe mouse (desktop fallback)
    track.addEventListener('mousedown',  (e) => { startX = e.clientX; isDragging = true; });
    track.addEventListener('mouseup',    (e) => {
      if (!isDragging) return;
      const diff = startX - e.clientX;
      if (Math.abs(diff) > 40) diff > 0 ? goTo(current + 1) : goTo(current - 1);
      isDragging = false;
    });
    track.addEventListener('mouseleave', () => { isDragging = false; });

    // Reiniciar al redimensionar
    window.addEventListener('resize', () => {
      if (!isMobile()) {
        track.style.transform = '';
        current = 0;
        getDotBtns().forEach((btn, i) => btn.classList.toggle('activo', i === 0));
      } else {
        goTo(current);
      }
    }, { passive: true });
  }

  /* ── Carrusel Dioses ── */
  initCarrusel(
    document.querySelector('.dioses-track'),
    document.getElementById('diosesDots'),
    1
  );

  /* ── Carrusel Criaturas ── */
  initCarrusel(
    document.querySelector('.criaturas-track'),
    document.getElementById('criaturasDots'),
    2
  );

  /* ══════════════════════════════════════════
     HEADER — sombra al hacer scroll
     ══════════════════════════════════════════ */
  if (headerEl) {
    window.addEventListener('scroll', () => {
      headerEl.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  /* ══════════════════════════════════════════
     SCROLL REVEAL
     ══════════════════════════════════════════ */
  const selectores = [
    '.seccion-dioses li', '.seccion-criaturas li',
    '.seccion-mitos article', '.seccion-mapa article',
    '.dios-card', '.criatura-card',
    '.mito-card', '.mapa-lugar',
    '.dioses-intro', '.criaturas-intro',
    '.mitos-titulo', '.mapa-titulo',
    '.quiz-card', '.quiz-header'
  ];

  const revealEls = document.querySelectorAll(selectores.join(', '));

  if (revealEls.length > 0) {
    revealEls.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
  }

  /* ══════════════════════════════════════════
     HOVER CARDS
     ══════════════════════════════════════════ */
  document.querySelectorAll(
    '.seccion-dioses li, .dios-card, .seccion-criaturas li, .criatura-card'
  ).forEach(card => {
    card.addEventListener('mouseenter', () => card.classList.add('hovered'));
    card.addEventListener('mouseleave', () => card.classList.remove('hovered'));
  });

  /* ══════════════════════════════════════════
     BUSCADOR
     ══════════════════════════════════════════ */
  const buscador = document.querySelector('#buscador');
  if (buscador) {
    buscador.addEventListener('focus', () => buscador.closest('search')?.classList.add('activo'));
    buscador.addEventListener('blur',  () => buscador.closest('search')?.classList.remove('activo'));
  }

});
