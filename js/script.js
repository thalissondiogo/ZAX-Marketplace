// ============================================================
//  ZAX Marketplace — Script Principal
//  Features: i18n, multi-currency, reviews, loyalty, search+
// ============================================================

// ── Estado Global ──
const products = PRODUCTS_DATA;
let cart = [];
let wishlist = [];
let currentFilter = 'all';
let currentSort = 'featured';
let currentLang = CONFIG.defaultLang;
let currentCurrency = CONFIG.defaultCurrency;
let carouselPosition = 0;
let recentlyViewed = [];
let loyaltyPoints = 0;

// ── Traduções ──
const I18N = {
    'pt-BR': {
        'trustbar.secure': 'Compra 100% Segura',
        'trustbar.shipping': 'Frete Grátis acima de R$199',
        'trustbar.return': 'Devolução em até 7 dias',
        'trustbar.quality': 'Qualidade Garantida',
        'nav.home': 'Início', 'nav.products': 'Produtos', 'nav.about': 'Sobre', 'nav.contact': 'Contato', 'nav.cart': 'Carrinho',
        'hero.badge': '🔥 Ofertas de até 50% OFF',
        'hero.title': 'Seu marketplace<br>de <span class="text-gradient">confiança</span>',
        'hero.subtitle': 'Descubra milhares de produtos com preços incríveis, entrega rápida e compra 100% segura. Sua satisfação é nossa prioridade.',
        'hero.trust.secure': 'Compra Segura', 'hero.trust.shipping': 'Frete Grátis', 'hero.trust.returns': '7 Dias Devolução',
        'cat.electronics': 'Eletrônicos', 'cat.fashion': 'Moda', 'cat.home': 'Casa', 'cat.accessories': 'Acessórios', 'cat.all': 'Todos',
        'featured.title': '🔥 Produtos em Destaque', 'featured.subtitle': 'Selecionados especialmente para você', 'featured.seeAll': 'Ver todos →',
        'products.title': 'Nossos Produtos', 'products.subtitle': 'Qualidade e preço justo em cada item',
        'filter.all': 'Todos', 'filter.electronics': 'Eletrônicos', 'filter.fashion': 'Moda', 'filter.home': 'Casa', 'filter.accessories': 'Acessórios',
        'sort.featured': 'Destaques', 'sort.priceAsc': 'Menor Preço', 'sort.priceDesc': 'Maior Preço', 'sort.rating': 'Avaliação', 'sort.bestseller': 'Mais Vendidos',
        'loyalty.title': 'ZAX Points — Programa de Fidelidade',
        'loyalty.description': 'Ganhe pontos a cada compra e suba de nível. Quanto mais alto seu nível, maiores seus descontos exclusivos!',
        'loyalty.points': 'Seus Pontos', 'loyalty.level': 'Seu Nível', 'loyalty.next': 'Próximo Nível',
        'about.title': 'Por que escolher a ZAX?', 'about.subtitle': 'Mais do que um marketplace, uma experiência de confiança',
        'about.secure.title': 'Compra 100% Segura', 'about.secure.desc': 'Dados protegidos com criptografia de ponta. Certificação SSL e PCI DSS.',
        'about.delivery.title': 'Entrega Rápida', 'about.delivery.desc': 'Frete grátis acima de R$199. Rastreamento em tempo real do seu pedido.',
        'about.return.title': 'Devolução Fácil', 'about.return.desc': '7 dias para devolver sem burocracia. Reembolso garantido.',
        'about.quality.title': 'Qualidade Verificada', 'about.quality.desc': 'Todos os vendedores são verificados. Produtos com selo de qualidade ZAX.',
        'about.ai.title': 'Recomendações com IA', 'about.ai.desc': 'Produtos selecionados especialmente para seu perfil de compras.',
        'about.support.title': 'Suporte 24/7', 'about.support.desc': 'Atendimento via WhatsApp, chat e e-mail sempre que precisar.',
        'contact.title': 'Entre em Contato', 'contact.subtitle': 'Estamos sempre prontos para ajudar',
        'contact.talk': 'Fale Conosco', 'contact.talkDesc': 'Estamos aqui para ajudar! Entre em contato através dos nossos canais.',
        'contact.social': 'Siga-nos', 'contact.send': 'Envie uma Mensagem',
        'contact.name': 'Nome', 'contact.email': 'E-mail', 'contact.message': 'Mensagem', 'contact.submit': 'Enviar Mensagem',
        'newsletter.title': '📬 Receba ofertas exclusivas', 'newsletter.desc': 'Cadastre-se e ganhe 10% OFF na primeira compra + ofertas antecipadas.', 'newsletter.btn': 'Quero 10% OFF',
        'cart.title': 'Seu Carrinho', 'cart.empty': 'Seu carrinho está vazio', 'cart.emptyHint': 'Adicione produtos para continuar',
        'cart.total': 'Total', 'cart.checkout': 'Finalizar via WhatsApp', 'cart.freeShipping': 'Frete Grátis',
        'review.title': 'Avaliações do Produto', 'review.verified': '✓ Compra Verificada', 'review.helpful': 'pessoas acharam útil',
        'locale.language': 'Idioma', 'locale.currency': 'Moeda',
        'footer.desc': 'Seu marketplace de confiança. Produtos incríveis, preços acessíveis e compra 100% segura.',
        'footer.shop': 'Loja', 'footer.offers': 'Ofertas', 'footer.new': 'Novidades', 'footer.bestsellers': 'Mais Vendidos',
        'footer.help': 'Ajuda', 'footer.faq': 'FAQ', 'footer.shipping': 'Entrega', 'footer.returns': 'Devoluções', 'footer.contactUs': 'Fale Conosco',
        'footer.company': 'Empresa', 'footer.careers': 'Carreiras', 'footer.privacy': 'Privacidade', 'footer.terms': 'Termos',
        'footer.rights': 'Todos os direitos reservados.',
        'fab.whatsapp': 'Fale conosco', 'ui.loading': 'Carregando...',
        'toast.added': 'adicionado ao carrinho', 'toast.removed': 'removido do carrinho',
        'toast.wishlistAdd': 'adicionado à lista de desejos', 'toast.wishlistRemove': 'removido da lista de desejos',
        'toast.newsletter': 'Inscrição realizada com sucesso! 🎉',
        'toast.emailOpening': 'Abrindo seu cliente de e-mail...',
        'toast.fillFields': 'Por favor, preencha todos os campos.',
        'toast.invalidEmail': 'Por favor, informe um e-mail válido.',
        'btn.add': 'Adicionar', 'btn.added': '✓ Adicionado',
        'shipping.free': '🎉 Você ganhou frete grátis!',
        'shipping.remaining': 'Faltam <strong>{amount}</strong> para frete grátis! 🚚',
        'reviews': 'avaliações', 'sold': 'vendidos',
    },
    'en': {
        'trustbar.secure': '100% Secure Purchase',
        'trustbar.shipping': 'Free Shipping over $38',
        'trustbar.return': '7-Day Easy Returns',
        'trustbar.quality': 'Quality Guaranteed',
        'nav.home': 'Home', 'nav.products': 'Products', 'nav.about': 'About', 'nav.contact': 'Contact', 'nav.cart': 'Cart',
        'hero.badge': '🔥 Up to 50% OFF Deals',
        'hero.title': 'Your trusted<br><span class="text-gradient">marketplace</span>',
        'hero.subtitle': 'Discover thousands of products with amazing prices, fast delivery, and 100% secure purchase. Your satisfaction is our priority.',
        'hero.trust.secure': 'Secure Purchase', 'hero.trust.shipping': 'Free Shipping', 'hero.trust.returns': '7-Day Returns',
        'cat.electronics': 'Electronics', 'cat.fashion': 'Fashion', 'cat.home': 'Home', 'cat.accessories': 'Accessories', 'cat.all': 'All',
        'featured.title': '🔥 Featured Products', 'featured.subtitle': 'Handpicked just for you', 'featured.seeAll': 'See all →',
        'products.title': 'Our Products', 'products.subtitle': 'Quality and fair prices on every item',
        'filter.all': 'All', 'filter.electronics': 'Electronics', 'filter.fashion': 'Fashion', 'filter.home': 'Home', 'filter.accessories': 'Accessories',
        'sort.featured': 'Featured', 'sort.priceAsc': 'Lowest Price', 'sort.priceDesc': 'Highest Price', 'sort.rating': 'Rating', 'sort.bestseller': 'Best Sellers',
        'loyalty.title': 'ZAX Points — Loyalty Program',
        'loyalty.description': 'Earn points on every purchase and level up. The higher your level, the bigger your exclusive discounts!',
        'loyalty.points': 'Your Points', 'loyalty.level': 'Your Level', 'loyalty.next': 'Next Level',
        'about.title': 'Why choose ZAX?', 'about.subtitle': 'More than a marketplace, a trust experience',
        'about.secure.title': '100% Secure Purchase', 'about.secure.desc': 'Data protected with end-to-end encryption. SSL and PCI DSS certified.',
        'about.delivery.title': 'Fast Delivery', 'about.delivery.desc': 'Free shipping over $38. Real-time order tracking.',
        'about.return.title': 'Easy Returns', 'about.return.desc': '7 days to return hassle-free. Guaranteed refund.',
        'about.quality.title': 'Verified Quality', 'about.quality.desc': 'All sellers are verified. Products with ZAX quality seal.',
        'about.ai.title': 'AI Recommendations', 'about.ai.desc': 'Products selected especially for your shopping profile.',
        'about.support.title': '24/7 Support', 'about.support.desc': 'Support via WhatsApp, chat, and email whenever you need.',
        'contact.title': 'Contact Us', 'contact.subtitle': "We're always ready to help",
        'contact.talk': 'Talk to Us', 'contact.talkDesc': "We're here to help! Contact us through our service channels.",
        'contact.social': 'Follow Us', 'contact.send': 'Send a Message',
        'contact.name': 'Name', 'contact.email': 'Email', 'contact.message': 'Message', 'contact.submit': 'Send Message',
        'newsletter.title': '📬 Get exclusive deals', 'newsletter.desc': 'Sign up and get 10% OFF on your first purchase + early access deals.', 'newsletter.btn': 'Get 10% OFF',
        'cart.title': 'Your Cart', 'cart.empty': 'Your cart is empty', 'cart.emptyHint': 'Add products to continue',
        'cart.total': 'Total', 'cart.checkout': 'Checkout via WhatsApp', 'cart.freeShipping': 'Free Shipping',
        'review.title': 'Product Reviews', 'review.verified': '✓ Verified Purchase', 'review.helpful': 'people found this helpful',
        'locale.language': 'Language', 'locale.currency': 'Currency',
        'footer.desc': 'Your trusted marketplace. Amazing products, affordable prices, and 100% secure purchase.',
        'footer.shop': 'Shop', 'footer.offers': 'Deals', 'footer.new': "What's New", 'footer.bestsellers': 'Best Sellers',
        'footer.help': 'Help', 'footer.faq': 'FAQ', 'footer.shipping': 'Shipping', 'footer.returns': 'Returns', 'footer.contactUs': 'Contact Us',
        'footer.company': 'Company', 'footer.careers': 'Careers', 'footer.privacy': 'Privacy', 'footer.terms': 'Terms',
        'footer.rights': 'All rights reserved.',
        'fab.whatsapp': 'Talk to us', 'ui.loading': 'Loading...',
        'toast.added': 'added to cart', 'toast.removed': 'removed from cart',
        'toast.wishlistAdd': 'added to wishlist', 'toast.wishlistRemove': 'removed from wishlist',
        'toast.newsletter': 'Successfully subscribed! 🎉',
        'toast.emailOpening': 'Opening your email client...',
        'toast.fillFields': 'Please fill in all fields.',
        'toast.invalidEmail': 'Please enter a valid email.',
        'btn.add': 'Add', 'btn.added': '✓ Added',
        'shipping.free': '🎉 You got free shipping!',
        'shipping.remaining': '<strong>{amount}</strong> away from free shipping! 🚚',
        'reviews': 'reviews', 'sold': 'sold',
    },
    'es': {
        'trustbar.secure': 'Compra 100% Segura',
        'trustbar.shipping': 'Envío Gratis +€33',
        'trustbar.return': 'Devolución en 7 días',
        'trustbar.quality': 'Calidad Garantizada',
        'nav.home': 'Inicio', 'nav.products': 'Productos', 'nav.about': 'Acerca', 'nav.contact': 'Contacto', 'nav.cart': 'Carrito',
        'hero.badge': '🔥 Ofertas de hasta 50% OFF',
        'hero.title': 'Tu marketplace<br>de <span class="text-gradient">confianza</span>',
        'hero.subtitle': 'Descubre miles de productos con precios increíbles, entrega rápida y compra 100% segura.',
        'hero.trust.secure': 'Compra Segura', 'hero.trust.shipping': 'Envío Gratis', 'hero.trust.returns': '7 Días Devolución',
        'cat.electronics': 'Electrónicos', 'cat.fashion': 'Moda', 'cat.home': 'Hogar', 'cat.accessories': 'Accesorios', 'cat.all': 'Todos',
        'featured.title': '🔥 Productos Destacados', 'featured.subtitle': 'Seleccionados especialmente para ti', 'featured.seeAll': 'Ver todos →',
        'products.title': 'Nuestros Productos', 'products.subtitle': 'Calidad y precio justo en cada artículo',
        'filter.all': 'Todos', 'filter.electronics': 'Electrónicos', 'filter.fashion': 'Moda', 'filter.home': 'Hogar', 'filter.accessories': 'Accesorios',
        'sort.featured': 'Destacados', 'sort.priceAsc': 'Menor Precio', 'sort.priceDesc': 'Mayor Precio', 'sort.rating': 'Valoración', 'sort.bestseller': 'Más Vendidos',
        'loyalty.title': 'ZAX Points — Programa de Fidelidad',
        'loyalty.description': '¡Gana puntos en cada compra y sube de nivel! Cuanto más alto tu nivel, ¡mayores descuentos exclusivos!',
        'loyalty.points': 'Tus Puntos', 'loyalty.level': 'Tu Nivel', 'loyalty.next': 'Siguiente Nivel',
        'about.title': '¿Por qué elegir ZAX?', 'about.subtitle': 'Más que un marketplace, una experiencia de confianza',
        'about.secure.title': 'Compra 100% Segura', 'about.secure.desc': 'Datos protegidos con encriptación de punta. Certificación SSL y PCI DSS.',
        'about.delivery.title': 'Entrega Rápida', 'about.delivery.desc': 'Envío gratis +€33. Seguimiento en tiempo real.',
        'about.return.title': 'Devolución Fácil', 'about.return.desc': '7 días para devolver sin burocracia. Reembolso garantizado.',
        'about.quality.title': 'Calidad Verificada', 'about.quality.desc': 'Todos los vendedores verificados. Productos con sello ZAX.',
        'about.ai.title': 'Recomendaciones con IA', 'about.ai.desc': 'Productos seleccionados especialmente para tu perfil.',
        'about.support.title': 'Soporte 24/7', 'about.support.desc': 'Atención por WhatsApp, chat y email cuando lo necesites.',
        'contact.title': 'Contáctanos', 'contact.subtitle': 'Siempre listos para ayudar',
        'contact.talk': 'Habla con Nosotros', 'contact.talkDesc': '¡Estamos aquí para ayudar!',
        'contact.social': 'Síguenos', 'contact.send': 'Envía un Mensaje',
        'contact.name': 'Nombre', 'contact.email': 'Correo', 'contact.message': 'Mensaje', 'contact.submit': 'Enviar Mensaje',
        'newsletter.title': '📬 Recibe ofertas exclusivas', 'newsletter.desc': 'Regístrate y obtén 10% OFF en tu primera compra.', 'newsletter.btn': 'Quiero 10% OFF',
        'cart.title': 'Tu Carrito', 'cart.empty': 'Tu carrito está vacío', 'cart.emptyHint': 'Agrega productos para continuar',
        'cart.total': 'Total', 'cart.checkout': 'Finalizar por WhatsApp', 'cart.freeShipping': 'Envío Gratis',
        'review.title': 'Valoraciones del Producto', 'review.verified': '✓ Compra Verificada', 'review.helpful': 'personas encontraron útil',
        'locale.language': 'Idioma', 'locale.currency': 'Moneda',
        'footer.desc': 'Tu marketplace de confianza.',
        'footer.shop': 'Tienda', 'footer.offers': 'Ofertas', 'footer.new': 'Novedades', 'footer.bestsellers': 'Más Vendidos',
        'footer.help': 'Ayuda', 'footer.faq': 'FAQ', 'footer.shipping': 'Envío', 'footer.returns': 'Devoluciones', 'footer.contactUs': 'Contáctanos',
        'footer.company': 'Empresa', 'footer.careers': 'Carreras', 'footer.privacy': 'Privacidad', 'footer.terms': 'Términos',
        'footer.rights': 'Todos los derechos reservados.',
        'fab.whatsapp': 'Habla con nosotros', 'ui.loading': 'Cargando...',
        'toast.added': 'agregado al carrito', 'toast.removed': 'eliminado del carrito',
        'toast.wishlistAdd': 'agregado a favoritos', 'toast.wishlistRemove': 'eliminado de favoritos',
        'toast.newsletter': '¡Suscripción exitosa! 🎉',
        'toast.emailOpening': 'Abriendo tu cliente de correo...',
        'toast.fillFields': 'Por favor, completa todos los campos.',
        'toast.invalidEmail': 'Por favor, ingresa un correo válido.',
        'btn.add': 'Agregar', 'btn.added': '✓ Agregado',
        'shipping.free': '🎉 ¡Tienes envío gratis!',
        'shipping.remaining': 'Faltan <strong>{amount}</strong> para envío gratis! 🚚',
        'reviews': 'valoraciones', 'sold': 'vendidos',
    },
};

// ── Restaurar estado ──
try {
    const savedCart = localStorage.getItem(CONFIG.storage.cartKey);
    if (savedCart) { const p = JSON.parse(savedCart); if (Array.isArray(p)) cart = p; }
    const savedWish = localStorage.getItem(CONFIG.storage.wishlistKey);
    if (savedWish) { const p = JSON.parse(savedWish); if (Array.isArray(p)) wishlist = p; }
    const savedLang = localStorage.getItem(CONFIG.storage.langKey);
    if (savedLang && CONFIG.languages[savedLang]) currentLang = savedLang;
    const savedCurrency = localStorage.getItem(CONFIG.storage.currencyKey);
    if (savedCurrency && CONFIG.currencies[savedCurrency]) currentCurrency = savedCurrency;
    const savedTheme = localStorage.getItem(CONFIG.storage.themeKey);
    if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);
    const savedLoyalty = localStorage.getItem(CONFIG.storage.loyaltyKey);
    if (savedLoyalty) loyaltyPoints = parseInt(savedLoyalty, 10) || 0;
    const savedRecent = localStorage.getItem(CONFIG.storage.recentKey);
    if (savedRecent) { const p = JSON.parse(savedRecent); if (Array.isArray(p)) recentlyViewed = p; }
} catch (e) { console.warn('[ZAX] Error restoring state:', e); }

// ── Init ──
document.addEventListener('DOMContentLoaded', initializeApp);

function initializeApp() {
    applyLanguage(currentLang);
    updateLocaleUI();
    renderProducts();
    renderFeaturedCarousel();
    updateCartUI();
    updateWishlistUI();
    updateLoyaltyUI();
    setupEventListeners();
    setupHeaderScroll();
    setupScrollReveal();
    setFooterYear();
    showLoading(false);
}

function setFooterYear() {
    const el = document.getElementById('footerYear');
    if (el) el.textContent = new Date().getFullYear();
}

// ============================================================
//  EVENT LISTENERS
// ============================================================
function setupEventListeners() {
    // Search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function() {
            searchProducts();
            showSearchSuggestions();
        }, CONFIG.debounce.searchDelay));
        searchInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') { searchProducts(); hideSearchSuggestions(); } });
        searchInput.addEventListener('focus', showSearchSuggestions);
        document.addEventListener('click', function(e) { if (!e.target.closest('.search-container')) hideSearchSuggestions(); });
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // ESC close modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') { closeCart(); closeReviewModal(); closeQuickView(); closeLocaleDropdown(); }
    });

    // Save before unload
    window.addEventListener('beforeunload', saveAllState);

    // Locale dropdown
    const localeBtn = document.getElementById('localeBtn');
    if (localeBtn) localeBtn.addEventListener('click', toggleLocaleDropdown);

    // Locale options
    document.querySelectorAll('[data-lang]').forEach(btn => {
        btn.addEventListener('click', function() { setLanguage(this.dataset.lang); });
    });
    document.querySelectorAll('[data-currency]').forEach(btn => {
        btn.addEventListener('click', function() { setCurrency(this.dataset.currency); });
    });

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

    // Click outside locale
    document.addEventListener('click', function(e) { if (!e.target.closest('.locale-selector')) closeLocaleDropdown(); });

    // Click modals overlay
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(e) { if (e.target === this) { this.classList.remove('open'); this.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; } });
    });
}

// ============================================================
//  HEADER SCROLL
// ============================================================
function setupHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        header.classList.toggle('header--scrolled', window.scrollY > 20);
    }, { passive: true });
}

// ============================================================
//  SCROLL REVEAL
// ============================================================
function setupScrollReveal() {
    const targets = ['.section-title-block', '.about-content', '.contact-info', '.contact-form', '.carousel-wrapper', '.section-header', '.loyalty-card', '.newsletter-card'];
    targets.forEach(sel => { document.querySelectorAll(sel).forEach(el => { if (!el.closest('.hero')) el.classList.add('reveal'); }); });
    document.querySelectorAll('.feature').forEach((el, i) => { el.classList.add('reveal', `reveal-delay-${(i % 4) + 1}`); });
    document.querySelectorAll('.contact-method').forEach((el, i) => { el.classList.add('reveal', `reveal-delay-${(i % 4) + 1}`); });
    document.querySelectorAll('.category-card').forEach((el, i) => { el.classList.add('reveal', `reveal-delay-${(i % 4) + 1}`); });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in'); observer.unobserve(entry.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ============================================================
//  I18N — INTERNACIONALIZAÇÃO
// ============================================================
function t(key) { return (I18N[currentLang] && I18N[currentLang][key]) || (I18N['pt-BR'][key]) || key; }

function applyLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = t(key);
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            // don't change input values
        } else {
            el.innerHTML = translation;
        }
    });
    document.documentElement.lang = lang === 'pt-BR' ? 'pt-BR' : lang;
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem(CONFIG.storage.langKey, lang);
    applyLanguage(lang);
    updateLocaleUI();
    renderProducts();
    renderFeaturedCarousel();
    updateCartUI();
    updateFreeShippingBar();
    closeLocaleDropdown();
}

function setCurrency(currency) {
    currentCurrency = currency;
    localStorage.setItem(CONFIG.storage.currencyKey, currency);
    updateLocaleUI();
    renderProducts();
    renderFeaturedCarousel();
    updateCartUI();
    updateFreeShippingBar();
    closeLocaleDropdown();
}

function updateLocaleUI() {
    const label = document.getElementById('localeBtnLabel');
    const curr = CONFIG.currencies[currentCurrency];
    const lang = CONFIG.languages[currentLang];
    if (label) label.textContent = `${lang.flag} ${lang.short} · ${curr.symbol}`;

    // Update active states
    document.querySelectorAll('[data-lang]').forEach(btn => { btn.classList.toggle('active', btn.dataset.lang === currentLang); });
    document.querySelectorAll('[data-currency]').forEach(btn => { btn.classList.toggle('active', btn.dataset.currency === currentCurrency); });
}

function toggleLocaleDropdown() {
    const dd = document.getElementById('localeDropdown');
    if (dd) { dd.classList.toggle('open'); dd.setAttribute('aria-hidden', String(!dd.classList.contains('open'))); }
}
function closeLocaleDropdown() {
    const dd = document.getElementById('localeDropdown');
    if (dd) { dd.classList.remove('open'); dd.setAttribute('aria-hidden', 'true'); }
}

// ============================================================
//  THEME
// ============================================================
function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem(CONFIG.storage.themeKey, next);
}

// ============================================================
//  CURRENCY
// ============================================================
function convertPrice(priceBRL) {
    const rate = CONFIG.currencies[currentCurrency].rate;
    return priceBRL * rate;
}

function formatPrice(price) {
    const converted = convertPrice(price);
    const curr = CONFIG.currencies[currentCurrency];
    return converted.toLocaleString(curr.locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function currencySymbol() { return CONFIG.currencies[currentCurrency].symbol; }

// ============================================================
//  RENDER PRODUCTS
// ============================================================
function renderProducts(productsToRender) {
    let list = productsToRender || getFilteredAndSortedProducts();
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    if (list.length === 0) {
        grid.innerHTML = `<div class="empty-state" role="status"><svg aria-hidden="true"><use href="#icon-search"/></svg><p>Nenhum produto encontrado.</p></div>`;
        return;
    }

    grid.innerHTML = list.map(p => productCardHTML(p)).join('');
    setTimeout(observeProducts, 80);
}

function productCardHTML(product) {
    const isWishlisted = wishlist.includes(product.id);
    const stars = renderStarsHTML(product.rating);
    const hasDiscount = product.originalPrice && product.originalPrice > product.price;
    const badgeClass = product.badge && (product.badge.startsWith('-') || product.badge === 'sale') ? 'sale' : '';

    return `
        <article class="product-card" data-category="${product.category}" data-id="${product.id}">
            <div class="product-image-wrap">
                <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy"
                    onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23f4f6f8%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%239ba3af%22 font-size=%2214%22 font-family=%22sans-serif%22%3EZAX%3C/text%3E%3C/svg%3E'">
                ${product.badge ? `<span class="product-badge ${badgeClass}">${product.badge}</span>` : ''}
                <div class="product-actions">
                    <button class="product-action-btn ${isWishlisted ? 'wishlisted' : ''}" onclick="toggleWishlist(${product.id}, event)" aria-label="Favoritar ${product.name}">
                        <svg class="icon" aria-hidden="true"><use href="#icon-heart"/></svg>
                    </button>
                    <button class="product-action-btn" onclick="openQuickView(${product.id})" aria-label="Ver detalhes ${product.name}">
                        <svg class="icon" aria-hidden="true"><use href="#icon-eye"/></svg>
                    </button>
                    <button class="product-action-btn" onclick="shareProduct(${product.id})" aria-label="Compartilhar ${product.name}">
                        <svg class="icon" aria-hidden="true"><use href="#icon-share"/></svg>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <span class="product-category">${categoryLabel(product.category)}</span>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description || ''}</p>
                <div class="product-rating">
                    <div class="stars">${stars}</div>
                    <span class="rating-text">${product.rating}</span>
                    <span class="rating-link" onclick="openReviewModal(${product.id})">(${product.reviewCount} ${t('reviews')})</span>
                </div>
                <div class="product-footer">
                    <div class="price-group">
                        <span class="product-price">${currencySymbol()}&nbsp;${formatPrice(product.price)}</span>
                        ${hasDiscount ? `<span class="product-original-price">${currencySymbol()} ${formatPrice(product.originalPrice)}</span>` : ''}
                        <span class="product-sold">${product.sold.toLocaleString()} ${t('sold')}</span>
                    </div>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id}, event)" aria-label="${t('btn.add')} ${product.name}">
                        ${t('btn.add')}
                    </button>
                </div>
            </div>
        </article>
    `;
}

function renderStarsHTML(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        html += `<svg class="icon"><use href="#icon-${i <= Math.round(rating) ? 'star' : 'star-empty'}"/></svg>`;
    }
    return html;
}

function categoryLabel(category) {
    const map = { eletronicos: t('cat.electronics'), moda: t('cat.fashion'), casa: t('cat.home'), acessorios: t('cat.accessories') };
    return map[category] || category;
}

// ============================================================
//  CAROUSEL
// ============================================================
function renderFeaturedCarousel() {
    const featuredProducts = products.filter(p => p.featured);
    const carousel = document.getElementById('featuredCarousel');
    if (!carousel) return;
    carousel.innerHTML = featuredProducts.map(p => {
        return `<article class="product-card" style="min-width:${CONFIG.ui.carouselCardWidth}px;" role="listitem" data-id="${p.id}">
            ${productCardInnerHTML(p)}
        </article>`;
    }).join('');
}

function productCardInnerHTML(p) {
    const stars = renderStarsHTML(p.rating);
    return `
        <div class="product-image-wrap">
            <img src="${p.image}" alt="${p.name}" class="product-image" loading="lazy"
                onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23f4f6f8%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%239ba3af%22 font-size=%2214%22 font-family=%22sans-serif%22%3EZAX%3C/text%3E%3C/svg%3E'">
            ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        </div>
        <div class="product-info">
            <span class="product-category">${categoryLabel(p.category)}</span>
            <h3 class="product-name">${p.name}</h3>
            <div class="product-rating"><div class="stars">${stars}</div><span class="rating-text">${p.rating} (${p.reviewCount})</span></div>
            <div class="product-footer">
                <span class="product-price">${currencySymbol()}&nbsp;${formatPrice(p.price)}</span>
                <button class="add-to-cart-btn" onclick="addToCart(${p.id}, event)">${t('btn.add')}</button>
            </div>
        </div>
    `;
}

function moveCarousel(direction) {
    const carousel = document.getElementById('featuredCarousel');
    if (!carousel) return;
    const cardWidth = CONFIG.ui.carouselCardWidth + CONFIG.ui.carouselGap;
    const featuredCount = products.filter(p => p.featured).length;
    const maxOffset = (featuredCount - 1) * cardWidth;
    carouselPosition -= direction * cardWidth;
    if (carouselPosition > 0) carouselPosition = 0;
    if (carouselPosition < -maxOffset) carouselPosition = -maxOffset;
    carousel.style.transform = `translateX(${carouselPosition}px)`;
    carousel.style.transition = `transform ${CONFIG.ui.carouselTransition} cubic-bezier(0.16,1,0.3,1)`;
}

// ============================================================
//  FILTERS & SORT
// ============================================================
function filterProducts(category, event) {
    currentFilter = category;
    document.querySelectorAll('.filter-btn').forEach(btn => { btn.classList.remove('active'); btn.setAttribute('aria-pressed', 'false'); });
    if (event && event.target) { event.target.classList.add('active'); event.target.setAttribute('aria-pressed', 'true'); }
    renderProducts();
}

function filterByCategory(category) {
    currentFilter = category;
    document.querySelectorAll('.filter-btn').forEach((btn, i) => {
        const cats = ['all', 'eletronicos', 'moda', 'casa', 'acessorios'];
        btn.classList.toggle('active', cats[i] === category);
    });
    renderProducts();
    document.getElementById('produtos').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function sortProducts(sortBy) {
    currentSort = sortBy;
    renderProducts();
}

function getFilteredAndSortedProducts() {
    let list = currentFilter === 'all' ? [...products] : products.filter(p => p.category === currentFilter);
    switch (currentSort) {
        case 'price-asc': list.sort((a, b) => a.price - b.price); break;
        case 'price-desc': list.sort((a, b) => b.price - a.price); break;
        case 'rating': list.sort((a, b) => b.rating - a.rating); break;
        case 'bestseller': list.sort((a, b) => b.sold - a.sold); break;
        case 'featured': default: list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)); break;
    }
    return list;
}

// ============================================================
//  SEARCH
// ============================================================
function searchProducts() {
    const input = document.getElementById('searchInput');
    if (!input) return;
    const query = input.value.trim().toLowerCase();
    if (query.length === 0) { renderProducts(); return; }
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(query) ||
        (p.description || '').toLowerCase().includes(query) ||
        categoryLabel(p.category).toLowerCase().includes(query) ||
        (p.tags || []).some(tag => tag.includes(query))
    );
    currentFilter = 'all';
    document.querySelectorAll('.filter-btn').forEach((btn, i) => { btn.classList.toggle('active', i === 0); });
    renderProducts(filtered);
}

function showSearchSuggestions() {
    const input = document.getElementById('searchInput');
    const container = document.getElementById('searchSuggestions');
    if (!input || !container) return;
    const query = input.value.trim().toLowerCase();
    if (query.length < 2) { hideSearchSuggestions(); return; }
    const matches = products.filter(p => p.name.toLowerCase().includes(query)).slice(0, 5);
    if (matches.length === 0) { hideSearchSuggestions(); return; }
    container.innerHTML = matches.map(p =>
        `<div class="suggestion-item" onclick="selectSuggestion('${p.name}')">
            <svg class="icon" style="width:16px;height:16px;opacity:.5"><use href="#icon-search"/></svg>
            ${p.name}
        </div>`
    ).join('');
    container.classList.add('open');
    container.setAttribute('aria-hidden', 'false');
}
function hideSearchSuggestions() {
    const container = document.getElementById('searchSuggestions');
    if (container) { container.classList.remove('open'); container.setAttribute('aria-hidden', 'true'); }
}
function selectSuggestion(name) {
    const input = document.getElementById('searchInput');
    if (input) { input.value = name; searchProducts(); hideSearchSuggestions(); }
}

// ============================================================
//  CART
// ============================================================
function addToCart(productId, event) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const existing = cart.find(item => item.id === productId);
    if (existing) { existing.quantity = (existing.quantity || 1) + 1; } else { cart.push({ ...product, quantity: 1 }); }
    loyaltyPoints += Math.floor(product.price * CONFIG.loyalty.pointsPerReal / 10);
    saveAllState();
    updateCartUI();
    updateLoyaltyUI();
    // Button feedback
    if (event && event.target) {
        const btn = event.target;
        const original = btn.textContent;
        btn.textContent = t('btn.added');
        btn.classList.add('added');
        btn.disabled = true;
        setTimeout(() => { btn.textContent = original; btn.classList.remove('added'); btn.disabled = false; }, 1400);
    }
    showToast(`${product.name} ${t('toast.added')}`, 'success');
}

function removeFromCart(productId) {
    const product = cart.find(item => item.id === productId);
    cart = cart.filter(item => item.id !== productId);
    saveAllState();
    updateCartUI();
    if (product) showToast(`${product.name} ${t('toast.removed')}`, 'info');
}

function updateCartQuantity(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    item.quantity = Math.max(1, (item.quantity || 1) + delta);
    saveAllState();
    updateCartUI();
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    // Counts
    ['cartCount', 'mobileCartCount'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        const prev = parseInt(el.textContent, 10);
        el.textContent = totalItems;
        if (totalItems !== prev && totalItems > 0) { el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); }
    });

    const cartItemsEl = document.getElementById('cartItems');
    const cartTotalEl = document.getElementById('cartTotal');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const currSymbol = document.getElementById('cartCurrencySymbol');
    if (currSymbol) currSymbol.textContent = currencySymbol();
    if (!cartItemsEl) return;

    if (cart.length === 0) {
        cartItemsEl.innerHTML = `<div class="empty-cart"><svg class="empty-cart-icon" aria-hidden="true"><use href="#icon-cart"/></svg><p>${t('cart.empty')}</p><span class="empty-cart-hint">${t('cart.emptyHint')}</span></div>`;
        if (checkoutBtn) { checkoutBtn.disabled = true; checkoutBtn.setAttribute('aria-disabled', 'true'); }
    } else {
        const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
        if (cartTotalEl) cartTotalEl.textContent = formatPrice(total);
        cartItemsEl.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img class="cart-item-image" src="${item.image}" alt="${item.name}"
                    onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2252%22 height=%2252%22%3E%3Crect fill=%22%23f4f6f8%22 width=%2252%22 height=%2252%22/%3E%3C/svg%3E'">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${currencySymbol()} ${formatPrice(item.price * (item.quantity || 1))}</div>
                    <div class="cart-item-qty">
                        <button class="qty-btn" onclick="updateCartQuantity(${item.id}, -1)" aria-label="Diminuir"><svg class="icon"><use href="#icon-minus"/></svg></button>
                        <span class="qty-value">${item.quantity || 1}</span>
                        <button class="qty-btn" onclick="updateCartQuantity(${item.id}, 1)" aria-label="Aumentar"><svg class="icon"><use href="#icon-plus"/></svg></button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})" aria-label="Remover ${item.name}">
                    <svg class="icon" aria-hidden="true"><use href="#icon-trash"/></svg>
                </button>
            </div>
        `).join('');
        if (checkoutBtn) { checkoutBtn.disabled = false; checkoutBtn.setAttribute('aria-disabled', 'false'); }
    }
    updateFreeShippingBar();
}

function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    if (!sidebar || !overlay) return;
    const isOpen = sidebar.classList.toggle('open');
    overlay.classList.toggle('open', isOpen);
    overlay.setAttribute('aria-hidden', String(!isOpen));
    if (isOpen) { document.body.style.overflow = 'hidden'; document.querySelector('.close-cart')?.focus(); }
    else { document.body.style.overflow = ''; }
}

function closeCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) { overlay.classList.remove('open'); overlay.setAttribute('aria-hidden', 'true'); }
    document.body.style.overflow = '';
}

// ============================================================
//  FREE SHIPPING BAR
// ============================================================
function updateFreeShippingBar() {
    const bar = document.getElementById('freeShippingBar');
    const fill = document.getElementById('freeShippingFill');
    const text = document.getElementById('freeShippingText');
    if (!bar || !fill || !text) return;

    const totalBRL = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
    const threshold = CONFIG.freeShipping.threshold;
    const remaining = Math.max(0, threshold - totalBRL);
    const percent = Math.min(100, (totalBRL / threshold) * 100);

    fill.style.width = percent + '%';

    if (remaining <= 0) {
        text.innerHTML = t('shipping.free');
        bar.classList.add('complete');
    } else {
        const formattedRemaining = currencySymbol() + ' ' + formatPrice(remaining);
        text.innerHTML = t('shipping.remaining').replace('{amount}', formattedRemaining);
        bar.classList.remove('complete');
    }
}

// ============================================================
//  WISHLIST
// ============================================================
function toggleWishlist(productId, event) {
    if (event) event.stopPropagation();
    const idx = wishlist.indexOf(productId);
    const product = products.find(p => p.id === productId);
    if (idx > -1) {
        wishlist.splice(idx, 1);
        if (product) showToast(`${product.name} ${t('toast.wishlistRemove')}`, 'info');
    } else {
        wishlist.push(productId);
        if (product) showToast(`${product.name} ${t('toast.wishlistAdd')}`, 'success');
    }
    saveAllState();
    updateWishlistUI();
    renderProducts();
}

function updateWishlistUI() {
    const count = document.getElementById('wishlistCount');
    if (count) count.textContent = wishlist.length;
}

// ============================================================
//  REVIEWS
// ============================================================
function openReviewModal(productId) {
    const modal = document.getElementById('reviewModal');
    const body = document.getElementById('reviewModalBody');
    if (!modal || !body) return;

    const product = products.find(p => p.id === productId);
    const reviews = SAMPLE_REVIEWS.filter(r => r.productId === productId);

    if (!product) return;

    // Rating distribution
    const dist = [0, 0, 0, 0, 0];
    reviews.forEach(r => { if (r.rating >= 1 && r.rating <= 5) dist[r.rating - 1]++; });
    const maxDist = Math.max(...dist, 1);

    body.innerHTML = `
        <div class="review-summary">
            <div class="review-avg">
                <div class="review-avg-score">${product.rating}</div>
                <div class="review-avg-stars">${renderStarsHTML(product.rating)}</div>
                <div class="review-avg-count">${product.reviewCount} ${t('reviews')}</div>
            </div>
            <div class="review-bars">
                ${[5,4,3,2,1].map(n => `
                    <div class="review-bar-row">
                        <span class="review-bar-label">${n}</span>
                        <div class="review-bar-track"><div class="review-bar-fill" style="width:${(dist[n-1]/maxDist)*100}%"></div></div>
                        <span class="review-bar-count">${dist[n-1]}</span>
                    </div>
                `).join('')}
            </div>
        </div>
        <div class="review-list">
            ${reviews.length === 0 ? '<p style="text-align:center;color:var(--text-muted);padding:var(--s-8)">Nenhuma avaliação ainda.</p>' : reviews.map(r => `
                <div class="review-item">
                    <div class="review-item-header">
                        <span class="review-user">${r.user}</span>
                        ${r.verified ? `<span class="review-verified">${t('review.verified')}</span>` : ''}
                    </div>
                    <div class="review-stars">${renderStarsHTML(r.rating)}</div>
                    <p class="review-text">${r.text}</p>
                    <div class="review-date">${new Date(r.date).toLocaleDateString(currentLang === 'pt-BR' ? 'pt-BR' : currentLang)}</div>
                    ${r.helpful ? `<div class="review-helpful">👍 ${r.helpful} ${t('review.helpful')}</div>` : ''}
                </div>
            `).join('')}
        </div>
    `;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeReviewModal() {
    const modal = document.getElementById('reviewModal');
    if (modal) { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }
}

// ============================================================
//  QUICK VIEW
// ============================================================
function openQuickView(productId) {
    const modal = document.getElementById('quickViewModal');
    const body = document.getElementById('quickViewBody');
    if (!modal || !body) return;

    const p = products.find(pr => pr.id === productId);
    if (!p) return;

    const isWishlisted = wishlist.includes(p.id);
    const hasDiscount = p.originalPrice && p.originalPrice > p.price;

    body.innerHTML = `
        <div class="quickview-image"><img src="${p.image}" alt="${p.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Crect fill=%22%23f4f6f8%22 width=%22400%22 height=%22400%22/%3E%3C/svg%3E'"></div>
        <div class="quickview-info">
            <span class="product-category">${categoryLabel(p.category)}</span>
            <h3 id="quickViewTitle">${p.name}</h3>
            <div class="product-rating">
                <div class="stars">${renderStarsHTML(p.rating)}</div>
                <span class="rating-text">${p.rating} (${p.reviewCount} ${t('reviews')})</span>
            </div>
            <div class="price-group">
                <span class="product-price">${currencySymbol()} ${formatPrice(p.price)}</span>
                ${hasDiscount ? `<span class="product-original-price">${currencySymbol()} ${formatPrice(p.originalPrice)}</span>` : ''}
            </div>
            <p class="product-description">${p.description || ''}</p>
            <p class="product-sold">${p.sold.toLocaleString()} ${t('sold')}</p>
            <div style="display:flex;gap:var(--s-3);margin-top:auto">
                <button class="add-to-cart-btn" style="flex:1" onclick="addToCart(${p.id}, event)">${t('btn.add')}</button>
                <button class="product-action-btn ${isWishlisted ? 'wishlisted' : ''}" style="width:44px;height:44px" onclick="toggleWishlist(${p.id}, event)">
                    <svg class="icon"><use href="#icon-heart"/></svg>
                </button>
            </div>
        </div>
    `;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeQuickView() {
    const modal = document.getElementById('quickViewModal');
    if (modal) { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }
}

// ============================================================
//  SOCIAL SHARE
// ============================================================
function shareProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const text = `Confira ${product.name} na ZAX! ${currencySymbol()} ${formatPrice(product.price)}`;
    if (navigator.share) {
        navigator.share({ title: product.name, text: text, url: window.location.href });
    } else {
        navigator.clipboard.writeText(text + ' — ' + window.location.href).then(() => {
            showToast('Link copiado! 📋', 'success');
        });
    }
}

// ============================================================
//  LOYALTY
// ============================================================
function updateLoyaltyUI() {
    const pointsEl = document.getElementById('loyaltyPoints');
    const levelEl = document.getElementById('loyaltyLevel');
    const nextEl = document.getElementById('loyaltyNext');
    const progressEl = document.getElementById('loyaltyProgress');

    const levels = CONFIG.loyalty.levels;
    let currentLevel = levels[0];
    let nextLevel = levels[1];

    for (let i = levels.length - 1; i >= 0; i--) {
        if (loyaltyPoints >= levels[i].min) { currentLevel = levels[i]; nextLevel = levels[i + 1] || null; break; }
    }

    if (pointsEl) pointsEl.textContent = loyaltyPoints.toLocaleString();
    if (levelEl) levelEl.textContent = `${currentLevel.icon} ${currentLevel.name}`;
    if (nextEl) nextEl.textContent = nextLevel ? `${nextLevel.min - loyaltyPoints} pts` : 'Nível máximo! 🎉';
    if (progressEl && nextLevel) {
        const prevMin = currentLevel.min;
        const range = nextLevel.min - prevMin;
        const progress = Math.min(100, ((loyaltyPoints - prevMin) / range) * 100);
        progressEl.style.width = progress + '%';
    }
}

// ============================================================
//  CHECKOUT
// ============================================================
function checkout() {
    if (cart.length === 0) return;
    const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
    const itemsList = cart.map(item =>
        `${item.quantity || 1}x ${item.name} — ${currencySymbol()} ${formatPrice(item.price * (item.quantity || 1))}`
    ).join('\n');
    const message = `${CONFIG.whatsapp.message}\n\n${itemsList}\n\n*Total: ${currencySymbol()} ${formatPrice(total)}*`;
    window.open(`https://wa.me/${CONFIG.whatsapp.number}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    showToast('Redirecionando para o WhatsApp... 📱', 'info');
}

// ============================================================
//  CONTACT FORM
// ============================================================
function submitContactForm(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const name = (data.get('name') || '').trim();
    const email = (data.get('email') || '').trim();
    const message = (data.get('message') || '').trim();
    if (!name || !email || !message) { showToast(t('toast.fillFields'), 'error'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showToast(t('toast.invalidEmail'), 'error'); return; }
    showLoading(true);
    const subject = encodeURIComponent('Contato via Site ZAX');
    const body = encodeURIComponent(`Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`);
    setTimeout(() => {
        showLoading(false);
        window.location.href = `mailto:${CONFIG.email.support}?subject=${subject}&body=${body}`;
        showToast(t('toast.emailOpening'), 'success');
        event.target.reset();
    }, CONFIG.ui.loadingDelay);
}

// ============================================================
//  NEWSLETTER
// ============================================================
function subscribeNewsletter(event) {
    event.preventDefault();
    const input = document.getElementById('newsletterEmail');
    if (!input || !input.value.trim()) { showToast(t('toast.invalidEmail'), 'error'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) { showToast(t('toast.invalidEmail'), 'error'); return; }
    showToast(t('toast.newsletter'), 'success');
    input.value = '';
}

// ============================================================
//  NAVIGATION
// ============================================================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ============================================================
//  UTILITIES
// ============================================================
function saveAllState() {
    try {
        localStorage.setItem(CONFIG.storage.cartKey, JSON.stringify(cart));
        localStorage.setItem(CONFIG.storage.wishlistKey, JSON.stringify(wishlist));
        localStorage.setItem(CONFIG.storage.loyaltyKey, String(loyaltyPoints));
        localStorage.setItem(CONFIG.storage.recentKey, JSON.stringify(recentlyViewed));
    } catch (e) { console.error('[ZAX] Error saving state:', e); }
}

function showLoading(show) { const el = document.getElementById('loading'); if (el) el.classList.toggle('show', show); }

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <span class="toast-icon" aria-hidden="true"><svg class="icon" style="width:12px;height:12px;"><use href="${toastIconRef(type)}"/></svg></span>
        <span class="toast-msg">${message}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = `toastOut ${CONFIG.ui.toastExitDuration || 300}ms cubic-bezier(0.4,0,0.2,1) forwards`;
        setTimeout(() => { if (container.contains(toast)) container.removeChild(toast); }, CONFIG.ui.toastExitDuration || 300);
    }, CONFIG.ui.toastDuration);
}

function toastIconRef(type) {
    return { success: '#icon-check', error: '#icon-alert', warning: '#icon-alert', info: '#icon-alert' }[type] || '#icon-alert';
}

function debounce(func, wait) { let timer; return function(...args) { clearTimeout(timer); timer = setTimeout(() => func.apply(this, args), wait); }; }

function observeProducts() {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = (index % 4) * 60;
                setTimeout(() => { entry.target.style.opacity = '1'; entry.target.style.transform = 'translateY(0)'; }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.products-grid .product-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.45s cubic-bezier(0.16,1,0.3,1), transform 0.45s cubic-bezier(0.16,1,0.3,1)';
        observer.observe(card);
    });
}