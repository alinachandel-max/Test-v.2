// Figma overview states; detailed criteria are demo examples, not production rules.
window.BirBirDemoAchievements = [
  {id:'seller',title:'Старт на BirBir',icon:'seller',group:'level',action:'Добавить фото',nextStep:'Добавьте фото профиля или выберите аватар из набора.',overview:{title:'Добавить фото профиля',description:'Или выбрать из набора',button:'Добавить фото'},criteria:[
    {title:'Профиль создан',description:'Вы зарегистрированы на BirBir',done:true},
    {id:'profile-photo',title:'Фото профиля',description:'Добавьте фото или выберите аватар',done:false}
  ]},
  {id:'verified',title:'Проверенный',icon:'verified',group:'level',action:'Пройти проверку',nextStep:'Осталось подтвердить личность через MyID. После этого достижение будет получено.',overview:{title:'Пройти проверку ID',description:'Через сервис MyID',button:'Пройти проверку'},criteria:[
    {title:'Телефон проверен',description:'С помощью кода из СМС',done:true},
    {title:'Личность подтверждена',description:'Пройдите проверку MyID',done:false}
  ]},
  {id:'active',title:'Активный',icon:'active',lockedIcon:'active-locked',group:'level',locked:true,prerequisite:'verified',action:'Продолжить',nextStep:'Отвечайте покупателям и возвращайтесь в приложение. Эти условия показаны для демонстрации.',overview:{title:'Общаться с покупателями',description:'Отвечайте на сообщения',button:'Продолжить'},criteria:[
    {title:'Быстро отвечает',description:'Отвечайте в течение 15 минут',done:false},
    {title:'В сети 7 дней подряд',description:'Возвращайтесь каждый день',done:false}
  ]},
  {id:'top',title:'Топ-продавец',icon:'top-seller',lockedIcon:'top-seller-locked',group:'level',locked:true,prerequisite:'active',action:'Попросить отзыв',nextStep:'Попросите покупателей оставить отзыв после сделки. Условия показаны для демонстрации.',overview:{title:'Получить отзывы покупателей',description:'После успешных сделок',button:'Попросить отзыв'},criteria:[
    {title:'Высокий рейтинг',description:'Поддерживайте оценку от 4,8',done:false},
    {title:'10 отзывов покупателей',description:'Получайте отзывы после сделок',done:false}
  ]},
  {id:'pro',title:'PRO профиль',icon:'pro',group:'business',badge:'PRO',action:'Подробнее',nextStep:'Профиль PRO помогает подробнее представить ваши товары и услуги. Здесь показан демонстрационный сценарий.',criteria:[
    {title:'Качественные фото',description:'Фото есть в объявлениях',done:true},
    {title:'Подробное описание',description:'Добавьте характеристики',done:false}
  ]},
  {id:'shop',title:'Магазин',icon:'store',group:'business',badge:'Магазин',action:'Подробнее',nextStep:'Магазин объединяет ваши товары на одной витрине. Здесь показан демонстрационный сценарий.',criteria:[
    {title:'Профиль магазина',description:'Название и описание есть',done:true},
    {title:'5 товаров на витрине',description:'Сейчас опубликовано 3 из 5',done:false}
  ]}
];
