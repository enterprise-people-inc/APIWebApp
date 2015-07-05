'use strict';

/**
 * @ngdoc function
 * @name searchPrototypeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the searchPrototypeApp
 */
angular.module('searchPrototypeApp')
  .controller('AboutCtrl', function ($scope,$rootScope) {
    $scope.$on('$routeChangeSuccess', function (event, data) {
            $rootScope.pageTitle = data.title;
        });
  });
