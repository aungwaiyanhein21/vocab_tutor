<?php
	print_r($_FILES);
		
	$file = $_FILES['files'];
	$fileName = $file['name'];
	$fileTempName = $file['tmp_name'];
	$fileSize = $file['size'];
	$fileType = $file['type'];
	
	$fileExtension = explode(".",$fileName);
	$fileActualExtension = strtolower(end($fileExtension));
	
	$allowedExtension = array('jpg','jpeg','png','gif');
	
	if (in_array($fileActualExtension,$allowedExtension)) {
		if ($fileSize < 2097152) {
			$fileNameNew = $fileExtension[0].".".$fileActualExtension;
			$fileDestination = '../../voc_data/'.$fileNameNew;
			move_uploaded_file($fileTempName,$fileDestination);
		}
		else {
			print_r("file too big");
		}
	}
	else {
		print_r("file type error");
	}
?>