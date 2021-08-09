<?php
	if (isset($_POST['word_combination'])) {
		$new_word_set = $_POST['word_combination'];
		$new_word_set_array = explode(":",$new_word_set);
		$new_word = $new_word_set_array[0];
		
		$lines = file('../../voc_data/cards.txt'); 
		$match_counter = true;
		
		foreach ($lines as $line) {
			$line_word_set_array = explode(":",$line);
			$existing_word = $line_word_set_array[0];
			if (strcmp($new_word,$existing_word) == 0) {
				$match_counter = false;
				echo "Word already exists";
			}
			
		}
		
		if ($match_counter) {
			$words_set_file = fopen("../../voc_data/cards.txt", "a") or die("Unable to open file!");
			fwrite($words_set_file, $new_word_set."\r\n");
			fclose($words_set_file);
			echo "New word has been added.";
		}
	}
		
?>