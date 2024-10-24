<?php

    use Bitrix\Main\{Config\Option as BxOption, HttpApplication, Loader, Localization\Loc};

    //require_once($_SERVER['DOCUMENT_ROOT'] . '/bitrix/modules/main/include/prolog_admin_before.php');
    //Extension::load('ui.bootstrap4');

    Loc::loadMessages(__FILE__);

    $request = HttpApplication::getInstance()->getContext()->getRequest();

    $module_id = 'gk.comments';
    Loader::includeModule($module_id);

    $aTabs = [
        [
            'DIV' => 'edit',
            'TAB' => Loc::getMessage('GK_COMMENTS_WIDGET_OPTIONS_TAB_SETTINGS'),
            'TITLE' => Loc::getMessage('GK_COMMENTS_WIDGET_OPTIONS_TITLE_SETTINGS'),
            'OPTIONS' => [
                /*[
                    'savePostTable',
                    'Хранить историю событий post',
                    BxOption::get('widgets.astra', 'savePostTable') && 'Y',
                    ['checkbox', 'savePostTable']
                ],
                [
                    'savePutTable',
                    'Хранить историю событий put',
                    BxOption::get('widgets.astra', 'savePutTable') && 'Y',
                    ['checkbox', 'savePutTable']
                ],
                [
                    'saveDeleteTable',
                    'Хранить историю событий delete',
                    BxOption::get('widgets.astra', 'saveDeleteTable') && 'Y',
                    ['checkbox', 'saveDeleteTable']
                ],
                [
                    'saveDeleteElement',
                    'Удалять элементы полностью <span id="hint_1"></span>',
                    BxOption::get('widgets.astra', 'saveDeleteElement') && 'Y',
                    ['checkbox', 'saveDeleteElement'],
                ],*/
            ]
        ]
    ];

    if ($request->isPost() && check_bitrix_sessid()) {
        foreach ($aTabs as $aTab) {
            foreach ($aTab['OPTIONS'] as $arOption) {
                if (!is_array($arOption) || $arOption['note']) {
                    continue;
                }

                if ($request['apply']) {
                    $optionValue = $request->getPost($arOption[0]);
                    if ($arOption[0] == 'switch_on') {
                        if (empty($optionValue)) {
                            $optionValue = 'N';
                        }
                    }

                    BxOption::set(
                        $module_id,
                        $arOption[0],
                        is_array($optionValue) ? implode(',', $optionValue) : $optionValue
                    );
                } elseif ($request['default']) {
                    BxOption::set($module_id, $arOption[0], $arOption[2]);
                }
            }
        }
        LocalRedirect($APPLICATION->GetCurPage() . '?mid=' . $module_id . '&lang=' . LANG);
    }

    $tabControl = new \CAdminTabControl(
        'tabControl',
        $aTabs
    );
    $tabControl->Begin();

    \Bitrix\Main\UI\Extension::load("ui.alerts");
?>
<form action="<?= $APPLICATION->GetCurPage() ?>?mid=<?= $module_id ?>&lang=<?= LANG ?>" method="post">
    <?
        foreach ($aTabs as $aTab) {
            if ($aTab['OPTIONS']) {
                $tabControl->BeginNextTab();
                \__AdmSettingsDrawList($module_id, $aTab['OPTIONS']);
            }
        }

        $tabControl->Buttons();
    ?>
    <input type="submit" name="apply" value="<?= Loc::getMessage('GK_COMMENTS_WIDGET_OPTIONS_APPLY') ?>"
           class="adm-btn-save"/>
    <input type="submit" name="default" value="<?= Loc::getMessage('GK_COMMENTS_WIDGET_OPTIONS_DEFAULT') ?>"/>
    <?php echo(bitrix_sessid_post()); ?>
</form>
<script>
    BX.hint_replace(BX('hint_1'), 'всплывающий хинт');
</script>
<style>
    #edit_edit_table td > * {
        margin-bottom: 20px;
    }

    #edit_edit_table td select {
        height: 400px;
    }
</style>