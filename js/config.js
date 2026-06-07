// ============================================================
//  ZAX Marketplace — Configurações Centralizadas
// ============================================================

const CONFIG = {
    // ── Contato ──
    whatsapp: {
        number: '5511999999999',
        message: 'Olá! Gostaria de finalizar minha compra na ZAX:'
    },
    email: {
        support: 'contato@zax.com.br'
    },

    // ── Armazenamento ──
    storage: {
        cartKey: 'zax_cart',
        langKey: 'zax_lang',
        currencyKey: 'zax_currency',
        themeKey: 'zax_theme',
        loyaltyKey: 'zax_loyalty',
        reviewsKey: 'zax_reviews',
        wishlistKey: 'zax_wishlist',
        recentKey: 'zax_recent',
    },

    // ── Frete Grátis ──
    freeShipping: {
        threshold: 199.00,
        label: {
            'pt-BR': 'Frete Grátis',
            'en': 'Free Shipping',
            'es': 'Envío Gratis',
        }
    },

    // ── Moedas ──
    currencies: {
        BRL: { symbol: 'R$', code: 'BRL', rate: 1, locale: 'pt-BR', flag: '🇧🇷' },
        USD: { symbol: '$',  code: 'USD', rate: 0.19, locale: 'en-US', flag: '🇺🇸' },
        EUR: { symbol: '€',  code: 'EUR', rate: 0.17, locale: 'de-DE', flag: '🇪🇺' },
    },
    defaultCurrency: 'BRL',

    // ── Idiomas ──
    languages: {
        'pt-BR': { name: 'Português', flag: '🇧🇷', short: 'PT' },
        'en':    { name: 'English',    flag: '🇺🇸', short: 'EN' },
        'es':    { name: 'Español',    flag: '🇪🇸', short: 'ES' },
    },
    defaultLang: 'pt-BR',

    // ── Programa de Fidelidade ──
    loyalty: {
        name: 'ZAX Points',
        pointsPerReal: 10,
        levels: [
            { name: 'Bronze',   min: 0,     icon: '🥉', discount: 0,  color: '#CD7F32' },
            { name: 'Prata',    min: 500,   icon: '🥈', discount: 5,  color: '#C0C0C0' },
            { name: 'Ouro',     min: 2000,  icon: '🥇', discount: 10, color: '#FFD700' },
            { name: 'Diamante', min: 5000,  icon: '💎', discount: 15, color: '#B9F2FF' },
        ],
    },

    // ── UI ──
    ui: {
        carouselCardWidth: 280,
        carouselGap: 20,
        carouselTransition: '0.5s',
        toastDuration: 3500,
        toastExitDuration: 300,
        loadingDelay: 800,
        maxRecentProducts: 10,
    },

    // ── Debounce ──
    debounce: {
        searchDelay: 300,
    },

    // ── Social ──
    social: {
        instagram: 'https://instagram.com/zaxecommerce',
        facebook: 'https://facebook.com/zaxecommerce',
        twitter: 'https://x.com/zaxecommerce',
        tiktok: 'https://tiktok.com/@zaxecommerce',
    },
};
