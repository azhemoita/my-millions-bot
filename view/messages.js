'use strict';

const messages = {
  start:
    'Добро пожаловать в калькулятор 🧮\nДля справки введите команду\t/help',
  help: '🧮 Это калькулятор-бот. Вот как им пользоваться:\n  * Можно только складывать и вычитать цифры для подсчёта и получения результирующей суммы.\n  * Между цифрами обязательно используем знак + или - . Иначе бот просто запишет введённые данные как заметку.\n  * Бот автоматически сохранит историю посчётов.\n  * Для просмотра истории нажмите кнопку [Посмотреть историю]. Если кнопки нет, введите /start\n  * Для скачивания файла с историей введите команду /check',
  noRights: '⛔ У Вас нет прав для просмотра истории записей!',
  // sumError: 'Ошибка в суммировании!',
  doNotWriteResult: '❗ Резульат не записан!',
  filesIsClear: 'Вся история удалена',
  filesDoNotClear: 'Файлы не удалось очистить из-за следующей ошибки:',
  emptyStory: 'История пуста',
  fileIsEmpty: 'Файл пустой',
  fileIsBig:
    'Файл слишком большой для скачивания.\nОграничение по размеру в 50 Мб',
};

module.exports = messages;
