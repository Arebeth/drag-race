(function() {

//ChristmasTree constructor object
	ChristmasTree = function(element) {
		this.element = element;
		this.isStartLightGreen = false;
//ChristmasTree object functions
//turn on stage lights
		this.turnOnStageLights = function () {
			var stagelights = this.element.querySelectorAll(".stage div");
			for (var i = 0; i < stagelights.length; i++) {
				stagelights[i].style.backgroundColor = "gold";
			}
		};
//turn on prestage lights
		this.turnOnPreStageLights = function () {
			var prestagelights = this.element.querySelectorAll(".pre-stage div");
			for (var i = 0; i < prestagelights.length; i++) {
				prestagelights[i].style.backgroundColor = "gold";
			}
		};
//turn on countdown lights (3-2-1-go)
		this.turnOnCountdownLights = function () {
			this.turnOnCountdownLights1 ();

			window.setTimeout(this.turnOnCountdownLights2, 500, this);
			window.setTimeout(this.turnOnCountdownLights3, 1000, this);
			window.setTimeout(this.turnOnStartLights, 1500, this);

		};
//turn on 1st countdown lights
		this.turnOnCountdownLights1 = function () {
			var countdownlights1 = this.element.querySelectorAll(".cdl1 div");
			for (var i = 0; i < countdownlights1.length; i++) {
				countdownlights1[i].style.backgroundColor = "gold";
			}
		};
//turn on 2nd countdown lights
		this.turnOnCountdownLights2 = function (self) {
			var countdownlights2 = self.element.querySelectorAll(".cdl2 div");
			for (var i = 0; i < countdownlights2.length; i++) {
				countdownlights2[i].style.backgroundColor = "gold";
			}
		};
//turn on 3rd countdown lights
		this.turnOnCountdownLights3 = function (self) {
			var countdownlights3 = self.element.querySelectorAll(".cdl3 div");
			for (var i = 0; i < countdownlights3.length; i++) {
				countdownlights3[i].style.backgroundColor = "gold";
			}
		};
//turn on start lights
		this.turnOnStartLights = function (self) {
			var startlights = self.element.querySelectorAll(".startlights div");
			for (var i = 0; i < startlights.length; i++) {
				startlights[i].style.backgroundColor = "green";
			}
			self.isStartLightGreen = true;
		};
//turn on false start light
		this.turnOnFalseStartLights = function () {
			var falsestartlights = this.element.querySelectorAll(".false-startlights div");
			for (var i = 0; i < falsestartlights.length; i++) {
				falsestartlights[i].style.backgroundColor = "red";
			}
		};
//false start lights
		this.beforeGreenLight = function () {
			if (this.isStartLightGreen === true) {
				return false;
			} 
			return true;
		};

	};
//Track constructor object
	Track = function() {
		this.stageAreaStart = 105;
		this.countdownAreaStart = 150;
		this.startingLine = 160;
		this.finishLine = 718;
//Track functions...
//check to see if the car is in the staging area
		this.inStagingArea = function (car) {
			if (car.distanceTraveled() >= this.stageAreaStart) {
				return true;
			} 
			return false;
		};
//check to see if the car is approaching the line - 
//if player gets past a certain point,run the countdown lights functions. 
//if player crosses the start line before light is green, run false start function.
//if player crosses finish line, run finish line function.
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
//Car constructor object
	Car = function(location){
		this.location = location;
		this.location.style.left = "0px";
		this.isEngineRunning = false;
//Car functions...
//move the car forward 5px at a time
		this.moveForward = function () {
			this.location.style.left = parseInt(this.location.style.left, 10) + 5 + "px";
		};
//is engine running?
		this.startEngine = function () {
			this.isEngineRunning = true;
		};
//
		this.distanceTraveled = function () {
			return parseInt(this.location.style.left, 10);
		};
	};

//Overall game functions
//create new instances of ChristmasTree, Car & Track

	var christmasTree = new ChristmasTree(document.getElementById("christmasTree"));
	//turn on prestage lights when the game starts
	christmasTree.turnOnPreStageLights ();

	var maple = new Car(document.getElementById("player"));

	var track = new Track(document.querySelector(".roadway"));

//run game functions...

//signal start of game with an alert
	alert("Start the game by pressing 'e' to begin.");

//add event listeners to right arrow key and "e" keypresses
	window.addEventListener('keyup', function(event) {
		//if button right arrow key is pressed...	
		if (event.keyCode === 39) {
			//and if the car is not running, alert player to press e to begin(start engine/get mobility)
			if (maple.isEngineRunning === false) {
				alert("Please press 'e' to begin.");
			//if the car is running, allow player to move forward
			} else {
				maple.moveForward ();
				//if player moves forward and car is in staging area, run stage lights functions.
				if (track.inStagingArea(maple)) {
					christmasTree.turnOnStageLights();
				}
				//if player moves forward and car is approaching start line, run countdown lights functions.
				if (track.approachingStartline(maple)){
					christmasTree.turnOnCountdownLights();
				}
				//if the player crosses the start line and it's before the green lights, aler player they false started.
				if (track.crossedStartLine(maple) && christmasTree.beforeGreenLight()){
					christmasTree.turnOnFalseStartLights();
					alert("Oh no! You crossed the start line before the start light turned green. Refresh the screen to try again.");
				}
				//if player crosses the finish line, alert them of their victory.
				if (track.crossedFinishLine(maple)) {
					alert("Hooray! You are the winner!");
				}
			} 		
		} 
		//if they press the "e" key...
		if (event.keyCode === 69) {
			//and if the engine is not running, start engine and alert player they can move right.
			if (maple.isEngineRunning === false) {
				alert("Great! Now you can move ahead by pressing the right arrow key.");
				maple.startEngine();
			//if engine is running, alert player to move into staging.
			} else {
				alert("Press the right arrow to move into the yellow staging area.");
			}
		}
		//if they press any other key, do nothing.
	});
//
//Game constructor object - did not use
//Game = function() {};
//run the very beginning anonymous function.
})();