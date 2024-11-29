<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();
use Bitrix\Main\Localization\Loc;
Loc::loadLanguageFile(__FILE__);
CJSCore::Init(['fx','ls']);
\Bitrix\Main\UI\Extension::load(['ui.buttons', 'ui.dialogs.messagebox', 'ui.layout-form', 'gkvue3.comments','ui.bootstrap4']);
?>
<div id="application"></div>
<script>
    const comments = new BX.Comments('#application', {
        acceptedUrlParameters: <?=\Bitrix\Main\Web\Json::encode($arParams['ACCEPTED_URL_PARAMETERS'])?>
    });
    comments.start();
</script>
