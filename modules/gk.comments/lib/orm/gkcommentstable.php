<?php
    /**
     *
     */

    namespace GK\COMMENTS\ORM;

    use Bitrix\Main\ArgumentException;
    use Bitrix\Main\Entity;
    use Bitrix\Main\Localization\Loc;
    use Bitrix\Main\ORM\Data\DataManager;
    use Bitrix\Main\ORM\Fields\DatetimeField;
    use Bitrix\Main\ORM\Fields\IntegerField;
    use Bitrix\Main\ORM\Fields\StringField;
    use Bitrix\Main\ORM\Fields\BooleanField;
    use Bitrix\Main\SystemException;

    Loc::loadMessages(__FILE__);

    class GkCommentsTable extends DataManager
    {
        /**
         * Returns DB table name for entity.
         *
         * @return string
         */
        public static function getTableName()
        {
            return 'gk_comments';
        }

        public static function getUfId()
        {
            return 'GK_COMMENTS';
        }

        public static function getTitle()
        {
            return "Таблица комментариев";
        }

        public static function getConnectionName()
        {
            return 'default';
        }

        /**
         * @throws ArgumentException
         * @throws SystemException
         */
        public static function getMap()
        {
            return [
                new IntegerField(
                    'ID',
                    [
                        'primary' => true,
                        'autocomplete' => true,
                    ]
                ),

                /** ID элемента, если на детальной странице */
                new IntegerField('ELEMENT_ID', ['required' => true]),

                /** Код инфоблока */
                new StringField('IBLOCK_CODE'),

                /** ID инфоблока */
                new IntegerField('IBLOCK_ID'),

                /** Если не новое сообщение, а ответ на сообщение */
                new IntegerField('PARENT_ELEMENT_ID'),

                /** Время создания сообщения */
                new DatetimeField('DATE_CREATE', ['required' => true]),

                /** Текст сообщения */
                new StringField('COMMENT'),

                /** Если пользователь зарегистрирован и авторизован */
                new IntegerField('USER_ID'),

                /** Если пользователь не авторизован, заполняются поля в форме */
                new StringField('USER_NAME'),
                new StringField('USER_LAST_NAME'),
                new StringField('USER_EMAIL'),

                /** Показывать сообщение да/нет */
                new BooleanField('SHOW',[
                    'values' => ['Y', 'N'],
                    'default_value' => 'Y',
                    'save_data_modification' => function () {
                        return [
                            function ($value) {
                                return $value === true ? 'Y' : 'N';
                            }
                        ];
                    },
                    'fetch_data_modification' => function () {
                        return [
                            function ($value) {
                                return $value === 'Y';
                            }
                        ];
                    }
                ])
            ];
        }
    }