<?php
	$users_arr=json_decode($_REQUEST["user"]);
	
	$task_file = fopen("../voc_data/users.txt", "w") or die("Unable to open file!");
	
	
	foreach ($users_arr as $value){
		fwrite($task_file, $value."\n");
	}
	
	fclose($task_file);
?>