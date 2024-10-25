<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();
use Bitrix\Main\Localization\Loc;
Loc::loadLanguageFile(__FILE__);
CJSCore::Init(['fx']);
\Bitrix\Main\UI\Extension::load(['ui.buttons', 'ui.dialogs.messagebox', 'ui.layout-form', 'gkvue3.comments','ui.bootstrap4']);
?>
<div id="application">
    <content-header v-bind:title="modalTitle"></content-header>
    <div class="comment-body">
        <content-body v-for="(post,index) in posts"
            :key="index"
            :name="post.title"
            :text="post.text"
            :icon="post.icon"
            :elementid="post.elementId"
            :data="post.data"
            :timedata="post.timeData"
            :letter="post.letter"
        ></content-body>
    </div>
</div>
<script>
    const comments = new BX.Comments('#application');
    comments.start();
</script>
