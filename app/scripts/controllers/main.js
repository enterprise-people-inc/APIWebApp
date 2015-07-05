'use strict';
/**
 * @ngdoc function
 * @name searchPrototypeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the searchPrototypeApp
 */
 var results;
  angular.module('searchPrototypeApp')
    .controller('MainCtrl', function ($scope,$rootScope,$location,$http,searchService) {
      $scope.$on('$routeChangeSuccess', function (event, data) {
              $rootScope.pageTitle = data.title;

          });
/*        $scope.search = function(results) {
        $rootScope.searchParam = results;
            searchService.getBasicSearchResults($scope.searchParam).then(function(response){
              updateResults(response);
              //$rootScope.response=response;
              //$location.path('/results/');
            });
         };*/


    });
