var TIMER = function() {
	var self = this;
	
	self.timerRunning = ko.observable(false),
	
	//establish observables for time
	self.hour = ko.observable(0),
	self.minute = ko.observable(0),
	self.second = ko.observable(0);
	
	//create 0 digit to left of number if less than 10
	self.zeroHour = ko.computed(function() {
		return self.hour() <= 9;
	}, self);
	
	self.zeroMinute = ko.computed(function() {
		return self.minute() <= 9;
	}, self);
	
	self.zeroSecond = ko.computed(function() {
		return self.second() <= 9;
	}, self);
	
	//start timer function - event
	self.startTimer = function() {
		if (self.timerRunning() === true) {
			return false;
		}
		self.timerRunning(true);
		self.theTime = setInterval(self.incrementTime, 1000);
	};
	
	//pause timer function - event
	self.pauseTimer = function() {
		clearInterval(self.theTime),
		self.timerRunning(false);
	};
	
	//reset timer function - event
	self.resetTimer = function() {
		clearInterval(self.theTime),
		self.hour(0),
		self.minute(0),
		self.second(0),
		self.timerRunning(false);
	};
	
	// increment time function
	self.incrementTime = function() {
		self.second(self.second() + 1);
		if (self.second() === 60) { 
			self.minute(self.minute() + 1),
			self.second(0);
		} 
		if (self.minute() === 60) { 
			self.minute(0),
			self.hour(self.hour() + 1),
			self.second(0);
		}
		if (self.hour() === 25) {
			self.hour(0),
			self.minute(0),
			self.second(0);
		} 
	};
};

ko.applyBindings(new TIMER());
