(function() {

	Game = function() {

	};

	ChristmasTree = function(element) {
		this.element = element;
		this.isStartLightGreen = false;

		this.turnOnStageLights = function () {
			var stagelights = this.element.querySelectorAll(".stage div");
			for (var i = 0; i < stagelights.length; i++) {
				stagelights[i].style.backgroundColor = "gold";
			}
		};

		this.turnOnPreStageLights = function () {
var prestagelights = this.element.querySelectorAll(".pre-stage div");
			for (var i = 0; i < prestagelights.length; i++) {
				prestagelights[i].style.backgroundColor = "gold";
			}
		};

		this.turnOnCountdownLights = function () {
			this.turnOnCountdownLights1 ();

			window.setTimeout(this.turnOnCountdownLights2, 500, this);
			window.setTimeout(this.turnOnCountdownLights3, 1000, this);
			window.setTimeout(this.turnOnStartLights, 1500, this);

		};
		this.turnOnCountdownLights1 = function () {
			var countdownlights1 = this.element.querySelectorAll(".cdl1 div");
			for (var i = 0; i < countdownlights1.length; i++) {
				countdownlights1[i].style.backgroundColor = "gold";
			}
		};
		this.turnOnCountdownLights2 = function (self) {
			var countdownlights2 = self.element.querySelectorAll(".cdl2 div");
			for (var i = 0; i < countdownlights2.length; i++) {
				countdownlights2[i].style.backgroundColor = "gold";
			}
		};
		this.turnOnCountdownLights3 = function (self) {
			var countdownlights3 = self.element.querySelectorAll(".cdl3 div");
			for (var i = 0; i < countdownlights3.length; i++) {
				countdownlights3[i].style.backgroundColor = "gold";
			}
		};
		this.turnOnStartLights = function (self) {
			var startlights = self.element.querySelectorAll(".startlights div");
			for (var i = 0; i < startlights.length; i++) {
				startlights[i].style.backgroundColor = "green";
			}
			self.isStartLightGreen = true;
		};

		this.turnOnFalseStartLights = function () {
			var falsestartlights = this.element.querySelectorAll(".false-startlights div");
			for (var i = 0; i < falsestartlights.length; i++) {
				falsestartlights[i].style.backgroundColor = "red";
			}
		};
		this.beforeGreenLight = function () {
			if (this.isStartLightGreen === true) {
				return false;
			} 
			return true;
		};

	};
	Track = function() {
		this.stageAreaStart = 105;
		this.countdownAreaStart = 150;
		this.startingLine = 160;
		this.finishLine = 718;

		this.inStagingArea = function (car) {
			if (car.distanceTraveled() >= this.stageAreaStart) {
				return true;
			} 
			return false;
		};
		this.approachingStartline = function (car) {
			if (car.distanceTraveled() >= this.countdownAreaStart) {
				return true;
			} 
			return false;
		};
		this.crossedStartLine = function (car) {
			return car.distanceTraveled() >= this.startingLine;
		};
		this.crossedFinishLine = function (car) {
			return car.distanceTraveled() > this.finishLine;
		};
	};
	Car = function(location){
		this.location = location;
		this.location.style.left = "0px";
		this.isEngineRunning = false;

		this.moveForward = function () {
			this.location.style.left = parseInt(this.location.style.left, 10) + 5 + "px";
		};
		this.startEngine = function () {
			this.isEngineRunning = true;
		};
		this.distanceTraveled = function () {
			return parseInt(this.location.style.left, 10);
		};
	};
//create new instance of ChristmasTree	
	var christmasTree = new ChristmasTree(document.getElementById("christmasTree"));
	christmasTree.turnOnPreStageLights ();

//create new instance of Car
	var maple = new Car(document.getElementById("player"));
//create new instance of Track	
	var track = new Track(document.querySelector(".roadway"));
//signal start of game with an alert
	alert("Start the game by pressing 'e' to begin.");
//add event listeners to right arrow key and "e" keypresses
	window.addEventListener('keyup', function(event) {
		
		if (event.keyCode === 39) {
			if (maple.isEngineRunning === false) {
				alert("Please press 'e' to begin.");
			} else {
				maple.moveForward ();
				if (track.inStagingArea(maple)) {
					christmasTree.turnOnStageLights();
				}
				if (track.approachingStartline(maple)){
					christmasTree.turnOnCountdownLights();
				}
				if (track.crossedStartLine(maple) && christmasTree.beforeGreenLight()){
					christmasTree.turnOnFalseStartLights();
					alert("Oh no! You crossed the start line before the start light turned green. Refresh the screen to try again.");
				}
				if (track.crossedFinishLine(maple)) {
					alert("Hooray! You are the winner!");
				}
			} 		
		} 
		if (event.keyCode === 69) {
			if (maple.isEngineRunning === false) {
				alert("Great! Now you can move ahead by pressing the right arrow key.");
				maple.startEngine();
			} else {
				alert("Press the right arrow to move into the yellow staging area.");
			}
		}
	});

})();