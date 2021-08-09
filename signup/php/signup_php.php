<?php
	
	if (isset($_POST['user'])) {
		$user = $_POST['user'];
		$user_json_decode = json_decode($user,true);
		
		$lines = file('../../vocabulary_tutor/voc_data/users.txt'); 
		//echo $user;
		$match_counter = true;
		
		foreach ($lines as $line) {
			$each_user = json_decode($line,true);
			if (strcmp($user_json_decode['email'],$each_user['email']) == 0 || strcmp($user_json_decode['user_name'],$each_user['user_name']) == 0 ){
				$match_counter = false;
				echo "User already exists";
			}			
			//echo $user;
		}
		
		
		if ($match_counter) {
			$task_file = fopen("../../vocabulary_tutor/voc_data/users.txt", "a") or die("Unable to open file!");
			fwrite($task_file, $user."\n");
			fclose($task_file);
			echo "User Account Has Been Created. Please Login";
		}
		
		//echo $_POST['user'];
	}
	
?>