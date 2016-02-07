setTimeout(function() { $(document).ready(function() {
			
				
				Chart.defaults.global = {
					// Boolean - Whether to animate the chart
					animation: false,
					// Number - Number of animation steps
					animationSteps: 60,
					// String - Animation easing effect
					// Possible effects are:
					// [easeInOutQuart, linear, easeOutBounce, easeInBack, easeInOutQuad,
					//  easeOutQuart, easeOutQuad, easeInOutBounce, easeOutSine, easeInOutCubic,
					//  easeInExpo, easeInOutBack, easeInCirc, easeInOutElastic, easeOutBack,
					//  easeInQuad, easeInOutExpo, easeInQuart, easeOutQuint, easeInOutCirc,
					//  easeInSine, easeOutExpo, easeOutCirc, easeOutCubic, easeInQuint,
					//  easeInElastic, easeInOutSine, easeInOutQuint, easeInBounce,
					//  easeOutElastic, easeInCubic]
					animationEasing: "easeOutQuart",
					// Boolean - If we should show the scale at all
					showScale: true,
					// Boolean - If we want to override with a hard coded scale
					scaleOverride: false,
					// ** Required if scaleOverride is true **
					// Number - The number of steps in a hard coded scale
					scaleSteps: null,
					// Number - The value jump in the hard coded scale
					scaleStepWidth: null,
					// Number - The scale starting value
					scaleStartValue: null,
					// String - Colour of the scale line
					scaleLineColor: "rgba(0,0,0,.1)",
					// Number - Pixel width of the scale line
					scaleLineWidth: 1,
					// Boolean - Whether to show labels on the scale
					scaleShowLabels: true,
					// Interpolated JS string - can access value
					scaleLabel: "<%=value%>",
					// Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
					scaleIntegersOnly: true,
					// Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
					scaleBeginAtZero: false,
					// String - Scale label font declaration for the scale label
					scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
					// Number - Scale label font size in pixels
					scaleFontSize: 12,
					// String - Scale label font weight style
					scaleFontStyle: "normal",
					// String - Scale label font colour
					scaleFontColor: "#666",
					// Boolean - whether or not the chart should be responsive and resize when the browser does.
					responsive: false,
					// Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
					maintainAspectRatio: true,
					// Boolean - Determines whether to draw tooltips on the canvas or not
					showTooltips: true,
					// Function - Determines whether to execute the customTooltips function instead of drawing the built in tooltips (See [Advanced - External Tooltips](#advanced-usage-custom-tooltips))
					customTooltips: false,
					// Array - Array of string names to attach tooltip events
					tooltipEvents: ["mousemove", "touchstart", "touchmove"],
					// String - Tooltip background colour
					tooltipFillColor: "rgba(0,0,0,0.8)",
					// String - Tooltip label font declaration for the scale label
					tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
					// Number - Tooltip label font size in pixels
					tooltipFontSize: 14,
					// String - Tooltip font weight style
					tooltipFontStyle: "normal",
					// String - Tooltip label font colour
					tooltipFontColor: "#fff",
					// String - Tooltip title font declaration for the scale label
					tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
					// Number - Tooltip title font size in pixels
					tooltipTitleFontSize: 14,
					// String - Tooltip title font weight style
					tooltipTitleFontStyle: "bold",
					// String - Tooltip title font colour
					tooltipTitleFontColor: "#fff",
					// Number - pixel width of padding around tooltip text
					tooltipYPadding: 6,
					// Number - pixel width of padding around tooltip text
					tooltipXPadding: 6,
					// Number - Size of the caret on the tooltip
					tooltipCaretSize: 8,
					// Number - Pixel radius of the tooltip border
					tooltipCornerRadius: 6,
					// Number - Pixel offset from point x to tooltip edge
					tooltipXOffset: 10,
					// String - Template string for single tooltips
					tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
					// String - Template string for multiple tooltips
					multiTooltipTemplate: "<%= value %>",
					// Function - Will fire on animation progression.
					onAnimationProgress: function(){},
					// Function - Will fire on animation completion.
					onAnimationComplete: function(){}
				};
				
				
				
				var myLineChart;
				var points = [28, -48, -670, 19, 86, 300, 30, 20, -450, 600, -1670, -2200];
			
			
			
				// Get the context of the canvas element we want to select
				var ctx = document.getElementById("myChart").getContext("2d");
				
				
				var drawDashedLine = function(points) {
					var pointsGr = points;
					var len = pointsGr.length;
					if (len > 1) {
						ctx.save();
						ctx.beginPath();
						ctx.moveTo(pointsGr[len-2].x,pointsGr[len-2].y);
						ctx.lineTo(pointsGr[len-1].x,pointsGr[len-1].y);
						ctx.lineWidth=2;
						ctx.strokeStyle = 'white';
						ctx.setLineDash([5]);
						ctx.stroke();
						ctx.setLineDash([]);
						ctx.restore();
					}
				};
								
								
								
				var data = {
					labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
					datasets: [{
						data: points,
						label: "My Second dataset",
						fillColor: "transparent",
						strokeColor: "#ed1b2e",
						pointColor: "red",
						pointStrokeColor: "#fff",
						pointHighlightFill: "#fff",
						pointHighlightStroke: "rgba(151,187,205,1)"
					}]
				};
				Chart.types.Line.extend({
					name: "LineWithLine",
					draw: function () {
						Chart.types.Line.prototype.draw.apply(this, arguments);
						
						var point = this.datasets[0].points[this.options.lineAtIndex];
						var scale = this.scale;
						drawDashedLine(this.datasets[0].points);
						
						var xaxis = this.scale.calculateY(0);
						
						// draw line
						this.chart.ctx.beginPath();
						this.chart.ctx.moveTo(scale.xScalePaddingLeft, xaxis);
						this.chart.ctx.strokeStyle = 'gray';
						this.chart.ctx.lineWidth = 2;
						this.chart.ctx.lineTo(scale.width, xaxis);
						this.chart.ctx.stroke();
					}
				});
				
				var maxV = Math.max.apply(Math,points); // 3
				var minV = Math.min.apply(Math,points); // 1
				var step  = 400;
				if (maxV < 0) {
					var max   = 0
					var start = minV - 10;
				} else if (minV > 0) {
					var max  = maxV + 10;
					var start = 0;
				} else {
					var max   = maxV + 10;
					var start = minV - 10;
				}
				
			
				var myLineChart = new Chart(ctx).LineWithLine(data, {
					datasetFill : false,
					/*lineAtIndex: 2,*/
					bezierCurve: false,
					scaleOverride: true,
					scaleSteps: Math.ceil((max-start)/step),
					scaleStepWidth: step,
					scaleStartValue: start,
					datasetFill : true
				});
	
				var len = myLineChart.datasets[0].points.length;
				if (len > 0) {
					myLineChart.datasets[0].points[len-1].fillColor = "blue";
					
					$("div.card").on("mouseenter", function() {
						myLineChart.datasets[0].points[len-1].value = 0;   // <---- doesn't work, it moves but then slides back to initial location
						myLineChart.update();
					}).on("mouseleave", function() {
						myLineChart.datasets[0].points[len-1].value = -2200;   // <---- doesn't work, it moves but then slides back to initial location
						myLineChart.update();
					});
				}
				if (len > 1) {
					myLineChart.datasets[0].points[len-2].fillColor = "blue";
				}
				
				myLineChart.update();
				
				
				
				/////////////////////////////////////////////////////////////////////////////////////////////////////////
				
				
				if ( navigator.geolocation ) {
					// Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
					navigator.geolocation.getCurrentPosition(function (pos) {
						var point = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
						alert(point);
					}, function (error) {
						
						switch(error.code) {
							case error.PERMISSION_DENIED:
								alert("Could not get your location. User denied the request for Geolocation.");
								break;
							case error.POSITION_UNAVAILABLE:
								alert("Could not get your location. Location information is unavailable.");
								break;
							case error.TIMEOUT:
								alert("Could not get your location. The request to get user location timed out.");
								break;
							case error.UNKNOWN_ERROR:
								alert("Could not get your location. An unknown error occurred.");
								break;
							default:
								alert("Could not get your location. An unknown error occurred.");
						}
					}, {
						maximumAge: 500000, 
						enableHighAccuracy:true, 
						timeout: 6000
					});
				} else {
				}
				
				
			}); },3000);