'use strict';

/**
 * @ngdoc function
 * @name searchPrototypeApp.controller:FaqCtrl
 * @description
 * # FaqCtrl
 * Controller of the searchPrototypeApp
 */
angular.module('searchPrototypeApp')
  .controller('FaqCtrl', function ($scope,$rootScope) {
    $scope.$on('$routeChangeSuccess', function (event, data) {
            $rootScope.pageTitle = data.title;
        });
  });
