<?php

	header('Content-Type:application/json; charset=utf-8');

	// 实际场景可能会是从数据中取出的
	$region = file_get_contents('./region.json');

	echo $region;



?>