var streaming = false;
var restartStreaming = false;
var updateID = 0;
var reconnectionRate = 100;
var lastRefreshDate = new Date();

function processStreamedDataLine(line) {
	var dataStrings = line.split('\t');
	var succProcessed = false;
	if (dataStrings.length >= 1) {
		var commandString = dataStrings[0];
		
		if (commandString == "UIH") {
			var elementID = dataStrings[1];
			var replaceValue = dataStrings[2];
			var element = document.getElementById(elementID);
			if (element) {
				element.innerHTML = replaceValue;
			}
			succProcessed = true;
		} else if (commandString == "USW") {
			var elementID = dataStrings[1];
			var replaceValue = dataStrings[2];
			var element = document.getElementById(elementID);
			if (element) {
				element.style.width = replaceValue;
			}
			succProcessed = true;
		} else if (commandString == "SOC") {		
			var time = dataStrings[1];
			var countdown = dataStrings[2];
			var counterIDString = dataStrings[3];
			var showTextValue = dataStrings[4];			
			overlay(showTextValue,time,countdown,counterIDString);
			succProcessed = true;
		} else if (commandString == "UCL") {
			var elementID = dataStrings[1];
			var replaceValue = dataStrings[2];
			var element = document.getElementById(elementID);
			if (element) {
				element.className = '';
				setTimeout(function(){
					element.className = replaceValue;
				},10);
			}
			succProcessed = true;
		} else if (commandString == "UBA") {
			var elementID = dataStrings[1];
			var replaceValue = dataStrings[2];
			var element = document.getElementById(elementID);
			if (element) {
				var blinkID = 0;
				if (element.blinkID) {
					blinkID = element.blinkID;
				}
				var nextBlinkID = blinkID+1;
				if (nextBlinkID >= 10) {
					nextBlinkID = 0;
				}
				element.blinkID = nextBlinkID;
				element.style.animationName = '';
				element.style.animation = '';
				element.className = '';
				setTimeout(function(){
					element.className = replaceValue+'-'+nextBlinkID;
				},10);
			}
			succProcessed = true;
		} else if (commandString == "TUCL") {
			var elementID = dataStrings[1];
			var replaceValue = dataStrings[2];
			var time = dataStrings[3];
			var element = document.getElementById(elementID);
			if (element) {
				updateID = updateID+1;
				var localUpdateID = updateID;
				element.updateID = localUpdateID;
				setTimeout(function(){
					var elementT = document.getElementById(elementID);
					if (elementT != null && elementT.updateID == localUpdateID) {
						elementT.className = replaceValue;
					}
				},time);
			}
			succProcessed = true;
		}
	}

	if (succProcessed == true) {
		reconnectionRate = 500;
	}
	
}


function prefillZeros(s,c) {
	while (s.length < c) {
		s = "0"+s;
	}
	return s;
}

function getTimeString(d) {
	var hoursString = prefillZeros(d.getHours().toString(),2);
	var minutesString = prefillZeros(d.getMinutes().toString(),2);
	var timeString = hoursString+":"+minutesString;
	return timeString;
}

function updateTime() {
	var timeString = getTimeString(new Date());
	var timeElement = document.getElementById("local-time");	
	timeElement.innerHTML = timeString;
}
updateTime();
setInterval(function(){updateTime()}, 1000);


function updateRefreshTime() {
	lastRefreshDate = new Date();
	var timeString = getTimeString(lastRefreshDate);
	var timeElement = document.getElementById("last-refresh-time");	
	timeElement.innerHTML = timeString;
	checkCriticalRefreshTime();
}


function checkCriticalRefreshTime() {
	var curDate = new Date();
	var timeDiff = curDate.getTime()-lastRefreshDate.getTime();
	var refreshElement = document.getElementById("last-refresh-time");
	if (timeDiff > 1000*60*10) {
		if (refreshElement.className != "critical-refresh-time") {
			refreshElement.className = "critical-refresh-time";
		}
	} else {
		if (refreshElement.className != "good-refresh-time") {
			refreshElement.className = "good-refresh-time";
		}
	}
}
checkCriticalRefreshTime();
setInterval(function(){checkCriticalRefreshTime()}, 1000*60);


function increaseReconnectionRate() {
	reconnectionRate = reconnectionRate*2;
	if (reconnectionRate > 600000) {
		reconnectionRate = 600000;
	}	
}

function resultDataStreaming(requestParam) {
	if (!window.XMLHttpRequest) {
		return;
	}
	if (streaming) {
		return
	}
	streaming = true;
	restartStreaming = false;
	 
	try {
		var xhr = new XMLHttpRequest();  
		var prevDataLength  = 0;
		var nextLinePos  = 0;
		 
		xhr.onerror = function() { 
			streaming = false;
			removeOverlay();
			if (!restartStreaming) {
				restartStreaming = true;
				window.setTimeout(function(){
					resultDataStreaming(requestParam);
				},reconnectionRate); 
				increaseReconnectionRate();		
			}
		};
		
		xhr.onreadystatechange = function() {
			try {
				if (xhr.readyState > 2) {
				
					prevDataLength = xhr.responseText.length;
					var response = xhr.responseText.substring(nextLinePos);
					var lines = response.split('\n');
					nextLinePos = nextLinePos + response.lastIndexOf('\n') + 1;
					if (response[response.length-1] != '\n') {
						lines.pop();
					}
					for (var i = 0; i < lines.length; i++) {
						try {
							updateRefreshTime();
							processStreamedDataLine(lines[i]);
						} catch (e) {
						}						
					}
					if (nextLinePos > 5000000) {
						streaming = false;						
						xhr.abort();
						if (!restartStreaming) {
							restartStreaming = true;
							window.setTimeout(function(){
								resultDataStreaming(requestParam);
							},reconnectionRate);
							increaseReconnectionRate();		
						}
					}
				}   
				if (xhr.readyState == 4) {
					streaming = false;
					removeOverlay();
					if (!restartStreaming) {
						restartStreaming = true;					
						window.setTimeout(function(){
							resultDataStreaming(requestParam);
						},reconnectionRate);
						increaseReconnectionRate();		
					}
				}
			} catch (e) {
			}                
			 
		};
 
		xhr.open("GET", "/live/resultStream/"+requestParam, true);
		xhr.send(null);      
	}
	catch (e) {
	}
}






var overlayBox = null;
var lightBox = null;

var overlayRemoveTimer = null;
var overlayCountdownTimer = null;


function overlay(text,time,counter,countDownID) {

	if (overlayBox) {
		document.getElementsByTagName("body")[0].removeChild(overlayBox);
		document.getElementsByTagName("body")[0].removeChild(lightBox);	
		clearTimeout(overlayRemoveTimer);
		clearTimeout(overlayCountdownTimer);
	}

	overlayBox = document.createElement("div");
	overlayBox.setAttribute('id', 'overlay');
	overlayBox.setAttribute('className', 'overlayBG');
	overlayBox.setAttribute('class', 'overlayBG');


	lightBox = document.createElement('div');
	lightBox.setAttribute('id', 'lightBox');
	lightBox.innerHTML = text;

	document.getElementsByTagName("body")[0].appendChild(overlayBox);
	document.getElementsByTagName("body")[0].appendChild(lightBox);
	
	overlayRemoveTimer = setTimeout(function(){removeOverlay()}, time);
	overlayCountdownTimer = setTimeout(function(){countDown(counter,countDownID)}, 1000);

}


function countDown(counter,countDownID) {
	if (counter > 0) {
		var countingElement = document.getElementById(countDownID);
		if (countingElement) {
			countingElement.innerHTML = counter-1;
			overlayCountdownTimer = setTimeout(function(){countDown(counter-1,countDownID)}, 1000);
		}
	}
}


function removeOverlay() {
	if (overlayBox) {
		document.getElementsByTagName("body")[0].removeChild(overlayBox);
		document.getElementsByTagName("body")[0].removeChild(lightBox);	
		clearTimeout(overlayRemoveTimer);
		clearTimeout(overlayCountdownTimer);
	}
	
	overlayBox = null;
	lightBox = null;
}



