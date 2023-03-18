function convert() {
	// Get the input values
	var sourceFile = document.getElementById('source').files[0];
	var destinationFile = document.getElementById('destination').value;
	var conversionType = document.getElementById('conversion').value;

	// Validate the input
	if (!sourceFile || !destinationFile) {
		alert('Please select source file and destination file.');
		return;
	}

	// Read the source file
	var reader = new FileReader();
	reader.readAsText(sourceFile);
	reader.onload = function(event) {
		try {
			var sourceData = event.target.result;

			// Convert the data
			var destinationData;
			if (conversionType === 'csv-to-json') {
				destinationData = csvToJson(sourceData);
			} else if (conversionType === 'json-to-csv') {
				destinationData = jsonToCsv(sourceData);
			} else {
				throw new Error('Invalid conversion type.');
			}

			// Save the destination file
			var blob = new Blob([destinationData], {type: 'text/plain;charset=utf-8'});
			// FileSaver.saveAs(blob, destinationFile);
			window.saveAs(blob, destinationFile);
		} catch (error) {
			alert('An error occurred: ' + error.message);
		}
	};
	reader.onerror = function() {
		alert('An error occurred while reading the file.');
	};
}


// function csvToJson(csvData) {
// 	var json = Papa.parse(csvData, {header: true});
// 	return JSON.stringify(json.data);
// }

// function jsonToCsv(jsonData) {
// 	var data = JSON.parse(jsonData);
// 	var csv = '';
	
// 	if (data.length > 0) {
// 		var headers = Object.keys(data[0]);
// 		csv += headers.join(',') + '\r\n';
		
// 		data.forEach(function(item) {
// 			var values = headers.map(function(header) {
// 				return item[header];
// 			});
// 			csv += values.join(',') + '\r\n';
// 		});
// 	}
	
// 	return csv;
// }

function csvToJson(csvData) {
  var json = Papa.parse(csvData, {header: true});
  return JSON.stringify(json.data, null, 2); // The `2` specifies the number of spaces for indentation
}

function jsonToCsv(jsonData) {
  var data = JSON.parse(jsonData);
  var csv = '';

  if (data.length > 0) {
    var headers = Object.keys(data[0]);
    csv += headers.join(',') + '\r\n';

    data.forEach(function(item) {
      var values = headers.map(function(header) {
        return item[header];
      });
      csv += values.join(',') + '\r\n';
    });
  }

  return csv;
}

