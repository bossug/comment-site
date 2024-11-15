<?php

    use Bitrix\Main\{Config\Option as BxOption, HttpApplication, Loader, Localization\Loc};

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
                'Базовые настройки',
                ['note' => 'Модуль в данное время рассчитан на работу с ЧПУ'],
                [
                    'setChpu',
                    'Установка на ЧПУ',
                    BxOption::get('gk.comments', 'setChpu') && 'Y',
                    ['checkbox', 'setChpu']
                ],
                [
                    'setCount',
                    'Кол-во сообщений на страницу',
                    BxOption::get('gk.comments', 'setCount') ?: '10',
                    ['text', 20]
                ],
                [
                    'setHome',
                    'Выводить на главной',
                    BxOption::get('gk.comments', 'setHome') && 'Y',
                    ['checkbox', 'setHome']
                ],
                ['note' => 'С данной опцией будут выводиться последние 10 комментариев'],
                [
                    'setAnonim',
                    'Комментарии могут оставлять анонимные пользователи',
                    BxOption::get('gk.comments', 'setAnonim') && 'Y',
                    ['checkbox', 'setAnonim']
                ],
                [
                    'deleteElement',
                    'Не удалять комменты полностью <span id="hint_1"></span>',
                    BxOption::get('widgets.astra', 'deleteElement') && 'Y',
                    ['checkbox', 'deleteElement'],
                ],
                ['note' => 'Приустановленной опции комментарии не будут удаляться физически, а будет проставляться флаг удаления'],
                'Размещение кода',
                ['note' => 'Разместить код шаблона в любом месте где нужно вывести комментарии<br>$APPLICATION->IncludeComponent("gk:comments", "", [], false );']
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
    <?php echo(bitrix_sessid_post()); ?>
</form>
<script>
    BX.hint_replace(BX('hint_1'), 'Не полное удаление');
</script>
<style>
    #edit_edit_table td > * {
        margin-bottom: 20px;
    }
    #edit table td {
        vertical-align: baseline;
    }
    #edit table td:first-child {
        text-align: right;
    }
    #edit table td:last-child {
        margin-left: 20px;
    }

    #edit_edit_table td select {
        height: 400px;
    }
</style>