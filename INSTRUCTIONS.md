## Система комментариев

### local/js/gkvue3/comments
Основной экстеншен для системы комментариев

Получение кол-во списка комментов по умолчанию 10, последние добавленные.
при запросе списка комментов передается адрес страницы, потом выбирается по фильтру. Если на странице или разделе есть комментарии то они выведутся только для текущей страницы.
За это отвечает параметр path

### Необходимо дополнительно реализовать
- добавить форму для авторизованного пользователя. в шапке вместо "Аноним" появляется иконка аватарка, если нет аватарки можно первые буквы фамилии и имени справа Имя
- добавить кнопки комментировать сообщение - для всех, удалить сообщение
- при комментировании сообщения генерировать форму по нажатию на 
- удалять может администратор, автор только свои
- добавить для автора кнопку "изменить сообщение"
- дописать стили для форм
- для автора свои сообщения справа, остальные слева
- стили на flexbox