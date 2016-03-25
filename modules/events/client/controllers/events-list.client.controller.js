'use strict';

var eventsApp = angular.module('events');

eventsApp.controller('EventsController', ['$scope', '$googleCalendar', '$uibModal', '$log',
						function($scope , $googleCalendar, $uibModal, $log) {


	//================================================================================
	// Variables
	//================================================================================

	$scope.events = [];
	
    $scope.calEvents = [];
	$scope.eventSources = [];
    
    /* alert on eventClick */
    $scope.alertOnEventClick = function( date, jsEvent, view){
        console.log(date);
        $scope.currentEvent = date;
    };
    
    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: false,
        stick: true,
        header:{
          left: 'month,agendaWeek,agendaDay',
          center: 'title',
          right: 'today prev,next'
        },
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize
      }
    };

    
    
	//================================================================================
	// Scope Functions
	//================================================================================
	
	$scope.getEvents = function() {
		$googleCalendar.getEvents().then(function(events) {

			$scope.events = events;
            
            for(var index = 0; index < events.length; index++) {
                var event = events[index];
                
                $scope.calEvents[index] = {
                    'title': event.summary,
                    'start': event.start.dateTime,
                    'end': event.end.dateTime,
                    'description': event.description
                };
                
            }

		});
	};
	$scope.getEvents();
    
    $scope.eventSources = [$scope.calEvents];

	$scope.setCurrentEvent = function(event) {
		$scope.currentEvent = event;
	};
	

}]);
