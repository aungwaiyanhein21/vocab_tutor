<?php
	session_start();
	
	if (isset($_POST['user'])) {
		$user = $_POST['user'];
		$user_json_decode = json_decode($user,true);
		$lines = file('../../vocabulary_tutor/voc_data/users.txt');
		$match_counter = false;
		foreach ($lines as $line) {
			$each_user = json_decode($line,true);
			if ((strcmp($user_json_decode['user_name'],$each_user['user_name']) == 0) && (strcmp($user_json_decode['pass_word'],$each_user['pass_word']) == 0)){
				$match_counter = true;
				//echo "User already exists";
				$GLOBALS['email'] = $each_user['email'];
			}			
			//echo $user;
		}
		
		
		
		if ($match_counter){
			$session_arr = array();
			$_SESSION['user_username'] = $user_json_decode['user_name'];
			$_SESSION['user_email'] = $email;
			
			$session_arr[] = $_SESSION['user_username'];
			$session_arr[] = $_SESSION['user_email'];
			
			echo implode(',', $session_arr);
			
			//echo "Successfully Login";
		}
		else {
			echo "Username and Password does not match";
		}
		
	}
	
?>