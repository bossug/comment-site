<?php
	\Bitrix\Main\Loader::registerAutoLoadClasses(
		'gk.comments',
		[
			'GK\COMMENTS\Model' => 'lib/model.php',
			'GK\COMMENTS\Controller\ResponseAPI' => 'lib/controller/response.php',
			'GK\COMMENTS\ORM\ModelCommentsTable' => 'lib/orm/modelcommentstable.php',
		]
	);