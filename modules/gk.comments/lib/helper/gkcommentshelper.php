<?php

namespace GK\COMMENTS\Helper;

use Bitrix\Main\Application;
use Bitrix\Main\ArgumentException;
use Bitrix\Main\ArgumentNullException;
use Bitrix\Main\ArgumentOutOfRangeException;
use Bitrix\Main\Config\Option;
use Bitrix\Main\DB\SqlQueryException;
use Bitrix\Main\Entity\Base;
use Bitrix\Main\Loader;
use Bitrix\Main\LoaderException;
use Bitrix\Main\Localization\Loc;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Bitrix\Main\Type\DateTime;
use Bitrix\Rest\RestException;

try {
	Loader::includeModule('iblock');
	Loader::includeModule('gk.comments');
} catch (LoaderException $e) {
	echo $e->getMessage();
	die;
}

Loc::loadMessages(__FILE__);
class GkCommentsHelper
{
    public const CACHE_DEFAULT = 3600;

	public static function getUserId()
	{
		return \Bitrix\Main\Engine\CurrentUser::get()->getId();
	}
	public function getClassesInDirectory($directory)
	{
		$classes = [];
		$files = new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($directory));
		foreach ($files as $file) {
			if (!$file->isDir() && $file->getExtension() === 'php') {
				$content = file_get_contents($file->getPathname());
				preg_match_all('/(?:class|interface|trait)\s+([a-zA-Z0-9_]+)/', $content, $matches);
				$classes = array_merge($classes, $matches[1]);
			}
		}

		return $classes;
	}

	/**
	 * @throws ArgumentOutOfRangeException
	 * @throws ArgumentException
	 * @throws SystemException
	 */
	public function installTables(): void
	{
		$dir = Application::getDocumentRoot() . Loc::getMessage('DIR_LOCAL_ORM');
		$classNames = $this->getClassesInDirectory($dir);
		foreach ($classNames as $className) {
			$class = 'GK\\COMMENTS\\ORM\\' . $className;
			if (class_exists($class)) {
				if (!Application::getConnection($class::getConnectionName())->isTableExists(
					Base::getInstance($class)->getDBTableName()
				)) {
					Base::getInstance($class)->createDbTable();
				}
			}
		}
	}

	/**
	 * @throws SqlQueryException
	 * @throws ArgumentNullException
	 * @throws ArgumentOutOfRangeException
	 * @throws ArgumentException
	 * @throws SystemException
	 */
	public function uninstallTables(): void
	{
		$dir = Application::getDocumentRoot() . Loc::getMessage('DIR_LOCAL_ORM');
		$classNames = $this->getClassesInDirectory($dir);
		foreach ($classNames as $className) {
			$class = 'GK\\COMMENTS\\ORM\\' . $className;
			if (class_exists($class)) {
				if (Application::getConnection($class::getConnectionName())->isTableExists(
					Base::getInstance($class)->getDBTableName()
				)
				) {
					Application::getConnection($class::getConnectionName())
						->queryExecute(
							'drop table if exists ' . Base::getInstance($class)->getDBTableName()
						);
				}
			}
		}
	}

	/** создать элемент
	 * @throws \Exception
	 */
	public static function setElement($class, $arFields)
	{
		try {
			$className = 'GK\COMMENTS\ORM\\Gk'.$class.'Table';
			if (class_exists($className)) {
				$response = $className::add($arFields);
				if (!$response->isSuccess()) {
					$printError = implode('', $response->getErrorMessages());
					throw new \Bitrix\Rest\RestException(
						Loc::getMessage('GK_COMMENTS_ERROR_CREATE_ELEMENT') . $printError,
						'ERROR_CORE',
						"400 Bad Request"
					);
				}
			} else {
				throw new RestException(
					"no class " . $className,
					'ERROR_CORE',
					"400 Bad Request"
				);
			}
		}
		catch (RestException $e) {
			throw new RestException(
				$e->getMessage(),
				$e->getCode(),
			);
		}
	}

	/**
	 * Установка значений для пагинации
	 * @param $field
	 * @param $params
	 * @return void
	 */
	public static function setPagination(&$field, $params = [])
	{
		if ($params['page'] == 1) {
			$offset = 0;
		} else {
			$offset = $params['pagesize'] * ($params['page']-1);
		}

		$limit = $params['pagesize'];
		$field['offset'] = $offset;
		$field['limit'] = $limit;
	}

	/**
	 * Добавление данных пагинации для массива
	 * @param array $params
	 * @param int $total
	 * @return array
	 */
	public static function getPagination(array $params = [], int $total = 0)
	{
		return [
			'page' => $params['page'],
			'size' => $params['pagesize'],
			'total' => $total,
		];
	}

	/**
	 * генерация случайной строки
	 * @return string
	 */
	public static function getRandom()
	{
		return \Bitrix\Main\Security\Random::getString(5,'1234567890');
	}
}