'use strict';

var eventsApp = angular.module('events');

eventsApp.controller('EventsCreateController', ['$scope', '$googleCalendar','$location', '$log',
						function($scope , $googleCalendar, $location, $log) {

	$scope.events = [];
	
	$scope.durations = [
		{label:'Half Day (4 hours)', hours:4},
		{label:'Full Day (8 hours)', hours:8}
	];	
	
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

eventsApp.controller('EventsController', ['$scope', '$googleCalendar', '$uibModal', '$log',
						function($scope , $googleCalendar, $uibModal, $log) {


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
	
	// Open a modal window to create a single event
    this.modelCreate = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'modules/events/views/create-events.client.view.html',
      controller: function ($scope, $uibModalInstance) {
    
        $scope.ok = function () {
          $uibModalInstance.close($scope.event);
        };

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };
        
      },
      size: size
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

}]);