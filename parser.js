exports.parser = function(callback) {
	var paths = [
		//'csv/February2015_0887.csv',
		//'csv/March2015_0887.csv',
		'csv/April2015_0887.csv',
		'csv/May2015_0887.csv',
		'csv/June2015_0887.csv',
		'csv/July2015_0887.csv',
		'csv/August2015_0887.csv',
		'csv/September2015_0887.csv',
		'csv/October2015_0887.csv',
		//'csv/November2015_0887.csv',
		//'csv/December2015_0887.csv',
		//'csv/January2016_0887.csv'
	];
	var fs = require("fs");


	var categoryObj = {
		'Grocery' : {
			'bin':'0000',
			'list':[]
		},
		'Food' : {
			'bin':'0001',
			'list':[]
		},
		'Gas' : {
			'bin':'0010',
			'list':[]
		},
		'Technology' : {
			'bin':'0011',
			'list':[]
		},
		'Automobile' : {
			'bin':'0100',
			'list':[]
		},
		'Parking' : {
			'bin':'0101',
			'list':[]
		},
		'Payment' : {
			'bin':'0110',
			'list':[]
		},
		'Airline' : {
			'bin':'0111',
			'list':[]
		},
		'Groupon' : {
			'bin':'1000',
			'list':[]
		},
		'Gym' : {
			'bin':'1001',
			'list':[]
		},
		'Transportation' : {
			'bin':'1010',
			'list':[]
		},
		'Invalid' : {
			'bin':'1011',
			'list':[]
		},
		'Apparel' : {
			'bin':'1100',
			'list':[]
		},
		'Travel' : {
			'bin':'1101',
			'list':[]
		},
		'Coffee' : {
			'bin':'1110',
			'list':[]
		}
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
					var lineArray = line.trim().split(",");
					var date = new Date(Date.parse(lineArray[0]));
					var name = lineArray[1].replace(/"/g, "");
					var price = parseFloat(lineArray[3]);
					var category = lineArray[4];


					
					if (category in categoryObj) {
						categoryObj[category].list.push({
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