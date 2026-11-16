/**
 * Solar da Castanha — Forest House (Manteigas, Serra da Estrela)
 * Standard de Produção Bruto — Motion & Interaction System
 * 
 * Filosofia de Hospitalidade Serrana:
 * - Acolhimento caloroso, autêntico e de proximidade no coração da serra.
 * - Ritmo orgânico, sereno e fluido (sem saltos bruscos / no bounce).
 * - Transições suaves com curva cubic-bezier(0.22, 1, 0.36, 1).
 * - Transparência total em disponibilidade, preços e comodidades de montanha.
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollHeader();
  initScrollReveal();
  initMobileMenu();
  initHorizontalBookingBar();
  initDedicatedBookingPage();
  initFaqAccordion();
  initDuvidasForm();
  initBrutoCustomDatePicker();
  initSolarRoomsAccordion();
  initReviewsInteractiveScroll();
  initActivitiesTabs();
  initLegalModal();
});

/**
 * 1. Cabeçalho Dinâmico com Transição Suave ao Scroll (Scrolled State)
 * E controlo progressivo da transição da aba suspensa e visibilidade do CTA
 */
function initScrollHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const heroBookingWrapper = document.querySelector('.hero-booking-wrapper') || document.querySelector('.hero-actions');
  let ticking = false;

  const onScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    
    // 2 scrolls completos (~220px) para a transição progressiva da aba do logo
    const maxScroll = 220;
    const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
    
    header.style.setProperty('--scroll-p', progress.toFixed(3));
    
    if (progress >= 1) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }

    // CTA do Header condicionado ao scroll: surge quando a barra do Hero sai do viewport
    if (heroBookingWrapper && window.innerWidth > 768) {
      const rect = heroBookingWrapper.getBoundingClientRect();
      const isHeroCtaOut = rect.bottom <= 80;
      header.classList.toggle('header-cta-visible', isHeroCtaOut);
    } else {
      header.classList.toggle('header-cta-visible', scrollY > 280);
    }

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();
}

/**
 * Helper de Parsing Flexível de Datas (ISO YYYY-MM-DD e Formato Europeu DD/MM/AAAA)
 */
function parseDateFlexible(val) {
  if (!val) return null;
  if (val instanceof Date) return isNaN(val.getTime()) ? null : val;
  if (typeof val !== 'string') return null;
  const clean = val.trim();
  const ymd = clean.match(/^(\d{4})[-\/\.](\d{1,2})[-\/\.](\d{1,2})$/);
  if (ymd) {
    return new Date(Number(ymd[1]), Number(ymd[2]) - 1, Number(ymd[3]));
  }
  const dmy = clean.match(/^(\d{1,2})[-\/\.](\d{1,2})[-\/\.](\d{4})$/);
  if (dmy) {
    return new Date(Number(dmy[3]), Number(dmy[2]) - 1, Number(dmy[1]));
  }
  const d = new Date(clean);
  return isNaN(d.getTime()) ? null : d;
}

/**
 * Helper de Formatação de Data para Exibição em Português
 */
function formatDateDisplay(d) {
  if (!d) return '';
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * 2. Animação de Scroll Reveal Suave
 */
function initScrollReveal() {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const targets = document.querySelectorAll(
    '.card, .section-header, .feature-img-wrapper, .booking-bar-horizontal, .faq-item, .activity-card'
  );

  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.08
  });

  targets.forEach((el) => {
    el.classList.add('reveal-item');
    observer.observe(el);
  });
}

/**
 * 3. Menu Mobile Toggle
 */
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.neptun-nav') || document.querySelector('.nav-menu');

  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isExpanded = navMenu.classList.contains('active');
      menuBtn.setAttribute('aria-expanded', isExpanded);
      menuBtn.setAttribute('aria-label', isExpanded ? 'Fechar Menu' : 'Abrir Menu');
      menuBtn.innerHTML = isExpanded 
        ? '<svg class="icon-svg-lg" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>'
        : '<svg class="icon-svg-lg" viewBox="0 0 24 24"><path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/></svg>';
    });

    // Fechar ao clicar num link de âncora
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', 'Abrir Menu');
        menuBtn.innerHTML = '<svg class="icon-svg-lg" viewBox="0 0 24 24"><path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/></svg>';
      });
    });
  }
}

/**
 * 4. Barra Horizontal de Disponibilidade do Hero
 */
function initHorizontalBookingBar() {
  const form = document.getElementById('bookingBarForm');
  if (!form) return;

  const checkinInput = document.getElementById('checkin');
  const checkoutInput = document.getElementById('checkout');

  // Predefinição inteligente de datas (+7 dias) se vazio
  if (checkinInput && !checkinInput.value) {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    const checkoutDate = new Date(nextWeek);
    checkoutDate.setDate(nextWeek.getDate() + 2);

    checkinInput.value = formatDateDisplay(nextWeek);
    if (checkoutInput) checkoutInput.value = formatDateDisplay(checkoutDate);
  }

  form.addEventListener('submit', (e) => {
    // Redireciona para a página de reservas preservando os parâmetros
    const checkin = checkinInput ? checkinInput.value : '';
    const checkout = checkoutInput ? checkoutInput.value : '';
    const guests = document.getElementById('guests') ? document.getElementById('guests').value : '2 Hóspedes';
    
    // Validação de intervalo
    const dIn = parseDateFlexible(checkin);
    const dOut = parseDateFlexible(checkout);
    if (dIn && dOut && dOut <= dIn) {
      e.preventDefault();
      alert('A data de check-out deve ser posterior à data de check-in.');
      return;
    }
  });
}

/**
 * 5. Acordeão em Ficheiro das Acomodações do Solar (Estilo File Drawer)
 */
function initSolarRoomsAccordion() {
  const accordion = document.getElementById('housesAccordion');
  if (!accordion) return;

  const items = Array.from(accordion.querySelectorAll('.house-file-item'));
  if (!items.length) return;

  items.forEach(item => {
    const header = item.querySelector('.house-file-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isCurrentlyActive = item.classList.contains('active');

      if (isCurrentlyActive) {
        item.classList.remove('active');
        header.setAttribute('aria-expanded', 'false');
      } else {
        if (window.innerWidth > 992) {
          items.forEach(other => {
            other.classList.remove('active');
            const h = other.querySelector('.house-file-header');
            if (h) h.setAttribute('aria-expanded', 'false');
          });
        }
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');

        // Scroll suave suave até ao cabeçalho da habitação aberta
        setTimeout(() => {
          const rect = item.getBoundingClientRect();
          if (rect.top < 80 || rect.top > window.innerHeight * 0.5) {
            const headerOffset = 90;
            const targetY = window.pageYOffset + rect.top - headerOffset;
            window.scrollTo({ top: targetY, behavior: 'smooth' });
          }
        }, 150);
      }
    });

    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });

    // Carrossel interno da habitação
    initUnitCarousel(item);
  });
}

/**
 * Carrossel interno para cada habitação do Solar
 */
function initUnitCarousel(item) {
  const wrap = item.querySelector('.unit-carousel-wrap');
  if (!wrap) return;

  const track = wrap.querySelector('.unit-carousel-track');
  const slides = Array.from(wrap.querySelectorAll('.unit-carousel-slide'));
  const prevBtn = wrap.querySelector('.carousel-arrow-prev');
  const nextBtn = wrap.querySelector('.carousel-arrow-next');
  const dots = Array.from(wrap.querySelectorAll('.carousel-dot'));

  if (!slides.length) return;
  let currentIndex = 0;

  function updateCarousel(idx) {
    if (idx < 0) idx = slides.length - 1;
    if (idx >= slides.length) idx = 0;
    currentIndex = idx;

    if (track) {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    dots.forEach((d, i) => {
      d.classList.toggle('active', i === currentIndex);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      updateCarousel(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      updateCarousel(currentIndex + 1);
    });
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      updateCarousel(idx);
    });
  });
}

/**
 * 6. Carrossel / Ticker Suave de Avaliações com Suporte a Drag & Touch
 */
function initReviewsInteractiveScroll() {
  const wrapper = document.querySelector('.reviews-ticker-wrapper');
  const track = document.querySelector('.reviews-ticker-track');
  if (!wrapper || !track) return;

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  wrapper.addEventListener('mousedown', (e) => {
    isDown = true;
    wrapper.classList.add('is-dragging');
    track.style.animationPlayState = 'paused';
    startX = e.pageX - wrapper.offsetLeft;
    scrollLeft = wrapper.scrollLeft;
  });

  wrapper.addEventListener('mouseleave', () => {
    if (!isDown) return;
    isDown = false;
    wrapper.classList.remove('is-dragging');
    track.style.animationPlayState = 'running';
  });

  wrapper.addEventListener('mouseup', () => {
    if (!isDown) return;
    isDown = false;
    wrapper.classList.remove('is-dragging');
    track.style.animationPlayState = 'running';
  });

  wrapper.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - wrapper.offsetLeft;
    const walk = (x - startX) * 1.5;
    wrapper.scrollLeft = scrollLeft - walk;
  });

  // Pausar na passagem do cursor para leitura calma
  wrapper.addEventListener('mouseenter', () => {
    track.style.animationPlayState = 'paused';
  });
  wrapper.addEventListener('mouseleave', () => {
    if (!isDown) track.style.animationPlayState = 'running';
  });
}

/**
 * 7. Curadoria de Experiências com Filtros Editoriais e Tempos Reais
 */
function initActivitiesTabs() {
  const grid = document.getElementById('activitiesGrid');
  if (!grid) return;

  const allCards = Array.from(grid.querySelectorAll('.activity-card'));
  if (!allCards.length) return;

  const townSelect = document.getElementById('town-filter-select');
  const categorySelect = document.getElementById('category-filter-select');
  const countBadge = document.getElementById('activities-count-badge');

  const prevBtn = document.getElementById('activitiesPrevBtn');
  const nextBtn = document.getElementById('activitiesNextBtn');
  const dotsContainer = document.getElementById('activitiesDotsGroup');
  const controls = document.getElementById('activitiesPaginationControls');

  // Cartão Editorial da Região
  const townCard = document.getElementById('townFeatureCard');
  const townImg = document.getElementById('townFeatureImg');
  const townTitle = document.getElementById('townFeatureTitle');
  const townDist = document.getElementById('townFeatureDistance');
  const townDesc = document.getElementById('townFeatureDesc');
  const townHighlights = document.getElementById('townFeatureHighlights');

  const TOWNS_DATA = {
    manteigas: {
      title: 'Manteigas',
      distance: '~2,5 km • 5 min do Solar',
      image: 'assets/images/activity_manteigas_vila.jpg',
      imageAlt: 'Vila histórica de Manteigas no Parque Natural da Serra da Estrela',
      desc: 'Coração da Serra da Estrela e berço do Vale Glaciar do Zêzere. Manteigas conjuga cascatas míticas como o Poço do Inferno, a poesia outonal da Rota das Faias e a arte viva do burel.',
      highlights: [
        'Cascata Monumental do Poço do Inferno',
        'Trilho Dourado da Rota das Faias',
        'Vale Glaciar do Zêzere (UNESCO)',
        'Tecelagem de Burel & Termas de Manteigas'
      ]
    },
    seia: {
      title: 'Seia',
      distance: '~26 km • 32 min do Solar',
      image: 'assets/images/activity_seia_sabugueiro.jpg',
      imageAlt: 'Aldeia típica do Sabugueiro em Seia',
      desc: 'Na vertente ocidental da serra, Seia guarda a tradição pastoril mais genuína, as aldeias de montanha como o Sabugueiro, os fornos comunitários de centeio e o saber ancestral do queijo.',
      highlights: [
        'Aldeia Típica do Sabugueiro (Mais Alta de Portugal)',
        'Museu do Pão & Tradições do Centeio',
        'Fumeiro Tradicional & Requeijão com Doce de Abóbora',
        'Porta Ocidental do Parque Natural'
      ]
    },
    covilha: {
      title: 'Covilhã',
      distance: '~24 km • 30 min do Solar',
      image: 'assets/images/activity_covilha_lanificios.jpg',
      imageAlt: 'Covilhã e Museu dos Lanifícios',
      desc: 'Erguida nas encostas viradas para a Cova da Beira, a Covilhã alia a secular indústria de lanifícios e teares à subida direta ao cume da Torre e aos grandes miradouros serranos.',
      highlights: [
        'Museu dos Lanifícios & Real Fábrica de Panos',
        'Torre & Maciço Central a 1993 m de Altitude',
        'Miradouros Panorâmicos da Cova da Beira',
        'Gastronomia Típica & Pastéis de Molho'
      ]
    }
  };

  let currentPage = 1;
  const cardsPerPage = 9;
  let filteredCards = [...allCards];

  function applyFilters() {
    const selectedTown = townSelect ? townSelect.value : 'all';
    const selectedCategory = categorySelect ? categorySelect.value : 'all';

    // Atualizar Cartão Editorial
    if (selectedTown !== 'all' && TOWNS_DATA[selectedTown] && townCard) {
      const data = TOWNS_DATA[selectedTown];
      if (townImg) {
        townImg.src = data.image;
        townImg.alt = data.imageAlt;
      }
      if (townTitle) townTitle.textContent = data.title;
      if (townDist) townDist.textContent = data.distance;
      if (townDesc) townDesc.textContent = data.desc;
      if (townHighlights) {
        townHighlights.innerHTML = data.highlights
          .map(h => `<li><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg><span>${h}</span></li>`)
          .join('');
      }
      townCard.style.display = 'grid';
    } else if (townCard) {
      townCard.style.display = 'none';
    }

    filteredCards = allCards.filter(card => {
      const cardTown = card.dataset.town || '';
      const cardCat = card.dataset.category || '';
      const matchTown = (selectedTown === 'all') || (cardTown === selectedTown);
      const matchCat = (selectedCategory === 'all') || (cardCat === selectedCategory);
      return matchTown && matchCat;
    });

    if (countBadge) {
      const count = filteredCards.length;
      countBadge.textContent = `${count} ${count === 1 ? 'Experiência Disponível' : 'Experiências Disponíveis'}`;
    }

    currentPage = 1;
    renderPage();
  }

  function renderPage() {
    const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

    allCards.forEach(c => c.style.display = 'none');

    const start = (currentPage - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    const visibleBatch = filteredCards.slice(start, end);

    visibleBatch.forEach(c => c.style.display = 'flex');

    if (controls) {
      if (totalPages > 1) {
        controls.style.display = 'flex';
        if (dotsContainer) {
          dotsContainer.innerHTML = '';
          for (let i = 1; i <= totalPages; i++) {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = `activity-dot ${i === currentPage ? 'active' : ''}`;
            dot.setAttribute('aria-label', `Página ${i} de experiências`);
            dot.addEventListener('click', () => {
              currentPage = i;
              renderPage();
            });
            dotsContainer.appendChild(dot);
          }
        }
      } else {
        controls.style.display = 'none';
      }
    }

    if (prevBtn) prevBtn.disabled = (currentPage <= 1);
    if (nextBtn) nextBtn.disabled = (currentPage >= totalPages);
  }

  if (townSelect) townSelect.addEventListener('change', applyFilters);
  if (categorySelect) categorySelect.addEventListener('change', applyFilters);

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderPage();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
      if (currentPage < totalPages) {
        currentPage++;
        renderPage();
      }
    });
  }

  applyFilters();
}

/**
 * 8. Acordeão de FAQs
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isExpanded = questionBtn.getAttribute('aria-expanded') === 'true';

      // Fechar outros no mesmo grupo
      faqItems.forEach(other => {
        if (other !== item) {
          const otherBtn = other.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          other.classList.remove('active');
        }
      });

      questionBtn.setAttribute('aria-expanded', String(!isExpanded));
      item.classList.toggle('active', !isExpanded);
    });
  });
}

/**
 * 9. Formulário Lateral de Dúvidas (Sticky) — Contacto Direto com Anfitriões
 */
function initDuvidasForm() {
  const form = document.getElementById('duvidasForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = (document.getElementById('duvida-nome') || {}).value || 'Hóspede';
    const email = (document.getElementById('duvida-email') || {}).value || '';
    const phone = (document.getElementById('duvida-telefone') || {}).value || '';
    const message = (document.getElementById('duvida-mensagem') || {}).value || '';

    const waText = encodeURIComponent(
      `Olá! O meu nome é ${name}.\n` +
      `Contacto: ${phone || email}\n` +
      `Gostaria de colocar uma dúvida sobre o Solar da Castanha:\n"${message}"`
    );

    const waUrl = `https://wa.me/351919926167?text=${waText}`;

    const feedback = document.createElement('div');
    feedback.className = 'form-success-feedback';
    feedback.style.marginTop = '1rem';
    feedback.style.padding = '1rem';
    feedback.style.backgroundColor = 'var(--primary-light)';
    feedback.style.borderLeft = '3px solid var(--primary-accent)';
    feedback.style.borderRadius = 'var(--border-radius-sm)';
    feedback.innerHTML = `
      <p style="margin: 0 0 0.5rem 0; font-size: 0.9rem; font-weight: 600; color: var(--dark-neutral);">
        Mensagem enviada com sucesso!
      </p>
      <p style="margin: 0 0 0.75rem 0; font-size: 0.85rem; color: var(--text-secondary);">
        O Solar da Castanha responderá o mais brevemente possível. Se preferir resposta imediata:
      </p>
      <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.82rem; padding: 0.45rem 0.9rem;">
        <span>Abrir no WhatsApp</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
    `;

    form.appendChild(feedback);
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;
  });
}

/**
 * 10. Seletor de Datas Personalizado Bruto (Sem Dependências Externas)
 */
function initBrutoCustomDatePicker() {
  // Configuração leve de inputs de data
  const dateInputs = document.querySelectorAll('input[placeholder="DD/MM/AAAA"]');
  dateInputs.forEach(input => {
    input.addEventListener('focus', () => {
      if (!input.value) {
        const today = new Date();
        const next = new Date(today);
        next.setDate(today.getDate() + 7);
        input.placeholder = formatDateDisplay(next);
      }
    });
  });
}

/**
 * 11. Wizard da Página de Reservas Dedicada (`reservas.html`)
 * Inclui Regra 8: Faturação com NIF Opcional e Pagamento Imediato no Momento
 */
function initDedicatedBookingPage() {
  const form = document.getElementById('dedicatedBookingForm');
  if (!form) return;

  // Preços base das habitações
  const UNIT_RATES = {
    tentilhao: { name: 'Suite Tentilhão', rate: 125, maxGuests: 4, desc: 'Suite de montanha nobre com cama king-size, varanda panorâmica para os castanheiros e salamandra.' },
    esquilo: { name: 'Quarto Esquilo', rate: 95, maxGuests: 4, desc: 'Acolhedor quarto rústico em granito original de 1888 e bétula, com recanto de leitura sobre a floresta.' },
    raposa: { name: 'Quarto Raposa', rate: 85, maxGuests: 3, desc: 'Quarto intimista com vista serena para a encosta da serra e o rumor suave da ribeira.' }
  };

  const EXTRA_RATES = {
    cesta_boasvindas: 25,     // Taxa fixa
    piquenique_trilhos: 18    // Por pessoa
  };

  // Elementos do Form
  const checkinInput = document.getElementById('bookCheckin');
  const checkoutInput = document.getElementById('bookCheckout');
  const guestsSelect = document.getElementById('bookGuests');
  const unitRadios = Array.from(document.querySelectorAll('input[name="book_unit"]'));
  const extraCheckboxes = Array.from(document.querySelectorAll('input[name="book_extras"]'));

  // Bloco Faturação Opcional (Regra 8)
  const invoiceToggle = document.getElementById('invoiceToggle');
  const invoiceFields = document.getElementById('invoiceFields');
  const bookName = document.getElementById('bookName');
  const invoiceName = document.getElementById('invoiceName');

  if (invoiceToggle && invoiceFields) {
    invoiceToggle.addEventListener('change', () => {
      invoiceFields.style.display = invoiceToggle.checked ? 'block' : 'none';
      if (invoiceToggle.checked && bookName && invoiceName && !invoiceName.value) {
        invoiceName.value = bookName.value;
      }
    });
  }

  // Preencher Nome Fiscal se o Titular mudar
  if (bookName && invoiceName) {
    bookName.addEventListener('input', () => {
      if (invoiceToggle && invoiceToggle.checked && (!invoiceName.value || invoiceName.value === bookName.defaultValue)) {
        invoiceName.value = bookName.value;
      }
    });
  }

  // Seleção de Métodos de Pagamento (Regra 8)
  const paymentRadios = Array.from(document.querySelectorAll('input[name="payment_method"]'));
  const paymentDetails = {
    card: document.getElementById('paymentDetailsCard'),
    mbway: document.getElementById('paymentDetailsMbway'),
    multibanco: document.getElementById('paymentDetailsMultibanco')
  };

  paymentRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      Object.keys(paymentDetails).forEach(k => {
        if (paymentDetails[k]) paymentDetails[k].style.display = (k === radio.value) ? 'block' : 'none';
      });
      updateBookingSummary();
    });
  });

  // Atualizar Resumo Lateral
  function updateBookingSummary() {
    const summaryUnit = document.getElementById('summaryUnitName');
    const summaryDates = document.getElementById('summaryDatesText');
    const summaryNights = document.getElementById('summaryNightsCount');
    const summaryGuests = document.getElementById('summaryGuestsCount');
    const summaryBasePrice = document.getElementById('summaryBasePrice');
    const summaryExtrasPrice = document.getElementById('summaryExtrasPrice');
    const summaryTotalPrice = document.getElementById('summaryTotalPrice');
    const summaryPaymentMethod = document.getElementById('summaryPaymentMethod');
    const payButtonAmount = document.getElementById('payButtonAmount');

    // Identificar Habitação Selecionada
    const selectedRadio = unitRadios.find(r => r.checked) || unitRadios[0];
    const unitKey = selectedRadio ? selectedRadio.value : 'tentilhao';
    const unit = UNIT_RATES[unitKey] || UNIT_RATES.tentilhao;

    if (summaryUnit) summaryUnit.textContent = unit.name;

    // Calcular Noites
    const dIn = parseDateFlexible(checkinInput ? checkinInput.value : '');
    const dOut = parseDateFlexible(checkoutInput ? checkoutInput.value : '');
    let nights = 2; // Predefinição

    if (dIn && dOut && dOut > dIn) {
      const diffTime = Math.abs(dOut - dIn);
      nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    if (summaryDates && dIn && dOut) {
      summaryDates.textContent = `${formatDateDisplay(dIn)} a ${formatDateDisplay(dOut)}`;
    }
    if (summaryNights) summaryNights.textContent = `${nights} ${nights === 1 ? 'noite' : 'noites'}`;

    // Hóspedes
    const guests = guestsSelect ? guestsSelect.value : '2 Hóspedes';
    if (summaryGuests) summaryGuests.textContent = guests;

    // Preço Base
    const baseTotal = unit.rate * nights;
    if (summaryBasePrice) summaryBasePrice.textContent = `${baseTotal} € (${unit.rate} €/noite)`;

    // Extras
    let extrasTotal = 0;
    extraCheckboxes.forEach(cb => {
      if (cb.checked) {
        if (cb.value === 'cesta_boasvindas') extrasTotal += EXTRA_RATES.cesta_boasvindas;
        if (cb.value === 'piquenique_trilhos') {
          const numGuests = parseInt(guests) || 2;
          extrasTotal += EXTRA_RATES.piquenique_trilhos * numGuests;
        }
      }
    });

    if (summaryExtrasPrice) summaryExtrasPrice.textContent = `${extrasTotal} €`;

    // Preço Final
    const grandTotal = baseTotal + extrasTotal;
    if (summaryTotalPrice) summaryTotalPrice.textContent = `${grandTotal} €`;
    if (payButtonAmount) payButtonAmount.textContent = `${grandTotal} €`;

    // Método de Pagamento
    const selectedPayment = paymentRadios.find(r => r.checked);
    if (summaryPaymentMethod && selectedPayment) {
      const methodLabels = {
        card: 'Cartão Bancário (Seguro)',
        mbway: 'MB WAY Instantâneo',
        multibanco: 'Referência Multibanco'
      };
      summaryPaymentMethod.textContent = methodLabels[selectedPayment.value] || 'Cartão';
    }
  }

  // Ouvintes de alteração
  if (checkinInput) checkinInput.addEventListener('change', updateBookingSummary);
  if (checkoutInput) checkoutInput.addEventListener('change', updateBookingSummary);
  if (guestsSelect) guestsSelect.addEventListener('change', updateBookingSummary);
  unitRadios.forEach(r => r.addEventListener('change', updateBookingSummary));
  extraCheckboxes.forEach(cb => cb.addEventListener('change', updateBookingSummary));

  // Submissão da Reserva e Exibição do Modal de Confirmação com WhatsApp
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = (bookName || {}).value || 'Hóspede Estimado';
    const email = (document.getElementById('bookEmail') || {}).value || '';
    const phone = (document.getElementById('bookPhone') || {}).value || '';
    
    const selectedRadio = unitRadios.find(r => r.checked);
    const unit = UNIT_RATES[selectedRadio ? selectedRadio.value : 'tentilhao'];
    const totalAmount = document.getElementById('summaryTotalPrice') ? document.getElementById('summaryTotalPrice').textContent : '125 €';

    // Gerar Código de Reserva
    const bookingCode = 'SC-' + Math.floor(100000 + Math.random() * 900000);

    // Atualizar e Abrir Modal
    const modal = document.getElementById('bookingConfirmationModal');
    if (modal) {
      const codeEl = document.getElementById('modalBookingCode');
      const nameEl = document.getElementById('modalGuestName');
      const unitEl = document.getElementById('modalUnitName');
      const totalEl = document.getElementById('modalTotalPaid');
      const waBtn = document.getElementById('modalWhatsappBtn');

      if (codeEl) codeEl.textContent = bookingCode;
      if (nameEl) nameEl.textContent = name;
      if (unitEl) unitEl.textContent = unit.name;
      if (totalEl) totalEl.textContent = totalAmount;

      if (waBtn) {
        const waMsg = encodeURIComponent(
          `Olá! Concluí a confirmação de reserva no Solar da Castanha:\n` +
          `Código: ${bookingCode}\n` +
          `Titular: ${name}\n` +
          `Alojamento: ${unit.name}\n` +
          `Contacto: ${phone || email}\n` +
          `Fico a aguardar a confirmação e as informações de receção. Muito obrigado!`
        );
        waBtn.href = `https://wa.me/351919926167?text=${waMsg}`;
      }

      modal.classList.add('active');
    }
  });

  // Fechar Modal
  const closeModalBtns = document.querySelectorAll('.close-booking-modal');
  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = document.getElementById('bookingConfirmationModal');
      if (modal) modal.classList.remove('active');
    });
  });

  // Ler parâmetros da URL (checkin, checkout, guests, unit)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('checkin') && checkinInput) checkinInput.value = urlParams.get('checkin');
  if (urlParams.has('checkout') && checkoutInput) checkoutInput.value = urlParams.get('checkout');
  if (urlParams.has('guests') && guestsSelect) {
    const gVal = urlParams.get('guests');
    for (let opt of guestsSelect.options) {
      if (opt.value === gVal || opt.text === gVal) {
        opt.selected = true;
        break;
      }
    }
  }
  if (urlParams.has('unit')) {
    const uKey = urlParams.get('unit');
    const matchedRadio = unitRadios.find(r => r.value === uKey);
    if (matchedRadio) matchedRadio.checked = true;
  }

  updateBookingSummary();
}

/**
 * 12. Modal Legal / Nota Informativa de Protótipo
 */
function initLegalModal() {
  const legalLinks = document.querySelectorAll('.legal-info-trigger');
  legalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      alert(
        'Solar da Castanha – Forest House\n' +
        'Registo Nacional de Turismo RNET: Nº 8443.\n' +
        'Empreendimento de turismo rural em Souto do Concelho, Manteigas, Serra da Estrela.\n' +
        'Contactos diretos: info@solardacastanha.com | +351 919 926 167.'
      );
    });
  });
}
