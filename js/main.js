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
  const headerEl  = document.querySelector('header');

  if (btnMenu && navMobile) {

    btnMenu.addEventListener('click', (e) => {
      e.stopPropagation();
      const abierto = navMobile.classList.toggle('nav-abierta');
      btnMenu.setAttribute('aria-expanded', abierto);
      document.body.classList.toggle('menu-abierto', abierto);
    });

    // cerrar al hacer click en cualquier link del menú
    navMobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMobile.classList.remove('nav-abierta');
        btnMenu.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-abierto');
      });
    });

    // cerrar al hacer click fuera del header
    document.addEventListener('click', (e) => {
      if (headerEl && !headerEl.contains(e.target)) {
        navMobile.classList.remove('nav-abierta');
        btnMenu.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-abierto');
      }
    });

    // cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        navMobile.classList.remove('nav-abierta');
        btnMenu.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-abierto');
      }
    });
  }

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
     Elementos que entran al viewport reciben .visible
     Los que ya están visibles al cargar también
     ══════════════════════════════════════════ */
  const selectores = [
    '.seccion-dioses li',
    '.seccion-criaturas li',
    '.seccion-mitos article',
    '.seccion-mapa article',
    '.dios-card',
    '.criatura-card',
    '.mito-card',
    '.mapa-lugar',
    '.dioses-intro',
    '.criaturas-intro',
    '.mitos-titulo',
    '.mapa-titulo',
    '.quiz-card',
    '.quiz-header'
  ];

  const revealEls = document.querySelectorAll(selectores.join(', '));

  if (revealEls.length > 0) {
    // marcar todos como ocultos primero
    revealEls.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0,        // dispara en cuanto aparece 1px
      rootMargin: '0px 0px -40px 0px'  // un poco antes del borde inferior
    });

    revealEls.forEach(el => observer.observe(el));
  }

  /* ══════════════════════════════════════════
     HOVER CARDS — añade clase .hovered
     (permite efectos extra desde CSS o JS)
     ══════════════════════════════════════════ */
  document.querySelectorAll(
    '.seccion-dioses li, .dios-card, .seccion-criaturas li, .criatura-card'
  ).forEach(card => {
    card.addEventListener('mouseenter', () => card.classList.add('hovered'));
    card.addEventListener('mouseleave', () => card.classList.remove('hovered'));
  });

  /* ══════════════════════════════════════════
     BUSCADOR — clase .activo en el wrapper
     ══════════════════════════════════════════ */
  const buscador = document.querySelector('#buscador');
  if (buscador) {
    buscador.addEventListener('focus', () => {
      buscador.closest('search')?.classList.add('activo');
    });
    buscador.addEventListener('blur', () => {
      buscador.closest('search')?.classList.remove('activo');
    });
  }

});
