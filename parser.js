exports.parser = function(callback) {
	var paths = ['csv/April2015_0887.csv',
			'csv/May2015_0887.csv',
			'csv/June2015_0887.csv',
			'csv/July2015_0887.csv',
			'csv/August2015_0887.csv',
			'csv/September2015_0887.csv',
			'csv/October2015_0887.csv'];
	var fs = require("fs");

	
	var categoryObj = {
		'Food' : [],
		'Clothing' : []
	};
	
	var readFile = function(index) {
		if (index < paths.length) {
			
			var path = paths[index];
			var first = true;
			
			var lineReader = require('readline').createInterface({
				input: fs.createReadStream(path)
			});
			lineReader.on('line', function (line) {
				if (first) {
					first = false;
				} else {
					line = line.trim().split(",");
					var date = line[0];
					var name = line[1].replace(/"/g, "");
					var price = line[3];
					var category = line[4];
					return;
					if (category in categoryObj) {
						categoryObj[category].push({
							'name' : name,
							'date' : date,
							'price' : price
						});
					} else {
						console.log(category + " category not exist on file " + path);
					}
				}
			});
			lineReader.on('close', function() {

				if (index == paths.length-1) {
					finisher();
				} else {
					readFile(index+1);
				}
			});
		}
	};	

	readFile(0);
	
	var finisher = function() {
		callback(categoryObj);
	};
};