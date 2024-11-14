<?php

namespace GK\COMMENTS\Controller;

use Bitrix\Main\Application;
use Bitrix\Main\Engine\Controller;
use Bitrix\Main\Engine\ActionFilter;
use Bitrix\Main\Type\DateTime;
use GK\COMMENTS\ORM\GkCommentsTable;
use Widgets\Astra\Option;

class ResponseGkComments extends Controller
{
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
        $request = Application::getInstance()->getContext()->getRequest();
        $path = $request->getPost('path');
        $userId = \Bitrix\Main\Engine\CurrentUser::get()->getId();
        $isAdmin = \Bitrix\Main\Engine\CurrentUser::get()->isAdmin();
        $commentId = $request->getPost('comment_id');
        $query = $request->getPost('query');
        $list = $request->getPostList()->toArray();
        if ($path === '/' || $path === '') {
            // мы на главной
        }
        $fields = [
            'COMMENT' => $list['text'],
            'COMMENT_ID' => $commentId ?? 0,
            'SHOW' => true,
            'DATE_CREATE' => new DateTime(),
            'PATH' => $list['path'] ?: '',
            'QUERY' => $list['query'] ?: '',
        ];
        if ($userId > 0) {
            $fields['USER_ID'] = $userId;
        } else {
            $fields['USER_NAME'] = $list['NAME'];
            $fields['USER_LAST_NAME'] = $list['LAST_NAME'];
            $fields['USER_EMAIL'] = $list['EMAIL'];
        }

        $response = GkCommentsTable::add($fields);
        if ($response->isSuccess()) {
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
                ]
            ];
            if ($path === '/' || $path === '') {
                // мы на главной
                //$params['filter']['COMMENT_ID'] = 0;
            } else {
                //$params['filter']['=PATH'] = $path;
            }
            $params['filter']['=PATH'] = $path;
            $objs = GkCommentsTable::getList($params);
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
                    $obj['author'] = ($userId > 0 && $userId == $obj['USER_ID']) || $isAdmin;
                    if ($obj['COMMENT_ID'] > 0) {
                        $result[$obj['COMMENT_ID']]['sub'][] = $obj;
                    } else {
                        $result[$obj['ID']] = $obj;
                    }
                }
            }
        }
        return [
            'object' => $result,
            'userId' => $userId,
            'isAdmin' => $isAdmin
        ];
    }

    public function editCommentAction()
    {
        $userId = \Bitrix\Main\Engine\CurrentUser::get()->getId();
        $isAdmin = \Bitrix\Main\Engine\CurrentUser::get()->isAdmin();
        $request = Application::getInstance()->getContext()->getRequest();
        $list = $request->getPostList()->toArray();
        $response = GkCommentsTable::update($list['id'], ['COMMENT' => $list['text']]);
        if ($response->isSuccess()) {
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
                ]
            ];
            $params['filter']['=PATH'] = $list['path'];
            $objs = GkCommentsTable::getList($params);
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
                    $obj['author'] = ($userId > 0 && $userId == $obj['USER_ID']) || $isAdmin;
                    if ($obj['COMMENT_ID'] > 0) {
                        $result[$obj['COMMENT_ID']]['sub'][] = $obj;
                    } else {
                        $result[$obj['ID']] = $obj;
                    }
                }
            }
        }
        return [
            'object' => $result,
            'userId' => $userId,
            'isAdmin' => $isAdmin
        ];
    }
    public function getCommentAction()
    {
        $setChpu = \Bitrix\Main\Config\Option::get('gk.comments','setChpu');
        $setHome = \Bitrix\Main\Config\Option::get('gk.comments','setHome');
        $request = Application::getInstance()->getContext()->getRequest();
        $userId = \Bitrix\Main\Engine\CurrentUser::get()->getId();
        $isAdmin = \Bitrix\Main\Engine\CurrentUser::get()->isAdmin();
        $path = $request->getPost('path');
        $query = $request->getPost('query');

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
            ]
        ];
        if ($path === '/' || $path === '') {
            // мы на главной
            if ($setHome === 'Y') {
                //$params['filter']['COMMENT_ID'] = 0;
                $params['limit'] = 10;
            } else {
                return [
                    'object' => [],
                    'userId' => $userId,
                    'isAdmin' => $isAdmin,
                    'isShow' => false,
                ];
            }
        } else {
            //$params['filter']['=PATH'] = $path;
        }
        if ($setChpu !== 'Y') {
            $params['filter']['=QUERY'] = $query;
            $params['filter']['=PATH'] = $path;
        } else {
            $params['filter']['=PATH'] = $path;
        }
        $objs = GkCommentsTable::getList($params);
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
                $obj['author'] = ($userId > 0 && $userId == $obj['USER_ID']) || $isAdmin;
                if ($obj['COMMENT_ID'] > 0) {
                    $result[$obj['COMMENT_ID']]['sub'][] = $obj;
                } else {
                    $result[$obj['ID']] = $obj;
                }
            }
        }
        return [
            'object' => $result,
            'userId' => $userId,
            'isAdmin' => $isAdmin,
            'isShow' => true,
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
}