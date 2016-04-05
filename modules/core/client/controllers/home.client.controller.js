'use strict';

angular.module('core').controller('HomeController', ['$scope', '$location',
  function ($scope, $location) {
        
    $scope.go = function ( path ) {
        $location.path( path );
    };
    
    $scope.data = {
      selectedIndex: 0,
      bottom: false
    };
    
  }
]);


