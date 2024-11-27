<?php

    use Bitrix\Main\Application;
    use Bitrix\Main\Localization\Loc;
    use Bitrix\Main\ModuleManager;
    use Bitrix\Main\SystemException;
    use Bitrix\Main\IO\Directory;

    Loc::loadMessages(__FILE__);

if (class_exists('gk_comments')) {
	return;
}
class gk_comments extends CModule
{
	function __construct()
	{
		if (file_exists(__DIR__."/version.php")) {
			$arModuleVersion = [];
			include(__DIR__ . '/version.php');

			$this->MODULE_ID = 'gk.comments';
			$this->MODULE_NAME = Loc::getMessage('GK_COMMENTS_MODULE_NAME');
			$this->MODULE_DESCRIPTION = Loc::getMessage('GK_COMMENTS_MODULE_DESCRIPTION');
			$this->PARTNER_NAME = Loc::getMessage('GK_COMMENTS_MODULE_PARTNER_NAME');
			$this->PARTNER_URI = Loc::getMessage('GK_COMMENTS_MODULE_PARTNER_URI');
			$this->MODULE_VERSION = $arModuleVersion['VERSION'];
			$this->MODULE_VERSION_DATE = $arModuleVersion['VERSION_DATE'];
		}
	}

	public function isVersionD7()
	{
		return CheckVersion(ModuleManager::getVersion('main'), '18.00.00');
	}

	public function isPhpVersionCorrect()
	{
		return phpversion() >= 7.4;
	}

	public function GetPath($notDocumentRoot = false)
	{
		return $notDocumentRoot
			? str_ireplace(Application::getDocumentRoot(), '', dirname(__DIR__))
			: dirname(__DIR__);
	}

	public function areModulesInstalled($arModuleIds = [])
	{
		if ($arModuleIds) {
			$arInstalledModules = ModuleManager::getInstalledModules();
			$arInstalledModulesIds = array_keys($arInstalledModules);
			$notInstalledModules = [];
			foreach ($arModuleIds as $moduleId) {
				if (!in_array($moduleId, $arInstalledModulesIds)) {
					$notInstalledModules[] = $moduleId;
				}
			}
			return $notInstalledModules;
		}
		return [];
	}

	/**
	 * @throws \Bitrix\Main\LoaderException
	 */
	public function InstallDB()
	{
		\Bitrix\Main\Loader::includeModule($this->MODULE_ID);
		$obWidgetParamsOptions = new \GK\COMMENTS\Helper\GkCommentsHelper();
		$obWidgetParamsOptions->installTables();
	}

	/**
	 * @throws \Bitrix\Main\LoaderException
	 */
	public function UnInstallDB()
	{
		\Bitrix\Main\Loader::includeModule($this->MODULE_ID);
		$obWidgetAstraHelper = new \GK\COMMENTS\Helper\GkCommentsHelper();
		$obWidgetAstraHelper->uninstallTables();
	}

	/**
	 * @throws SystemException
	 */
	public function DoInstall()
	{
		if (!$this->isPhpVersionCorrect()) {
			throw new SystemException(Loc::getMessage('GK_COMMENTS_EXCLUSION_MODULE_ERROR_PHP_VERSION'));
		}

		$notInstalledModules = $this->areModulesInstalled([
		]);
		if ($notInstalledModules) {
			throw new SystemException(
				Loc::getMessage('GK_COMMENTS_EXCLUSION_MODULE_NOT_INSTALLED_MODULES')
				. implode(', ', $notInstalledModules)
			);
		}

        $this->installFiles();
		if ($this->isVersionD7()) {
			ModuleManager::registerModule($this->MODULE_ID);
			$this->InstallDB();
		} else {
			throw new SystemException(Loc::getMessage('GK_COMMENTS_EXCLUSION_MODULE_ERROR_VERSION'));
		}
	}

	/**
	 * @throws \Bitrix\Main\LoaderException
	 */
	public function DoUninstall()
	{
        $this->unInstallFiles();
		$this->UnInstallDB();

		ModuleManager::unRegisterModule($this->MODULE_ID);
	}
    public function installFiles($arParams = [])
    {
        CopyDirFiles(
            $_SERVER['DOCUMENT_ROOT'].'/local/modules/'.$this->MODULE_ID.'/install/admin/',
            $_SERVER['DOCUMENT_ROOT'].'/bitrix/admin',
            true,
        );
        CopyDirFiles(
            Application::getDocumentRoot().'/local/modules/'.$this->MODULE_ID.'/install/local/components',
            Application::getDocumentRoot().'/local/components',
            true,
            true,
        );
        CopyDirFiles(
            Application::getDocumentRoot().'/local/modules/'.$this->MODULE_ID.'/install/local/js',
            Application::getDocumentRoot().'/local/js',
            true,
            true,
        );

        return true;
    }

    public function unInstallFiles()
    {
        DeleteDirFiles(
            Application::getDocumentRoot().'/local/modules/'.$this->MODULE_ID.'/install/admin/',
            Application::getDocumentRoot().'/bitrix/admin'
        );
        DeleteDirFiles(
            Application::getDocumentRoot().'/local/modules/'.$this->MODULE_ID.'/install/local/components',
            Application::getDocumentRoot().'/local/components'
        );
        DeleteDirFiles(
            Application::getDocumentRoot().'/local/modules/'.$this->MODULE_ID.'/install/local/js',
            Application::getDocumentRoot().'/local/js'
        );

        return true;
    }
}