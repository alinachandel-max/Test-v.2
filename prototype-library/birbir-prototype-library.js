    window.addEventListener("load", function () {
      upgradeLegacyIcons();
      initBannerCarousel();
      initSearchOverlay();
      initSearchResults();
      initProductDetails();
      initFavoriteButtons();
      initSellerCabinet();
    });

    var SELLER_CARD_ICON_SRC = {
      more: "prototype-library/icon-source-svg/SellerMoreLine.svg",
      coin: "prototype-library/icon-source-svg/SellerCoin2Fill.svg",
      eye: "prototype-library/icon-source-svg/SellerEyeFill.svg",
      heart: "prototype-library/icon-source-svg/SellerHeartFill.svg",
      phone: "prototype-library/icon-source-svg/SellerPhoneFill.svg",
      rocketFill: "prototype-library/icon-source-svg/SellerRocketFillLayer.svg",
      rocketStroke: "prototype-library/icon-source-svg/SellerRocketStrokeLayer.svg"
    };

    var SELLER_BADGE_ICON_SRC = {
      premium: "prototype-library/icon-source-svg/SellerBadgePremium.svg",
      pushUp: "prototype-library/icon-source-svg/SellerBadgePushUp.svg",
      delivery: "prototype-library/icon-source-svg/SellerBadgeDelivery.svg"
    };

    var RADIO_COMPONENT_CHECKED_SRC = "prototype-library/icon-source-svg/RadioChecked.svg";
    var RANGE_ERROR_TEXT = 'Значение "От" должно быть меньше "До"';
    var RANGE_WARNING_TEXT = "Очень узкий диапазон";

    var HOME_FEED_PHOTOS = [
      "assets/Photo/karolina-grabowska-1-6q3sT4zuA-unsplash.jpg",
      "assets/Photo/3b6ce1f096e72287f6d7c2933f26.webp",
      "assets/Photo/32b509cedd2580cc76395a051202.webp",
      "assets/Photo/429d19915775cea9a9275fa633dd.webp",
      "assets/Photo/6e921e0fc482b4eace9c2be9f1f1.webp",
      "assets/Photo/karolina-grabowska-4A8N12Dl0Us-unsplash.jpg",
      "assets/Photo/karolina-grabowska-6JJkzi-3TQM-unsplash.jpg",
      "assets/Photo/c9015e7d3f066b6b163b9c0babbe.webp",
      "assets/Photo/2a9ddec28868becbf08a7f918ab0.webp",
      "assets/Photo/3c8ba0b52ef4b055440d94b94d57.webp",
      "assets/Photo/994253a58d8fb94a9dafd9f8fe82.webp",
      "assets/Photo/photo-1636831990680-0d088e4cd83c.avif",
      "assets/Photo/photo-1676325826380-16232d9fb5d8.avif",
      "assets/Photo/karolina-grabowska-5VTLDmr3_DA-unsplash.jpg",
      "assets/Photo/karolina-grabowska-9gZ0KgcHInc-unsplash.jpg",
      "assets/Photo/karolina-grabowska-FbFz1moR894-unsplash.jpg",
      "assets/Photo/karolina-grabowska-g4ve1q1gQxM-unsplash.jpg",
      "assets/Photo/cf897c293769fbea79f5339c4484.webp"
    ];

    var HOME_FEED_BLUEPRINTS = [
      { title: "Минималистичные кеды из экокожи", price: "289 000 сум", oldPrice: "349 000 сум", discount: "-17%", badges: [], installmentLabel: "", distance: "3 км", postedAt: "Сегодня, 10:42", seller: "Частное лицо", condition: "Новое", category: "Одежда и обувь", currency: "UZS", priceValue: 289000, urgentSale: ["Торг уместен"], gift: [], installment: [], delivery: [], region: "Ташкент", manufacturer: ["Nike"], searchHints: "кеды обувь белые женские" },
      { title: "Плетеная корзина для хранения", price: "165 000 сум", oldPrice: "", discount: "", badges: [{ type: "business", label: "Магазин" }], installmentLabel: "", distance: "6 км", postedAt: "Сегодня, 12:08", seller: "Магазин", condition: "Новое", category: "Товары для дома", currency: "UZS", priceValue: 165000, urgentSale: [], gift: [], installment: [], delivery: [], region: "Ташкент", manufacturer: ["Ikea"], searchHints: "корзина хранение дом ротанг" },
      { title: "Настольная лампа с теплым светом", price: "420 000 сум", oldPrice: "", discount: "", badges: [{ type: "business", label: "Магазин" }, { type: "urgent-sale", label: "Срочно. Торг", iconOnly: true }], installmentLabel: "Рассрочка", distance: "12 км", postedAt: "Сегодня, 09:17", seller: "Магазин", condition: "Б/у", category: "Товары для дома", currency: "UZS", priceValue: 420000, urgentSale: ["Срочно"], gift: [], installment: ["Есть рассрочка"], delivery: [], region: "Самарканд", manufacturer: ["Xiaomi"], searchHints: "лампа настольная светильник диммер" },
      { title: "Набор столовых приборов на шесть персон", price: "238 000 сум", oldPrice: "", discount: "", badges: [], installmentLabel: "", distance: "8 км", postedAt: "Вчера, 21:30", seller: "Частное лицо", condition: "Новое", category: "Товары для дома", currency: "UZS", priceValue: 238000, urgentSale: [], gift: [], installment: [], delivery: [], region: "Ташкент", manufacturer: ["Tefal"], searchHints: "приборы кухня набор сервировка" },
      { title: "Чайный сервиз в пастельных оттенках", price: "510 000 сум", oldPrice: "640 000 сум", discount: "-20%", badges: [{ type: "premium", label: "Premium" }, { type: "business", label: "Магазин", iconOnly: true }, { type: "urgent-sale", label: "Срочно. Торг", iconOnly: true }], installmentLabel: "", distance: "5 км", postedAt: "Сегодня, 13:54", seller: "Агентство", condition: "После ремонта", category: "Товары для дома", currency: "USD", priceValue: 510000, urgentSale: ["Срочно"], gift: [], installment: [], delivery: [], region: "Бухара", manufacturer: ["Luminarc"], searchHints: "сервиз чайный набор посуда premium" },
      { title: "Тренч песочного оттенка", price: "690 000 сум", oldPrice: "", discount: "", badges: [{ type: "delivery", label: "Доставка" }], installmentLabel: "", distance: "4 км", postedAt: "Сегодня, 08:26", seller: "Частное лицо", condition: "Б/у", category: "Одежда и обувь", currency: "UZS", priceValue: 690000, urgentSale: [], gift: [], installment: [], delivery: ["Курьером"], region: "Самарканд", manufacturer: ["Mango"], searchHints: "тренч женский плащ бежевый" },
      { title: "Кардиган с мягкой фактурой и свободным кроем", price: "340 000 сум", oldPrice: "410 000 сум", discount: "-17%", badges: [], installmentLabel: "", distance: "9 км", postedAt: "Сегодня, 16:02", seller: "Частное лицо", condition: "Как новое", category: "Одежда и обувь", currency: "USD", priceValue: 340000, urgentSale: [], gift: [], installment: [], delivery: [], region: "Фергана", manufacturer: ["Zara"], searchHints: "кардиган женский вязка мягкий" },
      { title: "Органайзер для косметики", price: "129 000 сум", oldPrice: "", discount: "", badges: [{ type: "business", label: "Магазин" }], installmentLabel: "", distance: "2 км", postedAt: "Сегодня, 11:21", seller: "Магазин", condition: "Новое", category: "Товары для дома", currency: "UZS", priceValue: 129000, urgentSale: [], gift: ["Самовывоз"], installment: [], delivery: ["Самовывоз"], region: "Ташкент", manufacturer: ["Google"], searchHints: "органайзер косметика контейнер" },
      { title: "Настольный сейф для документов", price: "1 180 000 сум", oldPrice: "1 350 000 сум", discount: "-13%", badges: [{ type: "premium", label: "Premium", iconOnly: true }, { type: "delivery", label: "Доставка", iconOnly: true }], installmentLabel: "", distance: "7 км", postedAt: "Сегодня, 15:10", seller: "Магазин", condition: "Новое", category: "Электроника", currency: "UZS", priceValue: 1180000, urgentSale: [], gift: [], installment: [], delivery: ["Курьером"], region: "Ташкент", manufacturer: ["Yale"], searchHints: "сейф металлический документы дом" },
      { title: "Корзина для белья с крышкой", price: "209 000 сум", oldPrice: "", discount: "", badges: [{ type: "delivery", label: "Доставка", iconOnly: true }], installmentLabel: "", distance: "11 км", postedAt: "Сегодня, 17:48", seller: "Частное лицо", condition: "Новое", category: "Товары для дома", currency: "UZS", priceValue: 209000, urgentSale: [], gift: [], installment: [], delivery: [], region: "Ташкент", manufacturer: ["Home"], searchHints: "корзина белье крышка ротанг" },
      { title: "Керамическое кашпо с автополивом", price: "249 000 сум", oldPrice: "320 000 сум", discount: "-22%", badges: [{ type: "premium", label: "Premium", iconOnly: true }], installmentLabel: "", distance: "5 км", postedAt: "Сегодня, 09:55", seller: "Частное лицо", condition: "Новое", category: "Товары для дома", currency: "UZS", priceValue: 249000, urgentSale: [], gift: [], installment: [], delivery: [], region: "Ташкент", manufacturer: ["Garden"], searchHints: "кашпо растение автополив интерьер" },
      { title: "Ваза из матового стекла", price: "154 000 сум", oldPrice: "", discount: "", badges: [], installmentLabel: "", distance: "14 км", postedAt: "Сегодня, 07:48", seller: "Частное лицо", condition: "Как новое", category: "Товары для дома", currency: "UZS", priceValue: 154000, urgentSale: [], gift: [], installment: [], delivery: [], region: "Бухара", manufacturer: ["Ikea"], searchHints: "ваза стекло декор интерьер" },
      { title: "Комплект органайзеров для кухни", price: "279 000 сум", oldPrice: "", discount: "", badges: [{ type: "business", label: "Магазин", iconOnly: true }, { type: "delivery", label: "Доставка", iconOnly: true }], installmentLabel: "", distance: "6 км", postedAt: "Вчера, 19:05", seller: "Магазин", condition: "Новое", category: "Товары для дома", currency: "UZS", priceValue: 279000, urgentSale: [], gift: [], installment: [], delivery: ["Курьером"], region: "Самарканд", manufacturer: ["Tupperware"], searchHints: "контейнеры кухня хранение набор" },
      { title: "Капсульная кофеварка для дома", price: "1 490 000 сум", oldPrice: "1 650 000 сум", discount: "-10%", badges: [{ type: "premium", label: "Premium", iconOnly: true }], installmentLabel: "Рассрочка", distance: "13 км", postedAt: "Сегодня, 18:11", seller: "Магазин", condition: "Б/у", category: "Электроника", currency: "UZS", priceValue: 1490000, urgentSale: [], gift: [], installment: ["Есть рассрочка"], delivery: [], region: "Ташкент", manufacturer: ["Nespresso"], searchHints: "кофеварка капсульная кухня техника" },
      { title: "Подарочный набор ароматических свечей", price: "189 000 сум", oldPrice: "", discount: "", badges: [{ type: "urgent-sale", label: "Срочно. Торг", iconOnly: true }], installmentLabel: "", distance: "3 км", postedAt: "Сегодня, 20:20", seller: "Частное лицо", condition: "Новое", category: "Товары для дома", currency: "UZS", priceValue: 189000, urgentSale: ["Срочно"], gift: [], installment: [], delivery: [], region: "Ташкент", manufacturer: ["Zara Home"], searchHints: "свечи подарок набор декор" },
      { title: "Зеркало с тонкой рамой", price: "580 000 сум", oldPrice: "", discount: "", badges: [{ type: "delivery", label: "Доставка" }], installmentLabel: "", distance: "10 км", postedAt: "Сегодня, 14:04", seller: "Магазин", condition: "Новое", category: "Товары для дома", currency: "UZS", priceValue: 580000, urgentSale: [], gift: [], installment: [], delivery: ["Курьером"], region: "Фергана", manufacturer: ["Asus"], searchHints: "зеркало интерьер круглая рама" },
      { title: "Текстильный шоппер с плотными ручками", price: "119 000 сум", oldPrice: "", discount: "", badges: [], installmentLabel: "", distance: "1 км", postedAt: "Сегодня, 12:47", seller: "Частное лицо", condition: "Новое", category: "Одежда и обувь", currency: "UZS", priceValue: 119000, urgentSale: [], gift: [], installment: [], delivery: [], region: "Ташкент", manufacturer: ["Uniqlo"], searchHints: "шоппер сумка текстиль аксессуары" },
      { title: "Хлопковый плед для спальни", price: "245 000 сум", oldPrice: "289 000 сум", discount: "-15%", badges: [{ type: "business", label: "Магазин" }], installmentLabel: "", distance: "15 км", postedAt: "Сегодня, 09:39", seller: "Магазин", condition: "Новое", category: "Товары для дома", currency: "UZS", priceValue: 245000, urgentSale: [], gift: [], installment: [], delivery: [], region: "Бухара", manufacturer: ["Ikea"], searchHints: "плед хлопок спальня покрывало" },
      { title: "Набор контейнеров для сыпучих продуктов", price: "215 000 сум", oldPrice: "", discount: "", badges: [{ type: "delivery", label: "Доставка", iconOnly: true }], installmentLabel: "", distance: "8 км", postedAt: "Вчера, 22:11", seller: "Частное лицо", condition: "Новое", category: "Товары для дома", currency: "UZS", priceValue: 215000, urgentSale: [], gift: [], installment: [], delivery: [], region: "Ташкент", manufacturer: ["Lock&Lock"], searchHints: "контейнеры кухня крупы хранение" },
      { title: "Детский конструктор из 120 деталей", price: "175 000 сум", oldPrice: "", discount: "", badges: [{ type: "business", label: "Магазин", iconOnly: true }, { type: "premium", label: "Premium", iconOnly: true }], installmentLabel: "", distance: "7 км", postedAt: "Сегодня, 10:06", seller: "Магазин", condition: "Новое", category: "Для детей", currency: "UZS", priceValue: 175000, urgentSale: [], gift: [], installment: [], delivery: [], region: "Самарканд", manufacturer: ["Lego"], searchHints: "конструктор дети игрушки набор" },
      { title: "Ланчбокс с разделителями", price: "99 000 сум", oldPrice: "", discount: "", badges: [], installmentLabel: "", distance: "4 км", postedAt: "Сегодня, 13:12", seller: "Частное лицо", condition: "Новое", category: "Товары для дома", currency: "UZS", priceValue: 99000, urgentSale: [], gift: ["Только бесплатно"], installment: [], delivery: [], region: "Ташкент", manufacturer: ["Tefal"], searchHints: "ланчбокс контейнер еда работа" },
      { title: "Ботильоны на устойчивом каблуке", price: "560 000 сум", oldPrice: "690 000 сум", discount: "-19%", badges: [{ type: "urgent-sale", label: "Срочно. Торг", iconOnly: true }], installmentLabel: "", distance: "6 км", postedAt: "Сегодня, 16:40", seller: "Частное лицо", condition: "Как новое", category: "Одежда и обувь", currency: "UZS", priceValue: 560000, urgentSale: ["Торг уместен"], gift: [], installment: [], delivery: [], region: "Ташкент", manufacturer: ["Zara"], searchHints: "ботильоны обувь женская каблук" },
      { title: "Кресло для балкона с подушкой", price: "890 000 сум", oldPrice: "", discount: "", badges: [{ type: "delivery", label: "Доставка" }, { type: "premium", label: "Premium", iconOnly: true }], installmentLabel: "", distance: "18 км", postedAt: "Сегодня, 11:58", seller: "Агентство", condition: "Новое", category: "Товары для дома", currency: "USD", priceValue: 890000, urgentSale: [], gift: [], installment: [], delivery: ["Курьером"], region: "Фергана", manufacturer: ["Home"], searchHints: "кресло балкон мебель подушка" },
      { title: "Комод-тележка для мелочей", price: "370 000 сум", oldPrice: "", discount: "", badges: [{ type: "business", label: "Магазин" }], installmentLabel: "", distance: "9 км", postedAt: "Сегодня, 15:41", seller: "Магазин", condition: "Новое", category: "Товары для дома", currency: "UZS", priceValue: 370000, urgentSale: [], gift: [], installment: [], delivery: [], region: "Ташкент", manufacturer: ["Asus"], searchHints: "комод тележка хранение" },
      { title: "Дорожная косметичка с отделениями", price: "135 000 сум", oldPrice: "", discount: "", badges: [], installmentLabel: "", distance: "2 км", postedAt: "Сегодня, 18:22", seller: "Частное лицо", condition: "Новое", category: "Одежда и обувь", currency: "UZS", priceValue: 135000, urgentSale: [], gift: [], installment: [], delivery: [], region: "Ташкент", manufacturer: ["Mango"], searchHints: "косметичка дорожная органайзер" },
      { title: "Набор стеклянных стаканов", price: "159 000 сум", oldPrice: "", discount: "", badges: [{ type: "delivery", label: "Доставка", iconOnly: true }], installmentLabel: "", distance: "5 км", postedAt: "Вчера, 18:44", seller: "Частное лицо", condition: "Новое", category: "Товары для дома", currency: "UZS", priceValue: 159000, urgentSale: [], gift: [], installment: [], delivery: [], region: "Самарканд", manufacturer: ["Luminarc"], searchHints: "стаканы стекло набор кухня" },
      { title: "Держатель для книг из металла", price: "89 000 сум", oldPrice: "", discount: "", badges: [{ type: "premium", label: "Premium", iconOnly: true }], installmentLabel: "", distance: "11 км", postedAt: "Сегодня, 09:02", seller: "Частное лицо", condition: "Б/у", category: "Товары для дома", currency: "UZS", priceValue: 89000, urgentSale: [], gift: [], installment: [], delivery: [], region: "Бухара", manufacturer: ["Ikea"], searchHints: "держатель книг металл офис" },
      { title: "Хлопковая рубашка oversize", price: "279 000 сум", oldPrice: "330 000 сум", discount: "-15%", badges: [{ type: "business", label: "Магазин", iconOnly: true }], installmentLabel: "", distance: "4 км", postedAt: "Сегодня, 14:27", seller: "Магазин", condition: "Новое", category: "Одежда и обувь", currency: "UZS", priceValue: 279000, urgentSale: [], gift: [], installment: [], delivery: [], region: "Ташкент", manufacturer: ["Uniqlo"], searchHints: "рубашка oversize хлопок" },
      { title: "Органайзер для украшений с зеркалом", price: "199 000 сум", oldPrice: "", discount: "", badges: [{ type: "delivery", label: "Доставка" }, { type: "urgent-sale", label: "Срочно. Торг", iconOnly: true }], installmentLabel: "", distance: "3 км", postedAt: "Сегодня, 17:03", seller: "Частное лицо", condition: "Новое", category: "Товары для дома", currency: "UZS", priceValue: 199000, urgentSale: ["Срочно"], gift: [], installment: [], delivery: ["Самовывоз"], region: "Ташкент", manufacturer: ["Home"], searchHints: "органайзер украшения зеркало" },
      { title: "Торшер с мягким рассеиванием света", price: "740 000 сум", oldPrice: "", discount: "", badges: [{ type: "business", label: "Магазин" }, { type: "delivery", label: "Доставка", iconOnly: true }], installmentLabel: "Рассрочка", distance: "16 км", postedAt: "Сегодня, 19:10", seller: "Магазин", condition: "Новое", category: "Товары для дома", currency: "UZS", priceValue: 740000, urgentSale: [], gift: [], installment: ["Есть рассрочка"], delivery: [], region: "Ташкент", manufacturer: ["Philips"], searchHints: "торшер свет интерьер лампа" },
      { title: "Декоративный плед в клетку", price: "225 000 сум", oldPrice: "280 000 сум", discount: "-19%", badges: [], installmentLabel: "", distance: "12 км", postedAt: "Сегодня, 08:58", seller: "Частное лицо", condition: "Новое", category: "Товары для дома", currency: "UZS", priceValue: 225000, urgentSale: [], gift: [], installment: [], delivery: [], region: "Фергана", manufacturer: ["Zara Home"], searchHints: "плед клетка декор спальня" }
    ].map(function (item, index) {
      return Object.assign({
        id: "home-card-" + String(index + 1),
        imageSrc: HOME_FEED_PHOTOS[index % HOME_FEED_PHOTOS.length],
        imageAlt: item.title,
        liked: false,
        photoDots: false
      }, item);
    });

    var SEARCH_FEED_BLUEPRINTS = [
      { title: "Беспроводные наушники с шумоподавлением", price: "890 000 сум", oldPrice: "990 000 сум", discount: "-10%", badges: [{ type: "business", label: "Магазин" }], installmentLabel: "Рассрочка", distance: "6 км", postedAt: "Сегодня, 09:11", seller: "Магазин", condition: "Новое", category: "Электроника", currency: "UZS", priceValue: 890000, urgentSale: [], gift: [], installment: ["Есть рассрочка"], delivery: [], region: "Ташкент", manufacturer: ["Sony"], searchHints: "наушники bluetooth шумоподавление" },
      { title: "Детский самокат трехколесный", price: "355 000 сум", oldPrice: "", discount: "", badges: [{ type: "premium", label: "Premium", iconOnly: true }], installmentLabel: "", distance: "9 км", postedAt: "Сегодня, 10:26", seller: "Частное лицо", condition: "Б/у", category: "Для детей", currency: "UZS", priceValue: 355000, urgentSale: [], gift: [], installment: [], delivery: [], region: "Самарканд", manufacturer: ["Xiaomi"], searchHints: "самокат дети прогулка" },
      { title: "Рабочее кресло с поясничной поддержкой", price: "1 250 000 сум", oldPrice: "", discount: "", badges: [{ type: "delivery", label: "Доставка" }], installmentLabel: "", distance: "14 км", postedAt: "Сегодня, 12:31", seller: "Магазин", condition: "Новое", category: "Товары для дома", currency: "UZS", priceValue: 1250000, urgentSale: [], gift: [], installment: [], delivery: ["Курьером"], region: "Ташкент", manufacturer: ["Asus"], searchHints: "кресло офисное рабочее спинка" },
      { title: "Худи oversize из плотного футера", price: "310 000 сум", oldPrice: "370 000 сум", discount: "-16%", badges: [], installmentLabel: "", distance: "5 км", postedAt: "Сегодня, 08:14", seller: "Частное лицо", condition: "Новое", category: "Одежда и обувь", currency: "UZS", priceValue: 310000, urgentSale: [], gift: [], installment: [], delivery: [], region: "Фергана", manufacturer: ["Uniqlo"], searchHints: "худи oversize свитшот" },
      { title: "Складной столик для ноутбука", price: "198 000 сум", oldPrice: "", discount: "", badges: [{ type: "business", label: "Магазин", iconOnly: true }, { type: "delivery", label: "Доставка", iconOnly: true }], installmentLabel: "", distance: "3 км", postedAt: "Сегодня, 14:12", seller: "Магазин", condition: "Новое", category: "Товары для дома", currency: "UZS", priceValue: 198000, urgentSale: [], gift: [], installment: [], delivery: [], region: "Ташкент", manufacturer: ["Ikea"], searchHints: "столик ноутбук складной" },
      { title: "Увлажнитель воздуха для спальни", price: "470 000 сум", oldPrice: "", discount: "", badges: [{ type: "urgent-sale", label: "Срочно. Торг", iconOnly: true }], installmentLabel: "", distance: "7 км", postedAt: "Сегодня, 18:03", seller: "Частное лицо", condition: "Как новое", category: "Товары для дома", currency: "UZS", priceValue: 470000, urgentSale: ["Срочно"], gift: [], installment: [], delivery: [], region: "Бухара", manufacturer: ["Philips"], searchHints: "увлажнитель воздух спальня" },
      { title: "Женская сумка через плечо", price: "259 000 сум", oldPrice: "320 000 сум", discount: "-19%", badges: [{ type: "premium", label: "Premium" }], installmentLabel: "", distance: "2 км", postedAt: "Сегодня, 15:47", seller: "Частное лицо", condition: "Новое", category: "Одежда и обувь", currency: "UZS", priceValue: 259000, urgentSale: [], gift: [], installment: [], delivery: [], region: "Ташкент", manufacturer: ["Mango"], searchHints: "сумка женская аксессуары" },
      { title: "Смарт-часы с AMOLED экраном", price: "1 050 000 сум", oldPrice: "", discount: "", badges: [{ type: "business", label: "Магазин" }], installmentLabel: "Рассрочка", distance: "11 км", postedAt: "Сегодня, 11:51", seller: "Магазин", condition: "Новое", category: "Электроника", currency: "UZS", priceValue: 1050000, urgentSale: [], gift: [], installment: ["Есть рассрочка"], delivery: [], region: "Ташкент", manufacturer: ["Apple"], searchHints: "смарт часы amoled watch" },
      { title: "Постельное белье из сатина", price: "380 000 сум", oldPrice: "", discount: "", badges: [{ type: "delivery", label: "Доставка" }], installmentLabel: "", distance: "10 км", postedAt: "Вчера, 20:44", seller: "Магазин", condition: "Новое", category: "Товары для дома", currency: "UZS", priceValue: 380000, urgentSale: [], gift: [], installment: [], delivery: ["Курьером"], region: "Самарканд", manufacturer: ["Zara Home"], searchHints: "постельное белье сатин спальня" },
      { title: "Кожаный ремень ручной работы", price: "145 000 сум", oldPrice: "", discount: "", badges: [], installmentLabel: "", distance: "4 км", postedAt: "Сегодня, 13:36", seller: "Частное лицо", condition: "Новое", category: "Одежда и обувь", currency: "UZS", priceValue: 145000, urgentSale: [], gift: [], installment: [], delivery: [], region: "Фергана", manufacturer: ["Home"], searchHints: "ремень кожа аксессуары" },
      { title: "Комплект баночек для специй", price: "119 000 сум", oldPrice: "", discount: "", badges: [{ type: "business", label: "Магазин", iconOnly: true }], installmentLabel: "", distance: "5 км", postedAt: "Сегодня, 16:19", seller: "Магазин", condition: "Новое", category: "Товары для дома", currency: "UZS", priceValue: 119000, urgentSale: [], gift: [], installment: [], delivery: [], region: "Ташкент", manufacturer: ["Tefal"], searchHints: "специи баночки кухня" },
      { title: "Детский ночник в форме облака", price: "168 000 сум", oldPrice: "", discount: "", badges: [{ type: "premium", label: "Premium", iconOnly: true }], installmentLabel: "", distance: "8 км", postedAt: "Сегодня, 09:41", seller: "Частное лицо", condition: "Новое", category: "Для детей", currency: "UZS", priceValue: 168000, urgentSale: [], gift: [], installment: [], delivery: [], region: "Ташкент", manufacturer: ["Xiaomi"], searchHints: "детский ночник облако" },
      { title: "Робот-пылесос для квартиры", price: "2 250 000 сум", oldPrice: "2 500 000 сум", discount: "-10%", badges: [{ type: "business", label: "Магазин" }, { type: "delivery", label: "Доставка", iconOnly: true }], installmentLabel: "Рассрочка", distance: "15 км", postedAt: "Сегодня, 18:40", seller: "Магазин", condition: "Б/у", category: "Электроника", currency: "UZS", priceValue: 2250000, urgentSale: [], gift: [], installment: ["Есть рассрочка"], delivery: ["Курьером"], region: "Ташкент", manufacturer: ["Samsung"], searchHints: "робот пылесос дом техника" },
      { title: "Плетеный пуф для гостиной", price: "430 000 сум", oldPrice: "", discount: "", badges: [{ type: "urgent-sale", label: "Срочно. Торг", iconOnly: true }], installmentLabel: "", distance: "12 км", postedAt: "Сегодня, 10:58", seller: "Частное лицо", condition: "Как новое", category: "Товары для дома", currency: "UZS", priceValue: 430000, urgentSale: ["Торг уместен"], gift: [], installment: [], delivery: [], region: "Бухара", manufacturer: ["Ikea"], searchHints: "пуф гостиная плетеный" },
      { title: "Свитер крупной вязки", price: "285 000 сум", oldPrice: "340 000 сум", discount: "-16%", badges: [], installmentLabel: "", distance: "7 км", postedAt: "Сегодня, 11:23", seller: "Частное лицо", condition: "Новое", category: "Одежда и обувь", currency: "UZS", priceValue: 285000, urgentSale: [], gift: [], installment: [], delivery: [], region: "Самарканд", manufacturer: ["Zara"], searchHints: "свитер вязаный теплый" },
      { title: "Набор кистей для макияжа", price: "149 000 сум", oldPrice: "", discount: "", badges: [{ type: "business", label: "Магазин", iconOnly: true }], installmentLabel: "", distance: "2 км", postedAt: "Сегодня, 17:32", seller: "Магазин", condition: "Новое", category: "Красота и здоровье", currency: "UZS", priceValue: 149000, urgentSale: [], gift: [], installment: [], delivery: [], region: "Ташкент", manufacturer: ["Real Techniques"], searchHints: "кисти макияж набор" },
      { title: "Детская полка для книг", price: "340 000 сум", oldPrice: "", discount: "", badges: [{ type: "delivery", label: "Доставка", iconOnly: true }], installmentLabel: "", distance: "9 км", postedAt: "Вчера, 18:13", seller: "Частное лицо", condition: "Новое", category: "Для детей", currency: "UZS", priceValue: 340000, urgentSale: [], gift: [], installment: [], delivery: [], region: "Ташкент", manufacturer: ["Ikea"], searchHints: "полка книги детская комната" },
      { title: "Кофейный столик из дерева", price: "780 000 сум", oldPrice: "", discount: "", badges: [{ type: "premium", label: "Premium", iconOnly: true }, { type: "delivery", label: "Доставка" }], installmentLabel: "", distance: "18 км", postedAt: "Сегодня, 14:49", seller: "Агентство", condition: "После ремонта", category: "Товары для дома", currency: "USD", priceValue: 780000, urgentSale: [], gift: [], installment: [], delivery: ["Курьером"], region: "Фергана", manufacturer: ["Home"], searchHints: "столик дерево интерьер" },
      { title: "Фитнес-коврик для тренировок", price: "210 000 сум", oldPrice: "", discount: "", badges: [], installmentLabel: "", distance: "6 км", postedAt: "Сегодня, 07:55", seller: "Частное лицо", condition: "Новое", category: "Хобби и спорт", currency: "UZS", priceValue: 210000, urgentSale: [], gift: [], installment: [], delivery: [], region: "Самарканд", manufacturer: ["Nike"], searchHints: "коврик фитнес тренировки" },
      { title: "Тумба под телевизор", price: "1 090 000 сум", oldPrice: "1 240 000 сум", discount: "-12%", badges: [{ type: "business", label: "Магазин" }], installmentLabel: "", distance: "13 км", postedAt: "Сегодня, 13:04", seller: "Магазин", condition: "Новое", category: "Товары для дома", currency: "UZS", priceValue: 1090000, urgentSale: [], gift: [], installment: [], delivery: [], region: "Ташкент", manufacturer: ["Ikea"], searchHints: "тумба тв гостиная мебель" },
      { title: "Блендер для смузи", price: "525 000 сум", oldPrice: "", discount: "", badges: [{ type: "urgent-sale", label: "Срочно. Торг", iconOnly: true }], installmentLabel: "", distance: "4 км", postedAt: "Сегодня, 16:55", seller: "Частное лицо", condition: "Б/у", category: "Электроника", currency: "UZS", priceValue: 525000, urgentSale: ["Срочно"], gift: [], installment: [], delivery: [], region: "Ташкент", manufacturer: ["Philips"], searchHints: "блендер кухня смузи" },
      { title: "Органайзер для детских игрушек", price: "230 000 сум", oldPrice: "", discount: "", badges: [{ type: "delivery", label: "Доставка", iconOnly: true }], installmentLabel: "", distance: "8 км", postedAt: "Сегодня, 10:19", seller: "Частное лицо", condition: "Новое", category: "Для детей", currency: "UZS", priceValue: 230000, urgentSale: [], gift: [], installment: [], delivery: [], region: "Бухара", manufacturer: ["Home"], searchHints: "органайзер игрушки детская" },
      { title: "Этажерка для ванной комнаты", price: "265 000 сум", oldPrice: "", discount: "", badges: [{ type: "business", label: "Магазин", iconOnly: true }], installmentLabel: "", distance: "11 км", postedAt: "Сегодня, 12:42", seller: "Магазин", condition: "Новое", category: "Товары для дома", currency: "UZS", priceValue: 265000, urgentSale: [], gift: [], installment: [], delivery: [], region: "Ташкент", manufacturer: ["Ikea"], searchHints: "этажерка ванная хранение" },
      { title: "Повседневные кроссовки на платформе", price: "440 000 сум", oldPrice: "520 000 сум", discount: "-15%", badges: [{ type: "premium", label: "Premium" }], installmentLabel: "", distance: "3 км", postedAt: "Сегодня, 09:45", seller: "Частное лицо", condition: "Как новое", category: "Одежда и обувь", currency: "UZS", priceValue: 440000, urgentSale: [], gift: [], installment: [], delivery: [], region: "Ташкент", manufacturer: ["Nike"], searchHints: "кроссовки платформа обувь" },
      { title: "Портативная колонка с Bluetooth", price: "615 000 сум", oldPrice: "", discount: "", badges: [{ type: "business", label: "Магазин" }, { type: "delivery", label: "Доставка", iconOnly: true }], installmentLabel: "", distance: "6 км", postedAt: "Сегодня, 17:15", seller: "Магазин", condition: "Новое", category: "Электроника", currency: "UZS", priceValue: 615000, urgentSale: [], gift: [], installment: [], delivery: ["Курьером"], region: "Самарканд", manufacturer: ["Sony"], searchHints: "колонка bluetooth музыка" },
      { title: "Набор постеров для интерьера", price: "175 000 сум", oldPrice: "", discount: "", badges: [], installmentLabel: "", distance: "2 км", postedAt: "Сегодня, 18:52", seller: "Частное лицо", condition: "Новое", category: "Товары для дома", currency: "UZS", priceValue: 175000, urgentSale: [], gift: [], installment: [], delivery: [], region: "Ташкент", manufacturer: ["Home"], searchHints: "постеры интерьер декор" },
      { title: "Детский вигвам для комнаты", price: "540 000 сум", oldPrice: "", discount: "", badges: [{ type: "premium", label: "Premium", iconOnly: true }], installmentLabel: "", distance: "14 км", postedAt: "Сегодня, 11:04", seller: "Частное лицо", condition: "Новое", category: "Для детей", currency: "UZS", priceValue: 540000, urgentSale: [], gift: [], installment: [], delivery: [], region: "Фергана", manufacturer: ["Lego"], searchHints: "вигвам детская комната" },
      { title: "Коврик для прихожей с бортиком", price: "129 000 сум", oldPrice: "", discount: "", badges: [{ type: "delivery", label: "Доставка" }], installmentLabel: "", distance: "5 км", postedAt: "Вчера, 17:06", seller: "Частное лицо", condition: "Новое", category: "Товары для дома", currency: "UZS", priceValue: 129000, urgentSale: [], gift: [], installment: [], delivery: [], region: "Ташкент", manufacturer: ["Home"], searchHints: "коврик прихожая дом" },
      { title: "Шерстяной шарф с бахромой", price: "158 000 сум", oldPrice: "", discount: "", badges: [], installmentLabel: "", distance: "4 км", postedAt: "Сегодня, 13:58", seller: "Частное лицо", condition: "Новое", category: "Одежда и обувь", currency: "UZS", priceValue: 158000, urgentSale: [], gift: [], installment: [], delivery: [], region: "Бухара", manufacturer: ["Mango"], searchHints: "шарф шерсть аксессуары" },
      { title: "Полка-органайзер для книг и декора", price: "455 000 сум", oldPrice: "520 000 сум", discount: "-13%", badges: [{ type: "business", label: "Магазин" }], installmentLabel: "", distance: "7 км", postedAt: "Сегодня, 15:33", seller: "Магазин", condition: "Новое", category: "Товары для дома", currency: "UZS", priceValue: 455000, urgentSale: [], gift: [], installment: [], delivery: [], region: "Ташкент", manufacturer: ["Ikea"], searchHints: "полка книги декор хранение" }
    ].map(function (item, index) {
      return Object.assign({
        id: "search-card-" + String(index + 1),
        imageSrc: HOME_FEED_PHOTOS[(index + 7) % HOME_FEED_PHOTOS.length],
        imageAlt: item.title,
        liked: false,
        photoDots: false
      }, item);
    });

    function createIconMarkup(config) {
      var size = config.size || 24;
      var colorClass = config.colorClass ? " " + config.colorClass : "";
      var iconClass = config.iconClass ? " " + config.iconClass : "";

      return [
        '<span class="icon-box icon-box--',
        String(size),
        colorClass,
        '" aria-hidden="true"><svg class="icon-svg',
        iconClass,
        '" viewBox="',
        config.viewBox || "0 0 24 24",
        '"><use href="#',
        config.symbolId,
        '"></use></svg></span>'
      ].join("");
    }

    function renderSellerAssetIcon(src, size, className) {
      return [
        '<span class="icon-box icon-box--',
        String(size),
        className ? " " + className : "",
        '" aria-hidden="true"><img class="seller-icon-img',
        className ? " " + className : "",
        '" src="',
        src,
        '" alt=""></span>'
      ].join("");
    }

    function renderSellerRocketIcon() {
      return [
        '<span class="seller-rocket-icon" aria-hidden="true">',
        '<img class="seller-rocket-icon__fill" src="',
        SELLER_CARD_ICON_SRC.rocketFill,
        '" alt="">',
        '<img class="seller-rocket-icon__stroke" src="',
        SELLER_CARD_ICON_SRC.rocketStroke,
        '" alt="">',
        "</span>"
      ].join("");
    }

    function resolveSellerActionIcon(icon) {
      if (icon && icon.indexOf("UpAdFill.svg") !== -1) {
        return renderSellerRocketIcon();
      }

      return icon ? renderSellerAssetIcon(icon, 16) : "";
    }

    function renderSellerBadgeGlyph(type) {
      var symbolId = "";
      var viewBox = "";

      if (type === "premium") {
        symbolId = "icon-seller-badge-premium";
        viewBox = "0 0 9.16664 8.9535";
      } else if (type === "push-up") {
        symbolId = "icon-seller-badge-pushup";
        viewBox = "0 0 10 9.40293";
      } else if (type === "delivery") {
        symbolId = "icon-seller-badge-delivery";
        viewBox = "0 0 10.5 8.40039";
      }

      if (!symbolId) {
        return "";
      }

      return createIconMarkup({
        symbolId: symbolId,
        size: 10,
        colorClass: "icon-color--on-dark",
        viewBox: viewBox,
        iconClass: " icon--seller-badge-glyph"
      });
    }

    function getBadgeIconConfig(badge) {
      var isOld = badge.classList.contains("badge--old");
      var isNew = badge.classList.contains("badge--new");

      if (badge.classList.contains("badge--premium")) {
        return { symbolId: "icon-crown-fill", size: isOld ? 10 : 12, colorClass: isOld ? "icon-color--primary" : "icon-color--on-dark" };
      }

      if (badge.classList.contains("badge--urgent-sale")) {
        return { symbolId: "icon-lightning-fill", size: isOld ? 10 : 12, colorClass: "icon-color--on-dark" };
      }

      if (badge.classList.contains("badge--business")) {
        return { symbolId: "icon-business-fill", size: isOld ? 10 : 12, colorClass: "icon-color--on-dark" };
      }

      if (badge.classList.contains("badge--delivery")) {
        return { symbolId: "icon-track-fill", size: isOld ? 10 : 12, colorClass: "icon-color--on-dark" };
      }

      if (badge.classList.contains("badge--agency")) {
        return { symbolId: "icon-agency-fill", size: isOld ? 10 : 12, colorClass: "icon-color--on-dark" };
      }

      if (badge.classList.contains("badge--close")) {
        return { symbolId: "icon-close-circle-fill", size: isOld ? 10 : 12, colorClass: "icon-color--on-dark" };
      }

      if (badge.classList.contains("badge--push-up")) {
        return { symbolId: "icon-up-ad-fill", size: isOld ? 10 : 12, colorClass: "icon-color--on-dark" };
      }

      if (isNew) {
        return { symbolId: "icon-business-fill", size: 12, colorClass: "icon-color--on-dark" };
      }

      return { symbolId: "icon-business-fill", size: 10, colorClass: "icon-color--on-dark" };
    }

    function upgradeLegacyIcons() {
      Array.prototype.forEach.call(document.querySelectorAll(".badge__asset"), function (asset) {
        var iconWrapper = asset.closest(".badge__icon");
        var badge = asset.closest(".badge");
        var config;

        if (!iconWrapper || !badge) {
          return;
        }

        config = getBadgeIconConfig(badge);
        iconWrapper.innerHTML = createIconMarkup({
          symbolId: config.symbolId,
          size: config.size,
          colorClass: config.colorClass
        });
      });
    }

    function initBannerCarousel() {
      var bannerScroll = document.querySelector(".banner-scroll");
      if (!bannerScroll) {
        return;
      }

      var originalSlides = Array.prototype.slice.call(bannerScroll.children);
      if (!originalSlides.length) {
        return;
      }

      var prependClones = document.createDocumentFragment();
      var appendClones = document.createDocumentFragment();

      originalSlides.forEach(function (slide) {
        prependClones.appendChild(slide.cloneNode(true));
        appendClones.appendChild(slide.cloneNode(true));
      });

      bannerScroll.insertBefore(prependClones, bannerScroll.firstChild);
      bannerScroll.appendChild(appendClones);

      var step = originalSlides[0].getBoundingClientRect().width + 8;
      var loopWidth = step * originalSlides.length;
      var resetTimer = null;
      var autoplayTimer = null;

      function normalizeScroll() {
        if (bannerScroll.scrollLeft < loopWidth * 0.5) {
          bannerScroll.scrollLeft += loopWidth;
        } else if (bannerScroll.scrollLeft > loopWidth * 1.5) {
          bannerScroll.scrollLeft -= loopWidth;
        }
      }

      function stopAutoplay() {
        if (autoplayTimer) {
          window.clearInterval(autoplayTimer);
          autoplayTimer = null;
        }
      }

      function startAutoplay() {
        stopAutoplay();
        autoplayTimer = window.setInterval(function () {
          normalizeScroll();
          bannerScroll.scrollBy({
            left: step,
            behavior: "smooth"
          });
        }, 3200);
      }

      bannerScroll.scrollLeft = loopWidth;

      bannerScroll.addEventListener("scroll", function () {
        window.clearTimeout(resetTimer);
        resetTimer = window.setTimeout(normalizeScroll, 140);
      });

      bannerScroll.addEventListener("pointerdown", stopAutoplay, { passive: true });
      bannerScroll.addEventListener("pointerup", startAutoplay, { passive: true });
      bannerScroll.addEventListener("touchstart", stopAutoplay, { passive: true });
      bannerScroll.addEventListener("touchend", startAutoplay, { passive: true });
      bannerScroll.addEventListener("mouseenter", stopAutoplay);
      bannerScroll.addEventListener("mouseleave", startAutoplay);

      startAutoplay();
    }

    function initSearchOverlay() {
      var app = document.querySelector(".app");
      var searchTrigger = document.querySelector(".search-field");
      var searchOverlay = document.querySelector(".search-overlay");

      if (!app || !searchTrigger || !searchOverlay) {
        return;
      }

      var searchScroller = searchOverlay.querySelector(".search-overlay__scroller");
      var backButton = searchOverlay.querySelector(".search-overlay__back");
      var searchForm = searchOverlay.querySelector(".search-form");
      var searchField = searchOverlay.querySelector(".search-form__field");
      var searchInput = searchOverlay.querySelector(".search-form__input");
      var clearButton = searchOverlay.querySelector(".search-form__clear");
      var chipList = searchOverlay.querySelector(".search-chip-list");
      var primaryCard = searchOverlay.querySelector(".search-card--primary");
      var primaryList = searchOverlay.querySelector(".search-primary-list");
      var categoryCard = searchOverlay.querySelector(".search-card--categories");
      var categoryList = searchOverlay.querySelector(".search-category-list");
      var favoriteToast = document.querySelector(".favorite-toast");
      var STORAGE_KEY = "birbir-search-history-v1";
      var SEARCH_HISTORY_SEED = [
        { label: "ррр", caption: "" },
        { label: "shevrolet", caption: "" },
        { label: "iphone11", caption: "Телефоны и связь · Мобильные телефоны" },
        { label: "майка детская", caption: "Одежда для девочек · Майки и топы" },
        { label: "майка детей", caption: "Одежда для девочек · Нижнее белье" }
      ];
      var SEARCH_SUGGESTION_SEED = [
        { label: "платье", caption: "Женская одежда · Платья" },
        { label: "платье", caption: "Одежда для девочек · Платья" },
        { label: "платье женское", caption: "Женская одежда · Платья" },
        { label: "платье вечернее", caption: "Женская одежда · Платья" },
        { label: "платье вечернее", caption: "Женская одежда · Свадебные платья и костюмы" }
      ];
      var SEARCH_EMPTY_CATEGORY_SEED = [
        { label: "Мебель и предметы интерьеры", caption: "Мебель и интерьер", imageSrc: "assets/category/Home.png" },
        { label: "Женская одежда", caption: "Одежда и обувь", imageSrc: "assets/category/Womenswear.png" },
        { label: "Продажа", caption: "Недвижимость", imageSrc: "assets/category/Real%20Estate.png" },
        { label: "Запчасти и аксессуары", caption: "Транспорт", imageSrc: "assets/category/Auto.png" },
        { label: "Телефоны и связь", caption: "Электроника", imageSrc: "assets/category/Electronics.png" }
      ];
      var SEARCH_TYPED_CATEGORY_SEED = [
        { label: "Платья", caption: "Женская одежда" },
        { label: "Свадебные платья и костюмы", caption: "Женская одежда" },
        { label: "Платья", caption: "Одежда для девочек" },
        { label: "Одежда и Аксессуары", caption: "" }
      ];
      var CHIP_SEED_RULES = [
        { match: "плать", chips: ["вечернее", "для", "девочек", "женское", "на", "выпускной"] },
        { match: "iphone", chips: ["12", "pro", "max", "чехол", "зарядка", "телефон"] },
        { match: "майка", chips: ["детская", "для", "девочек", "топ", "нижнее", "белье"] }
      ];
      var searchState = {
        isSearchOpen: false,
        query: "",
        history: loadHistory()
      };
      var searchIndex = buildSearchIndex();

      renderSearch();

      window.addEventListener("birbir:open-search", function (event) {
        openSearch(event && event.detail ? event.detail : {});
      });

      searchTrigger.addEventListener("click", function () {
        openSearch();
      });
      backButton.addEventListener("click", closeSearch);

      document.addEventListener("click", function (event) {
        var chip = event.target.closest(".chip");
        var label;

        if (!chip || !chip.closest(".categories")) {
          return;
        }

        label = normalizeWhitespace(chip.querySelector(".chip__label") ? chip.querySelector(".chip__label").textContent : "");

        window.dispatchEvent(new CustomEvent("birbir:open-results", {
          detail: {
            query: "",
            categoryLabel: normalizeValue(label) === "все" ? "" : label,
            categoryValue: normalizeValue(label) === "все" ? "" : label,
            source: "home-category"
          }
        }));
      });

      searchForm.addEventListener("submit", function (event) {
        var committedQuery;

        event.preventDefault();

        committedQuery = normalizeWhitespace(searchInput.value);
        searchState.query = committedQuery;
        searchInput.value = committedQuery;

        if (normalizeValue(committedQuery)) {
          pushHistory(committedQuery);
          window.dispatchEvent(new CustomEvent("birbir:open-results", {
            detail: {
              query: committedQuery,
              category: ""
            }
          }));
          closeSearch();
          return;
        }

        renderSearch();
        searchInput.blur();
      });

      searchInput.addEventListener("input", function () {
        searchState.query = searchInput.value;
        renderSearch();
      });

      searchInput.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          event.preventDefault();
          closeSearch();
        }
      });

      clearButton.addEventListener("click", function (event) {
        event.preventDefault();
        searchState.query = "";
        searchInput.value = "";
        renderSearch();
        focusSearchInput();
      });

      searchOverlay.addEventListener("click", function (event) {
        var interactiveItem = event.target.closest("[data-search-value]");
        var categoryLabel;
        var nextQuery;

        if (!interactiveItem || !searchOverlay.contains(interactiveItem)) {
          return;
        }

        categoryLabel = normalizeWhitespace(interactiveItem.getAttribute("data-search-category") || "");

        nextQuery = interactiveItem.getAttribute("data-search-mode") === "append"
          ? appendQueryToken(searchState.query, interactiveItem.getAttribute("data-search-value"))
          : normalizeWhitespace(interactiveItem.getAttribute("data-search-value"));

        searchState.query = nextQuery;
        searchInput.value = nextQuery;

        if (normalizeValue(nextQuery)) {
          pushHistory(nextQuery);
        }

        window.dispatchEvent(new CustomEvent("birbir:open-results", {
          detail: {
            query: nextQuery,
            category: categoryLabel
          }
        }));
        closeSearch();
      });

      function openSearch(options) {
        var nextQuery;

        options = options || {};
        nextQuery = normalizeWhitespace(options.query || "");

        searchState.isSearchOpen = true;
        searchState.query = nextQuery;
        searchInput.value = nextQuery;
        app.classList.add("is-search-open");
        searchOverlay.classList.add("is-open");
        searchOverlay.setAttribute("aria-hidden", "false");

        if (favoriteToast) {
          favoriteToast.classList.remove("is-visible");
        }

        renderSearch();
        searchScroller.scrollTop = 0;
        if (options.focus !== false) {
          focusSearchInput();
        }
      }

      function closeSearch() {
        searchState.isSearchOpen = false;
        app.classList.remove("is-search-open");
        searchOverlay.classList.remove("is-open");
        searchOverlay.setAttribute("aria-hidden", "true");
        searchInput.blur();
      }

      function focusSearchInput() {
        window.requestAnimationFrame(function () {
          window.setTimeout(function () {
            try {
              searchInput.focus({ preventScroll: true });
            } catch (error) {
              searchInput.focus();
            }
          }, 60);
        });
      }

      function loadHistory() {
        var storedHistory;

        try {
          storedHistory = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
        } catch (error) {
          storedHistory = [];
        }

        if (!Array.isArray(storedHistory) || !storedHistory.length) {
          return SEARCH_HISTORY_SEED.map(function (item) {
            return item.label;
          }).slice(0, 5);
        }

        return storedHistory.filter(function (item) {
          return typeof item === "string" && normalizeValue(item);
        }).slice(0, 5);
      }

      function persistHistory() {
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(searchState.history.slice(0, 5)));
        } catch (error) {
        }
      }

      function pushHistory(query) {
        var normalizedQuery = normalizeValue(query);

        if (!normalizedQuery) {
          return;
        }

        searchState.history = [normalizeWhitespace(query)].concat(searchState.history.filter(function (item) {
          return normalizeValue(item) !== normalizedQuery;
        })).slice(0, 5);

        persistHistory();
      }

      function buildSearchIndex() {
        var items = [];

        Array.prototype.forEach.call(document.querySelectorAll(".card"), function (card) {
          var title = card.querySelector(".card__title");
          var image = card.querySelector(".card__image");
          var label = normalizeWhitespace(title ? title.textContent : "");
          var caption = deriveSuggestionCaption(label);

          if (!label) {
            return;
          }

          items.push({
            label: label,
            caption: caption,
            kind: "suggestion",
            sourceImage: image ? image.getAttribute("src") : "",
            tokens: tokenize(label + " " + caption)
          });
        });

        Array.prototype.forEach.call(document.querySelectorAll(".chip"), function (chip) {
          var label = normalizeWhitespace(chip.querySelector(".chip__label") ? chip.querySelector(".chip__label").textContent : "");
          var image = chip.querySelector(".chip__thumb img");

          if (!label) {
            return;
          }

          items.push({
            label: label,
            caption: "",
            kind: "category",
            sourceImage: image ? image.getAttribute("src") : "",
            tokens: tokenize(label)
          });
        });

        Array.prototype.forEach.call(SEARCH_SUGGESTION_SEED, function (item) {
          items.push({
            label: item.label,
            caption: item.caption,
            kind: "suggestion",
            sourceImage: "",
            tokens: tokenize(item.label + " " + item.caption)
          });
        });

        Array.prototype.forEach.call(SEARCH_TYPED_CATEGORY_SEED, function (item) {
          items.push({
            label: item.label,
            caption: item.caption,
            kind: "category",
            sourceImage: "",
            tokens: tokenize(item.label + " " + item.caption)
          });
        });

        return dedupeIndex(items);
      }

      function deriveSuggestionCaption(label) {
        var normalizedLabel = normalizeValue(label);

        if (!normalizedLabel) {
          return "";
        }

        if (normalizedLabel.indexOf("iphone") !== -1) {
          return "Телефоны и связь · Мобильные телефоны";
        }

        if (normalizedLabel.indexOf("кеды") !== -1) {
          return "Одежда и обувь · Кеды";
        }

        if (normalizedLabel.indexOf("пальто") !== -1) {
          return "Женская одежда · Верхняя одежда";
        }

        if (normalizedLabel.indexOf("кардиган") !== -1) {
          return "Женская одежда · Кардиганы";
        }

        if (normalizedLabel.indexOf("органайзер") !== -1 || normalizedLabel.indexOf("сервиз") !== -1 || normalizedLabel.indexOf("кухн") !== -1) {
          return "Мебель и интерьер";
        }

        return "";
      }

      function dedupeIndex(items) {
        var seen = Object.create(null);

        return items.filter(function (item) {
          var key = [item.kind, normalizeValue(item.label), normalizeValue(item.caption)].join("|");

          if (seen[key]) {
            return false;
          }

          seen[key] = true;
          return true;
        });
      }

      function renderSearch() {
        var hasQuery = normalizeValue(searchState.query).length > 0;
        var primaryItems = hasQuery ? getMatchedSuggestions(searchState.query) : getHistoryItems();
        var categoryItems = hasQuery ? getMatchedCategories(searchState.query) : getEmptyCategories();
        var chipItems = hasQuery ? getChipItems(searchState.query, primaryItems, categoryItems) : [];

        searchForm.classList.toggle("is-filled", hasQuery);
        searchField.classList.toggle("search-form__field--filled", hasQuery);
        clearButton.disabled = !hasQuery;
        clearButton.setAttribute("aria-hidden", hasQuery ? "false" : "true");
        chipList.classList.toggle("has-chips", chipItems.length > 0);
        chipList.setAttribute("aria-hidden", chipItems.length > 0 ? "false" : "true");

        primaryCard.hidden = primaryItems.length === 0;
        categoryCard.hidden = categoryItems.length === 0;

        chipList.innerHTML = chipItems.map(renderChip).join("");
        primaryList.innerHTML = primaryItems.map(renderListItem).join("");
        categoryList.innerHTML = categoryItems.map(renderListItem).join("");
      }

      function getHistoryItems() {
        return searchState.history.map(resolveHistoryItem).filter(Boolean);
      }

      function resolveHistoryItem(label) {
        var normalizedLabel = normalizeValue(label);
        var seedMatch = findFirstMatch(SEARCH_HISTORY_SEED, normalizedLabel) || findFirstMatch(SEARCH_SUGGESTION_SEED, normalizedLabel) || findFirstIndexMatch(searchIndex, normalizedLabel);

        return {
          label: normalizeWhitespace(label),
          caption: seedMatch && seedMatch.caption ? seedMatch.caption : "",
          leftKind: "recent",
          actionValue: normalizeWhitespace(label),
          actionMode: "replace"
        };
      }

      function getEmptyCategories() {
        return SEARCH_EMPTY_CATEGORY_SEED.map(function (item) {
          return {
            label: item.label,
            caption: item.caption,
            leftKind: "thumb",
            imageSrc: item.imageSrc,
            actionValue: item.label,
            actionMode: "replace"
          };
        });
      }

      function getMatchedSuggestions(query) {
        var normalizedQuery = normalizeValue(query);
        var items = [];

        Array.prototype.forEach.call(SEARCH_SUGGESTION_SEED, function (item) {
          if (matchesQuery(item, normalizedQuery)) {
            items.push({
              label: item.label,
              caption: item.caption,
              leftKind: "search",
              actionValue: item.label,
              actionMode: "replace"
            });
          }
        });

        Array.prototype.forEach.call(searchIndex.filter(function (item) {
          return item.kind === "suggestion" && matchesQuery(item, normalizedQuery);
        }), function (item) {
          items.push({
            label: item.label,
            caption: item.caption,
            leftKind: "search",
            actionValue: item.label,
            actionMode: "replace"
          });
        });

        items = dedupeRenderedItems(items);

        if (!items.length && normalizeWhitespace(query)) {
          items.push({
            label: normalizeWhitespace(query),
            caption: "",
            leftKind: "search",
            actionValue: normalizeWhitespace(query),
            actionMode: "replace"
          });
        }

        return items.slice(0, 5);
      }

      function getMatchedCategories(query) {
        var normalizedQuery = normalizeValue(query);
        var items = [];

        Array.prototype.forEach.call(SEARCH_TYPED_CATEGORY_SEED, function (item) {
          if (matchesQuery(item, normalizedQuery)) {
            items.push({
              label: item.label,
              caption: item.caption,
              leftKind: "category",
              actionValue: item.label,
              actionMode: "replace"
            });
          }
        });

        Array.prototype.forEach.call(searchIndex.filter(function (item) {
          return item.kind === "category" && matchesQuery(item, normalizedQuery);
        }), function (item) {
          items.push({
            label: item.label,
            caption: item.caption || "Категория",
            leftKind: "category",
            actionValue: item.label,
            actionMode: "replace"
          });
        });

        items = dedupeRenderedItems(items);

        if (!items.length) {
          items = SEARCH_EMPTY_CATEGORY_SEED.slice(0, 4).map(function (item) {
            return {
              label: item.label,
              caption: item.caption,
              leftKind: "category",
              actionValue: item.label,
              actionMode: "replace"
            };
          });
        }

        return items.slice(0, 5);
      }

      function getChipItems(query, suggestions, categories) {
        var normalizedQuery = normalizeValue(query);
        var queryTokens = tokenize(query);
        var seedRule = null;
        var chips;

        Array.prototype.forEach.call(CHIP_SEED_RULES, function (rule) {
          if (!seedRule && normalizedQuery.indexOf(rule.match) !== -1) {
            seedRule = rule;
          }
        });

        if (seedRule) {
          chips = seedRule.chips.slice();
        } else {
          chips = extractTopTokens(suggestions.concat(categories), queryTokens);
        }

        return chips.filter(function (item) {
          return item && normalizeValue(query).indexOf(normalizeValue(item)) === -1;
        }).slice(0, 6);
      }

      function extractTopTokens(items, excludedTokens) {
        var frequency = Object.create(null);
        var firstSeen = Object.create(null);
        var order = [];

        Array.prototype.forEach.call(items, function (item) {
          Array.prototype.forEach.call(tokenize((item.label || "") + " " + (item.caption || "")), function (token) {
            if (!token || excludedTokens.indexOf(token) !== -1) {
              return;
            }

            if (typeof frequency[token] !== "number") {
              frequency[token] = 0;
              firstSeen[token] = order.length;
              order.push(token);
            }

            frequency[token] += 1;
          });
        });

        return order.sort(function (left, right) {
          if (frequency[right] !== frequency[left]) {
            return frequency[right] - frequency[left];
          }

          return firstSeen[left] - firstSeen[right];
        });
      }

      function appendQueryToken(currentQuery, nextToken) {
        var normalizedCurrent = normalizeWhitespace(currentQuery);
        var nextTokenText = normalizeWhitespace(nextToken);
        var nextTokenTokens = tokenize(nextTokenText);
        var currentTokens = tokenize(normalizedCurrent);

        if (!nextTokenText) {
          return normalizedCurrent;
        }

        if (nextTokenTokens.length === 1 && currentTokens.indexOf(nextTokenTokens[0]) !== -1) {
          return normalizedCurrent;
        }

        if (normalizeValue(normalizedCurrent).indexOf(normalizeValue(nextTokenText)) !== -1) {
          return normalizedCurrent;
        }

        return normalizeWhitespace(normalizedCurrent ? normalizedCurrent + " " + nextTokenText : nextTokenText);
      }

      function matchesQuery(item, normalizedQuery) {
        var haystack = normalizeValue((item.label || "") + " " + (item.caption || ""));
        var itemTokens = item.tokens || tokenize((item.label || "") + " " + (item.caption || ""));

        if (!normalizedQuery) {
          return true;
        }

        if (haystack.indexOf(normalizedQuery) !== -1) {
          return true;
        }

        return tokenize(normalizedQuery).every(function (token) {
          return itemTokens.some(function (candidate) {
            return candidate.indexOf(token) !== -1;
          });
        });
      }

      function dedupeRenderedItems(items) {
        var seen = Object.create(null);

        return items.filter(function (item) {
          var key = [normalizeValue(item.label), normalizeValue(item.caption), item.leftKind].join("|");

          if (seen[key]) {
            return false;
          }

          seen[key] = true;
          return true;
        });
      }

      function findFirstMatch(items, normalizedLabel) {
        var matchedItem = null;

        Array.prototype.forEach.call(items, function (item) {
          if (!matchedItem && normalizeValue(item.label) === normalizedLabel) {
            matchedItem = item;
          }
        });

        return matchedItem;
      }

      function findFirstIndexMatch(items, normalizedLabel) {
        var matchedItem = null;

        Array.prototype.forEach.call(items, function (item) {
          if (!matchedItem && normalizeValue(item.label) === normalizedLabel) {
            matchedItem = item;
          }
        });

        return matchedItem;
      }

      function renderChip(chipLabel) {
        return [
          '<button class="search-chip" type="button" data-search-value="',
          escapeHtml(chipLabel),
          '" data-search-mode="append">',
          escapeHtml(chipLabel),
          "</button>"
        ].join("");
      }

      function renderListItem(item) {
        return [
          '<button class="search-list-item" type="button" data-search-value="',
          escapeHtml(item.actionValue || item.label),
          '" data-search-mode="',
          escapeHtml(item.actionMode || "replace"),
          '" data-search-category="',
          escapeHtml(item.leftKind === "thumb" || item.leftKind === "category" ? (item.actionCategory || item.label) : ""),
          '">',
          renderListItemLeft(item),
          '<span class="search-list-item__content">',
          '<p class="search-list-item__title">',
          escapeHtml(item.label),
          "</p>",
          item.caption ? '<p class="search-list-item__caption">' + escapeHtml(item.caption) + "</p>" : "",
          "</span>",
          '<span class="search-list-item__right" aria-hidden="true"><span class="icon-box icon-box--20 icon-color--secondary"><svg class="icon-svg icon--chevron-right-line" viewBox="0 0 24 24"><use href="#icon-chevron-right-line"></use></svg></span></span>',
          "</button>"
        ].join("");
      }

      function renderListItemLeft(item) {
        if (item.leftKind === "thumb" && item.imageSrc) {
          return [
            '<span class="search-list-item__left search-list-item__left--thumb">',
            '<img src="',
            escapeHtml(item.imageSrc),
            '" alt="">',
            "</span>"
          ].join("");
        }

        if (item.leftKind === "recent") {
          return [
            '<span class="search-list-item__left">',
            '<span class="icon-box icon-box--16 icon-color--secondary search-list-item__symbol-box">',
            '<svg class="icon-svg icon--recent" viewBox="0 0 24 24" aria-hidden="true">',
            '<use href="#icon-recent"></use>',
            "</svg>",
            "</span>",
            "</span>"
          ].join("");
        }

        if (item.leftKind === "category") {
          return [
            '<span class="search-list-item__left">',
            '<span class="icon-box icon-box--16 icon-color--secondary search-list-item__symbol-box">',
            '<svg class="icon-svg icon--search-list" viewBox="0 0 24 24" aria-hidden="true">',
            '<use href="#icon-search-list"></use>',
            "</svg>",
            "</span>",
            "</span>"
          ].join("");
        }

        return [
          '<span class="search-list-item__left">',
          '<span class="icon-box icon-box--16 icon-color--secondary search-list-item__symbol-box">',
          '<svg class="icon-svg icon--search" viewBox="0 0 24 24" aria-hidden="true">',
          '<use href="#icon-search"></use>',
          "</svg>",
          "</span>",
          "</span>"
        ].join("");
      }

      function normalizeWhitespace(value) {
        return String(value || "").replace(/\s+/g, " ").trim();
      }

      function normalizeValue(value) {
        return normalizeWhitespace(value).toLowerCase().replace(/ё/g, "е");
      }

      function tokenize(value) {
        return normalizeValue(value).replace(/[^0-9a-zа-я\s]/gi, " ").split(/\s+/).filter(Boolean);
      }

      function escapeHtml(value) {
        return String(value || "").replace(/[&<>"']/g, function (character) {
          return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
          }[character];
        });
      }
    }

    function initSearchResults() {
      var resultsScreen = document.querySelector(".search-results");
      var resultsScroller = resultsScreen ? resultsScreen.querySelector(".search-results__scroller") : null;
      var titleBackButton = resultsScreen ? resultsScreen.querySelector(".results-header__title-back") : null;
      var resultsBackButton = resultsScreen ? resultsScreen.querySelector(".results-header__back") : null;
      var resultsTitle = resultsScreen ? resultsScreen.querySelector(".results-header__title") : null;
      var resultsSearchTrigger = resultsScreen ? resultsScreen.querySelector(".results-search-trigger") : null;
      var resultsSearchText = resultsScreen ? resultsScreen.querySelector(".results-search-trigger__text") : null;
      var filterRow = resultsScreen ? resultsScreen.querySelector(".results-filter-row") : null;
      var filterScroll = resultsScreen ? resultsScreen.querySelector(".results-filter-scroll") : null;
      var regionButton = resultsScreen ? resultsScreen.querySelector('[data-results-secondary="region"]') : null;
      var regionText = regionButton ? regionButton.querySelector(".results-secondary-button__text") : null;
      var sortButton = resultsScreen ? resultsScreen.querySelector('[data-results-secondary="sort"]') : null;
      var sortText = sortButton ? sortButton.querySelector(".results-secondary-button__text") : null;
      var feedGrid = resultsScreen ? resultsScreen.querySelector(".results-feed__grid") : null;
      var tooltip = resultsScreen ? resultsScreen.querySelector(".filters-tooltip") : null;
      var tooltipClose = tooltip ? tooltip.querySelector(".filters-tooltip__close") : null;
      var filterSheet = document.querySelector(".filter-sheet");
      var filterSheetBackdrop = filterSheet ? filterSheet.querySelector(".filter-sheet__backdrop") : null;
      var filterSheetBack = filterSheet ? filterSheet.querySelector(".filter-sheet__back") : null;
      var filterSheetReset = filterSheet ? filterSheet.querySelector(".filter-sheet__footer-reset") : null;
      var filterSheetApply = filterSheet ? filterSheet.querySelector(".filter-sheet__footer-apply") : null;
      var filterSheetCategoryLabel = filterSheet ? filterSheet.querySelector("#filter-sheet-category-label") : null;
      var filterSheetRegionLabel = filterSheet ? filterSheet.querySelector("#filter-sheet-region-label") : null;
      var filterSheetSellerCaption = filterSheet ? filterSheet.querySelector("#filter-sheet-seller-caption") : null;
      var filterSheetSellerTabs = filterSheet ? filterSheet.querySelector("#filter-sheet-seller-tabs") : null;
      var filterSheetConditionTabs = filterSheet ? filterSheet.querySelector("#filter-sheet-condition-tabs") : null;
      var filterSheetManufacturerValue = filterSheet ? filterSheet.querySelector("#filter-sheet-manufacturer-value") : null;
      var filterSheetSortValue = filterSheet ? filterSheet.querySelector("#filter-sheet-sort-value") : null;
      var filterSheetCurrencyTabs = filterSheet ? filterSheet.querySelector("#filter-sheet-currency-tabs") : null;
      var filterSheetPriceRange = filterSheet ? filterSheet.querySelector("#filter-sheet-price-range") : null;
      var filterSheetToggleList = filterSheet ? filterSheet.querySelector("#filter-sheet-toggle-list") : null;
      var filterBottomsheet = document.querySelector(".filter-bottomsheet");
      var filterBottomsheetBackdrop = filterBottomsheet ? filterBottomsheet.querySelector(".filter-bottomsheet__backdrop") : null;
      var filterBottomsheetReset = filterBottomsheet ? filterBottomsheet.querySelector(".filter-bottomsheet__reset") : null;
      var filterBottomsheetClose = filterBottomsheet ? filterBottomsheet.querySelector(".filter-bottomsheet__close") : null;
      var filterBottomsheetTitle = filterBottomsheet ? filterBottomsheet.querySelector(".filter-bottomsheet__title") : null;
      var filterBottomsheetSearch = filterBottomsheet ? filterBottomsheet.querySelector(".filter-bottomsheet__search") : null;
      var filterBottomsheetSearchInput = filterBottomsheet ? filterBottomsheet.querySelector(".filter-bottomsheet__search-input") : null;
      var filterBottomsheetList = filterBottomsheet ? filterBottomsheet.querySelector(".filter-bottomsheet__list") : null;
      var filterBottomsheetApply = filterBottomsheet ? filterBottomsheet.querySelector(".filter-bottomsheet__apply") : null;
      var categorySheet = document.querySelector(".category-sheet");
      var categorySheetBackdrop = categorySheet ? categorySheet.querySelector(".category-sheet__backdrop") : null;
      var categorySheetClose = categorySheet ? categorySheet.querySelector(".category-sheet__close") : null;
      var categorySheetList = categorySheet ? categorySheet.querySelector(".category-sheet__list") : null;
      var categorySheetAll = categorySheet ? categorySheet.querySelector(".category-sheet__all") : null;
      var favoriteToast = document.querySelector(".favorite-toast");
      var BANNER_IMAGE_SRC = "assets/detail/BirBir delivery.png";
      var FILTER_TOOLTIP_KEY = "birbir-results-tooltip-dismissed";
      var BASELINE_FILTER_KEYS = ["category", "price", "currency"];
      var FILTER_ORDER = ["filters", "category", "seller", "condition", "gift", "urgentSale", "installment", "currency", "price", "delivery"];
      var CHIP_LABELS = {
        filters: "Фильтры",
        category: "Все категории",
        seller: "Продавец",
        condition: "Состояние",
        gift: "Отдам даром",
        urgentSale: "Срочно. Торг",
        installment: "В рассрочку",
        currency: "Валюта",
        price: "Цена",
        delivery: "Доступна доставка"
      };
      var TOGGLE_FILTER_KEYS = ["gift", "urgentSale", "installment", "delivery"];
      var MANUFACTURER_OPTIONS = [
        "Apple", "Samsung", "Xiaomi", "Honor", "Google", "Tecno", "Nokia", "Sony",
        "Motorola", "OnePlus", "Nothing", "Realme", "Vivo", "Oppo", "Huawei", "Asus"
      ].map(function (label) {
        return { label: label, value: label };
      });
      var CATEGORY_ALIAS_MAP = {
        "мебель и предметы интерьеры": "Товары для дома",
        "мебель и интерьер": "Товары для дома",
        "женская одежда": "Одежда и обувь",
        "одежда для девочек": "Одежда и обувь",
        "платья": "Одежда и обувь",
        "свадебные платья и костюмы": "Одежда и обувь",
        "одежда и аксессуары": "Одежда и обувь",
        "телефоны и связь": "Электроника",
        "мобильные телефоны": "Электроника",
        "запчасти и аксессуары": "Автомобили",
        "продажа": "Недвижимость"
      };
      var CATEGORY_ITEMS = [
        { label: "Все категории", caption: "", value: "" },
        { label: "Мобильные телефоны", caption: "Телефоны и связь", value: "Электроника" },
        { label: "Аксессуары", caption: "Телефоны и связь", value: "Электроника" },
        { label: "Детские игрушки", caption: "Для детей", value: "Для детей" },
        { label: "Ноутбуки", caption: "Электроника", value: "Электроника" },
        { label: "Антиквариат", caption: "", value: "Товары для дома" },
        { label: "Детские товары", caption: "Для детей", value: "Для детей" }
      ];
      var FILTER_CATEGORY_ITEMS = [
        { label: "Мобильные телефоны", caption: "Телефоны и связь", value: "Электроника" },
        { label: "Аксессуары", caption: "Телефоны и связь", value: "Электроника" },
        { label: "Детские игрушки", caption: "Для детей", value: "Для детей" },
        { label: "Мобильные телефоны", caption: "Телефоны и связь", value: "Электроника" },
        { label: "Антиквариат", caption: "", value: "Товары для дома" },
        { label: "Детские игрушки", caption: "Для детей", value: "Для детей" }
      ];
      var BOTTOMSHEET_CONFIGS = {
        seller: {
          title: "Продавец",
          type: "multi",
          searchable: false,
          options: [
            { label: "Частное лицо", value: "Частное лицо" },
            { label: "Магазин / бизнес", value: "business" },
            { label: "Официальный дилер", value: "Официальный дилер" }
          ]
        },
        condition: {
          title: "Состояние",
          type: "multi",
          searchable: false,
          options: [
            { label: "Новое", value: "Новое" },
            { label: "Б/у", value: "Б/у" },
            { label: "Б/у (есть следы носки)", value: "Б/у (есть следы носки)" },
            { label: "Б/у (есть заметные дефекты)", value: "Б/у (есть заметные дефекты)" },
            { label: "Новое (с биркой, в упаковке)", value: "Новое (с биркой, в упаковке)" }
          ]
        },
        manufacturer: {
          title: "Производитель",
          type: "multi",
          options: MANUFACTURER_OPTIONS
        },
        currency: {
          title: "Валюта",
          type: "multi",
          searchable: false,
          options: [
            { label: "Из объявлений", value: "Из объявлений" },
            { label: "В сумах", value: "UZS" },
            { label: "В у.е.", value: "USD" }
          ]
        },
        price: {
          title: "Цена, у.е.",
          type: "range",
          searchable: false,
          min: 100,
          max: 1000,
          step: 50
        },
        region: {
          title: "Регион",
          type: "multi",
          options: [
            { label: "Ташкент", value: "Ташкент" },
            { label: "Самарканд", value: "Самарканд" },
            { label: "Бухара", value: "Бухара" },
            { label: "Фергана", value: "Фергана" }
          ]
        },
        sort: {
          title: "Сортировка",
          searchable: false,
          type: "single",
          options: [
            { label: "Рекомендованное", value: "recommended" },
            { label: "Сначала дешевле", value: "price-asc" },
            { label: "Сначала дороже", value: "price-desc" },
            { label: "По дате", value: "date" },
          ]
        },
        category: {
          title: "Категория",
          type: "single",
          options: CATEGORY_ITEMS.map(function (item) {
            return { label: item.label, value: item.value, caption: item.caption };
          })
        }
      };
      var resultItems = [];
      var resultsState = createDefaultResultsState();
      var fullFilterState = {
        isOpen: false,
        draft: createFilterDraftFromResults(resultsState),
        initial: createFilterDraftFromResults(resultsState)
      };
      var bottomsheetState = createDefaultBottomsheetState();
      var lastScrollTop = 0;
      var scrollDirection = "up";
      var pendingChipKey = "";

      if (!resultsScreen || !resultsScroller || !titleBackButton || !resultsBackButton || !resultsTitle || !resultsSearchTrigger || !resultsSearchText || !filterRow || !filterScroll || !regionButton || !regionText || !sortButton || !sortText || !feedGrid || !filterSheet || !filterSheetBackdrop || !filterSheetBack || !filterSheetReset || !filterSheetApply || !filterSheetCategoryLabel || !filterSheetRegionLabel || !filterSheetSellerCaption || !filterSheetSellerTabs || !filterSheetConditionTabs || !filterSheetManufacturerValue || !filterSheetSortValue || !filterSheetCurrencyTabs || !filterSheetPriceRange || !filterSheetToggleList || !filterBottomsheet || !filterBottomsheetBackdrop || !filterBottomsheetReset || !filterBottomsheetClose || !filterBottomsheetTitle || !filterBottomsheetSearch || !filterBottomsheetSearchInput || !filterBottomsheetList || !filterBottomsheetApply || !categorySheet || !categorySheetBackdrop || !categorySheetClose || !categorySheetList || !categorySheetAll) {
        return;
      }

      initHomeFeed();
      resultItems = buildResultItemsSeed();
      renderResults();
      renderFullFilterSheet();
      renderCategorySheet();
      renderBottomsheet();

      window.addEventListener("birbir:open-results", function (event) {
        openResults(event && event.detail ? event.detail : {});
      });

      Array.prototype.forEach.call([titleBackButton, resultsBackButton], function (button) {
        button.addEventListener("click", function () {
          closeResults();
          window.dispatchEvent(new CustomEvent("birbir:open-search", {
            detail: {
              query: resultsState.query
            }
          }));
        });
      });

      resultsSearchTrigger.addEventListener("click", function () {
        window.dispatchEvent(new CustomEvent("birbir:open-search", {
          detail: {
            query: resultsState.query
          }
        }));
      });

      resultsScroller.addEventListener("scroll", function () {
        var nextTop = resultsScroller.scrollTop;

        if (nextTop > lastScrollTop + 2) {
          scrollDirection = "down";
        } else if (nextTop < lastScrollTop - 2) {
          scrollDirection = "up";
        }

        lastScrollTop = nextTop;
        applyHeaderMode();
      });

      filterRow.addEventListener("click", function (event) {
        var clearTarget = event.target.closest("[data-filter-clear]");
        var chip = event.target.closest("[data-filter-key]");
        var key;

        if (clearTarget) {
          key = clearTarget.getAttribute("data-filter-clear");
          clearFilterByKey(key);
          pendingChipKey = key;
          renderResults();
          return;
        }

        if (!chip || !filterRow.contains(chip)) {
          return;
        }

        key = chip.getAttribute("data-filter-key");

        if (!key) {
          return;
        }

        if (key === "filters") {
          openFullFilterSheet();
          return;
        }

        if (key === "category") {
          openCategorySheet();
          return;
        }

        if (isToggleChipKey(key)) {
          toggleFilterChip(key);
          pendingChipKey = key;
          renderResults();
          return;
        }

        openBottomsheet(key, "results");
      });

      regionButton.addEventListener("click", function () {
        openBottomsheet("region", "results");
      });

      sortButton.addEventListener("click", function () {
        openBottomsheet("sort", "results");
      });

      if (tooltipClose) {
        tooltipClose.addEventListener("click", dismissTooltip);
      }

      categorySheetBackdrop.addEventListener("click", closeCategorySheet);
      categorySheetClose.addEventListener("click", closeCategorySheet);
      categorySheetAll.addEventListener("click", function () {
        return;
      });
      categorySheetList.addEventListener("click", function (event) {
        var item = event.target.closest("[data-category-value]");

        if (!item || !categorySheetList.contains(item)) {
          return;
        }

        resultsState.activeCategoryValue = item.getAttribute("data-category-value") || "";
        resultsState.activeCategoryLabel = item.getAttribute("data-category-label") || "";
        pendingChipKey = "category";
        closeCategorySheet({ silent: true });
        renderResults();
      });

      filterSheetBackdrop.addEventListener("click", closeFullFilterSheet);
      filterSheetBack.addEventListener("click", closeFullFilterSheet);
      filterSheetReset.addEventListener("click", function () {
        fullFilterState.draft = createFilterDraftFromResults(createDefaultResultsState());
        renderFullFilterSheet();
      });
      filterSheetApply.addEventListener("click", applyFullFilterSheet);

      filterSheet.addEventListener("click", function (event) {
        var button = event.target.closest("[data-filter-sheet-open]");
        var sellerTab = event.target.closest('[data-filter-sheet-tab="seller"]');
        var conditionTab = event.target.closest('[data-filter-sheet-tab="condition"]');
        var currencyTab = event.target.closest('[data-filter-sheet-tab="currency"]');
        var toggleRow = event.target.closest("[data-filter-sheet-toggle]");
        var rangeReset = event.target.closest("[data-filter-range-reset]");

        if (button && filterSheet.contains(button)) {
          openBottomsheet(button.getAttribute("data-filter-sheet-open"), "full");
          return;
        }

        if (rangeReset && filterSheet.contains(rangeReset)) {
          fullFilterState.draft.filters.price = "";
          fullFilterState.draft.filters.priceMin = "";
          fullFilterState.draft.filters.priceMax = "";
          renderFullFilterSheet();
          return;
        }

        if (sellerTab && filterSheet.contains(sellerTab)) {
          if ((sellerTab.getAttribute("data-filter-value") || "") === "") {
            fullFilterState.draft.filters.seller = [];
          } else {
            toggleDraftArrayValue("seller", sellerTab.getAttribute("data-filter-value") || "");
          }
          renderFullFilterSheet();
          return;
        }

        if (conditionTab && filterSheet.contains(conditionTab)) {
          if ((conditionTab.getAttribute("data-filter-value") || "") === "") {
            fullFilterState.draft.filters.condition = [];
          } else {
            toggleDraftArrayValue("condition", conditionTab.getAttribute("data-filter-value") || "");
          }
          renderFullFilterSheet();
          return;
        }

        if (currencyTab && filterSheet.contains(currencyTab)) {
          toggleDraftArrayValue("currency", currencyTab.getAttribute("data-filter-value") || "");
          renderFullFilterSheet();
          return;
        }

        if (toggleRow && filterSheet.contains(toggleRow)) {
          toggleDraftFacet(toggleRow.getAttribute("data-filter-sheet-toggle"));
          renderFullFilterSheet();
        }
      });

      filterSheetPriceMin.addEventListener("input", function () {
        fullFilterState.draft.filters.priceMin = sanitizeRangeValue(filterSheetPriceMin.value, 100, 1000);
        clampDraftRangeFromInputs();
      });

      filterSheetPriceMax.addEventListener("input", function () {
        fullFilterState.draft.filters.priceMax = sanitizeRangeValue(filterSheetPriceMax.value, 100, 1000);
        clampDraftRangeFromInputs();
      });
      filterSheet.addEventListener("input", function (event) {
        var target = event.target;

        if (target.matches("[data-range-input='min'][data-range-prefix='sheet-price']")) {
          fullFilterState.draft.filters.priceMin = sanitizeRangeValue(target.value, 100, 1000);
          clampDraftRangeFromInputs();
          return;
        }

        if (target.matches("[data-range-input='max'][data-range-prefix='sheet-price']")) {
          fullFilterState.draft.filters.priceMax = sanitizeRangeValue(target.value, 100, 1000);
          clampDraftRangeFromInputs();
          return;
        }

        if (target.matches("[data-range-slider='min'][data-range-prefix='sheet-price']")) {
          fullFilterState.draft.filters.priceMin = sanitizeRangeValue(target.value, 100, 1000);
          clampDraftRangeFromInputs();
          return;
        }

        if (target.matches("[data-range-slider='max'][data-range-prefix='sheet-price']")) {
          fullFilterState.draft.filters.priceMax = sanitizeRangeValue(target.value, 100, 1000);
          clampDraftRangeFromInputs();
        }
      });

      filterBottomsheetBackdrop.addEventListener("click", closeBottomsheet);
      filterBottomsheetClose.addEventListener("click", closeBottomsheet);
      filterBottomsheetReset.addEventListener("click", resetBottomsheetDraft);
      filterBottomsheetSearchInput.addEventListener("input", function () {
        bottomsheetState.searchQuery = filterBottomsheetSearchInput.value;
        renderBottomsheetList();
      });
      filterBottomsheetList.addEventListener("input", function (event) {
        var target = event.target;
        var value;

        if (target.matches("[data-range-input='min']")) {
          bottomsheetState.rangeMin = sanitizeRangeValue(target.value, bottomsheetState.rangeMinBound, bottomsheetState.rangeMaxBound);
          clampBottomsheetRange("min");
          renderBottomsheetList();
          return;
        }

        if (target.matches("[data-range-input='max']")) {
          bottomsheetState.rangeMax = sanitizeRangeValue(target.value, bottomsheetState.rangeMinBound, bottomsheetState.rangeMaxBound);
          clampBottomsheetRange("max");
          renderBottomsheetList();
          return;
        }

        if (target.matches("[data-range-slider='min']")) {
          value = target.value;
          bottomsheetState.rangeMin = sanitizeRangeValue(value, bottomsheetState.rangeMinBound, bottomsheetState.rangeMaxBound);
          bottomsheetState.activeThumb = "min";
          clampBottomsheetRange("min");
          renderBottomsheetList();
          return;
        }

        if (target.matches("[data-range-slider='max']")) {
          value = target.value;
          bottomsheetState.rangeMax = sanitizeRangeValue(value, bottomsheetState.rangeMinBound, bottomsheetState.rangeMaxBound);
          bottomsheetState.activeThumb = "max";
          clampBottomsheetRange("max");
          renderBottomsheetList();
        }
      });
      filterBottomsheetList.addEventListener("click", function (event) {
        var option = event.target.closest("[data-bottomsheet-option]");
        var value;

        if (!option || !filterBottomsheetList.contains(option)) {
          return;
        }

        value = option.getAttribute("data-bottomsheet-option") || "";

        if (bottomsheetState.type === "multi") {
          if (bottomsheetState.draftValues.indexOf(value) !== -1) {
            bottomsheetState.draftValues = bottomsheetState.draftValues.filter(function (item) {
              return item !== value;
            });
          } else {
            bottomsheetState.draftValues = bottomsheetState.draftValues.concat(value);
          }
        } else if (bottomsheetState.type === "single") {
          bottomsheetState.draftValue = value;
        }

        renderBottomsheetList();
      });
      filterBottomsheetApply.addEventListener("click", applyBottomsheet);

      function createDefaultResultsState() {
        return {
          isOpen: false,
          query: "",
          activeCategoryLabel: "",
          activeCategoryValue: "",
          filters: {
            seller: [],
            condition: [],
            manufacturer: [],
            gift: [],
            urgentSale: [],
            installment: [],
            currency: [],
            price: "",
            priceMin: "",
            priceMax: "",
            delivery: []
          },
          region: [],
          sort: "recommended",
          visibleItems: []
        };
      }

      function createDefaultBottomsheetState() {
        return {
          isOpen: false,
          key: "",
          source: "",
          type: "single",
          searchable: true,
          searchQuery: "",
          draftValue: "",
          draftValues: [],
          orderedOptions: [],
          range: null
        };
      }

      function createFilterDraftFromResults(state) {
        var priceConfig = BOTTOMSHEET_CONFIGS.price;
        return {
          activeCategoryLabel: state.activeCategoryLabel || "",
          activeCategoryValue: state.activeCategoryValue || "",
          region: (state.region || []).slice(),
          sort: state.sort || "recommended",
          filters: {
            seller: (state.filters.seller || []).slice(),
            condition: (state.filters.condition || []).slice(),
            manufacturer: (state.filters.manufacturer || []).slice(),
            gift: (state.filters.gift || []).slice(),
            urgentSale: (state.filters.urgentSale || []).slice(),
            installment: (state.filters.installment || []).slice(),
            currency: (state.filters.currency || []).slice(),
            price: state.filters.price || "",
            priceMin: state.filters.priceMin || "",
            priceMax: state.filters.priceMax || "",
            delivery: (state.filters.delivery || []).slice()
          },
          priceRange: createRangeUiState(state.filters.priceMin, state.filters.priceMax, priceConfig)
        };
      }

      function createRangeUiState(minValue, maxValue, config) {
        var defaultMin = Number(config.min);
        var defaultMax = Number(config.max);
        var step = Number(config.step || 50);
        var min = minValue ? snapRangeValue(minValue, defaultMin, defaultMax, step) : defaultMin;
        var max = maxValue ? snapRangeValue(maxValue, defaultMin, defaultMax, step) : defaultMax;

        return {
          min: String(min),
          max: String(max),
          inputMin: String(min),
          inputMax: String(max),
          defaultMin: String(defaultMin),
          defaultMax: String(defaultMax),
          initialMin: String(min),
          initialMax: String(max),
          minBound: defaultMin,
          maxBound: defaultMax,
          step: step,
          activeThumb: "",
          lastTouchedThumb: "max"
        };
      }

      function cloneRangeUiState(state) {
        return state ? {
          min: state.min,
          max: state.max,
          inputMin: state.inputMin,
          inputMax: state.inputMax,
          defaultMin: state.defaultMin,
          defaultMax: state.defaultMax,
          initialMin: state.initialMin,
          initialMax: state.initialMax,
          minBound: state.minBound,
          maxBound: state.maxBound,
          step: state.step,
          activeThumb: state.activeThumb || "",
          lastTouchedThumb: state.lastTouchedThumb || "max"
        } : null;
      }

      function snapRangeValue(value, minBound, maxBound, step) {
        var numeric = Number(String(value || "").replace(/[^\d]/g, ""));

        if (!numeric && numeric !== 0) {
          return minBound;
        }

        numeric = Math.max(minBound, Math.min(maxBound, numeric));
        return Math.round((numeric - minBound) / step) * step + minBound;
      }

      function getRangeStateFlags(rangeState) {
        var minValue = Number(rangeState.min || rangeState.defaultMin);
        var maxValue = Number(rangeState.max || rangeState.defaultMax);
        var step = Number(rangeState.step || 50);

        return {
          isDefault: minValue === Number(rangeState.defaultMin) && maxValue === Number(rangeState.defaultMax),
          isDirty: minValue !== Number(rangeState.initialMin) || maxValue !== Number(rangeState.initialMax),
          isError: minValue >= maxValue,
          isWarning: maxValue - minValue === step
        };
      }

      function getRangeApplyPayload(rangeState) {
        var minValue = Number(rangeState.min || rangeState.defaultMin);
        var maxValue = Number(rangeState.max || rangeState.defaultMax);

        if (minValue === Number(rangeState.defaultMin) && maxValue === Number(rangeState.defaultMax)) {
          return { price: "", priceMin: "", priceMax: "" };
        }

        return {
          price: "",
          priceMin: String(minValue),
          priceMax: String(maxValue)
        };
      }

      function createDefaultDraftSnapshot() {
        return createFilterDraftFromResults(createDefaultResultsState());
      }

      function getFilterComparableSnapshot(state) {
        return JSON.stringify({
          activeCategoryValue: state.activeCategoryValue || "",
          region: (state.region || []).slice(),
          sort: state.sort || "recommended",
          filters: {
            seller: (state.filters.seller || []).slice(),
            condition: (state.filters.condition || []).slice(),
            manufacturer: (state.filters.manufacturer || []).slice(),
            gift: (state.filters.gift || []).slice(),
            urgentSale: (state.filters.urgentSale || []).slice(),
            installment: (state.filters.installment || []).slice(),
            currency: (state.filters.currency || []).slice(),
            priceMin: state.filters.priceMin || "",
            priceMax: state.filters.priceMax || "",
            delivery: (state.filters.delivery || []).slice()
          }
        });
      }

      function isFullFilterDraftDefault() {
        return getFilterComparableSnapshot(fullFilterState.draft) === getFilterComparableSnapshot(createDefaultDraftSnapshot());
      }

      function isFullFilterDraftDirty() {
        return getFilterComparableSnapshot(fullFilterState.draft) !== getFilterComparableSnapshot(fullFilterState.initial);
      }

      function extractSeedCardData(card) {
        var image = card.querySelector(".card__image");
        var title = card.querySelector(".card__title");
        var price = card.querySelector(".card__price");
        var oldPrice = card.querySelector(".card__old s");
        var discount = card.querySelector(".card__discount");
        var badges = card.querySelector(".card__badges");
        var installment = card.querySelector(".installment");
        var likeButton = card.querySelector(".like-button");
        var metaRows = card.querySelectorAll(".card__meta-row");

        return {
          imageSrc: image && image.getAttribute("src") ? image.getAttribute("src") : "",
          imageAlt: image && image.getAttribute("alt") ? image.getAttribute("alt") : "",
          title: normalizeWhitespace(title ? title.textContent : ""),
          price: normalizeWhitespace(price ? price.textContent : ""),
          oldPrice: normalizeWhitespace(oldPrice ? oldPrice.textContent : ""),
          discount: normalizeWhitespace(discount ? discount.textContent : ""),
          badgesHtml: badges && badges.innerHTML ? badges.innerHTML : "",
          installmentHtml: installment ? installment.outerHTML : "",
          distance: normalizeWhitespace(metaRows[0] ? metaRows[0].textContent : "") || "10 км",
          postedAt: normalizeWhitespace(metaRows[1] ? metaRows[1].textContent : "") || "Сегодня, 14:15",
          liked: likeButton ? likeButton.getAttribute("aria-pressed") === "true" : false
        };
      }

      function renderLikeButtonMarkup(liked) {
        return [
          '<button class="like-button',
          liked ? " like-button--liked" : "",
          '" type="button" aria-label="',
          liked ? "Удалить из избранного" : "Добавить в избранное",
          '" aria-pressed="',
          liked ? "true" : "false",
          '">',
          '<svg class="icon-svg icon--heart-transparent" viewBox="0 0 24 24" aria-hidden="true"><use href="#icon-heart-transparent"></use></svg>',
          '<svg class="icon-svg like-button__liked-icon icon--heart-transparent-fill" viewBox="0 0 24 24" aria-hidden="true"><use href="#icon-heart-transparent-fill"></use></svg>',
          "</button>"
        ].join("");
      }

      function renderHomeBadge(item) {
        var iconType = item.type || "business";
        var symbolId = "icon-business-fill";
        var label = item.label || "";

        if (iconType === "premium") {
          symbolId = "icon-crown-fill";
          label = label || "Premium";
        } else if (iconType === "delivery") {
          symbolId = "icon-track-fill";
          label = label || "Доставка";
        } else if (iconType === "urgent-sale") {
          symbolId = "icon-lightning-fill";
          label = label || "Срочно. Торг";
        } else if (iconType === "agency") {
          symbolId = "icon-agency-fill";
          label = label || "Агентство";
        } else {
          label = label || "Магазин";
        }

        return [
          '<span class="badge badge--old badge--',
          escapeHtml(iconType),
          item.iconOnly ? ' badge--icon-only' : "",
          '"',
          label ? ' aria-label="' + escapeHtml(label) + '"' : "",
          '><span class="badge__icon badge__icon--12"><span class="icon-box icon-box--12 icon-color--on-dark" aria-hidden="true"><svg class="icon-svg" viewBox="0 0 24 24"><use href="#',
          symbolId,
          '"></use></svg></span></span>',
          item.iconOnly ? "" : '<span class="badge__label">' + escapeHtml(label) + "</span>",
          "</span>"
        ].join("");
      }

      function renderHomeBadgesMarkup(items) {
        if (!items || !items.length) {
          return "";
        }

        return [
          '<div class="card__badges">',
          items.map(renderHomeBadge).join(""),
          "</div>"
        ].join("");
      }

      function renderHomeCardMarkup(item) {
        return [
          '<article class="card" data-home-card-id="',
          escapeHtml(item.id),
          '">',
          '<div class="card__media">',
          '<img class="card__image" src="',
          escapeHtml(item.imageSrc),
          '" alt="',
          escapeHtml(item.imageAlt || item.title),
          '">',
          renderHomeBadgesMarkup(item.badges),
          item.photoDots ? '<div class="photo-dots" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span></div>' : "",
          item.installmentLabel ? '<span class="installment">' + escapeHtml(item.installmentLabel) + "</span>" : "",
          renderLikeButtonMarkup(Boolean(item.liked)),
          "</div>",
          '<div class="card__body">',
          '<div class="card__price-block">',
          '<p class="card__price">',
          escapeHtml(item.price),
          "</p>",
          item.oldPrice || item.discount ? [
            '<div class="card__old">',
            item.oldPrice ? ["<s>", escapeHtml(item.oldPrice), "</s>"].join("") : "",
            item.discount ? ['<span class="card__discount">', escapeHtml(item.discount), "</span>"].join("") : "",
            "</div>"
          ].join("") : "",
          "</div>",
          '<p class="card__title">',
          escapeHtml(item.title),
          "</p>",
          '<div class="card__meta">',
          '<div class="card__meta-row">',
          '<span class="icon-box icon-box--12 icon-color--secondary card__meta-icon"><svg class="icon-svg icon--navigation-fill" viewBox="0 0 24 24" aria-hidden="true"><use href="#icon-navigation-fill"></use></svg></span>',
          '<span>',
          escapeHtml(item.distance),
          "</span>",
          "</div>",
          '<div class="card__meta-row"><span>',
          escapeHtml(item.postedAt),
          "</span></div>",
          "</div>",
          "</div>",
          "</article>"
        ].join("");
      }

      function initHomeFeed() {
        var cardsRoot = document.querySelector(".cards");

        if (!cardsRoot) {
          return;
        }

        cardsRoot.innerHTML = HOME_FEED_BLUEPRINTS.map(function (item) {
          return renderHomeCardMarkup(item);
        }).join("");
      }

      function renderResultsCard(item) {
        return [
          '<article class="results-card" data-result-id="',
          escapeHtml(item.id),
          '">',
          '<div class="results-card__media">',
          '<img class="results-card__image" src="',
          escapeHtml(item.imageSrc),
          '" alt="',
          escapeHtml(item.imageAlt || item.title),
          '">',
          item.badgesHtml ? ['<div class="results-card__badges">', item.badgesHtml, "</div>"].join("") : "",
          renderLikeButtonMarkup(item.liked),
          item.installmentHtml || "",
          "</div>",
          '<div class="results-card__body">',
          '<div class="results-card__price-name">',
          '<div class="results-card__price-block">',
          '<p class="results-card__price">',
          escapeHtml(item.price),
          "</p>",
          item.oldPrice || item.discount ? [
            '<div class="results-card__old">',
            item.oldPrice ? ["<s>", escapeHtml(item.oldPrice), "</s>"].join("") : "",
            item.discount ? ['<span class="results-card__discount">', escapeHtml(item.discount), "</span>"].join("") : "",
            "</div>"
          ].join("") : "",
          "</div>",
          '<p class="results-card__title">',
          escapeHtml(item.title),
          "</p>",
          "</div>",
          '<div class="results-card__meta">',
          '<div class="results-card__meta-row">',
          '<span class="icon-box icon-box--12 icon-color--secondary" aria-hidden="true">',
          '<svg class="icon-svg icon--navigation-fill" viewBox="0 0 24 24"><use href="#icon-navigation-fill"></use></svg>',
          "</span>",
          '<span>',
          escapeHtml(item.distance),
          "</span>",
          "</div>",
          '<div class="results-card__meta-row"><span>',
          escapeHtml(item.postedAt),
          "</span></div>",
          "</div>",
          "</div>",
          "</article>"
        ].join("");
      }

      function buildResultItemsSeed() {
        return SEARCH_FEED_BLUEPRINTS.map(function (item, index) {
          return {
            id: item.id || ("result-card-" + String(index + 1)),
            imageSrc: item.imageSrc,
            imageAlt: item.imageAlt,
            title: item.title,
            price: item.price,
            oldPrice: item.oldPrice || "",
            discount: item.discount || "",
            badgesHtml: renderHomeBadgesMarkup(item.badges),
            installmentHtml: item.installmentLabel ? '<span class="installment">' + escapeHtml(item.installmentLabel) + "</span>" : "",
            distance: item.distance,
            postedAt: item.postedAt,
            liked: Boolean(item.liked),
            seller: item.seller,
            condition: item.condition,
            category: item.category,
            currency: item.currency,
            priceValue: item.priceValue,
            urgentSale: item.urgentSale,
            gift: item.gift,
            installment: item.installment,
            delivery: item.delivery,
            region: item.region,
            manufacturer: item.manufacturer,
            postedRank: 100 - index,
            tokens: tokenize([item.title, item.category, item.seller, item.condition, item.region, (item.manufacturer || []).join(" "), item.searchHints].join(" "))
          };
        });
      }

      function openResults(detail) {
        var nextQuery = normalizeWhitespace(detail.query || "");
        var nextCategoryLabel = normalizeWhitespace(detail.categoryLabel || detail.category || "");
        var nextCategoryValue = normalizeWhitespace(detail.categoryValue || "");

        resultsState = createDefaultResultsState();
        resultsState.isOpen = true;
        resultsState.query = nextQuery;
        resultsState.activeCategoryLabel = nextCategoryLabel;
        resultsState.activeCategoryValue = nextCategoryLabel ? (nextCategoryValue || resolveCategoryValue(nextCategoryLabel)) : "";
        resultsScreen.classList.add("is-open");
        resultsScreen.setAttribute("aria-hidden", "false");
        resultsScroller.scrollTop = 0;
        lastScrollTop = 0;
        scrollDirection = "up";
        pendingChipKey = nextCategoryLabel ? "category" : "";

        if (favoriteToast) {
          favoriteToast.classList.remove("is-visible");
        }

        closeCategorySheet({ silent: true });
        closeFullFilterSheet({ silent: true });
        closeBottomsheet({ silent: true });
        renderResults();
      }

      function closeResults() {
        resultsState.isOpen = false;
        resultsScreen.classList.remove("is-open");
        resultsScreen.setAttribute("aria-hidden", "true");
        closeFullFilterSheet({ silent: true });
        closeBottomsheet({ silent: true });
        closeCategorySheet({ silent: true });
      }

      function renderResults() {
        var visibleItems = getVisibleItems();

        resultsState.visibleItems = visibleItems;
        resultsSearchText.textContent = resultsState.query || "Поиск объявлений";
        resultsSearchTrigger.classList.toggle("results-search-trigger--filled", Boolean(resultsState.query));
        resultsTitle.textContent = getHeaderTitle();
        regionText.textContent = getRegionSummaryLabel(resultsState.region);
        sortText.textContent = getSortLabel(resultsState.sort);

        applyHeaderMode();
        renderFilterRow();
        renderFeed(visibleItems);
        renderFullFilterSheet();

        if (pendingChipKey) {
          scrollChipIntoView(pendingChipKey);
          pendingChipKey = "";
        }

        updateTooltipVisibility();
      }

      function applyHeaderMode() {
        var mode = getHeaderMode();
        var classNames = ["search-results--base", "search-results--search", "search-results--sticky-down", "search-results--sticky-up"];

        Array.prototype.forEach.call(classNames, function (className) {
          resultsScreen.classList.remove(className);
        });

        resultsScreen.classList.add("search-results--" + mode);
        resultsScreen.classList.toggle("has-shadow", mode === "sticky-down" || mode === "sticky-up");
      }

      function getHeaderMode() {
        if (resultsScroller.scrollTop <= 20) {
          return hasSearchLayout() ? "search" : "base";
        }

        return scrollDirection === "down" ? "sticky-down" : "sticky-up";
      }

      function hasSearchLayout() {
        return Boolean(resultsState.query || resultsState.activeCategoryLabel || getNonCategoryActiveCount() > 0);
      }

      function getHeaderTitle() {
        if (resultsState.activeCategoryLabel) {
          return resultsState.activeCategoryLabel;
        }

        return "Онлайн магазин";
      }

      function renderFeed(visibleItems) {
        var items = visibleItems.length ? visibleItems.slice(0, 30) : resultItems.slice(0, 30);
        var markup = [];
        var usedIds = {};

        items.forEach(function (item) {
          usedIds[item.id] = true;
        });

        if (items.length < 30) {
          resultItems.some(function (item) {
            if (!usedIds[item.id]) {
              items.push(item);
              usedIds[item.id] = true;
            }
            return items.length >= 30;
          });
        }

        items.forEach(function (item, index) {
          markup.push(renderResultsCard(item));

          if (index === 3 && items.length > 4) {
            markup.push(renderResultsBanner());
          }
        });

        feedGrid.innerHTML = markup.join("");
      }

      function renderResultsBanner() {
        return [
          '<article class="results-banner" aria-label="Рекламный баннер">',
          '<div class="results-banner__image-wrap"><img class="results-banner__image" src="',
          BANNER_IMAGE_SRC,
          '" alt=""></div>',
          '<p class="results-banner__label">Реклама</p>',
          '<p class="results-banner__title">Какой-то текст в две строки</p>',
          '<span class="results-banner__logo">Лого</span>',
          "</article>"
        ].join("");
      }

      function renderFilterRow() {
        var mode = getHeaderMode();
        var compact = mode !== "base";
        var keys = compact || hasSearchLayout() ? getCompactFilterKeys() : BASELINE_FILTER_KEYS.slice();

        filterRow.innerHTML = keys.map(function (key) {
          return renderFilterChip(key, compact || key === "filters");
        }).join("");
      }

      function getCompactFilterKeys() {
        var movableKeys = FILTER_ORDER.slice(2);
        var selectedKeys = movableKeys.filter(function (key) {
          return isChipSelected(key);
        });
        var remainingKeys = movableKeys.filter(function (key) {
          return !isChipSelected(key);
        });

        return ["filters", "category"].concat(selectedKeys, remainingKeys);
      }

      function renderFilterChip(key, compact) {
        var isSelected = key === "filters" ? false : isChipSelected(key);
        var label = getChipLabel(key);
        var classes = [key === "filters" ? "results-filter-chip--visual" : "results-filter-chip"];
        var parts = [];
        var isCategory = key === "category";
        var isToggle = isToggleChipKey(key);
        var isMulti = key === "condition";

        classes.push(compact ? "results-filter-chip--compact" : "results-filter-chip--base");

        if (isSelected) {
          classes.push("results-filter-chip--selected");
        }

        if (key === "filters") {
          return [
            '<button class="results-filter-chip results-filter-chip--base" type="button" data-filter-key="filters">',
            '<span class="results-filter-chip__icon-box icon-color--primary" aria-hidden="true"><svg class="icon-svg icon--filter-controls" viewBox="0 0 24 24"><use href="#icon-filter-controls"></use></svg></span>',
            '<span class="results-filter-chip__label">Фильтры</span>',
            getNonCategoryActiveCount() >= 2 ? '<span class="results-filter-chip__dot" aria-hidden="true"></span>' : "",
            "</button>"
          ].join("");
        }

        parts.push('<button class="');
        parts.push(classes.join(" "));
        parts.push('" type="button" data-filter-key="');
        parts.push(escapeHtml(key));
        parts.push('">');

        if (isCategory) {
          parts.push('<span class="results-filter-chip__icon-box ');
          parts.push(isSelected ? "icon-color--on-dark" : "icon-color--primary");
          parts.push('" aria-hidden="true">');
          parts.push('<svg class="icon-svg icon--search-list" viewBox="0 0 24 24" aria-hidden="true"><use href="#icon-search-list"></use></svg>');
          parts.push("</span>");
        }

        parts.push('<span class="results-filter-chip__label">');
        parts.push(escapeHtml(label));
        parts.push("</span>");

        if (isSelected && isMulti && resultsState.filters.condition.length > 1) {
          parts.push('<span class="results-filter-chip__counter">');
          parts.push(String(resultsState.filters.condition.length));
          parts.push("</span>");
        }

        if (!isSelected && !isCategory && !isToggle) {
          parts.push('<span class="results-filter-chip__chevron-box icon-color--primary" aria-hidden="true"><svg class="icon-svg icon--chevron-down" viewBox="0 0 24 24"><use href="#icon-chevron-down"></use></svg></span>');
        }

        if (isSelected && !isToggle) {
          parts.push('<span class="results-filter-chip__close" data-filter-clear="');
          parts.push(escapeHtml(key));
          parts.push('"><span class="results-filter-chip__remove-box icon-color--on-dark" aria-hidden="true"><svg class="icon-svg icon--close-circle-fill" viewBox="0 0 24 24"><use href="#icon-close-circle-fill"></use></svg></span></span>');
        }

        parts.push("</button>");
        return parts.join("");
      }

      function renderFullFilterSheet() {
        var sellerTabs = [
          { label: "Все", value: "" },
          { label: "Частный", value: "Частное лицо" },
          { label: "Магазин / Бизнес", value: "business" }
        ];
        var conditionTabs = [
          { label: "Все", value: "" },
          { label: "Б/у", value: "Б/у" },
          { label: "Б/у (есть следы носки)", value: "Б/у (есть следы носки)" },
          { label: "Б/у (есть заметные дефекты)", value: "Б/у (есть заметные дефекты)" },
          { label: "Новое (с биркой, в упаковке)", value: "Новое (с биркой, в упаковке)" }
        ];
        var currencyTabs = [
          { label: "Из объявлений", value: "Из объявлений" },
          { label: "В сумах", value: "UZS" },
          { label: "В у.е.", value: "USD" }
        ];

        filterSheet.classList.toggle("is-open", fullFilterState.isOpen);
        filterSheet.setAttribute("aria-hidden", fullFilterState.isOpen ? "false" : "true");
        filterSheetCategoryLabel.textContent = fullFilterState.draft.activeCategoryLabel || "Все категории";
        filterSheetRegionLabel.textContent = getRegionSummaryLabel(fullFilterState.draft.region);
        filterSheetSellerCaption.textContent = getSellerSummaryLabel(fullFilterState.draft.filters.seller);
        filterSheetManufacturerValue.textContent = getManufacturerSummaryLabel(fullFilterState.draft.filters.manufacturer);
        filterSheetSortValue.textContent = getSortLabel(fullFilterState.draft.sort);
        filterSheetSellerTabs.innerHTML = sellerTabs.map(function (tab) {
          return renderSheetTab(tab.label, tab.value, tab.value === "" ? !fullFilterState.draft.filters.seller.length : fullFilterState.draft.filters.seller.indexOf(tab.value) !== -1, "seller");
        }).join("");
        filterSheetConditionTabs.innerHTML = conditionTabs.map(function (tab) {
          return renderSheetTab(tab.label, tab.value, tab.value === "" ? !fullFilterState.draft.filters.condition.length : fullFilterState.draft.filters.condition.indexOf(tab.value) !== -1, "condition");
        }).join("");
        filterSheetCurrencyTabs.innerHTML = currencyTabs.map(function (tab) {
          return renderSheetTab(tab.label, tab.value, fullFilterState.draft.filters.currency.indexOf(tab.value) !== -1, "currency");
        }).join("");
        filterSheetPriceMin.value = fullFilterState.draft.filters.priceMin;
        filterSheetPriceMax.value = fullFilterState.draft.filters.priceMax;
        filterSheetPriceRange.innerHTML = renderRangeBlockMarkup(
          "sheet-price",
          fullFilterState.draft.filters.priceMin || "100",
          fullFilterState.draft.filters.priceMax || "1000",
          100,
          1000,
          ""
        );
        filterSheetToggleList.innerHTML = TOGGLE_FILTER_KEYS.map(function (key) {
          return renderSheetToggleRow(key, isDraftFacetSelected(key));
        }).join("");
      }

      function renderSheetTab(label, value, isSelected, group) {
        return [
          '<button class="filter-sheet__tab',
          isSelected ? " is-selected" : "",
          '" type="button" data-filter-sheet-tab="',
          escapeHtml(group),
          '" data-filter-value="',
          escapeHtml(value),
          '">',
          escapeHtml(label),
          "</button>"
        ].join("");
      }

      function renderSheetToggleRow(key, isSelected) {
        return [
          '<button class="filter-sheet__list-row',
          isSelected ? " is-selected" : "",
          '" type="button" data-filter-sheet-toggle="',
          escapeHtml(key),
          '">',
          '<span class="filter-sheet__list-row-label">',
          escapeHtml(CHIP_LABELS[key]),
          "</span>",
          '<span class="filter-sheet__list-row-control" aria-hidden="true"></span>',
          "</button>"
        ].join("");
      }

      function renderRangeBlockMarkup(prefix, minValue, maxValue, minBound, maxBound, activeThumb) {
        var min = Number(minValue || minBound);
        var max = Number(maxValue || maxBound);
        var startPercent = ((min - minBound) / (maxBound - minBound)) * 100;
        var endPercent = ((max - minBound) / (maxBound - minBound)) * 100;

        return [
          '<div class="filter-range__inputs">',
          '<label class="filter-sheet__price-field"><input class="filter-sheet__price-input" type="text" inputmode="numeric" value="',
          escapeHtml(String(min)),
          '" data-range-input="min" data-range-prefix="',
          escapeHtml(prefix),
          '" placeholder="От"></label>',
          '<label class="filter-sheet__price-field"><input class="filter-sheet__price-input" type="text" inputmode="numeric" value="',
          escapeHtml(String(max)),
          '" data-range-input="max" data-range-prefix="',
          escapeHtml(prefix),
          '" placeholder="До"></label>',
          '</div>',
          '<div class="filter-range__slider">',
          '<div class="filter-range__track">',
          '<div class="filter-range__fill" style="left:',
          String(startPercent),
          '%;width:',
          String(Math.max(0, endPercent - startPercent)),
          '%;"></div>',
          activeThumb === "min" ? '<span class="filter-range__bubble" style="left:' + String(startPercent) + '%;">' + escapeHtml(String(min)) + "</span>" : "",
          '<span class="filter-range__thumb" style="left:',
          String(startPercent),
          '%;"></span>',
          activeThumb === "max" ? '<span class="filter-range__bubble" style="left:' + String(endPercent) + '%;">' + escapeHtml(String(max)) + "</span>" : "",
          '<span class="filter-range__thumb" style="left:',
          String(endPercent),
          '%;"></span>',
          '<input class="filter-range__native" type="range" min="',
          String(minBound),
          '" max="',
          String(maxBound),
          '" step="10" value="',
          escapeHtml(String(min)),
          '" data-range-slider="min" data-range-prefix="',
          escapeHtml(prefix),
          '">',
          '<input class="filter-range__native" type="range" min="',
          String(minBound),
          '" max="',
          String(maxBound),
          '" step="10" value="',
          escapeHtml(String(max)),
          '" data-range-slider="max" data-range-prefix="',
          escapeHtml(prefix),
          '">',
          '</div>',
          '<div class="filter-range__labels"><span>',
          escapeHtml(String(minBound)),
          '</span><span>',
          escapeHtml(String(maxBound)),
          "</span></div>",
          "</div>"
        ].join("");
      }

      function renderBottomsheet() {
        filterBottomsheet.classList.toggle("is-open", bottomsheetState.isOpen);
        filterBottomsheet.setAttribute("aria-hidden", bottomsheetState.isOpen ? "false" : "true");
        filterBottomsheetTitle.textContent = bottomsheetState.title || "Выбор";
        filterBottomsheetSearch.hidden = bottomsheetState.searchable === false;
        filterBottomsheetSearchInput.value = bottomsheetState.searchQuery;
        renderBottomsheetList();
      }

      function renderBottomsheetList() {
        if (bottomsheetState.type === "range") {
          filterBottomsheetList.innerHTML = renderRangeBlockMarkup(
            "bottomsheet-price",
            bottomsheetState.rangeMin || String(bottomsheetState.rangeMinBound),
            bottomsheetState.rangeMax || String(bottomsheetState.rangeMaxBound),
            bottomsheetState.rangeMinBound,
            bottomsheetState.rangeMaxBound,
            bottomsheetState.activeThumb === "min"
          );
          return;
        }

        var normalizedSearch = normalizeValue(bottomsheetState.searchQuery);
        var orderedOptions = Array.isArray(bottomsheetState.orderedOptions) ? bottomsheetState.orderedOptions : [];
        var options = orderedOptions.filter(function (option) {
          return !normalizedSearch || normalizeValue(option.label).indexOf(normalizedSearch) !== -1;
        });

        if (!bottomsheetState.isOpen) {
          filterBottomsheetList.innerHTML = "";
          return;
        }

        if (!options.length) {
          filterBottomsheetList.innerHTML = '<div class="filter-bottomsheet__option"><span class="filter-bottomsheet__option-label">Ничего не найдено</span></div>';
          return;
        }

        filterBottomsheetList.innerHTML = options.map(function (option) {
          var isSelected = bottomsheetState.type === "multi"
            ? bottomsheetState.draftValues.indexOf(option.value) !== -1
            : bottomsheetState.draftValue === option.value;

          return [
            '<button class="filter-bottomsheet__option',
            isSelected ? " is-selected" : "",
            '" type="button" data-bottomsheet-option="',
            escapeHtml(option.value),
            '">',
            '<span class="filter-bottomsheet__option-label">',
            escapeHtml(option.label),
            "</span>",
            renderBottomsheetControl(bottomsheetState.type),
            "</button>"
          ].join("");
        }).join("");
      }

      function renderBottomsheetControl(type) {
        if (type === "multi") {
          return '<span class="filter-bottomsheet__control filter-bottomsheet__control--checkbox" aria-hidden="true"><span class="filter-bottomsheet__control-face"></span></span>';
        }

        return [
          '<span class="filter-bottomsheet__control filter-bottomsheet__control--radio" aria-hidden="true">',
          '<span class="filter-bottomsheet__control-face"></span>',
          '<img class="filter-bottomsheet__radio-image" src="',
          RADIO_COMPONENT_CHECKED_SRC,
          '" alt="">',
          "</span>"
        ].join("");
      }

      function renderCategorySheet() {
        categorySheetList.innerHTML = FILTER_CATEGORY_ITEMS.map(function (item) {
          return [
            '<button class="category-sheet__item" type="button" data-category-value="',
            escapeHtml(item.value),
            '" data-category-label="',
            escapeHtml(item.label),
            '">',
            '<span class="category-sheet__item-left">',
            '<span class="icon-box icon-box--16 icon-color--secondary category-sheet__item-icon">',
            '<svg class="icon-svg icon--search-list" viewBox="0 0 24 24" aria-hidden="true"><use href="#icon-search-list"></use></svg>',
            "</span>",
            "</span>",
            '<span class="category-sheet__item-content">',
            '<span class="category-sheet__item-title">',
            escapeHtml(item.label),
            "</span>",
            item.caption ? ['<span class="category-sheet__item-caption">', escapeHtml(item.caption), "</span>"].join("") : "",
            "</span>",
            '<span class="category-sheet__item-right"><span class="icon-box icon-box--20 icon-color--secondary"><svg class="icon-svg icon--chevron-right-line" viewBox="0 0 24 24"><use href="#icon-chevron-right-line"></use></svg></span></span>',
            "</button>"
          ].join("");
        }).join("");
      }

      function openFullFilterSheet() {
        fullFilterState.isOpen = true;
        fullFilterState.draft = createFilterDraftFromResults(resultsState);
        closeBottomsheet({ silent: true });
        closeCategorySheet({ silent: true });
        renderFullFilterSheet();
        updateTooltipVisibility();
      }

      function closeFullFilterSheet(options) {
        options = options || {};
        fullFilterState.isOpen = false;
        if (!options.silent) {
          renderFullFilterSheet();
        } else {
          filterSheet.classList.remove("is-open");
          filterSheet.setAttribute("aria-hidden", "true");
        }
        updateTooltipVisibility();
      }

      function applyFullFilterSheet() {
        resultsState.activeCategoryLabel = fullFilterState.draft.activeCategoryLabel;
        resultsState.activeCategoryValue = fullFilterState.draft.activeCategoryValue;
        resultsState.region = fullFilterState.draft.region;
        resultsState.sort = fullFilterState.draft.sort;
        resultsState.filters = createFilterDraftFromResults({ activeCategoryLabel: "", activeCategoryValue: "", region: [], sort: "", filters: fullFilterState.draft.filters }).filters;
        pendingChipKey = "filters";
        closeFullFilterSheet({ silent: true });
        renderResults();
      }

      function openBottomsheet(key, source) {
        var config = BOTTOMSHEET_CONFIGS[key];

        if (!config) {
          return;
        }

        bottomsheetState = createDefaultBottomsheetState();
        bottomsheetState.isOpen = true;
        bottomsheetState.key = key;
        bottomsheetState.source = source;
        bottomsheetState.type = config.type;
        bottomsheetState.title = config.title;
        bottomsheetState.searchable = config.searchable !== false;
        bottomsheetState.orderedOptions = getOrderedBottomsheetOptions(key, config.options || [], source);

        if (config.type === "range") {
          bottomsheetState.rangeMinBound = config.min;
          bottomsheetState.rangeMaxBound = config.max;
          bottomsheetState.rangeStep = config.step || 10;
          bottomsheetState.rangeMin = getCurrentRangeMin(source) || String(config.min);
          bottomsheetState.rangeMax = getCurrentRangeMax(source) || String(config.max);
        } else if (config.type === "multi") {
          bottomsheetState.draftValues = getSourceMultiValue(source, key).slice();
        } else {
          bottomsheetState.draftValue = getSourceSingleValue(source, key);
        }

        renderBottomsheet();
        filterBottomsheetList.scrollTop = 0;
        updateTooltipVisibility();
        window.requestAnimationFrame(function () {
          renderBottomsheetList();
          filterBottomsheetList.scrollTop = 0;
        });
      }

      function closeBottomsheet(options) {
        options = options || {};
        bottomsheetState = createDefaultBottomsheetState();
        filterBottomsheetSearchInput.blur();
        if (!options.silent) {
          renderBottomsheet();
        } else {
          filterBottomsheet.classList.remove("is-open");
          filterBottomsheet.setAttribute("aria-hidden", "true");
        }
        updateTooltipVisibility();
      }

      function applyBottomsheet() {
        var key = bottomsheetState.key;
        var source = bottomsheetState.source;

        if (!key) {
          closeBottomsheet();
          return;
        }

        if (source === "results") {
          assignToState(resultsState, key, bottomsheetState);
          pendingChipKey = key;
          closeBottomsheet({ silent: true });
          renderResults();
          return;
        }

        assignToDraft(fullFilterState.draft, key, bottomsheetState);
        closeBottomsheet({ silent: true });
        renderFullFilterSheet();
      }

      function resetBottomsheetDraft() {
        if (bottomsheetState.type === "range") {
          bottomsheetState.rangeMin = String(bottomsheetState.rangeMinBound);
          bottomsheetState.rangeMax = String(bottomsheetState.rangeMaxBound);
          bottomsheetState.activeThumb = "";
        } else if (bottomsheetState.type === "multi") {
          bottomsheetState.draftValues = [];
        } else {
          bottomsheetState.draftValue = getDefaultValue(bottomsheetState.key);
        }

        renderBottomsheetList();
      }

      function openCategorySheet() {
        closeBottomsheet({ silent: true });
        categorySheet.classList.add("is-open");
        categorySheet.setAttribute("aria-hidden", "false");
        renderCategorySheet();
        categorySheetList.scrollTop = 0;
        updateTooltipVisibility();
        window.requestAnimationFrame(function () {
          renderCategorySheet();
          categorySheetList.scrollTop = 0;
        });
      }

      function closeCategorySheet(options) {
        options = options || {};
        categorySheet.classList.remove("is-open");
        categorySheet.setAttribute("aria-hidden", "true");
        if (!options.silent) {
          renderCategorySheet();
        }
        updateTooltipVisibility();
      }

      function getVisibleItems() {
        var query = normalizeWhitespace(resultsState.query);
        var queryTokens = tokenize(query);
        var hasQueryMatches = queryTokens.length ? resultItems.some(function (item) {
          return matchesQuery(item, queryTokens);
        }) : false;
        var items = (hasQueryMatches ? resultItems.filter(function (item) {
          return matchesQuery(item, queryTokens);
        }) : resultItems.slice()).filter(function (item) {
          return matchesCategory(item) &&
            matchesSeller(item) &&
            matchesCondition(item) &&
            matchesManufacturer(item) &&
            matchesCurrency(item) &&
            matchesPrice(item) &&
            matchesFacetSelection(item, "gift") &&
            matchesFacetSelection(item, "urgentSale") &&
            matchesFacetSelection(item, "installment") &&
            matchesFacetSelection(item, "delivery") &&
            matchesRegion(item);
        });

        return sortItems(items);
      }

      function matchesQuery(item, queryTokens) {
        return queryTokens.every(function (token) {
          return item.tokens.some(function (candidate) {
            return candidate.indexOf(token) !== -1;
          });
        });
      }

      function matchesCategory(item) {
        return !resultsState.activeCategoryValue || item.category === resultsState.activeCategoryValue;
      }

      function matchesSeller(item) {
        var selected = resultsState.filters.seller || [];

        if (!selected.length) {
          return true;
        }

        return selected.some(function (value) {
          if (value === "business") {
            return item.seller !== "Частное лицо";
          }

          return item.seller === value;
        });
      }

      function matchesCondition(item) {
        return !resultsState.filters.condition.length || resultsState.filters.condition.some(function (value) {
          if (value === "Новое (с биркой, в упаковке)") {
            return item.condition === "Новое";
          }

          if (value === "Б/у (есть следы носки)") {
            return item.condition === "Б/у" || item.condition === "Как новое";
          }

          if (value === "Б/у (есть заметные дефекты)") {
            return item.condition === "После ремонта" || item.condition === "Б/у";
          }

          return item.condition === value;
        });
      }

      function matchesManufacturer(item) {
        return !resultsState.filters.manufacturer.length || resultsState.filters.manufacturer.some(function (value) {
          return item.manufacturer.indexOf(value) !== -1;
        });
      }

      function matchesCurrency(item) {
        return !resultsState.filters.currency.length || resultsState.filters.currency.indexOf("Из объявлений") !== -1 || resultsState.filters.currency.indexOf(item.currency) !== -1;
      }

      function matchesPrice(item) {
        var minValue = Number(resultsState.filters.priceMin || "0") * 1000;
        var maxValue = Number(resultsState.filters.priceMax || "0") * 1000;

        if (minValue && item.priceValue < minValue) {
          return false;
        }

        if (maxValue && item.priceValue > maxValue) {
          return false;
        }

        return true;
      }

      function matchesFacetSelection(item, key) {
        var selected = resultsState.filters[key] || [];

        if (!selected.length) {
          return true;
        }

        return selected.some(function (value) {
          return Array.isArray(item[key]) && item[key].indexOf(value) !== -1;
        });
      }

      function matchesRegion(item) {
        return !resultsState.region.length || resultsState.region.indexOf(item.region) !== -1;
      }

      function sortItems(items) {
        return items.slice().sort(function (left, right) {
          if (resultsState.sort === "price-asc") {
            return left.priceValue - right.priceValue;
          }

          if (resultsState.sort === "price-desc") {
            return right.priceValue - left.priceValue;
          }

          return right.postedRank - left.postedRank;
        });
      }

      function clearFilterByKey(key) {
        if (key === "category") {
          resultsState.activeCategoryLabel = "";
          resultsState.activeCategoryValue = "";
          return;
        }

        if (key === "price") {
          resultsState.filters[key] = "";
          if (key === "price") {
            resultsState.filters.priceMin = "";
            resultsState.filters.priceMax = "";
          }
          return;
        }

        if (key === "seller" || key === "currency" || key === "condition" || key === "manufacturer" || isToggleChipKey(key)) {
          resultsState.filters[key] = [];
        }

        if (key === "region") {
          resultsState.region = [];
        }
      }

      function isChipSelected(key) {
        if (key === "category") {
          return Boolean(resultsState.activeCategoryLabel);
        }

        if (key === "seller" || key === "currency") {
          return resultsState.filters[key].length > 0;
        }

        if (key === "price") {
          return Boolean(resultsState.filters.price || resultsState.filters.priceMin || resultsState.filters.priceMax);
        }

        if (key === "condition" || key === "manufacturer" || isToggleChipKey(key)) {
          return (resultsState.filters[key] || []).length > 0;
        }

        return false;
      }

      function isToggleChipKey(key) {
        return TOGGLE_FILTER_KEYS.indexOf(key) !== -1;
      }

      function toggleFilterChip(key) {
        if ((resultsState.filters[key] || []).length) {
          resultsState.filters[key] = [];
          return;
        }

        resultsState.filters[key] = getFacetToggleValues(key);
      }

      function getFacetToggleValues(key) {
        if (key === "gift") {
          return ["Только бесплатно", "Самовывоз", "Можно обмен"];
        }

        if (key === "urgentSale") {
          return ["Срочно", "Торг уместен", "Готов уступить"];
        }

        if (key === "installment") {
          return ["Есть рассрочка", "Без первого взноса", "До 12 месяцев"];
        }

        if (key === "delivery") {
          return ["Курьером", "Почтой", "Самовывоз"];
        }

        return [];
      }

      function getNonCategoryActiveCount() {
        return ["seller", "condition", "manufacturer", "gift", "urgentSale", "installment", "currency", "price", "delivery"].reduce(function (count, key) {
          return count + (isChipSelected(key) ? 1 : 0);
        }, 0);
      }

      function getSortLabel(value) {
        return getOptionLabel("sort", value || "recommended") || "Рекомендованное";
      }

      function getChipLabel(key) {
        if (key === "category") {
          return resultsState.activeCategoryLabel || "Все категории";
        }

        if (key === "seller" && resultsState.filters.seller.length) {
          return getSellerSummaryLabel(resultsState.filters.seller);
        }

        if (key === "condition" && resultsState.filters.condition.length) {
          return resultsState.filters.condition.length === 1 ? resultsState.filters.condition[0] : String(resultsState.filters.condition.length) + " состояния";
        }

        if (key === "currency" && resultsState.filters.currency.length) {
          return getCurrencySummaryLabel(resultsState.filters.currency);
        }

        if (key === "price" && (resultsState.filters.price || resultsState.filters.priceMin || resultsState.filters.priceMax)) {
          return getPriceSummaryLabel(resultsState.filters);
        }

        return CHIP_LABELS[key];
      }

      function getOptionLabel(key, value) {
        var config = BOTTOMSHEET_CONFIGS[key];
        var matchedOption = config ? config.options.filter(function (option) {
          return option.value === value;
        })[0] : null;

        return matchedOption ? matchedOption.label : "";
      }

      function getSellerSummaryLabel(values) {
        if (!values.length) {
          return "Все";
        }

        if (values.length === 1) {
          return values[0] === "business" ? "Магазин / бизнес" : values[0];
        }

        return String(values.length) + " выбрано";
      }

      function getCurrencySummaryLabel(values) {
        if (!values.length) {
          return "Валюта";
        }

        if (values.length === 1) {
          return values[0] === "Из объявлений" ? "Из объявлений" : values[0] === "UZS" ? "В сумах" : values[0] === "USD" ? "В у.е." : values[0];
        }

        return String(values.length) + " валюты";
      }

      function getRegionSummaryLabel(values) {
        if (!values.length) {
          return "Все регионы";
        }

        if (values.length === 1) {
          return values[0];
        }

        return String(values.length) + " регионов";
      }

      function getManufacturerSummaryLabel(values) {
        if (!values.length) {
          return "Все";
        }

        if (values.length === 1) {
          return values[0];
        }

        return String(values.length) + " выбрано";
      }

      function getPriceSummaryLabel(filters) {
        if (filters.priceMin && filters.priceMax) {
          return formatMoneyCompact(filters.priceMin) + " - " + formatMoneyCompact(filters.priceMax);
        }

        if (filters.priceMin) {
          return "от " + formatMoneyCompact(filters.priceMin);
        }

        if (filters.priceMax) {
          return "до " + formatMoneyCompact(filters.priceMax);
        }

        return getOptionLabel("price", filters.price) || "Цена";
      }

      function formatMoneyCompact(value) {
        return String(value || "").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      }

      function getOrderedBottomsheetOptions(key, options, source) {
        var selected = source === "results" ? getSourceMultiValue(source, key) : getSourceMultiValue(source, key);

        if (BOTTOMSHEET_CONFIGS[key].type !== "multi") {
          return options.slice();
        }

        return options.slice().sort(function (left, right) {
          var leftSelected = selected.indexOf(left.value) !== -1;
          var rightSelected = selected.indexOf(right.value) !== -1;

          if (leftSelected !== rightSelected) {
            return leftSelected ? -1 : 1;
          }

          return 0;
        });
      }

      function getSourceSingleValue(source, key) {
        var state = source === "full" ? fullFilterState.draft : resultsState;

        if (key === "category") {
          return state.activeCategoryValue || "";
        }

        if (key === "sort") {
          return state.sort || "recommended";
        }

        return state.filters[key] || "";
      }

      function getSourceMultiValue(source, key) {
        var state = source === "full" ? fullFilterState.draft : resultsState;

        if (key === "seller" || key === "currency") {
          return state.filters[key] || [];
        }

        if (key === "region") {
          return state.region || [];
        }

        if (key === "manufacturer") {
          return state.filters.manufacturer || [];
        }

        if (key === "condition") {
          return state.filters.condition || [];
        }

        if (isToggleChipKey(key)) {
          return state.filters[key] || [];
        }

        return [];
      }

      function getDefaultValue(key) {
        if (key === "region") {
          return [];
        }

        if (key === "sort") {
          return "recommended";
        }

        return "";
      }

      function assignToState(state, key, data) {
        if (key === "category") {
          state.activeCategoryValue = data.draftValue || "";
          state.activeCategoryLabel = data.draftValue ? (getOptionLabel("category", data.draftValue) || "") : "";
          return;
        }

        if (key === "region") {
          state.region = data.draftValues.slice();
          return;
        }

        if (key === "sort") {
          state.sort = data.draftValue || "recommended";
          return;
        }

        if (key === "condition") {
          state.filters.condition = data.draftValues.slice();
          return;
        }

        if (key === "manufacturer") {
          state.filters.manufacturer = data.draftValues.slice();
          return;
        }

        if (key === "price") {
          state.filters.price = "";
          state.filters.priceMin = data.rangeMin || "";
          state.filters.priceMax = data.rangeMax || "";
          return;
        }

        if (key === "seller" || key === "currency") {
          state.filters[key] = data.draftValues.slice();
          return;
        }

        state.filters[key] = data.draftValue || "";
      }

      function assignToDraft(draft, key, data) {
        if (key === "category") {
          draft.activeCategoryValue = data.draftValue || "";
          draft.activeCategoryLabel = data.draftValue ? (getOptionLabel("category", data.draftValue) || "") : "";
          return;
        }

        if (key === "region") {
          draft.region = data.draftValues.slice();
          return;
        }

        if (key === "sort") {
          draft.sort = data.draftValue || "recommended";
          return;
        }

        if (key === "condition") {
          draft.filters.condition = data.draftValues.slice();
          return;
        }

        if (key === "manufacturer") {
          draft.filters.manufacturer = data.draftValues.slice();
          return;
        }

        if (key === "price") {
          draft.filters.price = "";
          draft.filters.priceMin = data.rangeMin || "";
          draft.filters.priceMax = data.rangeMax || "";
          return;
        }

        if (key === "seller" || key === "currency") {
          draft.filters[key] = data.draftValues.slice();
          return;
        }

        draft.filters[key] = data.draftValue || "";
      }

      function toggleDraftArrayValue(key, value) {
        var collection = fullFilterState.draft.filters[key] || [];

        if (collection.indexOf(value) !== -1) {
          fullFilterState.draft.filters[key] = collection.filter(function (item) {
            return item !== value;
          });
          return;
        }

        fullFilterState.draft.filters[key] = collection.concat(value);
      }

      function getCurrentRangeMin(source) {
        var state = source === "full" ? fullFilterState.draft : resultsState;
        return state.filters.priceMin || "";
      }

      function getCurrentRangeMax(source) {
        var state = source === "full" ? fullFilterState.draft : resultsState;
        return state.filters.priceMax || "";
      }

      function sanitizeRangeValue(value, minBound, maxBound) {
        var digits = String(value || "").replace(/[^\d]/g, "");
        var numeric = digits ? Number(digits) : 0;

        if (!numeric) {
          return "";
        }

        return String(Math.max(minBound, Math.min(maxBound, numeric)));
      }

      function clampDraftRangeFromInputs() {
        var min = Number(fullFilterState.draft.filters.priceMin || "100");
        var max = Number(fullFilterState.draft.filters.priceMax || "1000");

        if (min > max) {
          fullFilterState.draft.filters.priceMax = String(min);
          filterSheetPriceMax.value = String(min);
        }

        renderFullFilterSheet();
      }

      function clampBottomsheetRange(activeThumb) {
        var min = Number(bottomsheetState.rangeMin || bottomsheetState.rangeMinBound);
        var max = Number(bottomsheetState.rangeMax || bottomsheetState.rangeMaxBound);

        if (activeThumb === "min" && min > max) {
          bottomsheetState.rangeMax = String(min);
        }

        if (activeThumb === "max" && max < min) {
          bottomsheetState.rangeMin = String(max);
        }
      }

      function isDraftFacetSelected(key) {
        return (fullFilterState.draft.filters[key] || []).length > 0;
      }

      function toggleDraftFacet(key) {
        if (isDraftFacetSelected(key)) {
          fullFilterState.draft.filters[key] = [];
          return;
        }

        fullFilterState.draft.filters[key] = getFacetToggleValues(key);
      }

      function resolveCategoryValue(label) {
        var normalized = normalizeValue(label);

        if (!normalized) {
          return "";
        }

        return CATEGORY_ALIAS_MAP[normalized] || label;
      }

      function scrollChipIntoView(key) {
        var chip = filterRow.querySelector('[data-filter-key="' + key + '"]');

        if (!chip) {
          return;
        }

        window.requestAnimationFrame(function () {
          filterScroll.scrollTo({
            left: Math.max(0, chip.offsetLeft - 16),
            behavior: "smooth"
          });
        });
      }

      function sanitizeDigits(value) {
        return String(value || "").replace(/[^\d]/g, "");
      }

      function updateTooltipVisibility() {
        if (!tooltip) {
          return;
        }

        tooltip.hidden = true;
        tooltip.setAttribute("aria-hidden", "true");
      }

      function dismissTooltip() {
        if (!tooltip) {
          return;
        }

        tooltip.hidden = true;
        tooltip.setAttribute("aria-hidden", "true");

        try {
          window.localStorage.setItem(FILTER_TOOLTIP_KEY, "1");
        } catch (error) {
        }
      }

      function normalizeWhitespace(value) {
        return String(value || "").replace(/\s+/g, " ").trim();
      }

      function normalizeValue(value) {
        return normalizeWhitespace(value).toLowerCase().replace(/ё/g, "е");
      }

      function tokenize(value) {
        return normalizeValue(value).replace(/[^0-9a-zа-я\s]/gi, " ").split(/\s+/).filter(Boolean);
      }

      function escapeHtml(value) {
        return String(value || "").replace(/[&<>"']/g, function (character) {
          return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
          }[character];
        });
      }
    }

    function initProductDetails() {
      var detailScreen = document.querySelector(".detail-screen");
      var detailScroller = detailScreen ? detailScreen.querySelector(".detail-screen__scroller") : null;
      var detailBack = detailScreen ? detailScreen.querySelector(".detail-screen__back") : null;
      var detailHeroImage = detailScreen ? detailScreen.querySelector("#detail-hero-image") : null;
      var detailHeroBadge = detailScreen ? detailScreen.querySelector("#detail-hero-badge") : null;
      var detailHeroPrice = detailScreen ? detailScreen.querySelector("#detail-hero-price") : null;
      var detailHeroOld = detailScreen ? detailScreen.querySelector("#detail-hero-old") : null;
      var detailHeroOldValue = detailScreen ? detailScreen.querySelector("#detail-hero-old-value") : null;
      var detailHeroDiscount = detailScreen ? detailScreen.querySelector("#detail-hero-discount") : null;
      var detailHeroTitle = detailScreen ? detailScreen.querySelector("#detail-hero-title") : null;
      var detailHeroBadges = detailScreen ? detailScreen.querySelector("#detail-hero-badges") : null;
      var detailCharacteristics = detailScreen ? detailScreen.querySelector("#detail-characteristics") : null;
      var detailDescription = detailScreen ? detailScreen.querySelector("#detail-description") : null;
      var detailOfferInput = detailScreen ? detailScreen.querySelector("#detail-offer-input") : null;
      var detailOfferChips = detailScreen ? detailScreen.querySelector("#detail-offer-chips") : null;
      var detailQuestionInput = detailScreen ? detailScreen.querySelector("#detail-question-input") : null;
      var detailQuestionChips = detailScreen ? detailScreen.querySelector("#detail-question-chips") : null;
      var detailSimilarTrack = detailScreen ? detailScreen.querySelector("#detail-similar-track") : null;
      var detailSellerTrack = detailScreen ? detailScreen.querySelector("#detail-seller-track") : null;
      var badgeTemplate = document.querySelector("#preview-card-badge-set");
      var baseCards = Array.prototype.slice.call(document.querySelectorAll(".cards .card"));
      var OFFER_DISCOUNTS = [10, 15, 20];
      var OFFER_FALLBACK_TEXTS = {
        10: "Продадите за 6 300 000 сум?",
        15: "Продадите за 5 950 000 сум?",
        20: "Продадите за 5 600 000 сум?"
      };
      var QUESTION_CHIPS = [
        { label: "Хочу купить", text: "Здравствуйте! Хочу купить" },
        { label: "Еще продаете?", text: "Здравствуйте! Еще продаете?" },
        { label: "Торг уместен?", text: "Здравствуйте! Торг уместен?" },
        { label: "Когда можно посмотреть?", text: "Здравствуйте! Когда можно посмотреть?" },
        { label: "Почему продаете?", text: "Здравствуйте! Почему продаете?" }
      ];
      var DETAIL_HERO_NOTICE_MESSAGES = [
        "Это объявление посмотрели уже 54 раза",
        "Будьте первым, кто напишет по объявлению",
        "Этот товар пользуется спросом"
      ];
      var detailHeroBadgeTimer = null;

      if (!detailScreen || !detailScroller || !detailBack || !detailHeroImage || !detailHeroBadge || !detailHeroPrice || !detailHeroOld || !detailHeroOldValue || !detailHeroDiscount || !detailHeroTitle || !detailHeroBadges || !detailCharacteristics || !detailDescription || !detailOfferInput || !detailOfferChips || !detailQuestionInput || !detailQuestionChips || !detailSimilarTrack || !detailSellerTrack) {
        return;
      }

      detailBack.addEventListener("click", closeDetail);

      detailOfferChips.addEventListener("click", function (event) {
        var chip = event.target.closest("[data-offer-discount]");
        var priceValue;
        var discountValue;

        if (!chip || !detailOfferChips.contains(chip)) {
          return;
        }

        priceValue = Number(detailOfferChips.getAttribute("data-offer-price") || "0");
        discountValue = Number(chip.getAttribute("data-offer-discount") || "0");
        detailOfferInput.value = buildOfferMessage(priceValue, discountValue);
        setSelectedPromptChip(detailOfferChips, "data-offer-discount", String(discountValue));
      });

      detailQuestionChips.addEventListener("click", function (event) {
        var chip = event.target.closest("[data-question-text]");
        var nextText;

        if (!chip || !detailQuestionChips.contains(chip)) {
          return;
        }

        nextText = chip.getAttribute("data-question-text") || QUESTION_CHIPS[0].text;
        detailQuestionInput.value = nextText;
        setSelectedPromptChip(detailQuestionChips, "data-question-text", nextText);
      });

      document.addEventListener("click", function (event) {
        var card;

        if (event.target.closest(".like-button")) {
          return;
        }

        card = event.target.closest(".card, .results-card");

        if (!card) {
          return;
        }

        openDetail(card);
      });

      function openDetail(card) {
        assignSourceCardOrdinals();
        populateDetail(card);
        detailScreen.classList.add("is-open");
        detailScreen.setAttribute("aria-hidden", "false");
        detailScroller.scrollTop = 0;
      }

      function closeDetail() {
        window.clearTimeout(detailHeroBadgeTimer);
        detailHeroBadge.classList.remove("is-visible", "is-leaving");
        detailHeroBadge.hidden = true;
        detailScreen.classList.remove("is-open");
        detailScreen.setAttribute("aria-hidden", "true");
      }

      function populateDetail(card) {
        var data = extractCardData(card);
        var meta = buildDetailMeta(data.title);
        var railCards = getRailCards(card);
        var offerPriceValue = parsePriceValue(data.price);
        var sourceOrdinal = getSourceCardOrdinal(card, data);

        detailHeroImage.src = data.imageSrc || detailHeroImage.getAttribute("src");
        detailHeroImage.alt = data.imageAlt || data.title;
        applyDetailHeroBadge(sourceOrdinal);
        detailHeroPrice.textContent = data.price || "11 900 000 сум";
        detailHeroTitle.textContent = meta.heroTitle || data.title || "Iphone 17 Pro Max 512 gb Silver";
        detailHeroBadges.innerHTML = renderHeroTags(data.badgesHtml);

        if (data.oldPrice) {
          detailHeroOld.hidden = false;
          detailHeroOldValue.textContent = data.oldPrice;
          detailHeroDiscount.textContent = data.discount || "";
          detailHeroDiscount.hidden = !data.discount;
        } else {
          detailHeroOld.hidden = true;
        }

        detailCharacteristics.innerHTML = meta.characteristics.map(function (item) {
          return [
            '<p class="detail-characteristics__label">',
            escapeHtml(item.label),
            "</p>",
            '<p class="detail-characteristics__value">',
            escapeHtml(item.value),
            "</p>"
          ].join("");
        }).join("");

        detailDescription.textContent = meta.description;
        detailOfferChips.setAttribute("data-offer-price", String(offerPriceValue || 0));
        detailOfferInput.value = buildOfferMessage(offerPriceValue, OFFER_DISCOUNTS[0]);
        detailOfferChips.innerHTML = OFFER_DISCOUNTS.map(function (discount, index) {
          return renderPromptChip("Скидка - " + String(discount) + "%", index === 0, 'data-offer-discount="' + String(discount) + '"');
        }).join("");
        detailQuestionInput.value = QUESTION_CHIPS[0].text;
        detailQuestionChips.innerHTML = QUESTION_CHIPS.map(function (item, index) {
          return renderPromptChip(item.label, index === 0, 'data-question-text="' + escapeHtml(item.text) + '"');
        }).join("");
        detailSimilarTrack.innerHTML = railCards.similar.map(function (item) {
          return item.outerHTML;
        }).join("");
        detailSellerTrack.innerHTML = railCards.seller.map(function (item) {
          return item.outerHTML;
        }).join("");
      }

      function assignSourceCardOrdinals() {
        var ordinal = 0;

        Array.prototype.forEach.call(document.querySelectorAll(".card, .results-card"), function (card) {
          if (card.closest(".detail-screen")) {
            return;
          }

          ordinal += 1;
          card.setAttribute("data-card-ordinal", String(ordinal));
        });
      }

      function getSourceCardOrdinal(card, data) {
        var ownOrdinal = Number(card && card.getAttribute("data-card-ordinal") || "0");
        var title = normalizeWhitespace(data && data.title);
        var price = normalizeWhitespace(data && data.price);
        var matchedOrdinal = 0;

        if (ownOrdinal) {
          return ownOrdinal;
        }

        Array.prototype.some.call(document.querySelectorAll(".card, .results-card"), function (item) {
          var itemTitle;
          var itemPrice;

          if (item.closest(".detail-screen")) {
            return false;
          }

          itemTitle = normalizeWhitespace(item.querySelector(".card__title, .results-card__title") ? item.querySelector(".card__title, .results-card__title").textContent : "");
          itemPrice = normalizeWhitespace(item.querySelector(".card__price, .results-card__price") ? item.querySelector(".card__price, .results-card__price").textContent : "");

          if (itemTitle === title && itemPrice === price) {
            matchedOrdinal = Number(item.getAttribute("data-card-ordinal") || "0");
            return true;
          }

          return false;
        });

        return matchedOrdinal;
      }

      function applyDetailHeroBadge(sourceOrdinal) {
        var noticeIndex;

        window.clearTimeout(detailHeroBadgeTimer);
        detailHeroBadge.classList.remove("is-visible", "is-leaving");
        detailHeroBadge.hidden = true;

        if (!sourceOrdinal || sourceOrdinal % 2 !== 0) {
          return;
        }

        noticeIndex = Math.max(0, Math.floor(sourceOrdinal / 2) - 1) % DETAIL_HERO_NOTICE_MESSAGES.length;
        detailHeroBadge.textContent = DETAIL_HERO_NOTICE_MESSAGES[noticeIndex];
        detailHeroBadge.hidden = false;
        detailHeroBadge.offsetWidth;
        detailHeroBadge.classList.add("is-visible");
        detailHeroBadgeTimer = window.setTimeout(function () {
          detailHeroBadge.classList.remove("is-visible");
          detailHeroBadge.classList.add("is-leaving");
          window.setTimeout(function () {
            detailHeroBadge.classList.remove("is-leaving");
            detailHeroBadge.hidden = true;
          }, 220);
        }, 3000);
      }

      function renderPromptChip(label, isSelected, attrs) {
        return [
          '<button class="library-chip',
          isSelected ? " library-chip--selected" : "",
          '" type="button" ',
          attrs,
          '><span class="library-chip__label">',
          escapeHtml(label),
          "</span></button>"
        ].join("");
      }

      function setSelectedPromptChip(container, attributeName, value) {
        Array.prototype.forEach.call(container.querySelectorAll(".library-chip"), function (chip) {
          chip.classList.toggle("library-chip--selected", chip.getAttribute(attributeName) === value);
        });
      }

      function buildOfferMessage(priceValue, discountValue) {
        if (!priceValue) {
          return OFFER_FALLBACK_TEXTS[discountValue] || OFFER_FALLBACK_TEXTS[10];
        }

        return "Продадите за " + formatMoney(Math.round(priceValue * (100 - discountValue) / 100)) + "?";
      }

      function parsePriceValue(value) {
        var digits = String(value || "").replace(/[^\d]/g, "");
        return digits ? Number(digits) : 0;
      }

      function formatMoney(value) {
        return String(Math.max(0, Math.round(value))).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " сум";
      }

      function extractCardData(card) {
        var image = card.querySelector(".card__image, .results-card__image");
        var title = card.querySelector(".card__title, .results-card__title");
        var price = card.querySelector(".card__price, .results-card__price");
        var oldPrice = card.querySelector(".card__old s, .results-card__old s");
        var discount = card.querySelector(".card__discount, .results-card__discount");
        var badges = card.querySelector(".card__badges, .results-card__badges");

        return {
          imageSrc: image && image.getAttribute("src") ? image.getAttribute("src") : "",
          imageAlt: image && image.getAttribute("alt") ? image.getAttribute("alt") : "",
          title: title ? normalizeWhitespace(title.textContent) : "",
          price: price ? normalizeWhitespace(price.textContent) : "",
          oldPrice: oldPrice ? normalizeWhitespace(oldPrice.textContent) : "",
          discount: discount ? normalizeWhitespace(discount.textContent) : "",
          badgesHtml: badges && badges.innerHTML ? badges.innerHTML : ""
        };
      }

      function buildDetailMeta(title) {
        return {
          heroTitle: title,
          description: "На глянцах царапин практически нет, все работает и проблем вообще не было. В ремонт особо сложного его не возил, но тачскрин уже начал подуступать. Посмотрите и выберите. На глянцах царапин практически нет, все работает и проблем вообще не было. В ремонт особо сложного его не возил, но тачскрин уже начал подуступать. Посмотрите и выберите. На глянцах царапин практически нет, все работает и проблем вообще не было. В ремонт особо сложного его не возил, но тачскрин уже начал подуступать. Посмотрите и выберите.",
          characteristics: [
            { label: "Категория", value: "Одежда и обувь · Женская одежда · Верхняя женская одежда" },
            { label: "Состояние", value: "Б/у" },
            { label: "Бренд", value: "Birkenstock" }
          ]
        };
      }

      function getRailCards(activeCard) {
        var activeTitle = normalizeWhitespace(activeCard && activeCard.querySelector(".card__title, .results-card__title") ? activeCard.querySelector(".card__title, .results-card__title").textContent : "");
        var cards = baseCards.slice();
        var others = cards.filter(function (item) {
          var title = normalizeWhitespace(item.querySelector(".card__title") ? item.querySelector(".card__title").textContent : "");
          return title !== activeTitle;
        });

        if (others.length < 4) {
          others = cards.slice();
        }

        return {
          similar: others.slice(0, 4),
          seller: others.slice(2, 6).length ? others.slice(2, 6) : others.slice(0, 4)
        };
      }

      function renderHeroTags(sourceHtml) {
        var normalized = normalizeWhitespace(sourceHtml).toLowerCase();
        var hasDelivery = !sourceHtml || normalized.indexOf("достав") !== -1;
        var hasUrgent = !sourceHtml || normalized.indexOf("сроч") !== -1 || normalized.indexOf("торг") !== -1;
        var tags = [];

        if (hasDelivery) {
          tags.push([
            '<span class="detail-hero__tag">',
            createIconMarkup({ symbolId: "icon-track-outline", size: 14, colorClass: "icon-color--primary", iconClass: " icon--track-outline" }),
            '<span class="detail-hero__tag-label">BirBir Доставка</span>',
            '<span class="detail-hero__tag-chevron" aria-hidden="true">',
            createIconMarkup({ symbolId: "icon-chevron-right-line", size: 14, colorClass: "icon-color--primary", iconClass: " icon--chevron-right-line" }),
            "</span>",
            "</span>"
          ].join(""));
        }

        if (hasUrgent) {
          tags.push([
            '<span class="detail-hero__tag">',
            createIconMarkup({ symbolId: "icon-flash-outline", size: 14, colorClass: "icon-color--primary", iconClass: " icon--flash-outline" }),
            '<span class="detail-hero__tag-label">Срочно. Торг</span>',
            "</span>"
          ].join(""));
        }

        return tags.join("");
      }

      function normalizeWhitespace(value) {
        return String(value || "").replace(/\s+/g, " ").trim();
      }

      function escapeHtml(value) {
        return String(value || "").replace(/[&<>"']/g, function (character) {
          return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
          }[character];
        });
      }
    }

    function initFavoriteButtons() {
      var favoriteToast = document.querySelector(".favorite-toast");
      var favoriteToastImage = favoriteToast ? favoriteToast.querySelector(".favorite-toast__thumb img") : null;
      var favoriteToastTitle = favoriteToast ? favoriteToast.querySelector(".favorite-toast__title") : null;
      var favoriteToastText = favoriteToast ? favoriteToast.querySelector(".favorite-toast__text") : null;
      var favoriteToastTimer = null;
      var fallbackToastImage = "assets/Photo/karolina-grabowska-g4ve1q1gQxM-unsplash.jpg";
      var likeBurstPreset = [
        { x: -42, y: -56, scale: 1.28, rotate: "-28deg", delay: 0 },
        { x: -24, y: -76, scale: 1.08, rotate: "-16deg", delay: 35 },
        { x: 0, y: -88, scale: 1.42, rotate: "0deg", delay: 18 },
        { x: 24, y: -76, scale: 1.08, rotate: "16deg", delay: 55 },
        { x: 42, y: -56, scale: 1.28, rotate: "28deg", delay: 22 },
        { x: 10, y: -42, scale: 0.96, rotate: "12deg", delay: 80 }
      ];

      function triggerLikeHaptic() {
        try {
          if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.HapticFeedback && typeof window.Telegram.WebApp.HapticFeedback.impactOccurred === "function") {
            window.Telegram.WebApp.HapticFeedback.impactOccurred("light");
            return;
          }
        } catch (error) {}

        try {
          if (navigator && typeof navigator.vibrate === "function") {
            navigator.vibrate(18);
          }
        } catch (error) {}
      }

      function setLikeState(button, liked) {
        button.classList.toggle("like-button--liked", liked);
        button.setAttribute("aria-pressed", liked ? "true" : "false");
        button.setAttribute("aria-label", liked ? "Удалить из избранного" : "Добавить в избранное");
      }

      function playLikeBurst(button) {
        var existingBurst = button.querySelector(".like-button__burst");
        var burst = document.createElement("span");

        if (existingBurst) {
          existingBurst.remove();
        }

        burst.className = "like-button__burst";
        burst.setAttribute("aria-hidden", "true");

        likeBurstPreset.forEach(function (particleConfig) {
          var particle = document.createElement("span");

          particle.className = "like-button__particle";
          particle.textContent = "♥";
          particle.style.setProperty("--like-burst-x", particleConfig.x + "px");
          particle.style.setProperty("--like-burst-y", particleConfig.y + "px");
          particle.style.setProperty("--like-burst-scale", String(particleConfig.scale));
          particle.style.setProperty("--like-burst-rotate", particleConfig.rotate);
          particle.style.animationDelay = particleConfig.delay + "ms";
          particle.setAttribute("aria-hidden", "true");
          burst.appendChild(particle);
        });

        button.appendChild(burst);

        window.setTimeout(function () {
          if (burst.parentNode) {
            burst.parentNode.removeChild(burst);
          }
        }, 1200);
      }

      function hideFavoriteToast() {
        if (!favoriteToast) {
          return;
        }
        favoriteToast.classList.remove("is-visible");
      }

      function showFavoriteToast(card) {
        if (!favoriteToast) {
          return;
        }

        var cardImage = card ? card.querySelector(".card__image, .results-card__image, .detail-hero__image") : null;

        if (!cardImage && document.querySelector(".detail-screen.is-open .detail-hero__image")) {
          cardImage = document.querySelector(".detail-screen.is-open .detail-hero__image");
        }

        window.clearTimeout(favoriteToastTimer);

        if (favoriteToastImage) {
          favoriteToastImage.src = cardImage && cardImage.getAttribute("src") ? cardImage.getAttribute("src") : fallbackToastImage;
          favoriteToastImage.alt = "";
        }

        if (favoriteToastTitle) {
          favoriteToastTitle.textContent = "Добавлено в избранное";
        }

        if (favoriteToastText) {
          favoriteToastText.textContent = "Ваше избранное находится в профиле";
        }

        favoriteToast.classList.add("is-visible");
        favoriteToastTimer = window.setTimeout(hideFavoriteToast, 1500);
      }

      Array.prototype.forEach.call(document.querySelectorAll(".like-button"), function (button) {
        setLikeState(button, button.getAttribute("aria-pressed") === "true");
      });

      document.addEventListener("click", function (event) {
        var button = event.target.closest(".like-button");
        var nextLiked;

        if (!button) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();
        triggerLikeHaptic();

        nextLiked = button.getAttribute("aria-pressed") !== "true";
        setLikeState(button, nextLiked);

        if (nextLiked) {
          if (!button.classList.contains("detail-screen__favorite")) {
            playLikeBurst(button);
          }
          showFavoriteToast(button.closest(".card, .results-card, .detail-hero, .detail-screen"));
        } else {
          hideFavoriteToast();
        }
      });
    }

    function initSellerCabinet() {
      var root = document.querySelector("[data-seller-cabinet-root]");
      var stateNode = document.getElementById("seller-cabinet-state-map");
      var content = root ? root.querySelector("[data-seller-content]") : null;
      var tabsHost = root ? root.querySelector("[data-seller-tabs]") : null;
      var notificationHost = document.querySelector("[data-seller-notification]");
      var tooltip = document.querySelector("[data-seller-tooltip]");
      var bottomsheet = document.querySelector("[data-seller-bottomsheet]");
      var bottomsheetTitle = document.getElementById("seller-bottomsheet-title");
      var bottomsheetContent = document.querySelector("[data-seller-sheet-content]");
      var bottomsheetPrimary = document.querySelector("[data-seller-sheet-primary]");
      var bottomsheetSecondary = document.querySelector("[data-seller-sheet-secondary]");
      var state;
      var autoHideTimer = null;

      if (!root || !stateNode || !content || !tabsHost || !notificationHost || !tooltip || !bottomsheet || !bottomsheetTitle || !bottomsheetContent || !bottomsheetPrimary || !bottomsheetSecondary) {
        return;
      }

      try {
        state = JSON.parse(stateNode.textContent);
      } catch (error) {
        return;
      }

      state.cardsByTab = cloneValue(state.cardsByTab || {});
      state.activeTab = state.activeTab || "active";
      state.notificationKey = null;
      state.bottomsheetState = null;
      bottomsheetContent.innerHTML = '<div class="seller-bottomsheet__row"><div class="seller-bottomsheet__row-copy"><p class="seller-bottomsheet__row-title">Выберите действие</p><p class="seller-bottomsheet__row-text">Детали услуги или статистики появятся здесь.</p></div></div>';

      render();

      document.addEventListener("click", function (event) {
        var tabButton = event.target.closest("[data-seller-tab]");
        var cardAction = event.target.closest("[data-seller-card-action]");
        var promoAction = event.target.closest("[data-seller-promo-action]");
        var statsAction = event.target.closest("[data-seller-card-stats]");
        var statusAction = event.target.closest("[data-seller-status-action]");
        var questionAction = event.target.closest("[data-seller-question-action]");
        var tooltipTrigger = event.target.closest("[data-seller-open-tooltip]");
        var notificationTrigger = event.target.closest("[data-seller-open-notification]");
        var notificationClose = event.target.closest("[data-seller-close-notification]");
        var tooltipClose = event.target.closest("[data-seller-tooltip-close]");
        var sheetOpen = event.target.closest("[data-seller-sheet-open]");
        var sheetClose = event.target.closest("[data-seller-sheet-close]");
        var primaryCta = event.target.closest("[data-seller-primary-cta]");

        if (tabButton) {
          state.activeTab = tabButton.getAttribute("data-seller-tab") || "active";
          render();
          return;
        }

        if (primaryCta) {
          showNotification("published");
          return;
        }

        if (tooltipTrigger) {
          tooltip.hidden = false;
          tooltip.setAttribute("aria-hidden", "false");
          return;
        }

        if (tooltipClose) {
          tooltip.hidden = true;
          tooltip.setAttribute("aria-hidden", "true");
          return;
        }

        if (notificationTrigger) {
          showNotification("default");
          return;
        }

        if (notificationClose) {
          hideNotification();
          return;
        }

        if (sheetOpen) {
          openBottomsheet(sheetOpen.getAttribute("data-seller-sheet-open"), null);
          return;
        }

        if (sheetClose) {
          closeBottomsheet();
          return;
        }

        if (statsAction) {
          openBottomsheet("statistics", getCardById(statsAction.getAttribute("data-seller-card-stats")));
          return;
        }

        if (promoAction) {
          handleAction(promoAction.getAttribute("data-seller-promo-action"), promoAction.getAttribute("data-seller-card-id"));
          return;
        }

        if (statusAction) {
          handleAction(statusAction.getAttribute("data-seller-status-action"), statusAction.getAttribute("data-seller-card-id"));
          return;
        }

        if (questionAction) {
          handleAction(questionAction.getAttribute("data-seller-question-action"), questionAction.getAttribute("data-seller-card-id"));
          return;
        }

        if (cardAction) {
          handleAction(cardAction.getAttribute("data-seller-card-action"), cardAction.getAttribute("data-seller-card-id"), cardAction.getAttribute("data-seller-notification-key"));
        }
      });

      bottomsheetPrimary.addEventListener("click", function () {
        closeBottomsheet();
      });

      function render() {
        renderTabs();
        renderCards();
        renderNotification();
        renderBottomsheet();
      }

      function renderTabs() {
        var labels = {
          active: "Активные",
          draft: "Черновики",
          "needs-action": "Ждут действий",
          archived: "Архив"
        };
        var order = ["active", "draft", "needs-action", "archived"];

        tabsHost.innerHTML = order.map(function (tabId) {
          var count = (state.cardsByTab[tabId] || []).length;
          var activeClass = tabId === state.activeTab ? " is-active" : "";

          return [
            '<button class="seller-cabinet-tabs__button',
            activeClass,
            '" type="button" data-seller-tab="',
            tabId,
            '"><span class="seller-cabinet-tabs__label-row"><span>',
            labels[tabId],
            "</span>",
            count ? '<span class="seller-cabinet-tabs__count">' + String(count) + "</span>" : "",
            '</span><span class="seller-cabinet-tabs__underline"></span></button>'
          ].join("");
        }).join("");
      }

      function renderCards() {
        var cards = state.cardsByTab[state.activeTab] || [];
        var emptyState = state.emptyStates && state.emptyStates[state.activeTab];

        if (!cards.length && emptyState) {
          content.innerHTML = renderEmptyState(emptyState);
          return;
        }

        content.innerHTML = cards.map(function (card) {
          return renderCard(card);
        }).join("");
      }

      function renderCard(card) {
        return [
          '<article class="seller-product-card seller-product-card--',
          toKebabCase(card.variant),
          '" data-seller-card-variant="',
          card.variant,
          '">',
          '<div class="seller-product-card__top">',
          '<div class="seller-product-card__photo">',
          '<img src="',
          card.photo,
          '" alt="',
          escapeHtml(card.title),
          '">',
          '<div class="seller-product-card__badge-stack">',
          (card.badges || []).map(renderBadge).join(""),
          "</div>",
          "</div>",
          '<div class="seller-product-card__body">',
          '<div class="seller-product-card__heading">',
          '<div class="seller-product-card__price-block">',
          '<div class="seller-product-card__price-row">',
          '<p class="seller-product-card__price">',
          escapeHtml(card.price),
          "</p>",
          renderSellerAssetIcon(SELLER_CARD_ICON_SRC.coin, 16, "seller-product-card__installment"),
          "</div>",
          card.oldPrice ? [
            '<div class="seller-product-card__old"><s>',
            escapeHtml(card.oldPrice),
            "</s>",
            card.discount ? '<span class="seller-product-card__discount">' + escapeHtml(card.discount) + "</span>" : "",
            "</div>"
          ].join("") : "",
          '<p class="seller-product-card__title">',
          escapeHtml(card.title),
          "</p>",
          "</div>",
          '<button class="seller-product-card__menu" type="button" aria-label="Действия с объявлением">',
          '<img class="seller-product-card__menu-icon" src="',
          SELLER_CARD_ICON_SRC.more,
          '" alt="">',
          "</button>",
          "</div>",
          card.stats ? renderStats(card) : "",
          '<div class="seller-product-card__status ',
          getStatusClass(card.statusTone),
          '">',
          '<p class="seller-product-card__status-text">',
          escapeHtml(card.statusText),
          "</p>",
          card.statusAction ? [
            '<button class="seller-product-card__status-action" type="button" data-seller-status-action="',
            card.statusAction.id,
            '" data-seller-card-id="',
            card.id,
            '">',
            escapeHtml(card.statusAction.label),
            "</button>"
          ].join("") : "",
          "</div>",
          "</div>",
          "</div>",
          card.alert ? renderAlert(card.alert) : "",
          card.actions && card.actions.length ? renderActions(card) : "",
          card.promoAction ? renderPromo(card) : "",
          "</article>"
        ].join("");
      }

      function renderBadge(badge) {
        var classes = ["badge", "badge--new", "badge--" + badge.type];

        if (badge.iconOnly) {
          classes.push("badge--icon-only");
        }

        return [
          '<span class="',
          classes.join(" "),
          '"',
          badge.label ? ' aria-label="' + escapeHtml(badge.label) + '"' : "",
          '><span class="badge__icon badge__icon--12"><span class="badge__round-icon badge__round-icon--',
          badge.type,
          '">',
          renderSellerBadgeGlyph(badge.type),
          "</span></span>",
          badge.iconOnly ? "" : '<span class="badge__label">' + escapeHtml(badge.label || "") + "</span>",
          "</span>"
        ].join("");
      }

      function renderStats(card) {
        return [
          '<button class="seller-product-card__stats" type="button" data-seller-card-stats="',
          card.id,
          '">',
          renderStat("views", SELLER_CARD_ICON_SRC.eye, card.stats.views),
          renderStat("favorites", SELLER_CARD_ICON_SRC.heart, card.stats.favorites),
          renderStat("calls", SELLER_CARD_ICON_SRC.phone, card.stats.calls),
          "</button>"
        ].join("");
      }

      function renderStat(type, iconSrc, value) {
        return [
          '<span class="seller-product-card__stat"><span class="icon-box icon-box--16 seller-product-card__stat-icon seller-product-card__stat-icon--',
          type,
          '" aria-hidden="true"><img class="seller-icon-img seller-product-card__stat-icon seller-product-card__stat-icon--',
          type,
          '" src="',
          iconSrc,
          '" alt=""></span><span class="seller-product-card__stat-value">',
          String(value),
          "</span></span>"
        ].join("");
      }

      function renderAlert(alert) {
        return [
          '<div class="seller-product-card__alert',
          alert.tone === "danger" ? ' seller-product-card__alert--danger' : "",
          '"><p class="seller-product-card__alert-text">',
          escapeHtml(alert.text || ""),
          "</p></div>"
        ].join("");
      }

      function renderActions(card) {
        return [
          '<div class="seller-product-card__actions">',
          card.actions.map(function (action) {
            var buttonClass = "seller-product-card__action-button";

            if (action.compact) {
              buttonClass += " seller-product-card__action-button--compact";
            }

            return [
              '<button class="',
              buttonClass,
              '" type="button" data-seller-card-action="',
              action.id,
              '" data-seller-card-id="',
              card.id,
              '"',
              action.notificationKey ? ' data-seller-notification-key="' + action.notificationKey + '"' : "",
              '>',
              action.icon ? resolveSellerActionIcon(action.icon) : "",
              "<span>",
              escapeHtml(action.label),
              "</span></button>"
            ].join("");
          }).join(""),
          "</div>"
        ].join("");
      }

      function renderPromo(card) {
        var promo = card.promoAction;
        return [
          '<div class="seller-product-card__promo-row"><button class="seller-product-card__promo-button" type="button" data-seller-promo-action="',
          promo.id,
          '" data-seller-card-id="',
          card.id,
          '"><span>',
          escapeHtml(promo.label || "Продвинуть"),
          '</span></button><button class="seller-product-card__promo-icon" type="button" data-seller-promo-action="',
          promo.id,
          '" data-seller-card-id="',
          card.id,
          '">',
          resolveSellerActionIcon(promo.icon || "prototype-library/icon-source-svg/UpAdFill.svg"),
          promo.dot ? '<span class="seller-product-card__promo-dot"></span>' : "",
          "</button></div>"
        ].join("");
      }

      function renderEmptyState(emptyState) {
        return [
          '<div class="seller-cabinet-empty">',
          '<span class="seller-cabinet-empty__icon icon-box icon-box--24" aria-hidden="true"><img class="seller-icon-img" src="prototype-library/icon-source-svg/BoxFill.svg" alt=""></span>',
          '<p class="seller-cabinet-empty__title">',
          escapeHtml(emptyState.title),
          "</p>",
          '<p class="seller-cabinet-empty__text">',
          escapeHtml(emptyState.text),
          "</p>",
          '<button class="library-button library-button--accent-filled" type="button" data-seller-primary-cta>',
          '<span class="library-button__label">',
          escapeHtml(emptyState.cta),
          "</span></button>",
          "</div>"
        ].join("");
      }

      function renderNotification() {
        var notification = state.notifications && state.notifications[state.notificationKey];
        var iconSrcByTone = {
          info: "prototype-library/icon-source-svg/ServicesFill.svg",
          success: "prototype-library/icon-source-svg/CheckCircleFill.svg",
          warning: "prototype-library/icon-source-svg/AlertFill.svg"
        };

        if (!notification) {
          notificationHost.hidden = true;
          notificationHost.setAttribute("aria-hidden", "true");
          notificationHost.innerHTML = "";
          return;
        }

        notificationHost.hidden = false;
        notificationHost.setAttribute("aria-hidden", "false");
        notificationHost.innerHTML = [
          '<div class="seller-cabinet-notification__card">',
          '<span class="seller-cabinet-notification__icon seller-cabinet-notification__icon--',
          notification.tone,
          '"><span class="icon-box icon-box--20" aria-hidden="true"><img class="seller-icon-img" src="',
          iconSrcByTone[notification.tone] || iconSrcByTone.info,
          '" alt=""></span></span>',
          '<div class="seller-cabinet-notification__body"><p class="seller-cabinet-notification__title">',
          escapeHtml(notification.title),
          '</p><p class="seller-cabinet-notification__text">',
          escapeHtml(notification.text),
          '</p></div><button class="seller-cabinet-notification__close" type="button" data-seller-close-notification aria-label="Закрыть уведомление"><span class="icon-box icon-box--12" aria-hidden="true"><img class="seller-icon-img" src="prototype-library/icon-source-svg/Close.svg" alt=""></span></button></div>'
        ].join("");
      }

      function renderBottomsheet() {
        var sheetState = state.bottomsheetState;
        var rows;

        if (!sheetState) {
          bottomsheet.classList.remove("is-open");
          bottomsheet.setAttribute("aria-hidden", "true");
          return;
        }

        bottomsheet.classList.add("is-open");
        bottomsheet.setAttribute("aria-hidden", "false");
        bottomsheetTitle.textContent = sheetState.title;
        bottomsheetPrimary.textContent = sheetState.primaryLabel || "Понятно";
        bottomsheetSecondary.hidden = true;
        rows = Array.isArray(sheetState.rows) ? sheetState.rows : [];

        if (!rows.length) {
          bottomsheetContent.innerHTML = '<div class="seller-bottomsheet__row"><div class="seller-bottomsheet__row-copy"><p class="seller-bottomsheet__row-title">Нет данных</p><p class="seller-bottomsheet__row-text">Содержимое появится после обновления состояния.</p></div></div>';
          return;
        }

        bottomsheetContent.innerHTML = rows.map(function (row) {
          return [
            '<div class="seller-bottomsheet__row"><span class="seller-bottomsheet__row-icon"><span class="icon-box icon-box--20" aria-hidden="true"><img class="seller-icon-img" src="',
            row.icon,
            '" alt=""></span></span><div class="seller-bottomsheet__row-copy"><p class="seller-bottomsheet__row-title">',
            escapeHtml(row.title),
            '</p><p class="seller-bottomsheet__row-text">',
            escapeHtml(row.text || ""),
            '</p></div><p class="seller-bottomsheet__row-value">',
            escapeHtml(row.value),
            "</p></div>"
          ].join("");
        }).join("");
      }

      function openBottomsheet(type, card) {
        if (type === "statistics" && card && card.stats) {
          state.bottomsheetState = {
            title: "Статистика объявления",
            primaryLabel: "Понятно",
            rows: [
              { icon: "prototype-library/icon-source-svg/SellerEyeFill.svg", title: "Просмотры", text: "Сколько раз открывали карточку", value: String(card.stats.views) },
              { icon: "prototype-library/icon-source-svg/SellerHeartFill.svg", title: "Избранное", text: "Сколько человек сохранили товар", value: String(card.stats.favorites) },
              { icon: "prototype-library/icon-source-svg/SellerPhoneFill.svg", title: "Звонки", text: "Сколько раз нажимали на звонок", value: String(card.stats.calls) }
            ]
          };
          renderBottomsheet();
          return;
        }

        if (type === "services") {
          state.bottomsheetState = {
            title: "Услуги для объявления",
            primaryLabel: "Закрыть",
            rows: (state.services || []).map(function (service) {
              return {
                icon: service.icon,
                title: service.title,
                text: service.description,
                value: service.price
              };
            })
          };
          renderBottomsheet();
        }
      }

      function closeBottomsheet() {
        state.bottomsheetState = null;
        renderBottomsheet();
      }

      function handleAction(actionId, cardId, notificationKey) {
        var location = getCardLocation(cardId);
        var sourceCard = location ? state.cardsByTab[location.tabId][location.index] : null;
        var nextCard;

        if (!sourceCard) {
          return;
        }

        if (actionId === "services" || actionId === "renew") {
          openBottomsheet("services", sourceCard);
          return;
        }

        if (actionId === "show-notification") {
          showNotification(notificationKey || "review");
          return;
        }

        if (actionId === "edit") {
          showNotification("saved");
          return;
        }

        if (actionId === "publish") {
          removeCard(location.tabId, location.index);
          nextCard = cloneValue(sourceCard);
          nextCard.variant = "active";
          nextCard.stats = { views: 23, favorites: 12, calls: 10 };
          nextCard.oldPrice = nextCard.oldPrice || "150 000 000";
          nextCard.discount = nextCard.discount || "-10%";
          nextCard.badges = [
            { type: "premium", iconOnly: true },
            { type: "push-up", iconOnly: true },
            { type: "delivery", iconOnly: true }
          ];
          nextCard.statusTone = "muted";
          nextCard.statusText = "Осталось 29 дней";
          nextCard.actions = null;
          nextCard.promoAction = {
            id: "services",
            label: "Поднять за 15 000 сум",
            dot: true,
            icon: "prototype-library/icon-source-svg/UpAdFill.svg"
          };
          state.cardsByTab.active = [nextCard].concat(state.cardsByTab.active || []);
          state.activeTab = "active";
          showNotification("published");
          render();
          return;
        }

        if (actionId === "archive") {
          removeCard(location.tabId, location.index);
          nextCard = cloneValue(sourceCard);
          nextCard.variant = "archived";
          nextCard.statusTone = "muted";
          nextCard.statusText = "Закрыто";
          nextCard.stats = nextCard.stats || { views: 23, favorites: 12, calls: 10 };
          nextCard.promoAction = null;
          nextCard.alert = null;
          nextCard.actions = null;
          state.cardsByTab.archived = [nextCard].concat(state.cardsByTab.archived || []);
          showNotification("archived");
          render();
          return;
        }

        if (actionId === "reactivate") {
          removeCard(location.tabId, location.index);
          nextCard = cloneValue(sourceCard);
          nextCard.variant = "active";
          nextCard.stats = { views: 23, favorites: 12, calls: 10 };
          nextCard.oldPrice = nextCard.oldPrice || "150 000 000";
          nextCard.discount = nextCard.discount || "-10%";
          nextCard.badges = [
            { type: "premium", iconOnly: true },
            { type: "push-up", iconOnly: true },
            { type: "delivery", iconOnly: true }
          ];
          nextCard.statusTone = "muted";
          nextCard.statusText = "Осталось 29 дней";
          nextCard.actions = null;
          nextCard.promoAction = {
            id: "services",
            label: "Поднять за 15 000 сум",
            dot: true,
            icon: "prototype-library/icon-source-svg/UpAdFill.svg"
          };
          state.cardsByTab.active = [nextCard].concat(state.cardsByTab.active || []);
          state.activeTab = "active";
          showNotification("published");
          render();
          return;
        }

        if (actionId === "resend-review") {
          removeCard(location.tabId, location.index);
          sourceCard.variant = "underReview";
          sourceCard.alert = null;
          sourceCard.statusTone = "warning";
          sourceCard.statusText = "На проверке";
          sourceCard.actions = [
            { id: "services", label: "Реклама", icon: "prototype-library/icon-source-svg/UpAdFill.svg" }
          ];
          sourceCard.stats = { views: 23, favorites: 12, calls: 10 };
          sourceCard.badges = [
            { type: "premium", iconOnly: true },
            { type: "push-up", iconOnly: true },
            { type: "delivery", iconOnly: true }
          ];
          sourceCard.promoAction = null;
          state.cardsByTab["needs-action"] = [sourceCard].concat(state.cardsByTab["needs-action"] || []);
          state.activeTab = "needs-action";
          showNotification("review");
          render();
          return;
        }

        if (actionId === "duplicate") {
          showNotification("saved");
          return;
        }

        if (actionId === "remove") {
          removeCard(location.tabId, location.index);
          showNotification("removed");
          render();
        }
      }

      function showNotification(key) {
        state.notificationKey = key;
        renderNotification();

        if (autoHideTimer) {
          window.clearTimeout(autoHideTimer);
        }

        autoHideTimer = window.setTimeout(function () {
          hideNotification();
        }, 2600);
      }

      function hideNotification() {
        state.notificationKey = null;
        renderNotification();
      }

      function getCardById(cardId) {
        var tabIds = Object.keys(state.cardsByTab || {});
        var foundCard = null;

        tabIds.some(function (tabId) {
          foundCard = (state.cardsByTab[tabId] || []).filter(function (card) {
            return card.id === cardId;
          })[0] || null;

          return Boolean(foundCard);
        });

        return foundCard;
      }

      function getCardLocation(cardId) {
        var tabIds = Object.keys(state.cardsByTab || {});
        var result = null;

        tabIds.some(function (tabId) {
          var index = (state.cardsByTab[tabId] || []).findIndex(function (card) {
            return card.id === cardId;
          });

          if (index !== -1) {
            result = { tabId: tabId, index: index };
            return true;
          }

          return false;
        });

        return result;
      }

      function removeCard(tabId, index) {
        state.cardsByTab[tabId].splice(index, 1);
      }
    }

    function getBadgeSymbolConfig(type) {
      var map = {
        premium: { symbolId: "icon-crown-fill", iconClass: "icon--crown-fill" },
        delivery: { symbolId: "icon-track-fill", iconClass: "icon--track-fill" },
        "push-up": { symbolId: "icon-lightning-fill", iconClass: "icon--lightning-fill" },
        business: { symbolId: "icon-business-fill", iconClass: "icon--business-fill" }
      };

      return map[type] || map.business;
    }

    function getStatusClass(tone) {
      if (tone === "success") {
        return "seller-product-card__status--success";
      }

      if (tone === "warning") {
        return "seller-product-card__status--warning";
      }

      if (tone === "danger") {
        return "seller-product-card__status--danger";
      }

      return "seller-product-card__status--muted";
    }

    function cloneValue(value) {
      return JSON.parse(JSON.stringify(value));
    }

    function toKebabCase(value) {
      return String(value || "")
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .replace(/\s+/g, "-")
        .toLowerCase();
    }

    function escapeHtml(value) {
      return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }
