'use strict';

// Personals update controller

var personalsApp = angular.module('personals');

personalsApp.controller('PersonalsUpdateController', ['$scope',
  function ($scope) {
    
    // Update existing Personal
    this.UpdatePrsnl = function (updtpersonal) {

      var personal = updtpersonal;
      
      personal.$update(function () {
      }, function (errorResponse) {
        
        $scope.error = errorResponse.data.message;
        console.log(errorResponse.data.message);
      });
    };
  }
]);