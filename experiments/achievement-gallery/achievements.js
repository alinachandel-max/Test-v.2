// Demonstration criteria, explicitly requested by the user; not production rules.
window.BirBirDemoAchievements = [
  {id:'seller',title:'Продавец BirBir',icon:'seller',criteria:[
    {title:'Первое объявление',description:'Опубликовано на BirBir',done:true},
    {title:'Фотографии загружены',description:'Покупатели видят товар',done:true}
  ]},
  {id:'verified',title:'Проверенный',icon:'verified',action:'Подтвердить личность',nextStep:'Осталось подтвердить личность через MyID. После этого достижение будет получено.',criteria:[
    {title:'Телефон проверен',description:'С помощью кода из СМС',done:true},
    {title:'Личность подтверждена',description:'Пройдите проверку MyID',done:false}
  ]},
  {id:'shop',title:'Магазин',icon:'store',action:'Добавить товар',nextStep:'Добавьте ещё два товара: для этого достижения нужно пять объявлений на витрине.',criteria:[
    {title:'Профиль магазина',description:'Название и описание есть',done:true},
    {title:'5 товаров на витрине',description:'Сейчас опубликовано 3 из 5',done:false}
  ]},
  {id:'top',title:'Топ продавец',icon:'top-seller',action:'Попросить отзыв',nextStep:'Попросите покупателей оставить отзыв после сделки. Осталось получить ещё шесть отзывов.',criteria:[
    {title:'Высокий рейтинг',description:'Средняя оценка — 4,9',done:true},
    {title:'10 отзывов покупателей',description:'Получено 4 из 10 отзывов',done:false}
  ]},
  {id:'pro',title:'Pro',icon:'pro',action:'Дополнить объявление',nextStep:'Добавьте характеристики и подробное описание товара в своё объявление.',criteria:[
    {title:'Качественные фото',description:'Фото есть в объявлениях',done:true},
    {title:'Подробное описание',description:'Добавьте характеристики',done:false}
  ]},
  {id:'active',title:'Активный',icon:'active',criteria:[
    {title:'Быстро отвечает',description:'Обычно в течение 15 минут',done:true},
    {title:'В сети 7 дней подряд',description:'Активность каждый день',done:true}
  ]}
];
