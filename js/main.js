/* =============================================
   SHINWA — main.js
   Menú hamburguesa + animaciones con JS
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ══════════════════════════════════════════
     MENÚ HAMBURGUESA
     ══════════════════════════════════════════ */
  const btnMenu   = document.querySelector('.btn-menu');
  const navMobile = document.querySelector('header nav');
  const header    = document.querySelector('header');

  if (btnMenu && navMobile) {
    btnMenu.addEventListener('click', () => {
      const abierto = navMobile.classList.toggle('nav-abierta');
      btnMenu.setAttribute('aria-expanded', abierto);
      // bloquear scroll del body cuando el menú está abierto
      document.body.classList.toggle('menu-abierto', abierto);
    });

    // cerrar si se hace click en un link del menú
    navMobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMobile.classList.remove('nav-abierta');
        btnMenu.setAttribute('aria-expanded', false);
        document.body.classList.remove('menu-abierto');
      });
    });

    // cerrar si se hace click fuera del header
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target)) {
        navMobile.classList.remove('nav-abierta');
        btnMenu.setAttribute('aria-expanded', false);
        document.body.classList.remove('menu-abierto');
      }
    });
  }

  /* ══════════════════════════════════════════
     SCROLL REVEAL — aparición al hacer scroll
     Agrega .visible cuando el elemento entra al viewport
     ══════════════════════════════════════════ */
  const revealEls = document.querySelectorAll(
    '.seccion-dioses li, .seccion-criaturas li, ' +
    '.seccion-mitos article, .seccion-mapa article, ' +
    '.dios-card, .criatura-card, ' +
    '.mito-card, .mapa-lugar, ' +
    '.dioses-intro, .criaturas-intro, ' +
    '.mitos-titulo, .mapa-titulo, ' +
    '.quiz-card, .quiz-header'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // solo una vez
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });

  /* ══════════════════════════════════════════
     HOVER CARDS DIOSES — efecto de brillo
     ══════════════════════════════════════════ */
  document.querySelectorAll('.seccion-dioses li, .dios-card').forEach(card => {
    card.addEventListener('mouseenter', () => card.classList.add('hovered'));
    card.addEventListener('mouseleave', () => card.classList.remove('hovered'));
  });

  /* ══════════════════════════════════════════
     HOVER CARDS CRIATURAS
     ══════════════════════════════════════════ */
  document.querySelectorAll('.seccion-criaturas li, .criatura-card').forEach(card => {
    card.addEventListener('mouseenter', () => card.classList.add('hovered'));
    card.addEventListener('mouseleave', () => card.classList.remove('hovered'));
  });

  /* ══════════════════════════════════════════
     INPUT BÚSQUEDA — animar label al focus
     ══════════════════════════════════════════ */
  const buscador = document.querySelector('#buscador');
  if (buscador) {
    buscador.addEventListener('focus',  () => buscador.closest('search')?.classList.add('activo'));
    buscador.addEventListener('blur',   () => buscador.closest('search')?.classList.remove('activo'));
  }

  /* ══════════════════════════════════════════
     HEADER — sombra al hacer scroll
     ══════════════════════════════════════════ */
  window.addEventListener('scroll', () => {
    document.querySelector('header')
      ?.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

});
