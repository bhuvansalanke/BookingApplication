'use strict';

angular.module('InputField', [])

.directive('inputfield', ['$compile', function($complile) {
	return {
		restrict: 'E',
		scope: {
			ngModel: '=',
			label: '@',
			type: '@',
			placeholder: '@',
			id: '@',
			required: '@',
		},
		transclude: true,
		templateUrl: 'modules/events/views/formField.html',
		replace: true,
	};
}])

;