<?php
	$user_info=$_REQUEST["data_requested"];
	$user_info=json_decode($user_info);
	$showed_index=handle_request($user_info->user_name, $user_info->request);
	
function handle_request($user_name, $request){
	$data_arr=[];
	
	$data_arr=get_file($request);
	$user_info=get_file("users");
	
	if(count($data_arr)==0){
		return -1;
	}
	
	if($request=="cards"){
		echo implode($data_arr)."^".implode($user_info);
	}
}

function get_file($request){
	$data_index=0;
	$file_path="../voc_data/".$request.".txt";
	
	$data_file = fopen($file_path, "r") or die("Unable to open file!");
	
	while(!feof($data_file)) {
		$line=fgets($data_file);
		$str=trim($line);
		if(!(empty(strlen($str)))){
			$arr[$data_index] = "|".$str;
			$data_index++;
		}
	}
	fclose($data_file);
	return $arr;
}
?>