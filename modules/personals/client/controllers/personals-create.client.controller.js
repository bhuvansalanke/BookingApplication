'use strict';

// Personals create controller

var personalsApp = angular.module('personals');

personalsApp.controller('PersonalsCreateController', ['$scope', 'Personals', 'Notify', 
    function($scope, Personals, Notify) {
    
        // Create new Personal
        this.CreatePrsnl = function() {

            // Create new Personal object
            var personal = new Personals({
                fName: this.fName,
                lName: this.lName,
                emailId: this.emailId,
                contact: this.contact,
                isConsultant: this.isConsultant,
                speciality: this.speciality,
                qualification: this.qualification,
                experience: this.experience,
                rating: this.rating,
                treatments: this.selectedTreatments,
                slots: this.slots
            });

            // Redirect after save
            personal.$save(function(response) {

                // Clear form fields
                $scope.fName = '';
                $scope.lName = '';
                $scope.emailId = '';
                $scope.contact = '';
                $scope.isConsultant = '';
                $scope.speciality = '';
                $scope.qualification = '';
                $scope.selectedTreatments = null;
                $scope.slots = null;
                $scope.experience = null;
                $scope.rating = null;

                Notify.sendMsg('NewPersonal', { 'id': response._id });

            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
    }
]);

