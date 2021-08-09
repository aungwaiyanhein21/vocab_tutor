<?php
	session_start();
	//session_start();
	if (isset($_POST['username']) && isset($_POST['email'])) {
		if (isset($_SESSION['user_username'])&& isset($_SESSION['user_email'])){
			$local_storage_username = $_POST['username'];
			$local_storage_email = $_POST['email'];
			
			$session_username = $_SESSION['user_username'];
			$session_email = $_SESSION['user_email'];
			if (strcmp($local_storage_username,$session_username) == 0 && strcmp($local_storage_email,$session_email) == 0) {
				
				session_unset();
				session_destroy();
				echo "SessionDestroyed";
			}
			else {
				echo "local storage and session not matched";
			}
		}
		else {
			echo "User not in session";
		}
	}
	else {
		echo "There is an error";
	}


?>