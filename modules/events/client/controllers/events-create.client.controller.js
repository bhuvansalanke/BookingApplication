'use strict';

var eventCreateApp = angular.module('events');

eventCreateApp.controller('EventsCreateController', ['$scope', '$googleCalendar','$location', '$log', '$filter', '$compile',
						function($scope , $googleCalendar, $location, $log, $filter, $compile) {
    
	$scope.events = [];
    
    this.selectedDentist = [];
    this.selectedTreatment = [];
    
    this.updateDentist = function(dentist) {
		this.selectedDentist = dentist;
        this.selectedTreatment = []; 
        $scope.step++;
	};
    
    this.updateTreatment = function(treatment) {		
		this.selectedTreatment = treatment;
        $scope.step++;
	};
    
    $scope.myDate = new Date();
    $scope.minDate = new Date();
    $scope.maxDate = new Date(
      $scope.myDate.getFullYear(),
      $scope.myDate.getMonth() + 2,
      $scope.myDate.getDate());
    
    $.datepicker.setDefaults({
        showOn: 'both',
        buttonImageOnly: true,
        buttonImage: 'calendar.gif',
        buttonText: 'Calendar'
    });

    $scope.load = function () {
        $googleCalendar.load();
    };
    
    $scope.step = 1;
    
    $scope.nextStep = function() {
        $scope.step++;
    };

    $scope.prevStep = function() {
        $scope.step--;
    };
    
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
		endDate.setMinutes(endDate.getMinutes() + this.selectedTreatment.duration);
		console.log('End Date:', endDate);
        
        $scope.patientInfo = {
            patientName: $scope.event.patientName,
            contact: $scope.event.patientPhoneNumber,
            emailId: $scope.event.patientEmail
        };

		$googleCalendar.addEvent($scope.event.startDate, endDate, this.selectedDentist, $scope.patientInfo).then(function(result) {
			console.log('Add Event Result:', result);
		});
        
        $scope.step++;
	};
    
    this.updateTime = function() {	
        
        $scope.notavailable = '';
        
        var _date = $filter('date')(new Date($scope.event.startDate), 'EEEE');
        
        $('#timePick .time').timepicker('remove');    
                
        for (var index = 0; index < this.selectedDentist.slots.length; index++) {
            
            var slot = this.selectedDentist.slots[index];
            
            if(slot.day === _date)
            {
                console.log($scope.event.startDate);
                $scope.event.minTime = $filter('date')(new Date(slot.starttime), 'shortTime');
                $scope.event.maxTime = $filter('date')(new Date(slot.endtime), 'shortTime');

                $('#timePick .time').timepicker({
                    'minTime': $filter('date')(new Date(slot.starttime), 'shortTime'),
                    'maxTime': $filter('date')(new Date(slot.endtime), 'shortTime'),
                    'showDuration': true,
                    'step': this.selectedTreatment.duration,
                    'disableTextInput': true,
                    'timeFormat': 'H:i',
                    'disableTimeRanges': [
                        ['1pm', '2pm'],
                        ['3pm', '4:30pm']
                    ]
                });
            }
            else{
                $scope.notavailable = 'No Slots Available for the selected date';
            }

        }
		
	};
   

}]);