<?php

namespace GK\COMMENTS\Controller;

use Bitrix\Main\Application;
use Bitrix\Main\Context;
use Bitrix\Main\DB\SqlException;
use Bitrix\Main\DB\SqlExpression;
use Bitrix\Main\Diag\Debug;
use Bitrix\Main\Engine\Controller;
use Bitrix\Main\Engine\ActionFilter;
use Bitrix\Main\Type\DateTime;
use GK\COMMENTS\ORM\GkCommentsTable;
use Widgets\Astra\Option;

class ResponseGkComments extends Controller
{
    public static $pages = 10;
    public static $isAdmin = false;
    public static $isUser = false;
    public static $userId = 0;
    public static $setHome = 'N';
    public static $setChpu = 'N';
    public static $path;
    public static $query;
    public static $setCount;
    public static $isAcceptedUrlParameters = "";
	public function configureActions(): array
	{
		return [
			'save' => [
				'prefilters' => [
					new ActionFilter\Authentication(),
					new ActionFilter\HttpMethod([
						ActionFilter\HttpMethod::METHOD_POST,
					]),
					new ActionFilter\Csrf(),
				],
				'postfilters' => [],
			],
            'getComment' => [
                'prefilters' => []
            ],
            'setComment' => [
                'prefilters' => []
            ],
            'delComment' => ['prefilters' => []],
            'editComment' => ['prefilters' => []],
		];
	}

    /**
     * @throws \Exception
     */
    public function setCommentAction()
    {
        self::$setChpu = \Bitrix\Main\Config\Option::get('gk.comments','setChpu');
        self::$setHome = \Bitrix\Main\Config\Option::get('gk.comments','setHome');
        self::$setCount = \Bitrix\Main\Config\Option::get('gk.comments','setCount');
        $request = Application::getInstance()->getContext()->getRequest();
        self::$path = $request->getPost('path');
        self::$userId = \Bitrix\Main\Engine\CurrentUser::get()->getId();
        self::$isAdmin = \Bitrix\Main\Engine\CurrentUser::get()->isAdmin();
        $commentId = $request->getPost('comment_id');
        self::$query = $request->getPost('query');
        $list = $request->getPostList()->toArray();
        self::$pages = $request->getPost('page');
        self::$acceptedUrlParameters = $list['acceptedUrlParameters'];

        // если $list['acceptedUrlParameters'] не пуст, значит нужно учиывать эти параметры при создании комментария
        if(!empty( self::$acceptedUrlParameters )) {
            if(!empty($list['query'])) {
                $filteredQuery = self::filterQueryStringByKeys( $list['query'], self::acceptedUrlParameters );
                $list['query'] = $filteredQuery;
            }
        }

        $fields = [
            'COMMENT' => $list['text'],
            'COMMENT_ID' => $commentId ?? 0,
            'SHOW' => true,
            'DATE_CREATE' => new DateTime(),
            'PATH' => $list['path'] ?: '',
            'QUERY' => $list['query'] ?: '',
        ];
        if (self::$userId > 0) {
            $fields['USER_ID'] = self::$userId;
        } else {
            $fields['USER_NAME'] = $list['NAME'];
            $fields['USER_LAST_NAME'] = $list['LAST_NAME'];
            $fields['USER_EMAIL'] = $list['EMAIL'];
        }

        $response = GkCommentsTable::add($fields);
        if ($response->isSuccess()) {
            return self::getListComment();
        }
        return [];
    }

    public function editCommentAction()
    {
        self::$setChpu = \Bitrix\Main\Config\Option::get('gk.comments','setChpu');
        self::$setHome = \Bitrix\Main\Config\Option::get('gk.comments','setHome');
        self::$setCount = \Bitrix\Main\Config\Option::get('gk.comments','setCount');
        self::$userId = \Bitrix\Main\Engine\CurrentUser::get()->getId();
        self::$isAdmin = \Bitrix\Main\Engine\CurrentUser::get()->isAdmin();
        $request = Application::getInstance()->getContext()->getRequest();
        $list = $request->getPostList()->toArray();
        self::$path = $list['path'];
        self::$query = $list['query'];
        self::$pages = $request->getPost('page');
        $response = GkCommentsTable::update($list['id'], ['COMMENT' => $list['text']]);
        if ($response->isSuccess()) {
            return self::getListComment();
        }
        return [];
    }
    public function getCommentAction()
    {
        self::$setChpu = \Bitrix\Main\Config\Option::get('gk.comments','setChpu');
        self::$setHome = \Bitrix\Main\Config\Option::get('gk.comments','setHome');
        self::$setCount = \Bitrix\Main\Config\Option::get('gk.comments','setCount');
        $request = Application::getInstance()->getContext()->getRequest();
        self::$userId = \Bitrix\Main\Engine\CurrentUser::get()->getId();
        self::$isAdmin = \Bitrix\Main\Engine\CurrentUser::get()->isAdmin();
        self::$path = $request->getPost('path');
        self::$query = $request->getPost('query');
        self::$pages = $request->getPost('page');

        return self::getListComment();
    }

    public function delCommentAction()
    {
        $request = Application::getInstance()->getContext()->getRequest();
        $path = $request->getPost('path');
        GkCommentsTable::delete($request->getPost('id'));
        /*$params = [
            'count_total' => 1,
            'order' => ['DATE_CREATE' => 'ASC'],
        ];
        if ($path === '/' || $path === '') {
            // мы на главной
            $params['filter']['COMMENT_ID'] = 0;
        } else {
            $params['filter']['=PATH'] = $path;
        }
        $objs = GkCommentsTable::getList($params);
        $result = [];
        $objTime = new DateTime();
        $objTime->add('-1 days');
        if ($objs->getCount() > 0) {
            foreach ($objs->fetchAll() as &$obj) {
                $obj['data'] = $obj['DATE_CREATE']->format('d.m.Y');
                $obj['timeData'] = $obj['DATE_CREATE']->getTimestamp() < $objTime->getTimestamp() ? 'вчера' : 'сегодня';
                $obj['letter'] = mb_substr($obj['USER_LAST_NAME'], 0, 1).mb_substr($obj['USER_NAME'], 0, 1);
                $obj['NAME'] = $obj['USER_LAST_NAME'] . ' ' . $obj['USER_NAME'];
                $result[] = $obj;
            }
        }*/
        return [];
    }

    public static function getListComment()
    {
        $request = \Bitrix\Main\Context::getCurrent()->getRequest()->getValues();
        self::$acceptedUrlParameters = $request['acceptedUrlParameters'];

        $params = [
            'count_total' => 1,
            'order' => ['DATE_CREATE' => 'ASC'],
            'select' => ['*',
                'USERS_AVATAR' => 'USERS.PERSONAL_PHOTO',
                'USERS_NAME' => 'USERS.NAME',
                'USERS_LAST_NAME' => 'USERS.LAST_NAME',
                'USERS_EMAIL' => 'USERS.EMAIL'
            ],
            'runtime' => [
                (new \Bitrix\Main\ORM\Fields\Relations\Reference(
                    'USERS',
                    \Bitrix\Main\UserTable::class,
                    \Bitrix\Main\ORM\Query\Join::on('this.USER_ID', 'ref.ID')
                ))
            ],
        ];
        if (self::$pages) {
            $params['offset'] = (self::$pages > 1 ? (self::$pages-1)*self::$setCount : 0);
        }
        if (self::$path === '/' || self::$path === '') {
            // мы на главной
            if (self::$setHome === 'Y') {
                //$params['filter']['COMMENT_ID'] = 0;
                $params['limit'] = self::$setCount;
            } else {
                return [
                    'object' => [],
                    'userId' => self::$userId,
                    'isAdmin' => self::$isAdmin,
                    'isShow' => false,
                ];
            }
        }

        if ( !empty(self::acceptedUrlParameters) ) {
            // если пользователь задал параметры, которые нужно контролировать они будут в $request['acceptedUrlParameters']
            $filteredQuery = self::filterQueryStringByKeys( self::$query, self::acceptedUrlParameters ); // получим строку только с этими параметрами

            $params['filter']['=QUERY'] = $filteredQuery;
            $params['filter']['=PATH'] = self::$path;
        } else {
            $params['filter']['=PATH'] = self::$path;
        }
        $objs = GkCommentsTable::getList($params);
        $coont = $objs->getCount();
        if ($coont > self::$setCount) {
            $page = ceil($coont / self::$setCount);
        }
        $result = [];
        $objTime = $objTimeLast = new DateTime();
        $objTime->add('-1 days');
        $objTimeLast->add('-2 days');
        if ($objs->getCount() > 0) {
            foreach ($objs->fetchAll() as &$obj) {
                $obj['data'] = $obj['DATE_CREATE']->format('d.m.Y');
                $obj['timeData'] = $obj['DATE_CREATE']->getTimestamp() < $objTime->getTimestamp()
                    ? ($obj['DATE_CREATE']->getTimestamp() < $objTimeLast->getTimestamp() ? $obj['DATE_CREATE']->format('d.m.Y') : 'вчера')
                    : 'сегодня';
                $obj['letter'] = $obj['USER_ID'] > 0
                    ? mb_substr($obj['USERS_LAST_NAME'], 0, 1).mb_substr($obj['USERS_NAME'], 0, 1)
                    : mb_substr($obj['USER_LAST_NAME'], 0, 1).mb_substr($obj['USER_NAME'], 0, 1);
                $obj['NAME'] = $obj['USER_ID'] > 0 ? $obj['USERS_LAST_NAME'] . ' ' . $obj['USERS_NAME'] : $obj['USER_LAST_NAME'] . ' ' . $obj['USER_NAME'];
                $obj['icon'] = $obj['USERS_AVATAR'];
                $obj['author'] = (self::$userId > 0 && self::$userId == $obj['USER_ID']) || self::$isAdmin;
                if ($obj['COMMENT_ID'] > 0) {
                    $result[$obj['COMMENT_ID']]['sub'][] = $obj;
                } else {
                    $result[$obj['ID']] = $obj;
                }
            }
        }
        return [
            'object' => $result,
            'userId' => self::$userId,
            'isAdmin' => self::$isAdmin,
            'isShow' => true,
            'page' => (int)$page,
            'pages' => (int)self::$pages,
            'count' => (int)$coont,
            'limit' => (int)self::$setCount
        ];
    }

    public function delCommentAction()
    {
        $request = Application::getInstance()->getContext()->getRequest();
        $path = $request->getPost('path');
        GkCommentsTable::delete($request->getPost('id'));
        /*$params = [
            'count_total' => 1,
            'order' => ['DATE_CREATE' => 'ASC'],
        ];
        if ($path === '/' || $path === '') {
            // мы на главной
            $params['filter']['COMMENT_ID'] = 0;
        } else {
            $params['filter']['=PATH'] = $path;
        }
        $objs = GkCommentsTable::getList($params);
        $result = [];
        $objTime = new DateTime();
        $objTime->add('-1 days');
        if ($objs->getCount() > 0) {
            foreach ($objs->fetchAll() as &$obj) {
                $obj['data'] = $obj['DATE_CREATE']->format('d.m.Y');
                $obj['timeData'] = $obj['DATE_CREATE']->getTimestamp() < $objTime->getTimestamp() ? 'вчера' : 'сегодня';
                $obj['letter'] = mb_substr($obj['USER_LAST_NAME'], 0, 1).mb_substr($obj['USER_NAME'], 0, 1);
                $obj['NAME'] = $obj['USER_LAST_NAME'] . ' ' . $obj['USER_NAME'];
                $result[] = $obj;
            }
        }*/
        return [];
    }
    public static function filterQueryStringByKeys(string $query, string $keys): string
    {
        // Убираем знак "?" в начале строки, если он есть
        $query = ltrim($query, '?');

        // Преобразуем строку ключей в массив
        $keysArray = array_map('trim', explode(',', $keys));

        // Парсим параметры из строки
        parse_str($query, $params);

        // Оставляем только параметры, которые есть в $keys
        $filteredParams = array_intersect_key($params, array_flip($keysArray));

        // Формируем новую строку с параметрами
        return http_build_query($filteredParams);
    }
}