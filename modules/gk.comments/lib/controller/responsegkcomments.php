<?php

namespace WIDGET\ASTRA\Controller;

use Bitrix\Main\Engine\Controller;
use Bitrix\Main\Engine\ActionFilter;

class ResponseWidget extends Controller
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
		];
	}
}