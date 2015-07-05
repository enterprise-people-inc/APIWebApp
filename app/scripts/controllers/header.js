'use strict';

/**
 * @ngdoc function
 * @name searchPrototypeApp.controller:HeaderController
 * @description
 * # HeaderController
 * Controller of the searchPrototypeApp
 */
angular.module('searchPrototypeApp')
    .controller('HeaderController', ['$scope', '$location', function ($scope, $location) {
    	    $scope.isCollapsed = true;
            $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
        };

    }]);
