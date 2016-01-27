'use strict';

// Personals controller

var personalsApp = angular.module('personals');

personalsApp.controller('PersonalsController', ['$scope', '$stateParams', 'Personals', '$uibModal', '$log', '$q',
  function ($scope, $stateParams, Personals, $uibModal, $log, $q) {
    
    // Find a list of Personals
  this.personals = Personals.query();
  
  console.log(this.personals);

  this.selectedDropdownItems = null;
  
  // Open a modal window to create a single personal record
  this.modelCreate = function (size) {

    var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'modules/personals/views/create-personal.client.view.html',
        
        controller: function ($scope, $uibModalInstance) {
        
            $scope.ok = function () {
            $uibModalInstance.close($scope.personal);
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
    
    // Open a modal window to update a single personal record
    this.modelUpdate = function (size, selectedPersonal) {
        
        var elements = [];
        for (var index = 0; index < selectedPersonal.treatments.length; index++) {
            var element = selectedPersonal.treatments[index];
            
            elements[index] = {
                    description: element.description,
                    duration: element.duration,
                    price: element.price,
                    checked: true
                };
        }
        
        selectedPersonal.treatments = elements;
        
        console.log(selectedPersonal);
        
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'modules/personals/views/edit-personal.client.view.html',
            controller: function ($scope, $uibModalInstance, selectedPersonal) {
                
            $scope.personal = selectedPersonal;
            
            $scope.ok = function () {
                $uibModalInstance.close($scope.personal);
            };
    
            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
            
            },
            size: size,
            resolve: {
            selectedPersonal: function () {
                return selectedPersonal;
            }
            }
        });
  
      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
        }, function () {
          
      });
    };
    
    // Open a modal window to update a single personal record
    this.modelShedule = function (size, selectedPersonal) {
        
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'modules/personals/views/list-apptslots.client.view.html',
            controller: function ($scope, $uibModalInstance, selectedPersonal) {
                
            $scope.apptSlots = selectedPersonal.apptSlots;
            
            $scope.ok = function () {
                $uibModalInstance.close($scope.personal);
            };
    
            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
            
            },
            size: size,
            resolve: {
            selectedPersonal: function () {
                return selectedPersonal;
            }
            }
        });
  
      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
        }, function () {
          
      });
    };
  
    // Remove existing Personal
    this.remove = function (personal) {
        
        $log.info(personal);
        $log.info('Modal dismissed at: ' + new Date());
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
        console.log(this.selectedTreatments);
      // Create new Personal object
      var personal = new Personals({
        fName: this.fName,
        lName: this.lName,
        emailId: this.emailId,
        contact: this.contact,
        isConsultant: this.isConsultant,
        speciality: this.speciality,
        qualification: this.qualification,
        treatments: this.selectedTreatments,
        apptSlots: this.apptSlots
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
        $scope.qualification = '';
        $scope.selectedTreatments = null;
        $scope.apptSlots = null;
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
        
      console.log(updtpersonal);

      var personal = updtpersonal;
      
      personal.$update(function () {
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

personalsApp.controller('ApptTypeController', ['$scope', 'ApptTypes',
  function ($scope, ApptTypes) {
    
    $scope.procedureList = [];
    $scope.procedure = [];
    $scope.disabled = false;
    
    var refresh = function() {
        $scope.procedureList = ApptTypes.query();
        $scope.procedure = '';
        $scope.disabled = false;
    };

    refresh();
    
    // Create new Appt Type
    $scope.addProcedure = function () {

        // Create new Appt Type object
        var apptType = new ApptTypes({
            description: $scope.procedure.description,
            duration: $scope.procedure.duration,
            price: $scope.procedure.price
            
        });

        // Redirect after save
        apptType.$save(function (response) {

            // Clear form fields
            $scope.procedure.description = '';
            $scope.procedure.duration = '';
            $scope.procedure.price = '';
            
            refresh();
        
        }, function (errorResponse) {
            $scope.error = errorResponse.data.message;
        });
    };
    
    // Remove existing Personal
    $scope.remove = function (procedure) {
        if (procedure) {

            procedure.$remove();

            for (var i in this.procedureList) {
                if (this.procedureList[i] === procedure) {
                    this.procedureList.splice(i, 1);
                }
            }
        } else {
            this.procedure.$remove(function () {
                
            });
        }
        
    };
    
    // Update existing Personal
    $scope.update = function (updtprocedure) {

        var procedure = updtprocedure;
      
        procedure.$update(function () {
            refresh();
        }, function (errorResponse) {
            $scope.error = errorResponse.data.message;
            console.log(errorResponse.data.message);
      });
    };
    
    $scope.edit = function(procedure) {

        for (var i in this.procedureList) {
                if (this.procedureList[i] === procedure) {
                    $scope.procedure = procedure;
                }
            }
        
        $scope.disabled = true;
    };
        
    $scope.deselect = function() {
        $scope.procedure = '';
        $scope.disabled = false;
    };

  }
]);

personalsApp.controller('ApptSlotController', ['$scope', 
  function ($scope) {
    
    $scope.slotList = [];
    $scope.slot = [];
    $scope.disabled = false;
    
    $scope.dayOptions = [
		{label:'Monday'},
		{label:'Tuesday'},
        {label:'Wednesday'},
		{label:'Thursday'},
        {label:'Friday'},
		{label:'Saturday'},
        {label:'Sunday'}
	];
    
    
    var refresh = function() {
        //$scope.slotList = ApptTypes.query();
        $scope.slot = '';
        $scope.disabled = false;
    };

    //refresh();
    
    // Create new Appt Slot
    $scope.addSlots= function () {

        // Create new Appt Type object
        /*var apptType = new ApptTypes({
            description: $scope.procedure.description,
            duration: $scope.procedure.duration,
            price: $scope.procedure.price
            
        });

        // Redirect after save
        apptType.$save(function (response) {

            // Clear form fields
            $scope.procedure.description = '';
            $scope.procedure.duration = '';
            $scope.procedure.price = '';
            
            refresh();
        
        }, function (errorResponse) {
            $scope.error = errorResponse.data.message;
        });*/
        
        $scope.slotList.push({
            day: $scope.slot.selectedDay.label,
            startTimeHour: $scope.slot.startTimeHour,
            startTimeMin: $scope.slot.startTimeMin,
            endTimeHour: $scope.slot.endTimeHour,
            endTimeMin: $scope.slot.endTimeMin,
            location: $scope.slot.location,
            starttime: String($scope.slot.startTimeHour) + ':' + String($scope.slot.startTimeMin),
            endtime: String($scope.slot.endTimeHour) + ':' + String($scope.slot.endTimeMin)
            
        });
    
    };
    
    // Remove existing Slot
    $scope.remove = function (slot) {
        if (slot) {

            slot.$remove();

            for (var i in this.slotList) {
                if (this.slotList[i] === slot) {
                    this.slotList.splice(i, 1);
                }
            }
        } else {
            this.slot.$remove(function () {
                
            });
        }
        
    };
    
    // Update existing Slot
    $scope.update = function (updtslot) {

        var slot = updtslot;
      
        slot.$update(function () {
            refresh();
        }, function (errorResponse) {
            $scope.error = errorResponse.data.message;
            console.log(errorResponse.data.message);
      });
    };
    
    $scope.edit = function(slot) {

        for (var i in this.slotList) {
                if (this.slotList[i] === slot) {
                    $scope.slot = slot;
                }
            }
        
        $scope.disabled = true;
    };
        
    $scope.deselect = function() {
        $scope.slot = '';
        $scope.disabled = false;
    };

  }
]);