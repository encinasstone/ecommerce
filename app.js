/**
 * ECOMMERCE ENCINAS STONE - Multi-Layer Compositing Configurator Engine
 * Live Production Stripe Payment API Integration (Official WhatsApp: 6624134300)
 */

document.addEventListener('DOMContentLoaded', () => {

  // Official WhatsApp Number for Encinas Stone (Asesor & Pedidos: 6624134300)
  const OFFICIAL_WHATSAPP_NUMBER = '526624134300';

  // Live Stripe Credentials Provided by User
  const STRIPE_PUBLIC_KEY = 'pk_live_51U5r0eJVkBupjVaLqmnifSEsOF8JgE0nkCXsO4htubbP091zoS8d8jZuHJQ7Qye6QxG4EVpCuBmbpzD56NIs6vj400seE5dOGW';

  // Initialize Official Stripe.js Instance
  let stripe = null;
  let stripeElements = null;
  let stripeCardElement = null;

  try {
    if (typeof Stripe !== 'undefined') {
      stripe = Stripe(STRIPE_PUBLIC_KEY);
      stripeElements = stripe.elements();
      
      // Custom Styled Card Input Field
      stripeCardElement = stripeElements.create('card', {
        style: {
          base: {
            fontSize: '15px',
            color: '#250016',
            fontFamily: "'Inter', sans-serif",
            fontWeight: '500',
            '::placeholder': {
              color: '#8e888d'
            }
          },
          invalid: {
            color: '#D81B60',
            iconColor: '#D81B60'
          }
        }
      });
    }
  } catch (err) {
    console.warn('Stripe SDK initialization warning:', err);
  }

  // Reference Canvas Dimensions (Exact Illustrator Screen: 1087.744 x 610.6633)
  const CANVAS_REF = {
    width: 1087.744,
    height: 610.6633
  };

  // Exact Illustrator Coordinates
  const OFFICIAL_LARGO_TRANSFORM = {
    left: ((617.0459 - 482.355 / 2) / CANVAS_REF.width * 100).toFixed(4) + '%',
    top: ((311.1246 - 46.4627 / 2) / CANVAS_REF.height * 100).toFixed(4) + '%',
    width: (482.355 / CANVAS_REF.width * 100).toFixed(4) + '%',
    height: (46.4627 / CANVAS_REF.height * 100).toFixed(4) + '%'
  };

  const OFFICIAL_ANCHO_TRANSFORM = {
    left: ((769.5484 - 178.92 / 2) / CANVAS_REF.width * 100).toFixed(4) + '%',
    top: ((228.4958 - 32.6289 / 2) / CANVAS_REF.height * 100).toFixed(4) + '%',
    width: (178.92 / CANVAS_REF.width * 100).toFixed(4) + '%',
    height: (32.6289 / CANVAS_REF.height * 100).toFixed(4) + '%'
  };

  // Exact Bounding Box Transformations for BASES
  const BASE_TRANSFORMS = {
    AMPLIA: {
      left: ((544.8721 - 396.0659 / 2) / CANVAS_REF.width * 100).toFixed(4) + '%',
      top: ((410.0323 - 250.8131 / 2) / CANVAS_REF.height * 100).toFixed(4) + '%',
      width: (396.0659 / CANVAS_REF.width * 100).toFixed(4) + '%',
      height: (250.8131 / CANVAS_REF.height * 100).toFixed(4) + '%'
    },
    BAJA: {
      left: ((598.9551 - 555.3374 / 2) / CANVAS_REF.width * 100).toFixed(4) + '%',
      top: ((294.8997 - 436.5169 / 2) / CANVAS_REF.height * 100).toFixed(4) + '%',
      width: (555.3374 / CANVAS_REF.width * 100).toFixed(4) + '%',
      height: (436.5169 / CANVAS_REF.height * 100).toFixed(4) + '%'
    },
    PICADA: {
      left: ((669.2397 - 665.8493 / 2) / CANVAS_REF.width * 100).toFixed(4) + '%',
      top: ((422.5134 - 376.2999 / 2) / CANVAS_REF.height * 100).toFixed(4) + '%',
      width: (665.8493 / CANVAS_REF.width * 100).toFixed(4) + '%',
      height: (376.2999 / CANVAS_REF.height * 100).toFixed(4) + '%'
    }
  };

  // Exact Bounding Box Transformations for CUBIERTAS
  const STONE_TRANSFORMS = {
    AMPLIA: {
      left: ((541.7307 - 663.1168 / 2) / CANVAS_REF.width * 100).toFixed(4) + '%',
      top: ((275.2628 - 95.5967 / 2) / CANVAS_REF.height * 100).toFixed(4) + '%',
      width: (663.1168 / CANVAS_REF.width * 100).toFixed(4) + '%',
      height: (95.5967 / CANVAS_REF.height * 100).toFixed(4) + '%'
    },
    BAJA: {
      left: ((547.5552 - 930.0612 / 2) / CANVAS_REF.width * 100).toFixed(4) + '%',
      top: ((58.6449 - 64.1863 / 2) / CANVAS_REF.height * 100).toFixed(4) + '%',
      width: (930.0612 / CANVAS_REF.width * 100).toFixed(4) + '%',
      height: (64.1863 / CANVAS_REF.height * 100).toFixed(4) + '%'
    },
    PICADA: {
      left: ((561.9573 - 1051.573 / 2) / CANVAS_REF.width * 100).toFixed(4) + '%',
      top: Math.max(0, (240.2587 - 480.5174 / 2) / CANVAS_REF.height * 100).toFixed(4) + '%',
      width: (1051.573 / CANVAS_REF.width * 100).toFixed(4) + '%',
      height: (480.5174 / CANVAS_REF.height * 100).toFixed(4) + '%'
    }
  };

  // Dynamic Shadow Overlay Transformations per Angle View
  const SHADOW_TRANSFORMS = {
    AMPLIA: {
      floor: { left: '26%', top: '74%', width: '48%', height: '18%' },
      top: { left: '22%', top: '44%', width: '56%', height: '14%' }
    },
    BAJA: {
      floor: { left: '24%', top: '70%', width: '60%', height: '22%' },
      top: { left: '10%', top: '10%', width: '80%', height: '12%' }
    },
    PICADA: {
      floor: { left: '25%', top: '82%', width: '65%', height: '16%' },
      top: { left: '6%', top: '38%', width: '90%', height: '24%' }
    }
  };

  // View Angle Sequence for Navigation Arrows
  const VIEW_SEQUENCE = ['AMPLIA', 'PICADA', 'BAJA'];

  // Pricing Matrix
  const PRICING_MATRIX = {
    4: {
      sizeName: 'Chica',
      basePrice: 15950,
      dimensions: '130 x 90 cm',
      cubiertas: {
        'MEL BLANCA': 0,
        'MEL NEGRA': 0,
        'DALLAS': 2850,
        'DIAMOND': 3400,
        'SGABRIEL': 3400,
        'CTT LIGHT': 4350
      },
      bases: {
        'POLAR': 0,
        'ROSA': 0,
        'MOCZAN': 0,
        'PAROTA': 3700
      },
      diseno: {
        'LISO': 0,
        'LAMBRIN': 2600
      }
    },
    6: {
      sizeName: 'Mediana',
      basePrice: 19800,
      dimensions: '160 x 100 cm',
      cubiertas: {
        'MEL BLANCA': 0,
        'MEL NEGRA': 0,
        'DALLAS': 4100,
        'DIAMOND': 5000,
        'SGABRIEL': 5000,
        'CTT LIGHT': 6900
      },
      bases: {
        'POLAR': 0,
        'ROSA': 0,
        'MOCZAN': 0,
        'PAROTA': 3000
      },
      diseno: {
        'LISO': 0,
        'LAMBRIN': 3800
      }
    },
    8: {
      sizeName: 'Grande',
      basePrice: 24100,
      dimensions: '230 x 125 cm',
      cubiertas: {
        'MEL BLANCA': 0,
        'MEL NEGRA': 0,
        'DALLAS': 8800,
        'DIAMOND': 10600,
        'SGABRIEL': 10600,
        'CTT LIGHT': 14400
      },
      bases: {
        'POLAR': 0,
        'ROSA': 0,
        'MOCZAN': 0,
        'PAROTA': 4600
      },
      diseno: {
        'LISO': 0,
        'LAMBRIN': 4600
      }
    }
  };

  // Current Initial State
  const state = {
    capacity: 4,
    sizeName: 'Chica',
    baseCode: 'ROSA',
    baseName: 'Melamina Rosa Morada',
    disenoCode: 'LISO',
    disenoName: 'Liso',
    stoneCode: 'MEL BLANCA',
    stoneName: 'Melamina Blanca',
    currentView: 'AMPLIA'
  };

  // DOM Layer Elements
  const layerFondo = document.getElementById('layer-fondo');
  const layerBase = document.getElementById('layer-base');
  const layerStone = document.getElementById('layer-stone');
  const layerDimensionLargo = document.getElementById('layer-dimension-largo');
  const layerDimensionAncho = document.getElementById('layer-dimension-ancho');
  const shadowFloor = document.getElementById('shadow-floor');
  const shadowTop = document.getElementById('shadow-top');

  // DOM Text Elements
  const selectedModelHeading = document.getElementById('selected-model-heading');
  const selectedSummarySubtitle = document.getElementById('selected-summary-subtitle');

  // Tesla Style Subtitle Indicators
  const selectedBaseNameEl = document.getElementById('selected-base-name');
  const selectedBasePriceEl = document.getElementById('selected-base-price');
  const selectedStoneNameEl = document.getElementById('selected-stone-name');
  const selectedStonePriceEl = document.getElementById('selected-stone-price');

  // Side Navigation Arrows
  const btnPrevView = document.getElementById('btn-prev-view');
  const btnNextView = document.getElementById('btn-next-view');

  // Sticky Bottom Bar
  const barConfigTitle = document.getElementById('bar-config-title');
  const barConfigDetails = document.getElementById('bar-config-details');
  const barTotalPrice = document.getElementById('bar-total-price');

  // Modal & Form Elements
  const quoteModal = document.getElementById('quote-modal');
  const successModal = document.getElementById('success-modal');
  const btnOpenQuote = document.getElementById('btn-open-quote');
  const quoteForm = document.getElementById('quote-form');
  const stripeForm = document.getElementById('stripe-payment-form');
  const cardErrors = document.getElementById('card-errors');
  const modalSummaryTitle = document.getElementById('modal-summary-title');
  const modalSummaryPrice = document.getElementById('modal-summary-price');
  const modalSummaryDetails = document.getElementById('modal-summary-details');
  const stripeBtnAmount = document.getElementById('stripe-btn-amount');

  // Format Currency (MXN)
  const formatMoney = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits: 0
    }).format(amount) + ' MXN';
  };

  // Calculate Total Price
  const calculateTotal = () => {
    const matrix = PRICING_MATRIX[state.capacity];
    const baseTable = matrix.basePrice;
    const stoneUpsell = matrix.cubiertas[state.stoneCode] || 0;
    const baseUpsell = matrix.bases[state.baseCode] || 0;
    const disenoUpsell = matrix.diseno[state.disenoCode] || 0;

    return baseTable + stoneUpsell + baseUpsell + disenoUpsell;
  };

  // Resolve Asset Paths
  const getRenderPaths = () => {
    const view = state.currentView;
    const fondoPath = `assets/FONDOS/${view} FONDO.png`;

    let lambrinText = '';
    if (state.disenoCode === 'LAMBRIN') {
      if (view === 'PICADA' && state.baseCode === 'ROSA') {
        lambrinText = ' LAMBIRN';
      } else {
        lambrinText = ' LAMBRIN';
      }
    }
    const basePath = `assets/BASES/${view} ${state.baseCode}${lambrinText}.png`;
    const stonePath = `assets/CUBIERTAS/${view} ${state.stoneCode}.png`;
    const dimensionLargoPath = `assets/CUBIERTAS/Largo ${state.capacity} personas.png`;
    
    const dimensionAnchoPath = state.capacity === 4 
      ? `assets/CUBIERTAS/Ancho 4 personas.png`
      : `assets/CUBIERTAS/ancho ${state.capacity} personas.png`;

    return { fondoPath, basePath, stonePath, dimensionLargoPath, dimensionAnchoPath };
  };

  // Switch Camera View Angle
  const switchView = (targetViewCode) => {
    state.currentView = targetViewCode;

    document.querySelectorAll('.view-btn').forEach(btn => {
      if (btn.getAttribute('data-view') === targetViewCode) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    updateUI();
  };

  // Update Layer Transformations, Shadows & Official Dynamic PNG Dimension Assets
  const updateRenderStage = () => {
    const paths = getRenderPaths();
    const view = state.currentView;

    const baseCoords = BASE_TRANSFORMS[view];
    if (baseCoords) {
      layerBase.style.left = baseCoords.left;
      layerBase.style.top = baseCoords.top;
      layerBase.style.width = baseCoords.width;
      layerBase.style.height = baseCoords.height;
    }

    const stoneCoords = STONE_TRANSFORMS[view];
    if (stoneCoords) {
      layerStone.style.left = stoneCoords.left;
      layerStone.style.top = stoneCoords.top;
      layerStone.style.width = stoneCoords.width;
      layerStone.style.height = stoneCoords.height;
    }

    if (view === 'AMPLIA') {
      if (layerDimensionLargo) {
        layerDimensionLargo.style.display = 'block';
        layerDimensionLargo.style.left = OFFICIAL_LARGO_TRANSFORM.left;
        layerDimensionLargo.style.top = OFFICIAL_LARGO_TRANSFORM.top;
        layerDimensionLargo.style.width = OFFICIAL_LARGO_TRANSFORM.width;
        layerDimensionLargo.style.height = OFFICIAL_LARGO_TRANSFORM.height;
      }
      if (layerDimensionAncho) {
        layerDimensionAncho.style.display = 'block';
        layerDimensionAncho.style.left = OFFICIAL_ANCHO_TRANSFORM.left;
        layerDimensionAncho.style.top = OFFICIAL_ANCHO_TRANSFORM.top;
        layerDimensionAncho.style.width = OFFICIAL_ANCHO_TRANSFORM.width;
        layerDimensionAncho.style.height = OFFICIAL_ANCHO_TRANSFORM.height;
      }
    } else {
      if (layerDimensionLargo) layerDimensionLargo.style.display = 'none';
      if (layerDimensionAncho) layerDimensionAncho.style.display = 'none';
    }

    const shadows = SHADOW_TRANSFORMS[view];
    if (shadows && shadowFloor && shadowTop) {
      shadowFloor.style.left = shadows.floor.left;
      shadowFloor.style.top = shadows.floor.top;
      shadowFloor.style.width = shadows.floor.width;
      shadowFloor.style.height = shadows.floor.height;

      shadowTop.style.left = shadows.top.left;
      shadowTop.style.top = shadows.top.top;
      shadowTop.style.width = shadows.top.width;
      shadowTop.style.height = shadows.top.height;
    }

    [layerFondo, layerBase, layerStone, layerDimensionLargo, layerDimensionAncho].forEach(el => {
      if (el) el.style.opacity = '0.3';
    });

    setTimeout(() => {
      layerFondo.src = paths.fondoPath;
      layerBase.src = paths.basePath;
      layerStone.src = paths.stonePath;
      if (layerDimensionLargo) layerDimensionLargo.src = paths.dimensionLargoPath;
      if (layerDimensionAncho) layerDimensionAncho.src = paths.dimensionAnchoPath;

      [layerFondo, layerBase, layerStone, layerDimensionLargo, layerDimensionAncho].forEach(el => {
        if (el) {
          el.onload = () => el.style.opacity = '1';
          if (el.complete) el.style.opacity = '1';
        }
      });
    }, 60);
  };

  // Dynamic Badges & Tesla Header Indicators Update
  const updateTeslaHeaderIndicators = () => {
    const matrix = PRICING_MATRIX[state.capacity];

    if (selectedBaseNameEl) selectedBaseNameEl.textContent = state.baseName;
    if (selectedBasePriceEl) {
      const basePrice = matrix.bases[state.baseCode] || 0;
      selectedBasePriceEl.textContent = basePrice === 0 ? 'Incluido' : `+ ${formatMoney(basePrice)}`;
      selectedBasePriceEl.style.color = basePrice === 0 ? 'var(--text-muted)' : 'var(--color-guinda-encinas)';
    }

    if (selectedStoneNameEl) selectedStoneNameEl.textContent = state.stoneName;
    if (selectedStonePriceEl) {
      const stonePrice = matrix.cubiertas[state.stoneCode] || 0;
      selectedStonePriceEl.textContent = stonePrice === 0 ? 'Incluido' : `+ ${formatMoney(stonePrice)}`;
      selectedStonePriceEl.style.color = stonePrice === 0 ? 'var(--text-muted)' : 'var(--color-guinda-encinas)';
    }

    document.querySelectorAll('#step-diseno .design-card').forEach(card => {
      const code = card.getAttribute('data-diseno-code');
      const badge = card.querySelector('.price-delta-badge');
      if (badge && code) {
        const price = matrix.diseno[code] || 0;
        badge.textContent = price === 0 ? 'Incluido' : `+ ${formatMoney(price)}`;
        badge.className = price === 0 ? 'price-delta-badge badge-included' : 'price-delta-badge material-price-delta';
      }
    });
  };

  // Main UI Refresh
  const updateUI = () => {
    const matrix = PRICING_MATRIX[state.capacity];
    const total = calculateTotal();
    const formattedTotal = formatMoney(total);

    selectedModelHeading.textContent = `Mesa ${state.capacity} Personas`;
    selectedSummarySubtitle.textContent = `${state.baseName} (${state.disenoName}) • Cubierta ${state.stoneName}`;

    barConfigTitle.textContent = `Mesa ${state.capacity} Personas`;
    barConfigDetails.textContent = `${state.baseName} (${state.disenoName}) • Cubierta ${state.stoneName}`;
    barTotalPrice.textContent = formattedTotal;

    if (modalSummaryTitle) modalSummaryTitle.textContent = `Mesa ${state.capacity} Personas (${matrix.dimensions})`;
    if (modalSummaryPrice) modalSummaryPrice.textContent = formattedTotal;
    if (modalSummaryDetails) modalSummaryDetails.textContent = `Base: ${state.baseName} (${state.disenoName}) • Cubierta: ${state.stoneName}`;
    if (stripeBtnAmount) stripeBtnAmount.textContent = formattedTotal;

    updateTeslaHeaderIndicators();
    updateRenderStage();
  };

  // Mount Stripe Card Element when modal opens
  let isCardMounted = false;
  const mountStripeCard = () => {
    if (stripeCardElement && !isCardMounted && document.getElementById('stripe-card-element')) {
      stripeCardElement.mount('#stripe-card-element');
      isCardMounted = true;

      stripeCardElement.on('change', (event) => {
        if (cardErrors) {
          cardErrors.textContent = event.error ? event.error.message : '';
        }
      });
    }
  };

  // Preload Assets
  const preloadLayerAssets = () => {
    ['AMPLIA', 'PICADA', 'BAJA'].forEach(v => {
      const img = new Image();
      img.src = `assets/FONDOS/${v} FONDO.png`;
    });
  };

  // Event Listeners

  // Step 1: Capacidad / Medidas
  document.querySelectorAll('.capacity-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.capacity-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      state.capacity = parseInt(card.getAttribute('data-capacity'));
      state.sizeName = card.getAttribute('data-size-name') || PRICING_MATRIX[state.capacity].sizeName;
      updateUI();
    });
  });

  // Step 2: Material de Base
  document.querySelectorAll('#swatch-row-base .tesla-swatch-item').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('#swatch-row-base .tesla-swatch-item').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      state.baseCode = card.getAttribute('data-base-code');
      state.baseName = card.getAttribute('data-base-name');
      switchView('BAJA');
    });
  });

  // Step 3: Diseño de Base
  document.querySelectorAll('#step-diseno .design-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('#step-diseno .design-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      state.disenoCode = card.getAttribute('data-diseno-code');
      state.disenoName = card.getAttribute('data-diseno-name');
      switchView('BAJA');
    });
  });

  // Step 4: Cubierta de Piedra Natural / Melamina
  document.querySelectorAll('#swatch-row-stone .tesla-swatch-item').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('#swatch-row-stone .tesla-swatch-item').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      state.stoneCode = card.getAttribute('data-stone-code');
      state.stoneName = card.getAttribute('data-stone-name');
      switchView('PICADA');
    });
  });

  // View Switcher Buttons
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const viewCode = btn.getAttribute('data-view');
      switchView(viewCode);
    });
  });

  // Side Navigation Arrows
  if (btnNextView) {
    btnNextView.addEventListener('click', () => {
      const currentIndex = VIEW_SEQUENCE.indexOf(state.currentView);
      const nextIndex = (currentIndex + 1) % VIEW_SEQUENCE.length;
      switchView(VIEW_SEQUENCE[nextIndex]);
    });
  }

  if (btnPrevView) {
    btnPrevView.addEventListener('click', () => {
      const currentIndex = VIEW_SEQUENCE.indexOf(state.currentView);
      const prevIndex = (currentIndex - 1 + VIEW_SEQUENCE.length) % VIEW_SEQUENCE.length;
      switchView(VIEW_SEQUENCE[prevIndex]);
    });
  }

  // Modal Open & Mount Stripe Elements
  if (btnOpenQuote) {
    btnOpenQuote.addEventListener('click', () => {
      updateUI();
      quoteModal.classList.add('active');
      setTimeout(mountStripeCard, 100);

      // Trigger Meta Pixel InitiateCheckout Event
      if (window.fbq) {
        window.fbq('track', 'InitiateCheckout', {
          value: calculateTotal(),
          currency: 'MXN',
          content_name: `Mesa ${state.capacity} Personas`
        });
      }
    });
  }

  // Modal Tabs Switching
  document.querySelectorAll('.payment-tabs .tab-btn').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.payment-tabs .tab-btn').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-tab');
      const targetContent = document.getElementById(targetId);
      if (targetContent) targetContent.classList.add('active');
    });
  });

  // Modal Close Handlers
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      quoteModal.classList.remove('active');
      if (successModal) successModal.classList.remove('active');
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  });

  const btnCloseSuccess = document.getElementById('btn-close-success');
  if (btnCloseSuccess) {
    btnCloseSuccess.addEventListener('click', () => {
      if (successModal) successModal.classList.remove('active');
    });
  }

  // FAQ Accordion Click Handler
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const parentItem = btn.closest('.faq-item');
      const isActive = parentItem.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));

      if (!isActive) {
        parentItem.classList.add('active');
      }
    });
  });

  // Mobile Hamburger Menu Toggle
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileClose = document.getElementById('mobile-menu-close');
  const headerNav = document.getElementById('main-header-nav');

  if (mobileToggle && headerNav) {
    mobileToggle.addEventListener('click', () => {
      headerNav.classList.add('mobile-active');
    });
  }

  if (mobileClose && headerNav) {
    mobileClose.addEventListener('click', () => {
      headerNav.classList.remove('mobile-active');
    });
  }

  // Header Asesor Encinas Button
  const openAdvisorBtn = document.getElementById('open-advisor-btn');
  if (openAdvisorBtn) {
    openAdvisorBtn.addEventListener('click', () => {
      const msg = `¡Hola Encinas Stone! Deseo ponerme en contacto con un Asesor Encinas para consultar opciones de personalización de mi mesa de comedor.`;
      window.open(`https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
    });
  }

  // Live Stripe Payment Submission (Routed to 6624134300)
  if (stripeForm) {
    stripeForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('stripe-client-name').value.trim();
      const phoneInput = document.getElementById('stripe-client-phone').value.trim();
      const addressInput = document.getElementById('stripe-client-address').value.trim();
      const city = document.getElementById('stripe-client-city').value || 'Hermosillo';

      const name = nameInput || 'Carlos Encinas';
      const phone = phoneInput || '6624134300';
      const address = addressInput || 'Av. San Carlos #456, Hermosillo';

      const matrix = PRICING_MATRIX[state.capacity];
      const fullMetadata = {
        cliente: name,
        telefono: phone,
        ciudad: city,
        direccion: address,
        modelo: `Mesa ${state.capacity} Personas (${matrix.dimensions})`,
        acabado_base: `${state.baseName}`,
        diseno_base: `${state.disenoName}`,
        cubierta: `${state.stoneName} (20 mm / 40 mm vista)`
      };

      const btnPay = document.getElementById('btn-pay-stripe');

      if (!stripe || !stripeCardElement) {
        if (cardErrors) cardErrors.textContent = 'Procesador de pago no inicializado. Por favor recarga la página.';
        return;
      }

      btnPay.disabled = true;
      btnPay.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Procesando Pago en Servidores de Stripe...`;
      if (cardErrors) cardErrors.textContent = '';

      try {
        let clientSecret = null;

        // Try Server Endpoint first (Vercel Serverless / Local Ruby)
        try {
          const res = await fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              amount: calculateTotal() * 100,
              name: name,
              description: `Orden Encinas Stone: Mesa ${state.capacity} Personas (${name})`,
              metadata: fullMetadata
            })
          });

          if (res.ok) {
            const intentData = await res.json();
            if (intentData.client_secret) {
              clientSecret = intentData.client_secret;
            }
          }
        } catch (serverErr) {
          console.log('Server endpoint fetch fallback:', serverErr);
        }

        // Direct Stripe API Fallback
        if (!clientSecret) {
          const params = new URLSearchParams();
          params.append('amount', (calculateTotal() * 100).toString());
          params.append('currency', 'mxn');
          params.append('payment_method_types[]', 'card');
          params.append('description', `Orden Encinas Stone: Mesa ${state.capacity} Personas (${name})`);
          
          Object.keys(fullMetadata).forEach(k => {
            params.append(`metadata[${k}]`, fullMetadata[k]);
          });

          const directRes = await fetch('https://api.stripe.com/v1/payment_intents', {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' + STRIPE_SECRET_KEY,
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
          });
          const directData = await directRes.json();
          if (directData.client_secret) {
            clientSecret = directData.client_secret;
          } else if (directData.error) {
            throw new Error(directData.error.message);
          }
        }

        if (!clientSecret) {
          throw new Error('No se pudo generar la sesión de pago con Stripe.');
        }

        // Confirm Card Payment with Stripe SDK
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: stripeCardElement,
            billing_details: {
              name: name,
              phone: phone,
              address: {
                city: city,
                line1: address
              }
            }
          }
        });

        if (result.error) {
          if (cardErrors) cardErrors.textContent = result.error.message;
          btnPay.disabled = false;
          btnPay.innerHTML = `<i class="fa-solid fa-lock"></i> Pagar ${formatMoney(calculateTotal())} con Stripe`;
          return;
        }

        if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
          const orderId = `#ENC-${Math.floor(10000 + Math.random() * 90000)}`;
          const totalAmount = formatMoney(calculateTotal());

          // Trigger Meta Pixel Purchase Event
          if (window.fbq) {
            window.fbq('track', 'Purchase', {
              value: calculateTotal(),
              currency: 'MXN',
              content_name: `Mesa ${state.capacity} Personas`,
              order_id: orderId
            });
          }

          // Update Success Modal Data
          document.getElementById('success-order-id').textContent = orderId;
          document.getElementById('success-paid-amount').textContent = totalAmount;

          // Auto-Trigger WhatsApp Notification to 6624134300
          const whatsappMsg = `¡Nuevo Pago Confirmado por Stripe en Dashboard! 💳🎉\n\n` +
            `📦 Orden: ${orderId}\n` +
            `💳 PaymentIntent ID: ${result.paymentIntent.id}\n` +
            `👤 Cliente: ${name}\n` +
            `📞 Teléfono: ${phone}\n` +
            `📍 Ciudad: ${city}\n` +
            `🏠 Dirección: ${address}\n\n` +
            `📐 ESPECIFICACIONES MESA ENCINAS:\n` +
            `• Modelo: Mesa ${state.capacity} Personas (${matrix.dimensions})\n` +
            `• Base: ${state.baseName} (${state.disenoName})\n` +
            `• Cubierta: ${state.stoneName} (20 mm / 40 mm vista)\n` +
            `💰 MONTO PAGADO Y APROBADO: ${totalAmount}\n\n` +
            `✅ Reflejado en Dashboard de Stripe (Estatus: Succeeded)`;

          window.open(`https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMsg)}`, '_blank');

          // Hide Checkout Modal & Show Success Modal
          quoteModal.classList.remove('active');
          if (successModal) successModal.classList.add('active');

          // Reset Form & Button
          stripeForm.reset();
          stripeCardElement.clear();
          btnPay.disabled = false;
          btnPay.innerHTML = `<i class="fa-solid fa-lock"></i> Pagar ${totalAmount} con Stripe`;
        } else {
          if (cardErrors) cardErrors.textContent = 'El pago requiere verificación adicional del banco.';
          btnPay.disabled = false;
          btnPay.innerHTML = `<i class="fa-solid fa-lock"></i> Pagar ${formatMoney(calculateTotal())} con Stripe`;
        }

      } catch (err) {
        console.error('Stripe processing error:', err);
        if (cardErrors) cardErrors.textContent = err.message || 'Ocurrió un error al procesar el pago con el banco.';
        btnPay.disabled = false;
        btnPay.innerHTML = `<i class="fa-solid fa-lock"></i> Pagar ${formatMoney(calculateTotal())} con Stripe`;
      }
    });
  }

  // Direct WhatsApp Order Form Submit Handler (Routed to 6624134300)
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('client-name').value;
      const phone = document.getElementById('client-phone').value;
      const city = document.getElementById('client-city').value;
      const notes = document.getElementById('client-notes').value;

      const text = `¡Hola Encinas Stone! Deseo realizar la siguiente Orden de Compra:\n\n` +
        `👤 Cliente: ${name}\n` +
        `📞 Teléfono: ${phone}\n` +
        `📍 Ciudad: ${city}\n` +
        `${notes ? '📝 Notas: ' + notes + '\n' : ''}\n` +
        `📐 ESPECIFICACIONES DE LA MESA:\n` +
        `• Modelo: Mesa ${state.capacity} Personas (${PRICING_MATRIX[state.capacity].sizeName} - ${PRICING_MATRIX[state.capacity].dimensions})\n` +
        `• Base: ${state.baseName} (${state.disenoName})\n` +
        `• Estructura: Base de acero recubierta\n` +
        `• Cubierta: ${state.stoneName} (20 mm / 40 mm vista)\n` +
        `• Garantía: 2 Años\n` +
        `• Tiempo de Entrega: 15 Días\n` +
        `💰 PRECIO DE COMPRA TOTAL: ${formatMoney(calculateTotal())}\n\n` +
        `¿Me ayudan a confirmar mi pedido?`;

      window.open(`https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
      quoteModal.classList.remove('active');
      quoteForm.reset();
    });
  }

  updateUI();
  preloadLayerAssets();
});
