var TIMER = function() {
	var self = this;
	
	var zero = 0,
		hourStorage = (localStorage.timer_hour == undefined) 
				? 0 : parseInt(localStorage.timer_hour),
		minuteStorage = (localStorage.timer_minute == undefined) 
				? 0 : parseInt(localStorage.timer_minute),
		secondStorage = (localStorage.timer_second == undefined) 
				? 0 : parseInt(localStorage.timer_second);
		
	//all params are numbers of current timer to set to storage
	self.saveTime = function(hour, minute, second) {
		localStorage.timer_hour = hour;
		localStorage.timer_minute = minute;
		localStorage.timer_second = second;
	};

	self.timerRunning = ko.observable(false),

	//establish observables for time
	self.hour = ko.observable(hourStorage),
	self.minute = ko.observable(minuteStorage),
	self.second = ko.observable(secondStorage);
	
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
		
		//clear storage
		self.saveTime(0, 0, 0);
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
		
		//set time to localStorage
		self.saveTime(self.hour(), self.minute(), self.second());
	};
};

ko.applyBindings(new TIMER());
