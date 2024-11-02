<?php

namespace GK\COMMENTS\Controller;

use Bitrix\Main\Application;
use Bitrix\Main\Engine\Controller;
use Bitrix\Main\Engine\ActionFilter;
use Bitrix\Main\Type\DateTime;
use GK\COMMENTS\ORM\GkCommentsTable;

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
            'delComment' => ['prefilters' => []]
		];
	}

    /**
     * @throws \Exception
     */
    public function setCommentAction()
    {
        $request = Application::getInstance()->getContext()->getRequest();
        $path = $request->getPost('path');
        $query = $request->getPost('query');
        $list = $request->getPostList()->toArray();
        if ($path === '/' || $path === '') {
            // мы на главной
        }
        $fields = [
            'COMMENT' => $list['text'],
            'SHOW' => true,
            'DATE_CREATE' => new DateTime(),
            'PATH' => $list['path'],
            'QUERY' => $list['query'],
        ];
        if ($list['USER_ID']) {
            $fields['USER_ID'] = $list['USER_ID'];
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
            }
        }
        return $result;
    }
    public function getCommentAction()
    {
        $request = Application::getInstance()->getContext()->getRequest();
        $userId = \Bitrix\Main\Engine\CurrentUser::get()->getId();
        $isAdmin = \Bitrix\Main\Engine\CurrentUser::get()->isAdmin();
        $path = $request->getPost('path');
        $query = $request->getPost('query');

        $params = [
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
                $obj['author'] = $isAdmin;
                $result[] = $obj;
            }
        }
        return [
            'object' => $result,
            'isUser' => false
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