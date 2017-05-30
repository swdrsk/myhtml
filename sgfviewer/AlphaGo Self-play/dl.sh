for x in {1..10} ; do
	curl "https://storage.googleapis.com/deepmind-media/alphago/sgf-files/ag-vs-ag/ag-vs-ag-wk1/AG%20vs%20AG%20-%20G${x}%20-%20English.sgf" -H 'Referer: https://storage.googleapis.com/deepmind-media/alphago/ag-vs-ag-wk1.html?23476506502' -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36' --compressed > ${x}.sgf
done

for x in {11..20} ; do
	curl "https://storage.googleapis.com/deepmind-media/alphago/sgf-files/ag-vs-ag/ag-vs-ag-wk2/AG%20vs%20AG%20-%20G${x}%20-%20English.sgf" -H 'Referer: https://storage.googleapis.com/deepmind-media/alphago/ag-vs-ag-wk2.html?3972461056' -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36' --compressed > ${x}.sgf
done

for x in {21..30} ; do
	curl "https://storage.googleapis.com/deepmind-media/alphago/sgf-files/ag-vs-ag/ag-vs-ag-wk3/AG%20vs%20AG%20-%20G${x}%20-%20English.sgf" -H 'Referer: https://storage.googleapis.com/deepmind-media/alphago/ag-vs-ag-wk3.html?3972461056' -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36' --compressed > ${x}.sgf
done

for x in {31..40} ; do
	curl "https://storage.googleapis.com/deepmind-media/alphago/sgf-files/ag-vs-ag/ag-vs-ag-wk4/AG%20vs%20AG%20-%20G${x}%20-%20English.sgf" -H 'Referer: https://storage.googleapis.com/deepmind-media/alphago/ag-vs-ag-wk4.html?3972461056' -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36' --compressed > ${x}.sgf
done

for x in {41..50} ; do
	curl "https://storage.googleapis.com/deepmind-media/alphago/sgf-files/ag-vs-ag/ag-vs-ag-wk5/AG%20vs%20AG%20-%20G${x}%20-%20English.sgf" -H 'Referer: https://storage.googleapis.com/deepmind-media/alphago/ag-vs-ag-wk5.html?3972461056' -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36' --compressed > ${x}.sgf
done
