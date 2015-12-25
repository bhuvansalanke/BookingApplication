'use strict';

// Personals controller

var personalsApp = angular.module('personals');

personalsApp.controller('PersonalsController', ['$scope', '$stateParams', 'Authentication', 'Personals', '$modal', '$log',
  function ($scope, $stateParams, Authentication, Personals, $modal, $log) {
    
    this.authentication = Authentication;
    
    // Find a list of Personals
    this.personals = Personals.query();

    this.selectedDropdownItems = null;
    
    // Open a modal window to create a single personal record
    this.modelCreate = function (size) {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'modules/personals/views/create-personal.client.view.html',
      controller: function ($scope, $modalInstance) {
        
        $scope.ok = function () {
          $modalInstance.close();
        };

        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
        };
        
      },
      size: size
    });

    modalInstance.result.then(function () {
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
    
    
    
    // Open a modal window to update a single personal record
    this.modelUpdate = function (size, selectedPersonal) {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'modules/personals/views/edit-personal.client.view.html',
      controller: function ($scope, $modalInstance, personal) {
        $scope.personal = personal;
        
        $scope.ok = function () {
          $modalInstance.close($scope.personal);
        };

        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
        };
        
      },
      size: size,
      resolve: {
        personal: function () {
          return selectedPersonal;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  
    // Remove existing Personal
    this.remove = function (personal) {
      if (personal) {
        personal.$remove();

        for (var i in this.personals) {
          if (this.personals[i] === personal) {
            this.personals.splice(i, 1);
          }
        }
      } else {
        this.personal.$remove(function () {
        });
      }
    };

    
  }
]);
  
personalsApp.controller('PersonalsCreateController', ['$scope', 'Personals', 'Notify',
  function ($scope, Personals, Notify) {
    // Create new Personal
    this.CreatePrsnl = function () {

      // Create new Personal object
      var personal = new Personals({
        fName: this.fName,
        lName: this.lName,
        emailId: this.emailId,
        contact: this.contact,
        isConsultant: this.isConsultant,
        speciality: this.speciality
        
      });


      // Redirect after save
      personal.$save(function (response) {

        // Clear form fields
        $scope.fName = '';
        $scope.lName = '';
        $scope.emailId = '';
        $scope.contact = '';
        $scope.isConsultant = '';
        $scope.speciality = '';
        
        Notify.sendMsg('NewPersonal', {'id': response._id});
        
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
  }
]);

personalsApp.controller('PersonalsUpdateController', ['$scope', 'Personals',
  function ($scope, Personals) {
    
    // Update existing Personal
    this.UpdatePrsnl = function (updtpersonal) {

      var personal = updtpersonal;
      
      personal.$update(function () {
        console.log(personal);
        //$location.path('personals');
      }, function (errorResponse) {
        
        $scope.error = errorResponse.data.message;
        console.log(errorResponse.data.message);
      });
    };
  }
]);
  
personalsApp.directive('listPersonal', ['Personals', 'Notify', 
  function(Personals, Notify) {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'modules/personals/views/view-personal.client.view.html',
      link: function($scope, element, attrs){
        //when a new personal is added, update the personal list
        
        Notify.getMsg('NewPersonal', function (event, data) {
          $scope.personalsCtrl.personals = Personals.query();
        });
      }
    };
}]);


