/* xhr Upload function that posts data to the given url

	url: String value representing where to post the data

	data: FormData value that is to be sent eg:
	      const data = new FormData();
	      data.append('file', file);
	      data.append('formValue', 'value');

	updatePercentageFn: is called each time there is a progress event fired on the
	                    input. It is passed a value between 0-100 representing the
	                    % done

	onCompleteFn: is called once the upload is complete and is passed the 
	              JSON.parse()'d' responseText as a parameter
*/
export default function xhrUpload(url, data, updatePercentageFn, onCompleteFn) {

	var xhr = new XMLHttpRequest();

	xhr.upload.addEventListener('progress', (event) => {
		if (event.lengthComputable) {
			updatePercentageFn( Math.round((event.loaded * 100) / event.total) );
		}
	}, false);

	xhr.addEventListener('load', (/*event*/) => {
		updatePercentageFn( 100 );
		onCompleteFn( JSON.parse(xhr.responseText) );
	}, false);

	xhr.open('POST', url, true);
	xhr.send(data);
}
