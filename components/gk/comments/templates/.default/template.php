<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();
use Bitrix\Main\Localization\Loc;
Loc::loadLanguageFile(__FILE__);
\Bitrix\Main\Page\Asset::getInstance()->addCss("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css");
CJSCore::Init(['fx']);
\Bitrix\Main\UI\Extension::load(['ui.buttons', 'ui.dialogs.messagebox', 'ui.layout-form', 'gkvue3.comments','ui.bootstrap4','awesome']);
?>
<div id="application"></div>
<script>
    const comments = new BX.Comments('#application');
    comments.start();
</script>
