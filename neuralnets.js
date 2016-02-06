/*
	neurons - a list of numbers represents the fully connected layers. So for example [3, 4, 5, 2]
	means make a neural net with input layer having 3 neurons, first hidden layer 4 neurons, second hidden
	layer has 5 neurons, output layer has 2 neurons.
	
	funcType - a string for what activation function you want.
	
	alpha - learning rate
	
	encodeFunc - a function that takes any data and returns a list of numbers (of size neurons[0]) to put into the input layer
	
	decodeFunc - a function that takes a list of numbers (of size neurons[-1]) and turns it back into your desired data
*/

exports.neural_nets = function(neurons, funcType, alpha, encodeFunc, decodeFunc) {
	
	var matrix_list = [], activation_func, derivative_activation_func;
	
	// returns random number in range [-1, 1)
	var randomNum = function() {
		return 2 * Math.random() - 1;
	};
	
	// creates a matrix with random numbers
	var randomMatrix = function(h, w) {
		var nm = [], i, j, m;
		for(i=0; i<h; i+=1) {
			m = [];
			for(j=0; j<w; j+=1) {
				m.push(randomNum());
			}
			nm.push(m);
		}
		return nm;
	};
	
	// multiplies a matrix with a vector, results goes through postFunc function
	var vectorMatrixMultiply = function(v, m, postFunc) {
		if (m.length == 0) {
			return [];
		}
		var columnLen = m[0].length, rowLen = m.length, n=[], q, c, g, s;
		for(q=0; q<columnLen; q+=1) {
			s = 0;
			for(c=0; c<rowLen; c+=1) {

				s += v[c] * m[c][q];
			}
			
			g = postFunc(s);
			
			if (isNaN(g)) {
				console.log(g);
				console.log(s);
				console.log(hyperbolicTangent(s));
				return;
			}
			
			n.push(g);
		}
		return n;
	};

	// define some activation functions
	
	var logistic = function (t) {
		return 1/(1+Math.pow(Math.E, -t));
	};
	
	var logisticDerivative = function(x) {
		return x * (1 - x); 
	};
	
	var hyperbolicTangent = function(x) {
	  x = x * 1;  // Convert to number.
	  // x is Infinity or NaN
	  if (!Math.abs(x) === Infinity) {
		if (x > 0) return 1;
		if (x < 0) return -1;
		return x;
	  }
	  var ax = Math.abs(x);
	  var z;
	  // |x| < 22
	  if (ax < 22) {
		var twoM55 = 2.77555756156289135105e-17; // 2^-55, empty lower half
		if (ax < twoM55) {
		  // |x| < 2^-55, tanh(small) = small.
		  return x;
		}
		if (ax >= 1) {
		  // |x| >= 1
		  var t = Math.exp(2 * ax);
		  z = 1 - 2 / (t + 2);
		} else {
		  var t = Math.exp(-2 * ax);
		  z = -t / (t + 2);
		}
	  } else {
		// |x| > 22, return +/- 1
		z = 1;
	  }
	  return (x >= 0) ? z : -z;
	};
	
	var hyperbolicTangentDerivative = function(x) {
		var q = Math.tanh(x);
		return 1 - q*q; 
	};
	
	// main neural net algorithms
	
	var feedForward = function(currentLayer, pre_compute_func) {
		var j, ml = matrix_list.length;
		
		for(j=0; j<ml; j+=1) {
			// add bias term
			currentLayer.push(1);
			// do any pre computation step
			pre_compute_func(currentLayer);
			// multiply the output vector by the weight matrix and squash it with activation function
			currentLayer = vectorMatrixMultiply(currentLayer, matrix_list[j], activation_func);
		}
		return currentLayer;
	};

	var backPropagation = function(currentLayer, expected, output_list) {
		var j, k, p, currentMatrixLen=matrix_list.length, curentLayerLen=currentLayer.length;
		var prevLayerOutput, newMatrix, newMatrixLen;
		var delta, derivativeVal, deltaAcc, neuronError, old_error_list = [], temp_error_list = [], new_matrix_list=[];
		
		// loop from last weight matrix to first
		for(j=currentMatrixLen-1; j>=0; j-=1) {
			// get the previous layer output values starting from the end
			prevLayerOutput = output_list[j];
			
			newMatrix = matrix_list[j].slice(0);
			newMatrixLen = newMatrix.length;
			
			// loop through all the neurons in the current layer
			for(k=0; k<curentLayerLen; k+=1) {

				if (j == currentMatrixLen-1) {
					delta = currentLayer[k] - expected[k];
					derivativeVal = derivative_activation_func(currentLayer[k]);
					neuronError = delta * derivativeVal;
				} else {
					deltaAcc = vectorMatrixMultiply(old_error_list, [matrix_list[j+1][k]], function(x){return x;})[0];
					neuronError = deltaAcc * derivative_activation_func(currentLayer[k]);
				}
				
				// store the error
				temp_error_list.push(neuronError);
				
				// gets the new weight values
				// loop through the column of weights
				for(p=0; p<newMatrixLen; p+=1) {
					newMatrix[p][k] -= alpha * (neuronError * prevLayerOutput[p]);
				}
			}
			currentLayer = output_list[j];
			curentLayerLen = currentLayer.length-1;
			
			old_error_list = temp_error_list;
			temp_error_list = [];

			new_matrix_list.unshift(newMatrix);
		}
		
		return new_matrix_list;
	};
	
	// public functions
	
	this.getMatrix = function() {
		return matrix_list;
	};
	
	this.setMatrix = function(m) {
		matrix_list = m;
	};
	
	this.runInput = function(input) {
		var en = encodeFunc(input);
		var output = feedForward(en, function(input){});
		var de = decodeFunc(output);
		return de;
	};
	
	this.train = function(training_item) {
	
		var output_list = [], i, input, expected;
	
		input = encodeFunc(training_item[0]);
		expected = encodeFunc(training_item[1]);
		
		// feed forward
		input = feedForward(input, function(input) {
			output_list.push(input);
		});

		// back propagation
		var new_matrix_list = backPropagation(input, expected, output_list);
		
		matrix_list = new_matrix_list;
	};
	
	// create a list of matrices of random initial weights
	// each matrix represents the weights from left side of neural nets to right side
	// so the matrix of layers (A->B) represents each weight of the neurons from A to B.
	// for example the first column represents each weight from all neurons of A going into the first neuron in B.
	// the second column represents each weight from all neurons of A going into the second neuron in B.
	for(var i=0; i<neurons.length-1; i+=1) {
		matrix_list.push(randomMatrix(neurons[i]+1, neurons[i+1]));
	}
	
	// get the right activation and derivative function
	if (funcType == 'logistic') {
		activation_func = logistic;
		derivative_activation_func = logisticDerivative;
	} else if (funcType == 'hyperbolictangent') {
		activation_func = hyperbolicTangent;
		derivative_activation_func = hyperbolicTangentDerivative;
	} else {
		console.log("Invalid activation function!");
	}
};