'use strict';

/**
 * @ngdoc function
 * @name searchPrototypeApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the searchPrototypeApp
 */
angular.module('searchPrototypeApp')
  .controller('ContactCtrl', function ($scope,$rootScope) {
    $scope.$on('$routeChangeSuccess', function (event, data) {
            $rootScope.pageTitle = data.title;
        });
  });
