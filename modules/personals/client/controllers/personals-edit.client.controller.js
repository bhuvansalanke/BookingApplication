'use strict';

// Personals update controller

var personalsApp = angular.module('personals');

personalsApp.controller('PersonalsUpdateController', ['$scope',
    function($scope) {
        this.rating = 1;
        this.rateFunction = function(rating) {
            alert('Rating selected - ' + rating);
        };
<<<<<<< HEAD
        
=======
<<<<<<< HEAD
        
=======
>>>>>>> 3f230c6b331f02a2ca632f31379b0e1aa3612386
>>>>>>> f57e6ae079db3192a5701f6dcbe3223465f12be8
        // Update existing Personal
        this.UpdatePrsnl = function(updtpersonal) {

            var personal = updtpersonal;

            personal.$update(function() {
            }, function(errorResponse) {

                $scope.error = errorResponse.data.message;
                console.log(errorResponse.data.message);
            });
        };
    }
]);