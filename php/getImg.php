<?php
	$url=urldecode($_GET["url"]);
	$headers=get_headers($url);
	foreach($headers as $header)
	{
		header($header);
	}
	readfile(urldecode($url));
?>