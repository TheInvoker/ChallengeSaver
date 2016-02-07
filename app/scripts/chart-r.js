			$(document).ready(function() {
							
				/* Set some base options (settings will override the default settings in Chartist.js *see default settings*). We are adding a basic label interpolation function for the xAxis labels. */
				var options = {
					axisX: {
						labelInterpolationFnc: function(value) {
							return 'Calendar Week ' + value;
						}
					}
				};
							
				var points = [-10, -8, -5, -12, -8, -4];
				var maxPoint = Math.max.apply(Math,points);
				var minPoint = Math.min.apply(Math,points);
				if (maxPoint < 0) {
					options.high = 0;
				} else if (minPoint > 0) {
					options.low = 0;
				}
							
				/* Add a basic data series with six labels and values */
				var data = {
				  labels: ['1', '2', '3', '4', '5', '6'],
				  series: [
					{
					  data: points
					}
				  ]
				};
				/* Now we can specify multiple responsive settings that will override the base settings based on order and if the media queries match. In this example we are changing the visibility of dots and lines as well as use different label interpolations for space reasons. */
				var responsiveOptions = [
				  ['screen and (min-width: 641px) and (max-width: 1024px)', {
					showPoint: true,
					axisX: {
					  labelInterpolationFnc: function(value) {
						return 'Week ' + value;
					  }
					}
				  }],
				  ['screen and (max-width: 640px)', {
					showLine: true,
					axisX: {
					  labelInterpolationFnc: function(value) {
						return 'W' + value;
					  }
					}
				  }]
				];
				/* Initialize the chart with the above settings */
				// new Chartist.Line('#my-chart', data, options, responsiveOptions);
			});