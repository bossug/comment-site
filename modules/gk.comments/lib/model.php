<?php
namespace GK\COMMENTS;

use Bitrix\Highloadblock\HighloadBlockTable;
use Bitrix\Iblock\IblockTable;
use Bitrix\Main\Loader;
use Bitrix\Main\ORM;

class GkComments
{
    public static function parseUrlQuery($query, $params)
    {
        $reqister = explode(",", $params);
        $query = trim($query, '?');
        $listQuery = explode("&", $query);
        foreach ($listQuery as $v) {
            [$key, $value] = explode("=", $v);
            if (in_array($key, $reqister)) {
                $newQuery[] = $key . "=" . $value;
            }
        }
        return implode("&", $newQuery);
    }
}
