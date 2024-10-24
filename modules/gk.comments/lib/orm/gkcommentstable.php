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
                new IntegerField('ELEMENT_ID', ['required' => true]),
                new IntegerField('PARENT_ELEMENT_ID'),
                new DatetimeField('DATE_CREATE', ['required' => true]),
                new StringField('COMMENT'),
            ];
        }
    }