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
            ]
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
                'filter' => [
                    '=PATH' => $path,
                ],
                'count_total' => 1
            ];
            $objs = GkCommentsTable::getList($params);
            $result = [];
            if ($objs->getCount() > 0) {
                foreach ($objs->fetchAll() as $obj) {
                    $result[] = $obj;
                }
            }
        }
        return \Bitrix\Main\Web\Json::encode($result);
    }
    public function getCommentAction()
    {
        $request = Application::getInstance()->getContext()->getRequest();
        $path = $request->getPost('path');
        $query = $request->getPost('query');
        if ($path === '/' || $path === '') {
            // мы на главной
        }
        $params = [
            'filter' => [
                '=PATH' => $path,
            ],
            'count_total' => 1
        ];
        $objs = GkCommentsTable::getList($params);
        $result = [];
        if ($objs->getCount() > 0) {
            foreach ($objs->fetchAll() as $obj) {
                $result[] = $obj;
            }
        }
        return $result;
    }
}