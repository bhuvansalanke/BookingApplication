'use strict';

var eventsApp = angular.module('events');

eventsApp.controller('EventsCreateController', ['$scope', '$googleCalendar','$location', '$log', '$filter', '$compile',
						function($scope , $googleCalendar, $location, $log, $filter, $compile) {

	$scope.events = [];
    this.selectedDentist = [];
    this.selectedTreatment = [];
    
    $.datepicker.setDefaults({
    showOn: "both",
    buttonImageOnly: true,
    buttonImage: "calendar.gif",
    buttonText: "Calendar"
    });

    //Book an appointment            
	this.addEvent = function() {
        
        console.log('Start Time:', $scope.event.startTime);
        
        var d = new Date();
        
        var time = $scope.event.startTime.match(/(\d+)(?::(\d\d))?\s*(p?)/);
        $scope.event.startDate.setHours( parseInt(time[1]) + (time[3] ? 12 : 0) );
        $scope.event.startDate.setMinutes( parseInt(time[2]) || 0 );
  
		console.log('Start Date:', $scope.event.startDate);

		//format end date/time object in to google format
		var endDate = new Date($scope.event.startDate);
		endDate.setMinutes(endDate.getMinutes() + $scope.treatmentInfo.duration);
		console.log('End Date:', endDate);

		$googleCalendar.addEvent($scope.event.startDate, endDate, $scope.contactInfo).then(function(result) {
			console.log('Add Event Result:', result);
			//addEventModal.hide();
		});
 
	};
	
    this.updateDentist = function() {
		$scope.contactInfo = this.selectedDentist;
        this.selectedTreatment = []; 
 
	}; 
    
    this.updateTreatment = function() {		
		$scope.treatmentInfo = this.selectedTreatment;
	};
    
    this.updateTime = function() {	
        
        var _date = $filter('date')(new Date($scope.event.startDate), 'EEEE');
        
        $('#timePick .time').timepicker('remove');    
                
        for (var index = 0; index < this.selectedDentist.slots.length; index++) {
            
            var slot = this.selectedDentist.slots[index];
            
            if(slot.day == _date)
            {
                $scope.event.minTime = $filter('date')(new Date(slot.starttime), 'shortTime');
                $scope.event.maxTime = $filter('date')(new Date(slot.endtime), 'shortTime');

                $('#timePick .time').timepicker({
                    'minTime': $filter('date')(new Date(slot.starttime), 'shortTime'),
                    'maxTime': $filter('date')(new Date(slot.endtime), 'shortTime'),
                    'showDuration': true,
                    'step': $scope.treatmentInfo.duration,
                    'disableTextInput': true,
                    'timeFormat': 'H:i'
                });
            }

        }
		
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