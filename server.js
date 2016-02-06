var express = require('express');
var app = express();
var https = require('https'),
    url = require('url');
var parseString = require('xml2js').parseString;
var parser = require("./parser.js");
var neuralnets = require("./neuralnets.js");


parser.parser(function(categoryObj) {
	
	var NNObject = new neuralnets.neural_nets([2, 20, 20, 1], 'hyperbolictangent', 0.5, function(data) {
		console.log(data);
		return [1,1];
	}, function(data) {
		return [1];
	});

	return;
	for(category in categoryObj) {
		var in_ = [category, ];
		var out_ = [];
		NNObject.train([in_, out_]);
	}
});







app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {	
	res.sendFile("index.html", { root: __dirname });
});


var backServer = app.listen(process.env.PORT || 3000, function () {
	var host = backServer.address().address;
	var port = backServer.address().port;

	console.log('ChallengeSaver started at http://%s:%s', host, port);
});


var APP_KEY = 'a0874b0eda76ae7918c7798eeef92c1a';

function PartnerAuthentication() {
	var token = null;"1ycoSxUHYmz58Bs2qM4Q";
	
	if (token == null) {
		var opts = url.parse('https://api.finicity.com/aggregation/v2/partners/authentication'),
			data = '<credentials><partnerId>2445581430647</partnerId><partnerSecret>v09TAUzbYsfKnbTFOGn0</partnerSecret></credentials>';
		opts.method = 'POST';
		opts.headers = {};
		opts.headers['Content-Type'] = 'application/xml';
		opts.headers['Finicity-App-Key'] = APP_KEY;

		var req = https.request(opts, function(response) {
			var str = '';

			//another chunk of data has been recieved, so append it to `str`
			response.on('data', function (chunk) {
				str += chunk;
			});

			//the whole response has been recieved, so we just print it out here
			response.on('end', function () {
				parseString(str, function (err, result) {
					token = result.access.token[0];
					console.log(token);
				});
			});
		})

		req.write(data);
		req.end();
	} else {
		console.log(token);
	}
}

function GetInstitution(token, institutionID) {
	
	var opts = url.parse('https://api.finicity.com/aggregation/v1/institutions/' + institutionID);
	opts.method = 'GET';
	opts.headers = {};
	opts.headers['Finicity-App-Token'] = token;
	opts.headers['Finicity-App-Key'] = APP_KEY;

	var req = https.request(opts, function(response) {
		var str = '';

		//another chunk of data has been recieved, so append it to `str`
		response.on('data', function (chunk) {
			str += chunk;
		});

		//the whole response has been recieved, so we just print it out here
		response.on('end', function () {
			parseString(str, function (err, result) {
				var MBNA = result.institution;
				console.log(MBNA);
			});
		});
	})

	req.end();
}

function GetInstitutionLoginForm(token, institutionID) {
	var opts = url.parse('https://api.finicity.com/aggregation/v1/institutions/'+institutionID+'/loginForm');
	opts.method = 'GET';
	opts.headers = {};
	opts.headers['Finicity-App-Token'] = token;
	opts.headers['Finicity-App-Key'] = APP_KEY;

	var req = https.request(opts, function(response) {
		var str = '';

		//another chunk of data has been recieved, so append it to `str`
		response.on('data', function (chunk) {
			str += chunk;
		});

		//the whole response has been recieved, so we just print it out here
		response.on('end', function () {
			parseString(str, function (err, result) {
				console.log(JSON.stringify(result));
			});
		});
	})

	req.end();
}

function AddCustomer(token) {
	var opts = url.parse('https://api.finicity.com/aggregation/v1/customers/testing'),
		data = '<customer> <username>jasondu3</username> <firstName>jason</firstName> <lastName>du</lastName></customer>';
	opts.method = 'POST';
	opts.headers = {};
	opts.headers['Content-Type'] = 'application/xml';
	opts.headers['Finicity-App-Token'] = token;
	opts.headers['Finicity-App-Key'] = APP_KEY;

	var req = https.request(opts, function(response) {
		var str = '';

		//another chunk of data has been recieved, so append it to `str`
		response.on('data', function (chunk) {
			str += chunk;
		});

		//the whole response has been recieved, so we just print it out here
		response.on('end', function () {
			console.log(str);
			parseString(str, function (err, result) {
				console.log(result);
			});
		});
	})
	req.write(data);
	req.end();
}

function AddAllAccounts(token, customerId, institutionId, field1id, field1name, field1value, field2id, field2name, field2value) {
	var opts = url.parse('https://api.finicity.com/aggregation/v1/customers/'+customerId+'/institutions/'+institutionId+'/accounts/addall'),
		data = '<accounts> <credentials> <loginField> <id>'+field1id+'</id> <name>'+field1name+'</name> <value>'+field1value+'</value> </loginField> <loginField> <id>'+field2id+'</id> <name>'+field2name+'</name> <value>'+field2value+'</value> </loginField> </credentials> </accounts>';
	opts.method = 'POST';
	opts.headers = {};
	opts.headers['Content-Type'] = 'application/xml';
	opts.headers['Finicity-App-Token'] = token;
	opts.headers['Finicity-App-Key'] = APP_KEY;

	var req = https.request(opts, function(response) {
		var str = '';

		//another chunk of data has been recieved, so append it to `str`
		response.on('data', function (chunk) {
			str += chunk;
		});

		//the whole response has been recieved, so we just print it out here
		response.on('end', function () {
			console.log(str);
			parseString(str, function (err, result) {
				console.log(result);
			});
		});
	})
	req.write(data);
	req.end();
} 

function GetInstitutions(token) {
	
	var opts = url.parse('https://api.finicity.com/aggregation/v1/institutions?search=MBNA');
	opts.method = 'GET';
	opts.headers = {};
	opts.headers['Finicity-App-Token'] = token;
	opts.headers['Finicity-App-Key'] = APP_KEY;

	var req = https.request(opts, function(response) {
		var str = '';

		//another chunk of data has been recieved, so append it to `str`
		response.on('data', function (chunk) {
			str += chunk;
		});

		//the whole response has been recieved, so we just print it out here
		response.on('end', function () {
			parseString(str, function (err, result) {
				var MBNA = result.institutions.institution[4];
				console.log(MBNA);
				
			});
		});
	})

	req.end();
}

function GetCustomerAccountTransactions(token, customerId, accountNumber, fromdate, todate) {
	var opts = url.parse('https://api.finicity.com/aggregation/v2/customers/'+customerId+'/accounts/'+accountNumber+'/transactions?fromDate='+fromdate+'&toDate=' + todate + '&limit=100&sort=desc');
	opts.method = 'GET';
	opts.headers = {};
	opts.headers['Content-Type'] = 'application/xml';
	opts.headers['Finicity-App-Token'] = token;
	opts.headers['Finicity-App-Key'] = APP_KEY;

	var req = https.request(opts, function(response) {
		var str = '';

		//another chunk of data has been recieved, so append it to `str`
		response.on('data', function (chunk) {
			str += chunk;
		});

		//the whole response has been recieved, so we just print it out here
		response.on('end', function () {
			console.log(str);
			parseString(str, function (err, result) {
				console.log(result);
			});
		});
	})

	req.end();
}



var token = "dWdvMkcsPn6s8tUCM774";
var customer_id = "5410074";
var institutionIDc = "101732";
var accountNumber = "7610023";

//PartnerAuthentication();
//GetInstitution(token, institutionIDc);
//GetInstitutionLoginForm(token, institutionIDc);
//AddCustomer(token);
//AddAllAccounts(token, customer_id, institutionIDc, "101732001", "Banking Userid", "test123", "101732002", "Banking Password", "test424");
//GetCustomerAccountTransactions(token, customer_id, accountNumber, '1297004119', '1454770519')

var io = require('socket.io').listen(backServer);

io.on('connection', function(socket){
	console.log("a user connected");

	socket.on('disconnect', function() {
		console.log("a user disconnected");
	});
});