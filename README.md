## Система комментариев

### local/js/gkvue3/comments
Основной экстеншен для системы комментариев

### local/components/gk/comments
Компонент, подключаемый для ведения комментариев

## Установка
- Установить модуль gk.comments
### 1 Разместить код компонента в том месте где нужны комментарии
- $APPLICATION->IncludeComponent("gk:comments", "", [],
  false
  );
### 2. Размещение кода компонента в шаблоне комплексного компонента
- Если вы хотите разместить компонент на детальной странице комплексного компонента **news**, 
  то необходимо добавить код в файл `detail.php` шаблона этого компонента.
- Для размещения компонента на странице раздела нужно внести изменения в файл `section.php`.

### 3. Размещение компонента через публичную часть
- Компонент можно добавить через публичный интерфейс стандартным способом, предусмотренным в Битрикс.
  Чтобы добавить компонент "Универсальные комментарии" из публичной части в Битрикс в секцию Гринатом, выполните следующие действия:
1. Перейдите в публичную часть сайта

Авторизуйтесь под учетной записью с правами администратора или редактора, чтобы иметь возможность добавлять компоненты.
2. Откройте нужную страницу для редактирования

Перейдите в раздел или страницу, где вы хотите разместить компонент, и включите режим редактирования (обычно кнопка "Редактировать страницу" доступна в административной панели).
3. Добавьте компонент через визуальный редактор

   Найдите блок, куда вы хотите добавить компонент.
   Нажмите "Добавить компонент".
   В списке компонентов выберите "Универсальные комментарии". В интерфейсе компонента этот блок может называться "Комментарии", 
   и он обычно находится в категории "Гринатом".

### 4. Настройка работы компонента комментариев
Компонент комментариев поддерживает два режима работы:

#### Режим ЧПУ
В режиме включенного ЧПУ никаких дополнительных настроек не требуется.

###3 Режим без ЧПУ
Если ЧПУ отключен (например, когда страницы открываются по адресам вида `/products/?SECTION_ID=1&ELEMENT_ID=155`), необходимо настроить компонент для учета таких URL.

Для этого в настройках компонента необходимо указать параметры, которые должны учитываться. Это делается с помощью свойства `ACCEPTED_URL_PARAMETERS`, в котором через запятую перечисляются нужные параметры (например, `SECTION_ID, ELEMENT_ID`).

#### Пример подключения компонента
```php
$APPLICATION->IncludeComponent(
    "gk:comments",
    "",
    [
        'ACCEPTED_URL_PARAMETERS' => 'SECTION_ID, ELEMENT_ID',
    ],
    false
);


