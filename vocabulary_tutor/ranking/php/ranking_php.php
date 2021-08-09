<?php
	session_start();
	
	if (isset($_POST['username'])) {
		if (isset($_SESSION['user_username'])&& isset($_SESSION['user_email'])){
			$lines = file('../../voc_data/users.txt');
			$users_arr = array();
			foreach ($lines as $line) {
				$each_user = json_decode($line,true);
				$users_arr[$each_user['user_name']] = $each_user['test_mode']['max_scores'];
			}
			
			arsort($users_arr);
			
			$users_arr_sorted = array();
			foreach($users_arr as $user=>$score){
				$users_arr_sorted[] = $user.":".$score;
			}
			
			echo implode(',', $users_arr_sorted);
		}
	}
	

?>