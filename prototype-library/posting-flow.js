(function () {
  "use strict";

  var root = document.querySelector("[data-posting-root]");
  if (!root) {
    return;
  }

  var ASSET_DIR = "assets/posting-flow/";
  var content = root.querySelector("[data-posting-content]");
  var progress = root.querySelector("[data-posting-progress]");
  var nextButton = root.querySelector("[data-posting-next]");
  var backButton = root.querySelector("[data-posting-back]");
  var galleryOverlay = root.querySelector("[data-posting-gallery]");
  var galleryGrid = root.querySelector("[data-posting-gallery-grid]");
  var sheetOverlay = root.querySelector("[data-posting-sheet]");
  var sheetClose = sheetOverlay.querySelector(".posting-gallery__link[data-posting-close-sheet]");
  var sheetTitle = root.querySelector("[data-posting-sheet-title]");
  var sheetList = root.querySelector("[data-posting-sheet-list]");
  var successOverlay = root.querySelector("[data-posting-success]");
  var themeMeta = document.querySelector('meta[name="theme-color"]');
  var keyboard = root.querySelector("[data-posting-keyboard]");
  var returnTimer = null;
  var HAPTIC_PATTERNS = {
    success: [28, 36, 48]
  };

  var photos = [
    "photo-01.png",
    "photo-02.png",
    "photo-03.png",
    "photo-04.png",
    "photo-05.png",
    "photo-06.png",
    "photo-07.png",
    "photo-08.png",
    "photo-09.png",
    "photo-10.png"
  ];

  var state = {
    step: 0,
    selectedGalleryIndex: 0,
    photosAdded: false,
    title: "",
    category: "Диваны",
    subcategory: "Кровати диваны и кресла",
    condition: "",
    size: "",
    brand: "",
    rent: "",
    season: "Лето",
    length: "",
    description: "",
    priceMode: "paid",
    price: "",
    currency: "sum",
    bargain: false,
    address: "Ташкент, Красногорский район, улица Алишера Навои, 34",
    landmark: "Алайский рынок",
    delivery: true,
    contactName: "Алина",
    phoneOn: true,
    telegramOn: true,
    errors: {}
  };

  var steps = [
    { id: "photos", title: "Фото" },
    { id: "title", title: "Название" },
    { id: "category", title: "Категория" },
    { id: "details", title: "Характеристики" },
    { id: "description", title: "Описание" },
    { id: "price", title: "Цена" },
    { id: "place", title: "Место сделки" },
    { id: "contacts", title: "Контакты" }
  ];

  var sheets = {
    category: {
      title: "Категории",
      field: "category",
      options: [
        { label: "Все категории", value: "Все категории", icon: "" },
        { label: "Электроника", value: "Электроника", icon: "Electronics.png" },
        { label: "Бытовая техника", value: "Бытовая техника", icon: "Appliances.png" },
        { label: "Мебель и интерьер", value: "Мебель и интерьер", icon: "Home.png" },
        { label: "Красота и здоровье", value: "Красота и здоровье", icon: "Wellness.png" },
        { label: "Одежда и обувь", value: "Одежда и обувь", icon: "Clothes.png" },
        { label: "Аксессуары и украшения", value: "Аксессуары и украшения", icon: "Accessories.png" },
        { label: "Для детей", value: "Для детей", icon: "Children.png" },
        { label: "Стройка и ремонт", value: "Стройка и ремонт", icon: "Renovation.png" }
      ]
    },
    subcategory: {
      title: "Подкатегория",
      field: "subcategory",
      options: [
        { label: "Смартфоны", value: "Смартфоны" },
        { label: "Аксессуары", value: "Аксессуары" },
        { label: "Ноутбуки", value: "Ноутбуки" },
        { label: "Наушники", value: "Наушники" }
      ]
    },
    size: {
      title: "Размер",
      field: "size",
      options: [
        { label: "Односпальный", value: "Односпальный" },
        { label: "Полуторный", value: "Полуторный" },
        { label: "Двуспальный", value: "Двуспальный" },
        { label: "Другой", value: "Другой" }
      ]
    },
    brand: {
      title: "Бренд",
      field: "brand",
      options: [
        { label: "Apple", value: "Apple" },
        { label: "Samsung", value: "Samsung" },
        { label: "Xiaomi", value: "Xiaomi" },
        { label: "Другое", value: "Другое" }
      ]
    }
  };

  render();
  renderGallery();

  document.addEventListener("click", function (event) {
    var target = event.target;
    var openPhoto = target.closest("[data-posting-open-photo]");
    var closeGallery = target.closest("[data-posting-close-gallery]");
    var selectPhoto = target.closest("[data-posting-select-photo]");
    var galleryPhoto = target.closest("[data-posting-gallery-photo]");
    var sheetOpen = target.closest("[data-posting-sheet-open]");
    var sheetValue = target.closest("[data-posting-sheet-value]");
    var closeSheet = target.closest("[data-posting-close-sheet]");
    var closeSuccess = target.closest("[data-posting-close-success]");
    var chip = target.closest("[data-posting-chip]");
    var checkbox = target.closest("[data-posting-checkbox]");
    var toggle = target.closest("[data-posting-toggle]");
    var categoryOption = target.closest("[data-posting-category-option]");
    var categoryPicker = target.closest("[data-posting-category-picker]");

    if (openPhoto) {
      showOverlay(galleryOverlay);
      return;
    }

    if (closeGallery) {
      hideOverlay(galleryOverlay);
      return;
    }

    if (galleryPhoto) {
      state.selectedGalleryIndex = Number(galleryPhoto.getAttribute("data-posting-gallery-photo") || 0);
      renderGallery();
      return;
    }

    if (selectPhoto) {
      state.photosAdded = true;
      state.errors.photos = false;
      hideOverlay(galleryOverlay);
      render();
      return;
    }

    if (sheetOpen) {
      openSheet(sheetOpen.getAttribute("data-posting-sheet-open"));
      return;
    }

    if (categoryOption) {
      setCategory(categoryOption.getAttribute("data-posting-category-option"));
      return;
    }

    if (categoryPicker) {
      openSheet("category");
      return;
    }

    if (sheetValue) {
      setSheetValue(sheetValue.getAttribute("data-posting-sheet-value"));
      return;
    }

    if (closeSheet) {
      hideOverlay(sheetOverlay);
      return;
    }

    if (closeSuccess) {
      closeSuccessFlow();
      return;
    }

    if (chip) {
      handleChip(chip);
      return;
    }

    if (checkbox) {
      handleCheckbox(checkbox);
      return;
    }

    if (toggle) {
      handleToggle(toggle);
    }
  });

  document.addEventListener("input", function (event) {
    var field = event.target.closest("[data-posting-field]");
    if (!field) {
      return;
    }
    state[field.getAttribute("data-posting-field")] = event.target.value;
    state.errors[field.getAttribute("data-posting-field")] = false;
  });

  document.addEventListener("focusin", function (event) {
    if (event.target.matches(".posting-input, .posting-textarea")) {
      showKeyboard();
    }
  });

  document.addEventListener("focusout", function (event) {
    if (event.target.matches(".posting-input, .posting-textarea")) {
      window.setTimeout(hideKeyboard, 120);
    }
  });

  nextButton.addEventListener("click", function () {
    if (!validateStep()) {
      render();
      return;
    }

    if (state.step === steps.length - 1) {
      publish();
      return;
    }

    state.step += 1;
    state.errors = {};
    hideKeyboard();
    render();
    window.scrollTo({ top: 0, behavior: "instant" });
  });

  backButton.addEventListener("click", function () {
    if (state.step === 0) {
      window.location.href = "seller-cabinet-screen.html";
      return;
    }
    state.step -= 1;
    state.errors = {};
    hideKeyboard();
    render();
    window.scrollTo({ top: 0, behavior: "instant" });
  });

  function render() {
    renderProgress();
    root.setAttribute("data-posting-step", steps[state.step].id);
    nextButton.textContent = state.step === steps.length - 1 ? "Опубликовать" : "Продолжить";

    if (state.step === 0) {
      content.innerHTML = renderPhotoStep();
    } else if (state.step === 1) {
      content.innerHTML = renderTitleStep();
    } else if (state.step === 2) {
      content.innerHTML = renderCategoryStep();
    } else if (state.step === 3) {
      content.innerHTML = renderDetailsStep();
    } else if (state.step === 4) {
      content.innerHTML = renderDescriptionStep();
    } else if (state.step === 5) {
      content.innerHTML = renderPriceStep();
    } else if (state.step === 6) {
      content.innerHTML = renderPlaceStep();
    } else {
      content.innerHTML = renderContactsStep();
    }
  }

  function renderProgress() {
    progress.innerHTML = steps.map(function (_, index) {
      return '<span class="posting-progress__step' + (index <= state.step ? " is-active" : "") + '"></span>';
    }).join("");
  }

  function renderPhotoStep() {
    return [
      '<section class="posting-panel">',
      '<div class="posting-heading">',
      '<h1 class="posting-title">Фото (до 10)</h1>',
      '<p class="posting-subtitle">Фото должно быть меньше 10 мб<br>и с разрешением не ниже 300 × 300.</p>',
      "</div>",
      '<div class="posting-photo-body">',
      state.photosAdded ? renderPhotoGrid() : renderEmptyPhoto(),
      renderPromoCard(),
      "</div>",
      "</section>"
    ].join("");
  }

  function renderEmptyPhoto() {
    return [
      '<div>',
      '<button class="posting-photo-zone',
      state.errors.photos ? " is-error" : "",
      '" type="button" data-posting-open-photo aria-label="Добавить фото">',
      '<span class="posting-plus" aria-hidden="true"></span>',
      "</button>",
      '<p class="posting-error">Добавьте хотя бы одно фото</p>',
      "</div>"
    ].join("");
  }

  function renderPhotoGrid() {
    return [
      '<div class="posting-photo-grid">',
      photos.map(function (photo, index) {
        if (index === 9) {
          return '<button class="posting-photo-tile posting-photo-tile--add" type="button" data-posting-open-photo><span class="posting-plus" aria-hidden="true"></span></button>';
        }
        return [
          '<div class="posting-photo-tile">',
          '<img src="',
          ASSET_DIR,
          photo,
          '" alt="">',
          index === 0 ? '<span class="posting-photo-badge">Главная</span>' : "",
          "</div>"
        ].join("");
      }).join(""),
      "</div>"
    ].join("");
  }

  function renderPromoCard() {
    return [
      '<article class="posting-promo-card">',
      '<div class="posting-promo-card__copy">',
      '<p class="posting-promo-card__title">Как сделать<br>идеальное фото?</p>',
      '<span class="posting-promo-card__badge"><span class="posting-promo-card__badge-text">Больше показов</span><img class="posting-promo-card__badge-icon" src="',
      ASSET_DIR,
      'promo-arrow-up-circle.svg" alt=""></span>',
      "</div>",
      '<img class="posting-promo-card__image" src="',
      ASSET_DIR,
      'promo-photo.png" alt="">',
      "</article>"
    ].join("");
  }

  function renderTitleStep() {
    return [
      '<section class="posting-panel posting-panel--title">',
      '<div class="posting-heading">',
      '<h1 class="posting-title">Название</h1>',
      "</div>",
      renderTitleField(),
      "</section>"
    ].join("");
  }

  function renderCategoryStep() {
    var categories = [
      {
        title: "Диваны",
        captionLines: [
          "Мебель и интерьер · Мебель и",
          "предметы интерьера · Кровати диваны и кресла"
        ]
      },
      {
        title: "Кровати",
        captionLines: [
          "Мебель и интерьер · Мебель и",
          "предметы интерьера · Кровати диваны и кресла"
        ]
      },
      {
        title: "Спальные гарнитуры",
        captionLines: ["Мебель и интерьер"]
      }
    ];

    if (state.errors.category && !state.category) {
      return [
        '<section class="posting-panel posting-panel--category">',
        '<p class="posting-label posting-label--standalone">Категория <span class="posting-required">*</span></p>',
        '<div class="posting-category-empty">',
        '<span class="posting-category-empty__icon" aria-hidden="true"></span>',
        '<p class="posting-category-empty__title">Категория не определена</p>',
        '<p class="posting-category-empty__text">Выберите категорию самостоятельно, чтобы продолжить.</p>',
        "</div>",
        '<button class="posting-secondary-button" type="button" data-posting-category-picker>Выбрать категорию</button>',
        '<p class="posting-error posting-error--visible">Выберите категорию</p>',
        "</section>"
      ].join("");
    }

    return [
      '<section class="posting-panel posting-panel--category">',
      '<div class="posting-title-row">',
      '<h1 class="posting-title">Категория</h1>',
      '<img class="posting-title-row__icon" src="',
      ASSET_DIR,
      'category-ai.svg?v=20260704-posting-flow-v23" alt="">',
      "</div>",
      '<div class="posting-category-list">',
      categories.map(renderCategoryOption).join(""),
      '<button class="posting-secondary-button" type="button" data-posting-category-picker>Другая категория</button>',
      "</div>",
      "</section>"
    ].join("");
  }

  function renderDetailsStep() {
    return [
      '<section class="posting-panel posting-panel--details">',
      '<div class="posting-heading">',
      '<h1 class="posting-title">Характеристики</h1>',
      "</div>",
      '<div class="posting-field',
      state.errors.condition ? " is-error" : "",
      '">',
      '<p class="posting-label">Состояние<span class="posting-required">*</span></p>',
      '<div class="posting-chip-row">',
      renderChip("condition", "Новое", state.condition),
      renderChip("condition", "Б/у", state.condition),
      "</div>",
      '<p class="posting-error">Выберите вариант</p>',
      "</div>",
      renderSelectField("size", "Размер", state.size || "Выберите значение", false),
      renderSelectField("brand", "Бренд", state.brand || "Выберите значение", false),
      '<div class="posting-field">',
      '<p class="posting-label">Готовы сдать в аренду?</p>',
      '<div class="posting-chip-row">',
      renderChip("rent", "Да", state.rent),
      renderChip("rent", "Нет", state.rent),
      "</div>",
      "</div>",
      renderTextField("season", "Сезон", "Введите значение", state.season, false, "Введите значение"),
      renderTextField("length", "Длина", "Введите значение", state.length, false, "Введите значение"),
      "</section>"
    ].join("");
  }

  function renderDescriptionStep() {
    var count = trim(state.description).length;
    return [
      '<section class="posting-panel posting-panel--description">',
      '<div class="posting-heading">',
      '<h1 class="posting-title">Описание</h1>',
      '<p class="posting-subtitle">Например: Продаю кроссовки,<br>так как не подошёл размер. Состояние<br>отличное — носились всего пару раз.</p>',
      "</div>",
      '<label class="posting-description-field">',
      '<textarea class="posting-textarea posting-textarea--description" data-posting-field="description" maxlength="50" placeholder="Введите описание">',
      escapeHtml(state.description),
      "</textarea>",
      '<span class="posting-description-counter">',
      String(count),
      "/50</span>",
      "</label>",
      "</section>"
    ].join("");
  }

  function renderPriceStep() {
    var priceRequired = state.priceMode === "paid";
    return [
      '<section class="posting-panel posting-panel--price">',
      '<div class="posting-section posting-section--compact">',
      '<h1 class="posting-title">Условия</h1>',
      '<div class="posting-chip-row">',
      renderChip("priceMode", "Указать цену", state.priceMode, "paid"),
      renderChip("priceMode", "Отдам даром", state.priceMode, "free"),
      renderChip("priceMode", "Цена договорная", state.priceMode, "negotiable"),
      "</div>",
      "</div>",
      '<div class="posting-section">',
      '<div class="posting-field',
      state.errors.price ? " is-error" : "",
      '">',
      '<p class="posting-label">Цена',
      priceRequired ? '<span class="posting-required">*</span>' : "",
      "</p>",
      '<div class="posting-price-row">',
      '<input class="posting-input" data-posting-field="price" type="text" inputmode="numeric" placeholder="Введите цену" value="',
      escapeHtml(state.price),
      '"',
      state.priceMode !== "paid" ? " disabled" : "",
      ">",
      '<div class="posting-currency-tabs">',
      renderChip("currency", "Сум", state.currency, "sum"),
      renderChip("currency", "у.е", state.currency, "usd"),
      "</div>",
      "</div>",
      '<p class="posting-error">Введите цену</p>',
      "</div>",
      '<div class="posting-checkbox-row">',
      '<button class="posting-checkbox',
      state.bargain ? " is-checked" : "",
      '" type="button" data-posting-checkbox="bargain" aria-label="Возможен торг"></button>',
      '<div><p class="posting-contact-card__title">Возможен торг</p><a class="posting-link" href="#">Подробнее</a></div>',
      "</div>",
      "</div>",
      "</section>"
    ].join("");
  }

  function renderPlaceStep() {
    return [
      '<section class="posting-panel posting-panel--place">',
      '<div class="posting-place-deal">',
      '<h1 class="posting-title">Место сделки</h1>',
      '<div class="posting-map"><img src="',
      ASSET_DIR,
      'map.png?v=20260704-posting-flow-v23" alt=""></div>',
      '<a class="posting-location-link" href="#"><span class="posting-location-icon" aria-hidden="true"><img src="',
      ASSET_DIR,
      'navigation-fill.svg?v=20260704-posting-flow-v1" alt=""></span>Определить моё местоположение</a>',
      "</div>",
      '<div class="posting-place-fields">',
      renderTextField("address", "Адрес", "Введите адрес", state.address, true),
      renderTextField("landmark", "Ориентир", "Например, Алайский рынок", state.landmark, true),
      '<div class="posting-checkbox-row">',
      '<button class="posting-checkbox',
      state.delivery ? " is-checked" : "",
      '" type="button" data-posting-checkbox="delivery" aria-label="Могу организовать доставку"></button>',
      '<p class="posting-contact-card__title">Могу организовать доставку</p>',
      "</div>",
      "</div>",
      "</section>"
    ].join("");
  }

  function renderContactsStep() {
    return [
      '<section class="posting-panel posting-panel--contacts-main">',
      '<div class="posting-heading">',
      '<h1 class="posting-title">Контакты</h1>',
      "</div>",
      renderTextField("contactName", "Имя", "Ваше имя или ник", state.contactName, true),
      "</section>",
      '<section class="posting-panel posting-panel--contacts-options">',
      '<p class="posting-label">Способы связи с вами</p>',
      renderContactCard("chat", "Чат BirBir", "Включен по умолчанию", true),
      renderContactCard("phone", "Звонки по телефону", "", state.phoneOn),
      renderContactCard("telegram", "Чат в телеграм", "по номеру 998903212774", state.telegramOn),
      "</section>"
    ].join("");
  }

  function renderTextField(field, label, placeholder, value, required, errorText) {
    return [
      '<label class="posting-field',
      state.errors[field] ? " is-error" : "",
      '">',
      '<span class="posting-label">',
      escapeHtml(label),
      required ? '<span class="posting-required">*</span>' : "",
      "</span>",
      '<input class="posting-input" data-posting-field="',
      escapeHtml(field),
      '" type="text" placeholder="',
      escapeHtml(placeholder),
      '" value="',
      escapeHtml(value || ""),
      '">',
      '<span class="posting-error">',
      escapeHtml(errorText || "Заполните поле"),
      "</span>",
      "</label>"
    ].join("");
  }

  function renderTitleField() {
    var count = trim(state.title).length;
    return [
      '<label class="posting-title-field',
      state.errors.title ? " is-error" : "",
      '">',
      '<input class="posting-input" data-posting-field="title" type="text" maxlength="50" placeholder="Например, iphone 13 PRO, 256 ГБ" value="',
      escapeHtml(state.title || ""),
      '">',
      '<span class="posting-field-meta">',
      '<span class="posting-error posting-error--inline">Введите название</span>',
      '<span class="posting-counter">',
      String(count),
      "/50</span>",
      "</span>",
      "</label>"
    ].join("");
  }

  function renderSelectField(field, label, value, required) {
    return [
      '<div class="posting-field',
      state.errors[field] ? " is-error" : "",
      '">',
      '<p class="posting-label">',
      escapeHtml(label),
      required ? '<span class="posting-required">*</span>' : "",
      "</p>",
      '<button class="posting-select-field" type="button" data-posting-sheet-open="',
      escapeHtml(field),
      '">',
      '<span>',
      escapeHtml(value),
      "</span>",
      "</button>",
      '<p class="posting-error">Выберите вариант</p>',
      "</div>"
    ].join("");
  }

  function renderChip(group, label, currentValue, value) {
    var chipValue = value || label;
    return [
      '<button class="posting-chip',
      currentValue === chipValue ? " is-selected" : "",
      '" type="button" data-posting-chip="',
      escapeHtml(group),
      '" data-posting-chip-value="',
      escapeHtml(chipValue),
      '">',
      escapeHtml(label),
      "</button>"
    ].join("");
  }

  function renderCategoryOption(option) {
    var selected = state.category === option.title;
    return [
      '<button class="posting-category-option',
      selected ? " is-selected" : "",
      '" type="button" data-posting-category-option="',
      escapeHtml(option.title),
      '">',
      '<span class="posting-category-option__copy">',
      '<span class="posting-category-option__title">',
      escapeHtml(option.title),
      "</span>",
      '<span class="posting-category-option__caption">',
      option.captionLines.map(function (line) {
        return '<span class="posting-category-option__caption-line">' + escapeHtml(line) + "</span>";
      }).join(""),
      "</span>",
      "</span>",
      '<span class="posting-radio" aria-hidden="true"></span>',
      "</button>"
    ].join("");
  }

  function renderContactCard(type, title, caption, on) {
    var icon = type === "telegram" ? "telegram.svg" : "phone.svg";
    var colorClass = type === "telegram" ? " posting-contact-card__icon--telegram" : "";
    if (type === "phone") {
      colorClass = " posting-contact-card__icon--phone";
    }
    if (type === "chat") {
      colorClass = " posting-contact-card__icon--chat";
      icon = "chat-birbir.svg";
    }
    return [
      '<article class="posting-contact-card">',
      '<span class="posting-contact-card__icon',
      colorClass,
      '">',
      '<img src="' + ASSET_DIR + icon + '?v=20260704-posting-flow-v23" alt="">',
      "</span>",
      '<div class="posting-contact-card__body">',
      '<p class="posting-contact-card__title">',
      escapeHtml(title),
      "</p>",
      caption ? '<p class="posting-contact-card__caption">' + escapeHtml(caption) + "</p>" : "",
      "</div>",
      type === "chat" ? "" : '<button class="posting-toggle' + (on ? " is-on" : "") + '" type="button" data-posting-toggle="' + escapeHtml(type) + '" aria-pressed="' + String(on) + '"></button>',
      "</article>"
    ].join("");
  }

  function renderGallery() {
    galleryGrid.innerHTML = photos.map(function (photo, index) {
      return [
        '<button class="posting-gallery__photo',
        state.selectedGalleryIndex === index ? " is-selected" : "",
        '" type="button" data-posting-gallery-photo="',
        String(index),
        '"><img src="',
        ASSET_DIR,
        photo,
        '" alt=""></button>'
      ].join("");
    }).join("");
  }

  function validateStep() {
    var ok = true;
    state.errors = {};

    if (state.step === 0 && !state.photosAdded) {
      state.errors.photos = true;
      ok = false;
    }

    if (state.step === 1 && !trim(state.title)) {
      state.errors.title = true;
      ok = false;
    }

    if (state.step === 2) {
      if (!state.category) {
        state.errors.category = true;
        ok = false;
      }
    }

    if (state.step === 3 && !state.condition) {
      state.errors.condition = true;
      ok = false;
    }

    if (state.step === 5 && state.priceMode === "paid" && !trim(state.price)) {
      state.errors.price = true;
      ok = false;
    }

    if (state.step === 6) {
      if (!trim(state.address)) {
        state.errors.address = true;
        ok = false;
      }
      if (!trim(state.landmark)) {
        state.errors.landmark = true;
        ok = false;
      }
    }

    if (state.step === 7 && !trim(state.contactName)) {
      state.errors.contactName = true;
      ok = false;
    }

    return ok;
  }

  function handleChip(chip) {
    var group = chip.getAttribute("data-posting-chip");
    var value = chip.getAttribute("data-posting-chip-value");
    state[group] = value;
    state.errors[group] = false;
    if (group === "priceMode" && value !== "paid") {
      state.price = "";
      state.errors.price = false;
    }
    render();
  }

  function handleCheckbox(button) {
    var field = button.getAttribute("data-posting-checkbox");
    state[field] = !state[field];
    render();
  }

  function handleToggle(button) {
    var type = button.getAttribute("data-posting-toggle");
    if (type === "phone") {
      state.phoneOn = !state.phoneOn;
    }
    if (type === "telegram") {
      state.telegramOn = !state.telegramOn;
    }
    render();
  }

  function openSheet(name) {
    var sheet = sheets[name];
    if (!sheet) {
      return;
    }
    sheetOverlay.setAttribute("data-posting-active-sheet", name);
    sheetOverlay.classList.toggle("posting-overlay--category", name === "category");
    sheetTitle.textContent = sheet.title;
    sheetClose.textContent = name === "category" ? "×" : "Отмена";
    sheetClose.setAttribute("aria-label", name === "category" ? "Закрыть" : "Отмена");
    sheetList.innerHTML = (name === "category" ? '<div class="posting-category-search">Найти</div>' : "") + sheet.options.map(function (option) {
      var selected = state[sheet.field] === option.value;
      if (name === "category") {
        return [
          '<button class="posting-sheet-option posting-sheet-option--category',
          selected ? " is-selected" : "",
          '" type="button" data-posting-sheet-value="',
          escapeHtml(option.value),
          '">',
          '<span class="posting-sheet-option__main">',
          option.icon
            ? '<span class="posting-sheet-option__icon"><img src="assets/category/' + escapeHtml(option.icon) + '" alt=""></span>'
            : '<span class="posting-sheet-option__icon posting-sheet-option__icon--all" aria-hidden="true"></span>',
          '<span>',
          escapeHtml(option.label),
          "</span>",
          "</span>",
          '<span class="posting-sheet-option__chevron" aria-hidden="true"></span>',
          "</button>"
        ].join("");
      }
      return [
        '<button class="posting-sheet-option',
        selected ? " is-selected" : "",
        '" type="button" data-posting-sheet-value="',
        escapeHtml(option.value),
        '">',
        escapeHtml(option.label),
        "</button>"
      ].join("");
    }).join("");
    showOverlay(sheetOverlay);
  }

  function setSheetValue(value) {
    var active = sheetOverlay.getAttribute("data-posting-active-sheet");
    var sheet = sheets[active];
    if (!sheet) {
      return;
    }
    state[sheet.field] = value;
    state.errors[sheet.field] = false;
    if (sheet.field === "category") {
      setCategory(value);
      return;
    }
    hideOverlay(sheetOverlay);
    render();
  }

  function setCategory(value) {
    state.category = value || "";
    state.subcategory = state.category ? "Кровати диваны и кресла" : "";
    state.errors.category = false;
    state.errors.subcategory = false;
    hideOverlay(sheetOverlay);
    render();
  }

  function showOverlay(node) {
    node.hidden = false;
    node.setAttribute("aria-hidden", "false");
  }

  function hideOverlay(node) {
    node.hidden = true;
    node.setAttribute("aria-hidden", "true");
    if (node === sheetOverlay) {
      node.classList.remove("posting-overlay--category");
    }
  }

  function showKeyboard() {
    root.classList.add("is-keyboard-open");
    keyboard.hidden = false;
  }

  function hideKeyboard() {
    root.classList.remove("is-keyboard-open");
    keyboard.hidden = true;
  }

  function publish() {
    hideKeyboard();
    window.clearTimeout(returnTimer);
    root.classList.add("is-success-open");
    if (themeMeta) {
      themeMeta.setAttribute("content", "#d9f2dd");
    }
    showOverlay(successOverlay);
    successOverlay.classList.remove("is-running");
    successOverlay.offsetHeight;
    successOverlay.classList.add("is-running");
    triggerPostingHaptic("success");
  }

  function closeSuccessFlow() {
    window.clearTimeout(returnTimer);
    if (themeMeta) {
      themeMeta.setAttribute("content", "#ffffff");
    }
    window.location.href = "seller-cabinet-screen.html";
  }

  function triggerPostingHaptic(type) {
    var pattern = HAPTIC_PATTERNS[type];

    try {
      if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.HapticFeedback) {
        if (type === "success" && typeof window.Telegram.WebApp.HapticFeedback.notificationOccurred === "function") {
          window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");
          return;
        }

        if (typeof window.Telegram.WebApp.HapticFeedback.impactOccurred === "function") {
          window.Telegram.WebApp.HapticFeedback.impactOccurred("light");
          return;
        }
      }
    } catch (error) {}

    try {
      if (window.navigator && typeof window.navigator.vibrate === "function" && pattern) {
        window.navigator.vibrate(pattern);
      }
    } catch (error) {}
  }

  function trim(value) {
    return String(value || "").trim();
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
})();
