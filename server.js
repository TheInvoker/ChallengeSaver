var express = require('express');
var app = express();
var https = require('https'),
    url = require('url');
var parseString = require('xml2js').parseString;
var parser = require("./parser.js");
var neuralnets = require("./neuralnets.js");
var plotly = require("plotly")("rydsouza82", "orzgrkqusr");
var synaptic = require("synaptic");

function dec2bin(dec){
    return (dec >>> 0).toString(2);
}
function dec2binLength(dec, l) {
	var b = dec2bin(dec);
	while (b.length < l) {
		b = "0" + b;
	}
	return b;
}
function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
function convertDateToBin(date) {
	var dateList = date.split("/");
	for(var j=0; j<dateList.length; j+=1) {
		dateList[j] = parseInt(dateList[j], 10);
	}
	
	var a = dec2binLength(dateList[0], 4);
	var b = dec2binLength(dateList[1], 5);
	var c = a + b;
	var d = c.split("");
	for(var j=0; j<d.length; j+=1) {
		d[j] = parseInt(d[j], 10);
	}
	return d;
}
function convertBintoNet(bin) {
	for(var i=0; i<bin.length; i+=1) {
		bin[i] = bin[i] > 0.5 ? 1 : 0;
	}
	var num = bin.join("");
	var numB = parseInt(num, 2);
	return numB;
}


var userData = {};
parser.parser(function(categoryObj) {
	
	var total = 0;
	for (category in categoryObj) {
		var items = categoryObj[category].list;
		total += items.length;
	}

	var net = 0;
	var posnet = 0;
	var newData = [];
	for (category in categoryObj) {
		var items = categoryObj[category].list;
		
		var avg = 0;
		for(var i=0; i<items.length; i+=1) {
			net += items[i].price;
			avg += items[i].price;
			if (items[i].price < 0) {
				posnet += -items[i].price;
			}
			newData.push(net);
		}
		avg = (items.length==0) ? 0 : avg/items.length;
		
		categoryObj[category].ratio = items.length / total;
		categoryObj[category].avgprice = avg;
	}

	if (net < 0) {
		var debt = -net * 0.35;
	} else {
		var debt = net * 0.1;
	}
	var dropratio = debt / posnet;
	
	var returnData = {};
	for (category in categoryObj) {
		var s = categoryObj[category].avgprice * dropratio;
		returnData[category] = s;
	}
	userData = {
		'netData' : newData,
		'limits' : returnData
	};
	
	
	/*
	return;
	

	
	var Perceptron = synaptic.Architect.Perceptron,
	  LSTM = synaptic.Architect.LSTM,
	  Layer = synaptic.Layer,
	  Network = synaptic.Network,
	  Trainer = synaptic.Trainer;
		
	var inputLayer = new Layer(9);
	var hiddenLayer = new Layer(6);
	var outputLayer = new Layer(11);
		
	inputLayer.project(hiddenLayer, Layer.connectionType.ALL_TO_ALL);
	hiddenLayer.project(outputLayer, Layer.connectionType.ALL_TO_ALL);
	
	var myNetwork = new Network({
		input: inputLayer,
		hidden: [hiddenLayer],
		output: outputLayer
	});

	var trainer = new Trainer(myNetwork);
	var net = 0;
	var outsTime = [];	
	var minNet = 0;
	
	for(var i=0; i<dataList.length; i+=1) {
		net += dataList[i].price;
		net = parseInt(Math.floor(net), 10);
		minNet = Math.min(minNet, net);
		outsTime.push(net);
	}
	for(var i=0; i<outsTime.length; i+=1) {
		outsTime[i] += minNet;
	}
	
	var q = 0;
	var trainingSet = [];
	for(var i=0; i<dataList.length; i+=1) {
		var d = convertDateToBin(dataList[i].date);
		var a = dec2binLength(outsTime[i], 11);
		var b = a.split("");
		for(var j=0; j<b.length; j+=1) {
			b[j] = parseInt(b[j], 10);
		}

		trainingSet.push({
			'input' : [0.3,0.4,0.4,0.5,0.2,0.2,0.04,0.3,0.9],
			'output' : b
		});
	}
	
	var trainer = new Trainer(myNetwork);
	trainer.train(trainingSet,{
		rate: .5,
		iterations: 500,
		error: .0005,
		shuffle: true,
		cost: Trainer.cost.CROSS_ENTROPY
	});
		
		
		
	//var d = convertDateToBin("01/05/2016");
	//var result = myNetwork.activate(d);
	//var r = convertBintoNet(result)-minNet;
	//console.log(r);
	//return;
	
	
	var d = new Date(Date.parse("01/04/2016"));
	var newData = [];
	var newLen = 1000;
	
	for(var i=0; i<newLen; i+=1) {
		d.setMonth(d.getMonth() + 1);
		var newStr = (d.getMonth()+1) + "/" + d.getDate() + "/" + d.getFullYear();
				
		var w = convertDateToBin(newStr);
		var t = myNetwork.activate(w);
		var y = convertBintoNet(t)-minNet;
		
		newData.push(1);
	}

	
	
	//console.log("Trained!");
	
	*/
	
	
	
	
	/*
	var xs = [];
	var acc = 0;
	for (var i=0; i<newData.length; i+=1) {
		xs.push(i);
	}
	var ys = newData; 
	
	
	var data = [
	  {
		x: xs,
		y: ys,
		type: "scatter"
	  }
	];
	var layout = {
	  xaxis: {
		autorange: false
	  }
	};
	
	console.log("Making graph");

	
	var graphOptions = {filename: "date-axes", fileopt: "overwrite"};
	plotly.plot(data, graphOptions, function (err, msg) {
		console.log(msg);
		console.log("DONE!");
	});
	*/
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


/*
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

*/

var io = require('socket.io').listen(backServer);

io.on('connection', function(socket){
	console.log("a user connected");

	socket.on('getChallenge', function() {
		socket.emit('getChallengeSuccess', userData);
	});
	
	socket.on('disconnect', function() {
		console.log("a user disconnected");
	});
});