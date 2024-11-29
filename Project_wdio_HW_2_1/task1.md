- Установить WebdriverIO
- Добавить во wdio.conf.ts путь к папке с тестами в массив specs
- Разработайте тест со следующими шагами:
  1. Открыть страницу "https://the-internet.herokuapp.com/" используя browser.url()
  2. Кликнуть по кнопке ссылке Form Authentication методом . click()
  3. Ввести валидные username/password методом setValue()
  4. Кликнуть Login
  5. Завалидировать Заголовок и описание страницы, а также текст кнопки Logout
