'use strict';

var eventsApp = angular.module('events');

eventsApp.controller('EventsCreateController', ['$scope', '$googleCalendar','$location', 
						function($scope , $googleCalendar, $location) {

	$scope.events = [];
	
	$scope.durations = [
		{label:'Half Day (4 hours)', hours:4},
		{label:'Full Day (8 hours)', hours:8}
	];
	
/*
	var addEventModal = $modal({
		title: 'Add Event',
		template: 'modules/events/views/create-events.client.view.html',
		show: false,
		animation: 'am-fade-and-scale',
		scope: $scope
	});
*/
	//================================================================================
	// Scope Functions
	//================================================================================
	
/*
	$scope.showAddEventModal = function() {
		addEventModal.$promise.then(addEventModal.show);
	};
*/	

	this.addEvent = function() {

		console.log('Start Date:', $scope.event.startDate);

		//format end date/time object in to google format
		var endDate = new Date($scope.event.startDate);
		endDate.setHours(endDate.getHours() + $scope.event.duration.hours);
		console.log('End Date:', endDate);

		$googleCalendar.addEvent($scope.event.startDate, endDate, $scope.contactInfo).then(function(result) {
			console.log('Add Event Result:', result);
			//addEventModal.hide();
		});
 
	};
	
	this.update = function(selectedDropdownItems) {
		
		$scope.contactInfo = selectedDropdownItems;
		console.log($scope.contactInfo);
	};

}]);

eventsApp.controller('EventsController', ['$scope', '$googleCalendar', 
						function($scope , $googleCalendar) {


	//================================================================================
	// Variables
	//================================================================================

	$scope.events = [];
	
	$scope.calOptions = {
		header: {
			left: 'prev',
			center: 'title',
			right: 'next'
		}	
	};

	//================================================================================
	// Scope Functions
	//================================================================================
	
	$scope.getEvents = function() {
		$googleCalendar.getEvents().then(function(events) {
			console.log(events);
			$scope.events = events;
		});
	};
	$scope.getEvents();

	$scope.setCurrentEvent = function(event) {
		$scope.currentEvent = event;
	};
	

}]);